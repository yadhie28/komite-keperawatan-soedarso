/**
 * ============================================================================
 * SISTEM INFORMASI INTERNAL KOMITE KEPERAWATAN
 * RSUD dr. SOEDARSO PONTIANAK
 * Backend: Google Apps Script (V8 Runtime)
 * ============================================================================
 * Catatan Arsitektur & Keamanan:
 * - Bound Script pada Google Spreadsheet aktif (SpreadsheetApp.getActiveSpreadsheet()).
 * - Tidak memuat data demo/dummy; inisialisasi hanya membuat struktur 5 sheet
 *   dan 1 akun SUPER_ADMIN awal ('SUPERADMIN') dengan password default terpusat.
 * - Password di-hash menggunakan SHA-256 (Utilities.computeDigest) + salt/pepper
 *   yang disimpan/diinisialisasi di ScriptProperties.
 * - Sesi disimpan di CacheService dengan TTL 7200 detik (2 jam) beserta metadata
 *   role & status password agar endpoint backend memverifikasi hak akses secara ketat.
 * - CacheService bersama hanya digunakan untuk data publik/non-rahasia; data
 *   privat perawat, kredensial, mutu, etik, dan log audit tidak pernah di-cache
 *   secara global lintas pengguna.
 * ============================================================================
 */

// Konfigurasi Terpusat Sistem
var APP_CONFIG = Object.freeze({
  APP_NAME: 'SIM Komite Keperawatan RSUD dr. Soedarso',
  DEFAULT_PASSWORD: 'REDACTED_PASSWORD',
  SESSION_TTL_SECONDS: 7200, // 2 jam
  PUBLIC_CACHE_TTL_SECONDS: 900, // 15 menit untuk profil publik & dokumen PUBLIK
  PUBLIC_CACHE_KEY: 'RSDS_KOMKEP_PUBLIC_PROFILE_V1',
  PEPPER_PROP_KEY: 'RSDS_KOMKEP_PEPPER_V1',
  SHEETS: {
    USERS: 'Users',
    PROFIL_PERAWAT: 'Profil_Perawat',
    KREDENSIAL_MUTU_ETIK: 'Kredensial_Mutu_Etik',
    DOKUMEN_REGULASI: 'Dokumen_Regulasi',
    AUDIT_LOG: 'Audit_Log'
  },
  HEADERS: {
    Users: [
      'ID_User',
      'Username_NIP',
      'Nama_Lengkap',
      'Role',
      'Status_Password',
      'Password_Hash',
      'Tanggal_Update',
      'Status_Akun'
    ],
    Profil_Perawat: [
      'ID_Perawat',
      'ID_User',
      'NIP',
      'Nama_Lengkap',
      'Jenjang_PK',
      'Unit_Kerja',
      'No_HP',
      'Email',
      'Alamat',
      'Nomor_STR',
      'Masa_Berlaku_STR',
      'Nomor_SIP',
      'Masa_Berlaku_SIP',
      'Tanggal_Update'
    ],
    Kredensial_Mutu_Etik: [
      'ID_Rekam',
      'ID_Perawat',
      'Jenis_Rekam',
      'Status_Proses',
      'Tanggal_Kegiatan',
      'Ringkasan_Hasil',
      'Catatan_Rahasia',
      'Petugas_Penilai',
      'Visibilitas_Role'
    ],
    Dokumen_Regulasi: [
      'ID_Dokumen',
      'Judul_Dokumen',
      'Kategori',
      'Nomor_Dokumen',
      'Link_Dokumen',
      'Tanggal_Terbit',
      'Visibilitas'
    ],
    Audit_Log: [
      'ID_Log',
      'Timestamp',
      'Aktor_ID',
      'Aktor_Nama',
      'Role_Aktor',
      'Aksi',
      'Modul_Target',
      'ID_Target',
      'Keterangan'
    ]
  },
  VALID_ROLES: [
    'SUPER_ADMIN',
    'ADMIN_KOMITE',
    'SUBKOMITE_KREDENSIAL',
    'SUBKOMITE_MUTU',
    'SUBKOMITE_ETIK',
    'PERAWAT'
  ],
  VALID_JENJANG_PK: [
    'Pra-PK',
    'PK I',
    'PK II',
    'PK III',
    'PK IV',
    'PK V'
  ],
  VALID_JENIS_REKAM: [
    'KREDENSIAL',
    'REKREDENSIAL',
    'MUTU',
    'ETIK_DISIPLIN'
  ],
  VALID_KATEGORI_DOKUMEN: [
    'REGULASI',
    'SPO',
    'PANDUAN',
    'KEBIJAKAN'
  ],
  VALID_VISIBILITAS_DOKUMEN: [
    'PUBLIK',
    'INTERNAL_PERAWAT',
    'TERBATAS_KOMITE'
  ]
});

/**
 * Entry point HTTP GET untuk Web App Google Apps Script.
 * Menyajikan template Index.html dengan izin XFrame ALLOWALL agar dapat tampil
 * di dalam preview/frame yang diizinkan.
 * @param {Object} e Parameter event HTTP GET
 * @return {GoogleAppsScript.HTML.HtmlOutput}
 */
function doGet(e) {
  try {
    // Pastikan struktur sheet dasar dan akun SUPER_ADMIN tersedia secara aman
    initializeSheets();
    var template = HtmlService.createTemplateFromFile('Index');
    template.appName = APP_CONFIG.APP_NAME;
    return template
      .evaluate()
      .setTitle(APP_CONFIG.APP_NAME)
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1.0');
  } catch (err) {
    Logger.log('Error pada doGet: ' + err.message);
    return HtmlService.createHtmlOutput(
      '<h3>Terjadi kesalahan saat memuat aplikasi.</h3><p>' +
        escapeHtml_(err.message) +
        '</p>'
    ).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }
}

/**
 * Alias utama untuk inisialisasi sheet & akun Super Admin awal.
 * Bersifat idempotent: aman dijalankan berulang kali tanpa menghapus data eksisting
 * dan tanpa menambahkan data demo/dummy.
 * @return {Object} Status inisialisasi
 */
function initializeSheets() {
  return setupSheets();
}

/**
 * Membuat 5 sheet wajib beserta header kolom jika belum ada,
 * serta menginisialisasi 1 akun SUPER_ADMIN awal ('SUPERADMIN') jika belum ada.
 * Menggunakan LockService untuk mencegah race condition saat inisialisasi.
 * @return {Object} Hasil setup
 */
function setupSheets() {
  var lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) {
      throw new Error('Spreadsheet aktif tidak ditemukan. Pastikan script terikat pada Google Sheet.');
    }

    // Pastikan pepper keamanan tersedia di PropertiesService
    getOrCreatePepper_();

    var createdSheets = [];
    var sheetKeys = Object.keys(APP_CONFIG.HEADERS);

    for (var i = 0; i < sheetKeys.length; i++) {
      var sheetName = sheetKeys[i];
      var headers = APP_CONFIG.HEADERS[sheetName];
      var sheet = ss.getSheetByName(sheetName);

      if (!sheet) {
        sheet = ss.insertSheet(sheetName);
        createdSheets.push(sheetName);
      }

      // Pastikan baris header terpasang sesuai urutan resmi
      ensureSheetHeaders_(sheet, headers);
      formatHeaderRow_(sheet, headers.length);
    }

    // Inisialisasi 1 akun SUPER_ADMIN awal tanpa data demo/dummy
    var usersSheet = ss.getSheetByName(APP_CONFIG.SHEETS.USERS);
    var existingSuperAdmin = findUserRowByUsername_(usersSheet, 'SUPERADMIN');
    var superAdminCreated = false;

    if (!existingSuperAdmin) {
      var nowStr = formatDateTimeWib_(new Date());
      var superAdminId = generateId_('USR');
      var passwordHash = hashPassword_(APP_CONFIG.DEFAULT_PASSWORD, superAdminId);

      usersSheet.appendRow([
        superAdminId,
        'SUPERADMIN',
        'Super Administrator Komite Keperawatan',
        'SUPER_ADMIN',
        'DEFAULT',
        passwordHash,
        nowStr,
        'AKTIF'
      ]);
      superAdminCreated = true;

      appendAuditLogInternal_(ss, {
        aktorId: superAdminId,
        aktorNama: 'Sistem Inisialisasi',
        roleAktor: 'SUPER_ADMIN',
        aksi: 'INIT_SUPER_ADMIN',
        modulTarget: 'Users',
        idTarget: superAdminId,
        keterangan: 'Inisialisasi akun awal SUPERADMIN dengan status password DEFAULT.'
      });
    }

    // Bersihkan cache publik agar sinkron dengan kondisi terbaru
    CacheService.getScriptCache().remove(APP_CONFIG.PUBLIC_CACHE_KEY);

    return {
      success: true,
      message: 'Struktur database berhasil disiapkan tanpa data demo.',
      createdSheets: createdSheets,
      superAdminCreated: superAdminCreated
    };
  } catch (err) {
    Logger.log('Error pada setupSheets: ' + err.message);
    return {
      success: false,
      message: 'Gagal menginisialisasi sheet: ' + err.message
    };
  } finally {
    lock.releaseLock();
  }
}

/**
 * Mengambil atau membuat nilai pepper rahasia di ScriptProperties.
 * @return {string} Pepper rahasia
 */
function getOrCreatePepper_() {
  var props = PropertiesService.getScriptProperties();
  var pepper = props.getProperty(APP_CONFIG.PEPPER_PROP_KEY);
  if (!pepper) {
    pepper = Utilities.getUuid() + '_RSDS_KOMKEP_' + new Date().getTime();
    props.setProperty(APP_CONFIG.PEPPER_PROP_KEY, pepper);
  }
  return pepper;
}

/**
 * Menghasilkan hash SHA-256 hex dari password menggunakan salt (ID_User) + pepper.
 * @param {string} plainPassword Password plain text
 * @param {string} salt Salt unik per akun (misalnya ID_User)
 * @return {string} Hex digest SHA-256
 */
