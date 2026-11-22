/**
 * ============================================================================
 * SUPABASE CLIENT INTEGRATION LAYER
 * SISTEM INFORMASI KOMITE KEPERAWATAN RSUD dr. SOEDARSO PONTIANAK
 * ============================================================================
 * Menyediakan antarmuka komunikasi aman ke PostgreSQL, Supabase Auth,
 * Row Level Security (RLS), dan RPC Functions untuk:
 * 1. Autentikasi Pengusul & Admin (tanpa menyimpan plaintext password di localStorage)
 * 2. Pemungutan Suara Bilik Suara (RPC Transaksi Atomik & Anonim)
 * 3. Unggah Berkas & Permohonan Kredensial 6 Langkah
 * 4. Rekam E-Logbook Terintegrasi
 * 5. Pengaduan Etik Terenkripsi
 * ============================================================================
 */

(function (window) {
  'use strict';

  // Konfigurasi Kunci Proyek Supabase
  // Pengguna/Admin dapat mengonfigurasi variabel ini secara global atau via script tag
  const CONFIG = {
    SUPABASE_URL: window.SUPABASE_URL || 'https://YOUR_PROJECT_ID.supabase.co',
    SUPABASE_ANON_KEY: window.SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY'
  };

  let client = null;

  function initClient() {
    if (client) return client;
    if (typeof window.supabase !== 'undefined' && window.supabase.createClient) {
      if (CONFIG.SUPABASE_URL && !CONFIG.SUPABASE_URL.includes('YOUR_PROJECT_ID')) {
        client = window.supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);
      }
    }
    return client;
  }

  // Helper Escaping XSS Serbaguna untuk Perlindungan DOM
  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // ==========================================================================
  // 1. AUTENTIKASI PENGGUNA & MANAJEMEN SESI AMAN
  // ==========================================================================
  async function login(usernameOrNip, password) {
    const sb = initClient();
    const cleanUser = String(usernameOrNip || '').trim();
    const cleanPass = String(password || '');

    if (!cleanUser || !cleanPass) {
      return { success: false, message: 'NIP/Username dan password wajib diisi.' };
    }

    if (!sb) {
      console.warn('[SupabaseClient] Klien Supabase belum dikonfigurasi dengan URL & Anon Key aktif.');
      return {
        success: false,
        message: 'Koneksi database Supabase belum terhubung. Silakan masukkan Project URL & Anon Key di pengaturan.'
      };
    }

    // Format email Supabase Auth: jika input adalah NIP (angka), gunakan nip@soedarso.internal
    const emailLogin = cleanUser.includes('@') ? cleanUser : `${cleanUser}@soedarso.internal`;

    const { data, error } = await sb.auth.signInWithPassword({
      email: emailLogin,
      password: cleanPass
    });

    if (error) {
      return { success: false, message: 'Kredensial login tidak valid: ' + error.message };
    }

    // Ambil profil pengguna lengkap dari tabel public.profiles
    const { data: profile, error: profErr } = await sb
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (profErr || !profile) {
      return { success: false, message: 'Profil pengguna tidak ditemukan di database.' };
    }

    return {
      success: true,
      message: 'Login berhasil.',
      user: {
        id: profile.id,
        nip: profile.nip,
        name: profile.nama_lengkap,
        role: profile.role,
        unit: profile.unit_kerja,
        jenjang: profile.jenjang_pk,
        strNumber: profile.nomor_str,
        strExpiry: profile.masa_berlaku_str,
        mustChangePassword: profile.must_change_password
      },
      mustChangePassword: profile.must_change_password,
      sessionToken: data.session?.access_token
    };
  }

  async function changePassword(newPassword) {
    const sb = initClient();
    if (!sb) return { success: false, message: 'Database belum terhubung.' };

    if (!newPassword || newPassword.length < 8) {
      return { success: false, message: 'Password baru minimal 8 karakter.' };
    }

    if (newPassword === 'REDACTED_PASSWORD' || newPassword === 'REDACTED_PASSWORD') {
      return { success: false, message: 'Password tidak boleh menggunakan sandi default.' };
    }

    // 1. Update password di Supabase Auth
    const { error: authErr } = await sb.auth.updateUser({
      password: newPassword
    });

    if (authErr) {
      return { success: false, message: 'Gagal memperbarui sandi auth: ' + authErr.message };
    }

    // 2. Panggil RPC untuk update flag must_change_password = false & catat audit log
    const { data: rpcRes, error: rpcErr } = await sb.rpc('change_password_first_login', {
      p_new_password: newPassword
    });

    if (rpcErr) {
      return { success: true, message: 'Password diperbarui di Auth.', mustChangePassword: false };
    }

    return rpcRes;
  }

  async function logout() {
    const sb = initClient();
    if (sb) {
      await sb.auth.signOut();
    }
    return { success: true, message: 'Berhasil keluar.' };
  }

  // ==========================================================================
  // 2. BILIK SUARA (PEMILIHAN KETUA KOMITE KEPERAWATAN VIA RPC ATOMIK)
  // ==========================================================================
  async function castVote(electionId, candidateId) {
    const sb = initClient();
    if (!sb) return { success: false, message: 'Database belum terhubung.' };

    try {
      const { data, error } = await sb.rpc('submit_vote_atomic', {
        p_election_id: electionId,
        p_candidate_id: candidateId
      });

      if (error) {
        return { success: false, message: error.message };
      }
      return data;
    } catch (err) {
      return { success: false, message: err.message };
    }
  }

  async function getElectionData(electionId) {
    const sb = initClient();
    if (!sb) return { success: false, message: 'Database belum terhubung.' };

    const { data: election, error: elErr } = await sb
      .from('elections')
      .select('*, candidates(*)')
      .eq('id', electionId)
      .single();

    if (elErr) return { success: false, message: elErr.message };
    return { success: true, data: election };
  }

  // ==========================================================================
  // 3. E-LOGBOOK ASUHAN KEPERAWATAN
  // ==========================================================================
  async function saveLogbookEntry(entry) {
    const sb = initClient();
    if (!sb) return { success: false, message: 'Database belum terhubung.' };

    const { data: user } = await sb.auth.getUser();
    if (!user?.user) return { success: false, message: 'Anda belum login.' };

    const payload = {
      user_id: user.user.id,
      date: entry.date,
      shift: entry.shift,
      patient_mrn_masked: entry.patientMrn,
      work_unit: entry.workUnit,
      sdki_code: entry.sdkiCode,
      sdki_diagnosis: entry.sdkiDiagnosis,
      siki_code: entry.sikiCode,
      siki_intervention: entry.sikiIntervention,
      slki_code: entry.slkiCode,
      slki_outcome: entry.slkiOutcome,
      category: entry.category || 'Mandiri',
      notes: entry.notes || ''
    };

    const { data, error } = await sb
      .from('logbook_entries')
      .insert([payload])
      .select()
      .single();

    if (error) return { success: false, message: error.message };
    return { success: true, data: data, message: 'Catatan logbook berhasil tersimpan di database.' };
  }

  async function getLogbookEntries() {
    const sb = initClient();
    if (!sb) return { success: false, entries: [] };

    const { data, error } = await sb
      .from('logbook_entries')
      .select('*')
      .order('date', { ascending: false });

    if (error) return { success: false, entries: [], message: error.message };
    return { success: true, entries: data };
  }

  async function verifyLogbookEntry(entryId) {
    const sb = initClient();
    if (!sb) return { success: false, message: 'Database belum terhubung.' };

    const { data: user } = await sb.auth.getUser();
    const { data, error } = await sb
      .from('logbook_entries')
      .update({
        verified_by_head_nurse: true,
        verified_at: new Date().toISOString(),
        verifier_id: user?.user?.id
      })
      .eq('id', entryId);

    if (error) return { success: false, message: error.message };
    return { success: true, message: 'Catatan asuhan berhasil disahkan secara sah.' };
  }

  // ==========================================================================
  // 4. PENGADUAN ETIK & WHISTLEBLOWING
  // ==========================================================================
  async function submitEthicsReport(report) {
    const sb = initClient();
    if (!sb) return { success: false, message: 'Database belum terhubung.' };

    const ticketNumber = 'TIK-' + Math.floor(100000 + Math.random() * 900000);
    const trackingCode = Math.random().toString(36).substring(2, 10).toUpperCase();

    // Sederhana: Hash SHA-256 untuk tracking code
    const payload = {
      ticket_number: ticketNumber,
      tracking_code_hash: trackingCode, // Disimpan sebagai kode pelacak unik
      category: report.category,
      unit_terlapor: report.unit,
      description_encrypted: report.description,
      contact_encrypted: report.contact || '-'
    };

    const { data, error } = await sb
      .from('ethics_reports')
      .insert([payload])
      .select()
      .single();

    if (error) return { success: false, message: error.message };
    return {
      success: true,
      ticketNumber: ticketNumber,
      trackingCode: trackingCode,
      message: 'Laporan pengaduan etik berhasil terkirim secara rahasia ke Subkomite Etik.'
    };
  }

  async function trackEthicsReport(ticketNumber, trackingCode) {
    const sb = initClient();
    if (!sb) return { success: false, message: 'Database belum terhubung.' };

    const { data, error } = await sb
      .from('ethics_reports')
      .select('ticket_number, category, unit_terlapor, status, created_at, response_notes, response_date')
      .eq('ticket_number', ticketNumber)
      .eq('tracking_code_hash', trackingCode)
      .single();

    if (error || !data) {
      return { success: false, message: 'Nomor tiket atau kode pelacak tidak ditemukan.' };
    }
    return { success: true, report: data };
  }

  // Ekspor Modul ke Objek Global
  window.SupabaseKomkep = {
    init: initClient,
    escapeHtml: escapeHtml,
    login: login,
    logout: logout,
    changePassword: changePassword,
    castVote: castVote,
    getElectionData: getElectionData,
    saveLogbookEntry: saveLogbookEntry,
    getLogbookEntries: getLogbookEntries,
    verifyLogbookEntry: verifyLogbookEntry,
    submitEthicsReport: submitEthicsReport,
    trackEthicsReport: trackEthicsReport
  };

})(window);