function hashPassword_(plainPassword, salt) {
  var pepper = getOrCreatePepper_();
  var payload = String(salt || '') + ':' + String(plainPassword || '') + ':' + pepper;
  var digestBytes = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    payload,
    Utilities.Charset.UTF_8
  );
  return digestBytes
    .map(function (b) {
      var v = b < 0 ? b + 256 : b;
      return ('0' + v.toString(16)).slice(-2);
    })
    .join('');
}

/**
 * Membandingkan dua string hash secara aman.
 * @param {string} hashA
 * @param {string} hashB
 * @return {boolean}
 */
function verifyHashEqual_(hashA, hashB) {
  if (!hashA || !hashB) return false;
  var a = String(hashA);
  var b = String(hashB);
  if (a.length !== b.length) return false;
  var diff = 0;
  for (var i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

/**
 * ============================================================================
 * AUTENTIKASI, MANAJEMEN SESI & GANTI/RESET PASSWORD
 * ============================================================================
 */

/**
 * Autentikasi pengguna menggunakan Username/NIP dan Password.
 * Mencatat upaya login (berhasil maupun gagal) ke Audit_Log.
 * @param {string} usernameNip Username atau NIP
 * @param {string} password Password input pengguna
 * @return {Object} Hasil login beserta data sesi/profil dasar
 */
function loginUser(usernameNip, password) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    initializeSheets();
    var cleanUser = String(usernameNip || '').trim();
    var cleanPass = String(password || '');

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var usersSheet = ss.getSheetByName(APP_CONFIG.SHEETS.USERS);

    if (!cleanUser || !cleanPass) {
      appendAuditLogInternal_(ss, {
        aktorId: '-',
        aktorNama: cleanUser || 'Tidak Diketahui',
        roleAktor: '-',
        aksi: 'LOGIN_GAGAL',
        modulTarget: 'Users',
        idTarget: cleanUser || '-',
        keterangan: 'Percobaan login dengan Username/NIP atau password kosong.'
      });
      return {
        success: false,
        message: 'Username/NIP dan password wajib diisi.'
      };
    }

    var found = findUserRowByUsername_(usersSheet, cleanUser);
    if (!found) {
      appendAuditLogInternal_(ss, {
        aktorId: '-',
        aktorNama: cleanUser,
        roleAktor: '-',
        aksi: 'LOGIN_GAGAL',
        modulTarget: 'Users',
        idTarget: cleanUser,
        keterangan: 'Username/NIP tidak ditemukan.'
      });
      return {
        success: false,
        message: 'Kredensial login tidak valid.'
      };
    }

    var rowData = found.data;
    var idUser = String(rowData.ID_User || '');
    var uname = String(rowData.Username_NIP || '');
    var namaLengkap = String(rowData.Nama_Lengkap || '');
    var role = String(rowData.Role || '');
    var statusPass = String(rowData.Status_Password || 'DEFAULT').toUpperCase();
    var storedHash = String(rowData.Password_Hash || '');
    var statusAkun = String(rowData.Status_Akun || 'AKTIF').toUpperCase();

    if (statusAkun !== 'AKTIF') {
      appendAuditLogInternal_(ss, {
        aktorId: idUser,
        aktorNama: namaLengkap,
        roleAktor: role,
        aksi: 'LOGIN_GAGAL',
        modulTarget: 'Users',
        idTarget: idUser,
        keterangan: 'Upaya login pada akun berstatus ' + statusAkun + '.'
      });
      return {
        success: false,
        message: 'Akun Anda berstatus ' + statusAkun + '. Hubungi Admin Komite.'
      };
    }

    var inputHash = hashPassword_(cleanPass, idUser);
    if (!verifyHashEqual_(inputHash, storedHash)) {
      appendAuditLogInternal_(ss, {
        aktorId: idUser,
        aktorNama: namaLengkap,
        roleAktor: role,
        aksi: 'LOGIN_GAGAL',
        modulTarget: 'Users',
        idTarget: idUser,
        keterangan: 'Password salah untuk username ' + uname + '.'
      });
      return {
        success: false,
        message: 'Kredensial login tidak valid.'
      };
    }

    // Buat token sesi baru di CacheService (TTL 2 jam)
    var token = Utilities.getUuid();
    var sessionPayload = {
      token: token,
      idUser: idUser,
      usernameNip: uname,
      namaLengkap: namaLengkap,
      role: role,
      statusPassword: statusPass,
      loginAt: formatDateTimeWib_(new Date())
    };

    CacheService.getScriptCache().put(
      getSessionCacheKey_(token),
      JSON.stringify(sessionPayload),
      APP_CONFIG.SESSION_TTL_SECONDS
    );

    appendAuditLogInternal_(ss, {
      aktorId: idUser,
      aktorNama: namaLengkap,
      roleAktor: role,
      aksi: 'LOGIN_BERHASIL',
      modulTarget: 'Users',
      idTarget: idUser,
      keterangan:
        'Login berhasil' +
        (statusPass === 'DEFAULT' ? ' (wajib ganti password awal).' : '.')
    });

    return {
      success: true,
      message:
        statusPass === 'DEFAULT'
          ? 'Login berhasil. Anda wajib mengganti password default sebelum mengakses menu operasional.'
          : 'Login berhasil.',
      mustChangePassword: statusPass === 'DEFAULT',
      session: {
        token: token,
        idUser: idUser,
        usernameNip: uname,
        namaLengkap: namaLengkap,
        role: role,
        statusPassword: statusPass,
        loginAt: sessionPayload.loginAt
      }
    };
  } catch (err) {
    Logger.log('Error pada loginUser: ' + err.message);
    return {
      success: false,
      message: 'Terjadi kesalahan saat proses autentikasi: ' + err.message
    };
  } finally {
    lock.releaseLock();
  }
}

/**
 * Mengakhiri sesi pengguna berdasarkan token dan mencatatnya di Audit_Log.
 * @param {string} token Token sesi
 * @return {Object} Status logout
 */
function logoutUser(token) {
  var lock = LockService.getScriptLock();
  lock.waitLock(5000);
  try {
    var cleanToken = String(token || '').trim();
    if (!cleanToken) {
      return { success: true, message: 'Sesi telah berakhir.' };
    }

    var session = getSessionByToken_(cleanToken);
    CacheService.getScriptCache().remove(getSessionCacheKey_(cleanToken));

    if (session) {
      var ss = SpreadsheetApp.getActiveSpreadsheet();
      appendAuditLogInternal_(ss, {
        aktorId: session.idUser,
        aktorNama: session.namaLengkap,
        roleAktor: session.role,
        aksi: 'LOGOUT',
        modulTarget: 'Users',
        idTarget: session.idUser,
        keterangan: 'Pengguna keluar dari sesi aplikasi.'
      });
    }

    return { success: true, message: 'Anda telah keluar dari sistem.' };
  } catch (err) {
    Logger.log('Error pada logoutUser: ' + err.message);
    return { success: false, message: 'Gagal logout: ' + err.message };
  } finally {
    lock.releaseLock();
  }
}

/**
 * Memeriksa status sesi aktif dari token (digunakan frontend saat reload/cek sesi).
 * @param {string} token Token sesi
 * @return {Object} Status sesi
 */
function checkSession(token) {
  try {
    var cleanToken = String(token || '').trim();
    if (!cleanToken) {
      return { success: true, authenticated: false, session: null };
    }
    var session = getSessionByToken_(cleanToken);
    if (!session) {
      return { success: true, authenticated: false, session: null };
    }

    // Sinkronkan status terbaru dari sheet Users agar perubahan status password/akun langsung terbaca
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var usersSheet = ss.getSheetByName(APP_CONFIG.SHEETS.USERS);
    var userRow = findUserRowById_(usersSheet, session.idUser);

    if (!userRow || String(userRow.data.Status_Akun || '').toUpperCase() !== 'AKTIF') {
      CacheService.getScriptCache().remove(getSessionCacheKey_(cleanToken));
      return { success: true, authenticated: false, session: null };
    }

    var latestStatusPass = String(userRow.data.Status_Password || 'DEFAULT').toUpperCase();
    var latestRole = String(userRow.data.Role || session.role);
    var latestNama = String(userRow.data.Nama_Lengkap || session.namaLengkap);

    session.statusPassword = latestStatusPass;
    session.role = latestRole;
    session.namaLengkap = latestNama;

    CacheService.getScriptCache().put(
      getSessionCacheKey_(cleanToken),
      JSON.stringify(session),
      APP_CONFIG.SESSION_TTL_SECONDS
    );

    return {
      success: true,
      authenticated: true,
      mustChangePassword: latestStatusPass === 'DEFAULT',
      session: {
        token: session.token,
        idUser: session.idUser,
        usernameNip: session.usernameNip,
        namaLengkap: latestNama,
        role: latestRole,
        statusPassword: latestStatusPass,
        loginAt: session.loginAt
      }
    };
  } catch (err) {
    Logger.log('Error pada checkSession: ' + err.message);
    return { success: false, authenticated: false, message: err.message };
  }
}

/**
 * Mengganti password pengguna yang sedang login.
 * Memvalidasi: password lama cocok (jika bukan bypass khusus), password baru tidak kosong,
 * minimal 8 karakter, dan tidak sama dengan password default ('REDACTED_PASSWORD').
 * Mengubah Status_Password menjadi 'CHANGED' dan mencatat ke Audit_Log.
 * @param {string} token Token sesi aktif
 * @param {string} passwordLama Password saat ini
 * @param {string} passwordBaru Password baru
 * @return {Object} Hasil ganti password
 */
function gantiPassword(token, passwordLama, passwordBaru) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var session = requireAuthenticatedSession_(token, true);
    var oldPass = String(passwordLama || '');
    var newPass = String(passwordBaru || '');

    if (!oldPass || !newPass) {
      return {
        success: false,
        message: 'Password lama dan password baru wajib diisi.'
      };
    }

    if (newPass.length < 8) {
      return {
        success: false,
        message: 'Password baru minimal harus terdiri dari 8 karakter.'
      };
    }

    if (newPass === APP_CONFIG.DEFAULT_PASSWORD) {
      return {
        success: false,
        message: 'Password baru tidak boleh sama dengan password default sistem.'
      };
    }

    if (newPass === oldPass) {
      return {
        success: false,
        message: 'Password baru harus berbeda dari password lama.'
      };
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var usersSheet = ss.getSheetByName(APP_CONFIG.SHEETS.USERS);
    var userRow = findUserRowById_(usersSheet, session.idUser);

    if (!userRow) {
      throw new Error('Data akun pengguna tidak ditemukan.');
    }

    var storedHash = String(userRow.data.Password_Hash || '');
    var oldHash = hashPassword_(oldPass, session.idUser);

    if (!verifyHashEqual_(oldHash, storedHash)) {
      appendAuditLogInternal_(ss, {
        aktorId: session.idUser,
        aktorNama: session.namaLengkap,
        roleAktor: session.role,
        aksi: 'GANTI_PASSWORD_GAGAL',
        modulTarget: 'Users',
        idTarget: session.idUser,
        keterangan: 'Gagal ganti password: password lama tidak sesuai.'
      });
      return {
        success: false,
        message: 'Password lama yang Anda masukkan tidak sesuai.'
      };
    }

    var newHash = hashPassword_(newPass, session.idUser);
    var nowStr = formatDateTimeWib_(new Date());

    // Kolom Users: 5=Status_Password, 6=Password_Hash, 7=Tanggal_Update
    usersSheet.getRange(userRow.rowIndex, 5, 1, 3).setValues([
      ['CHANGED', newHash, nowStr]
    ]);

    // Perbarui sesi di cache
    session.statusPassword = 'CHANGED';
    CacheService.getScriptCache().put(
      getSessionCacheKey_(session.token),
      JSON.stringify(session),
      APP_CONFIG.SESSION_TTL_SECONDS
    );

    appendAuditLogInternal_(ss, {
      aktorId: session.idUser,
      aktorNama: session.namaLengkap,
      roleAktor: session.role,
      aksi: 'GANTI_PASSWORD_BERHASIL',
      modulTarget: 'Users',
      idTarget: session.idUser,
      keterangan: 'Password diperbarui dan Status_Password diubah menjadi CHANGED.'
    });

    return {
      success: true,
      message: 'Password berhasil diperbarui. Anda kini dapat mengakses seluruh fitur sesuai hak akses.',
      mustChangePassword: false,
      statusPassword: 'CHANGED'
    };
  } catch (err) {
    Logger.log('Error pada gantiPassword: ' + err.message);
    return {
      success: false,
      message: err.message
    };
  } finally {
    lock.releaseLock();
  }
}

/**
 * Mereset password akun target ke password default ('REDACTED_PASSWORD') oleh SUPER_ADMIN / ADMIN_KOMITE.
 * Mengubah Status_Password menjadi 'DEFAULT' agar pengguna wajib mengganti saat login berikutnya.
 * @param {string} token Token sesi admin
 * @param {string} targetUserId ID_User target reset
 * @return {Object} Hasil reset password
 */
function resetPasswordDefault(token, targetUserId) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var session = requireAuthorizedRole_(token, ['SUPER_ADMIN', 'ADMIN_KOMITE']);
    var cleanTargetId = String(targetUserId || '').trim();
    if (!cleanTargetId) {
      return { success: false, message: 'ID User target wajib dipilih.' };
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var usersSheet = ss.getSheetByName(APP_CONFIG.SHEETS.USERS);
    var targetRow = findUserRowById_(usersSheet, cleanTargetId);

    if (!targetRow) {
      return { success: false, message: 'Akun target tidak ditemukan.' };
    }

    var targetRole = String(targetRow.data.Role || '');
    if (targetRole === 'SUPER_ADMIN' && session.role !== 'SUPER_ADMIN') {
      return {
        success: false,
        message: 'Hanya SUPER_ADMIN yang berwenang mereset password akun SUPER_ADMIN.'
      };
    }

    var resetHash = hashPassword_(APP_CONFIG.DEFAULT_PASSWORD, cleanTargetId);
    var nowStr = formatDateTimeWib_(new Date());

    usersSheet.getRange(targetRow.rowIndex, 5, 1, 3).setValues([
      ['DEFAULT', resetHash, nowStr]
    ]);

    appendAuditLogInternal_(ss, {
      aktorId: session.idUser,
      aktorNama: session.namaLengkap,
      roleAktor: session.role,
      aksi: 'RESET_PASSWORD_DEFAULT',
      modulTarget: 'Users',
      idTarget: cleanTargetId,
      keterangan:
        'Reset password akun ' +
        targetRow.data.Username_NIP +
        ' (' +
        targetRow.data.Nama_Lengkap +
        ') ke password default; status kembali DEFAULT.'
    });

    return {
      success: true,
      message:
        'Password untuk ' +
        targetRow.data.Nama_Lengkap +
        ' berhasil direset ke default dan status dikembalikan ke DEFAULT.'
    };
  } catch (err) {
    Logger.log('Error pada resetPasswordDefault: ' + err.message);
    return {
      success: false,
      message: err.message
    };
  } finally {
    lock.releaseLock();
  }
}

/**
 * ============================================================================
 * PROFIL PUBLIK & CACHING AMAN (DATA NON-SENSITIF)
 * ============================================================================
 */

/**
 * Mengambil profil publik Komite Keperawatan RSUD dr. Soedarso, struktur organisasi
 * umum, serta daftar dokumen bervisibilitas PUBLIK.
 * Menggunakan CacheService secara aman karena hanya memuat informasi umum/publik.
 * @return {Object} Data profil publik
 */
function getPublicProfile() {
  try {
    initializeSheets();
    var cache = CacheService.getScriptCache();
    var cachedStr = cache.get(APP_CONFIG.PUBLIC_CACHE_KEY);
    if (cachedStr) {
      return {
        success: true,
        fromCache: true,
        data: JSON.parse(cachedStr)
      };
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var docSheet = ss.getSheetByName(APP_CONFIG.SHEETS.DOKUMEN_REGULASI);
    var publicDocs = [];

    if (docSheet && docSheet.getLastRow() > 1) {
      var rows = readSheetAsObjects_(docSheet);
      for (var i = 0; i < rows.length; i++) {
        var vis = String(rows[i].Visibilitas || '').toUpperCase();
        if (vis === 'PUBLIK') {
          publicDocs.push({
            ID_Dokumen: String(rows[i].ID_Dokumen || ''),
            Judul_Dokumen: String(rows[i].Judul_Dokumen || ''),
            Kategori: String(rows[i].Kategori || ''),
            Nomor_Dokumen: String(rows[i].Nomor_Dokumen || ''),
            Link_Dokumen: String(rows[i].Link_Dokumen || ''),
            Tanggal_Terbit: normalizeCellToString_(rows[i].Tanggal_Terbit),
            Visibilitas: 'PUBLIK'
          });
        }
      }
    }

    var publicData = {
      institusi: 'RSUD dr. Soedarso',
      unitKerja: 'Komite Keperawatan',
      deskripsi:
        'Wadah non-struktural di lingkungan RSUD dr. Soedarso yang berfungsi menyelenggarakan tata kelola klinis, kredensialing, peningkatan mutu profesi, serta penegakan etik dan disiplin profesi keperawatan secara profesional, akuntabel, dan berorientasi keselamatan pasien.',
      visiSingkat:
        'Mewujudkan pelayanan keperawatan yang profesional, beretika, bermutu tinggi, dan terlindungi secara hukum di RSUD dr. Soedarso.',
      strukturOrganisasi: [
        {
          jabatan: 'Ketua Komite Keperawatan',
          fungsi: 'Memimpin koordinasi strategis, kebijakan tata kelola klinis, dan sinergi antar-subkomite.'
        },
        {
          jabatan: 'Sekretaris Komite Keperawatan',
          fungsi: 'Mengelola administrasi kesekretariatan, dokumentasi resmi, dan koordinasi kegiatan komite.'
        },
        {
          jabatan: 'Subkomite Kredensial',
          fungsi: 'Menyelenggarakan proses kredensialing dan rekredensialing serta penetapan kewenangan klinis perawat.'
        },
        {
          jabatan: 'Subkomite Mutu Profesi',
          fungsi: 'Menyusun standar asuhan, audit keperawatan, dan pengembangan kompetensi berkelanjutan.'
        },
        {
          jabatan: 'Subkomite Etik dan Disiplin Profesi',
          fungsi: 'Membina etika profesi, menjaga disiplin keperawatan, dan menangani penyelesaian masalah etik.'
        }
      ],
      dokumenPublik: publicDocs
    };

    cache.put(
      APP_CONFIG.PUBLIC_CACHE_KEY,
      JSON.stringify(publicData),
      APP_CONFIG.PUBLIC_CACHE_TTL_SECONDS
    );

    return {
      success: true,
      fromCache: false,
      data: publicData
    };
  } catch (err) {
    Logger.log('Error pada getPublicProfile: ' + err.message);
    return {
      success: false,
      message: 'Gagal memuat profil publik: ' + err.message
    };
  }
}

/**
 * ============================================================================
 * MANAJEMEN AKUN & PROFIL PERAWAT (KONTROL AKSES KETAT & IMPOR MASSAL CSV)
 * ============================================================================
 */

/**
 * Mengambil daftar akun pengguna (Users) untuk keperluan administrasi.
 * Hanya dapat diakses oleh SUPER_ADMIN atau ADMIN_KOMITE yang telah mengganti password default.
 * Password_Hash tidak pernah dikirimkan ke client.
 * @param {string} token Token sesi
 * @return {Object} Daftar pengguna aman
 */
function getUsersList(token) {
  try {
    var session = requireAuthorizedRole_(token, ['SUPER_ADMIN', 'ADMIN_KOMITE']);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var usersSheet = ss.getSheetByName(APP_CONFIG.SHEETS.USERS);
    var rows = readSheetAsObjects_(usersSheet);

    var safeUsers = rows.map(function (r) {
      return {
        ID_User: String(r.ID_User || ''),
        Username_NIP: String(r.Username_NIP || ''),
        Nama_Lengkap: String(r.Nama_Lengkap || ''),
        Role: String(r.Role || ''),
        Status_Password: String(r.Status_Password || 'DEFAULT'),
        Tanggal_Update: normalizeCellToString_(r.Tanggal_Update),
        Status_Akun: String(r.Status_Akun || 'AKTIF')
      };
    });

    appendAuditLogInternal_(ss, {
      aktorId: session.idUser,
      aktorNama: session.namaLengkap,
      roleAktor: session.role,
      aksi: 'AKSES_DAFTAR_USER',
      modulTarget: 'Users',
      idTarget: 'ALL_USERS',
      keterangan: 'Mengakses daftar akun pengguna sistem.'
    });

    return {
      success: true,
      users: safeUsers
    };
  } catch (err) {
    Logger.log('Error pada getUsersList: ' + err.message);
    return { success: false, message: err.message };
  }
}

/**
 * Mengambil data Profil_Perawat sesuai hak akses kredensial:
 * - SUPER_ADMIN, ADMIN_KOMITE, SUBKOMITE_KREDENSIAL, SUBKOMITE_MUTU, SUBKOMITE_ETIK:
 *   dapat melihat daftar profil perawat sesuai cakupan kewenangannya.
 * - PERAWAT: hanya mendapatkan data miliknya sendiri (berdasarkan ID_User atau NIP/Username).
 * Mencatat akses data privat ke Audit_Log.
 * @param {string} token Token sesi
 * @return {Object} Daftar profil perawat yang diotorisasi
 */
function getProfilPerawatList(token) {
  try {
    var session = requireAuthenticatedSession_(token, false);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var profilSheet = ss.getSheetByName(APP_CONFIG.SHEETS.PROFIL_PERAWAT);
    var allProfiles = readSheetAsObjects_(profilSheet);

    var allowedRolesAll = [
      'SUPER_ADMIN',
      'ADMIN_KOMITE',
      'SUBKOMITE_KREDENSIAL',
      'SUBKOMITE_MUTU',
      'SUBKOMITE_ETIK'
    ];

    var result = [];

    if (allowedRolesAll.indexOf(session.role) !== -1) {
      result = allProfiles.map(function (p) {
        return normalizeProfilPerawatRow_(p);
      });
    } else if (session.role === 'PERAWAT') {
      for (var i = 0; i < allProfiles.length; i++) {
        var row = allProfiles[i];
        if (
          String(row.ID_User || '').trim() === session.idUser ||
          String(row.NIP || '').trim() === session.usernameNip
        ) {
          result.push(normalizeProfilPerawatRow_(row));
        }
      }
    } else {
      throw new Error('Role Anda tidak memiliki izin untuk mengakses data profil perawat.');
    }

    appendAuditLogInternal_(ss, {
      aktorId: session.idUser,
      aktorNama: session.namaLengkap,
      roleAktor: session.role,
      aksi: 'AKSES_DATA_PRIVAT_PERAWAT',
      modulTarget: 'Profil_Perawat',
      idTarget: session.role === 'PERAWAT' ? session.idUser : 'FILTERED_LIST',
      keterangan:
        'Mengakses data profil perawat (' + result.length + ' rekaman sesuai otorisasi).'
    });

    return {
      success: true,
      profiles: result
    };
  } catch (err) {
    Logger.log('Error pada getProfilPerawatList: ' + err.message);
    return { success: false, message: err.message };
  }
}

/**
 * Menyimpan (tambah baru atau update) satu data Profil_Perawat dan memastikan
 * akun pengguna (Users) terkait tersedia dengan password default jika belum ada.
 * Otorisasi: SUPER_ADMIN, ADMIN_KOMITE, atau SUBKOMITE_KREDENSIAL (untuk pembaruan jenjang/data);
 * PERAWAT hanya boleh memperbarui kontak/alamat miliknya sendiri.
 * @param {string} token Token sesi
 * @param {Object} payload Data profil perawat
 * @return {Object} Hasil penyimpanan
 */
function saveProfilPerawat(token, payload) {
  var lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    var session = requireAuthenticatedSession_(token, false);
    if (!payload || typeof payload !== 'object') {
      return { success: false, message: 'Data profil perawat tidak valid.' };
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var profilSheet = ss.getSheetByName(APP_CONFIG.SHEETS.PROFIL_PERAWAT);
    var usersSheet = ss.getSheetByName(APP_CONFIG.SHEETS.USERS);

    var idPerawat = String(payload.ID_Perawat || '').trim();
    var nip = String(payload.NIP || '').trim();
    var namaLengkap = String(payload.Nama_Lengkap || '').trim();
    var jenjangPk = String(payload.Jenjang_PK || 'Pra-PK').trim();
    var unitKerja = String(payload.Unit_Kerja || '').trim();
    var noHp = String(payload.No_HP || '').trim();
    var email = String(payload.Email || '').trim();
    var alamat = String(payload.Alamat || '').trim();
    var nomorStr = String(payload.Nomor_STR || '').trim();
    var masaBerlakuStr = String(payload.Masa_Berlaku_STR || '').trim();
    var nomorSip = String(payload.Nomor_SIP || '').trim();
    var masaBerlakuSip = String(payload.Masa_Berlaku_SIP || '').trim();

    if (!nip || !namaLengkap || !unitKerja) {
      return {
        success: false,
        message: 'NIP, Nama Lengkap, dan Unit Kerja wajib diisi.'
      };
    }

    if (APP_CONFIG.VALID_JENJANG_PK.indexOf(jenjangPk) === -1) {
      return {
        success: false,
        message: 'Jenjang PK tidak valid. Gunakan: ' + APP_CONFIG.VALID_JENJANG_PK.join(', ')
      };
    }

    var existingProfil = findProfilByIdOrNip_(profilSheet, idPerawat, nip);
    var isAdminOrSubkomite =
      ['SUPER_ADMIN', 'ADMIN_KOMITE', 'SUBKOMITE_KREDENSIAL'].indexOf(session.role) !== -1;

    if (!isAdminOrSubkomite) {
      if (session.role !== 'PERAWAT') {
        throw new Error('Anda tidak memiliki hak akses untuk mengubah data profil perawat.');
      }
      // Perawat hanya boleh mengubah profilnya sendiri
      if (!existingProfil) {
        throw new Error('Perawat tidak diizinkan membuat data profil baru secara mandiri.');
      }
      var isOwner =
        String(existingProfil.data.ID_User || '').trim() === session.idUser ||
        String(existingProfil.data.NIP || '').trim() === session.usernameNip;
      if (!isOwner) {
        appendAuditLogInternal_(ss, {
          aktorId: session.idUser,
          aktorNama: session.namaLengkap,
          roleAktor: session.role,
          aksi: 'AKSES_DITOLAK',
          modulTarget: 'Profil_Perawat',
          idTarget: existingProfil.data.ID_Perawat || nip,
          keterangan: 'Percobaan ubah profil perawat milik pengguna lain.'
        });
        throw new Error('Akses ditolak: Anda hanya dapat mengubah data profil milik sendiri.');
      }
      // Pertahankan field administratif inti jika diubah oleh PERAWAT
      nip = String(existingProfil.data.NIP || nip);
      namaLengkap = String(existingProfil.data.Nama_Lengkap || namaLengkap);
      jenjangPk = String(existingProfil.data.Jenjang_PK || jenjangPk);
      unitKerja = String(existingProfil.data.Unit_Kerja || unitKerja);
    }

    var nowStr = formatDateTimeWib_(new Date());

    // Pastikan akun User ada untuk NIP ini jika dibuat oleh Admin/Subkomite
    var linkedUserId = existingProfil ? String(existingProfil.data.ID_User || '').trim() : '';
    var existingUser = findUserRowByUsername_(usersSheet, nip);

    if (!existingUser && isAdminOrSubkomite) {
      linkedUserId = generateId_('USR');
      var defaultHash = hashPassword_(APP_CONFIG.DEFAULT_PASSWORD, linkedUserId);
      usersSheet.appendRow([
        linkedUserId,
        nip,
        namaLengkap,
        'PERAWAT',
        'DEFAULT',
        defaultHash,
        nowStr,
        'AKTIF'
      ]);
    } else if (existingUser) {
      linkedUserId = String(existingUser.data.ID_User || linkedUserId);
      if (isAdminOrSubkomite) {
        // Sinkronkan nama lengkap di tabel Users jika diubah oleh Admin
        usersSheet.getRange(existingUser.rowIndex, 3).setValue(namaLengkap);
        usersSheet.getRange(existingUser.rowIndex, 7).setValue(nowStr);
      }
    }

    var rowValues = [
      existingProfil ? String(existingProfil.data.ID_Perawat) : generateId_('PRW'),
      linkedUserId,
      nip,
      namaLengkap,
      jenjangPk,
      unitKerja,
      noHp,
      email,
      alamat,
      nomorStr,
      masaBerlakuStr,
      nomorSip,
      masaBerlakuSip,
      nowStr
    ];

    if (existingProfil) {
      profilSheet.getRange(existingProfil.rowIndex, 1, 1, rowValues.length).setValues([rowValues]);
      appendAuditLogInternal_(ss, {
        aktorId: session.idUser,
        aktorNama: session.namaLengkap,
        roleAktor: session.role,
        aksi: 'UPDATE_PROFIL_PERAWAT',
        modulTarget: 'Profil_Perawat',
        idTarget: rowValues[0],
        keterangan: 'Memperbarui data profil perawat ' + namaLengkap + ' (NIP: ' + nip + ').'
      });
    } else {
      profilSheet.appendRow(rowValues);
      appendAuditLogInternal_(ss, {
        aktorId: session.idUser,
        aktorNama: session.namaLengkap,
        roleAktor: session.role,
        aksi: 'CREATE_PROFIL_PERAWAT',
        modulTarget: 'Profil_Perawat',
        idTarget: rowValues[0],
        keterangan: 'Menambahkan profil perawat baru ' + namaLengkap + ' (NIP: ' + nip + ').'
      });
    }

    return {
      success: true,
      message: existingProfil
        ? 'Data profil perawat berhasil diperbarui.'
        : 'Data profil perawat baru berhasil disimpan (password awal akun: password default sistem, status DEFAULT).',
      idPerawat: rowValues[0]
    };
  } catch (err) {
    Logger.log('Error pada saveProfilPerawat: ' + err.message);
    return { success: false, message: err.message };
  } finally {
    lock.releaseLock();
  }
}

/**
 * Impor data perawat & akun pengguna secara massal dari teks CSV tervalidasi.
 * Khusus SUPER_ADMIN dan ADMIN_KOMITE.
 * Format kolom CSV yang didukung (dengan atau tanpa header):
 * NIP,Nama_Lengkap,Jenjang_PK,Unit_Kerja,No_HP,Email,Alamat,Nomor_STR,Masa_Berlaku_STR,Nomor_SIP,Masa_Berlaku_SIP,Role
 * @param {string} token Token sesi
 * @param {string} csvText Isi CSV
 * @return {Object} Ringkasan hasil impor massal
 */
function bulkImportPerawat(token, csvText) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var session = requireAuthorizedRole_(token, ['SUPER_ADMIN', 'ADMIN_KOMITE']);
    var rawCsv = String(csvText || '').trim();
    if (!rawCsv) {
      return {
        success: false,
        message: 'Data CSV kosong. Silakan unggah file CSV atau tempelkan data CSV terlebih dahulu.'
      };
    }

    var parsedRows = parseCsvStrict_(rawCsv);
    if (parsedRows.length === 0) {
      return { success: false, message: 'Tidak ada baris data yang dapat diproses dari CSV.' };
    }

    // Deteksi baris header jika kolom pertama bernama NIP
    var startIndex = 0;
    var firstCol = String(parsedRows[0][0] || '').trim().toUpperCase();
    if (firstCol === 'NIP' || firstCol === 'USERNAME_NIP') {
      startIndex = 1;
    }

    if (parsedRows.length - startIndex <= 0) {
      return { success: false, message: 'CSV hanya berisi header tanpa baris data perawat.' };
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var profilSheet = ss.getSheetByName(APP_CONFIG.SHEETS.PROFIL_PERAWAT);
    var usersSheet = ss.getSheetByName(APP_CONFIG.SHEETS.USERS);

    var insertedCount = 0;
    var updatedCount = 0;
    var errors = [];
    var nowStr = formatDateTimeWib_(new Date());

    for (var i = startIndex; i < parsedRows.length; i++) {
      var lineNum = i + 1;
      var cols = parsedRows[i];

      var nip = String(cols[0] || '').trim();
      var namaLengkap = String(cols[1] || '').trim();
      var jenjangPk = String(cols[2] || 'Pra-PK').trim();
      var unitKerja = String(cols[3] || '').trim();
      var noHp = String(cols[4] || '').trim();
      var email = String(cols[5] || '').trim();
      var alamat = String(cols[6] || '').trim();
      var nomorStr = String(cols[7] || '').trim();
      var masaBerlakuStr = String(cols[8] || '').trim();
      var nomorSip = String(cols[9] || '').trim();
      var masaBerlakuSip = String(cols[10] || '').trim();
      var roleInput = String(cols[11] || 'PERAWAT').trim().toUpperCase();

      if (!nip || !namaLengkap || !unitKerja) {
        errors.push('Baris ' + lineNum + ': NIP, Nama_Lengkap, dan Unit_Kerja wajib diisi.');
        continue;
      }

      if (APP_CONFIG.VALID_JENJANG_PK.indexOf(jenjangPk) === -1) {
        errors.push(
          'Baris ' +
            lineNum +
            ' (NIP ' +
            nip +
            '): Jenjang_PK "' +
            jenjangPk +
            '" tidak valid.'
        );
        continue;
      }

      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push('Baris ' + lineNum + ' (NIP ' + nip + '): Format Email "' + email + '" tidak valid.');
        continue;
      }

      var assignedRole =
        APP_CONFIG.VALID_ROLES.indexOf(roleInput) !== -1 && roleInput !== 'SUPER_ADMIN'
          ? roleInput
          : 'PERAWAT';

      // Buat atau perbarui akun di sheet Users
      var existingUser = findUserRowByUsername_(usersSheet, nip);
      var userId = '';

      if (!existingUser) {
        userId = generateId_('USR');
        var passHash = hashPassword_(APP_CONFIG.DEFAULT_PASSWORD, userId);
        usersSheet.appendRow([
          userId,
          nip,
          namaLengkap,
          assignedRole,
          'DEFAULT',
          passHash,
          nowStr,
          'AKTIF'
        ]);
      } else {
        userId = String(existingUser.data.ID_User || '');
        usersSheet.getRange(existingUser.rowIndex, 3).setValue(namaLengkap);
        usersSheet.getRange(existingUser.rowIndex, 7).setValue(nowStr);
      }

      // Buat atau perbarui data di sheet Profil_Perawat
      var existingProfil = findProfilByIdOrNip_(profilSheet, '', nip);
      var profilValues = [
        existingProfil ? String(existingProfil.data.ID_Perawat) : generateId_('PRW'),
        userId,
        nip,
        namaLengkap,
        jenjangPk,
        unitKerja,
        noHp,
        email,
        alamat,
        nomorStr,
        masaBerlakuStr,
        nomorSip,
        masaBerlakuSip,
        nowStr
      ];

      if (existingProfil) {
        profilSheet.getRange(existingProfil.rowIndex, 1, 1, profilValues.length).setValues([profilValues]);
        updatedCount++;
      } else {
        profilSheet.appendRow(profilValues);
        insertedCount++;
      }
    }

    appendAuditLogInternal_(ss, {
      aktorId: session.idUser,
      aktorNama: session.namaLengkap,
      roleAktor: session.role,
      aksi: 'IMPOR_MASSAL_PERAWAT',
      modulTarget: 'Profil_Perawat',
      idTarget: 'BULK_CSV',
      keterangan:
        'Impor CSV selesai: ' +
        insertedCount +
        ' baru, ' +
        updatedCount +
        ' diperbarui, ' +
        errors.length +
        ' baris gagal validasi.'
    });

    return {
      success: insertedCount + updatedCount > 0 || errors.length === 0,
      message:
        'Proses impor massal selesai: ' +
        insertedCount +
        ' data baru, ' +
        updatedCount +
        ' data diperbarui, ' +
        errors.length +
        ' baris ditolak validasi.',
      insertedCount: insertedCount,
      updatedCount: updatedCount,
      errors: errors
    };
  } catch (err) {
    Logger.log('Error pada bulkImportPerawat: ' + err.message);
    return { success: false, message: 'Gagal impor massal: ' + err.message };
  } finally {
    lock.releaseLock();
  }
}

/**
 * ============================================================================
 * MODUL KREDENSIAL, MUTU & ETIK/DISIPLIN (KONTROL AKSES KETAT)
 * ============================================================================
 */

/**
 * Mengambil data Kredensial_Mutu_Etik sesuai role dan kepemilikan data.
 * Filter berdasarkan jenisRekam opsional ('KREDENSIAL', 'REKREDENSIAL', 'MUTU', 'ETIK_DISIPLIN').
 * @param {string} token Token sesi
 * @param {string} jenisRekam Filter jenis rekam (opsional)
 * @return {Object} Daftar rekaman yang diotorisasi
 */
function getKredensialMutuEtikList(token, jenisRekam) {
  try {
    var session = requireAuthenticatedSession_(token, false);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var rekSheet = ss.getSheetByName(APP_CONFIG.SHEETS.KREDENSIAL_MUTU_ETIK);
    var profilSheet = ss.getSheetByName(APP_CONFIG.SHEETS.PROFIL_PERAWAT);

    var allRecords = readSheetAsObjects_(rekSheet);
    var allProfiles = readSheetAsObjects_(profilSheet);

    // Peta ID_Perawat -> info dasar perawat
    var profilMap = {};
    var myPerawatIds = [];
    for (var p = 0; p < allProfiles.length; p++) {
      var pr = allProfiles[p];
      var pid = String(pr.ID_Perawat || '').trim();
      profilMap[pid] = {
        Nama_Lengkap: String(pr.Nama_Lengkap || ''),
        NIP: String(pr.NIP || ''),
        Unit_Kerja: String(pr.Unit_Kerja || ''),
        Jenjang_PK: String(pr.Jenjang_PK || '')
      };
      if (
        String(pr.ID_User || '').trim() === session.idUser ||
        String(pr.NIP || '').trim() === session.usernameNip
      ) {
        myPerawatIds.push(pid);
      }
    }

    var filterJenis = String(jenisRekam || '').trim().toUpperCase();
    var filtered = [];

    for (var i = 0; i < allRecords.length; i++) {
      var rec = allRecords[i];
      var jenis = String(rec.Jenis_Rekam || '').trim().toUpperCase();
      var recPerawatId = String(rec.ID_Perawat || '').trim();
      var visRole = String(rec.Visibilitas_Role || '').trim().toUpperCase();

      if (filterJenis && jenis !== filterJenis) {
        continue;
      }

      var isOwner = myPerawatIds.indexOf(recPerawatId) !== -1;
      var canAccess = false;

      if (session.role === 'SUPER_ADMIN' || session.role === 'ADMIN_KOMITE') {
        canAccess = true;
      } else if (
        session.role === 'SUBKOMITE_KREDENSIAL' &&
        (jenis === 'KREDENSIAL' || jenis === 'REKREDENSIAL')
      ) {
        canAccess = true;
      } else if (session.role === 'SUBKOMITE_MUTU' && jenis === 'MUTU') {
        canAccess = true;
      } else if (session.role === 'SUBKOMITE_ETIK' && jenis === 'ETIK_DISIPLIN') {
        canAccess = true;
      } else if (session.role === 'PERAWAT' && isOwner) {
        // Perawat melihat rekaman miliknya; catatan rahasia internal subkomite disembunyikan
        canAccess = true;
      }

      if (!canAccess) {
        continue;
      }

      // Sembunyikan Catatan_Rahasia jika pemanggil adalah PERAWAT atau visibilitas tidak mengizinkan
      var hideSecret =
        session.role === 'PERAWAT' ||
        (visRole &&
          visRole !== 'ALL' &&
          visRole !== session.role &&
          ['SUPER_ADMIN', 'ADMIN_KOMITE'].indexOf(session.role) === -1);

      var pInfo = profilMap[recPerawatId] || {
        Nama_Lengkap: '-',
        NIP: '-',
        Unit_Kerja: '-',
        Jenjang_PK: '-'
      };

      filtered.push({
        ID_Rekam: String(rec.ID_Rekam || ''),
        ID_Perawat: recPerawatId,
        Nama_Perawat: pInfo.Nama_Lengkap,
        NIP_Perawat: pInfo.NIP,
        Unit_Kerja: pInfo.Unit_Kerja,
        Jenjang_PK: pInfo.Jenjang_PK,
        Jenis_Rekam: jenis,
        Status_Proses: String(rec.Status_Proses || ''),
        Tanggal_Kegiatan: normalizeCellToString_(rec.Tanggal_Kegiatan),
        Ringkasan_Hasil: String(rec.Ringkasan_Hasil || ''),
        Catatan_Rahasia: hideSecret ? '[TERBATAS / RAHASIA]' : String(rec.Catatan_Rahasia || ''),
        Petugas_Penilai: String(rec.Petugas_Penilai || ''),
        Visibilitas_Role: visRole || 'TERBATAS'
      });
    }

    appendAuditLogInternal_(ss, {
      aktorId: session.idUser,
      aktorNama: session.namaLengkap,
      roleAktor: session.role,
      aksi: 'AKSES_KREDENSIAL_MUTU_ETIK',
      modulTarget: 'Kredensial_Mutu_Etik',
      idTarget: filterJenis || 'ALL',
      keterangan:
        'Mengakses data Kredensial/Mutu/Etik (' +
        (filterJenis || 'SEMUA') +
        '), jumlah: ' +
        filtered.length +
        '.'
    });

    return {
      success: true,
      records: filtered
    };
  } catch (err) {
    Logger.log('Error pada getKredensialMutuEtikList: ' + err.message);
    return { success: false, message: err.message };
  }
}

/**
 * Menyimpan pengajuan atau hasil penilaian pada Kredensial_Mutu_Etik.
 * - PERAWAT dapat mengajukan KREDENSIAL / REKREDENSIAL untuk profil dirinya sendiri (Status_Proses: DIAJUKAN).
 * - SUPER_ADMIN, ADMIN_KOMITE, dan Subkomite terkait dapat membuat/memperbarui status & penilaian.
 * @param {string} token Token sesi
 * @param {Object} payload Data rekaman
 * @return {Object} Hasil penyimpanan
 */
function saveKredensialMutuEtik(token, payload) {
  var lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    var session = requireAuthenticatedSession_(token, false);
    if (!payload || typeof payload !== 'object') {
      return { success: false, message: 'Data rekaman tidak valid.' };
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var rekSheet = ss.getSheetByName(APP_CONFIG.SHEETS.KREDENSIAL_MUTU_ETIK);
    var profilSheet = ss.getSheetByName(APP_CONFIG.SHEETS.PROFIL_PERAWAT);

    var idRekam = String(payload.ID_Rekam || '').trim();
    var idPerawat = String(payload.ID_Perawat || '').trim();
    var jenisRekam = String(payload.Jenis_Rekam || '').trim().toUpperCase();
    var statusProses = String(payload.Status_Proses || 'DIAJUKAN').trim().toUpperCase();
    var tanggalKegiatan = String(payload.Tanggal_Kegiatan || '').trim();
    var ringkasanHasil = String(payload.Ringkasan_Hasil || '').trim();
    var catatanRahasia = String(payload.Catatan_Rahasia || '').trim();
    var petugasPenilai = String(payload.Petugas_Penilai || session.namaLengkap).trim();
    var visibilitasRole = String(payload.Visibilitas_Role || '').trim().toUpperCase();

    if (!idPerawat || APP_CONFIG.VALID_JENIS_REKAM.indexOf(jenisRekam) === -1) {
      return {
        success: false,
        message: 'ID Perawat dan Jenis Rekam wajib diisi dengan nilai yang valid.'
      };
    }

    var profilRow = findProfilByIdOrNip_(profilSheet, idPerawat, '');
    if (!profilRow) {
      return { success: false, message: 'Data profil perawat tujuan tidak ditemukan.' };
    }

    var isOwner =
      String(profilRow.data.ID_User || '').trim() === session.idUser ||
      String(profilRow.data.NIP || '').trim() === session.usernameNip;

    var hasAdminOrSubkomiteAccess =
      session.role === 'SUPER_ADMIN' ||
      session.role === 'ADMIN_KOMITE' ||
      (session.role === 'SUBKOMITE_KREDENSIAL' &&
        (jenisRekam === 'KREDENSIAL' || jenisRekam === 'REKREDENSIAL')) ||
      (session.role === 'SUBKOMITE_MUTU' && jenisRekam === 'MUTU') ||
      (session.role === 'SUBKOMITE_ETIK' && jenisRekam === 'ETIK_DISIPLIN');

    if (!hasAdminOrSubkomiteAccess) {
      if (
        session.role === 'PERAWAT' &&
        isOwner &&
        !idRekam &&
        (jenisRekam === 'KREDENSIAL' || jenisRekam === 'REKREDENSIAL')
      ) {
        statusProses = 'DIAJUKAN';
        catatanRahasia = '';
        petugasPenilai = '-';
        visibilitasRole = 'SUBKOMITE_KREDENSIAL';
      } else {
        appendAuditLogInternal_(ss, {
          aktorId: session.idUser,
          aktorNama: session.namaLengkap,
          roleAktor: session.role,
          aksi: 'AKSES_DITOLAK',
          modulTarget: 'Kredensial_Mutu_Etik',
          idTarget: idRekam || idPerawat,
          keterangan:
            'Percobaan simpan/ubah rekaman ' + jenisRekam + ' tanpa otorisasi yang sesuai.'
        });
        throw new Error('Anda tidak memiliki hak akses untuk menyimpan atau mengubah data ini.');
      }
    }

    if (!tanggalKegiatan) {
      tanggalKegiatan = formatDateWib_(new Date());
    }

    if (!visibilitasRole) {
      if (jenisRekam === 'KREDENSIAL' || jenisRekam === 'REKREDENSIAL') {
        visibilitasRole = 'SUBKOMITE_KREDENSIAL';
      } else if (jenisRekam === 'MUTU') {
        visibilitasRole = 'SUBKOMITE_MUTU';
      } else {
        visibilitasRole = 'SUBKOMITE_ETIK';
      }
    }

    var existingRec = idRekam ? findRekamById_(rekSheet, idRekam) : null;
    var finalId = existingRec ? String(existingRec.data.ID_Rekam) : generateId_('RKM');

    var rowValues = [
      finalId,
      idPerawat,
      jenisRekam,
      statusProses,
      tanggalKegiatan,
      ringkasanHasil,
      catatanRahasia,
      petugasPenilai,
      visibilitasRole
    ];

    if (existingRec) {
      rekSheet.getRange(existingRec.rowIndex, 1, 1, rowValues.length).setValues([rowValues]);
      appendAuditLogInternal_(ss, {
        aktorId: session.idUser,
        aktorNama: session.namaLengkap,
        roleAktor: session.role,
        aksi: 'UPDATE_KREDENSIAL_MUTU_ETIK',
        modulTarget: 'Kredensial_Mutu_Etik',
        idTarget: finalId,
        keterangan:
          'Memperbarui rekaman ' + jenisRekam + ' (' + statusProses + ') untuk ' + profilRow.data.Nama_Lengkap
      });
    } else {
      rekSheet.appendRow(rowValues);
      appendAuditLogInternal_(ss, {
        aktorId: session.idUser,
        aktorNama: session.namaLengkap,
        roleAktor: session.role,
        aksi: 'CREATE_KREDENSIAL_MUTU_ETIK',
        modulTarget: 'Kredensial_Mutu_Etik',
        idTarget: finalId,
        keterangan:
          'Menambahkan rekaman ' + jenisRekam + ' (' + statusProses + ') untuk ' + profilRow.data.Nama_Lengkap
      });
    }

    return {
      success: true,
      message: existingRec
        ? 'Rekaman berhasil diperbarui.'
        : 'Data/pengajuan berhasil disimpan.',
      idRekam: finalId
    };
  } catch (err) {
    Logger.log('Error pada saveKredensialMutuEtik: ' + err.message);
    return { success: false, message: err.message };
  } finally {
    lock.releaseLock();
  }
}

/**
 * ============================================================================
 * MODUL DOKUMEN / REGULASI / SPO KEPERAWATAN
 * ============================================================================
 */

/**
 * Mengambil daftar dokumen sesuai visibilitas dan status autentikasi/role pengguna.
 * - Belum login: hanya PUBLIK.
 * - Sudah login: PUBLIK + INTERNAL_PERAWAT; TERBATAS_KOMITE hanya untuk role komite/admin/subkomite.
 * @param {string} token Token sesi (opsional)
 * @return {Object} Daftar dokumen yang diizinkan
 */
function getDokumenRegulasiList(token) {
  try {
    var session = null;
    if (token && String(token).trim()) {
      session = requireAuthenticatedSession_(token, false);
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var docSheet = ss.getSheetByName(APP_CONFIG.SHEETS.DOKUMEN_REGULASI);
    var rows = readSheetAsObjects_(docSheet);

    var komiteRoles = [
      'SUPER_ADMIN',
      'ADMIN_KOMITE',
      'SUBKOMITE_KREDENSIAL',
      'SUBKOMITE_MUTU',
      'SUBKOMITE_ETIK'
    ];

    var docs = [];
    for (var i = 0; i < rows.length; i++) {
      var r = rows[i];
      var vis = String(r.Visibilitas || 'PUBLIK').trim().toUpperCase();
      var allowed = false;

      if (vis === 'PUBLIK') {
        allowed = true;
      } else if (session && vis === 'INTERNAL_PERAWAT') {
        allowed = true;
      } else if (session && vis === 'TERBATAS_KOMITE' && komiteRoles.indexOf(session.role) !== -1) {
        allowed = true;
      }

      if (allowed) {
        docs.push({
          ID_Dokumen: String(r.ID_Dokumen || ''),
          Judul_Dokumen: String(r.Judul_Dokumen || ''),
          Kategori: String(r.Kategori || ''),
          Nomor_Dokumen: String(r.Nomor_Dokumen || ''),
          Link_Dokumen: String(r.Link_Dokumen || ''),
          Tanggal_Terbit: normalizeCellToString_(r.Tanggal_Terbit),
          Visibilitas: vis
        });
      }
    }

    if (session) {
      appendAuditLogInternal_(ss, {
        aktorId: session.idUser,
        aktorNama: session.namaLengkap,
        roleAktor: session.role,
        aksi: 'AKSES_DOKUMEN_REGULASI',
        modulTarget: 'Dokumen_Regulasi',
        idTarget: 'FILTERED_DOCS',
        keterangan: 'Mengakses daftar dokumen regulasi/SPO (' + docs.length + ' dokumen).'
      });
    }

    return {
      success: true,
      documents: docs
    };
  } catch (err) {
    Logger.log('Error pada getDokumenRegulasiList: ' + err.message);
    return { success: false, message: err.message };
  }
}

/**
 * Menyimpan dokumen regulasi/SPO baru atau memperbarui dokumen eksisting.
 * Hanya untuk SUPER_ADMIN atau ADMIN_KOMITE.
 * @param {string} token Token sesi
 * @param {Object} payload Data dokumen
 * @return {Object} Hasil penyimpanan
 */
function saveDokumenRegulasi(token, payload) {
  var lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    var session = requireAuthorizedRole_(token, ['SUPER_ADMIN', 'ADMIN_KOMITE']);
    if (!payload || typeof payload !== 'object') {
      return { success: false, message: 'Data dokumen tidak valid.' };
    }

    var idDok = String(payload.ID_Dokumen || '').trim();
    var judul = String(payload.Judul_Dokumen || '').trim();
    var kategori = String(payload.Kategori || '').trim().toUpperCase();
    var nomorDok = String(payload.Nomor_Dokumen || '').trim();
    var linkDok = String(payload.Link_Dokumen || '').trim();
    var tanggalTerbit = String(payload.Tanggal_Terbit || '').trim();
    var visibilitas = String(payload.Visibilitas || 'PUBLIK').trim().toUpperCase();

    if (!judul || !nomorDok) {
      return { success: false, message: 'Judul Dokumen dan Nomor Dokumen wajib diisi.' };
    }

    if (APP_CONFIG.VALID_KATEGORI_DOKUMEN.indexOf(kategori) === -1) {
      return {
        success: false,
        message: 'Kategori dokumen tidak valid. Gunakan: ' + APP_CONFIG.VALID_KATEGORI_DOKUMEN.join(', ')
      };
    }

    if (APP_CONFIG.VALID_VISIBILITAS_DOKUMEN.indexOf(visibilitas) === -1) {
      return {
        success: false,
        message:
          'Visibilitas dokumen tidak valid. Gunakan: ' +
          APP_CONFIG.VALID_VISIBILITAS_DOKUMEN.join(', ')
      };
    }

    if (linkDok && !/^https?:\/\//i.test(linkDok)) {
      return {
        success: false,
        message: 'Link Dokumen harus diawali dengan http:// atau https://.'
      };
    }

    if (!tanggalTerbit) {
      tanggalTerbit = formatDateWib_(new Date());
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var docSheet = ss.getSheetByName(APP_CONFIG.SHEETS.DOKUMEN_REGULASI);
    var existingDoc = idDok ? findDokumenById_(docSheet, idDok) : null;
    var finalId = existingDoc ? String(existingDoc.data.ID_Dokumen) : generateId_('DOK');

    var rowValues = [
      finalId,
      judul,
      kategori,
      nomorDok,
      linkDok,
      tanggalTerbit,
      visibilitas
    ];

    if (existingDoc) {
      docSheet.getRange(existingDoc.rowIndex, 1, 1, rowValues.length).setValues([rowValues]);
      appendAuditLogInternal_(ss, {
        aktorId: session.idUser,
        aktorNama: session.namaLengkap,
        roleAktor: session.role,
        aksi: 'UPDATE_DOKUMEN_REGULASI',
        modulTarget: 'Dokumen_Regulasi',
        idTarget: finalId,
        keterangan: 'Memperbarui dokumen "' + judul + '" (' + nomorDok + ').'
      });
    } else {
      docSheet.appendRow(rowValues);
      appendAuditLogInternal_(ss, {
        aktorId: session.idUser,
        aktorNama: session.namaLengkap,
        roleAktor: session.role,
        aksi: 'CREATE_DOKUMEN_REGULASI',
        modulTarget: 'Dokumen_Regulasi',
        idTarget: finalId,
        keterangan: 'Menambahkan dokumen "' + judul + '" (' + nomorDok + ').'
      });
    }

    // Bersihkan cache publik karena dokumen PUBLIK mungkin berubah
    CacheService.getScriptCache().remove(APP_CONFIG.PUBLIC_CACHE_KEY);

    return {
      success: true,
      message: existingDoc
        ? 'Dokumen berhasil diperbarui.'
        : 'Dokumen berhasil disimpan ke arsip.',
      idDokumen: finalId
    };
  } catch (err) {
    Logger.log('Error pada saveDokumenRegulasi: ' + err.message);
    return { success: false, message: err.message };
  } finally {
    lock.releaseLock();
  }
}

/**
 * ============================================================================
 * AUDIT LOG (PENCATATAN & PEMBACAAN LOG AKTIVITAS)
 * ============================================================================
 */

/**
 * Mengambil log aktivitas dari sheet Audit_Log.
 * Hanya dapat diakses oleh SUPER_ADMIN atau ADMIN_KOMITE.
 * @param {string} token Token sesi
 * @param {number} limit Batas jumlah baris terbaru (default 200)
 * @return {Object} Daftar log aktivitas
 */
function getAuditLog(token, limit) {
  try {
    var session = requireAuthorizedRole_(token, ['SUPER_ADMIN', 'ADMIN_KOMITE']);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var logSheet = ss.getSheetByName(APP_CONFIG.SHEETS.AUDIT_LOG);
    var rows = readSheetAsObjects_(logSheet);

    var maxRows = Number(limit) > 0 ? Math.min(Number(limit), 500) : 200;
    // Urutkan dari yang terbaru (baris paling bawah ke atas)
    var reversed = rows.slice().reverse().slice(0, maxRows);

    var formattedLogs = reversed.map(function (r) {
      return {
        ID_Log: String(r.ID_Log || ''),
        Timestamp: normalizeCellToString_(r.Timestamp),
        Aktor_ID: String(r.Aktor_ID || ''),
        Aktor_Nama: String(r.Aktor_Nama || ''),
        Role_Aktor: String(r.Role_Aktor || ''),
        Aksi: String(r.Aksi || ''),
        Modul_Target: String(r.Modul_Target || ''),
        ID_Target: String(r.ID_Target || ''),
        Keterangan: String(r.Keterangan || '')
      };
    });

    return {
      success: true,
      logs: formattedLogs
    };
  } catch (err) {
    Logger.log('Error pada getAuditLog: ' + err.message);
    return { success: false, message: err.message };
  }
}

/**
 * Mencatat entri log aktivitas secara internal ke sheet Audit_Log.
 * @param {GoogleAppsScript.Spreadsheet.Spreadsheet} ss
 * @param {Object} entry
 */
function appendAuditLogInternal_(ss, entry) {
  try {
    var targetSs = ss || SpreadsheetApp.getActiveSpreadsheet();
    var logSheet = targetSs.getSheetByName(APP_CONFIG.SHEETS.AUDIT_LOG);
    if (!logSheet) return;

    ensureSheetHeaders_(logSheet, APP_CONFIG.HEADERS.Audit_Log);
    logSheet.appendRow([
      generateId_('LOG'),
      formatDateTimeWib_(new Date()),
      String(entry.aktorId || '-'),
      String(entry.aktorNama || '-'),
      String(entry.roleAktor || '-'),
      String(entry.aksi || '-'),
      String(entry.modulTarget || '-'),
      String(entry.idTarget || '-'),
      String(entry.keterangan || '-')
    ]);
  } catch (err) {
    Logger.log('Gagal menulis Audit_Log: ' + err.message);
  }
}

/**
 * ============================================================================
 * FUNGSI VALIDASI SESI, OTORISASI & HELPER INTERNAL
 * ============================================================================
 */

function getSessionCacheKey_(token) {
  return 'RSDS_KOMKEP_SESSION_' + String(token || '').trim();
}

function getSessionByToken_(token) {
  var cleanToken = String(token || '').trim();
  if (!cleanToken) return null;
  var raw = CacheService.getScriptCache().get(getSessionCacheKey_(cleanToken));
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

/**
 * Memastikan token sesi valid & aktif.
 * Jika allowDefaultPassword === false, maka status password 'DEFAULT' akan ditolak
 * sehingga pengguna wajib mengganti password terlebih dahulu.
 * @param {string} token
 * @param {boolean} allowDefaultPassword
 * @return {Object} Objek sesi aktif
 */
function requireAuthenticatedSession_(token, allowDefaultPassword) {
  var session = getSessionByToken_(token);
  if (!session || !session.idUser) {
    throw new Error('Sesi tidak valid atau telah berakhir. Silakan login kembali.');
  }

  // Periksa status password terkini di sheet Users agar tidak dapat dilewati
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var usersSheet = ss.getSheetByName(APP_CONFIG.SHEETS.USERS);
  var userRow = findUserRowById_(usersSheet, session.idUser);

  if (!userRow || String(userRow.data.Status_Akun || '').toUpperCase() !== 'AKTIF') {
    CacheService.getScriptCache().remove(getSessionCacheKey_(token));
    throw new Error('Akun tidak aktif atau tidak ditemukan.');
  }

  var currentStatusPass = String(userRow.data.Status_Password || 'DEFAULT').toUpperCase();
  session.statusPassword = currentStatusPass;
  session.role = String(userRow.data.Role || session.role);
  session.namaLengkap = String(userRow.data.Nama_Lengkap || session.namaLengkap);

  if (!allowDefaultPassword && currentStatusPass === 'DEFAULT') {
    throw new Error(
      'AKSES_DIBLOKIR_WAJIB_GANTI_PASSWORD: Anda masih menggunakan password default. Wajib ganti password sebelum mengakses data operasional.'
    );
  }

  return session;
}

/**
 * Memastikan sesi terautentikasi, bukan password DEFAULT, dan memiliki salah satu role di allowedRoles.
 * @param {string} token
 * @param {Array<string>} allowedRoles
 * @return {Object} Objek sesi aktif
 */
function requireAuthorizedRole_(token, allowedRoles) {
  var session = requireAuthenticatedSession_(token, false);
  if (!Array.isArray(allowedRoles) || allowedRoles.indexOf(session.role) === -1) {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    appendAuditLogInternal_(ss, {
      aktorId: session.idUser,
      aktorNama: session.namaLengkap,
      roleAktor: session.role,
      aksi: 'AKSES_DITOLAK',
      modulTarget: 'OTORISASI_ROLE',
      idTarget: allowedRoles.join(','),
      keterangan: 'Role ' + session.role + ' mencoba mengakses endpoint khusus.'
    });
    throw new Error('Akses ditolak: Anda tidak memiliki kewenangan untuk tindakan ini.');
  }
  return session;
}

function ensureSheetHeaders_(sheet, expectedHeaders) {
  var lastCol = sheet.getLastColumn();
  var currentHeaders = [];
  if (lastCol > 0) {
    currentHeaders = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  }
  var needsUpdate = currentHeaders.length !== expectedHeaders.length;
  if (!needsUpdate) {
    for (var i = 0; i < expectedHeaders.length; i++) {
      if (String(currentHeaders[i] || '').trim() !== expectedHeaders[i]) {
        needsUpdate = true;
        break;
      }
    }
  }
  if (needsUpdate) {
    sheet.getRange(1, 1, 1, expectedHeaders.length).setValues([expectedHeaders]);
  }
}

function formatHeaderRow_(sheet, numCols) {
  try {
    var headerRange = sheet.getRange(1, 1, 1, numCols);
    headerRange
      .setFontWeight('bold')
      .setBackground('#0F766E')
      .setFontColor('#FFFFFF');
    sheet.setFrozenRows(1);
  } catch (e) {
    Logger.log('Warning formatHeaderRow_: ' + e.message);
  }
}

function readSheetAsObjects_(sheet) {
  if (!sheet) return [];
  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();
  if (lastRow <= 1 || lastCol === 0) return [];

  var values = sheet.getRange(1, 1, lastRow, lastCol).getValues();
  var headers = values[0].map(function (h) {
    return String(h || '').trim();
  });

  var list = [];
  for (var r = 1; r < values.length; r++) {
    var rowArr = values[r];
    var isEmptyRow = rowArr.every(function (cell) {
      return cell === '' || cell === null || cell === undefined;
    });
    if (isEmptyRow) continue;

    var obj = { _rowIndex: r + 1 };
    for (var c = 0; c < headers.length; c++) {
      if (headers[c]) {
        obj[headers[c]] = rowArr[c];
      }
    }
    list.push(obj);
  }
  return list;
}

function findUserRowByUsername_(usersSheet, usernameNip) {
  var target = String(usernameNip || '').trim().toLowerCase();
  if (!target) return null;
  var rows = readSheetAsObjects_(usersSheet);
  for (var i = 0; i < rows.length; i++) {
    if (String(rows[i].Username_NIP || '').trim().toLowerCase() === target) {
      return { rowIndex: rows[i]._rowIndex, data: rows[i] };
    }
  }
  return null;
}

function findUserRowById_(usersSheet, idUser) {
  var target = String(idUser || '').trim();
  if (!target) return null;
  var rows = readSheetAsObjects_(usersSheet);
  for (var i = 0; i < rows.length; i++) {
    if (String(rows[i].ID_User || '').trim() === target) {
      return { rowIndex: rows[i]._rowIndex, data: rows[i] };
    }
  }
  return null;
}

function findProfilByIdOrNip_(profilSheet, idPerawat, nip) {
  var cleanId = String(idPerawat || '').trim();
  var cleanNip = String(nip || '').trim();
  if (!cleanId && !cleanNip) return null;

  var rows = readSheetAsObjects_(profilSheet);
  for (var i = 0; i < rows.length; i++) {
    var rId = String(rows[i].ID_Perawat || '').trim();
    var rNip = String(rows[i].NIP || '').trim();
    if ((cleanId && rId === cleanId) || (cleanNip && rNip === cleanNip)) {
      return { rowIndex: rows[i]._rowIndex, data: rows[i] };
    }
  }
  return null;
}

function findRekamById_(rekSheet, idRekam) {
  var target = String(idRekam || '').trim();
  if (!target) return null;
  var rows = readSheetAsObjects_(rekSheet);
  for (var i = 0; i < rows.length; i++) {
    if (String(rows[i].ID_Rekam || '').trim() === target) {
      return { rowIndex: rows[i]._rowIndex, data: rows[i] };
    }
  }
  return null;
}

function findDokumenById_(docSheet, idDokumen) {
  var target = String(idDokumen || '').trim();
  if (!target) return null;
  var rows = readSheetAsObjects_(docSheet);
  for (var i = 0; i < rows.length; i++) {
    if (String(rows[i].ID_Dokumen || '').trim() === target) {
      return { rowIndex: rows[i]._rowIndex, data: rows[i] };
    }
  }
  return null;
}

function normalizeProfilPerawatRow_(p) {
  return {
    ID_Perawat: String(p.ID_Perawat || ''),
    ID_User: String(p.ID_User || ''),
    NIP: String(p.NIP || ''),
    Nama_Lengkap: String(p.Nama_Lengkap || ''),
    Jenjang_PK: String(p.Jenjang_PK || ''),
    Unit_Kerja: String(p.Unit_Kerja || ''),
    No_HP: String(p.No_HP || ''),
    Email: String(p.Email || ''),
    Alamat: String(p.Alamat || ''),
    Nomor_STR: String(p.Nomor_STR || ''),
    Masa_Berlaku_STR: normalizeCellToString_(p.Masa_Berlaku_STR),
    Nomor_SIP: String(p.Nomor_SIP || ''),
    Masa_Berlaku_SIP: normalizeCellToString_(p.Masa_Berlaku_SIP),
    Tanggal_Update: normalizeCellToString_(p.Tanggal_Update)
  };
}

/**
 * Mengonversi nilai sel (termasuk objek Date) menjadi string aman tanpa format mentah Date.
 * @param {*} val
 * @return {string}
 */
function normalizeCellToString_(val) {
  if (val === null || val === undefined || val === '') return '';
  if (Object.prototype.toString.call(val) === '[object Date]' && !isNaN(val.getTime())) {
    return Utilities.formatDate(val, 'Asia/Jakarta', 'yyyy-MM-dd HH:mm:ss');
  }
  return String(val).trim();
}

function formatDateTimeWib_(dateObj) {
  return Utilities.formatDate(dateObj, 'Asia/Jakarta', 'yyyy-MM-dd HH:mm:ss');
}

function formatDateWib_(dateObj) {
  return Utilities.formatDate(dateObj, 'Asia/Jakarta', 'yyyy-MM-dd');
}

function generateId_(prefix) {
  var randomPart = Math.floor(1000 + Math.random() * 9000);
  var timePart = new Date().getTime().toString().slice(-6);
  return String(prefix || 'ID') + '-' + timePart + '-' + randomPart;
}

function escapeHtml_(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Parser CSV sederhana namun aman untuk tanda kutip ganda (double quotes)
 * dan pemisah koma atau titik koma.
 * @param {string} text
 * @return {Array<Array<string>>}
 */
function parseCsvStrict_(text) {
  var normalized = String(text || '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  var rows = [];
  var currentRow = [];
  var currentField = '';
  var inQuotes = false;

  // Deteksi delimiter baris pertama jika menggunakan titik koma
  var firstLineEnd = normalized.indexOf('\n');
  var sampleLine = firstLineEnd === -1 ? normalized : normalized.slice(0, firstLineEnd);
  var delimiter =
    sampleLine.indexOf(';') !== -1 && sampleLine.indexOf(',') === -1 ? ';' : ',';

  for (var i = 0; i < normalized.length; i++) {
    var ch = normalized.charAt(i);
    var nextCh = i + 1 < normalized.length ? normalized.charAt(i + 1) : '';

    if (inQuotes) {
      if (ch === '"' && nextCh === '"') {
        currentField += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        currentField += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === delimiter) {
        currentRow.push(currentField);
        currentField = '';
      } else if (ch === '\n') {
        currentRow.push(currentField);
        currentField = '';
        var nonEmpty = currentRow.some(function (f) {
          return String(f).trim() !== '';
        });
        if (nonEmpty) {
          rows.push(currentRow);
        }
        currentRow = [];
      } else {
        currentField += ch;
      }
    }
  }

  if (currentField.length > 0 || currentRow.length > 0) {
    currentRow.push(currentField);
    var hasContent = currentRow.some(function (f) {
      return String(f).trim() !== '';
    });
    if (hasContent) {
      rows.push(currentRow);
    }
  }

  return rows;
}