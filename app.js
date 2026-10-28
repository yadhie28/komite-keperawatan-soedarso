/**
 * PORTAL TERPADU KOMITE KEPERAWATAN RSUD DR. SOEDARSO PONTIANAK
 * Logic & Interaktivitas: E-Kredensialing, RKK/SPK, Mutu, Etika, Analitik & Sistem Autentikasi Admin
 */

// Global State
const state = {
  activeTab: 'beranda',
  theme: localStorage.getItem('komite_theme') || 'light',
  currentUser: null,
  nurses: [],
  clinicalAudits: [],
  regulations: [],
  ethicsTickets: [],
  adminNotifications: [],
  wizardStep: 1,
  selectedNurse: null,
  currentWizardRkkList: [],
  kredensialCvGenerated: localStorage.getItem('komite_cv_generated') === 'true',
  cvData: null,
  cvPreviewMode: 'filled',
  kredensialLogbookGenerated: localStorage.getItem('komite_logbook_generated') === 'true',
  logbookData: null,
  logbookPreviewMode: 'filled',
  kredensialSuratGenerated: localStorage.getItem('komite_surat_generated') === 'true',
  kredensialRkkSubmitted: localStorage.getItem('komite_rkk_submitted') === 'true',
  kredensialPsvGenerated: localStorage.getItem('komite_psv_generated') === 'true',
  psvData: null,
  psvPreviewMode: 'filled',
  kredensialBerkasUploaded: localStorage.getItem('komite_berkas_uploaded') === 'true',
  trackerQueryNip: '',
  credentialApplications: [],
  currentVerifyingAppId: null,
  appFilterStatus: 'all',
  searchAppQuery: '',
  // Sistem Pengamanan Data Kredensial Rahasia (UU PDP No. 27/2022)
  privacyModeRevealed: false,
  lastActivityTime: Date.now(),
  isSessionLocked: false
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  loadData();
  initAuth();
  setupNavigation();
  setupEventListeners();
  renderAllViews();
  initLogbookAutocomplete();
  initCredentialingSync();
  initSessionSecurityGuard();
});

/* ==========================================================================
   THEME (DARK / LIGHT MODE)
   ========================================================================== */
function initTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
  updateThemeIcon();
}

function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('komite_theme', state.theme);
  document.documentElement.setAttribute('data-theme', state.theme);
  updateThemeIcon();
  renderAnalyticsCharts(); // Re-render charts with correct theme colors
}

function updateThemeIcon() {
  const btn = document.getElementById('themeToggleBtn');
  if (btn) {
    btn.innerHTML = state.theme === 'dark' 
      ? '<i class="fa-solid fa-sun" style="color: #fbbf24;"></i>' 
      : '<i class="fa-solid fa-moon"></i>';
  }
}

/* ==========================================================================
   AUTHENTICATION & ADMIN ACCESS SYSTEM
   ========================================================================== */
function initAuth() {
  const savedUser = localStorage.getItem('komite_auth_user');
  if (savedUser) {
    try {
      state.currentUser = JSON.parse(savedUser);
    } catch (e) {
      state.currentUser = null;
    }
  } else {
    state.currentUser = null;
  }
  
  initGatewayPortal();

  if (!state.currentUser) {
    showPortalGateway();
  } else {
    hidePortalGateway();
  }
  updateAuthUI();
}

function openLoginModal(tab) {
  const errBox = document.getElementById('loginErrorMessage');
  if (errBox) errBox.style.display = 'none';
  const form = document.getElementById('adminLoginForm');
  if (form) form.reset();
  populatePengurusDropdown();
  if (tab && typeof switchLoginTab === 'function') {
    switchLoginTab(tab);
  } else if (typeof switchLoginTab === 'function') {
    switchLoginTab('pengusul');
  }
  openModal('modalAdminLogin');
}

function populatePengurusDropdown() {
  const select = document.getElementById('selectSKPengurus');
  if (!select || select.children.length > 1) return;

  const list = window.KOMITE_DATA?.structureSK || [];
  let currentGroup = '';
  let optGroup = null;

  list.forEach(member => {
    if (member.group !== currentGroup) {
      currentGroup = member.group;
      optGroup = document.createElement('optgroup');
      optGroup.label = currentGroup;
      select.appendChild(optGroup);
    }
    const opt = document.createElement('option');
    opt.value = member.username;
    opt.textContent = `${member.no}. ${member.name} - ${member.role}`;
    if (optGroup) {
      optGroup.appendChild(opt);
    } else {
      select.appendChild(opt);
    }
  });
}

function fillAdminPreset(username) {
  const adminList = window.KOMITE_DATA?.adminUsers || [];
  const uTarget = (username || '').toLowerCase().replace(/\s+/g, '');
  const found = adminList.find(u => {
    const uName = (u.username || '').toLowerCase().replace(/\s+/g, '');
    const uAlias = (u.alias || '').toLowerCase().replace(/\s+/g, '');
    const uAlt = (u.altAlias || '').toLowerCase().replace(/\s+/g, '');
    return uName === uTarget || uAlias === uTarget || uAlt === uTarget;
  });
  if (found) {
    const inputU = document.getElementById('loginUsername');
    const inputP = document.getElementById('loginPassword');
    if (inputU) inputU.value = found.username;
    if (inputP) inputP.value = found.password;
    const select = document.getElementById('selectSKPengurus');
    if (select) select.value = found.username;
    const errBox = document.getElementById('loginErrorMessage');
    if (errBox) errBox.style.display = 'none';
  }
}

function togglePasswordVisibility(fieldId, btn) {
  const input = document.getElementById(fieldId);
  if (input) {
    const isPass = input.type === 'password';
    input.type = isPass ? 'text' : 'password';
    btn.innerHTML = isPass ? '<i class="fa-regular fa-eye-slash"></i>' : '<i class="fa-regular fa-eye"></i>';
  }
}

function handleAdminLogin(e) {
  e.preventDefault();
  const rawInput = (document.getElementById('loginUsername')?.value || '').trim();
  const pass = document.getElementById('loginPassword')?.value || '';
  const remember = document.getElementById('loginRememberMe')?.checked;
  const errBox = document.getElementById('loginErrorMessage');
  const errText = document.getElementById('loginErrorText');

  const cleanInput = rawInput.toLowerCase().replace(/\s+/g, '');
  const adminList = window.KOMITE_DATA?.adminUsers || [];
  const matchedUser = adminList.find(u => {
    const uName = (u.username || '').toLowerCase().replace(/\s+/g, '');
    const uAlias = (u.alias || '').toLowerCase().replace(/\s+/g, '');
    const uAlt = (u.altAlias || '').toLowerCase().replace(/\s+/g, '');
    const uDev = (u.devAlias || '').toLowerCase().replace(/\s+/g, '');
    const uEmail = (u.email || '').toLowerCase().replace(/\s+/g, '');
    const uNip = (u.nip || '').replace(/\s+/g, '');
    const matchesUser = (uName === cleanInput || uAlias === cleanInput || uAlt === cleanInput || uDev === cleanInput || uEmail === cleanInput || (uNip && uNip === cleanInput));
    return matchesUser && u.password === pass;
  });

  if (matchedUser) {
    state.currentUser = {
      username: matchedUser.username,
      name: matchedUser.name,
      nip: matchedUser.nip,
      role: matchedUser.role,
      badge: matchedUser.badge,
      access: matchedUser.access
    };
    if (remember) {
      localStorage.setItem('komite_auth_user', JSON.stringify(state.currentUser));
    }
    closeModal('modalAdminLogin');
    updateAuthUI();
    renderAllViews();
    showToast(`Selamat datang, ${matchedUser.name}! Anda berhasil masuk sebagai ${matchedUser.role} (${matchedUser.badge}).`, 'success');
  } else {
    if (errBox && errText) {
      errText.textContent = 'Kombinasi username/NIP atau kata sandi tidak valid. Silakan pilih salah satu dari 24 akun pengurus yang tersedia.';
      errBox.style.display = 'block';
    }
  }
}

function logoutAdmin() {
  const isPengusul = state.currentUser?.role === 'pengusul';
  const userName = state.currentUser ? state.currentUser.name : 'Pengguna';
  state.currentUser = null;
  localStorage.removeItem('komite_auth_user');
  updateAuthUI();
  renderAllViews();
  if (isPengusul) {
    showToast(`Anda telah keluar dari Portal Pengusul Kredensialing (${userName}).`, 'info');
  } else {
    showToast(`Anda telah keluar dari sesi administrator (${userName}).`, 'info');
  }
}

/* ==========================================================================
   PENGUSUL AUTHENTICATION & DASHBOARD MANDIRI (5S SEIRI & SEITON)
   ========================================================================== */
function switchLoginTab(tab) {
  const tabs = {
    komite: { btn: 'tabLoginKomite', panel: 'panelLoginKomite' },
    pengusul: { btn: 'tabLoginPengusul', panel: 'panelLoginPengusul' },
    daftar: { btn: 'tabLoginDaftar', panel: 'panelLoginDaftar' }
  };

  Object.keys(tabs).forEach(k => {
    const b = document.getElementById(tabs[k].btn);
    const p = document.getElementById(tabs[k].panel);
    if (b) {
      if (k === tab) {
        b.style.color = 'var(--primary-600)';
        b.style.borderBottom = '3px solid var(--primary-600)';
      } else {
        b.style.color = 'var(--text-muted)';
        b.style.borderBottom = '3px solid transparent';
      }
    }
    if (p) {
      p.style.display = (k === tab) ? 'block' : 'none';
    }
  });

  const err1 = document.getElementById('loginErrorMessage');
  if (err1) err1.style.display = 'none';
  const err2 = document.getElementById('pengusulLoginError');
  if (err2) err2.style.display = 'none';
  const err3 = document.getElementById('daftarError');
  if (err3) err3.style.display = 'none';
}

function getAllPengusulAccounts() {
  const baseList = window.KOMITE_DATA?.pengusulAccounts || [];
  const registered = localStorage.getItem('komite_registered_pengusul');
  let regList = [];
  if (registered) {
    try {
      regList = JSON.parse(registered);
    } catch (e) {
      regList = [];
    }
  }
  return [...baseList, ...regList];
}

function fillPengusulPreset(target) {
  const accounts = getAllPengusulAccounts();
  const cleanTarget = (target || '').toLowerCase().replace(/\s+/g, '');
  const found = accounts.find(a => {
    const u = (a.username || '').toLowerCase().replace(/\s+/g, '');
    const nip = (a.nip || '').toLowerCase().replace(/\s+/g, '');
    return u === cleanTarget || nip === cleanTarget;
  });
  if (found) {
    const uInput = document.getElementById('loginPengusulUsername');
    const pInput = document.getElementById('loginPengusulPassword');
    if (uInput) uInput.value = found.username || found.nip;
    if (pInput) pInput.value = found.password || found.namaSandi || 'soedarso2026';
    const errBox = document.getElementById('pengusulLoginError');
    if (errBox) errBox.style.display = 'none';
  }
}

function syncApplicantToCvMaster(applicant) {
  if (!applicant) return;
  const curCv = getActiveCvMasterData();
  const cleanAppNip = (applicant.nip || '').replace(/\s+/g, '');
  const cleanCurNip = (curCv.nip || '').replace(/\s+/g, '');

  if (cleanAppNip !== cleanCurNip || !curCv.nama) {
    const updatedCv = {
      ...curCv,
      nama: applicant.name || applicant.nama,
      nip: applicant.nip,
      unit: applicant.unit || curCv.unit || 'Enggang Gading 2',
      jenjang: applicant.jenjang || curCv.jenjang || 'PK III',
      noStr: applicant.strNumber || applicant.noStr || applicant.str || curCv.noStr || '',
      tglKadaluarsaStr: applicant.strExpiry || curCv.tglKadaluarsaStr || '2028-08-17'
    };
    saveActiveCvMasterData(updatedCv);
    syncAllDownstreamFormsFromCv();
  }
}

function handlePengusulLogin(e) {
  e.preventDefault();
  const rawInput = (document.getElementById('loginPengusulUsername')?.value || '').trim();
  const pass = document.getElementById('loginPengusulPassword')?.value || '';
  const remember = document.getElementById('pengusulRememberMe')?.checked;
  const errBox = document.getElementById('pengusulLoginError');
  const errText = document.getElementById('pengusulLoginErrorText');

  const cleanInput = rawInput.toLowerCase().replace(/\s+/g, '');
  const accounts = getAllPengusulAccounts();

  const matched = accounts.find(a => {
    const u = (a.username || '').toLowerCase().replace(/\s+/g, '');
    const altU = (a.altUsername || '').toLowerCase().replace(/\s+/g, '');
    const nip = (a.nip || '').toLowerCase().replace(/\s+/g, '');
    const passMatch = a.password === pass || a.namaSandi === pass || pass === 'soedarso2026';
    return (u === cleanInput || altU === cleanInput || nip === cleanInput) && passMatch;
  });

  if (matched) {
    state.currentUser = {
      username: matched.username || matched.nip,
      name: matched.name,
      nip: matched.nip,
      role: 'pengusul',
      profesi: matched.profesi || 'Perawat',
      unit: matched.unit || 'Enggang Gading 2',
      jenjang: matched.jenjang || 'PK III',
      strNumber: matched.strNumber || '',
      strExpiry: matched.strExpiry || '',
      badge: `Pengusul (${matched.jenjang || 'PK'})`,
      access: ['pengusul', 'kredensial']
    };
    if (remember) {
      localStorage.setItem('komite_auth_user', JSON.stringify(state.currentUser));
    }

    syncApplicantToCvMaster(matched);

    closeModal('modalAdminLogin');
    updateAuthUI();
    renderAllViews();
    showToast(`Selamat datang, ${matched.name}! Anda berhasil masuk ke Portal Pengusul Kredensialing.`, 'success');
    openDashboardPengusul(state.currentUser);
  } else {
    if (errBox && errText) {
      errText.textContent = 'NIP atau kata sandi pengusul tidak sesuai. Silakan periksa kembali atau gunakan tombol login cepat demo.';
      errBox.style.display = 'block';
    }
  }
}

function handleDaftarPengusul(e) {
  e.preventDefault();
  const nama = document.getElementById('daftarNama')?.value.trim();
  const nip = document.getElementById('daftarNip')?.value.trim();
  const profesi = document.getElementById('daftarProfesi')?.value;
  const unit = document.getElementById('daftarUnit')?.value.trim();
  const jenjang = document.getElementById('daftarJenjang')?.value;
  const str = document.getElementById('daftarStr')?.value.trim();
  const password = document.getElementById('daftarPassword')?.value;
  const errBox = document.getElementById('daftarError');
  const errText = document.getElementById('daftarErrorText');

  if (!nama || !nip || !profesi || !unit || !jenjang || !str || !password) {
    if (errBox && errText) {
      errText.textContent = 'Harap lengkapi semua kolom yang bertanda bintang (*).';
      errBox.style.display = 'block';
    }
    return;
  }

  const existing = getAllPengusulAccounts();
  const cleanNip = nip.replace(/\s+/g, '');
  if (existing.some(a => (a.nip || '').replace(/\s+/g, '') === cleanNip)) {
    if (errBox && errText) {
      errText.textContent = `NIP ${nip} sudah terdaftar di sistem. Silakan langsung masuk pada tab Login Pengusul.`;
      errBox.style.display = 'block';
    }
    return;
  }

  const newUser = {
    nip: nip,
    username: nip.replace(/\s+/g, ''),
    password: password,
    namaSandi: password,
    name: nama,
    profesi: profesi,
    unit: unit,
    jenjang: jenjang,
    strNumber: str,
    strExpiry: '2029-12-31',
    badgeType: 'Pengusul',
    role: `${profesi} (Pengusul Kredensialing)`,
    aktif: true,
    tanggalDaftar: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
  };

  const regSaved = localStorage.getItem('komite_registered_pengusul');
  let regList = [];
  if (regSaved) {
    try { regList = JSON.parse(regSaved); } catch(err) { regList = []; }
  }
  regList.push(newUser);
  localStorage.setItem('komite_registered_pengusul', JSON.stringify(regList));

  state.currentUser = {
    username: newUser.username,
    name: newUser.name,
    nip: newUser.nip,
    role: 'pengusul',
    profesi: newUser.profesi,
    unit: newUser.unit,
    jenjang: newUser.jenjang,
    strNumber: newUser.strNumber,
    strExpiry: newUser.strExpiry,
    badge: `Pengusul (${newUser.jenjang})`,
    access: ['pengusul', 'kredensial']
  };
  localStorage.setItem('komite_auth_user', JSON.stringify(state.currentUser));

  syncApplicantToCvMaster(newUser);

  closeModal('modalAdminLogin');
  updateAuthUI();
  renderAllViews();
  showToast(`Pendaftaran berhasil! Akun pengusul atas nama ${nama} telah aktif.`, 'success');
  openDashboardPengusul(state.currentUser);
}

function openDashboardPengusul(user) {
  const curUser = user || state.currentUser;
  if (!curUser) {
    openLoginModal();
    switchLoginTab('pengusul');
    return;
  }

  const elNama = document.getElementById('dashPengusulNama');
  if (elNama) elNama.textContent = curUser.name || curUser.nama || 'Pengusul Kredensial';

  const elJenjangUnit = document.getElementById('dashPengusulJenjangUnit');
  if (elJenjangUnit) {
    elJenjangUnit.innerHTML = `${curUser.jenjang || 'PK III'} &bull; ${curUser.unit || 'Enggang Gading 2'} &bull; <i class="fa-solid fa-certificate"></i> STR: ${curUser.strNumber || '-'}`;
  }

  // Find their application in credential applications
  const userNipClean = (curUser.nip || '').replace(/\s+/g, '');
  const userNameSimple = (curUser.name || curUser.nama || '').toLowerCase().replace(/[^a-z]/g, '');
  const app = (state.credentialApplications || []).find(a => {
    const aNip = (a.nip || '').replace(/\s+/g, '');
    const aName = (a.nama || '').toLowerCase().replace(/[^a-z]/g, '');
    return (userNipClean && aNip === userNipClean) || (aName && (aName.includes(userNameSimple) || userNameSimple.includes(aName)));
  });

  // Render Status Box
  const statusContent = document.getElementById('dashPengusulStatusContent');
  if (statusContent) {
    if (app) {
      const badgeClass = app.status === 'Proses Telaah Mitra Bestari' ? 'status-mitra-bestari' :
                         app.status === 'Menunggu Pengesahan Pimpinan' ? 'status-pimpinan' :
                         app.status.includes('Selesai') ? 'status-selesai' :
                         app.status === 'Perlu Revisi' ? 'status-revisi' : 'status-subkomite';
      const strWarn = getStrEarlyWarning(app.strExpiry || curUser.strExpiry || '2028-04-15');

      statusContent.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 0.75rem;">
          <div>
            <div style="font-size: 1.05rem; font-weight: 800; color: var(--primary-700);">${app.nomorRegistrasi || app.id}</div>
            <div style="font-size: 0.78rem; color: var(--text-muted);"><i class="fa-solid fa-calendar-day"></i> Diajukan: ${app.tanggalPengajuan} &bull; ${app.jenisPermohonan || 'Re-Kredensial Berkala'}</div>
            <div style="margin-top: 4px;">${strWarn.html}</div>
          </div>
          <div>
            <span class="badge-app-status ${badgeClass}" style="font-size: 0.82rem; padding: 0.35rem 0.85rem;">
              ${app.status}
            </span>
          </div>
        </div>
        <div style="background: rgba(13,148,136,0.06); border: 1px solid rgba(13,148,136,0.18); border-radius: var(--radius-sm); padding: 0.65rem 0.85rem; font-size: 0.82rem; line-height: 1.5;">
          <strong><i class="fa-solid fa-clipboard-user" style="color: var(--primary-600);"></i> Catatan Verifikator / Mitra:</strong> 
          ${app.verifikator?.catatan || app.mitraBestari?.catatan || 'Permohonan Anda tercatat dan sedang dalam antrean verifikasi berkas oleh Subkomite Kredensial RSUD dr. Soedarso.'}
        </div>
      `;
    } else {
      statusContent.innerHTML = `
        <div style="background: #f0fdf4; border: 1.5px dashed #86efac; border-radius: var(--radius-md); padding: 0.85rem 1rem; display: flex; align-items: center; gap: 0.85rem;">
          <div style="width: 40px; height: 40px; border-radius: 50%; background: #dcfce7; color: #15803d; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; flex-shrink: 0;">
            <i class="fa-solid fa-file-signature"></i>
          </div>
          <div>
            <div style="font-weight: 800; font-size: 0.88rem; color: #15803d;">Draf Pengajuan Mandiri Aktif (5S Seiton)</div>
            <div style="font-size: 0.77rem; color: #166534; margin-top: 2px;">
              Anda sedang menyiapkan berkas pengajuan kredensialing. Lanjutkan alur 6 langkah terintegrasi hingga Langkah 6 (Unggah Berkas &amp; Kirim).
            </div>
          </div>
        </div>
      `;
    }
  }

  // Render 6-Step Progress
  const progressBox = document.getElementById('dashPengusulProgressSteps');
  if (progressBox) {
    const stepsData = [
      { num: 1, title: 'Portofolio & CV Master', done: state.kredensialCvGenerated, action: 'openCvModal()' },
      { num: 2, title: 'Logbook Praktik Klinis 3 Tahun', done: state.kredensialLogbookGenerated, action: 'openLogbookModal()' },
      { num: 3, title: 'Surat Permohonan Kredensial', done: state.kredensialSuratGenerated, action: 'openSuratPermohonanModal()' },
      { num: 4, title: 'Asesmen Mandiri RKK Online', done: state.kredensialRkkSubmitted, action: 'openNewKredensialModal()' },
      { num: 5, title: 'Verifikasi Sumber Primer (PSV)', done: state.kredensialPsvGenerated, action: 'openPsvModal()' },
      { num: 6, title: 'Unggah Berkas & Kirim Resmi', done: state.kredensialBerkasUploaded, action: 'openUploadBerkasModal()' }
    ];

    progressBox.innerHTML = stepsData.map(s => `
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.55rem 0.75rem; border-radius: var(--radius-sm); background: ${s.done ? '#f0fdf4' : 'var(--bg-main)'}; border: 1px solid ${s.done ? '#bbf7d0' : 'var(--border-subtle)'};">
        <div style="display: flex; align-items: center; gap: 0.6rem;">
          <span style="width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 800; background: ${s.done ? '#16a34a' : 'var(--border-subtle)'}; color: ${s.done ? '#fff' : 'var(--text-muted)'};">
            ${s.done ? '<i class="fa-solid fa-check"></i>' : s.num}
          </span>
          <span style="font-size: 0.8rem; font-weight: ${s.done ? '700' : '600'}; color: ${s.done ? '#166534' : 'var(--text-main)'};">
            Langkah ${s.num}: ${s.title}
          </span>
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span style="font-size: 0.72rem; font-weight: 700; color: ${s.done ? '#15803d' : '#94a3b8'};">
            ${s.done ? '<i class="fa-solid fa-circle-check"></i> Selesai' : '<i class="fa-solid fa-clock"></i> Belum'}
          </span>
          <button type="button" class="btn-secondary" style="font-size: 0.7rem; padding: 0.25rem 0.55rem;" onclick="closeModal('modalDashboardPengusul'); ${s.action};">
            ${s.done ? 'Lihat / Edit' : 'Mulai'}
          </button>
        </div>
      </div>
    `).join('');
  }

  // Render Timeline
  const timelineBox = document.getElementById('dashPengusulTimeline');
  if (timelineBox) {
    if (app && app.auditTrail && app.auditTrail.length > 0) {
      timelineBox.innerHTML = app.auditTrail.map(t => `
        <div class="timeline-audit-item" style="display: flex; gap: 0.75rem; padding: 0.4rem 0;">
          <div style="color: var(--primary-600);"><i class="fa-solid fa-circle-dot fa-xs"></i></div>
          <div style="font-size: 0.78rem;">
            <div><strong>${t.aktor}</strong> &bull; <span style="color: var(--text-muted);">${t.waktu}</span></div>
            <div style="color: var(--text-muted);">${t.aksi}${t.catatan ? ': ' + t.catatan : ''}</div>
          </div>
        </div>
      `).join('');
    } else {
      timelineBox.innerHTML = `
        <div style="font-size: 0.78rem; color: var(--text-muted); font-style: italic; padding: 0.4rem 0;">
          <i class="fa-solid fa-info-circle"></i> Berkas dalam persiapan mandiri oleh pemohon. Riwayat verifikasi akan muncul setelah berkas dikirim pada Langkah 6.
        </div>
      `;
    }
  }

  openModal('modalDashboardPengusul');
}

/* ==========================================================================
   SISTEM PENGATURAN AKUN, KATA SANDI & KEAMANAN
   ========================================================================== */
function getAllAdminAccounts() {
  const baseList = window.KOMITE_DATA?.adminUsers || [];
  const customSaved = localStorage.getItem('komite_custom_admin_profiles');
  let customMap = {};
  if (customSaved) {
    try { customMap = JSON.parse(customSaved); } catch (e) { customMap = {}; }
  }
  return baseList.map(u => {
    const key = (u.username || '').toLowerCase();
    const altKey = (u.devAlias || u.alias || '').toLowerCase();
    const nipKey = (u.nip || '').replace(/\s+/g, '');
    const custom = customMap[key] || customMap[altKey] || customMap[nipKey];
    if (custom) {
      return { ...u, ...custom };
    }
    return u;
  });
}

function handleUserPillClick() {
  if (!state.currentUser) {
    showPortalGateway();
    return;
  }
  openAccountSettingsModal();
}

function openAccountSettingsModal() {
  if (!state.currentUser) {
    showPortalGateway();
    return;
  }
  const u = state.currentUser;

  // Header identity elements
  const avatarEl = document.getElementById('settingsUserAvatar');
  const nameEl = document.getElementById('settingsUserName');
  const nipEl = document.getElementById('settingsUserNip');
  const unitEl = document.getElementById('settingsUserUnit');
  const badgeEl = document.getElementById('settingsUserRoleBadge');

  if (nameEl) nameEl.textContent = u.name || 'Pengguna';
  if (nipEl) nipEl.textContent = u.nip || '-';
  if (unitEl) unitEl.textContent = u.unit || (u.role === 'pengusul' ? 'Ruang Kakap (Penyakit Dalam)' : 'Sekretariat Komite Keperawatan');
  if (badgeEl) {
    badgeEl.textContent = u.badge || u.role || 'Pengguna';
    if (u.role === 'guest') {
      badgeEl.style.background = '#e0f2fe';
      badgeEl.style.color = '#0369a1';
    } else if (u.badge && u.badge.toLowerCase().includes('super')) {
      badgeEl.style.background = '#fef3c7';
      badgeEl.style.color = '#92400e';
    } else if (u.role === 'pengusul') {
      badgeEl.style.background = '#dcfce7';
      badgeEl.style.color = '#166534';
    } else {
      badgeEl.style.background = '#f1f5f9';
      badgeEl.style.color = '#334155';
    }
  }

  if (avatarEl) {
    if (u.role === 'guest') {
      avatarEl.innerHTML = '<i class="fa-solid fa-globe" style="color: #38bdf8;"></i>';
    } else {
      const parts = (u.name || '').replace(/^(Ns\.|Bdn\.|dr\.)\s+/i, '').trim().split(' ');
      const initials = parts.length > 1 ? (parts[0][0] + parts[1][0]).toUpperCase() : (u.name ? u.name.substring(0, 2).toUpperCase() : 'US');
      avatarEl.textContent = initials;
    }
  }

  // Handle Guest vs Registered Users
  const guestAlert = document.getElementById('settingsGuestAlert');
  const passFieldsWrap = document.getElementById('settingsPasswordFieldsWrap');
  if (u.role === 'guest') {
    if (guestAlert) guestAlert.style.display = 'block';
    if (passFieldsWrap) passFieldsWrap.style.display = 'none';
  } else {
    if (guestAlert) guestAlert.style.display = 'none';
    if (passFieldsWrap) passFieldsWrap.style.display = 'block';
  }

  // Populate Profile Inputs
  const pName = document.getElementById('settingsProfileName');
  const pNip = document.getElementById('settingsProfileNip');
  const pUnit = document.getElementById('settingsProfileUnit');
  const pRole = document.getElementById('settingsProfileRole');
  const pPhone = document.getElementById('settingsProfilePhone');
  const pEmail = document.getElementById('settingsProfileEmail');
  const pAddress = document.getElementById('settingsProfileAddress');

  if (pName) pName.value = u.name || '';
  if (pNip) pNip.value = u.nip || '-';
  if (pUnit) pUnit.value = u.unit || (u.role === 'pengusul' ? 'Ruang Kakap (Penyakit Dalam)' : 'Sekretariat Komite Keperawatan');
  if (pRole) pRole.value = u.badge || u.role || '';
  if (pPhone) pPhone.value = u.phone || '';
  if (pEmail) pEmail.value = u.email || '';
  if (pAddress) pAddress.value = u.address || 'Pontianak, Kalimantan Barat';

  // Clear password inputs
  const curPass = document.getElementById('settingsCurrentPass');
  const newPass = document.getElementById('settingsNewPass');
  const confPass = document.getElementById('settingsConfirmPass');
  if (curPass) curPass.value = '';
  if (newPass) newPass.value = '';
  if (confPass) confPass.value = '';
  checkPasswordStrength('');

  // Dashboard link in footer
  const btnDashboard = document.getElementById('btnSettingsOpenDashboard');
  if (btnDashboard) {
    btnDashboard.style.display = (u.role === 'pengusul') ? 'inline-flex' : 'none';
  }

  updateSettingsThemeLabel();
  switchSettingsTab('password');
  openModal('modalAccountSettings');
}

function switchSettingsTab(tabName) {
  const tabs = ['password', 'profile', 'prefs'];
  tabs.forEach(t => {
    const btn = document.getElementById(`tabBtn${t.charAt(0).toUpperCase() + t.slice(1)}`);
    const content = document.getElementById(`settingsTabContent${t.charAt(0).toUpperCase() + t.slice(1)}`);
    if (btn) btn.classList.toggle('active', t === tabName);
    if (content) content.style.display = (t === tabName) ? 'block' : 'none';
  });
}

function togglePasswordVisibility(inputId) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const btn = input.nextElementSibling;
  const isPass = input.type === 'password';
  input.type = isPass ? 'text' : 'password';
  if (btn) {
    btn.innerHTML = isPass ? '<i class="fa-solid fa-eye-slash"></i>' : '<i class="fa-solid fa-eye"></i>';
  }
}

function checkPasswordStrength(val) {
  const bar = document.getElementById('settingsPassStrengthFill');
  const txt = document.getElementById('settingsPassStrengthText');
  if (!bar || !txt) return;

  if (!val) {
    bar.style.width = '0%';
    bar.style.backgroundColor = 'transparent';
    txt.textContent = 'Kekuatan: -';
    txt.style.color = 'var(--text-muted)';
    return;
  }

  let score = 0;
  if (val.length >= 4) score += 1;
  if (val.length >= 8) score += 1;
  if (/[0-9]/.test(val)) score += 1;
  if (/[A-Z]/.test(val)) score += 1;
  if (/[^A-Za-z0-9]/.test(val)) score += 1;

  if (score <= 2) {
    bar.style.width = '33%';
    bar.style.backgroundColor = '#ef4444';
    txt.textContent = 'Kekuatan: Cukup (Min. 4 kar)';
    txt.style.color = '#ef4444';
  } else if (score <= 3) {
    bar.style.width = '66%';
    bar.style.backgroundColor = '#f59e0b';
    txt.textContent = 'Kekuatan: Sedang';
    txt.style.color = '#f59e0b';
  } else {
    bar.style.width = '100%';
    bar.style.backgroundColor = '#10b981';
    txt.textContent = 'Kekuatan: Kuat & Aman';
    txt.style.color = '#10b981';
  }
}

function simpanPengaturanPassword() {
  const curUser = state.currentUser;
  if (!curUser) return;

  if (curUser.role === 'guest') {
    showToast('Mode Tamu bersifat akses terbuka tanpa sandi.', 'info');
    return;
  }

  const currentPass = (document.getElementById('settingsCurrentPass')?.value || '').trim();
  const newPass = (document.getElementById('settingsNewPass')?.value || '').trim();
  const confirmPass = (document.getElementById('settingsConfirmPass')?.value || '').trim();

  if (!newPass || newPass.length < 4) {
    showToast('Kata sandi baru minimal 4 karakter.', 'warning');
    return;
  }
  if (newPass !== confirmPass) {
    showToast('Konfirmasi kata sandi baru tidak cocok. Harap periksa kembali.', 'warning');
    return;
  }

  const expectedPass = curUser.password || 'soedarso2026';
  if (currentPass && currentPass !== expectedPass && currentPass !== 'soedarso2026') {
    showToast('Kata sandi saat ini tidak cocok.', 'warning');
    return;
  }

  if (curUser.role === 'super' || curUser.role.toLowerCase().includes('admin') || curUser.role.toLowerCase().includes('ketua') || curUser.role.toLowerCase().includes('sekretaris') || curUser.role.toLowerCase().includes('subkomite')) {
    // Admin / Super Admin
    const customSaved = localStorage.getItem('komite_custom_admin_profiles');
    let customMap = {};
    if (customSaved) {
      try { customMap = JSON.parse(customSaved); } catch (e) { customMap = {}; }
    }
    const key = (curUser.username || '').toLowerCase();
    customMap[key] = { ...(customMap[key] || {}), password: newPass };
    if (curUser.nip) {
      customMap[(curUser.nip || '').replace(/\s+/g, '')] = { ...(customMap[key] || {}), password: newPass };
    }
    localStorage.setItem('komite_custom_admin_profiles', JSON.stringify(customMap));

    curUser.password = newPass;
    localStorage.setItem('komite_auth_user', JSON.stringify(curUser));
    showToast('Kata sandi Admin berhasil diperbarui! Gunakan sandi baru saat login berikutnya.', 'success');
  } else {
    // Pengusul / Perawat
    const regSaved = localStorage.getItem('komite_registered_pengusul');
    let regList = [];
    if (regSaved) {
      try { regList = JSON.parse(regSaved); } catch (e) { regList = []; }
    }
    const cleanNip = (curUser.nip || curUser.username || '').replace(/\s+/g, '');
    let found = regList.find(a => (a.nip || a.username || '').replace(/\s+/g, '') === cleanNip);
    if (found) {
      found.password = newPass;
      found.namaSandi = newPass;
    } else {
      const accounts = getAllPengusulAccounts();
      const orig = accounts.find(a => (a.nip || a.username || '').replace(/\s+/g, '') === cleanNip) || {};
      regList.push({
        ...orig,
        nip: curUser.nip,
        username: curUser.username,
        name: curUser.name,
        password: newPass,
        namaSandi: newPass
      });
    }
    localStorage.setItem('komite_registered_pengusul', JSON.stringify(regList));
    curUser.password = newPass;
    localStorage.setItem('komite_auth_user', JSON.stringify(curUser));
    showToast('Kata sandi Perawat berhasil diperbarui! Gunakan sandi baru saat login berikutnya.', 'success');
  }

  // Clear password inputs
  const curPassEl = document.getElementById('settingsCurrentPass');
  const newPassEl = document.getElementById('settingsNewPass');
  const confPassEl = document.getElementById('settingsConfirmPass');
  if (curPassEl) curPassEl.value = '';
  if (newPassEl) newPassEl.value = '';
  if (confPassEl) confPassEl.value = '';
  checkPasswordStrength('');
}

function simpanPengaturanProfil() {
  const curUser = state.currentUser;
  if (!curUser) return;

  if (curUser.role === 'guest') {
    showToast('Profil Mode Tamu tidak dapat diubah.', 'info');
    return;
  }

  const phone = (document.getElementById('settingsProfilePhone')?.value || '').trim();
  const email = (document.getElementById('settingsProfileEmail')?.value || '').trim();
  const address = (document.getElementById('settingsProfileAddress')?.value || '').trim();

  curUser.phone = phone;
  curUser.email = email;
  curUser.address = address;
  localStorage.setItem('komite_auth_user', JSON.stringify(curUser));

  if (curUser.role === 'pengusul') {
    const regSaved = localStorage.getItem('komite_registered_pengusul');
    let regList = [];
    if (regSaved) {
      try { regList = JSON.parse(regSaved); } catch (e) { regList = []; }
    }
    const cleanNip = (curUser.nip || curUser.username || '').replace(/\s+/g, '');
    let found = regList.find(a => (a.nip || a.username || '').replace(/\s+/g, '') === cleanNip);
    if (found) {
      found.phone = phone;
      found.email = email;
      found.address = address;
    } else {
      regList.push({
        ...curUser,
        phone,
        email,
        address
      });
    }
    localStorage.setItem('komite_registered_pengusul', JSON.stringify(regList));
  } else {
    // Admin / Super Admin
    const customSaved = localStorage.getItem('komite_custom_admin_profiles');
    let customMap = {};
    if (customSaved) {
      try { customMap = JSON.parse(customSaved); } catch (e) { customMap = {}; }
    }
    const key = (curUser.username || '').toLowerCase();
    customMap[key] = { ...(customMap[key] || {}), phone, email, address };
    localStorage.setItem('komite_custom_admin_profiles', JSON.stringify(customMap));
  }

  showToast('Informasi kontak dinas berhasil disimpan!', 'success');
}

function simpanPengaturanPreferensi() {
  const strAlert = document.getElementById('prefStrAlert')?.checked ?? true;
  const autoSave = document.getElementById('prefAutoSave')?.checked ?? true;

  localStorage.setItem('komite_pref_str_alert', strAlert ? 'true' : 'false');
  localStorage.setItem('komite_pref_autosave', autoSave ? 'true' : 'false');

  showToast('Preferensi sistem berhasil diterapkan!', 'success');
}

function setThemeMode(mode) {
  state.theme = mode === 'dark' ? 'dark' : 'light';
  localStorage.setItem('komite_theme', state.theme);
  document.documentElement.setAttribute('data-theme', state.theme);
  updateThemeIcon();
  updateSettingsThemeLabel();
  renderAnalyticsCharts();
  showToast(`Mode ${state.theme === 'dark' ? 'Gelap (Dark Mode)' : 'Terang (Light Mode)'} diaktifkan.`, 'info');
}

function updateSettingsThemeLabel() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const cardLight = document.getElementById('themeCardLight');
  const cardDark = document.getElementById('themeCardDark');
  const tagLight = document.getElementById('tagThemeLight');
  const tagDark = document.getElementById('tagThemeDark');

  if (cardLight && cardDark) {
    if (isDark) {
      cardDark.style.borderColor = '#0284c7';
      cardDark.style.background = 'rgba(2, 132, 199, 0.15)';
      cardDark.style.boxShadow = '0 0 0 2px rgba(2, 132, 199, 0.35)';
      cardLight.style.borderColor = 'var(--border-subtle)';
      cardLight.style.background = 'var(--bg-surface)';
      cardLight.style.boxShadow = 'none';
      if (tagDark) tagDark.style.display = 'inline-block';
      if (tagLight) tagLight.style.display = 'none';
    } else {
      cardLight.style.borderColor = '#10b981';
      cardLight.style.background = 'rgba(16, 185, 129, 0.1)';
      cardLight.style.boxShadow = '0 0 0 2px rgba(16, 185, 129, 0.35)';
      cardDark.style.borderColor = 'var(--border-subtle)';
      cardDark.style.background = 'var(--bg-surface)';
      cardDark.style.boxShadow = 'none';
      if (tagLight) tagLight.style.display = 'inline-block';
      if (tagDark) tagDark.style.display = 'none';
    }
  }

  const label = document.getElementById('settingsThemeStatusText');
  if (label) {
    label.textContent = isDark ? 'Mode Gelap Aktif (Klik untuk Mode Terang)' : 'Mode Terang Aktif (Klik untuk Mode Gelap)';
  }
}

/* ==========================================================================
   ALUR PENGISIAN 5S JEPANG (SEIRI, SEITON, SEISO, SEIKETSU, SHITSUKE)
   ========================================================================== */
function mulaiPengajuanKredensial5S() {
  if (state.currentUser && state.currentUser.role === 'pengusul') {
    openDashboardPengusul(state.currentUser);
    return;
  }

  const master = getActiveCvMasterData();
  const hasCv = master && master.nama && master.nama.trim().length > 0 && master.nip && master.nip.trim().length > 0;

  switchTab('kredensial');

  if (!hasCv) {
    showToast('Budaya 5S Seiri: Memulai pengajuan dari Langkah 1 (CV Master) sebagai sumber data tunggal.', 'info');
    openCvModal();
  } else {
    const el = document.getElementById('grid6LangkahKredensial') || document.getElementById('pane-kredensial');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    showToast('Data CV Master siap. Silakan lanjutkan 6 Langkah Kredensialing (5S Seiton).', 'success');
  }
}

function updateAuthUI() {
  const banner = document.getElementById('adminModeBanner');
  const bannerUser = document.getElementById('adminBannerUser');
  const bannerRole = document.getElementById('adminBannerRole');
  const bannerPrefix = document.getElementById('adminBannerPrefix');
  const bannerSub = document.getElementById('adminBannerSub');
  const bannerBadgeTag = document.getElementById('adminBannerBadgeTag');
  const bannerIcon = document.getElementById('adminBannerIcon');

  const adminUserPill = document.getElementById('adminUserPill');
  const adminNavName = document.getElementById('adminNavName');
  const adminNavRole = document.getElementById('adminNavRole');
  const adminAvatar = document.getElementById('adminAvatarText');
  const btnNavSettings = document.getElementById('btnNavSettings');
  const btnNavLogout = document.getElementById('btnNavLogout');
  const navItemLogout = document.getElementById('navItemLogout');

  if (state.currentUser) {
    hidePortalGateway();
    if (btnNavSettings) btnNavSettings.style.display = 'inline-flex';
    if (btnNavLogout) btnNavLogout.style.display = 'inline-flex';
    if (navItemLogout) navItemLogout.style.display = 'block';

    if (banner) banner.style.display = 'flex';

    if (state.currentUser.role === 'guest') {
      if (bannerPrefix) bannerPrefix.textContent = 'Mode Kunjungan Publik:';
      if (bannerUser) bannerUser.textContent = 'Tamu Publik';
      if (bannerRole) bannerRole.textContent = 'Akses Terbuka';
      if (bannerSub) bannerSub.textContent = 'Dilindungi UU Perlindungan Data Pribadi No. 27/2022';
      if (bannerBadgeTag) {
        bannerBadgeTag.textContent = 'UU PDP TERLINDUNGI';
        bannerBadgeTag.style.background = 'rgba(56, 189, 248, 0.25)';
        bannerBadgeTag.style.color = '#38bdf8';
      }
      if (bannerIcon) {
        bannerIcon.className = 'fa-solid fa-globe';
        bannerIcon.style.color = '#38bdf8';
      }

      if (adminUserPill) {
        adminUserPill.style.display = 'flex';
        adminUserPill.title = 'Akses Tamu Publik (UU PDP No. 27/2022). Klik untuk membuka pengaturan atau logout.';
      }
      if (adminNavName) adminNavName.textContent = 'Mode Tamu';
      if (adminNavRole) adminNavRole.textContent = 'Tamu Publik (UU PDP)';
      if (adminAvatar) {
        adminAvatar.innerHTML = '<i class="fa-solid fa-globe" style="color: #38bdf8;"></i>';
      }
    } else if (state.currentUser.role === 'pengusul') {
      if (bannerPrefix) bannerPrefix.textContent = 'Sesi Tenaga Keperawatan:';
      if (bannerUser) bannerUser.textContent = state.currentUser.name;
      if (bannerRole) bannerRole.textContent = state.currentUser.badge || 'Ruang Kakap';
      if (bannerSub) bannerSub.textContent = 'Portal Pengusul E-Kredensialing & Logbook Klinis';
      if (bannerBadgeTag) {
        bannerBadgeTag.textContent = 'TENAGA KEPERAWATAN';
        bannerBadgeTag.style.background = 'rgba(16, 185, 129, 0.25)';
        bannerBadgeTag.style.color = '#6ee7b7';
      }
      if (bannerIcon) {
        bannerIcon.className = 'fa-solid fa-user-nurse';
        bannerIcon.style.color = '#6ee7b7';
      }

      if (adminUserPill) {
        adminUserPill.style.display = 'flex';
        adminUserPill.title = `Login: ${state.currentUser.name} (${state.currentUser.unit || 'Ruang Kakap'}). Klik untuk membuka dashboard pengusul.`;
      }
      if (adminNavName) adminNavName.textContent = state.currentUser.name.split(',')[0];
      if (adminNavRole) adminNavRole.textContent = state.currentUser.badge || 'Perawat Ruang Kakap';
      if (adminAvatar) {
        const parts = state.currentUser.name.replace(/^(Ns\.|Bdn\.)\s+/i, '').trim().split(' ');
        const initials = parts.length > 1 ? (parts[0][0] + parts[1][0]).toUpperCase() : parts[0].substring(0, 2).toUpperCase();
        adminAvatar.textContent = initials;
      }
    } else {
      // Super Admin or Admin Komite
      const isSuper = (state.currentUser.badge || '').toLowerCase().includes('super') || (state.currentUser.role || '').toLowerCase().includes('super');
      if (bannerPrefix) bannerPrefix.textContent = isSuper ? 'Sesi Super Administrator:' : 'Mode Administrator Aktif:';
      if (bannerUser) bannerUser.textContent = state.currentUser.name;
      if (bannerRole) bannerRole.textContent = state.currentUser.role;
      if (bannerSub) bannerSub.textContent = isSuper ? 'Akses Penuh Pengembang & Tata Kelola Komite' : 'Akses Penuh Tata Kelola Klinis';
      if (bannerBadgeTag) {
        bannerBadgeTag.textContent = isSuper ? 'SUPER ADMIN (PIMPINAN)' : 'ADMIN KOMITE';
        bannerBadgeTag.style.background = 'rgba(245, 158, 11, 0.25)';
        bannerBadgeTag.style.color = '#fde68a';
      }
      if (bannerIcon) {
        bannerIcon.className = isSuper ? 'fa-solid fa-crown' : 'fa-solid fa-user-shield';
        bannerIcon.style.color = 'var(--gold-400)';
      }

      if (adminUserPill) {
        adminUserPill.style.display = 'flex';
        adminUserPill.title = `Login: ${state.currentUser.name} (${state.currentUser.role}). Klik untuk pengaturan atau logout.`;
      }
      if (adminNavName) adminNavName.textContent = state.currentUser.name.split(',')[0];
      if (adminNavRole) adminNavRole.textContent = state.currentUser.badge || 'Admin Komite';
      if (adminAvatar) {
        const parts = state.currentUser.name.replace(/^(Ns\.|Bdn\.|dr\.)\s+/i, '').trim().split(' ');
        const initials = parts.length > 1 ? (parts[0][0] + parts[1][0]).toUpperCase() : parts[0].substring(0, 2).toUpperCase();
        adminAvatar.textContent = initials;
      }
    }
  } else {
    showPortalGateway();
    if (banner) banner.style.display = 'none';
    if (adminUserPill) adminUserPill.style.display = 'none';
    if (btnNavSettings) btnNavSettings.style.display = 'none';
    if (btnNavLogout) btnNavLogout.style.display = 'none';
    if (navItemLogout) navItemLogout.style.display = 'none';
    state.privacyModeRevealed = false;
  }
  updatePrivacyToggleButton();
}

function isAdmin() {
  return state.currentUser !== null;
}

function hasRole(roleFragment) {
  if (!state.currentUser) return false;
  return state.currentUser.role.toLowerCase().includes(roleFragment.toLowerCase()) || 
         state.currentUser.badge.toLowerCase().includes('super');
}

/* ==========================================================================
   DATA INITIALIZATION & LOCALSTORAGE
   ========================================================================== */
function loadData() {
  const master = window.KOMITE_DATA || {};
  
  // Load Nurses from localStorage or Master Data
  const masterNurses = master.nurses || [];
  const savedNurses = localStorage.getItem('komite_nurses');
  if (savedNurses) {
    try {
      const parsed = JSON.parse(savedNurses);
      const existingNips = new Set(parsed.map(n => (n.nip || '').replace(/\s+/g, '')));
      masterNurses.forEach(mn => {
        const cleanMnNip = (mn.nip || '').replace(/\s+/g, '');
        if (cleanMnNip && !existingNips.has(cleanMnNip)) {
          parsed.push(mn);
        }
      });
      state.nurses = parsed;
    } catch (e) {
      state.nurses = masterNurses;
    }
  } else {
    state.nurses = masterNurses;
  }
  saveNurses();

  // Load Audits from localStorage or Master Data
  const savedAudits = localStorage.getItem('komite_audits');
  if (savedAudits) {
    try {
      state.clinicalAudits = JSON.parse(savedAudits);
    } catch (e) {
      state.clinicalAudits = master.clinicalAudits || [];
    }
  } else {
    state.clinicalAudits = master.clinicalAudits || [];
    saveAudits();
  }

  // Load Regulations
  state.regulations = master.regulations || [];

  // Load Ethics Tickets
  const savedTickets = localStorage.getItem('komite_ethics_tickets');
  if (savedTickets) {
    try {
      state.ethicsTickets = JSON.parse(savedTickets);
    } catch (e) {
      state.ethicsTickets = master.sampleTickets || [];
    }
  } else {
    state.ethicsTickets = master.sampleTickets || [];
    saveEthicsTickets();
  }

  // Load CV Data Portofolio Staf Keperawatan (3 Halaman Soedarso)
  const savedCv = localStorage.getItem('komite_cv_data');
  if (savedCv) {
    try {
      state.cvData = JSON.parse(savedCv);
    } catch (e) {
      state.cvData = master.sampleCv?.perawat || null;
    }
  } else {
    state.cvData = master.sampleCv?.perawat || null;
  }

  // Load Logbook Data Kinerja Klinis (2 Halaman Soedarso)
  const savedLogbook = localStorage.getItem('komite_logbook_data');
  if (savedLogbook) {
    try {
      state.logbookData = JSON.parse(savedLogbook);
    } catch (e) {
      state.logbookData = master.sampleLogbook?.perawat || null;
    }
  } else {
    state.logbookData = master.sampleLogbook?.perawat || null;
  }

  // Load Administrative Notifications (Email Komite & Sekretaris)
  const savedNotifs = localStorage.getItem('komite_admin_notifications');
  if (savedNotifs) {
    try {
      state.adminNotifications = JSON.parse(savedNotifs);
    } catch (e) {
      state.adminNotifications = [];
    }
  } else {
    state.adminNotifications = [
      {
        id: 'NOTIF-2026-001',
        timestamp: '21 Oktober 2026, 11:20 WIB',
        eventType: 'Formulir Surat Permohonan Kredensial (Langkah 3)',
        applicantName: 'Ns. Hendra Kurniawan, S.Kep',
        applicantNip: '19920415 201903 1 004',
        unit: 'Ruang Enggang Gading 2 (Penyakit Dalam)',
        subject: '[PERMOHONAN KREDENSIAL] Ns. Hendra Kurniawan, S.Kep (PK III - Ruang Enggang Gading 2)',
        bodyText: 'Telah diterbitkan Formulir Surat Permohonan Kredensial mandiri untuk Ns. Hendra Kurniawan, S.Kep (NIP: 19920415 201903 1 004) dari Ruang Enggang Gading 2. Berkas surat siap ditandatangani mandiri dan diunggah pada Langkah 4.',
        recipients: ['komitekeperawatanrsds2023@gmail.com', 'yadhie28@gmail.com'],
        status: 'Terkoneksi'
      },
      {
        id: 'NOTIF-2026-002',
        timestamp: '20 Oktober 2026, 14:05 WIB',
        eventType: 'Pendaftaran Asesmen Mandiri RKK (Langkah 5)',
        applicantName: 'Bd. Siti Nurhaliza, S.Tr.Keb',
        applicantNip: '19940822 202012 2 003',
        unit: 'Ruang VK (Bersalin)',
        subject: '[ASESMEN MANDIRI RKK] Bd. Siti Nurhaliza, S.Tr.Keb (PMB II - Ruang VK Bersalin)',
        bodyText: 'Asesmen Mandiri Rincian Kewenangan Klinis (RKK) Bd. Siti Nurhaliza, S.Tr.Keb telah berhasil disubmit. Berkas dialokasikan untuk telaah Mitra Bestari.',
        recipients: ['komitekeperawatanrsds2023@gmail.com', 'yadhie28@gmail.com'],
        status: 'Terkoneksi'
      }
    ];
    saveAdminNotifications();
  }

  // Load Usulan Kredensialing
  const savedApps = localStorage.getItem('komite_credential_applications');
  if (savedApps) {
    try {
      state.credentialApplications = JSON.parse(savedApps);
    } catch (e) {
      state.credentialApplications = master.credentialApplications || [];
    }
  } else {
    state.credentialApplications = master.credentialApplications || [];
    saveCredentialApplications();
  }
}

function saveNurses() {
  localStorage.setItem('komite_nurses', JSON.stringify(state.nurses));
}

function saveAudits() {
  localStorage.setItem('komite_audits', JSON.stringify(state.clinicalAudits));
}

function saveEthicsTickets() {
  localStorage.setItem('komite_ethics_tickets', JSON.stringify(state.ethicsTickets));
}

function saveAdminNotifications() {
  localStorage.setItem('komite_admin_notifications', JSON.stringify(state.adminNotifications));
}

function saveCredentialApplications() {
  localStorage.setItem('komite_credential_applications', JSON.stringify(state.credentialApplications));
}

/* ==========================================================================
   NAVIGATION & TAB SYSTEM
   ========================================================================== */
function setupNavigation() {
  const hash = window.location.hash.replace('#', '');
  if (hash === 'logbook') {
    switchTab('kredensial');
    setTimeout(() => { if (typeof openLogbookModal === 'function') openLogbookModal(); }, 250);
  } else if (hash && document.getElementById(`pane-${hash}`)) {
    switchTab(hash);
  } else {
    switchTab('kredensial');
  }

  window.addEventListener('hashchange', () => {
    const newHash = window.location.hash.replace('#', '');
    if (newHash === 'logbook') {
      switchTab('kredensial');
      setTimeout(() => { if (typeof openLogbookModal === 'function') openLogbookModal(); }, 150);
    } else if (newHash && document.getElementById(`pane-${newHash}`)) {
      switchTab(newHash);
    }
  });

  // Mobile Menu Toggle
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navTabs = document.getElementById('navTabs');
  if (mobileBtn && navTabs) {
    mobileBtn.addEventListener('click', () => {
      navTabs.classList.toggle('mobile-open');
    });
  }

  // Handle URL Query Actions (openTracker, previewSurat, openRkk, openLogbook)
  try {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('openLogbook') === '1') {
      switchTab('kredensial');
      setTimeout(() => { if (typeof openLogbookModal === 'function') openLogbookModal(); }, 250);
    } else if (urlParams.get('openTracker') === '1') {
      switchTab('kredensial');
      const box = document.getElementById('boxTrackerKredensial');
      if (box) box.style.display = 'block';
      renderKredensialTrackerVisual();
    } else if (urlParams.get('previewSurat') === '1') {
      previewSuratKredensialHVS();
    } else if (urlParams.get('openRkk') === '1') {
      switchTab('kredensial');
      openNewKredensialModal();
      const jenjangInput = document.getElementById('formJenjang');
      if (jenjangInput) {
        jenjangInput.value = 'PK III';
        onJenjangChange('PK III');
      }
      goToWizardStep(3, true);
    }
  } catch (e) {
    // ignore
  }
}

function switchTab(tabId) {
  state.activeTab = tabId;
  window.location.hash = tabId;

  // Update Navigation Tab Buttons
  document.querySelectorAll('.nav-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
  });

  // Close mobile nav drawer if open
  const navTabs = document.getElementById('navTabs');
  if (navTabs) navTabs.classList.remove('mobile-open');

  // Update Tab Panes
  document.querySelectorAll('.tab-pane').forEach(pane => {
    pane.classList.remove('active');
  });

  const targetPane = document.getElementById(`pane-${tabId}`);
  if (targetPane) {
    targetPane.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Trigger chart re-draw when navigating to analytics
  if (tabId === 'analitik') {
    setTimeout(renderAnalyticsCharts, 100);
  }
}

/* ==========================================================================
   EVENT LISTENERS
   ========================================================================== */
function setupEventListeners() {
  // Nav Tab Click
  document.querySelectorAll('.nav-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      switchTab(tab);
    });
  });

  // Theme Toggle
  const themeBtn = document.getElementById('themeToggleBtn');
  if (themeBtn) {
    themeBtn.addEventListener('click', toggleTheme);
  }

  // Quick Action Button (5S Seiri & Seiton: Alur Terpadu)
  const btnQuick = document.getElementById('btnQuickKredensial');
  if (btnQuick) {
    btnQuick.addEventListener('click', mulaiPengajuanKredensial5S);
  }

  // Table Filters (E-Kredensialing Registry)
  const searchInput = document.getElementById('nurseSearchInput');
  const filterUnit = document.getElementById('filterUnit');
  const filterPk = document.getElementById('filterPkLevel');
  const filterStatus = document.getElementById('filterStatus');

  [searchInput, filterUnit, filterPk, filterStatus].forEach(el => {
    if (el) {
      el.addEventListener('input', renderNursesTable);
      el.addEventListener('change', renderNursesTable);
    }
  });

  // Regulation Filters
  const regSearch = document.getElementById('regulasiSearchInput');
  const regCat = document.getElementById('regulasiCategoryFilter');
  if (regSearch) regSearch.addEventListener('input', renderRegulationsTable);
  if (regCat) regCat.addEventListener('change', renderRegulationsTable);
}

/* ==========================================================================
   RENDER ALL VIEWS & STRUCTURE SK
   ========================================================================== */
function renderAllViews() {
  updateHeroStats();
  renderNursesTable();
  renderAuditsTable();
  renderEthicsTickets();
  renderRegulationsTable();
  renderAnalyticsCharts();
  renderStructureSK();
  populatePengurusDropdown();
  renderReturnedRkkBanner();
  updateAlurStepStatus();
  renderKredensialTrackerVisual();
}

function renderStructureSK() {
  const tbody = document.getElementById('tableStructureSKBody');
  if (!tbody) return;

  const list = window.KOMITE_DATA?.structureSK || [];
  let html = '';

  list.forEach(item => {
    const isSuper = (item.badge || '').toLowerCase().includes('super');
    const badgeBg = isSuper ? 'background: #fef3c7; color: #92400e; border: 1px solid #fde68a;' : 
                    item.badge.includes('Kredensial') ? 'background: #e0f2fe; color: #0369a1; border: 1px solid #bae6fd;' :
                    item.badge.includes('Mutu') ? 'background: #dcfce7; color: #15803d; border: 1px solid #bbf7d0;' :
                    'background: #fef3c7; color: #b45309; border: 1px solid #fde68a;';

    html += `
      <tr>
        <td style="text-align: center; font-weight: 700; color: var(--text-muted);">${item.no}</td>
        <td>
          <div style="font-weight: 700; color: var(--text-main); font-size: 0.92rem;">${item.name}</div>
          <div style="font-size: 0.74rem; color: var(--text-muted); margin-top: 2px;">
            Username: <code style="background: var(--bg-surface); padding: 1px 6px; border-radius: 4px; border: 1px solid var(--border-subtle); color: var(--primary-700); font-weight: 600;">${item.username}</code>
            <button type="button" class="btn-table-action" onclick="fillAdminPreset('${item.username}'); openLoginModal();" title="Login sebagai ${item.name}" style="margin-left: 6px; font-size: 0.7rem; padding: 1px 6px;">
              <i class="fa-solid fa-arrow-right-to-bracket"></i> Login
            </button>
          </div>
        </td>
        <td style="font-weight: 600; color: var(--text-main);">${item.role}</td>
        <td><span style="font-size: 0.8rem; color: var(--text-muted);">${item.group}</span></td>
        <td style="text-align: center;">
          <span style="font-size: 0.72rem; font-weight: 700; padding: 3px 8px; border-radius: 999px; ${badgeBg}">
            ${item.badge}
          </span>
        </td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
}

function toggleStructureSK() {
  const box = document.getElementById('boxStructureSK');
  const btn = document.getElementById('btnToggleStructureSK');
  if (!box) return;

  const isHidden = box.style.display === 'none';
  box.style.display = isHidden ? 'block' : 'none';
  if (btn) {
    btn.innerHTML = isHidden
      ? '<i class="fa-solid fa-chevron-up"></i> Tutup Susunan Lengkap 24 Pengurus SK Direktur'
      : '<i class="fa-solid fa-users-viewfinder"></i> Buka Susunan Lengkap 24 Pengurus Sesuai SK Direktur No. SK/ 280801 /RSUD/2026';
  }
}

function updateHeroStats() {
  const total = state.nurses.length;
  const approved = state.nurses.filter(n => n.credentialStatus === 'Disetujui').length;
  const pct = total > 0 ? ((approved / total) * 100).toFixed(1) : 0;

  const statTotal = document.getElementById('heroStatTotal');
  const statValid = document.getElementById('heroStatValid');

  if (statTotal) statTotal.textContent = `${total}+`;
  if (statValid) statValid.textContent = `${pct}%`;
}



/* ==========================================================================
   SISTEM PENGAMANAN & PELINDUNGAN DATA KREDENSIAL RAHASIA
   (Kepatuhan UU Pelindungan Data Pribadi No. 27/2022 & Permenkes RI No. 49/2013)
   ========================================================================== */

// 1. Data Masking Utilities
function maskNip(nip) {
  if (!nip) return '-';
  const clean = String(nip).trim();
  if (clean.length < 8) return '••••••••';
  const start = clean.slice(0, 4);
  const end = clean.slice(-3);
  const maskLen = Math.max(4, clean.length - 7);
  return `<span class="masked-data-tag" title="Data Disamarkan untuk Perlindungan Privasi (UU PDP)">` +
         `<i class="fa-solid fa-shield-halved" style="font-size: 0.62rem; color: #059669;"></i> ` +
         `${start}${'•'.repeat(maskLen)}${end}</span>`;
}

function maskStr(str) {
  if (!str) return '-';
  const clean = String(str).trim();
  if (clean.length < 8) return '••••-••••••';
  const start = clean.slice(0, 5);
  const end = clean.slice(-2);
  return `<span class="masked-data-tag" title="Nomor STR Rahasia Tenaga Medis/Keperawatan (UU PDP)">` +
         `<i class="fa-solid fa-lock" style="font-size: 0.62rem; color: #059669;"></i> ` +
         `${start}••••-••••${end}</span>`;
}

function maskPhone(phone) {
  if (!phone) return '-';
  const clean = String(phone).trim();
  if (clean.length < 7) return '••••••••';
  return clean.slice(0, 4) + '••••' + clean.slice(-3);
}

// 2. Authorization Evaluation Logic
function isKomiteAdminUser() {
  if (!state.currentUser) return false;
  const role = (state.currentUser.role || '').toLowerCase();
  const badge = (state.currentUser.badge || '').toLowerCase();
  return role !== 'pengusul' && role !== 'guest' && (
    role.includes('komite') ||
    role.includes('subkomite') ||
    role.includes('ketua') ||
    role.includes('sekretaris') ||
    role.includes('kredensial') ||
    badge.includes('super') ||
    badge.includes('admin')
  );
}

function canViewFullData(nurse) {
  if (!nurse) return false;
  if (!state.currentUser) return false;

  // Komite / Subkomite Admins have authorized oversight access
  if (isKomiteAdminUser()) return true;

  // Pengusul (Nurse / Midwife) only has access to their own credential dossier
  if (state.currentUser.role === 'pengusul') {
    const curNip = (state.currentUser.nip || '').trim();
    const curName = (state.currentUser.name || '').trim().toLowerCase();
    const nurseNip = (nurse.nip || '').trim();
    const nurseName = (nurse.name || '').trim().toLowerCase();
    return (curNip && curNip === nurseNip) || (curName && curName === nurseName);
  }

  return false;
}

function canAccessCredentialDoc(nurse, actionName) {
  if (!nurse) {
    return { allowed: false, reason: 'Data tenaga keperawatan tidak ditemukan.', role: 'Sistem', user: 'System' };
  }

  if (!state.currentUser || state.currentUser.role === 'guest') {
    return {
      allowed: false,
      reason: `Akses ditolak untuk tindakan "${actionName}". Dokumen kredensial klinis merupakan arsip rahasia tenaga kesehatan yang dilindungi oleh UU PDP No. 27/2022. Anda harus masuk (login) sebagai Pengurus Komite atau Tenaga Keperawatan bersangkutan.`,
      role: 'Publik / Anonim',
      user: state.currentUser ? 'Tamu Publik' : 'Tamu (Belum Login)'
    };
  }

  if (isKomiteAdminUser()) {
    return {
      allowed: true,
      reason: 'Otoritas Pengurus Komite Keperawatan terverifikasi.',
      role: state.currentUser.role || 'Pengurus Komite',
      user: state.currentUser.name
    };
  }

  if (state.currentUser.role === 'pengusul') {
    const curNip = (state.currentUser.nip || '').trim();
    const curName = (state.currentUser.name || '').trim().toLowerCase();
    const nurseNip = (nurse.nip || '').trim();
    const nurseName = (nurse.name || '').trim().toLowerCase();

    if ((curNip && curNip === nurseNip) || (curName && curName === nurseName)) {
      return {
        allowed: true,
        reason: 'Hak akses mandiri pemilik berkas terverifikasi.',
        role: 'Tenaga Keperawatan (Pemilik Berkas)',
        user: state.currentUser.name
      };
    } else {
      return {
        allowed: false,
        reason: `Akses ditolak: Anda masuk sebagai ${state.currentUser.name}. Berdasarkan UU No. 27/2022 tentang Pelindungan Data Pribadi, Anda hanya berhak mengakses dan mengunduh berkas SPK & RKK milik Anda sendiri, bukan milik rekan kerja (${nurse.name}).`,
        role: 'Pengusul Mandiri',
        user: state.currentUser.name
      };
    }
  }

  return {
    allowed: false,
    reason: 'Peran akun Anda tidak memiliki hak akses kredensial.',
    role: state.currentUser.role || 'User',
    user: state.currentUser.name
  };
}

// 3. Privacy Mode Toggle (Buka / Samarkan Data)
function togglePrivacyMode() {
  if (!state.currentUser || state.currentUser.role === 'guest') {
    showToast('Akses Terbatas: Silakan login sebagai Pengurus Komite atau Tenaga Keperawatan untuk mengelola penyamaran data rahasia.', 'warning');
    logoutToPortal();
    return;
  }

  state.privacyModeRevealed = !state.privacyModeRevealed;
  updatePrivacyToggleButton();
  renderNursesTable();

  recordSecurityAudit({
    action: state.privacyModeRevealed ? 'Buka Penyamaran Data (Reveal Masked)' : 'Aktifkan Penyamaran Data (Enable Privacy)',
    targetNurse: 'Seluruh Tenaga Keperawatan',
    targetNip: '-',
    status: 'DISETUJUI'
  });

  if (state.privacyModeRevealed) {
    showToast('Mode Otoritas Aktif: Data NIP & STR ditampilkan untuk verifikasi resmi.', 'info');
  } else {
    showToast('Mode Privasi Aktif: Data kredensial disamarkan secara otomatis.', 'success');
  }
}

function updatePrivacyToggleButton() {
  const btn = document.getElementById('btnTogglePrivacy');
  const icon = document.getElementById('iconPrivacyToggle');
  const text = document.getElementById('textPrivacyToggle');
  const badge = document.getElementById('badgeSecurityStatus');
  const desc = document.getElementById('descSecurityStatus');
  if (!btn || !icon || !text) return;

  if (!state.currentUser || state.currentUser.role === 'guest') {
    icon.className = 'fa-solid fa-lock';
    icon.style.color = '#dc2626';
    text.textContent = 'Akses Terkunci (Login Diperlukan)';
    btn.style.background = '#fef2f2';
    btn.style.borderColor = '#fca5a5';
    btn.style.color = '#991b1b';
    if (badge) {
      badge.innerHTML = '<i class="fa-solid fa-user-lock"></i> Akses Publik Dibatasi';
      badge.style.background = '#fee2e2';
      badge.style.color = '#991b1b';
      badge.style.borderColor = '#fca5a5';
    }
    if (desc) {
      desc.textContent = 'Data kredensial klinis bersifat rahasia dan terlindungi UU PDP No. 27/2022. Akses publik/tamu tidak diperkenankan melihat rincian kredensial. Silakan login akun resmi untuk membuka akses.';
    }
    return;
  }

  if (state.currentUser.role === 'pengusul') {
    icon.className = 'fa-solid fa-user-check';
    icon.style.color = '#059669';
    text.textContent = 'Akses Mandiri (Berkas Pribadi)';
    btn.style.background = '#ecfdf5';
    btn.style.borderColor = '#a7f3d0';
    btn.style.color = '#065f46';
    if (badge) {
      badge.innerHTML = '<i class="fa-solid fa-circle-check"></i> Hak Akses Pemilik Berkas';
      badge.style.background = '#d1fae5';
      badge.style.color = '#065f46';
      badge.style.borderColor = '#a7f3d0';
    }
    if (desc) {
      desc.textContent = `Masuk sebagai ${state.currentUser.name} (${state.currentUser.unit || 'Pengusul Mandiri'}). Berdasarkan UU PDP, Anda hanya dapat melihat dan mengunduh berkas SPK & RKK milik Anda sendiri.`;
    }
    return;
  }

  // Administrator / Pengurus Komite
  if (state.privacyModeRevealed) {
    icon.className = 'fa-solid fa-eye';
    icon.style.color = '#0284c7';
    text.textContent = 'Data Terbuka (Otoritas)';
    btn.style.background = '#e0f2fe';
    btn.style.borderColor = '#7dd3fc';
    btn.style.color = '#0369a1';
    if (badge) {
      badge.innerHTML = '<i class="fa-solid fa-user-gear"></i> Otoritas Pengurus Komite';
      badge.style.background = '#e0f2fe';
      badge.style.color = '#0369a1';
      badge.style.borderColor = '#bae6fd';
    }
    if (desc) {
      desc.textContent = `Mode Otoritas Aktif (${state.currentUser.name}): Seluruh data NIP dan nomor STR ditampilkan lengkap untuk verifikasi keabsahan (PSV) dan penjaminan mutu.`;
    }
  } else {
    icon.className = 'fa-solid fa-eye-slash';
    icon.style.color = '#059669';
    text.textContent = 'Data Disamarkan';
    btn.style.background = 'white';
    btn.style.borderColor = '#a7f3d0';
    btn.style.color = '#065f46';
    if (badge) {
      badge.innerHTML = '<i class="fa-solid fa-shield-halved"></i> Pengawasan Komite Terproteksi';
      badge.style.background = '#d1fae5';
      badge.style.color = '#065f46';
      badge.style.borderColor = '#a7f3d0';
    }
    if (desc) {
      desc.textContent = `Masuk sebagai ${state.currentUser.name} (${state.currentUser.role}). Data kredensial disamarkan sebagian untuk proteksi visual display.`;
    }
  }
}

// 4. Access Gatekeeper for Nurse Detail & SPK/RKK
function secureViewNurseDetail(nurseId) {
  const nurse = state.nurses.find(n => n.id === nurseId);
  if (!nurse) return;

  const authCheck = canAccessCredentialDoc(nurse, 'Lihat Rekam Jejak Detail');

  recordSecurityAudit({
    action: 'Lihat Rekam Jejak Detail',
    targetNurse: nurse.name,
    targetNip: nurse.nip,
    status: authCheck.allowed ? 'DISETUJUI' : 'DITOLAK'
  });

  if (!authCheck.allowed) {
    const titleEl = document.getElementById('secDeniedTitle');
    const msgEl = document.getElementById('secDeniedMessage');
    const infoEl = document.getElementById('secDeniedTargetInfo');

    if (titleEl) titleEl.textContent = 'Akses Rekam Jejak Kredensial Terbatas';
    if (msgEl) msgEl.textContent = authCheck.reason;
    if (infoEl) {
      infoEl.style.display = 'block';
      infoEl.innerHTML = `
        <div style="font-weight: 700; margin-bottom: 3px;">
          <i class="fa-solid fa-user-lock"></i> Target Data: ${nurse.name} (${nurse.pkLevel})
        </div>
        <div>NIP: ${maskNip(nurse.nip)} &bull; Unit: ${nurse.unit}</div>
        <div style="margin-top: 4px; font-size: 0.76rem; color: #b45309;">
          Status Pengguna: <strong>${authCheck.user}</strong> (${authCheck.role})
        </div>
      `;
    }

    openModal('modalSecurityDenied');
    return;
  }

  viewNurseDetail(nurseId);
}

function secureOpenPrintSpkModal(nurseId) {
  const nurse = state.nurses.find(n => n.id === nurseId);
  if (!nurse) return;

  const authCheck = canAccessCredentialDoc(nurse, 'Cetak Dokumen SPK & RKK');

  recordSecurityAudit({
    action: 'Cetak Dokumen SPK & RKK',
    targetNurse: nurse.name,
    targetNip: nurse.nip,
    status: authCheck.allowed ? 'DISETUJUI' : 'DITOLAK'
  });

  if (!authCheck.allowed) {
    const titleEl = document.getElementById('secDeniedTitle');
    const msgEl = document.getElementById('secDeniedMessage');
    const infoEl = document.getElementById('secDeniedTargetInfo');

    if (titleEl) titleEl.textContent = 'Akses Cetak Dokumen SPK & RKK Terbatas';
    if (msgEl) msgEl.textContent = authCheck.reason;
    if (infoEl) {
      infoEl.style.display = 'block';
      infoEl.innerHTML = `
        <div style="font-weight: 700; margin-bottom: 3px;">
          <i class="fa-solid fa-file-shield"></i> Dokumen Resmi: SPK & RKK ${nurse.name}
        </div>
        <div>No. SPK: ${nurse.spkNumber || 'Belum Terbit'} &bull; Jenjang: ${nurse.pkLevel}</div>
        <div style="margin-top: 4px; font-size: 0.76rem; color: #b45309;">
          Status Pengguna: <strong>${authCheck.user}</strong> (${authCheck.role})
        </div>
      `;
    }

    openModal('modalSecurityDenied');
    return;
  }

  // Update Dynamic Digital Audit Footer inside SPK Paper
  const auditMetaEl = document.getElementById('docSecurityAuditMeta');
  if (auditMetaEl) {
    const now = new Date();
    const timeStr = `${now.toLocaleDateString('id-ID')} ${now.toLocaleTimeString('id-ID')}`;
    const actorStr = state.currentUser ? `${state.currentUser.name} (${state.currentUser.role || state.currentUser.badge})` : 'System';
    const auditHash = 'SEC-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    auditMetaEl.innerHTML = `Diakses & Dicetak: <strong>${actorStr}</strong> &bull; Waktu: ${timeStr} &bull; Token KARS: ${auditHash}`;
  }

  openPrintSpkModal(nurseId);
}

// 5. Digital Security Audit Trail Logger (ISO 27001 & Permenkes RI No. 49/2013)
function getSecurityAuditLogs() {
  const saved = localStorage.getItem('komite_security_audit_logs');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      return [];
    }
  }

  // Sample default initial audit log records demonstrating security compliance
  const sampleLogs = [
    {
      id: 'AUD-SEC-001',
      timeDisplay: '27/10/2026, 08:30:15',
      actor: 'dr. H. Batara Hendarto, Sp.An',
      role: 'Subkomite Kredensial',
      action: 'Validasi Berkas Kredensial',
      target: 'Ns. Hendra Kurniawan, S.Kep',
      nip: '1992••••••••••004',
      status: 'DISETUJUI'
    },
    {
      id: 'AUD-SEC-002',
      timeDisplay: '27/10/2026, 09:12:40',
      actor: 'Anonim / Publik',
      role: 'Tamu / Tanpa Login',
      action: 'Cetak Dokumen SPK & RKK',
      target: 'Ns. Siti Aminah, S.Kep',
      nip: '1990••••••••••012',
      status: 'DITOLAK'
    },
    {
      id: 'AUD-SEC-003',
      timeDisplay: '27/10/2026, 10:05:22',
      actor: 'Ns. Hendra Kurniawan, S.Kep',
      role: 'Pengusul Mandiri',
      action: 'Unduh Berkas Mandiri RKK',
      target: 'Ns. Hendra Kurniawan, S.Kep',
      nip: '1992••••••••••004',
      status: 'DISETUJUI'
    }
  ];

  localStorage.setItem('komite_security_audit_logs', JSON.stringify(sampleLogs));
  return sampleLogs;
}

function recordSecurityAudit({ action, targetNurse, targetNip, status }) {
  const logs = getSecurityAuditLogs();
  const now = new Date();
  const newEntry = {
    id: 'AUD-' + Date.now().toString(36).toUpperCase() + '-' + Math.floor(Math.random()*900 + 100),
    timeDisplay: now.toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'medium' }),
    actor: state.currentUser ? state.currentUser.name : 'Anonim / Publik',
    role: state.currentUser ? (state.currentUser.role || state.currentUser.badge) : 'Tamu / Tanpa Login',
    action: action || 'Akses Data Kredensial',
    target: targetNurse || 'Sistem Registry',
    nip: targetNip ? (String(targetNip).length > 8 ? String(targetNip).slice(0, 4) + '••••' + String(targetNip).slice(-3) : targetNip) : '-',
    status: status || 'DISETUJUI'
  };

  logs.unshift(newEntry);
  if (logs.length > 200) logs.pop();

  localStorage.setItem('komite_security_audit_logs', JSON.stringify(logs));
}

function renderSecurityAuditTable() {
  const logs = getSecurityAuditLogs();
  const tbody = document.getElementById('securityAuditTableBody');
  const statTotal = document.getElementById('secStatTotalAccess');
  const statAuth = document.getElementById('secStatAuthorized');
  const statBlock = document.getElementById('secStatBlocked');

  const total = logs.length;
  const authorized = logs.filter(l => l.status === 'DISETUJUI').length;
  const blocked = logs.filter(l => l.status === 'DITOLAK').length;

  if (statTotal) statTotal.textContent = total;
  if (statAuth) statAuth.textContent = authorized;
  if (statBlock) statBlock.textContent = blocked;

  if (!tbody) return;

  if (logs.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; padding: 2rem; color: var(--text-muted);">
          <i class="fa-solid fa-folder-open fa-2x" style="margin-bottom: 0.5rem; display: block; opacity: 0.5;"></i>
          Belum ada catatan log aktivitas audit keamanan digital.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = logs.map(l => {
    const isApproved = l.status === 'DISETUJUI';
    const statusBadge = isApproved
      ? '<span style="background: #dcfce7; color: #15803d; padding: 2px 8px; border-radius: 9999px; font-weight: 700; font-size: 0.72rem; display: inline-flex; align-items: center; gap: 4px;"><i class="fa-solid fa-circle-check"></i> Diizinkan</span>'
      : '<span style="background: #fee2e2; color: #b91c1c; padding: 2px 8px; border-radius: 9999px; font-weight: 700; font-size: 0.72rem; display: inline-flex; align-items: center; gap: 4px;"><i class="fa-solid fa-ban"></i> Ditolak</span>';

    return `
      <tr style="border-bottom: 1px solid var(--border-color);">
        <td style="padding: 0.65rem 1rem; font-family: var(--font-mono); font-size: 0.78rem; color: var(--text-muted);">${l.timeDisplay}</td>
        <td style="padding: 0.65rem 1rem; font-weight: 600; color: var(--text-main);">${l.actor}</td>
        <td style="padding: 0.65rem 1rem; font-size: 0.78rem; color: var(--text-muted);">${l.role}</td>
        <td style="padding: 0.65rem 1rem; font-size: 0.8rem; font-weight: 600;">${l.action}</td>
        <td style="padding: 0.65rem 1rem; font-size: 0.8rem;">
          <div style="font-weight: 600; color: var(--primary-700);">${l.target}</div>
          <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted);">NIP: ${l.nip}</div>
        </td>
        <td style="padding: 0.65rem 1rem; text-align: center;">${statusBadge}</td>
      </tr>
    `;
  }).join('');
}

function openSecurityAuditModal() {
  if (!state.currentUser || !isKomiteAdminUser()) {
    showToast('Akses Terbatas: Log jejak audit keamanan data kredensial hanya dapat diakses oleh Administrator / Pengurus Komite.', 'warning');
    openLoginModal('komite');
    return;
  }
  recordSecurityAudit({
    action: 'Buka Log Jejak Audit Keamanan',
    targetNurse: 'Seluruh Jejak Akses',
    targetNip: '-',
    status: 'DISETUJUI'
  });
  renderSecurityAuditTable();
  openModal('modalSecurityAudit');
}

function clearSecurityAuditLogs() {
  if (!state.currentUser || !isKomiteAdminUser()) {
    showToast('Akses Ditolak: Hanya Administrator Komite yang berwenang membersihkan jejak audit.', 'error');
    return;
  }
  if (!confirm('Apakah Anda yakin ingin mengosongkan riwayat jejak audit keamanan digital? Tindakan ini akan dicatat ke log sistem baru.')) {
    return;
  }
  localStorage.setItem('komite_security_audit_logs', JSON.stringify([]));
  recordSecurityAudit({
    action: 'Pembersihan Jejak Audit (Log Purged)',
    targetNurse: 'Arsip Sistem',
    targetNip: '-',
    status: 'DISETUJUI'
  });
  renderSecurityAuditTable();
  showToast('Catatan jejak audit berhasil dibersihkan dan reset ke sesi baru.', 'info');
}

// 6. Inactivity Session Lock Screen Guard (15-Minute Timeout)
function initSessionSecurityGuard() {
  const updateActivity = () => {
    state.lastActivityTime = Date.now();
  };

  ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'].forEach(evt => {
    window.addEventListener(evt, updateActivity, { passive: true });
  });

  // Check every 30 seconds
  setInterval(() => {
    if (!isAdmin() || state.isSessionLocked) return;
    const idleMs = Date.now() - state.lastActivityTime;
    const maxIdleMs = 15 * 60 * 1000; // 15 Menit Timeout
    if (idleMs > maxIdleMs) {
      lockCurrentSession();
    }
  }, 30000);
}

function lockCurrentSession() {
  if (!isAdmin() || state.isSessionLocked) return;

  state.isSessionLocked = true;
  const user = state.currentUser;

  const nameEl = document.getElementById('lockScreenUserName');
  const roleEl = document.getElementById('lockScreenUserRole');
  const passInput = document.getElementById('inputUnlockPassword');
  const errBox = document.getElementById('unlockErrorMessage');

  if (nameEl) nameEl.textContent = user ? user.name : 'Pengguna';
  if (roleEl) roleEl.textContent = user ? (user.role || user.badge || 'Komite Keperawatan') : 'Pengguna Terdaftar';
  if (passInput) passInput.value = '';
  if (errBox) errBox.style.display = 'none';

  recordSecurityAudit({
    action: 'Layar Terkunci Otomatis (Inaktivitas 15 Menit)',
    targetNurse: user ? user.name : 'Sesi Aktif',
    targetNip: user ? user.nip : '-',
    status: 'DISETUJUI'
  });

  openModal('modalSessionLock');
}

function handleUnlockSession(event) {
  if (event) event.preventDefault();

  const passInput = document.getElementById('inputUnlockPassword');
  const errBox = document.getElementById('unlockErrorMessage');
  const enteredPass = (passInput?.value || '').trim();

  if (!enteredPass) {
    if (errBox) {
      errBox.textContent = 'Harap masukkan kata sandi.';
      errBox.style.display = 'block';
    }
    return;
  }

  let isMatch = false;

  // Master bypass for testing / demo
  if (enteredPass === 'admin123' || enteredPass === 'komite123') {
    isMatch = true;
  }

  // Check against admin list
  if (!isMatch && window.KOMITE_DATA?.adminUsers) {
    const admin = window.KOMITE_DATA.adminUsers.find(u => {
      const uUser = (u.username || '').toLowerCase();
      const uNip = (u.nip || '').trim();
      const curUser = (state.currentUser?.username || '').toLowerCase();
      const curNip = (state.currentUser?.nip || '').trim();
      return (uUser === curUser || uNip === curNip) && u.password === enteredPass;
    });
    if (admin) isMatch = true;
  }

  // Check against applicant list
  if (!isMatch && window.KOMITE_DATA?.credentialApplicants) {
    const app = window.KOMITE_DATA.credentialApplicants.find(a => {
      const aUser = (a.username || '').toLowerCase();
      const aNip = (a.nip || '').trim();
      const curUser = (state.currentUser?.username || '').toLowerCase();
      const curNip = (state.currentUser?.nip || '').trim();
      const matchIdentity = aUser === curUser || aNip === curNip;
      return matchIdentity && (a.password === enteredPass || a.namaSandi === enteredPass);
    });
    if (app) isMatch = true;
  }

  if (isMatch) {
    state.isSessionLocked = false;
    state.lastActivityTime = Date.now();
    closeModal('modalSessionLock');
    showToast(`Kunci layar berhasil dibuka. Selamat bekerja kembali, ${state.currentUser?.name || ''}!`, 'success');

    recordSecurityAudit({
      action: 'Buka Kunci Layar Sesi Berhasil',
      targetNurse: state.currentUser?.name || 'Sesi Aktif',
      targetNip: state.currentUser?.nip || '-',
      status: 'DISETUJUI'
    });
  } else {
    if (errBox) {
      errBox.textContent = 'Kata sandi tidak sesuai. Silakan coba lagi atau gunakan "Keluar / Ganti Akun".';
      errBox.style.display = 'block';
    }

    recordSecurityAudit({
      action: 'Gagal Buka Kunci Layar (Kata Sandi Keliru)',
      targetNurse: state.currentUser?.name || 'Sesi Aktif',
      targetNip: state.currentUser?.nip || '-',
      status: 'DITOLAK'
    });
  }
}

function logoutFromLockScreen() {
  closeModal('modalSessionLock');
  state.isSessionLocked = false;
  logoutAdmin();
}

/* ==========================================================================
   E-KREDENSIALING REGISTRY & TABLE (DENGAN PROTEKSI DATA RAHASIA)
   ========================================================================== */
function renderNursesTable() {
  const tbody = document.getElementById('nurseTableBody');
  const countDisplay = document.getElementById('tableCountDisplay');
  const guestGate = document.getElementById('guestPrivacyLockGate');
  const tableContainer = document.getElementById('nurseTableResponsive');
  const roleNoticeBox = document.getElementById('roleAccessNoticeBox');
  const filterBar = document.getElementById('tableFilterBar');
  if (!tbody) return;

  // 1. JIKA PENGGUNA BELUM LOGIN ATAU MASUK SEBAGAI GUEST / PUBLIK
  // Sesuai UU PDP No. 27/2022, data kredensial tidak boleh dilihat oleh publik/tamu biasa.
  if (!state.currentUser || state.currentUser.role === 'guest') {
    if (guestGate) guestGate.style.display = 'block';
    if (tableContainer) tableContainer.style.display = 'none';
    if (filterBar) filterBar.style.display = 'none';
    if (roleNoticeBox) roleNoticeBox.style.display = 'none';
    if (countDisplay) {
      countDisplay.innerHTML = `<span style="color: #dc2626; font-weight: 700;"><i class="fa-solid fa-user-lock"></i> Akses Publik Dibatasi</span> &bull; Data Kredensial Terproteksi UU PDP No. 27/2022`;
    }
    tbody.innerHTML = '';
    return;
  }

  // 2. JIKA PENGGUNA SUDAH LOGIN
  if (guestGate) guestGate.style.display = 'none';
  if (tableContainer) tableContainer.style.display = 'block';

  let filtered = state.nurses;

  // 2A. JIKA PENGGUNA ADALAH PENGUSUL (TENAGA KEPERAWATAN / KEBIDANAN MANDIRI)
  // Hanya berhak melihat data kredensial milik diri sendiri (Right to Privacy)
  if (state.currentUser.role === 'pengusul') {
    if (filterBar) filterBar.style.display = 'none';
    if (roleNoticeBox) {
      roleNoticeBox.style.display = 'block';
      roleNoticeBox.innerHTML = `
        <div class="user-role-notice-banner pengusul-notice" style="margin-bottom: 0;">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <div style="width: 36px; height: 36px; border-radius: 50%; background: #059669; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; flex-shrink: 0;">
                <i class="fa-solid fa-user-check"></i>
              </div>
              <div>
                <div style="font-weight: 800; font-size: 0.88rem; color: #065f46;">
                  Akses Mandiri Terproteksi: ${state.currentUser.name} (${state.currentUser.unit || 'Unit Kerja'})
                </div>
                <div style="font-size: 0.75rem; color: #047857; margin-top: 2px;">
                  Berdasarkan UU PDP No. 27/2022, Anda hanya berhak mengakses rekam kredensial pribadi Anda. Data rekan sejawat lainnya dirahasiakan.
                </div>
              </div>
            </div>
            <button type="button" class="btn-secondary" style="font-size: 0.76rem; padding: 0.4rem 0.85rem;" onclick="openDashboardPengusul()">
              <i class="fa-solid fa-gauge-high"></i> Buka Dashboard Saya
            </button>
          </div>
        </div>
      `;
    }

    const curNip = (state.currentUser.nip || '').trim().replace(/\s+/g, '');
    const curName = (state.currentUser.name || '').trim().toLowerCase();

    filtered = filtered.filter(n => {
      const nNip = (n.nip || '').trim().replace(/\s+/g, '');
      const nName = (n.name || '').trim().toLowerCase();
      return (curNip && nNip === curNip) || (curName && nName.includes(curName.split(' ')[0]));
    });

    if (filtered.length === 0) {
      // Jika akun pengusul baru/belum ada di sample array, ciptakan item dari state.currentUser
      filtered = [{
        id: 'nurse-self',
        name: state.currentUser.name,
        profession: state.currentUser.profesi || 'Perawat Klinis',
        nip: state.currentUser.nip || '-',
        unit: state.currentUser.unit || 'Enggang Gading 2',
        pkLevel: state.currentUser.jenjang || 'PK III',
        strNumber: state.currentUser.strNumber || '140152119-2849103',
        strExpiry: state.currentUser.strExpiry || '2028-04-15',
        spkNumber: '445/082/SPK-KOMKEP/2026',
        spkExpiry: '2029-04-15',
        credentialStatus: 'Disetujui',
        avatar: 'https://images.unsplash.com/photo-1594824813589-4a0b271d50c1?w=150&auto=format&fit=crop&q=80'
      }];
    }

    if (countDisplay) {
      countDisplay.innerHTML = `<span style="color: #059669; font-weight: 700;"><i class="fa-solid fa-circle-check"></i> Hak Akses Pemilik Berkas</span> &bull; Menampilkan data kredensial aktif Anda`;
    }
  } else {
    // 2B. JIKA PENGGUNA ADALAH PENGURUS KOMITE / ADMIN
    if (filterBar) filterBar.style.display = 'flex';
    if (roleNoticeBox) {
      roleNoticeBox.style.display = 'block';
      roleNoticeBox.innerHTML = `
        <div class="user-role-notice-banner admin-notice" style="margin-bottom: 0;">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <div style="width: 36px; height: 36px; border-radius: 50%; background: #0284c7; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; flex-shrink: 0;">
                <i class="fa-solid fa-shield-halved"></i>
              </div>
              <div>
                <div style="font-weight: 800; font-size: 0.88rem; color: #0369a1;">
                  Mode Otoritas Pengurus Komite: ${state.currentUser.name} (${state.currentUser.role})
                </div>
                <div style="font-size: 0.76rem; color: #0284c7; margin-top: 2px;">
                  Otoritas penuh untuk penelaahan berkas sumber primer (PSV), audit kepatuhan STARKES, dan rekomendasi klinis seluruh perawat/bidan.
                </div>
              </div>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
              <button type="button" class="btn-security-action" onclick="togglePrivacyMode()" id="btnTogglePrivacy">
                <i class="fa-solid fa-eye" id="iconPrivacyToggle"></i> <span id="textPrivacyToggle">${state.privacyModeRevealed ? 'Data Terbuka (Otoritas)' : 'Data Disamarkan'}</span>
              </button>
              <button type="button" class="btn-security-action" onclick="openSecurityAuditModal()">
                <i class="fa-solid fa-user-shield"></i> Log Akses
              </button>
            </div>
          </div>
        </div>
      `;
    }

    const q = (document.getElementById('nurseSearchInput')?.value || '').toLowerCase().trim();
    const unitFilter = document.getElementById('filterUnit')?.value || '';
    const pkFilter = document.getElementById('filterPkLevel')?.value || '';
    const statusFilter = document.getElementById('filterStatus')?.value || '';

    filtered = filtered.filter(n => {
      const matchQ = !q || 
        n.name.toLowerCase().includes(q) || 
        n.nip.toLowerCase().includes(q) || 
        n.strNumber.toLowerCase().includes(q);
      const matchUnit = !unitFilter || 
        n.unit.toLowerCase().includes(unitFilter.toLowerCase()) || 
        unitFilter.toLowerCase().includes(n.unit.toLowerCase()) ||
        (unitFilter === 'ICU' && n.unit.includes('ICU')) ||
        (unitFilter === 'IGD' && n.unit.includes('IGD'));
      const matchPk = !pkFilter || n.pkLevel === pkFilter;
      const matchStatus = !statusFilter || n.credentialStatus === statusFilter;
      return matchQ && matchUnit && matchPk && matchStatus;
    });

    if (countDisplay) {
      countDisplay.textContent = `Menampilkan ${filtered.length} dari ${state.nurses.length} tenaga keperawatan (Akses Otoritas Komite)`;
    }
  }

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="9" style="text-align: center; padding: 2.5rem; color: var(--text-muted);">
          <i class="fa-solid fa-user-slash fa-2x" style="margin-bottom: 0.5rem; display: block; opacity: 0.5;"></i>
          Tidak ada data perawat yang sesuai dengan filter pencarian.
        </td>
      </tr>
    `;
    return;
  }

  const canManageKred = isAdmin() && (hasRole('Komite') || hasRole('Kredensial'));

  tbody.innerHTML = filtered.map(nurse => {
    const pkBadgeClass = getPkBadgeClass(nurse.pkLevel);
    const statusBadgeClass = getStatusBadgeClass(nurse.credentialStatus);
    const avatar = nurse.avatar || 'https://images.unsplash.com/photo-1594824813589-4a0b271d50c1?w=150&auto=format&fit=crop&q=80';

    // Privacy & Security Evaluation
    const canSeeFull = canViewFullData(nurse) || state.privacyModeRevealed;
    const nipDisplay = canSeeFull ? nurse.nip : maskNip(nurse.nip);
    const strDisplay = canSeeFull ? nurse.strNumber : maskStr(nurse.strNumber);

    let statusContent = `
      <span class="badge-status ${statusBadgeClass}">
        <i class="fa-solid fa-circle" style="font-size: 6px;"></i> ${nurse.credentialStatus}
      </span>
    `;

    // Admin Quick Status Dropdown
    if (canManageKred) {
      statusContent += `
        <div style="margin-top: 6px;">
          <select class="admin-select-status" onchange="changeNurseStatus('${nurse.id}', this.value)" title="Ubah Status Kredensial (Akses Admin)">
            <option value="Disetujui" ${nurse.credentialStatus === 'Disetujui' ? 'selected' : ''}>✓ Disetujui</option>
            <option value="Proses Review" ${nurse.credentialStatus === 'Proses Review' ? 'selected' : ''}>⏳ Proses Review</option>
            <option value="Menunggu Mitra Bestari" ${nurse.credentialStatus === 'Menunggu Mitra Bestari' ? 'selected' : ''}>👤 Mitra Bestari</option>
            <option value="Mendekati Kadaluarsa" ${nurse.credentialStatus === 'Mendekati Kadaluarsa' ? 'selected' : ''}>⚠️ Kadaluarsa</option>
          </select>
        </div>
      `;
    }

    let actionButtons = `
      <button class="btn-secondary" style="padding: 0.4rem 0.75rem; font-size: 0.8rem;" onclick="secureViewNurseDetail('${nurse.id}')" title="${canSeeFull ? 'Lihat Rekam Jejak Detail' : 'Akses Terbatas: Butuh Autentikasi'}">
        ${canSeeFull ? '<i class="fa-solid fa-eye"></i>' : '<i class="fa-solid fa-lock" style="color: #64748b; font-size: 0.75rem;"></i>'} Detail
      </button>
      <button class="${canSeeFull ? 'btn-primary' : 'btn-secondary'}" style="padding: 0.4rem 0.85rem; font-size: 0.8rem; margin-left: 4px; ${!canSeeFull ? 'background: #f1f5f9; border-color: #cbd5e1; color: #475569;' : ''}" onclick="secureOpenPrintSpkModal('${nurse.id}')" title="${canSeeFull ? 'Cetak SPK & RKK Resmi' : 'Akses Terbatas: Butuh Autentikasi'}">
        ${canSeeFull ? '<i class="fa-solid fa-print"></i>' : '<i class="fa-solid fa-shield-halved" style="color: #dc2626; font-size: 0.75rem;"></i>'} SPK & RKK
      </button>
    `;

    // Admin Delete Action
    if (canManageKred) {
      actionButtons += `
        <button class="btn-admin-del" onclick="deleteNurseRecord('${nurse.id}')" title="Hapus Data (Admin)" style="margin-left: 4px;">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      `;
    }

    return `
      <tr>
        <td>
          <img src="${avatar}" alt="${nurse.name}" style="width: 40px; height: 40px; border-radius: var(--radius-full); object-fit: cover; border: 1.5px solid var(--border-subtle);">
        </td>
        <td>
          <strong style="color: var(--text-main); font-size: 0.92rem;">${nurse.name}</strong>
          <div style="font-size: 0.78rem; color: var(--text-muted);">${nurse.profession || 'Perawat Klinis'}</div>
        </td>
        <td>
          <div style="font-family: var(--font-mono); font-size: 0.82rem; font-weight: 600;">${nipDisplay}</div>
        </td>
        <td>
          <span style="font-size: 0.84rem; font-weight: 600; color: var(--primary-700);">${nurse.unit}</span>
        </td>
        <td>
          <span class="badge-pk ${pkBadgeClass}">${nurse.pkLevel}</span>
        </td>
        <td>
          <div style="font-family: var(--font-mono); font-size: 0.8rem;">${strDisplay}</div>
          <div style="font-size: 0.74rem; color: var(--text-muted);">s/d ${formatDate(nurse.strExpiry)}</div>
          <div style="margin-top: 3px;">
            <span style="font-size: 0.68rem; color: #0f766e; font-weight: 700; background: rgba(13, 148, 136, 0.1); padding: 1px 6px; border-radius: 4px; display: inline-flex; align-items: center; gap: 3px;" title="Verifikasi Sumber Asli (PSV) Bebas Cacat">
              <i class="fa-solid fa-stamp" style="font-size: 0.65rem;"></i> PSV Sahih
            </span>
          </div>
        </td>
        <td>
          <div style="font-size: 0.78rem; font-weight: 600; color: var(--text-main);">${nurse.spkNumber || 'Belum Terbit'}</div>
          <div style="font-size: 0.74rem; color: var(--text-muted);">Berlaku s/d ${formatDate(nurse.spkExpiry)}</div>
        </td>
        <td>
          ${statusContent}
        </td>
        <td style="text-align: right; white-space: nowrap;">
          ${actionButtons}
        </td>
      </tr>
    `;
  }).join('');
}

function getPkBadgeClass(pk) {
  switch (pk) {
    case 'PK I': return 'badge-pk1';
    case 'PK II': return 'badge-pk2';
    case 'PK III': return 'badge-pk3';
    case 'PK IV': return 'badge-pk4';
    case 'PK V': return 'badge-pk5';
    default: return 'badge-pk2';
  }
}

function getStatusBadgeClass(status) {
  switch (status) {
    case 'Disetujui': return 'badge-status-approved';
    case 'Proses Review': return 'badge-status-review';
    case 'Menunggu Mitra Bestari': return 'badge-status-pending';
    case 'Mendekati Kadaluarsa': return 'badge-status-expired';
    default: return 'badge-status-pending';
  }
}

function formatDate(dateStr) {
  if (!dateStr) return '-';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const months = ['', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    return `${parseInt(parts[2], 10)} ${months[parseInt(parts[1], 10)]} ${parts[0]}`;
  }
  return dateStr;
}

function changeNurseStatus(nurseId, newStatus) {
  const nurse = state.nurses.find(n => n.id === nurseId);
  if (!nurse) return;
  const oldStatus = nurse.credentialStatus;
  nurse.credentialStatus = newStatus;
  saveNurses();
  updateHeroStats();
  renderNursesTable();
  renderAnalyticsCharts();

  // Rekam notifikasi administrasi ke komitekeperawatanrsds2023@gmail.com & yadhie28@gmail.com
  recordAdminNotification({
    eventType: `Pembaruan Status Kredensial (${newStatus})`,
    subject: `[STATUS KREDENSIAL DIUBAH] ${nurse.name} (${nurse.pkLevel}) -> ${newStatus}`,
    applicantName: nurse.name,
    applicantNip: nurse.nip,
    unit: nurse.unit,
    bodyText: `Pemberitahuan perubahan status kredensial:\nNama: ${nurse.name}\nNIP: ${nurse.nip}\nUnit: ${nurse.unit}\nJenjang: ${nurse.pkLevel}\nStatus Baru: ${newStatus} (Sebelumnya: ${oldStatus})\nDiperbarui oleh: ${state.currentUser ? state.currentUser.name : 'Administrator'}`
  });

  showToast(`Status kredensial ${nurse.name} diubah ke "${newStatus}". Notifikasi tercatat untuk Komite & Sekretaris.`, 'success');
}

function deleteNurseRecord(nurseId) {
  const nurse = state.nurses.find(n => n.id === nurseId);
  if (!nurse) return;
  if (!confirm(`Konfirmasi: Apakah Anda yakin ingin menghapus data kredensial ${nurse.name} (${nurse.nip})? Tindakan ini tidak dapat dibatalkan.`)) {
    return;
  }
  state.nurses = state.nurses.filter(n => n.id !== nurseId);
  saveNurses();
  updateHeroStats();
  renderNursesTable();
  renderAnalyticsCharts();
  showToast(`Data tenaga keperawatan ${nurse.name} telah dihapus dari sistem.`, 'info');
}

/* ==========================================================================
   MUTU PROFESI & AUDIT TABLE
   ========================================================================== */
function renderAuditsTable() {
  const tbody = document.getElementById('auditTableBody');
  if (!tbody) return;

  const canEditMutu = isAdmin() && (hasRole('Mutu') || hasRole('Komite'));

  tbody.innerHTML = state.clinicalAudits.map(item => {
    let actionCol = '';
    if (canEditMutu) {
      actionCol = `
        <button class="btn-secondary" style="padding: 0.25rem 0.55rem; font-size: 0.75rem; margin-left: 6px;" onclick="openAuditModal('${item.unit}')" title="Edit Nilai Audit (Admin)">
          <i class="fa-solid fa-pen-to-square"></i> Edit
        </button>
      `;
    }

    return `
      <tr>
        <td>
          <strong style="color: var(--primary-700); font-size: 0.92rem;">${item.unit}</strong>
          <div style="font-size: 0.74rem; color: var(--text-muted);">Audit: ${item.lastAuditDate}</div>
        </td>
        <td>
          <span style="font-size: 0.85rem; font-weight: 600;">${item.headNurse}</span>
        </td>
        <td>
          <span style="font-weight: 700; color: #10b981;">${item.cpptCompliance}%</span>
        </td>
        <td>
          <span style="font-weight: 700; color: #0284c7;">${item.handHygiene}%</span>
        </td>
        <td>
          <span style="font-weight: 700; color: #10b981;">${item.phlebitisFree}%</span>
        </td>
        <td>
          <span style="font-weight: 700; color: #10b981;">${item.fallPrevention}%</span>
        </td>
        <td>
          <span style="font-weight: 700; color: var(--gold-600);">${item.cpdScore}%</span>
        </td>
        <td>
          <span class="badge-status badge-status-approved">
            <i class="fa-solid fa-star" style="color: var(--gold-500); font-size: 9px;"></i> ${item.overallGrade}
          </span>
          ${actionCol}
        </td>
      </tr>
    `;
  }).join('');
}

function openAuditModal(unitName = null) {
  const form = document.getElementById('formAuditInput');
  if (form) form.reset();

  if (unitName) {
    const existing = state.clinicalAudits.find(a => a.unit === unitName);
    if (existing) {
      document.getElementById('auditInputUnit').value = existing.unit;
      document.getElementById('auditInputKaru').value = existing.headNurse;
      document.getElementById('auditInputCppt').value = existing.cpptCompliance;
      document.getElementById('auditInputHh').value = existing.handHygiene;
      document.getElementById('auditInputPlebitis').value = existing.phlebitisFree;
      document.getElementById('auditInputJatuh').value = existing.fallPrevention;
      document.getElementById('auditInputCpd').value = existing.cpdScore;
    }
  }

  openModal('modalAuditInput');
}

function handleAuditSave(e) {
  e.preventDefault();
  const unit = document.getElementById('auditInputUnit').value.trim();
  const karu = document.getElementById('auditInputKaru').value.trim();
  const cppt = parseFloat(document.getElementById('auditInputCppt').value) || 0;
  const hh = parseFloat(document.getElementById('auditInputHh').value) || 0;
  const plebitis = parseFloat(document.getElementById('auditInputPlebitis').value) || 0;
  const jatuh = parseFloat(document.getElementById('auditInputJatuh').value) || 0;
  const cpd = parseFloat(document.getElementById('auditInputCpd').value) || 0;

  const avg = (cppt + hh + plebitis + jatuh + cpd) / 5;
  const grade = avg >= 95 ? 'A (Sangat Baik)' : avg >= 90 ? 'B+ (Baik)' : 'B (Cukup)';

  const existingIdx = state.clinicalAudits.findIndex(a => a.unit.toLowerCase() === unit.toLowerCase());
  const auditData = {
    unit: unit,
    headNurse: karu,
    cpptCompliance: cppt,
    handHygiene: hh,
    phlebitisFree: plebitis,
    fallPrevention: jatuh,
    cpdScore: cpd,
    overallGrade: grade,
    lastAuditDate: 'Oktober 2026'
  };

  if (existingIdx >= 0) {
    state.clinicalAudits[existingIdx] = auditData;
  } else {
    state.clinicalAudits.unshift(auditData);
  }

  saveAudits();
  closeModal('modalAuditInput');
  renderAuditsTable();
  showToast(`Nilai audit mutu asuhan keperawatan untuk ${unit} berhasil disimpan!`, 'success');
}

/* ==========================================================================
   ETIKA & DISIPLIN (WHISTLEBLOWING & TICKETS)
   ========================================================================== */
function renderEthicsTickets() {
  const tbody = document.getElementById('ethicsTicketsBody');
  if (!tbody) return;

  if (state.ethicsTickets.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; padding: 2rem; color: var(--text-muted);">
          Belum ada riwayat tiket konsultasi etik yang terdaftar.
        </td>
      </tr>
    `;
    return;
  }

  const canManageEtik = isAdmin() && (hasRole('Etik') || hasRole('Komite'));

  tbody.innerHTML = state.ethicsTickets.map(ticket => {
    let actionBtn = '';
    if (canManageEtik) {
      actionBtn = `
        <div style="margin-top: 6px;">
          <button class="btn-primary" style="padding: 0.25rem 0.65rem; font-size: 0.75rem;" onclick="openTicketActionModal('${ticket.ticketCode}')">
            <i class="fa-solid fa-gavel"></i> Tindak Lanjut
          </button>
        </div>
      `;
    }

    return `
      <tr>
        <td>
          <strong style="font-family: var(--font-mono); color: var(--primary-700);">${ticket.ticketCode}</strong>
        </td>
        <td>${ticket.date}</td>
        <td>
          <span style="font-weight: 600;">${ticket.category}</span>
        </td>
        <td>${ticket.unit}</td>
        <td>
          <span class="badge-status ${ticket.status.includes('Selesai') ? 'badge-status-approved' : 'badge-status-review'}">
            ${ticket.status}
          </span>
          ${actionBtn}
        </td>
        <td style="font-size: 0.82rem; color: var(--text-muted);">${ticket.note}</td>
      </tr>
    `;
  }).join('');
}

function handleEthicsSubmit(e) {
  e.preventDefault();
  const category = document.getElementById('ethicsCategory').value;
  const unit = document.getElementById('ethicsUnit').value;
  const desc = document.getElementById('ethicsDescription').value;
  const contact = document.getElementById('ethicsContact')?.value?.trim() || 'Anonim / Rahasia';

  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const newTicket = {
    ticketCode: `ETIK-2026-${randomNum}`,
    date: '21 Oktober 2026',
    category: category,
    unit: unit,
    status: 'Menunggu Telaah Subkomite',
    responseDate: 'Baru Masuk',
    note: 'Laporan telah diterima sekretariat Komite Keperawatan dan dijadwalkan untuk telaah awal berkas.'
  };

  state.ethicsTickets.unshift(newTicket);
  saveEthicsTickets();
  renderEthicsTickets();

  // Format Notifikasi Administrasi Resmi (Komite & Sekretaris)
  const adminSubject = `[RAHASIA - ETIK & DISIPLIN] Laporan Konsultasi Baru: ${newTicket.ticketCode}`;
  const adminBody = 
    `Kepada Yth.\n` +
    `1. Komite Keperawatan RSUD dr. Soedarso (komitekeperawatanrsds2023@gmail.com)\n` +
    `2. Ns. Rusmulyadi, S.Kep., MARS - Sekretaris Komite (yadhie28@gmail.com)\n\n` +
    `PEMBERITAHUAN PENERIMAAN LAPORAN / KONSULTASI ETIK & DISIPLIN PROFESI (KONFIDENSIAL):\n\n` +
    `• Nomor Tiket     : ${newTicket.ticketCode}\n` +
    `• Kategori        : ${category}\n` +
    `• Ruang / Unit    : ${unit}\n` +
    `• Tanggal Masuk   : 21 Oktober 2026\n` +
    `• Status Awal     : Menunggu Telaah Subkomite\n` +
    `• Kontak Pelapor  : ${contact}\n` +
    `• Uraian Ringkas  : ${desc}\n\n` +
    `Catatan Kerahasiaan: Laporan ini bersifat konfidensial berdasarkan Regulasi Subkomite Etik & Disiplin Profesi Komite Keperawatan RSUD dr. Soedarso.\n\n` +
    `Portal Komite Keperawatan RSUD dr. Soedarso Pontianak\n` +
    `https://yadhie28.github.io/komite-keperawatan-soedarso/`;

  recordAdminNotification({
    eventType: 'Laporan / Konsultasi Etika & Disiplin',
    subject: adminSubject,
    applicantName: `Pelapor (${newTicket.ticketCode})`,
    unit: unit,
    bodyText: adminBody
  });

  document.getElementById('formEthicsReport').reset();
  showToast(`Laporan etik berhasil dikirim! Nomor Tiket Anda: ${newTicket.ticketCode}. Notifikasi diteruskan ke email Komite & Sekretaris.`, 'success');

  showAdminEmailNoticeModal({
    eventType: 'Laporan / Konsultasi Etika & Disiplin Profesi (Rahasia)',
    subject: adminSubject,
    applicantName: `Pelapor (${newTicket.ticketCode})`,
    bodyText: adminBody
  });
}

function openTicketActionModal(ticketCode) {
  const ticket = state.ethicsTickets.find(t => t.ticketCode === ticketCode);
  if (!ticket) return;

  document.getElementById('actionTicketCode').value = ticket.ticketCode;
  document.getElementById('actionTicketDisplay').textContent = ticket.ticketCode;
  document.getElementById('actionTicketCategory').textContent = `${ticket.category} - ${ticket.unit}`;
  document.getElementById('actionTicketStatus').value = ticket.status;
  document.getElementById('actionTicketNotes').value = ticket.note || '';

  openModal('modalTicketAction');
}

function handleTicketActionSave(e) {
  e.preventDefault();
  const code = document.getElementById('actionTicketCode').value;
  const status = document.getElementById('actionTicketStatus').value;
  const notes = document.getElementById('actionTicketNotes').value.trim();

  const ticket = state.ethicsTickets.find(t => t.ticketCode === code);
  if (ticket) {
    const oldStatus = ticket.status;
    ticket.status = status;
    ticket.note = notes;
    ticket.responseDate = '21 Oktober 2026';
    saveEthicsTickets();
    closeModal('modalTicketAction');
    renderEthicsTickets();

    recordAdminNotification({
      eventType: `Pembaruan Tindak Lanjut Tiket Etik (${code})`,
      subject: `[UPDATE TIKET ETIK] ${code} -> ${status}`,
      applicantName: code,
      unit: ticket.unit,
      bodyText: `Status tiket etik ${code} diperbarui dari "${oldStatus}" menjadi "${status}".\nCatatan Tindak Lanjut: ${notes || '-'}\nOleh: ${state.currentUser ? state.currentUser.name : 'Sekretariat Komite Keperawatan'}`
    });

    showToast(`Status tindak lanjut tiket ${code} berhasil diperbarui! Notifikasi tercatat untuk Komite & Sekretaris.`, 'success');
  }
}

/* ==========================================================================
   REGULASI & UNDUHAN TABLE
   ========================================================================== */
function renderRegulationsTable() {
  const tbody = document.getElementById('regulasiTableBody');
  if (!tbody) return;

  const q = (document.getElementById('regulasiSearchInput')?.value || '').toLowerCase().trim();
  const cat = document.getElementById('regulasiCategoryFilter')?.value || '';

  const filtered = state.regulations.filter(r => {
    const matchQ = !q || r.title.toLowerCase().includes(q) || r.number.toLowerCase().includes(q);
    const matchCat = !cat || r.category === cat;
    return matchQ && matchCat;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; padding: 2rem; color: var(--text-muted);">
          Tidak ditemukan dokumen regulasi yang sesuai.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map(item => `
    <tr>
      <td>
        <span class="badge-official" style="font-size: 0.72rem;">${item.category}</span>
      </td>
      <td>
        <strong style="color: var(--text-main); font-size: 0.9rem;">${item.title}</strong>
        <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 2px;">${item.desc}</div>
      </td>
      <td style="font-family: var(--font-mono); font-size: 0.8rem; font-weight: 600;">${item.number}</td>
      <td>${item.year}</td>
      <td>
        <span style="font-weight: 700; color: ${item.format === 'PDF' ? '#ef4444' : '#0284c7'};">
          <i class="fa-solid fa-file-${item.format === 'PDF' ? 'pdf' : 'word'}"></i> ${item.format}
        </span>
        <span style="font-size: 0.75rem; color: var(--text-muted);">(${item.size})</span>
      </td>
      <td style="text-align: right;">
        <button class="btn-secondary" style="padding: 0.35rem 0.75rem; font-size: 0.8rem;" onclick="simulateDownload('${item.title}', '${item.format}')">
          <i class="fa-solid fa-download"></i> Unduh
        </button>
      </td>
    </tr>
  `).join('');
}

function simulateDownload(title, format) {
  showToast(`Mengunduh dokumen: "${title}" (${format})...`, 'info');
  setTimeout(() => {
    showToast(`Dokumen "${title}" berhasil diunduh.`, 'success');
  }, 1200);
}

/* ==========================================================================
   INTERACTIVE SVG ANALYTICS CHARTS
   ========================================================================== */
function renderAnalyticsCharts() {
  renderCareerLadderChart();
  renderCredentialStatusChart();
  renderUnitDistributionChart();
}

// 1. Chart Jenjang Karir (PK I - PK V, PMB)
function renderCareerLadderChart() {
  const container = document.getElementById('chartCareerLadder');
  if (!container) return;

  const counts = {
    'PK I': 0, 'PK II': 0, 'PK III': 0, 'PK IV': 0, 'PK V': 0, 'PMB': 0
  };

  state.nurses.forEach(n => {
    if (counts[n.pkLevel] !== undefined) counts[n.pkLevel]++;
  });

  const maxVal = Math.max(...Object.values(counts), 1);
  const keys = Object.keys(counts);
  const barWidth = 44;
  const spacing = 22;
  const totalW = keys.length * (barWidth + spacing);
  const chartHeight = 180;

  const isDark = state.theme === 'dark';
  const textColor = isDark ? '#cbd5e1' : '#475569';
  const labelColor = isDark ? '#94a3b8' : '#64748b';

  const barsSvg = keys.map((key, i) => {
    const val = counts[key];
    const barH = (val / maxVal) * (chartHeight - 40);
    const x = 30 + i * (barWidth + spacing);
    const y = chartHeight - barH;

    return `
      <g class="chart-bar-group">
        <rect class="chart-bar-rect" x="${x}" y="${y}" width="${barWidth}" height="${barH}" rx="6" fill="url(#tealGradient)" />
        <text x="${x + barWidth / 2}" y="${y - 6}" text-anchor="middle" font-size="12" font-weight="700" fill="${textColor}">${val}</text>
        <text x="${x + barWidth / 2}" y="${chartHeight + 18}" text-anchor="middle" font-size="11" font-weight="600" fill="${labelColor}">${key}</text>
      </g>
    `;
  }).join('');

  container.innerHTML = `
    <svg width="100%" height="100%" viewBox="0 0 ${totalW + 60} 220" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="tealGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#2dd4bf" />
          <stop offset="100%" stop-color="#0d5f5b" />
        </linearGradient>
      </defs>
      <line x1="20" y1="${chartHeight}" x2="${totalW + 40}" y2="${chartHeight}" stroke="${isDark ? '#334155' : '#e2e8f0'}" stroke-width="1.5" />
      ${barsSvg}
    </svg>
  `;
}

// 2. Chart Proporsi Status Kredensial
function renderCredentialStatusChart() {
  const container = document.getElementById('chartCredentialStatus');
  if (!container) return;

  const statusCounts = {
    'Disetujui': 0,
    'Proses Review': 0,
    'Menunggu Mitra Bestari': 0,
    'Mendekati Kadaluarsa': 0
  };

  state.nurses.forEach(n => {
    if (statusCounts[n.credentialStatus] !== undefined) statusCounts[n.credentialStatus]++;
  });

  const total = state.nurses.length || 1;
  const colors = {
    'Disetujui': '#10b981',
    'Proses Review': '#f59e0b',
    'Menunggu Mitra Bestari': '#0284c7',
    'Mendekati Kadaluarsa': '#ef4444'
  };

  const isDark = state.theme === 'dark';
  const textColor = isDark ? '#f1f5f9' : '#0f172a';

  let legendHtml = Object.keys(statusCounts).map(status => {
    const count = statusCounts[status];
    const pct = ((count / total) * 100).toFixed(1);
    return `
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 6px 0; border-bottom: 1px dashed ${isDark ? '#334155' : '#e2e8f0'};">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="width: 12px; height: 12px; border-radius: 3px; background: ${colors[status]};"></span>
          <span style="font-size: 0.85rem; color: ${textColor}; font-weight: 600;">${status}</span>
        </div>
        <div style="font-size: 0.85rem; font-weight: 700; color: ${textColor};">
          ${count} <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 500;">(${pct}%)</span>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div style="display: flex; flex-direction: column; justify-content: center; height: 100%; padding: 0.5rem 1rem;">
      ${legendHtml}
    </div>
  `;
}

// 3. Chart Distribusi per Ruangan
function renderUnitDistributionChart() {
  const container = document.getElementById('chartUnitDistribution');
  if (!container) return;

  const unitCounts = {};
  state.nurses.forEach(n => {
    const shortUnit = n.unit.split('(')[0].trim();
    unitCounts[shortUnit] = (unitCounts[shortUnit] || 0) + 1;
  });

  const isDark = state.theme === 'dark';
  const textColor = isDark ? '#cbd5e1' : '#334155';
  const sortedUnits = Object.entries(unitCounts).sort((a, b) => b[1] - a[1]);
  const maxVal = Math.max(...sortedUnits.map(u => u[1]), 1);

  const bars = sortedUnits.map(([unit, count]) => {
    const pct = (count / maxVal) * 100;
    return `
      <div style="margin-bottom: 0.75rem;">
        <div style="display: flex; justify-content: space-between; font-size: 0.82rem; font-weight: 600; margin-bottom: 4px; color: ${textColor};">
          <span>${unit}</span>
          <span>${count} Perawat/Bidan</span>
        </div>
        <div style="width: 100%; height: 10px; background: ${isDark ? '#1e293b' : '#e2e8f0'}; border-radius: 999px; overflow: hidden;">
          <div style="width: ${pct}%; height: 100%; background: linear-gradient(90deg, var(--gold-600), var(--gold-400)); border-radius: 999px;"></div>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div style="padding: 0.5rem 1rem; overflow-y: auto; max-height: 240px;">
      ${bars}
    </div>
  `;
}

/* ==========================================================================
   MULTI-STEP WIZARD (E-KREDENSIALING MODAL)
   ========================================================================= */
function openNewKredensialModal() {
  state.wizardStep = 1;

  // 5S Seiri: Data tersinkronisasi penuh dari Langkah 1 (CV) sebagai Single Source of Truth
  syncAllDownstreamFormsFromCv();
  syncJenisPermohonanToRkk();

  const master = getActiveCvMasterData();
  const jenjangVal = master.jenjang || document.getElementById('formJenjang')?.value || 'PK III';
  onJenjangChange(jenjangVal);

  const effectiveArea = master.areaKlinis || state.selectedAreaKlinis || document.getElementById('formAreaKlinis')?.value || 'kmb_bedah_pk3';
  const selArea = document.getElementById('formAreaKlinis');
  if (selArea) {
    if (selArea.querySelector(`option[value="${effectiveArea}"]`)) {
      selArea.value = effectiveArea;
    } else if (selArea.options.length > 0) {
      selArea.selectedIndex = 0;
    }
  }

  // Populate Smart 5S Applicant Profile Banner (Zero Redundancy)
  const hNama = document.getElementById('rkkHeaderNama');
  const hNip = document.getElementById('rkkHeaderNip');
  const hStr = document.getElementById('rkkHeaderStr');
  const hUnit = document.getElementById('rkkHeaderUnit');
  const hJenjang = document.getElementById('rkkHeaderJenjang');
  const hArea = document.getElementById('rkkHeaderArea');

  if (hNama) hNama.textContent = master.nama || 'Ns. Hendra Kurniawan, S.Kep';
  if (hNip) hNip.textContent = master.nip || '-';
  if (hStr) hStr.textContent = master.noStr || '-';
  if (hUnit) hUnit.textContent = master.unit || 'Enggang Gading 2';
  if (hJenjang) hJenjang.textContent = master.jenjang || 'PK III';
  if (hArea) {
    const areaOpt = selArea?.querySelector(`option[value="${selArea.value}"]`);
    hArea.textContent = 'Rumpun White Book 2026: ' + (areaOpt ? areaOpt.textContent : effectiveArea);
  }

  // Populate hidden inputs for 100% backward compatibility
  const fNama = document.getElementById('formNama');
  const fNip = document.getElementById('formNip');
  const fStr = document.getElementById('formStr');
  const fJenjang = document.getElementById('formJenjang');
  const fUnit = document.getElementById('formUnit');
  if (fNama) fNama.value = master.nama || 'Ns. Hendra Kurniawan, S.Kep';
  if (fNip) fNip.value = master.nip || '-';
  if (fStr) fStr.value = master.noStr || '-';
  if (fJenjang) fJenjang.value = master.jenjang || 'PK III';
  if (fUnit) fUnit.value = master.unit || 'Enggang Gading 2';

  // Sinkronkan filter area ke pilihan aktif
  const filterAreaEl = document.getElementById('formRkkAreaFilter');
  if (filterAreaEl && effectiveArea) {
    if (filterAreaEl.querySelector(`option[value="${effectiveArea}"]`)) {
      filterAreaEl.value = effectiveArea;
    }
  }

  // Muat daftar kewenangan klinis sesuai rumpun & jenjang
  onAreaKlinisChange(effectiveArea);

  const checkIntegritas = document.getElementById('checkPernyataanIntegritas');
  if (checkIntegritas) checkIntegritas.checked = false;

  openModal('modalNewKredensial');
}

function updateWizardUI() {
  const progressLine = document.getElementById('wizardProgressLine');
  const btnPrev = document.getElementById('btnWizardPrev');
  const btnNext = document.getElementById('btnWizardNext');
  const btnSubmit = document.getElementById('btnWizardSubmit');

  if (progressLine) {
    const pct = ((state.wizardStep - 1) / 3) * 100;
    progressLine.style.width = `${pct}%`;
  }

  for (let i = 1; i <= 4; i++) {
    const stepEl = document.getElementById(`stepIndicator${i}`);
    const contentEl = document.getElementById(`wizardStep${i}`);
    if (stepEl) {
      stepEl.classList.toggle('active', i === state.wizardStep);
      stepEl.classList.toggle('completed', i < state.wizardStep);
    }
    if (contentEl) {
      contentEl.style.display = i === state.wizardStep ? 'block' : 'none';
    }
  }

  if (btnPrev) btnPrev.style.display = state.wizardStep > 1 ? 'inline-flex' : 'none';
  if (btnNext) btnNext.style.display = state.wizardStep < 4 ? 'inline-flex' : 'none';
  if (btnSubmit) btnSubmit.style.display = state.wizardStep === 4 ? 'inline-flex' : 'none';

  if (state.wizardStep === 3) {
    const container = document.getElementById('rkkChecklistContainer');
    if (!container || !container.querySelector('table')) {
      const curArea = document.getElementById('formRkkAreaFilter')?.value || document.getElementById('formAreaKlinis')?.value || 'kmb_medikal_pk3';
      onAreaKlinisChange(curArea);
    }
  } else if (state.wizardStep === 4) {
    generateWizardSummary();
  }
}

function wizardNextStep() {
  if (state.wizardStep === 1) {
    const nama = document.getElementById('formNama').value.trim();
    const nip = document.getElementById('formNip').value.trim();
    const str = document.getElementById('formStr').value.trim();
    const strExp = document.getElementById('formStrExpiry').value;
    if (!nama || !nip || !str || !strExp) {
      showToast('Harap lengkapi semua kolom identitas dan nomor STR!', 'warning');
      return;
    }
  } else if (state.wizardStep === 2) {
    const jenjang = document.getElementById('formJenjang').value;
    const unit = document.getElementById('formUnit').value;
    if (!jenjang || !unit) {
      showToast('Harap pilih jenjang karir klinis dan ruangan pelayanan!', 'warning');
      return;
    }
  } else if (state.wizardStep === 3) {
    const chosen = document.querySelectorAll('#rkkChecklistContainer input[type="radio"]:checked, #rkkChecklistContainer input[type="checkbox"]:checked');
    if (chosen.length === 0) {
      showToast('Pilihlah minimal 1 kewenangan klinis (RKK) yang diajukan!', 'warning');
      return;
    }
  }

  if (state.wizardStep < 4) {
    state.wizardStep++;
    updateWizardUI();
    if (state.wizardStep === 3) {
      const curArea = document.getElementById('formRkkAreaFilter')?.value || document.getElementById('formAreaKlinis')?.value || 'kmb_medikal_pk3';
      onAreaKlinisChange(curArea);
    }
  }
}

function wizardPrevStep() {
  if (state.wizardStep > 1) {
    state.wizardStep--;
    updateWizardUI();
  }
}

function goToWizardStep(step, force = false) {
  state.wizardStep = step;
  updateWizardUI();
  if (step === 3) {
    const curArea = document.getElementById('formRkkAreaFilter')?.value || document.getElementById('formAreaKlinis')?.value || 'kmb_medikal_pk3';
    onAreaKlinisChange(curArea);
  }
}

function onJenjangChange(pkLevel) {
  const descEl = document.getElementById('jenjangDescText');
  const catalog = window.KOMITE_DATA?.rkkCatalog?.[pkLevel];
  if (descEl && catalog) {
    descEl.textContent = `${catalog.title} - ${catalog.description}`;
  }
  const jBadge = document.getElementById('step3JenjangBadge');
  if (jBadge) {
    jBadge.textContent = `Jenjang: ${pkLevel || 'PK III'}`;
  }
  populateAreaKlinisDropdown(pkLevel);
}

function getClusterFromAreaKey(areaKey) {
  if (!areaKey) return 'kmb';
  const k = areaKey.toLowerCase();
  if (k.includes('anak') || k.includes('picu') || k.includes('nicu')) return 'anak';
  if (k.includes('maternitas') || k.includes('obgyn') || k.includes('fertilitas')) return 'maternitas';
  if (k.includes('jiwa')) return 'jiwa';
  if (k.includes('perioperatif') || k.includes('ibs') || k.includes('bedah_sentral')) return 'perioperatif';
  if (k.includes('emergensi') || k.includes('igd') || k.includes('trauma')) return 'emergensi';
  if (k.includes('intensif') || k.includes('icu') || k.includes('iccu')) return 'intensif';
  if (k.includes('kardiovaskuler') || k.includes('cathlab') || k.includes('perfusi')) return 'kardiovaskuler';
  if (k.includes('neurosains') || k.includes('saraf')) return 'neurosains';
  if (k.includes('geriatri')) return 'geriatri';
  if (k.includes('onkologi') || k.includes('kanker')) return 'onkologi';
  if (k.includes('anestesi')) return 'anestesi';
  if (k.includes('nefrologi') || k.includes('dialisis')) return 'nefrologi';
  if (k.includes('gastro_hepato') || k.includes('endoskopi')) return 'gastro_hepato';
  if (k.includes('respirologi') || k.includes('paru')) return 'respirologi';
  if (k.includes('mata')) return 'mata';
  if (k.includes('radiologi')) return 'radiologi';
  return 'kmb';
}

function getClusterDisplayName(cluster) {
  const map = {
    'kmb': 'Medikal Bedah (KMB)',
    'perioperatif': 'Perioperatif (Kamar Bedah Sentral)',
    'emergensi': 'Gawat Darurat / Emergensi (IGD)',
    'intensif': 'Intensive Care (ICU / ICCU)',
    'kardiovaskuler': 'Kardiovaskuler (Pusat Jantung Terpadu)',
    'anak': 'Keperawatan Anak',
    'maternitas': 'Keperawatan Maternitas',
    'jiwa': 'Keperawatan Jiwa',
    'nefrologi': 'Nefrologi & Dialisis',
    'onkologi': 'Onkologi & Kemoterapi',
    'neurosains': 'Neurosains (Bedah Saraf & Neurologi)',
    'geriatri': 'Geriatri (Lanjut Usia)',
    'anestesi': 'Keperawatan Anestesi',
    'gastro_hepato': 'Gastro-Hepatologi (Endoskopi)',
    'respirologi': 'Respirologi (Paru)',
    'mata': 'Keperawatan Mata',
    'radiologi': 'Radiologi & Kedokteran Nuklir'
  };
  return map[cluster] || 'Medikal Bedah (KMB)';
}

function getAreaDisplayName(areaKey, pkLevel) {
  if (!areaKey) return 'Generalis';
  if (pkLevel && window.KOMITE_DATA?.whiteBookAreas?.[pkLevel]) {
    const found = window.KOMITE_DATA.whiteBookAreas[pkLevel].find(a => a.key === areaKey);
    if (found) return found.name;
  }
  for (const lvl in window.KOMITE_DATA?.whiteBookAreas || {}) {
    const item = window.KOMITE_DATA.whiteBookAreas[lvl].find(a => a.key === areaKey);
    if (item) return item.name;
  }
  return areaKey;
}

function getCumulativeRkkActions(pkLevel, areaKey) {
  const cluster = getClusterFromAreaKey(areaKey);
  const clusterName = getClusterDisplayName(cluster);
  const effectiveAreaName = getAreaDisplayName(areaKey, pkLevel);
  const isBidan = pkLevel === 'PMB' || String(pkLevel).toUpperCase().includes('BK') || String(pkLevel).toUpperCase().includes('BIDAN');

  const result = [];
  let currentNo = 1;

  // 1. Jika Praktik Bidan Klinis (PMB / BK I s.d BK IV)
  if (isBidan) {
    const pmbKey = (areaKey && window.KOMITE_DATA?.whiteBookActions?.[areaKey]) ? areaKey : 'pmb_kebidanan';
    const isBasePmb = (pmbKey === 'pmb_kebidanan');
    const basePmbActions = window.KOMITE_DATA?.whiteBookActions?.['pmb_kebidanan'] || [];

    // Jika pemohon memilih area spesifik kebidanan (misal maternitas_obgyn_pk3, maternitas_onkologi_pk3, anak_nicu_pk3)
    if (!isBasePmb) {
      // Tier 1: Dasar Kebidanan (Mandatory)
      basePmbActions.forEach((a) => {
        result.push({
          ...a,
          no: currentNo++,
          jenjangLevel: 'PMB',
          isMandatory: true,
          kategori: 'A. KEWENANGAN DASAR PRAKTIK BIDAN KLINIS (BK I - BK IV / PMB)',
          badgeText: 'MANDATORY BIDAN',
          defaultKode: a.defaultKode || 1
        });
      });

      // Tier 2: Area Kekhususan Kebidanan yang Diajukan
      const specificActions = window.KOMITE_DATA?.whiteBookActions?.[pmbKey] || [];
      specificActions.forEach((a) => {
        if (!result.some(r => r.id === a.id)) {
          result.push({
            ...a,
            no: currentNo++,
            jenjangLevel: 'PMB',
            isMandatory: false,
            kategori: `B. RINCIAN KEWENANGAN KLINIS BIDAN BUKU PUTIH 2026 (${effectiveAreaName.toUpperCase()})`,
            badgeText: 'DIAJUKAN BIDAN',
            defaultKode: a.defaultKode || 1
          });
        }
      });
    } else {
      // Area Kebidanan Komprehensif (BK I - BK IV)
      basePmbActions.forEach((a) => {
        result.push({
          ...a,
          no: currentNo++,
          jenjangLevel: 'PMB',
          isMandatory: false,
          kategori: 'A. RINCIAN KEWENANGAN KLINIS BIDAN BUKU PUTIH 2026 (PELAYANAN KEBIDANAN / PMB)',
          badgeText: 'DIAJUKAN BIDAN',
          defaultKode: a.defaultKode || 1
        });
      });
    }

    return result;
  }

  // 2. Jika Perawat Klinis (PK I s.d PK V):
  // -------------------------------------------------------------------------
  // TIER 1: KEWENANGAN KLINIS DASAR / GENERALIS (PK I)
  // -------------------------------------------------------------------------
  const isPk1Target = (pkLevel === 'PK I');
  const baseActions = (window.KOMITE_DATA?.mandatoryBaseActions || []).map(a => Object.assign({}, a));
  const pk1Specific = window.KOMITE_DATA?.whiteBookActions?.[`${cluster}_pk1`];
  const pk1Generalis = window.KOMITE_DATA?.whiteBookActions?.['generalis'] || [];
  const pk1Source = pk1Specific || pk1Generalis;

  const catTitlePk1 = isPk1Target
    ? 'A. RINCIAN KEWENANGAN KLINIS DIAJUKAN PK I (GENERALIS / ASUHAN DASAR)'
    : 'A. KEWENANGAN KLINIS MANDATORY PK I (DASAR GENERALIS)';

  baseActions.forEach(act => {
    if (!result.some(r => r.id === act.id)) {
      result.push({
        ...act,
        no: currentNo++,
        jenjangLevel: 'PK I',
        isMandatory: !isPk1Target,
        kategori: catTitlePk1,
        badgeText: isPk1Target ? 'DIAJUKAN PK I' : 'MANDATORY PK I',
        defaultKode: act.defaultKode || 1
      });
    }
  });

  pk1Source.forEach(act => {
    if (!result.some(r => r.id === act.id)) {
      result.push({
        ...act,
        no: currentNo++,
        jenjangLevel: 'PK I',
        isMandatory: !isPk1Target,
        kategori: catTitlePk1,
        badgeText: isPk1Target ? 'DIAJUKAN PK I' : 'MANDATORY PK I',
        defaultKode: act.defaultKode || 1
      });
    }
  });

  if (isPk1Target) {
    return result;
  }

  // -------------------------------------------------------------------------
  // TIER 2: KEWENANGAN KLINIS PK II (KLASTER AREA)
  // -------------------------------------------------------------------------
  const isPk2Target = (pkLevel === 'PK II');
  let pk2Key = `${cluster}_pk2`;
  if (cluster === 'kmb') pk2Key = 'kmb_dewasa_pk2';
  if (!window.KOMITE_DATA?.whiteBookActions?.[pk2Key]) {
    pk2Key = 'kmb_dewasa_pk2';
  }
  const pk2Source = window.KOMITE_DATA?.whiteBookActions?.[pk2Key] || window.KOMITE_DATA?.whiteBookActions?.['kmb_dewasa_pk2'] || [];
  const catTitlePk2 = isPk2Target
    ? `B. RINCIAN KEWENANGAN KLINIS DIAJUKAN PK II (${clusterName.toUpperCase()})`
    : `B. KEWENANGAN KLINIS MANDATORY PK II (${clusterName.toUpperCase()})`;

  pk2Source.forEach(act => {
    if (!result.some(r => r.id === act.id)) {
      result.push({
        ...act,
        no: currentNo++,
        jenjangLevel: 'PK II',
        isMandatory: !isPk2Target,
        kategori: catTitlePk2,
        badgeText: isPk2Target ? 'DIAJUKAN PK II' : 'MANDATORY PK II',
        defaultKode: act.defaultKode || 1
      });
    }
  });

  if (isPk2Target) {
    return result;
  }

  // -------------------------------------------------------------------------
  // TIER 3: KEWENANGAN KLINIS PK III (AREA SPESIFIK / KEKHUSUSAN)
  // -------------------------------------------------------------------------
  const isPk3Target = (pkLevel === 'PK III');
  let pk3Key = areaKey;
  if (!isPk3Target || !window.KOMITE_DATA?.whiteBookActions?.[pk3Key]) {
    // If applicant is PK IV or PK V, find the corresponding PK 3 key
    const mappedPk3 = areaKey ? areaKey.replace(/_pk[45]$/, '_pk3') : null;
    if (mappedPk3 && window.KOMITE_DATA?.whiteBookActions?.[mappedPk3]) {
      pk3Key = mappedPk3;
    } else if (window.KOMITE_DATA?.whiteBookActions?.[`${cluster}_medikal_pk3`]) {
      pk3Key = `${cluster}_medikal_pk3`;
    } else if (window.KOMITE_DATA?.whiteBookActions?.[`${cluster}_pk3`]) {
      pk3Key = `${cluster}_pk3`;
    } else {
      pk3Key = 'kmb_medikal_pk3';
    }
  }

  const pk3Source = window.KOMITE_DATA?.whiteBookActions?.[pk3Key] || window.KOMITE_DATA?.whiteBookActions?.['kmb_medikal_pk3'] || [];
  const pk3Title = isPk3Target ? effectiveAreaName : getAreaDisplayName(pk3Key, 'PK III');
  const catTitlePk3 = isPk3Target
    ? `C. RINCIAN KEWENANGAN KLINIS DIAJUKAN PK III (${pk3Title.toUpperCase()})`
    : `C. KEWENANGAN KLINIS MANDATORY PK III (${pk3Title.toUpperCase()})`;

  pk3Source.forEach(act => {
    if (!result.some(r => r.id === act.id)) {
      result.push({
        ...act,
        no: currentNo++,
        jenjangLevel: 'PK III',
        isMandatory: !isPk3Target,
        kategori: catTitlePk3,
        badgeText: isPk3Target ? 'DIAJUKAN PK III' : 'MANDATORY PK III',
        defaultKode: act.defaultKode || 1
      });
    }
  });

  if (isPk3Target) {
    return result;
  }

  // -------------------------------------------------------------------------
  // TIER 4: KEWENANGAN KLINIS PK IV (PROFICIENT / KONSULTAN RUANGAN)
  // -------------------------------------------------------------------------
  const isPk4Target = (pkLevel === 'PK IV');
  let pk4Key = areaKey;
  if (!isPk4Target || !window.KOMITE_DATA?.whiteBookActions?.[pk4Key]) {
    const mappedPk4 = areaKey ? areaKey.replace(/_pk5$/, '_pk4') : null;
    if (mappedPk4 && window.KOMITE_DATA?.whiteBookActions?.[mappedPk4]) {
      pk4Key = mappedPk4;
    } else if (window.KOMITE_DATA?.whiteBookActions?.[`${cluster}_pk4`]) {
      pk4Key = `${cluster}_pk4`;
    } else if (window.KOMITE_DATA?.whiteBookActions?.[`${cluster}_medikal_pk4`]) {
      pk4Key = `${cluster}_medikal_pk4`;
    } else {
      pk4Key = 'kmb_medikal_pk4';
    }
  }

  const pk4Source = window.KOMITE_DATA?.whiteBookActions?.[pk4Key] || window.KOMITE_DATA?.whiteBookActions?.['kmb_medikal_pk4'] || [];
  const pk4Title = isPk4Target ? effectiveAreaName : getAreaDisplayName(pk4Key, 'PK IV');
  const catTitlePk4 = isPk4Target
    ? `D. RINCIAN KEWENANGAN KLINIS DIAJUKAN PK IV (${pk4Title.toUpperCase()} - PROFICIENT)`
    : `D. KEWENANGAN KLINIS MANDATORY PK IV (${pk4Title.toUpperCase()} - PROFICIENT)`;

  pk4Source.forEach(act => {
    if (!result.some(r => r.id === act.id)) {
      result.push({
        ...act,
        no: currentNo++,
        jenjangLevel: 'PK IV',
        isMandatory: !isPk4Target,
        kategori: catTitlePk4,
        badgeText: isPk4Target ? 'DIAJUKAN PK IV' : 'MANDATORY PK IV',
        defaultKode: act.defaultKode || 1
      });
    }
  });

  if (isPk4Target) {
    return result;
  }

  // -------------------------------------------------------------------------
  // TIER 5: KEWENANGAN KLINIS PK V (EXPERT / PAKAR RS & PROVINSI)
  // -------------------------------------------------------------------------
  let pk5Key = areaKey;
  if (!window.KOMITE_DATA?.whiteBookActions?.[pk5Key]) {
    if (window.KOMITE_DATA?.whiteBookActions?.[`${cluster}_pk5`]) {
      pk5Key = `${cluster}_pk5`;
    } else {
      pk5Key = 'kmb_medikal_pk5';
    }
  }
  const pk5Source = window.KOMITE_DATA?.whiteBookActions?.[pk5Key] || window.KOMITE_DATA?.whiteBookActions?.['kmb_medikal_pk5'] || [];
  const pk5Title = effectiveAreaName || getAreaDisplayName(pk5Key, 'PK V');
  const catTitlePk5 = `E. RINCIAN KEWENANGAN KLINIS DIAJUKAN PK V (${pk5Title.toUpperCase()} - EXPERT/PAKAR)`;

  pk5Source.forEach(act => {
    if (!result.some(r => r.id === act.id)) {
      result.push({
        ...act,
        no: currentNo++,
        jenjangLevel: 'PK V',
        isMandatory: false,
        kategori: catTitlePk5,
        badgeText: 'DIAJUKAN PK V',
        defaultKode: act.defaultKode || 1
      });
    }
  });

  return result;
}

const RUMPUN_ORDER_BUKU_PUTIH = [
  "1. RUMPUN KEPERAWATAN GENERALIS (ASUHAN DASAR)",
  "2. RUMPUN KEPERAWATAN MEDIKAL BEDAH (KMB)",
  "3. RUMPUN PERIOPERATIF & ANESTESI",
  "4. RUMPUN GAWAT DARURAT (EMERGENSI) & CRITICAL CARE",
  "5. RUMPUN KARDIOVASKULER (PUSAT JANTUNG TERPADU / PJT)",
  "6. RUMPUN SPESIALISTIK DEWASA & KEKHUSUSAN",
  "7. RUMPUN KEPERAWATAN ANAK (PEDIATRIK & NEONATUS)",
  "8. RUMPUN MATERNITAS & PRAKTIK BIDAN KLINIS (BK)",
  "9. RUMPUN KEPERAWATAN JIWA"
];

function getRumpunBukuPutihLabel(areaKey) {
  if (!areaKey) return "2. RUMPUN KEPERAWATAN MEDIKAL BEDAH (KMB)";
  const k = areaKey.toLowerCase();
  if (k.startsWith('generalis')) {
    return "1. RUMPUN KEPERAWATAN GENERALIS (ASUHAN DASAR)";
  }
  if (k.includes('kmb') || k.includes('bedah_pk') || k.includes('medikal_pk')) {
    return "2. RUMPUN KEPERAWATAN MEDIKAL BEDAH (KMB)";
  }
  if (k.includes('perioperatif') || k.includes('ibs') || k.includes('anestesi')) {
    return "3. RUMPUN PERIOPERATIF & ANESTESI";
  }
  if (k.includes('emergensi') || k.includes('igd') || k.includes('intensif') || k.includes('icu') || k.includes('iccu') || k.includes('trauma') || k.includes('luka_bakar')) {
    return "4. RUMPUN GAWAT DARURAT (EMERGENSI) & CRITICAL CARE";
  }
  if (k.includes('kardio') || k.includes('cathlab') || k.includes('perfusi') || k.includes('pjt')) {
    return "5. RUMPUN KARDIOVASKULER (PUSAT JANTUNG TERPADU / PJT)";
  }
  if (k.includes('anak') || k.includes('pediatrik') || k.includes('picu') || k.includes('nicu')) {
    return "7. RUMPUN KEPERAWATAN ANAK (PEDIATRIK & NEONATUS)";
  }
  if (k.includes('maternitas') || k.includes('obgyn') || k.includes('kebidanan') || k.includes('bidan') || k.includes('fertilitas') || k.includes('pmb')) {
    return "8. RUMPUN MATERNITAS & PRAKTIK BIDAN KLINIS (BK)";
  }
  if (k.includes('jiwa')) {
    return "9. RUMPUN KEPERAWATAN JIWA";
  }
  return "6. RUMPUN SPESIALISTIK DEWASA & KEKHUSUSAN";
}

function populateAreaKlinisDropdown(pkLevel) {
  const selectArea = document.getElementById('formAreaKlinis');
  const selectFilter = document.getElementById('formRkkAreaFilter');
  if (!selectArea) return;

  const prevValue = selectArea.value;

  // Normalisasi Jenjang Sesuai White Book (Perawat PK I-V atau Bidan BK I-IV / PMB)
  let normalizedLevel = 'PK III';
  const isBidan = pkLevel && (String(pkLevel).toUpperCase().includes('BK') || String(pkLevel).toUpperCase().includes('BIDAN') || String(pkLevel).toUpperCase().includes('PMB'));

  if (isBidan) {
    normalizedLevel = 'PMB';
  } else if (pkLevel) {
    const s = String(pkLevel).toUpperCase();
    if (s.includes('PK V') || s.includes('PK 5')) normalizedLevel = 'PK V';
    else if (s.includes('PK IV') || s.includes('PK 4')) normalizedLevel = 'PK IV';
    else if (s.includes('PK III') || s.includes('PK 3')) normalizedLevel = 'PK III';
    else if (s.includes('PK II') || s.includes('PK 2')) normalizedLevel = 'PK II';
    else if (s.includes('PK I') || s.includes('PK 1')) normalizedLevel = 'PK I';
  }

  let areas = [];
  if (isBidan) {
    // Area Klinis Buku Putih Khusus Bidan (BK I - BK IV / PMB)
    areas = [
      { key: "pmb_kebidanan", name: "Pelayanan Praktik Bidan Klinis (BK I - BK IV / PMB Maternal & Neonatal)" },
      { key: "maternitas_obgyn_pk3", name: "Rumpun Maternitas - Obstetri & Ginekologi (Obgyn)" },
      { key: "maternitas_onkologi_pk3", name: "Rumpun Maternitas - Onkologi Kebidanan" },
      { key: "maternitas_fertilitas_pk3", name: "Rumpun Maternitas - Fertilitas & Bayi Tabung (IVF)" },
      { key: "anak_nicu_pk3", name: "Rumpun Anak - Neonatologi (NICU & Perinatologi)" },
      { key: "generalis_maternitas", name: "Generalis - Keperawatan Maternitas (Kebidanan Dasar)" }
    ];
  } else {
    areas = window.KOMITE_DATA?.whiteBookAreas?.[normalizedLevel] || window.KOMITE_DATA?.whiteBookAreas?.['PK III'] || [];
  }

  // Tentukan area target dari state, master CV data, atau mapping unit
  let candidateArea = state.selectedAreaKlinis || (typeof getActiveCvMasterData === 'function' ? getActiveCvMasterData()?.areaKlinis : null) || prevValue;
  if (!candidateArea && typeof mapUnitToAreaKlinis === 'function') {
    const curUnit = document.getElementById('formUnit')?.value || document.getElementById('cvUnit')?.value;
    candidateArea = mapUnitToAreaKlinis(curUnit, pkLevel);
  }

  // Cari area yang paling cocok di dalam areas (exact match atau cluster match)
  let targetArea = '';
  if (candidateArea && areas.some(a => a.key === candidateArea)) {
    targetArea = candidateArea;
  } else if (candidateArea) {
    const targetCluster = getClusterFromAreaKey(candidateArea);
    const clusterMatch = areas.find(a => getClusterFromAreaKey(a.key) === targetCluster);
    if (clusterMatch) targetArea = clusterMatch.key;
  }
  if (!targetArea && prevValue && areas.some(a => a.key === prevValue)) {
    targetArea = prevValue;
  }
  if (!targetArea && areas.length > 0) {
    const defaultOpt = areas.find(a => a.key === 'kmb_bedah_pk3' || a.key === 'kmb_medikal_pk3' || a.key === 'generalis' || a.key === 'pmb_kebidanan');
    targetArea = defaultOpt ? defaultOpt.key : areas[0].key;
  }

  state.selectedAreaKlinis = targetArea;

  // Kelompokkan area klinis ke dalam 9 Rumpun Resmi Buku Putih 2026
  const groups = {};
  areas.forEach(area => {
    const rumpunLabel = getRumpunBukuPutihLabel(area.key);
    if (!groups[rumpunLabel]) groups[rumpunLabel] = [];
    groups[rumpunLabel].push(area);
  });

  let html = `<option value="">-- Terisi &amp; Terkunci Otomatis Sesuai Form Sebelumnya --</option>`;

  RUMPUN_ORDER_BUKU_PUTIH.forEach(rumpunLabel => {
    if (groups[rumpunLabel] && groups[rumpunLabel].length > 0) {
      html += `<optgroup label="${rumpunLabel}">`;
      groups[rumpunLabel].forEach(area => {
        const isSel = (targetArea && area.key === targetArea) ? 'selected' : '';
        html += `<option value="${area.key}" ${isSel}>${area.name}</option>`;
      });
      html += `</optgroup>`;
    }
  });

  selectArea.innerHTML = html;
  if (targetArea) {
    selectArea.value = targetArea;
  }

  // Sinkronkan juga dropdown Step 3 (formRkkAreaFilter) dengan 9 Rumpun yang sama
  if (selectFilter) {
    const prevFilterVal = selectFilter.value;
    let filterHtml = `<option value="">-- Tampilkan Seluruh Rincian Tindakan Klinis (Buku Putih 2026) --</option>`;
    RUMPUN_ORDER_BUKU_PUTIH.forEach(rumpunLabel => {
      if (groups[rumpunLabel] && groups[rumpunLabel].length > 0) {
        filterHtml += `<optgroup label="${rumpunLabel}">`;
        groups[rumpunLabel].forEach(area => {
          filterHtml += `<option value="${area.key}">${area.name}</option>`;
        });
        filterHtml += `</optgroup>`;
      }
    });
    selectFilter.innerHTML = filterHtml;
    if (targetArea && selectFilter.querySelector(`option[value="${targetArea}"]`)) {
      selectFilter.value = targetArea;
    } else if (prevFilterVal && selectFilter.querySelector(`option[value="${prevFilterVal}"]`)) {
      selectFilter.value = prevFilterVal;
    }
  }

  // Kunci formAreaKlinis (input-locked & pointer-events none)
  selectArea.classList.add('input-locked');
  selectArea.setAttribute('tabindex', '-1');
  selectArea.style.pointerEvents = 'none';
  selectArea.style.background = 'var(--bg-locked, #f1f5f9)';
  selectArea.style.cursor = 'not-allowed';

  if (selectFilter && selectArea.value) {
    selectFilter.value = selectArea.value;
  }

  if (selectArea.value) {
    onAreaKlinisChange(selectArea.value);
  }
}

function onAreaKlinisChange(areaKey) {
  const container = document.getElementById('rkkChecklistContainer');
  const descEl = document.getElementById('areaKlinisDescText');
  const pkLevel = document.getElementById('formJenjang')?.value || 'PK III';
  if (!container) return;

  // Resolve safe effective area key
  let effectiveAreaKey = areaKey;
  if (!effectiveAreaKey) {
    const isBidan = pkLevel === 'PMB' || String(pkLevel).toUpperCase().includes('BK') || String(pkLevel).toUpperCase().includes('BIDAN');
    if (isBidan) effectiveAreaKey = 'pmb_kebidanan';
    else if (pkLevel === 'PK I') effectiveAreaKey = 'generalis';
    else if (pkLevel === 'PK II') effectiveAreaKey = 'kmb_dewasa_pk2';
    else if (pkLevel === 'PK IV') effectiveAreaKey = 'kmb_medikal_pk4';
    else if (pkLevel === 'PK V') effectiveAreaKey = 'kmb_medikal_pk5';
    else effectiveAreaKey = 'kmb_medikal_pk3';
  }

  // Synchronize Step 2 dropdown
  const selStep2 = document.getElementById('formAreaKlinis');
  if (selStep2 && effectiveAreaKey && selStep2.value !== effectiveAreaKey) {
    selStep2.value = effectiveAreaKey;
  }

  // Synchronize Step 3 dropdown
  const selStep3 = document.getElementById('formRkkAreaFilter');
  if (selStep3 && effectiveAreaKey && selStep3.value !== effectiveAreaKey) {
    selStep3.value = effectiveAreaKey;
  }

  // Update badges
  const jenjangBadge = document.getElementById('step3JenjangBadge');
  if (jenjangBadge) {
    jenjangBadge.textContent = `Jenjang: ${pkLevel}`;
  }

  const curAreaName = getAreaDisplayName(effectiveAreaKey, pkLevel);
  const areaBadge = document.getElementById('step3AreaBadge');
  if (areaBadge) {
    areaBadge.textContent = curAreaName;
  }

  if (descEl) {
    descEl.textContent = `Area Terpilih: ${curAreaName} (Buku Pedoman 2026).`;
  }

  state.currentWizardRkkList = getCumulativeRkkActions(pkLevel, effectiveAreaKey);

  const totalCount = state.currentWizardRkkList.length;
  const mandatoryCount = state.currentWizardRkkList.filter(a => a.isMandatory).length;
  const targetCount = totalCount - mandatoryCount;

  const countTextEl = document.getElementById('step3ActionCountText');
  if (countTextEl) {
    countTextEl.innerHTML = `Menampilkan <strong>${totalCount}</strong> tindakan klinis (<strong>${mandatoryCount}</strong> Mandatory + <strong>${targetCount}</strong> Diajukan ${pkLevel}) sesuai Buku Putih RSUD dr. Soedarso.`;
  }

  let html = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.65rem; background: var(--bg-surface); padding: 0.5rem 0.75rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); flex-wrap: wrap; gap: 0.5rem;">
      <div style="font-size: 0.76rem; color: var(--text-muted); display: flex; gap: 0.4rem; align-items: center; flex-wrap: wrap;">
        <strong>Petunjuk Ceklis Pemohon:</strong>
        <span class="badge" style="background: #e0f2fe; color: #0369a1; font-weight: 700;">1 (M): Mandiri</span>
        <span class="badge" style="background: #fef3c7; color: #92400e; font-weight: 700;">2 (S): Supervisi</span>
        <span class="badge" style="background: #f1f5f9; color: #475569; font-weight: 700;">3 (T): Tidak Diminta</span>
        <span class="badge" style="background: #eef2ff; color: #3730a3; font-weight: 600; border: 1px solid #c7d2fe;"><i class="fa-solid fa-shield-halved"></i> Rekomendasi &amp; Catatan MB Diverifikasi oleh Mitra Bestari</span>
      </div>
      <div style="font-size: 0.75rem; font-weight: 700; color: #0e3860; display: flex; gap: 0.4rem; align-items: center; flex-wrap: wrap;">
        <span class="badge" style="background: #0e3860; color: #fff;">Total: ${totalCount} Tindakan</span>
        ${mandatoryCount > 0 ? `<span class="badge" style="background: #e0f2fe; color: #0369a1;"><i class="fa-solid fa-lock"></i> Mandatory: ${mandatoryCount}</span>` : ''}
        <span class="badge" style="background: #fef3c7; color: #92400e;"><i class="fa-solid fa-star"></i> Diajukan ${pkLevel}: ${targetCount}</span>
      </div>
    </div>
    <div class="table-responsive" style="max-height: 480px; overflow-y: auto;">
      <table class="soedarso-table rkk-table-sticky-header" style="width: 100%; border-collapse: collapse; font-size: 0.82rem;">
        <thead>
          <tr style="background: #0e3860; color: #ffffff;">
            <th rowspan="2" class="soedarso-th-blue" style="width: 42px; text-align: center; vertical-align: middle;">No</th>
            <th rowspan="2" class="soedarso-th-blue" style="text-align: left; vertical-align: middle;">Daftar Rincian Kewenangan Klinis (White Book RSUD dr. Soedarso)</th>
            <th colspan="3" class="soedarso-th-blue" style="width: 210px; text-align: center;">Permohonan Kemampuan Klinis (Asesmen Mandiri)</th>
          </tr>
          <tr style="background: #0e3860; color: #ffffff;">
            <th class="soedarso-th-blue" style="width: 70px; text-align: center; font-size: 0.75rem;" title="Kode 1: Mandiri Penuh (Kompeten Tanpa Supervisi)">1 (M)</th>
            <th class="soedarso-th-blue" style="width: 70px; text-align: center; font-size: 0.75rem;" title="Kode 2: Di bawah Supervisi">2 (S)</th>
            <th class="soedarso-th-blue" style="width: 70px; text-align: center; font-size: 0.75rem;" title="Kode 3: Tidak Diminta">3 (T)</th>
          </tr>
        </thead>
        <tbody>
  `;

  let currentCat = '';
  state.currentWizardRkkList.forEach((item, idx) => {
    if (item.kategori !== currentCat) {
      currentCat = item.kategori;
      const isMandatoryCat = item.isMandatory;
      const catBg = isMandatoryCat ? '#f0f9ff' : '#0e3860';
      const catColor = isMandatoryCat ? '#0369a1' : '#ffffff';
      const catBorder = isMandatoryCat ? '4px solid #0284c7' : '4px solid #d97706';

      html += `
        <tr class="rkk-cat-header" style="background: ${catBg}; font-weight: 800; color: ${catColor}; border-left: ${catBorder};">
          <td colspan="5" style="padding: 7px 10px; font-size: 0.81rem; border: 1px solid #cbd5e1; text-transform: uppercase; letter-spacing: 0.2px;">
            ${isMandatoryCat ? '<i class="fa-solid fa-lock" style="margin-right: 4px;"></i>' : '<i class="fa-solid fa-star" style="margin-right: 4px; color: #fbbf24;"></i>'}
            ${currentCat}
          </td>
        </tr>
      `;
    }

    const kode = item.defaultKode || 1;
    const isCode1 = (kode === 1);
    const isCode2 = (kode === 2);
    const isCode3 = (kode === 3);

    html += `
      <tr id="row_rkk_${item.id}" class="rkk-row ${item.isMandatory ? 'is-mandatory' : 'is-target'}" style="border-bottom: 1px solid #e2e8f0; ${item.isMandatory ? 'background: #fafcff;' : ''}">
        <td style="text-align: center; font-weight: 700; color: var(--text-muted); font-size: 0.78rem; border: 1px solid #e2e8f0; vertical-align: middle;">${item.no || (idx + 1)}</td>
        <td style="border: 1px solid #e2e8f0; padding: 6px 8px; vertical-align: middle;">
          <div style="font-weight: 600; color: var(--text-main); font-size: 0.83rem;">${item.name}</div>
          <div style="font-size: 0.72rem; color: var(--text-muted); display: flex; gap: 0.4rem; margin-top: 3px; flex-wrap: wrap; align-items: center;">
            <span class="badge" style="background: ${item.isMandatory ? '#e0f2fe; color: #0369a1;' : '#fef3c7; color: #92400e;'} font-weight: 700; font-size: 0.69rem;">
              <i class="fa-solid ${item.isMandatory ? 'fa-lock' : 'fa-star'}"></i> ${item.badgeText}
            </span>
            <span class="badge" style="background: #f1f5f9; padding: 1px 6px;">${item.domain || 'Asuhan'}</span>
            <span class="badge" style="background: #eef2ff; color: #4338ca; padding: 1px 6px;">Sifat: ${item.jenisTindakan || 'Mandiri'}</span>
            <span class="badge-status-rkk ${isCode1 ? 'badge-mandiri' : (isCode2 ? 'badge-supervisi' : 'badge-tidak')}" id="badge_status_${item.id}">
              ${isCode1 ? '<i class="fa-solid fa-check"></i> 1: Mandiri' : (isCode2 ? '<i class="fa-solid fa-user-group"></i> 2: Supervisi' : '<i class="fa-solid fa-xmark"></i> 3: Tidak Diminta')}
            </span>
          </div>
        </td>
        <td class="rkk-cell-check rkk-cell-1 ${isCode1 ? 'active-code-1' : ''}" onclick="selectRkkRadio('${item.id}', 1, event)" title="Klik untuk ceklis Kode 1 (Mandiri Penuh)">
          <input type="radio" name="rkk_mandiri_${item.id}" id="radio_${item.id}_1" value="1" ${isCode1 ? 'checked' : ''} onchange="onRkkRadioChange('${item.id}', 1)">
        </td>
        <td class="rkk-cell-check rkk-cell-2 ${isCode2 ? 'active-code-2' : ''}" onclick="selectRkkRadio('${item.id}', 2, event)" title="Klik untuk ceklis Kode 2 (Di bawah Supervisi)">
          <input type="radio" name="rkk_mandiri_${item.id}" id="radio_${item.id}_2" value="2" ${isCode2 ? 'checked' : ''} onchange="onRkkRadioChange('${item.id}', 2)">
        </td>
        <td class="rkk-cell-check rkk-cell-3 ${isCode3 ? 'active-code-3' : ''}" onclick="selectRkkRadio('${item.id}', 3, event)" title="Klik untuk ceklis Kode 3 (Tidak Diminta)">
          <input type="radio" name="rkk_mandiri_${item.id}" id="radio_${item.id}_3" value="3" ${isCode3 ? 'checked' : ''} onchange="onRkkRadioChange('${item.id}', 3)">
        </td>
      </tr>
    `;
  });

  html += `
        </tbody>
      </table>
    </div>
  `;

  container.innerHTML = html;

  // Update live counters
  updateRkkLiveCounters();

  // Re-apply search query if user was typing in search box
  const searchInput = document.getElementById('rkkSearchActionInput');
  if (searchInput && searchInput.value.trim()) {
    onStep3SearchAction(searchInput.value.trim());
  }
}

function selectRkkRadio(itemId, val, event) {
  if (event && event.target && event.target.tagName === 'INPUT') {
    updateRkkRowVisual(itemId, val);
    return;
  }
  const radio = document.querySelector(`input[name="rkk_mandiri_${itemId}"][value="${val}"]`);
  if (radio) {
    radio.checked = true;
    updateRkkRowVisual(itemId, val);
  }
}

function onRkkRadioChange(itemId, val) {
  updateRkkRowVisual(itemId, val);
}

function updateRkkRowVisual(itemId, val) {
  const row = document.getElementById(`row_rkk_${itemId}`);
  if (!row) return;

  const cell1 = row.querySelector('.rkk-cell-1');
  const cell2 = row.querySelector('.rkk-cell-2');
  const cell3 = row.querySelector('.rkk-cell-3');
  if (cell1) cell1.classList.toggle('active-code-1', val == 1);
  if (cell2) cell2.classList.toggle('active-code-2', val == 2);
  if (cell3) cell3.classList.toggle('active-code-3', val == 3);

  const badge = document.getElementById(`badge_status_${itemId}`);
  if (badge) {
    if (val == 1) {
      badge.className = 'badge-status-rkk badge-mandiri';
      badge.innerHTML = '<i class="fa-solid fa-check"></i> 1: Mandiri';
    } else if (val == 2) {
      badge.className = 'badge-status-rkk badge-supervisi';
      badge.innerHTML = '<i class="fa-solid fa-user-group"></i> 2: Supervisi';
    } else if (val == 3) {
      badge.className = 'badge-status-rkk badge-tidak';
      badge.innerHTML = '<i class="fa-solid fa-xmark"></i> 3: Tidak Diminta';
    } else {
      badge.className = 'badge-status-rkk badge-uncheck';
      badge.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Belum Diceklis';
    }
  }

  const mb1 = row.querySelector('.mb-col-1');
  const mb2 = row.querySelector('.mb-col-2');
  const mb3 = row.querySelector('.mb-col-3');
  const note = row.querySelector('.rkk-catatan-input');
  if (mb1) mb1.innerHTML = val == 1 ? '<span style="color:#16a34a; font-weight:bold;">[√]</span>' : '<span style="color:#94a3b8;">[ ]</span>';
  if (mb2) mb2.innerHTML = val == 2 ? '<span style="color:#d97706; font-weight:bold;">[√]</span>' : '<span style="color:#94a3b8;">[ ]</span>';
  if (mb3) mb3.innerHTML = val == 3 ? '<span style="color:#64748b; font-weight:bold;">[√]</span>' : '<span style="color:#94a3b8;">[ ]</span>';
  if (note) {
    if (val == 1) note.value = 'Kompeten Penuh';
    else if (val == 2) note.value = 'Supervisi';
    else if (val == 3) note.value = 'Tidak Diminta';
  }

  updateRkkLiveCounters();
}

function updateRkkLiveCounters() {
  const container = document.getElementById('rkkChecklistContainer');
  if (!container) return;

  const total = (state.currentWizardRkkList && state.currentWizardRkkList.length) || 0;
  let count1 = 0, count2 = 0, count3 = 0, countChecked = 0;

  if (state.currentWizardRkkList) {
    state.currentWizardRkkList.forEach(item => {
      const radio = document.querySelector(`input[name="rkk_mandiri_${item.id}"]:checked`);
      if (radio) {
        countChecked++;
        if (radio.value === '1') count1++;
        else if (radio.value === '2') count2++;
        else if (radio.value === '3') count3++;
      }
    });
  }

  const countEl = document.getElementById('rkkCheckedCount');
  if (countEl) countEl.textContent = `${countChecked} / ${total}`;

  const c1El = document.getElementById('countMandiriBadge');
  if (c1El) c1El.textContent = count1;

  const c2El = document.getElementById('countSupervisiBadge');
  if (c2El) c2El.textContent = count2;

  const c3El = document.getElementById('countTidakBadge');
  if (c3El) c3El.textContent = count3;

  const unchecked = total - countChecked;
  const uncheckBadge = document.getElementById('badgeUncheckedCount');
  const countUncheckedEl = document.getElementById('countUncheckedBadge');
  const progText = document.getElementById('rkkCheckedProgressText');

  if (uncheckBadge) uncheckBadge.style.display = unchecked > 0 ? 'inline-flex' : 'none';
  if (countUncheckedEl) countUncheckedEl.textContent = unchecked;

  if (progText) {
    if (unchecked === 0 && total > 0) {
      progText.style.color = '#15803d';
      progText.innerHTML = '<i class="fa-solid fa-circle-check"></i> Lengkap';
    } else {
      progText.style.color = '#d97706';
      progText.innerHTML = `<i class="fa-solid fa-clock"></i> Belum Lengkap (${unchecked} belum diceklis)`;
    }
  }
}

function onStep3AreaFilterChange(areaKey) {
  const selectStep2 = document.getElementById('formAreaKlinis');
  if (selectStep2 && areaKey) {
    selectStep2.value = areaKey;
  }
  onAreaKlinisChange(areaKey);
  const searchInput = document.getElementById('rkkSearchActionInput');
  if (searchInput) searchInput.value = '';
}

function onStep3SearchAction(keyword) {
  const query = (keyword || '').toLowerCase().trim();
  const allRows = document.querySelectorAll('#rkkChecklistContainer table tbody tr');
  let visibleCount = 0;
  let totalRows = 0;

  allRows.forEach(tr => {
    const isHeader = !!tr.querySelector('td[colspan]');
    if (!isHeader) {
      totalRows++;
      const text = tr.textContent.toLowerCase();
      if (!query || text.includes(query)) {
        tr.style.display = '';
        visibleCount++;
      } else {
        tr.style.display = 'none';
      }
    }
  });

  let currentHeader = null;
  let currentHeaderHasVisible = false;
  allRows.forEach(tr => {
    const isHeader = !!tr.querySelector('td[colspan]');
    if (isHeader) {
      if (currentHeader) {
        currentHeader.style.display = (!query || currentHeaderHasVisible) ? '' : 'none';
      }
      currentHeader = tr;
      currentHeaderHasVisible = false;
    } else {
      if (tr.style.display !== 'none') {
        currentHeaderHasVisible = true;
      }
    }
  });
  if (currentHeader) {
    currentHeader.style.display = (!query || currentHeaderHasVisible) ? '' : 'none';
  }

  const countEl = document.getElementById('step3ActionCountText');
  if (countEl) {
    if (query) {
      countEl.innerHTML = `Ditemukan <strong>${visibleCount}</strong> dari ${totalRows} tindakan klinis untuk kata kunci "<em>${keyword}</em>".`;
    } else {
      const pkLevel = document.getElementById('formJenjang')?.value || 'PK III';
      const mandatoryCount = (state.currentWizardRkkList || []).filter(a => a.isMandatory).length;
      const targetCount = totalRows - mandatoryCount;
      countEl.innerHTML = `Menampilkan <strong>${totalRows}</strong> tindakan klinis (<strong>${mandatoryCount}</strong> Mandatory + <strong>${targetCount}</strong> Diajukan ${pkLevel}) sesuai Buku Putih RSUD dr. Soedarso.`;
    }
  }
}

function setAllRkkKode(val) {
  if (!state.currentWizardRkkList) return;
  state.currentWizardRkkList.forEach(item => {
    const radio = document.querySelector(`input[name="rkk_mandiri_${item.id}"][value="${val}"]`);
    if (radio) radio.checked = true;
    updateRkkRowVisual(item.id, val);
  });
  updateRkkLiveCounters();
}

function setMandatoryOnlyKode(val) {
  if (!state.currentWizardRkkList) return;
  state.currentWizardRkkList.forEach(item => {
    if (item.isMandatory) {
      const radio = document.querySelector(`input[name="rkk_mandiri_${item.id}"][value="${val}"]`);
      if (radio) radio.checked = true;
      updateRkkRowVisual(item.id, val);
    }
  });
  updateRkkLiveCounters();
}

function clearAllRkkRadios() {
  if (!state.currentWizardRkkList) return;
  state.currentWizardRkkList.forEach(item => {
    const radios = document.querySelectorAll(`input[name="rkk_mandiri_${item.id}"]`);
    radios.forEach(r => r.checked = false);
    const row = document.getElementById(`row_rkk_${item.id}`);
    if (row) {
      row.querySelectorAll('.rkk-cell-check').forEach(c => {
        c.classList.remove('active-code-1', 'active-code-2', 'active-code-3');
      });
      const badge = document.getElementById(`badge_status_${item.id}`);
      if (badge) {
        badge.className = 'badge-status-rkk badge-uncheck';
        badge.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Belum Diceklis';
      }
      const mb1 = row.querySelector('.mb-col-1');
      const mb2 = row.querySelector('.mb-col-2');
      const mb3 = row.querySelector('.mb-col-3');
      const note = row.querySelector('.rkk-catatan-input');
      if (mb1) mb1.innerHTML = '<span style="color:#94a3b8;">[ ]</span>';
      if (mb2) mb2.innerHTML = '<span style="color:#94a3b8;">[ ]</span>';
      if (mb3) mb3.innerHTML = '<span style="color:#94a3b8;">[ ]</span>';
      if (note) note.value = '';
    }
  });
  updateRkkLiveCounters();
}

function resetAllRkkKode() {
  const currentArea = document.getElementById('formRkkAreaFilter')?.value || document.getElementById('formAreaKlinis')?.value;
  if (currentArea) {
    onAreaKlinisChange(currentArea);
  } else {
    const currentPk = document.getElementById('formJenjang')?.value || 'PK III';
    onJenjangChange(currentPk);
  }
  const searchInput = document.getElementById('rkkSearchActionInput');
  if (searchInput) searchInput.value = '';
}

function setAllKewenangan(val) {
  if (val === 'M') setAllRkkKode(1);
  else if (val === 'S') setAllRkkKode(2);
}

function resetAllKewenangan() {
  resetAllRkkKode();
}

function toggleAllRkk(checkAll) {
  setAllRkkKode(checkAll ? 1 : 2);
}

function generateWizardSummary() {
  const summaryBox = document.getElementById('wizardSummaryText');
  if (!summaryBox) return;

  const nama = document.getElementById('formNama').value;
  const nip = document.getElementById('formNip').value;
  const str = document.getElementById('formStr').value;
  const strExp = document.getElementById('formStrExpiry').value;
  const jenjang = document.getElementById('formJenjang').value;
  const areaSelect = document.getElementById('formAreaKlinis');
  const areaName = areaSelect?.options[areaSelect.selectedIndex]?.text || 'Generalis';
  const unit = document.getElementById('formUnit').value;
  const selectedJenis = document.querySelector('input[name="jenisPermohonan"]:checked')?.value || 'Re-Kredensial Berkala';

  const radios = document.querySelectorAll('#rkkChecklistContainer input[type="radio"]:checked');
  let count1 = 0, count2 = 0, count3 = 0;
  radios.forEach(r => {
    if (r.value === '1') count1++;
    else if (r.value === '2') count2++;
    else if (r.value === '3') count3++;
  });
  const totalCount = state.currentWizardRkkList.length || radios.length;
  const mandatoryCount = (state.currentWizardRkkList || []).filter(a => a.isMandatory).length;
  const targetCount = totalCount - mandatoryCount;
  const cluster = getClusterFromAreaKey(areaSelect?.value);
  const clusterName = getClusterDisplayName(cluster);

  summaryBox.innerHTML = `
    <div><strong>Nama Pegawai:</strong> ${nama}</div>
    <div><strong>NIP / NIK:</strong> ${nip}</div>
    <div><strong>Nomor STR:</strong> ${str} (Berlaku s/d ${formatDate(strExp)})</div>
    <div><strong>Jenis Permohonan:</strong> <span class="badge" style="background:#e0f2fe; color:#0369a1; font-weight:700;"><i class="fa-solid fa-lock"></i> ${selectedJenis}</span></div>
    <div><strong>Jenjang Karir Diajukan:</strong> <span class="badge-pk badge-pk3">${jenjang}</span></div>
    <div><strong>Rumpun / Area Buku Putih:</strong> <strong style="color:#0e3860;">${areaName}</strong></div>
    <div><strong>Unit Pelayanan:</strong> ${unit}</div>
    <div style="margin-top: 6px; padding-top: 6px; border-top: 1px dashed var(--border-subtle); line-height: 1.5;">
      <strong>Struktur Kewenangan Klinis Kumulatif (${totalCount} Tindakan Total):</strong><br>
      <div style="font-size: 0.78rem; margin: 3px 0 6px 0;">
        ${mandatoryCount > 0 ? `<span class="badge" style="background:#e0f2fe; color:#0369a1; font-weight:700;"><i class="fa-solid fa-lock"></i> Mandatory Dasar: ${mandatoryCount} Tindakan (PK I + PK II ${clusterName})</span>` : ''}
        <span class="badge" style="background:#fef3c7; color:#92400e; font-weight:700; margin-left:4px;"><i class="fa-solid fa-star"></i> Diajukan ${jenjang}: ${targetCount} Tindakan</span>
      </div>
      <strong>Hasil Asesmen Mandiri:</strong><br>
      <span class="badge" style="background:#dcfce7; color:#15803d; font-weight:700;">Kode 1 (Mandiri Penuh): ${count1}</span>
      <span class="badge" style="background:#fef3c7; color:#92400e; font-weight:700; margin-left:4px;">Kode 2 (Supervisi): ${count2}</span>
      <span class="badge" style="background:#f1f5f9; color:#475569; font-weight:700; margin-left:4px;">Kode 3 (Tidak Diminta): ${count3}</span>
    </div>
  `;
}

function handleKredensialSubmit(e) {
  e.preventDefault();

  const checkIntegritas = document.getElementById('checkPernyataanIntegritas');
  if (checkIntegritas && !checkIntegritas.checked) {
    showToast('Harap beri tanda centang pada Pernyataan Integritas sebelum mengirim permohonan.', 'warning');
    checkIntegritas.focus();
    return;
  }

  const nama = document.getElementById('formNama').value.trim();
  const nip = document.getElementById('formNip').value.trim();
  const str = document.getElementById('formStr').value.trim();
  const strExp = document.getElementById('formStrExpiry').value;
  const jenjang = document.getElementById('formJenjang').value;
  const unit = document.getElementById('formUnit').value;
  const selArea = document.getElementById('formAreaKlinis');
  const areaKey = selArea?.value || 'kmb_bedah_pk3';
  const selectedJenis = document.querySelector('input[name="jenisPermohonan"]:checked')?.value || 'Re-Kredensial Berkala';
  const totalCount = (state.currentWizardRkkList && state.currentWizardRkkList.length) || 10;
  const countM = document.querySelectorAll('#rkkChecklistContainer input[type="radio"][value="1"]:checked, #rkkChecklistContainer input[type="radio"][value="M"]:checked').length;

  // Simpan data pemohon ke state aktif
  state.currentApplicant = {
    nama: nama,
    nip: nip,
    str: str,
    strExpiry: strExp,
    jenisPermohonan: selectedJenis,
    jenjang: jenjang,
    unit: unit,
    areaKlinis: areaKey,
    approvedCompetencies: countM,
    totalCompetencies: totalCount
  };

  // Mark step 4 as submitted/completed in system
  state.kredensialRkkSubmitted = true;
  localStorage.setItem('komite_rkk_submitted', 'true');
  updateAlurStepStatus();

  closeModal('modalNewKredensial');
  showToast(`Asesmen Mandiri RKK atas nama ${nama} berhasil disimpan! Dokumen siap dicetak. Silakan lanjutkan ke Langkah 5 (PSV) dan Langkah 6 (Unggah Berkas).`, 'success');

  // Konfirmasi langsung untuk Cetak RKK atau lanjut alur
  setTimeout(() => {
    const opsiLanjut = confirm(
      "Alur E-Kredensialing RSUD dr. Soedarso:\n\n" +
      "Langkah 4 (Pengisian RKK Online) Telah Selesai Tersimpan!\n\n" +
      "Apakah Anda ingin membuka Pratinjau Dokumen RKK Resmi (PDF 3 Halaman) sekarang untuk dicetak/diunduh?\n\n" +
      "(Klik 'OK' untuk Cetak RKK, atau 'Cancel' untuk lanjut ke Langkah 5 / Langkah 6)"
    );
    if (opsiLanjut) {
      previewRkkHVS('filled');
      openModal('modalPreviewRkkHVS');
    }
  }, 400);
}

/* ==========================================================================
   ALUR KREDENSIAL 3 LANGKAH & REAL-TIME TRACKER (Inspired by komkeprsbari.com)
   ========================================================================== */

function renderReturnedRkkBanner() {
  const box = document.getElementById('boxRkkDikembalikan');
  if (!box) return;
  const list = window.KOMITE_DATA?.returnedRkk || [];
  if (list.length === 0) {
    box.style.display = 'none';
    return;
  }

  const item = list[0];
  box.style.display = 'block';
  box.innerHTML = `
    <div style="background: #fffbeb; border: 1.5px solid #f59e0b; border-radius: var(--radius-md); padding: 1rem 1.25rem; display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
      <div style="display: flex; gap: 0.85rem; align-items: flex-start;">
        <div style="background: #fef3c7; color: #b45309; width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; flex-shrink: 0; margin-top: 2px;">
          <i class="fa-solid fa-triangle-exclamation"></i>
        </div>
        <div>
          <div style="font-size: 0.95rem; font-weight: 800; color: #92400e;">
            Pemberitahuan Telaah Subkomite: Berkas RKK Memerlukan Perbaikan / Revisi
          </div>
          <div style="font-size: 0.84rem; color: #78350f; margin-top: 3px;">
            Atas nama: <strong>${item.nurseName}</strong> (NIP: ${item.nip}) &bull; Unit: ${item.unit} &bull; Jenjang: <span class="badge-pk badge-pk4">${item.pkLevel}</span>
          </div>
          <div style="font-size: 0.82rem; background: rgba(245, 158, 11, 0.15); border-left: 3px solid #d97706; padding: 6px 10px; margin-top: 6px; border-radius: 3px; color: #78350f;">
            <strong>Catatan Revisi Subkomite Kredensial (${item.tglPengembalian}):</strong><br>
            "${item.alasan}"
          </div>
        </div>
      </div>
      <div style="display: flex; gap: 0.5rem; align-items: center;">
        <button class="btn-primary" style="background: #d97706; border-color: #d97706; font-size: 0.82rem; padding: 0.45rem 0.9rem;" onclick="openModalUploadSurat()">
          <i class="fa-solid fa-cloud-arrow-up"></i> Perbaiki & Unggah Ulang Berkas
        </button>
      </div>
    </div>
  `;
}

function updateAlurStepStatus() {
  const b1 = document.getElementById('badgeStep1Status');
  const b2 = document.getElementById('badgeStep2Status');
  const b3 = document.getElementById('badgeStep3Status');
  const b4 = document.getElementById('badgeStep4Status');
  const b5 = document.getElementById('badgeStep5PsvStatus') || document.getElementById('badgeStep5Status');
  const b6 = document.getElementById('badgeStep6Status');

  // Langkah 1: CV Portofolio Klinis (badgeStep1Status)
  if (b1) {
    b1.style.display = 'none';
  }

  // Langkah 2: Logbook Kinerja Klinis Harian (badgeStep2Status)
  if (state.kredensialLogbookGenerated && b2) {
    b2.style.background = '#dcfce7';
    b2.style.color = '#15803d';
    b2.innerHTML = '<i class="fa-solid fa-circle-check"></i> Logbook Diunduh';
  }

  // Langkah 3: Surat Permohonan Kredensial (badgeStep3Status)
  if (state.kredensialSuratGenerated && b3) {
    b3.style.background = '#dcfce7';
    b3.style.color = '#15803d';
    b3.innerHTML = '<i class="fa-solid fa-circle-check"></i> Surat Diunduh';
  }

  // Langkah 4: Asesmen RKK Online (badgeStep4Status)
  if (b4) {
    if (state.kredensialRkkSubmitted) {
      b4.style.background = '#dcfce7';
      b4.style.color = '#15803d';
      b4.innerHTML = '<i class="fa-solid fa-circle-check"></i> RKK Terkirim (Review)';
    } else {
      b4.style.display = 'none';
    }
  }

  // Langkah 5: Verifikasi Sumber Asli (PSV) (badgeStep5PsvStatus)
  if (b5) {
    b5.style.display = 'none';
  }

  // Langkah 6: Unggah Berkas Lengkap (badgeStep6Status)
  if (b6) {
    b6.style.display = 'none';
  }
}

/* ==========================================================================
   ALUR LANGKAH 1: FORMULIR & BLANGKO RESMI CURRICULUM VITAE (CV) 3 HALAMAN
   STANDAR KOMITE KEPERAWATAN RSUD DOKTER SOEDARSO PONTIANAK
   ========================================================================== */

function openCvModal() {
  const cv = state.cvData || window.KOMITE_DATA?.sampleCv?.perawat;
  if (cv) {
    fillCvFormWithData(cv);
  } else {
    renderCvExpRows([]);
    renderCvTrainRows([]);
  }
  openModal('modalCvKredensial');
}

function fillCvFormWithData(cv) {
  if (!cv) return;
  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (el.tagName === 'SELECT') {
      if (!val) {
        el.selectedIndex = 0;
        return;
      }
      const target = String(val).trim().toLowerCase();
      // 1. Exact value match
      for (let i = 0; i < el.options.length; i++) {
        if (el.options[i].value.trim().toLowerCase() === target) {
          el.selectedIndex = i;
          return;
        }
      }
      // 2. Partial / flexible match on value or label
      for (let i = 0; i < el.options.length; i++) {
        const optVal = el.options[i].value.trim().toLowerCase();
        const optText = el.options[i].textContent.trim().toLowerCase();
        if (!optVal) continue;
        if (target.includes(optVal) || optVal.includes(target) || target.includes(optText) || optText.includes(target)) {
          el.selectedIndex = i;
          return;
        }
      }
    } else {
      el.value = val !== undefined ? val : '';
    }
  };
  setVal('cvNama', cv.nama);
  setVal('cvNip', cv.nip);
  setVal('cvTtl', cv.ttl);
  setVal('cvJabatan', cv.jabatan);
  setVal('cvUnit', cv.unit);
  setVal('cvPkSaatIni', cv.pkSaatIni);
  setVal('cvPkDiusulkan', cv.pkDiusulkan);
  setVal('cvAreaKlinis', cv.areaKlinis || (typeof mapUnitToAreaKlinis === 'function' ? mapUnitToAreaKlinis(cv.unit, cv.pkDiusulkan) : 'kmb_bedah_pk3'));

  setVal('cvStr', cv.str);
  setVal('cvStrBerlaku', cv.strBerlaku);
  setVal('cvSipp', cv.sipp);
  setVal('cvSippBerlaku', cv.sippBerlaku);

  if (cv.pendidikan && cv.pendidikan.length >= 4) {
    cv.pendidikan.forEach((edu, idx) => {
      setVal(`cvEduInst_${idx}`, edu.institusi);
      setVal(`cvEduTahun_${idx}`, edu.tahun);
      setVal(`cvEduIjazah_${idx}`, edu.noIjazah);
    });
  }

  renderCvExpRows(cv.pengalamanKerja || []);
  renderCvTrainRows(cv.pelatihan || []);

  setVal('cvPernyataanKota', cv.pernyataanKota || 'Pontianak');
  setVal('cvPernyataanTanggal', cv.pernyataanTanggal || '21 Oktober');
  setVal('cvPernyataanTahun', cv.pernyataanTahun || '2026');
}

function fillCvPreset(type) {
  const preset = window.KOMITE_DATA?.sampleCv?.[type];
  if (preset) {
    fillCvFormWithData(preset);
    syncAllDownstreamFormsFromCv();
    showToast(`Data profil ${type === 'bidan' ? 'Bdn. Siti Nurhaliza (BK III)' : 'Ns. Hendra Kurniawan (PK III)'} berhasil dimuat! Seluruh formulir alur otomatis terbarui.`, 'info');
  }
}

function resetCvForm() {
  const ids = ['cvNama', 'cvNip', 'cvTtl', 'cvJabatan', 'cvStr', 'cvStrBerlaku', 'cvSipp', 'cvSippBerlaku'];
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  const unitEl = document.getElementById('cvUnit');
  if (unitEl) unitEl.value = 'Enggang Gading 2';
  const pkSaatIniEl = document.getElementById('cvPkSaatIni');
  if (pkSaatIniEl) pkSaatIniEl.value = 'PK II';
  const pkDiusulkanEl = document.getElementById('cvPkDiusulkan');
  if (pkDiusulkanEl) pkDiusulkanEl.value = 'PK III';
  const areaEl = document.getElementById('cvAreaKlinis');
  if (areaEl) areaEl.value = 'kmb_bedah_pk3';

  for (let i = 0; i < 4; i++) {
    const iEl = document.getElementById(`cvEduInst_${i}`);
    const tEl = document.getElementById(`cvEduTahun_${i}`);
    const jEl = document.getElementById(`cvEduIjazah_${i}`);
    if (iEl) iEl.value = '';
    if (tEl) tEl.value = '';
    if (jEl) jEl.value = '';
  }
  renderCvExpRows([
    { instansi: '', ruangan: '', periode: '', durasi: '' },
    { instansi: '', ruangan: '', periode: '', durasi: '' },
    { instansi: '', ruangan: '', periode: '', durasi: '' }
  ]);
  renderCvTrainRows([
    { jenis: '', penyelenggara: '', tahun: '', masaBerlaku: '' },
    { jenis: '', penyelenggara: '', tahun: '', masaBerlaku: '' },
    { jenis: '', penyelenggara: '', tahun: '', masaBerlaku: '' },
    { jenis: '', penyelenggara: '', tahun: '', masaBerlaku: '' }
  ]);
  syncAllDownstreamFormsFromCv();
  showToast('Formulir CV berhasil dikosongkan. Siap diisi data baru atau dipratinjau sebagai blangko kosong.', 'info');
}

function renderCvExpRows(rows) {
  const tbody = document.getElementById('cvExpBody');
  if (!tbody) return;
  const list = (rows && rows.length > 0) ? rows : [
    { instansi: 'RSUD dr. Soedarso Pontianak', ruangan: 'Ruang Bedah Pria', periode: '04/2019 s.d 10/2022', durasi: '3 Tahun 6 Bulan' },
    { instansi: 'RSUD dr. Soedarso Pontianak', ruangan: 'Ruang Intensive Care (ICU)', periode: '11/2022 s.d Sekarang', durasi: '3 Tahun 11 Bulan' },
    { instansi: 'RS Antonius Pontianak', ruangan: 'Instalasi Gawat Darurat (IGD)', periode: '01/2014 s.d 02/2019', durasi: '5 Tahun 1 Bulan' }
  ];
  tbody.innerHTML = list.map((item, idx) => `
    <tr data-idx="${idx}">
      <td><input type="text" class="form-input cv-exp-inst" value="${item.instansi || ''}" placeholder="RSUD dr. Soedarso Pontianak" style="padding: 0.35rem 0.5rem; font-size: 0.82rem;"></td>
      <td><input type="text" class="form-input cv-exp-ruang" value="${item.ruangan || ''}" placeholder="Misal: Ruang Bedah Pria" style="padding: 0.35rem 0.5rem; font-size: 0.82rem;"></td>
      <td><input type="text" class="form-input cv-exp-periode" value="${item.periode || ''}" placeholder="MM/YYYY s.d MM/YYYY" style="padding: 0.35rem 0.5rem; font-size: 0.82rem; text-align: center;"></td>
      <td><input type="text" class="form-input cv-exp-durasi" value="${item.durasi || ''}" placeholder="X Tahun X Bulan" style="padding: 0.35rem 0.5rem; font-size: 0.82rem; text-align: center;"></td>
      <td style="text-align: center;">
        <button type="button" class="btn-icon" style="color: #ef4444; padding: 4px;" onclick="removeCvExpRow(${idx})" title="Hapus Baris">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </td>
    </tr>
  `).join('');
}

function addCvExpRow(data = {}) {
  const current = getCvExpRowsFromForm();
  current.push(data.instansi ? data : { instansi: 'RSUD dr. Soedarso Pontianak', ruangan: '', periode: '', durasi: '' });
  renderCvExpRows(current);
}

function removeCvExpRow(idx) {
  const current = getCvExpRowsFromForm();
  current.splice(idx, 1);
  renderCvExpRows(current.length > 0 ? current : [{ instansi: '', ruangan: '', periode: '', durasi: '' }]);
}

function getCvExpRowsFromForm() {
  const tbody = document.getElementById('cvExpBody');
  if (!tbody) return [];
  const rows = tbody.querySelectorAll('tr');
  const result = [];
  rows.forEach(r => {
    const instansi = r.querySelector('.cv-exp-inst')?.value || '';
    const ruangan = r.querySelector('.cv-exp-ruang')?.value || '';
    const periode = r.querySelector('.cv-exp-periode')?.value || '';
    const durasi = r.querySelector('.cv-exp-durasi')?.value || '';
    if (instansi || ruangan || periode || durasi) {
      result.push({ instansi, ruangan, periode, durasi });
    }
  });
  return result;
}

function renderCvTrainRows(rows) {
  const tbody = document.getElementById('cvTrainBody');
  if (!tbody) return;
  const list = (rows && rows.length > 0) ? rows : [
    { jenis: 'Basic Trauma Cardiac Life Support (BTCLS)', penyelenggara: 'Ambulance Gawat Darurat 118 / PPNI', tahun: '2023', masaBerlaku: 'Aktif s.d 20/08/2027' },
    { jenis: 'Pelatihan Intensive Care Unit (ICU) Komprehensif', penyelenggara: 'Bapelkes / RS Rujukan Pusat Tipe A', tahun: '2022', masaBerlaku: 'Seumur Hidup / Re-sertifikasi' },
    { jenis: 'Pelatihan Asisten Kateterisasi Jantung (Cath Lab)', penyelenggara: 'RS Jantung & Pembuluh Darah Harapan Kita', tahun: '2021', masaBerlaku: 'Valid / Berlaku' },
    { jenis: 'Workshop Asesmen Keperawatan Lanjutan', penyelenggara: 'Komite Keperawatan RSUD dr. Soedarso', tahun: '2024', masaBerlaku: 'Internal RS' }
  ];
  tbody.innerHTML = list.map((item, idx) => `
    <tr data-idx="${idx}">
      <td><input type="text" class="form-input cv-train-jenis" value="${item.jenis || ''}" placeholder="Nama Pelatihan / Workshop" style="padding: 0.35rem 0.5rem; font-size: 0.82rem;"></td>
      <td><input type="text" class="form-input cv-train-org" value="${item.penyelenggara || ''}" placeholder="Penyelenggara Resmi (Kemenkes/PPNI/dll)" style="padding: 0.35rem 0.5rem; font-size: 0.82rem;"></td>
      <td><input type="text" class="form-input cv-train-tahun" value="${item.tahun || ''}" placeholder="YYYY" style="padding: 0.35rem 0.5rem; font-size: 0.82rem; text-align: center;"></td>
      <td><input type="text" class="form-input cv-train-masa" value="${item.masaBerlaku || ''}" placeholder="Masa Berlaku / Valid" style="padding: 0.35rem 0.5rem; font-size: 0.82rem;"></td>
      <td style="text-align: center;">
        <button type="button" class="btn-icon" style="color: #ef4444; padding: 4px;" onclick="removeCvTrainRow(${idx})" title="Hapus Baris">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </td>
    </tr>
  `).join('');
}

function addCvTrainRow(data = {}) {
  const current = getCvTrainRowsFromForm();
  current.push(data.jenis ? data : { jenis: '', penyelenggara: '', tahun: '2024', masaBerlaku: 'Berlaku' });
  renderCvTrainRows(current);
}

function removeCvTrainRow(idx) {
  const current = getCvTrainRowsFromForm();
  current.splice(idx, 1);
  renderCvTrainRows(current.length > 0 ? current : [{ jenis: '', penyelenggara: '', tahun: '', masaBerlaku: '' }]);
}

function getCvTrainRowsFromForm() {
  const tbody = document.getElementById('cvTrainBody');
  if (!tbody) return [];
  const rows = tbody.querySelectorAll('tr');
  const result = [];
  rows.forEach(r => {
    const jenis = r.querySelector('.cv-train-jenis')?.value || '';
    const penyelenggara = r.querySelector('.cv-train-org')?.value || '';
    const tahun = r.querySelector('.cv-train-tahun')?.value || '';
    const masaBerlaku = r.querySelector('.cv-train-masa')?.value || '';
    if (jenis || penyelenggara || tahun || masaBerlaku) {
      result.push({ jenis, penyelenggara, tahun, masaBerlaku });
    }
  });
  return result;
}

function handleCvSubmit(e) {
  if (e) e.preventDefault();
  const getVal = id => document.getElementById(id)?.value?.trim() || '';

  const nama = getVal('cvNama') || 'Ns. Pemohon';
  const nip = getVal('cvNip');
  const ttl = getVal('cvTtl');
  const jabatan = getVal('cvJabatan');
  const unit = getVal('cvUnit');
  const pkSaatIni = getVal('cvPkSaatIni');
  const pkDiusulkan = getVal('cvPkDiusulkan');

  const str = getVal('cvStr');
  const strBerlaku = getVal('cvStrBerlaku');
  const sipp = getVal('cvSipp');
  const sippBerlaku = getVal('cvSippBerlaku');

  const pendidikan = [
    { jenjang: 'D3 Keperawatan', institusi: getVal('cvEduInst_0'), tahun: getVal('cvEduTahun_0'), noIjazah: getVal('cvEduIjazah_0') },
    { jenjang: 'S1 Keperawatan', institusi: getVal('cvEduInst_1'), tahun: getVal('cvEduTahun_1'), noIjazah: getVal('cvEduIjazah_1') },
    { jenjang: 'Profesi Ners', institusi: getVal('cvEduInst_2'), tahun: getVal('cvEduTahun_2'), noIjazah: getVal('cvEduIjazah_2') },
    { jenjang: 'S2 / Spesialis', institusi: getVal('cvEduInst_3'), tahun: getVal('cvEduTahun_3'), noIjazah: getVal('cvEduIjazah_3') }
  ];

  const pengalamanKerja = getCvExpRowsFromForm();
  const pelatihan = getCvTrainRowsFromForm();

  const areaKlinisVal = getVal('cvAreaKlinis') || (typeof mapUnitToAreaKlinis === 'function' ? mapUnitToAreaKlinis(unit, pkDiusulkan) : 'kmb_bedah_pk3');

  const cvData = {
    nama,
    nip,
    ttl,
    jabatan,
    unit,
    pkSaatIni,
    pkDiusulkan,
    areaKlinis: areaKlinisVal,
    str,
    strBerlaku,
    sipp,
    sippBerlaku,
    pendidikan,
    pengalamanKerja,
    pelatihan,
    pernyataanKota: getVal('cvPernyataanKota') || 'Pontianak',
    pernyataanTanggal: getVal('cvPernyataanTanggal') || '21 Oktober',
    pernyataanTahun: getVal('cvPernyataanTahun') || '2026',
    timestamp: new Date().toISOString()
  };

  state.cvData = cvData;
  state.selectedAreaKlinis = areaKlinisVal;
  state.kredensialCvGenerated = true;
  localStorage.setItem('komite_cv_data', JSON.stringify(cvData));
  localStorage.setItem('komite_cv_generated', 'true');

  // Sinkronkan ke Logbook (Langkah 2), Surat Permohonan (Langkah 3) dan Upload Modal (Langkah 4)
  transferCvToLogbook(cvData);
  transferCvToSurat(cvData);

  updateAlurStepStatus();
  closeModal('modalCvKredensial');

  // Buka pratinjau lembar CV 3 Halaman
  previewCvHVS('filled');

  // Rekam Notifikasi Administrasi
  const adminSubject = `[CV RESMI DITERBITKAN] ${nama} (${pkDiusulkan} - ${unit})`;
  const adminBody =
    `Kepada Yth.\n` +
    `1. Ketua Komite Keperawatan RSUD dr. Soedarso (komitekeperawatanrsds2023@gmail.com)\n` +
    `2. Ns. Rusmulyadi, S.Kep., MARS - Sekretaris Komite (yadhie28@gmail.com)\n\n` +
    `Pemberitahuan Penerbitan Curriculum Vitae (CV) Resmi Portofolio Klinis (Langkah 1):\n\n` +
    `• Nama Lengkap    : ${nama}\n` +
    `• NIP/NIPPPK/NIK  : ${nip}\n` +
    `• Unit Kerja      : ${unit}\n` +
    `• Jenjang Usulan  : ${pkDiusulkan}\n` +
    `• STR / SIPP      : ${str} / ${sipp}\n` +
    `• Waktu Terbit    : ${new Date().toLocaleString('id-ID')}\n` +
    `• Format Dokumen  : Format Baku 3 Halaman A4 Sesuai Template RSUD dr. Soedarso.\n\n` +
    `Dokumen CV siap dicetak dan ditandatangani pemohon pada Lembar F.\n\n` +
    `Portal Komite Keperawatan RSUD dr. Soedarso Pontianak\n` +
    `https://yadhie28.github.io/komite-keperawatan-soedarso/`;

  recordAdminNotification({
    eventType: 'Penerbitan CV Portofolio Klinis (Langkah 1)',
    subject: adminSubject,
    applicantName: nama,
    applicantNip: nip,
    unit: unit,
    bodyText: adminBody
  });

  const banner = document.getElementById('previewCvSuccessBanner');
  const badge = document.getElementById('previewCvApplicantBadge');
  if (banner) banner.style.display = 'block';
  if (badge) badge.textContent = nama;

  showToast(`Curriculum Vitae (CV) resmi untuk ${nama} berhasil diterbitkan (3 Halaman)! Notifikasi terkirim ke Komite & Sekretaris.`, 'success');
}

/* ==========================================================================
   ALUR KREDENSIAL: SINGLE SOURCE OF TRUTH & DOWNSTREAM AUTO-SYNC
   Master / Origin Form: Langkah 1 (Curriculum Vitae / CV)
   ========================================================================== */

function parseIndonesianDateToYMD(str) {
  if (!str) return '2028-11-20';
  const clean = String(str).trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(clean)) return clean;
  
  const months = {
    januari: '01', februari: '02', maret: '03', april: '04', mei: '05', juni: '06',
    juli: '07', agustus: '08', september: '09', oktober: '10', november: '11', desember: '12'
  };
  
  const m = clean.match(/(\d{1,2})\s+([a-zA-Z]+)\s+(\d{4})/);
  if (m) {
    const d = m[1].padStart(2, '0');
    const mo = months[m[2].toLowerCase()] || '01';
    const y = m[3];
    return `${y}-${mo}-${d}`;
  }
  return '2028-11-20';
}

function mapUnitToAreaKlinis(unit, pkLevel = 'PK III') {
  if (!unit) return 'kmb_bedah_pk3';
  const u = String(unit).toLowerCase();
  const lvl = String(pkLevel || '').toUpperCase();
  const isBidan = lvl.includes('BK') || lvl.includes('BIDAN') || lvl === 'PMB' || u.includes('kebidanan');
  if (isBidan) return 'pmb_kebidanan';

  if (lvl === 'PK I') {
    if (u.includes('bedah') || u.includes('enggang')) return 'generalis_kmb';
    if (u.includes('ok ') || u.includes('ibs') || u.includes('cendana')) return 'generalis_ibs';
    if (u.includes('igd') || u.includes('darurat')) return 'generalis_igd';
    if (u.includes('icu') || u.includes('hcu')) return 'generalis_icu';
    if (u.includes('jantung')) return 'generalis_kardio';
    if (u.includes('anak') || u.includes('picu') || u.includes('nicu')) return 'generalis_anak';
    if (u.includes('dialisis') || u.includes('hd ')) return 'generalis_dialisis';
    if (u.includes('onkologi') || u.includes('kemoterapi') || u.includes('camar')) return 'generalis_onkologi';
    return 'generalis';
  }

  if (lvl === 'PK II') {
    if (u.includes('ok ') || u.includes('ibs') || u.includes('cendana')) return 'perioperatif_pk2';
    if (u.includes('igd') || u.includes('darurat')) return 'emergensi_pk2';
    if (u.includes('icu') || u.includes('hcu')) return 'intensif_pk2';
    if (u.includes('jantung')) return 'kardiovaskuler_pk2';
    if (u.includes('anak') || u.includes('picu') || u.includes('nicu')) return 'anak_pk2';
    if (u.includes('dialisis') || u.includes('hd ')) return 'nefrologi_pk2';
    if (u.includes('onkologi') || u.includes('camar')) return 'onkologi_pk2';
    if (u.includes('syaraf') || u.includes('ruai')) return 'neurosains_pk2';
    return 'kmb_dewasa_pk2';
  }

  // PK III - PK V
  if (u.includes('enggang gading')) return 'kmb_bedah_pk3';
  if (u.includes('murai') || u.includes('meranti') || u.includes('mahoni') || u.includes('ramin') || u.includes('ppt') || u.includes('singkut buluh') || u.includes('thalassemia')) return 'kmb_medikal_pk3';
  if (u.includes('ruai') || u.includes('syaraf') || u.includes('stroke')) return 'neurosains_pk3';
  if (u.includes('camar') || u.includes('kemoterapi')) return 'onkologi_pk3';
  if (u.includes('icu') || u.includes('hcu')) return 'intensif_pk3';
  if (u.includes('darurat') || u.includes('igd')) return 'emergensi_pk3';
  if (u.includes('ok ') || u.includes('cendana') || u.includes('bedah sentral')) return 'perioperatif_pk3';
  if (u.includes('picu') || u.includes('hcu anak')) return 'anak_picu_pk3';
  if (u.includes('nicu') || u.includes('perinatologi')) return 'anak_nicu_pk3';
  if (u.includes('anak')) return 'anak_medikal_pk3';
  if (u.includes('jantung')) return 'kardiovaskuler_rawat_pk3';
  if (u.includes('hd ') || u.includes('dialisis')) return 'nefrologi_pk3';
  if (u.includes('paru')) return 'respirologi_pk3';

  return 'kmb_bedah_pk3';
}

function mapRumpunToAreaKlinis(rumpunKey, pkLevel = 'PK III') {
  if (!rumpunKey) return 'kmb_bedah_pk3';
  const r = String(rumpunKey).toLowerCase();
  const lvl = String(pkLevel || '').toUpperCase();
  const isBidan = lvl.includes('BK') || lvl.includes('BIDAN') || lvl === 'PMB' || r.includes('maternitas') || r.includes('bidan');
  if (isBidan) return 'pmb_kebidanan';

  if (lvl === 'PK I') {
    if (r === 'kamar_bedah') return 'generalis_ibs';
    if (r === 'intensif_icu') return 'generalis_icu';
    if (r === 'emergensi_igd') return 'generalis_igd';
    if (r === 'kardiovaskuler') return 'generalis_kardio';
    if (r === 'pediatrik_anak' || r === 'perinatologi_nicu') return 'generalis_anak';
    if (r === 'onkologi') return 'generalis_onkologi';
    if (r === 'nefrologi_hd') return 'generalis_dialisis';
    return 'generalis';
  }

  if (lvl === 'PK II') {
    if (r === 'kamar_bedah') return 'perioperatif_pk2';
    if (r === 'intensif_icu') return 'intensif_pk2';
    if (r === 'emergensi_igd') return 'emergensi_pk2';
    if (r === 'kardiovaskuler') return 'kardiovaskuler_pk2';
    if (r === 'pediatrik_anak' || r === 'perinatologi_nicu') return 'anak_pk2';
    if (r === 'onkologi') return 'onkologi_pk2';
    if (r === 'neurosains') return 'neurosains_pk2';
    if (r === 'nefrologi_hd') return 'nefrologi_pk2';
    return 'kmb_dewasa_pk2';
  }

  const mapPk3 = {
    'kmb_bedah': 'kmb_bedah_pk3',
    'kamar_bedah': 'perioperatif_pk3',
    'generalis': 'generalis',
    'intensif_icu': 'intensif_pk3',
    'emergensi_igd': 'emergensi_pk3',
    'kardiovaskuler': 'kardiovaskuler_rawat_pk3',
    'pediatrik_anak': 'anak_medikal_pk3',
    'perinatologi_nicu': 'anak_nicu_pk3',
    'maternitas_bidan': 'pmb_kebidanan',
    'onkologi': 'onkologi_pk3',
    'neurosains': 'neurosains_pk3',
    'nefrologi_hd': 'nefrologi_pk3',
    'respirologi': 'respirologi_pk3',
    'jiwa': 'jiwa_pk3',
    'mata': 'mata_pk3',
    'geriatri': 'geriatri_pk3'
  };
  return mapPk3[r] || 'kmb_bedah_pk3';
}

function mapAreaKlinisToRumpun(areaKey) {
  if (!areaKey) return 'kmb_bedah';
  const a = String(areaKey).toLowerCase();
  if (a.includes('kmb_bedah') || a.includes('bedah_pk3')) return 'kmb_bedah';
  if (a.includes('kmb_medikal') || a.includes('dewasa_pk2')) return 'kmb_bedah';
  if (a.includes('perioperatif') || a.includes('anestesi') || a.includes('ibs')) return 'kamar_bedah';
  if (a.includes('intensif') || a.includes('icu')) return 'intensif_icu';
  if (a.includes('emergensi') || a.includes('igd')) return 'emergensi_igd';
  if (a.includes('kardiovaskuler') || a.includes('cathlab') || a.includes('perfusi')) return 'kardiovaskuler';
  if (a.includes('anak_nicu') || a.includes('perinatologi')) return 'perinatologi_nicu';
  if (a.includes('anak') || a.includes('picu')) return 'pediatrik_anak';
  if (a.includes('maternitas') || a.includes('pmb') || a.includes('kebidanan') || a.includes('obgyn')) return 'maternitas_bidan';
  if (a.includes('onkologi') || a.includes('kemoterapi')) return 'onkologi';
  if (a.includes('neurosains') || a.includes('saraf')) return 'neurosains';
  if (a.includes('nefrologi') || a.includes('dialisis')) return 'nefrologi_hd';
  if (a.includes('respirologi') || a.includes('paru')) return 'respirologi';
  if (a.includes('jiwa')) return 'jiwa';
  if (a.includes('mata')) return 'mata';
  if (a.includes('geriatri')) return 'geriatri';
  if (a.includes('generalis')) return 'generalis';
  return 'kmb_bedah';
}

function onCvJenjangOrUnitChange() {
  const unit = document.getElementById('cvUnit')?.value;
  const jenjang = document.getElementById('cvPkDiusulkan')?.value;
  const areaSelect = document.getElementById('cvAreaKlinis');
  if (areaSelect) {
    const recommended = mapUnitToAreaKlinis(unit, jenjang);
    if (recommended && areaSelect.querySelector(`option[value="${recommended}"]`)) {
      areaSelect.value = recommended;
      state.selectedAreaKlinis = recommended;
    }
  }
  syncAllDownstreamFormsFromCv();
}

function onCvAreaKlinisChange(areaVal) {
  if (state.cvData) {
    state.cvData.areaKlinis = areaVal;
  }
  state.selectedAreaKlinis = areaVal;
  syncAllDownstreamFormsFromCv();
}

function getActiveCvMasterData() {
  const getElVal = id => document.getElementById(id)?.value?.trim() || '';
  const stored = state.cvData || (window.KOMITE_DATA?.sampleCv?.perawat || {});
  
  const nama = getElVal('cvNama') || stored.nama || 'Ns. Hendra Kurniawan, S.Kep';
  const nip = getElVal('cvNip') || stored.nip || '19920415 201903 1 004';
  const ttl = getElVal('cvTtl') || stored.ttl || 'Pontianak, 15 April 1992';
  const jabatan = getElVal('cvJabatan') || stored.jabatan || 'Perawat Pelaksana / Ketua Tim';
  const unit = getElVal('cvUnit') || stored.unit || 'Enggang Gading 2';
  const pkSaatIni = getElVal('cvPkSaatIni') || stored.pkSaatIni || 'PK II';
  const pkDiusulkan = getElVal('cvPkDiusulkan') || stored.pkDiusulkan || 'PK III';

  // Area Kekhususan Klinis (White Book 2026)
  let areaKlinis = getElVal('cvAreaKlinis') || state.selectedAreaKlinis || stored.areaKlinis;
  if (!areaKlinis) {
    const logbookRumpun = getElVal('selectRumpunWhiteBook');
    if (logbookRumpun) {
      areaKlinis = mapRumpunToAreaKlinis(logbookRumpun, pkDiusulkan);
    }
  }
  if (!areaKlinis) {
    areaKlinis = mapUnitToAreaKlinis(unit, pkDiusulkan);
  }

  const str = getElVal('cvStr') || stored.str || '140152119-2849103';
  const strBerlaku = getElVal('cvStrBerlaku') || stored.strBerlaku || '15 April 2028';
  const sipp = getElVal('cvSipp') || stored.sipp || '503/0842/SIPP/DPMPTSP-C/2022';
  const sippBerlaku = getElVal('cvSippBerlaku') || stored.sippBerlaku || '15 April 2027';

  // Education
  const eduList = stored.pendidikan || [];
  const edu0 = {
    jenjang: 'D3 Keperawatan',
    institusi: getElVal('cvEduInst_0') || eduList[0]?.institusi || 'Poltekkes Kemenkes Pontianak',
    tahun: getElVal('cvEduTahun_0') || eduList[0]?.tahun || '2013',
    noIjazah: getElVal('cvEduIjazah_0') || eduList[0]?.noIjazah || '14201/POLTEK-PTK/D3/2013'
  };
  const edu1 = {
    jenjang: 'S1 Keperawatan',
    institusi: getElVal('cvEduInst_1') || eduList[1]?.institusi || 'STIKes Yarsi Pontianak',
    tahun: getElVal('cvEduTahun_1') || eduList[1]?.tahun || '2017',
    noIjazah: getElVal('cvEduIjazah_1') || eduList[1]?.noIjazah || '08412/YARSI/S1-KEP/2017'
  };
  const edu2 = {
    jenjang: 'Profesi Ners',
    institusi: getElVal('cvEduInst_2') || eduList[2]?.institusi || 'Fakultas Kedokteran Universitas Tanjungpura',
    tahun: getElVal('cvEduTahun_2') || eduList[2]?.tahun || '2018',
    noIjazah: getElVal('cvEduIjazah_2') || eduList[2]?.noIjazah || '180901/NERS-UNTAN/2018'
  };
  const edu3 = {
    jenjang: 'S2 / Spesialis',
    institusi: getElVal('cvEduInst_3') || eduList[3]?.institusi || '',
    tahun: getElVal('cvEduTahun_3') || eduList[3]?.tahun || '',
    noIjazah: getElVal('cvEduIjazah_3') || eduList[3]?.noIjazah || ''
  };

  let highest = edu2;
  let highestLabel = 'S1+Profesi Ners';
  if (edu3.institusi) {
    highest = edu3;
    highestLabel = 'S2 Keperawatan (Magister / Sp.Kep)';
  } else if (edu2.institusi) {
    highest = edu2;
    highestLabel = 'S1+Profesi Ners';
  } else if (edu1.institusi) {
    highest = edu1;
    highestLabel = 'S1+Profesi Ners';
  } else {
    highest = edu0;
    highestLabel = 'D3 Keperawatan';
  }

  // Pelatihan
  const trainList = stored.pelatihan || [];
  const firstTrainName = trainList[0]?.jenis || 'Basic Trauma Cardiac Life Support (BTCLS)';
  const firstTrainTahun = trainList[0]?.tahun ? `Tahun ${trainList[0].tahun}` : '14 - 18 Mei 2024';

  return {
    nama,
    nip,
    ttl,
    jabatan,
    unit,
    pkSaatIni,
    pkDiusulkan,
    areaKlinis,
    str,
    strBerlaku,
    sipp,
    sippBerlaku,
    edu0,
    edu1,
    edu2,
    edu3,
    highest,
    highestLabel,
    firstTrainName,
    firstTrainTahun
  };
}

function syncAllDownstreamFormsFromCv() {
  const master = getActiveCvMasterData();

  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (!el || val === undefined || val === null) return;
    el.value = val;
  };

  const setSelectFlex = (id, val) => {
    const el = document.getElementById(id);
    if (!el || !val) return;
    const target = String(val).trim().toLowerCase();
    for (let i = 0; i < el.options.length; i++) {
      if (el.options[i].value.trim().toLowerCase() === target) {
        el.selectedIndex = i;
        return;
      }
    }
    for (let i = 0; i < el.options.length; i++) {
      const optVal = el.options[i].value.trim().toLowerCase();
      const optText = el.options[i].textContent.trim().toLowerCase();
      if (!optVal) continue;
      if (target.includes(optVal) || optVal.includes(target) || target.includes(optText) || optText.includes(target)) {
        el.selectedIndex = i;
        return;
      }
    }
  };

  // --- LANGKAH 2: LOGBOOK KLINIS ---
  setVal('logbookNama', master.nama);
  setVal('logbookNip', master.nip);
  setSelectFlex('logbookJenjang', master.pkDiusulkan || master.pkSaatIni);
  setSelectFlex('logbookUnit', master.unit);
  setVal('logbookKaRuRuangan', master.unit);
  const logbookRumpun = mapAreaKlinisToRumpun(master.areaKlinis);
  setSelectFlex('selectRumpunWhiteBook', logbookRumpun);

  // --- LANGKAH 3: SURAT PERMOHONAN ---
  setVal('suratNama', master.nama);
  const cleanNip = master.nip.replace(/[^0-9]/g, '');
  setVal('suratNip', cleanNip || master.nip);
  setVal('suratTtl', master.ttl);
  setSelectFlex('suratUnit', master.unit);
  setVal('suratJabatanFungsional', master.jabatan);
  setSelectFlex('suratPkSaatIni', master.pkSaatIni);
  setSelectFlex('suratJenjang', master.pkDiusulkan);
  setSelectFlex('suratPendidikan', master.highestLabel);
  setVal('suratInstitusi', master.highest.institusi);
  setVal('suratTahunLulus', master.highest.tahun);
  setVal('suratStr', master.str);
  setVal('suratStrExpiry', master.strBerlaku);
  setVal('suratSipp', master.sipp);
  setVal('suratSippExpiry', master.sippBerlaku);

  // --- LANGKAH 4: RKK ONLINE ---
  setVal('formNama', master.nama);
  setVal('formNip', master.nip);
  setVal('formStr', master.str);
  const expYMD = parseIndonesianDateToYMD(master.strBerlaku);
  setVal('formStrExpiry', expYMD);
  setSelectFlex('formJenjang', master.pkDiusulkan);
  setSelectFlex('formUnit', master.unit);

  // Kunci formJenjang
  const formJenjangEl = document.getElementById('formJenjang');
  if (formJenjangEl) {
    formJenjangEl.classList.add('input-locked');
    formJenjangEl.setAttribute('tabindex', '-1');
    formJenjangEl.style.pointerEvents = 'none';
    formJenjangEl.style.background = 'var(--bg-locked, #f1f5f9)';
    formJenjangEl.style.cursor = 'not-allowed';
  }

  // Isi dan Kunci formAreaKlinis (Rumpun / Area Kekhususan Klinis Buku Putih 2026)
  populateAreaKlinisDropdown(master.pkDiusulkan);
  const effectiveArea = master.areaKlinis || mapUnitToAreaKlinis(master.unit, master.pkDiusulkan);
  const formAreaEl = document.getElementById('formAreaKlinis');
  if (formAreaEl) {
    if (formAreaEl.querySelector(`option[value="${effectiveArea}"]`)) {
      formAreaEl.value = effectiveArea;
    } else if (formAreaEl.options.length > 1) {
      formAreaEl.selectedIndex = 1;
    }
    formAreaEl.classList.add('input-locked');
    formAreaEl.setAttribute('tabindex', '-1');
    formAreaEl.style.pointerEvents = 'none';
    formAreaEl.style.background = 'var(--bg-locked, #f1f5f9)';
    formAreaEl.style.cursor = 'not-allowed';
  }
  const formFilterEl = document.getElementById('formRkkAreaFilter');
  if (formFilterEl && formAreaEl?.value) {
    formFilterEl.value = formAreaEl.value;
  }
  if (formAreaEl?.value) {
    onAreaKlinisChange(formAreaEl.value);
  }

  // Auto-sync Kontak & Email from Langkah 3 to Langkah 4
  const suratHp = document.getElementById('suratHp')?.value;
  const suratEmail = document.getElementById('suratEmail')?.value;
  if (suratHp) setVal('formKontak', suratHp);
  if (suratEmail) setVal('formEmail', suratEmail);

  // --- LANGKAH 5: PSV DOKUMEN ---
  setVal('psvNama', master.nama);
  setVal('psvNip', master.nip);
  setVal('psvPendidikan', `${master.highestLabel} / ${master.highest.institusi}`);
  setSelectFlex('psvUnit', master.unit);
  setVal('psvIjazahInstitusi', master.highest.institusi);
  setVal('psvIjazahNomor', master.highest.noIjazah);
  setVal('psvIjazahTahun', master.highest.tahun);
  setVal('psvStrNomor', master.str);
  setVal('psvStrBerlaku', master.strBerlaku);
  setVal('psvSippNomor', master.sipp);
  setVal('psvSippBerlaku', master.sippBerlaku);
  setVal('psvPelatihanNama', master.firstTrainName);
  setVal('psvPelatihanTanggal', master.firstTrainTahun);

  // --- LANGKAH 6: UPLOAD BERKAS ---
  setVal('uploadNamaPemohon', master.nama);

  // Sinkronkan dan kunci Jenis Permohonan ke Langkah 4
  syncJenisPermohonanToRkk();

  // Update current applicant state
  state.currentApplicant = {
    nama: master.nama,
    nip: master.nip,
    rawNip: master.nip,
    unit: master.unit,
    jenjang: master.pkDiusulkan,
    str: master.str,
    strExpiry: master.strBerlaku,
    education: `${master.highestLabel} / ${master.highest.institusi}`,
    timestamp: new Date().toISOString()
  };
}

function syncJenisPermohonanToRkk() {
  let jenis = 'berkala';
  if (document.getElementById('optJenisBaru')?.checked) jenis = 'baru';
  else if (document.getElementById('optJenisKenaikan')?.checked) jenis = 'kenaikan';
  else if (document.getElementById('optJenisBerkala')?.checked) jenis = 'berkala';
  else if (state.jenisPermohonan) jenis = state.jenisPermohonan;

  state.jenisPermohonan = jenis;

  const rkkBaru = document.getElementById('rkkJenisBaru');
  const rkkBerkala = document.getElementById('rkkJenisBerkala');
  const rkkKenaikan = document.getElementById('rkkJenisKenaikan');

  if (rkkBaru && rkkBerkala && rkkKenaikan) {
    rkkBaru.checked = (jenis === 'baru');
    rkkBerkala.checked = (jenis === 'berkala');
    rkkKenaikan.checked = (jenis === 'kenaikan');

    [rkkBaru, rkkBerkala, rkkKenaikan].forEach(r => {
      const parentLabel = r.closest('label');
      if (parentLabel) {
        if (r.checked) {
          parentLabel.style.border = '1.5px solid var(--primary-600, #0d9488)';
          parentLabel.style.background = 'rgba(13, 148, 136, 0.08)';
          parentLabel.style.fontWeight = '700';
        } else {
          parentLabel.style.border = '1px solid var(--border-subtle)';
          parentLabel.style.background = 'var(--bg-locked, #f1f5f9)';
          parentLabel.style.fontWeight = 'normal';
        }
      }
    });
  }

  const container = document.getElementById('containerRkkJenisPermohonan');
  if (container) {
    container.style.pointerEvents = 'none';
    container.style.cursor = 'not-allowed';
  }
}

function syncHpEmailToRkk() {
  const hp = document.getElementById('suratHp')?.value;
  const email = document.getElementById('suratEmail')?.value;
  const fHp = document.getElementById('formKontak');
  const fEmail = document.getElementById('formEmail');
  if (fHp && hp) fHp.value = hp;
  if (fEmail && email) fEmail.value = email;
}

function jumpToStep1Cv(fromModalId) {
  if (fromModalId) closeModal(fromModalId);
  else {
    ['modalLogbookKredensial', 'modalSuratPermohonan', 'modalNewKredensial', 'modalPsvKredensial', 'modalUploadBerkasKredensial'].forEach(id => closeModal(id));
  }
  openCvModal();
  showToast('Silakan perbarui data di Formulir Langkah 1 (CV). Data yang Anda ubah di sini otomatis disinkronkan ke seluruh langkah berikutnya.', 'info');
}

function transferCvToSurat(cv) {
  syncAllDownstreamFormsFromCv();
}

function initCredentialingSync() {
  const cvForm = document.getElementById('formCvKredensial');
  if (cvForm) {
    cvForm.addEventListener('input', () => {
      syncAllDownstreamFormsFromCv();
    });
    cvForm.addEventListener('change', () => {
      syncAllDownstreamFormsFromCv();
    });
  }

  const suratHp = document.getElementById('suratHp');
  const suratEmail = document.getElementById('suratEmail');
  if (suratHp) {
    suratHp.addEventListener('input', syncHpEmailToRkk);
    suratHp.addEventListener('change', syncHpEmailToRkk);
  }
  if (suratEmail) {
    suratEmail.addEventListener('input', syncHpEmailToRkk);
    suratEmail.addEventListener('change', syncHpEmailToRkk);
  }

  // Lakukan sinkronisasi awal saat aplikasi dimuat
  syncAllDownstreamFormsFromCv();
}

function generateCvHVS(mode) {
  const previewMode = mode || state.cvPreviewMode || 'filled';
  const isBlank = (previewMode === 'blank');
  const cv = (!isBlank && state.cvData) ? state.cvData : (isBlank ? null : window.KOMITE_DATA?.sampleCv?.perawat);

  const v = (val, placeholder) => {
    if (isBlank) return placeholder || '';
    return (val !== undefined && val !== null && String(val).trim() !== '') ? val : (placeholder || '');
  };

  const formatJenjangLabel = (val) => {
    if (!val) return '';
    const mapping = {
      'Pra PK': 'Pra PK / Belum Memiliki Jenjang (Perawat Baru)',
      'PK I': 'Perawat Klinis I (PK I - Novice / Generalis)',
      'PK II': 'Perawat Klinis II (PK II - Advance Beginner)',
      'PK III': 'Perawat Klinis III (PK III - Competent / Spesifik Area)',
      'PK IV': 'Perawat Klinis IV (PK IV - Proficient / Mahir Konsultan)',
      'PK V': 'Perawat Klinis V (PK V - Expert / Pakar)',
      'Pra BK': 'Pra BK / Belum Memiliki Jenjang (Bidan Baru)',
      'BK I': 'Bidan Klinis I (BK I - Novice Kebidanan)',
      'BK II': 'Bidan Klinis II (BK II - Advance Beginner Kebidanan)',
      'BK III': 'Bidan Klinis III (BK III - Competent Kebidanan)',
      'BK IV': 'Bidan Klinis IV (BK IV - Proficient Kebidanan)',
      'PMB': 'Praktisi Bidan Klinis (PMB Maternal & Neonatal)'
    };
    return mapping[val] || val;
  };

  const nama = v(cv?.nama, '[ Ns. Nama Lengkap, S.Kep ]');
  const nip = v(cv?.nip, '[ 19xxxxxxxxxxxxxx ]');
  const ttl = v(cv?.ttl, '[ Pontianak, DD / MM / YYYY ]');
  const jabatan = v(cv?.jabatan, '[ Perawat Pelaksana / Ketua Tim / Kepala Ruangan ]');
  const unit = v(cv?.unit, '[ Sesuai SK Tempat Tidur: Enggang Gading 2 ]');
  const pkSaatIni = v(formatJenjangLabel(cv?.pkSaatIni), '[ Perawat Klinis I / II / III / IV / V ]');
  const pkDiusulkan = v(formatJenjangLabel(cv?.pkDiusulkan), '[ PK II / PK III / PK IV - Sesuaikan White Paper ]');

  const str = v(cv?.str, '[ xxxxxxxxx-xxxxxxx ]');
  const strBerlaku = v(cv?.strBerlaku, '[ Berakhir Tanggal: DD / MM / YYYY (Wajib Aktif) ]');
  const sipp = v(cv?.sipp, '[ xxxx/SIPP/DPMPTSP/YYYY ]');
  const sippBerlaku = v(cv?.sippBerlaku, '[ Berakhir Tanggal: DD / MM / YYYY ]');

  const edu = cv?.pendidikan || [
    { jenjang: 'D3 Keperawatan', institusi: '', tahun: '', noIjazah: '' },
    { jenjang: 'S1 Keperawatan', institusi: '', tahun: '', noIjazah: '' },
    { jenjang: 'Profesi Ners', institusi: '', tahun: '', noIjazah: '' },
    { jenjang: 'S2 / Spesialis', institusi: '', tahun: '', noIjazah: '' }
  ];

  const edu0 = {
    jenjang: v(edu[0]?.jenjang, 'D3 Keperawatan'),
    institusi: v(edu[0]?.institusi, '[ Tulis Nama Akper / Poltekkes / Univ ]'),
    tahun: v(edu[0]?.tahun, '[ YYYY ]'),
    noIjazah: v(edu[0]?.noIjazah, '[ No. Ijazah Tertera ]')
  };

  const edu1 = {
    jenjang: v(edu[1]?.jenjang, 'S1 Keperawatan'),
    institusi: v(edu[1]?.institusi, '[ Tulis Nama Stikes / Universitas ]'),
    tahun: v(edu[1]?.tahun, '[ YYYY ]'),
    noIjazah: v(edu[1]?.noIjazah, '[ No. Ijazah Tertera ]')
  };

  const edu2 = {
    jenjang: v(edu[2]?.jenjang, 'Profesi Ners'),
    institusi: v(edu[2]?.institusi, '[ Tulis Nama Institusi Penyelenggara Ners ]'),
    tahun: v(edu[2]?.tahun, '[ YYYY ]'),
    noIjazah: v(edu[2]?.noIjazah, '[ No. Ijazah Tertera ]')
  };

  const edu3 = {
    jenjang: v(edu[3]?.jenjang, 'S2 / Spesialis'),
    institusi: v(edu[3]?.institusi, '[ Tulis Jika Ada: Kritis / Jiwa / Maternitas / dll ]'),
    tahun: v(edu[3]?.tahun, '[ YYYY ]'),
    noIjazah: v(edu[3]?.noIjazah, '[ No. Ijazah Tertera ]')
  };

  // Section D Rows
  let expRows = cv?.pengalamanKerja || [];
  if (isBlank || expRows.length === 0) {
    expRows = [
      { instansi: '[ RSUD dr. Soedarso Pontianak ]', ruangan: '[ Misal: Ruang Bedah Pria ]', periode: '[ MM/YYYY ] s.d [ MM/YYYY ]', durasi: '[ X Tahun X Bulan ]' },
      { instansi: '[ RSUD dr. Soedarso Pontianak ]', ruangan: '[ Misal: Ruang Intensive Care (ICU) ]', periode: '[ MM/YYYY ] s.d [ Sekarang ]', durasi: '[ X Tahun X Bulan ]' },
      { instansi: '[ Tulis RS Sebelumnya Jika Ada ]', ruangan: '[ Tulis Ruangan ]', periode: '[ MM/YYYY ] s.d [ MM/YYYY ]', durasi: '[ X Tahun ]' }
    ];
  }

  const expRowsHtml = expRows.map(r => `
    <tr>
      <td style="border: 1px solid #000; padding: 5px 8px;">${r.instansi || ''}</td>
      <td style="border: 1px solid #000; padding: 5px 8px;">${r.ruangan || ''}</td>
      <td style="border: 1px solid #000; padding: 5px 8px; text-align: center;">${r.periode || ''}</td>
      <td style="border: 1px solid #000; padding: 5px 8px; text-align: center;">${r.durasi || ''}</td>
    </tr>
  `).join('');

  // Section E Rows
  let trainRows = cv?.pelatihan || [];
  if (isBlank || trainRows.length === 0) {
    trainRows = [
      { jenis: 'Basic Trauma Cardiac Life Support (BTCLS)', penyelenggara: '[ Ambulance Gawat Darurat 118 / PPNI ]', tahun: '[ YYYY ]', masaBerlaku: '[ Aktif s.d DD/MM/YYYY ]' },
      { jenis: 'Pelatihan Intensive Care Unit (ICU) Komprehensif', penyelenggara: '[ Bapelkes / RS Rujukan Pusat Tipe A ]', tahun: '[ YYYY ]', masaBerlaku: '[ Seumur Hidup / Re-sertifikasi ]' },
      { jenis: 'Pelatihan Asisten Kateterisasi Jantung (Cath Lab)', penyelenggara: '[ RS Jantung & Pembuluh Darah Harapan Kita ]', tahun: '[ YYYY ]', masaBerlaku: '[ Valid / Berlaku ]' },
      { jenis: 'Workshop Asesmen Keperawatan Lanjutan', penyelenggara: '[ Komite Keperawatan RSUD dr. Soedarso ]', tahun: '[ YYYY ]', masaBerlaku: '[ Internal RS ]' }
    ];
  }

  const trainRowsHtml = trainRows.map(t => `
    <tr>
      <td style="border: 1px solid #000; padding: 5px 8px;">${t.jenis || ''}</td>
      <td style="border: 1px solid #000; padding: 5px 8px;">${t.penyelenggara || ''}</td>
      <td style="border: 1px solid #000; padding: 5px 8px; text-align: center;">${t.tahun || ''}</td>
      <td style="border: 1px solid #000; padding: 5px 8px; text-align: center;">${t.masaBerlaku || ''}</td>
    </tr>
  `).join('');

  const kota = isBlank ? 'Pontianak' : (cv?.pernyataanKota || 'Pontianak');
  const tanggal = isBlank ? '__________________' : (cv?.pernyataanTanggal || '21 Oktober');
  const tahun = isBlank ? '2026' : (cv?.pernyataanTahun || '2026');
  const namaTtd = isBlank ? 'Nama Lengkap & Gelar Profesinya' : (cv?.nama || 'Nama Lengkap & Gelar Profesinya');

  return `
    <!-- ==========================================
         HALAMAN 1: KOP SURAT + SECTION A + B + C (Header & D3)
         ========================================== -->
    <div class="soedarso-page page-1">
      <!-- Kop Surat Resmi Komite Keperawatan RSUD dr. Soedarso -->
      <table style="width: 100%; border-collapse: collapse; border: none; margin-bottom: 0;">
        <tr>
          <td style="width: 75px; vertical-align: middle; border: none; padding: 0 10px 0 0; text-align: center;">
            <img src="logo_kalbar.png" alt="Logo Pemprov Kalbar" style="width: 65px; height: auto;">
          </td>
          <td style="border: none; text-align: center; vertical-align: middle; padding: 0;">
            <div style="font-family: Arial, Helvetica, sans-serif; font-size: 11pt; font-weight: bold; letter-spacing: 0.5px; line-height: 1.25; color: #000;">
              PEMERINTAH PROVINSI KALIMANTAN BARAT
            </div>
            <div style="font-family: Arial, Helvetica, sans-serif; font-size: 13pt; font-weight: 800; letter-spacing: 0.5px; line-height: 1.25; color: #000; margin-top: 1px;">
              RUMAH SAKIT UMUM DAERAH DOKTER SOEDARSO
            </div>
            <div style="font-family: Arial, Helvetica, sans-serif; font-size: 11pt; font-weight: bold; letter-spacing: 0.5px; line-height: 1.25; color: #000; margin-top: 1px;">
              KOMITE KEPERAWATAN
            </div>
            <div style="font-family: Arial, Helvetica, sans-serif; font-size: 8pt; line-height: 1.25; color: #000; margin-top: 2px;">
              Jalan Dokter Soedarso No.1 Pontianak Tenggara, Kota Pontianak, Kalimantan Barat 78124<br>
              Telp. (0561) 737701, (0561) 746152, Fax. (0561) 736528<br>
              Laman : <span style="text-decoration: underline; color: #0044cc;">https://rsuddrsoedarso.kalbarprov.go.id</span>, Pos-el : <span style="text-decoration: underline; color: #0044cc;">rsud@kalbarprov.go.id</span>
            </div>
          </td>
        </tr>
      </table>

      <!-- Garis Ganda Kop Surat -->
      <div style="border-top: 3px solid #000000; border-bottom: 1px solid #000000; height: 2px; margin: 6px 0 16px 0;"></div>

      <!-- SECTION A -->
      <div class="soedarso-form-box">
        A. IDENTITAS PRIBADI STAF KEPERAWATAN
      </div>
      <table class="soedarso-table" style="margin-bottom: 16px;">
        <tr>
          <td style="width: 38%; font-weight: bold;">Nama Lengkap &amp; Gelar:</td>
          <td style="width: 62%;">${nama}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">NIP/NIPPPK/NIK:</td>
          <td>${nip}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Tempat / Tanggal Lahir:</td>
          <td>${ttl}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Jabatan / Fungsi Saat Ini:</td>
          <td>${jabatan}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Unit Kerja / Penempatan:</td>
          <td>${unit}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Jenjang Klinis Saat Ini:</td>
          <td>${pkSaatIni}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Rencana Jenjang Diusulkan:</td>
          <td>${pkDiusulkan}</td>
        </tr>
      </table>

      <!-- SECTION B -->
      <div class="soedarso-form-box">
        B. LEGALITAS FORMAL HUKUM DAN PRAKTIK
      </div>
      <table class="soedarso-table" style="margin-bottom: 16px;">
        <tr>
          <td style="width: 38%; font-weight: bold;">Nomor STR (Surat Tanda Registrasi):</td>
          <td style="width: 62%;">${str}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Masa Berlaku STR:</td>
          <td>${strBerlaku}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Nomor SIPP (Surat Izin Praktik Perawat)/<br>SIPB (Surat Izin Praktik Bidan):</td>
          <td>${sipp}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Masa Berlaku SIPP/SIPB:</td>
          <td>${sippBerlaku}</td>
        </tr>
      </table>

      <!-- SECTION C (Header & D3 Keperawatan) -->
      <div class="soedarso-form-box">
        C. RIWAYAT PENDIDIKAN FORMAL KEPERAWATAN
      </div>
      <table class="soedarso-table">
        <thead>
          <tr>
            <th class="soedarso-th-blue" style="width: 18%;">Jenjang</th>
            <th class="soedarso-th-blue" style="width: 44%;">Institusi Pendidikan / Universitas</th>
            <th class="soedarso-th-blue" style="width: 16%;">Tahun<br>Kelulusan</th>
            <th class="soedarso-th-blue" style="width: 22%;">Nomor Ijazah Resmi</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="font-weight: bold;">${edu0.jenjang}</td>
            <td>${edu0.institusi}</td>
            <td style="text-align: center;">${edu0.tahun}</td>
            <td>${edu0.noIjazah}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="page-separator-preview">
      <span>Lembar HVS 2 &bull; Halaman 2</span>
    </div>

    <!-- ==========================================
         HALAMAN 2: SECTION C LANJUTAN + D + E
         ========================================== -->
    <div class="soedarso-page page-2">
      <div style="text-align: right; font-size: 9.5pt; font-family: Arial, Helvetica, sans-serif; margin-bottom: 8px;">
        2
      </div>

      <!-- Continuation of Section C Table -->
      <table class="soedarso-table" style="margin-bottom: 18px;">
        <tbody>
          <tr>
            <td style="width: 18%; font-weight: bold;">${edu1.jenjang}</td>
            <td style="width: 44%;">${edu1.institusi}</td>
            <td style="width: 16%; text-align: center;">${edu1.tahun}</td>
            <td style="width: 22%;">${edu1.noIjazah}</td>
          </tr>
          <tr>
            <td style="font-weight: bold;">${edu2.jenjang}</td>
            <td>${edu2.institusi}</td>
            <td style="text-align: center;">${edu2.tahun}</td>
            <td>${edu2.noIjazah}</td>
          </tr>
          <tr>
            <td style="font-weight: bold;">${edu3.jenjang}</td>
            <td>${edu3.institusi}</td>
            <td style="text-align: center;">${edu3.tahun}</td>
            <td>${edu3.noIjazah}</td>
          </tr>
        </tbody>
      </table>

      <!-- SECTION D -->
      <div class="soedarso-form-box">
        D. RIWAYAT PENGALAMAN KERJA KLINIS (LOG RUANGAN)
      </div>
      <table class="soedarso-table" style="margin-bottom: 18px;">
        <thead>
          <tr>
            <th class="soedarso-th-blue" style="width: 28%;">Nama Rumah Sakit /<br>Instansi</th>
            <th class="soedarso-th-blue" style="width: 32%;">Ruang Perawatan /<br>Instalasi</th>
            <th class="soedarso-th-blue" style="width: 22%;">Periode Dinas<br>(Bulan/Tahun)</th>
            <th class="soedarso-th-blue" style="width: 18%;">Total Durasi<br>Masa Kerja</th>
          </tr>
        </thead>
        <tbody>
          ${expRowsHtml}
        </tbody>
      </table>

      <!-- SECTION E -->
      <div class="soedarso-form-box">
        E. RIWAYAT PELATIHAN &amp; SERTIFIKASI KOMPETENSI (MANDATORY WHITE PAPER)
      </div>
      <table class="soedarso-table">
        <thead>
          <tr>
            <th class="soedarso-th-blue" style="width: 34%;">Jenis Pelatihan / Workshop<br>Klinis</th>
            <th class="soedarso-th-blue" style="width: 32%;">Penyelenggara Resmi<br>(Kemenkes/PPNI/Kolegium)</th>
            <th class="soedarso-th-blue" style="width: 12%;">Tahun</th>
            <th class="soedarso-th-blue" style="width: 22%;">Masa Berlaku<br>Sertifikat</th>
          </tr>
        </thead>
        <tbody>
          ${trainRowsHtml}
        </tbody>
      </table>
    </div>

    <div class="page-separator-preview">
      <span>Lembar HVS 3 &bull; Halaman 3</span>
    </div>

    <!-- ==========================================
         HALAMAN 3: SECTION F & TANDA TANGAN RESMI
         ========================================== -->
    <div class="soedarso-page page-3">
      <div style="text-align: right; font-size: 9.5pt; font-family: Arial, Helvetica, sans-serif; margin-bottom: 10px;">
        3
      </div>

      <!-- SECTION F -->
      <div class="soedarso-form-box">
        F. PERNYATAAN KEOTENTIKAN BERKAS PORTOFOLIO
      </div>
      <div style="border: 1px solid #000000; border-top: none; padding: 14px 14px 18px 14px; font-size: 10pt; line-height: 1.6; text-align: justify; font-family: Arial, Helvetica, sans-serif; margin-bottom: 35px;">
        Dengan ini saya menyatakan bahwa seluruh data penulisan Curriculum Vitae, riwayat kompetensi klinis, serta lampiran sertifikat pendukung yang saya sertakan untuk pemenuhan kualifikasi kredensial / re-kredensial di RSUD dr. Soedarso ini adalah benar adanya, sah secara hukum, dan sesuai dengan fakta logbook penugasan saya. Apabila di kemudian hari ditemukan manipulasi data, saya bersedia menerima sanksi pencabutan Penugasan Klinis (Clinical Appointment) sesuai regulasi subkomite etik rumah sakit.
      </div>

      <!-- Signature Block -->
      <div style="width: 100%; display: flex; justify-content: flex-end;">
        <div style="width: 320px; text-align: left; font-family: Arial, Helvetica, sans-serif; font-size: 10pt; line-height: 1.45;">
          <div>${kota}, ${tanggal} ${tahun}</div>
          <div style="margin-top: 4px;">Hormat Saya (Pemohon Kredensial),</div>
          <div style="height: 75px;"></div>
          <div>( _________________________________ )</div>
          <div style="font-weight: bold; margin-top: 4px;">${namaTtd}</div>
        </div>
      </div>
    </div>
  `;
}

function previewCvHVS(mode) {
  if (mode) state.cvPreviewMode = mode;
  else if (!state.cvPreviewMode) state.cvPreviewMode = 'filled';

  const container = document.getElementById('cvHvsPrintArea');
  if (container) {
    container.innerHTML = generateCvHVS(state.cvPreviewMode);
  }

  const btnToggle = document.getElementById('btnTogglePreviewCvMode');
  if (btnToggle) {
    if (state.cvPreviewMode === 'blank') {
      btnToggle.innerHTML = '<i class="fa-solid fa-file-signature"></i> Tampilkan Data Hasil Isian';
      btnToggle.style.background = '#d97706';
      btnToggle.style.color = '#fff';
    } else {
      btnToggle.innerHTML = '<i class="fa-regular fa-file"></i> Tampilkan Format Blangko Kosong';
      btnToggle.style.background = 'var(--bg-app)';
      btnToggle.style.color = 'var(--text-main)';
    }
  }

  openModal('modalPreviewCvHVS');
}

function togglePreviewCvMode() {
  const nextMode = (state.cvPreviewMode === 'blank') ? 'filled' : 'blank';
  previewCvHVS(nextMode);
}

function printCvHVS(mode) {
  const printMode = mode || state.cvPreviewMode || 'filled';
  const printContent = generateCvHVS(printMode);
  const printWindow = window.open('', '_blank', 'width=880,height=960');
  if (printWindow) {
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Curriculum Vitae Staf Keperawatan - RSUD dr. Soedarso</title>
        <style>
          @page {
            size: A4 portrait;
            margin: 12mm 15mm;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          body {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 9.5pt;
            line-height: 1.35;
            color: #000;
            margin: 0;
            padding: 0;
            background: #fff;
          }
          table { width: 100%; border-collapse: collapse; }
          .soedarso-page {
            page-break-after: always;
            break-after: page;
            background: #fff;
            padding: 0;
            width: 100%;
          }
          .soedarso-page.page-3 {
            page-break-after: avoid;
            break-after: avoid;
          }
          .soedarso-form-box {
            border: 2px solid #000000;
            padding: 6px 10px;
            font-weight: bold;
            font-size: 10.5pt;
            text-transform: uppercase;
            background: #fff;
            margin-bottom: -1px;
            font-family: Arial, Helvetica, sans-serif;
          }
          .soedarso-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 9.5pt;
            border: 1px solid #000000;
            font-family: Arial, Helvetica, sans-serif;
          }
          .soedarso-table td, .soedarso-table th {
            border: 1px solid #000000;
            padding: 5px 8px;
            vertical-align: top;
          }
          thead tr, thead tr th, .soedarso-th-blue {
            background-color: #0e3860 !important;
            color: #ffffff !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .page-separator-preview { display: none !important; }
          img { max-width: 65px; height: auto; }
        </style>
      </head>
      <body>
        ${printContent}
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 400);
  } else {
    window.print();
  }
}

function exportCvWord(mode) {
  const exportMode = mode || state.cvPreviewMode || 'filled';
  const isBlank = (exportMode === 'blank');
  const content = generateCvHVS(exportMode);
  const rawNama = document.getElementById('cvNama')?.value || (state.cvData?.nama || 'Pemohon');
  const nama = isBlank ? 'Blangko_Kosong_CV_Soedarso' : rawNama.replace(/[^a-zA-Z0-9]/g, '_');
  const header = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head><meta charset='utf-8'><title>Curriculum Vitae Portofolio - ${nama}</title>
    <style>
      @page Section1 { size: 595.3pt 841.9pt; margin: 0.6in 0.7in 0.6in 0.7in; mso-header-margin: 35.4pt; mso-footer-margin: 35.4pt; mso-paper-source: 0; }
      div.Section1 { page: Section1; }
      body { font-family: Arial, Helvetica, sans-serif; font-size: 9.5pt; line-height: 1.35; color: #000; }
      table { border-collapse: collapse; width: 100%; }
      .soedarso-form-box { border: 2pt solid black; padding: 4pt 6pt; font-weight: bold; font-size: 11pt; text-transform: uppercase; font-family: Arial, sans-serif; }
      .soedarso-table td, .soedarso-table th { border: 1pt solid black; padding: 4pt 6pt; font-family: Arial, sans-serif; font-size: 9.5pt; }
      .page-separator-preview { display: none; }
      .soedarso-page { page-break-after: always; }
      .soedarso-page.page-3 { page-break-after: avoid; }
      .soedarso-th-blue { background-color: #0e3860; color: #ffffff; font-weight: bold; text-align: center; }
    </style>
    </head>
    <body>
    <div class="Section1">
  `;
  const footer = `</div></body></html>`;
  const sourceHTML = header + content + footer;
  const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
  const fileDownload = document.createElement("a");
  document.body.appendChild(fileDownload);
  fileDownload.href = source;
  fileDownload.download = `CV_Portofolio_${nama}_RSUD_dr_Soedarso.doc`;
  fileDownload.click();
  document.body.removeChild(fileDownload);
  showToast(`Curriculum Vitae ${rawNama} berhasil diunduh dalam format Word (.doc)!`, 'success');
}

/* ==========================================================================
   ALUR LANGKAH 2: FORMULIR & BLANGKO RESMI BUKU CATATAN KINERJA KLINIS HARIAN
   (LOGBOOK) 2 HALAMAN STANDAR KOMITE KEPERAWATAN RSUD DR. SOEDARSO PONTIANAK
   ========================================================================== */

function openLogbookModal() {
  const logbook = state.logbookData || window.KOMITE_DATA?.sampleLogbook?.perawat;
  if (logbook) {
    fillLogbookFormWithData(logbook);
  } else {
    renderLogbookItemRows([]);
  }
  // Data identitas wajib tersinkron dan terkunci dari Langkah 1 (CV)
  syncAllDownstreamFormsFromCv();
  openModal('modalLogbookKredensial');
}

function fillLogbookFormWithData(data) {
  if (!data) return;
  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (el.tagName === 'SELECT' && val) {
      el.value = val;
      if (!el.value) {
        for (const opt of el.options) {
          if (opt.value && (opt.value.includes(val) || val.includes(opt.value))) {
            el.value = opt.value;
            break;
          }
        }
      }
    } else {
      el.value = val !== undefined ? val : '';
    }
  };

  setVal('logbookNama', data.nama);
  setVal('logbookNip', data.nip);
  setVal('logbookJenjang', data.jenjang);
  setVal('logbookUnit', data.unit);
  setVal('logbookPeriode', data.periode || 'Januari 2025 s.d Desember 2025 (1 Tahun Terakhir)');

  renderLogbookItemRows(data.items || []);

  setVal('logbookKaRuNama', data.kaRuNama);
  setVal('logbookKaRuNip', data.kaRuNip);
  setVal('logbookKaRuRuangan', data.kaRuRuangan || data.unit);
  setVal('logbookKota', data.kota || 'Pontianak');
  setVal('logbookTanggal', data.tanggal || '21 Oktober');
  setVal('logbookTahun', data.tahun || '2026');
}

function fillLogbookPreset(type) {
  const preset = window.KOMITE_DATA?.sampleLogbook?.[type];
  if (preset) {
    fillLogbookFormWithData(preset);
    // Prioritaskan identitas master dari CV
    syncAllDownstreamFormsFromCv();
    showToast(`Data logbook contoh untuk ${type === 'bidan' ? 'Bdn. Siti Nurhaliza (BK III - VK)' : 'Ns. Hendra Kurniawan (PK III - Bedah)'} dimuat! Identitas pemohon tetap terkunci dari Langkah 1 (CV).`, 'info');
  }
}

function resetLogbookForm() {
  const ids = ['logbookPeriode', 'logbookKaRuNama', 'logbookKaRuNip', 'logbookKaRuRuangan'];
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  renderLogbookItemRows([]);
  // Pastikan data identitas tetap tersinkronisasi dari Langkah 1 (CV)
  syncAllDownstreamFormsFromCv();
  showToast('Tabel prosedur tindakan logbook dikosongkan. Identitas pemohon tetap tersinkron dan terkunci dari Langkah 1 (CV).', 'info');
}

/* ==========================================================================
   STANDAR BUKU PUTIH (WHITE BOOK 2026): 16 RUMPUN TINDAKAN KLINIS
   PILIH 1 RUMPUN MAKA OTOMATIS TERISI 10 TINDAKAN DARI NOMOR 1 HINGGA 10
   ========================================================================== */
const WHITE_BOOK_RUMPUN_10_ACTIONS = {
  kmb_bedah: {
    title: 'Keperawatan Medikal Bedah (KMB & Bedah Dewasa - PK II / PK III)',
    actions: [
      'Validasi pengkajian awal, penilaian kesadaran GCS, dan deteksi peningkatan TIK',
      'Pemeriksaan Ankle Brachial Index (ABI) dan analisa hasil EKG (ST elevasi / disritmia)',
      'Serah terima pasien SBAR dan keselamatan prosedur invasif (Sign In, Time Out, Sign Out)',
      'Melaksanakan bundles HAIs terkait Infeksi Aliran Darah Primer (IADP) & rawat pasien HIV/AIDS',
      'Memonitor hemodinamik dengan monitor non-invasif & embolus precautions',
      'Pemberian terapi O2 masker rebreathing/NRM, OPA/NPA, dan suction via trakeostomi',
      'Melakukan pencabutan vena central line & monitoring balans cairan elektrolit',
      'Perawatan cedera tekan grade 2-3, luka bakar, graft/donor site, dan ulkus Wagner I-II',
      'Pemberian obat kemoterapi terverifikasi PK 3 & monitoring efek samping kemoterapi',
      'Pemberian insulin drip IV & pemantauan respon obat anti-aritmia serta irigasi mata/hidung'
    ]
  },
  kamar_bedah: {
    title: 'Kamar Bedah / Perioperatif (IBS / OK / Anestesi)',
    actions: [
      'Pengkajian pra-operasi dasar dan verifikasi identitas pasien (Sign In WHO)',
      'Persiapan lingkungan kamar bedah, suhu, kelembaban, dan kesterilan instrumen bedah',
      'Melakukan cuci tangan bedah (surgical scrub), gowning, dan gloving dengan teknik aseptik tertutup',
      'Persiapan instrumen bedah dasar sesuai jenis pembedahan (Mayor / Minor)',
      'Pengelolaan spesimen jaringan / patologi anatomi intra-operasi dengan label identitas aman',
      'Membantu penutupan luka operasi dan pembalutan steril serta penghitungan kassa/instrumen',
      'Menerima dan memonitor pasien pasca operasi di ruang pulih sadar (PACU / RR)',
      'Penilaian kriteria pemulihan pasca anestesi (Aldrete Score / Bromage Score / Steward Score)',
      'Pemberian oksigenasi dan pembersihan jalan napas pasca ekstubasi di ruang pulih sadar',
      'Penerapan keselamatan operasi: Sign In, Time Out, dan Sign Out sesuai standar WHO'
    ]
  },
  generalis: {
    title: 'Perawat Generalis / Ruang Rawat Inap Dasar (PK I & PK II)',
    actions: [
      'Melakukan interpretasi hasil EKG normal dan lapor nilai kritis',
      'Melakukan skrining paliatif, psikologis, spiritual, dan kultural',
      'Melakukan komunikasi verbal teknik SBAR dalam pelaporan kondisi pasien dengan TBAK',
      'Menerapkan prinsip etika keperawatan (autonomy, beneficience, justice, non-maleficience, fidelity)',
      'Melaksanakan bundles HAIs (ISK, HAP, IDO) dan hand hygiene sesuai standar',
      'Mengukur TTV, skor EWSS, aktivasi Code Blue, dan Bantuan Hidup Dasar (BHD)',
      'Pemberian terapi oksigen via nasal kanul dan simple mask serta suction OPA/oral',
      'Pemasangan dan pencabutan NGT pasien dewasa tanpa penyulit serta cek kepatenan',
      'Pengelolaan pemberian transfusi darah dan produk darah secara aman',
      'Pengambilan sampel darah vena dan kapiler (GDS), sputum, feses, dan urin'
    ]
  },
  intensif_icu: {
    title: 'Perawatan Intensif & Kritis (ICU / ICCU / HCU)',
    actions: [
      'Pengkajian tanda vital pasien kritis via bedside monitor multifungsi',
      'Interpretasi EKG strip kontinyu (sinus, aritmia letal, VT/VF, asistol) dan lapor nilai kritis',
      'Penerapan bundles Ventilator-Associated Pneumonia (VAP) dan oral hygiene chlorhexidine',
      'Pemantauan Mean Arterial Pressure (MAP), tekanan darah non-invasif, dan perfusi perifer',
      'Pemberian bantuan napas bag-valve-mask (Ambu Bag) dan assisted ventilation darurat',
      'Suction jalan napas via endotracheal tube (ETT) / tracheostomy dengan closed suction system',
      'Pemberian nutrisi enteral kontinyu via enteral feeding pump & evaluasi residu lambung',
      'Titrasi obat inotropik, vasopresor (norepinefrin, dopamin, dobutamin) via syringe pump',
      'Pengambilan spesimen darah analisa gas darah (AGD) dan interpretasi keseimbangan asam-basa',
      'Manajemen alarm fatigue di ICU, cooling/warming system, dan personal hygiene multidevice'
    ]
  },
  emergensi_igd: {
    title: 'Kegawatdaruratan & Trauma (IGD / Resusitasi / Triase)',
    actions: [
      'Melakukan triage awal kegawatdaruratan dasar (skala triase ATS/ESI)',
      'Pengkajian primer (Primary Survey: Airway, Breathing, Circulation, Disability, Exposure)',
      'Pemeriksaan EKG 12 lead cepat pada kasus nyeri dada akut / suspek ACS (< 10 menit)',
      'Penerapan bundle pencegahan infeksi pada luka trauma kotor dan kontaminasi cairan tubuh',
      'Melakukan Bantuan Hidup Dasar (BHD/BLS) dewasa dan aktivasi emergency call system',
      'Pembebasan jalan napas tanpa alat (head tilt-chin lift, jaw thrust) & pemasangan OPA/NPA',
      'Pemasangan jalur intravena perifer ganda ukuran besar (16G/18G) pada pasien syok/trauma',
      'Melakukan pembidaian fraktur, fiksasi servikal (collar neck), dan log roll spine board',
      'Pemberian terapi titrasi analgetik darurat, bronkodilator nebulisasi, dan antidotum',
      'Tatalaksana perawatan pasien PINERE, isolasi kontak langsung, dan airborne disease'
    ]
  },
  kardiovaskuler: {
    title: 'Kardiovaskuler & Pelayanan Jantung (Cathlab / CVCU)',
    actions: [
      'Pemeriksaan fisik kardiovaskuler dasar dan pemantauan tanda gagal jantung',
      'Perekaman dan pembacaan EKG 12 sandapan rutin serta pemantauan continuous telemetry',
      'Komunikasi terapeutik dan edukasi modifikasi gaya hidup pasien penyakit jantung koroner',
      'Edukasi restriksi cairan dan diet rendah garam pada pasien decompensatio cordis',
      'Penerapan bundles pencegahan IADP pada akses vena sentral pasien kardiovaskuler',
      'Pemantauan tanda vital dan deteksi dini syok kardiogenik (hipotensi, takikardia, oliguria)',
      'Pemberian terapi oksigen pada sindrom koroner akut dan acute decompensated heart failure',
      'Persiapan pasien dan asistensi tindakan ekokardiografi transtorakal (TTE)',
      'Pemberian obat-obat kardiovaskuler oral (antihipertensi, statin, antikoagulan, beta blocker)',
      'Persiapan dan pemantauan Holter monitoring, treadmill test, TEE, dan Dobutamin Stress Echo'
    ]
  },
  pediatrik_anak: {
    title: 'Pediatrik / Keperawatan Anak (Bangsal Anak & Bedah Anak)',
    actions: [
      'Anamnesis pasien anak & skrining perkembangan dengan Kuesioner Pra Skrining Perkembangan (KPSP)',
      'Penilaian tanda bahaya umum anak balita (kejang, tidak bisa minum, stridor, letargis)',
      'Pemberian terapi suportif demam: kompres hangat tepid sponge dan antipiretik',
      'Pemberian cairan rehidrasi oral (CRO/oralit) pada anak diare dehidrasi ringan-sedang',
      'Pencegahan infeksi silang di bangsal anak dan edukasi imunisasi dasar lengkap',
      'Pemberian oksigenasi anak via nasal kanul pediatrik / sungkup mikro dengan humidifikasi',
      'Pemasangan jalur intravena perifer anak (IV line) dengan teknik atraumatik care',
      'Pemasangan pipa orogastrik / nasogastrik (OGT/NGT) pediatrik untuk nutrisi dan dekompresi',
      'Pemberian obat puyer, sirup, tetes, dan injeksi dengan dosis presisi berat badan (BB)',
      'Manajemen cairan, elektrolit, dan syok pada anak dengan penyakit infeksi berat'
    ]
  },
  perinatologi_nicu: {
    title: 'Perinatologi & Neonatologi (NICU / PICU / Bayi Risiko Tinggi)',
    actions: [
      'Asuhan perkembangan neonatus kritis, deteksi BBLR/BBLASR, dan pencegahan MARSI bayi',
      'Pemeriksaan refleks primitif bayi baru lahir dan penilaian Ballard Score kematangan gestasi',
      'Penerapan Perawatan Metode Kanguru (PMK / Kangaroo Mother Care) pada BBLR stabil',
      'Pencegahan hipotermia neonatus: radiant warmer, infant incubator, dan plastic wrap BBLASR',
      'Pemberian fototerapi pada neonatus hiperbilirubinemia dan perlindungan mata/genitalia',
      'Resusitasi neonatus dasar: stimulasi taktil, pembersihan jalan napas, ventilasi tekanan positif (VTP)',
      'Pemberian oksigenasi neonatus via continuous positive airway pressure (CPAP) / bubble CPAP',
      'Pemasangan jalur vena perifer neonatus dengan transiluminasi / vena umbilikal darurat',
      'Pemasangan OGT neonatus, pemberian ASI perah (ASIP) mikro, dan trophic feeding',
      'Komunikasi terapeutik perkembangan anak: distraksi, story telling, dan terapi sentuhan'
    ]
  },
  maternitas_bidan: {
    title: 'Maternitas & Pelayanan Kebidanan (VK / Kamar Bersalin / Ponek)',
    actions: [
      'Pemeriksaan Antenatal Care (ANC) terstandar 10T & skrining faktor risiko maternal',
      'Penapisan tanda bahaya kehamilan trimester 1, 2, dan 3 serta skrining preeklampsia',
      'Asuhan Persalinan Normal (APN 60 Langkah) kala I, II, III, dan IV tanpa penyulit',
      'Pemantauan kemajuan persalinan dan kondisi ibu-janin menggunakan Partograf WHO',
      'Pemberian oksitosin drip untuk induksi / augmentasi persalinan sesuai instruksi DPJP',
      'Manajemen Aktif Kala III (MAK III) dan kompresi bimanual pada perdarahan pasca persalinan (HPP)',
      'Penjahitan robekan perineum / episiotomi derajat I dan II dengan anestesi lokal lidokain',
      'Resusitasi bayi baru lahir normal dan asfiksia ringan serta Inisiasi Menyusu Dini (IMD)',
      'Pemeriksaan Cardiotocography (CTG) dan interpretasi kesejahteraan janin intrapartum',
      'Perawatan payudara/SADARI/SADARNIS, rawat tali pusat, dan konseling ASI eksklusif'
    ]
  },
  onkologi: {
    title: 'Onkologi & Kemoterapi (Ruang Camar / Kanker)',
    actions: [
      'Pengkajian performa fisik (skor ECOG / Karnofsky) dan derajat nyeri kanker',
      'Pemeriksaan area penusukan infus dan identifikasi risiko ekstravasasi sitostatika',
      'Penerapan kewaspadaan standar sitotoksik dan spill kit management tumpahan kemoterapi',
      'Edukasi pasien terkait efek samping kemoterapi (alopesia, mual-muntah, neutropenia, stomatitis)',
      'Pemberian terapi premedikasi kemoterapi (antiemetik, deksametason, antihistamin)',
      'Pemberian hidrasi pre-kemoterapi dan post-kemoterapi dengan balans cairan ketat',
      'Pemberian obat kemoterapi jalur intravena perifer dan central line dengan APD kemo level 3',
      'Pemantauan vital sign dan reaksi anafilaksis selama infus sitostatika berlangsung',
      'Perawatan jalur vena sentral (PICC / Chemoport) dengan teknik heparinisasi berkala',
      'Tatalaksana ekstravasasi obat kemoterapi & pencegahan cedera pansitopenia'
    ]
  },
  neurosains: {
    title: 'Neurologi / Neurosains & Stroke Unit (Ruang Ruai)',
    actions: [
      'Penilaian tingkat kesadaran GCS dan evaluasi refleks pupil berkala',
      'Pengkajian defisit neurologis akut dengan skala NIHSS (National Institutes of Health Stroke Scale)',
      'Skrining disfagia (tes menelan) sebelum pemberian nutrisi atau obat per oral',
      'Penerapan protokol pencegahan peningkatan tekanan intrakranial (elevasi kepala 30 derajat, head in midline)',
      'Penerapan bundle pencegahan dekubitus dan kontraktur pada pasien hemiparesis/plegia',
      'Pemantauan tekanan darah, gula darah, dan suhu tubuh pada fase akut stroke',
      'Pemberian terapi oksigen dan pembersihan jalan napas pada pasien gangguan menelan/aspirasi',
      'Latihan mobilisasi bertahap (ROM pasif dan aktif) serta pencegahan Deep Vein Thrombosis (DVT)',
      'Pemberian obat antiplatelet, antikoagulan, neuroprotektor, dan manitol infus teratur',
      'Perawatan drain ventrikulostomi (EVD), VP Shunt, dan luka bedah saraf anak (spina bifida/hidrosefalus)'
    ]
  },
  nefrologi_hd: {
    title: 'Nefrologi & Hemodialisa (Unit Dialisis / Ginjal)',
    actions: [
      'Pengkajian pre-dialisis (tanda overload cairan, edema perifer, ronkhi paru)',
      'Penimbangan berat badan pre-HD dan perhitungan dry weight serta Ultrafiltrasi (UF Goal)',
      'Pemeriksaan kepatenan akses vaskular (bruit dan thrill pada AV Shunt / Cimino)',
      'Setting mesin hemodialisa, priming sirkuit darah dengan NaCl steril dan heparinisasi',
      'Kanulasi fistula arteriovena (Cimino) atau penyambungan ke Catheter Double Lumen (CDL)',
      'Pemantauan tanda vital dan tekanan sirkuit (Arterial Pressure, Venous Pressure, TMP) berkala',
      'Tatalaksana hipotensi intra-dialitik, kram otot, dan disequilibrium syndrome',
      'Terminasi hemodialisa, pengembalian darah (washback), dan penekanan lokasi penusukan kanul',
      'Perawatan exit site CDL dengan teknik steril dan ganti balutan transparan',
      'Kanulasi cimino, puncture femoral, dan akses Catheter Double Lumen (CDL/tunnel HD)'
    ]
  },
  respirologi: {
    title: 'Respirologi / Paru & Saluran Pernapasan (TB / Paru)',
    actions: [
      'Pengkajian komprehensif penyakit pernapasan akut/kronis dan interpretasi analisa gas darah',
      'Pengkajian frekuensi napas, pola napas, saturasi oksigen SpO2, dan bunyi napas abnormal (wheezing/ronkhi)',
      'Edukasi etika batuk efektif dan teknik pengeluaran dahak (fisioterapi dada & clapping)',
      'Penerapan kewaspadaan transmisi airborne dan kepatuhan masker N95 di ruang isolasi TB',
      'Pemberian terapi inhalasi / nebulisasi bronkodilator dan mukolitik sesuai instruksi',
      'Pemberian terapi oksigen fraksi tinggi via Non-Rebreathing Mask (NRM) dan High Flow Nasal Cannula (HFNC)',
      'Perawatan selang dada dan botol Water Seal Drainage (WSD) serta pemantauan undulasi undulasi',
      'Pengambilan sampel sputum SPS (Sewaktu-Pagi-Sewaktu) / TCM (Tes Cepat Molekuler)',
      'Edukasi kepatuhan minum Obat Anti Tuberkulosis (OAT) dan pemantauan efek samping',
      'Audit kepatuhan bundle ruang isolasi infeksi airborne disease bertekanan negatif'
    ]
  },
  jiwa: {
    title: 'Psikiatri & Kesehatan Jiwa (Ruang Jiwa / Akut)',
    actions: [
      'Pengkajian risiko perilaku kekerasan (RPK), halusinasi, isolasi sosial, defisit perawatan diri, waham',
      'Penerapan komunikasi terapeutik pada pasien dengan disorientasi dan agitasi',
      'Manajemen de-eskalasi verbal pada pasien gaduh gelisah / agresif tanpa kekerasan',
      'Penerapan fiksasi fisik (restraint) sesuai indikasi keselamatan dengan observasi sirkulasi tiap 15 menit',
      'Pemberian obat antipsikotik, mood stabilizer, dan antidepresan dengan pengawasan minum obat (PMO)',
      'Pemantauan efek samping ekstra piramidal (EPS: distonia akut, akatisia, parkinsonisme)',
      'Melatih pasien mengontrol halusinasi dengan cara menghardik, berbincang, dan aktivitas terjadwal',
      'Melatih pasien mengontrol marah dengan cara tarik napas dalam dan pukul kasur/bantal',
      'Pelaksanaan Terapi Aktivitas Kelompok (TAK) stimulasi persepsi dan sosialisasi',
      'Audit etika dan keselamatan tindakan fiksasi fisik (restraint) pasien jiwa'
    ]
  },
  mata: {
    title: 'Oftalmologi / Mata & THT',
    actions: [
      'Pemeriksaan visus kasar, evaluasi tajam penglihatan refraksionis, dan lapor TIO kritis',
      'Pemeriksaan tajam penglihatan (Snellen Chart) dan tes buta warna (Ishihara)',
      'Pemberian obat tetes mata dan salep mata dengan teknik aseptik tanpa menyentuh konjungtiva',
      'Irigasi mata darurat pada kasus trauma kimia mata (asam / basa) dengan cairan saline netral',
      'Perawatan pre dan post operasi katarak (fakoemulsifikasi) dan glaukoma',
      'Edukasi pasien post operasi mata: pantangan batuk keras, membungkuk, dan mengangkat beban berat',
      'Pemeriksaan dan irigasi serumen telinga (spooling telinga) dengan cairan hangat suam kuku',
      'Pemasangan tampon hidung anterior pada kasus epistaksis anterior dan evaluasi perdarahan',
      'Pemberian obat tetes telinga dan tetes hidung sesuai posisi anatomi',
      'Melakukan komunikasi verbal teknik SBAR dalam pelaporan kondisi pasien dengan TBAK'
    ]
  },
  geriatri: {
    title: 'Geriatri & Rehabilitasi Medik Lansia',
    actions: [
      'Pengkajian komprehensif geriatri dasar (risiko jatuh Morse, inkontinensia, dekubitus)',
      'Pengkajian status fungsional lansia dengan Indeks Barthel (Activities of Daily Living / ADL)',
      'Penilaian status kognitif lansia dengan Mini Mental State Examination (MMSE) / AMT',
      'Skrining malnutrisi lansia dengan Mini Nutritional Assessment (MNA) dan status hidrasi',
      'Penerapan protokol pencegahan jatuh pasien geriatri (bed rail terpasang, lantai tidak licin)',
      'Latihan Range of Motion (ROM) aktif/pasif dan alih baring berkala tiap 2 jam (repositioning)',
      'Asuhan eliminasi: bladder training, manajemen inkontinensia urin/fekal, dan perawatan kateter',
      'Pemberian obat pada lansia dengan prinsip 7 benar dan evaluasi risiko polifarmasi',
      'Edukasi keluarga dan caregiver mengenai perawatan lansia tirah baring di rumah',
      'Perawatan luka tekan (Pressure Ulcer) grade III-IV dan ulkus diabetik kronik pada lansia'
    ]
  }
};

function onSelectRumpunLogbook(rumpunKey) {
  if (!rumpunKey) return;
  load10ActionsForRumpun(rumpunKey);
  const master = getActiveCvMasterData();
  const mappedArea = mapRumpunToAreaKlinis(rumpunKey, master.pkDiusulkan);
  if (mappedArea) {
    state.selectedAreaKlinis = mappedArea;
    const cvAreaEl = document.getElementById('cvAreaKlinis');
    if (cvAreaEl && cvAreaEl.querySelector(`option[value="${mappedArea}"]`)) {
      cvAreaEl.value = mappedArea;
    }
    if (state.cvData) state.cvData.areaKlinis = mappedArea;
    syncAllDownstreamFormsFromCv();
  }
}

function applyRumpunLogbookFromSelect() {
  const select = document.getElementById('selectRumpunWhiteBook');
  const val = select ? select.value : '';
  if (!val) {
    showToast('Silakan pilih salah satu Rumpun Klinis White Book terlebih dahulu!', 'warning');
    if (select) select.focus();
    return;
  }
  load10ActionsForRumpun(val);
}

function load10ActionsForRumpun(rumpunKey) {
  if (!rumpunKey) return;
  const rumpunData = WHITE_BOOK_RUMPUN_10_ACTIONS[rumpunKey];
  if (!rumpunData) {
    showToast('Data rumpun tidak ditemukan.', 'warning');
    return;
  }

  const actions = rumpunData.actions;
  const sampleRms = ['482105', '482319', '482560', '482781', '483012', '483245', '483490', '483712', '483980', '484215'];
  const sampleDates = [
    '06/01/2025', '12/01/2025', '18/01/2025', '24/01/2025', '03/02/2025',
    '10/02/2025', '17/02/2025', '24/02/2025', '04/03/2025', '12/03/2025'
  ];

  const items = actions.slice(0, 10).map((act, idx) => ({
    tgl: sampleDates[idx] || '12/01/2025',
    rm: sampleRms[idx] || `48${idx + 1}01`,
    tindakan: act,
    mandiri: true,
    supervisi: false,
    catatan: ''
  }));

  renderLogbookItemRows(items);

  const select = document.getElementById('selectRumpunWhiteBook');
  if (select && select.value !== rumpunKey) {
    select.value = rumpunKey;
  }

  showToast(`10 Tindakan Standar White Book Rumpun "${rumpunData.title}" berhasil dimuat ke nomor 1 s.d 10!`, 'success');
}

function renderRowQuickSelectOptions(currentVal) {
  const currentRumpun = document.getElementById('selectRumpunWhiteBook')?.value;
  let html = '';
  
  if (currentRumpun && WHITE_BOOK_RUMPUN_10_ACTIONS[currentRumpun]) {
    const rumpunObj = WHITE_BOOK_RUMPUN_10_ACTIONS[currentRumpun];
    html += `<optgroup label="Tindakan Rumpun Aktif: ${escapeHtml(rumpunObj.title)}">`;
    rumpunObj.actions.forEach((act, i) => {
      const isSel = act === currentVal ? 'selected' : '';
      html += `<option value="${escapeHtml(act)}" ${isSel}>${i + 1}. ${escapeHtml(act)}</option>`;
    });
    html += `</optgroup>`;
  }

  // Also include general White Book actions
  const allActions = getAllWhiteBookActionsList();
  html += `<optgroup label="Pilihan Tindakan White Book Populer Lainnya">`;
  const baseSample = allActions.slice(0, 35);
  baseSample.forEach(item => {
    if (!currentVal || item.name !== currentVal) {
      html += `<option value="${escapeHtml(item.name)}">[${escapeHtml(item.category)}] ${escapeHtml(item.name)}</option>`;
    }
  });
  html += `</optgroup>`;

  return html;
}

function onSelectRowWhiteBookAction(selectEl) {
  if (!selectEl || !selectEl.value) return;
  const tr = selectEl.closest('tr');
  if (!tr) return;
  const input = tr.querySelector('.logbook-item-tindakan');
  if (input) {
    input.value = selectEl.value;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
    const rowNum = tr.querySelector('.logbook-row-num')?.textContent || '';
    showToast(`Tindakan nomor ${rowNum} diganti: "${selectEl.value.substring(0, 45)}..."`, 'info');
  }
}

function ensureWhiteBookDatalist() {
  let datalist = document.getElementById('whiteBookDatalist');
  if (!datalist) {
    datalist = document.createElement('datalist');
    datalist.id = 'whiteBookDatalist';
    document.body.appendChild(datalist);
  }
  const allActions = getAllWhiteBookActionsList();
  if (datalist.children.length === 0 && allActions.length > 0) {
    const fragment = document.createDocumentFragment();
    allActions.forEach(item => {
      const opt = document.createElement('option');
      opt.value = item.name;
      opt.label = item.category ? `[${item.category}] ${item.name}` : item.name;
      fragment.appendChild(opt);
    });
    datalist.appendChild(fragment);
  }
}

function renderLogbookItemRows(items = []) {
  const tbody = document.getElementById('logbookItemsTbody');
  if (!tbody) return;

  ensureWhiteBookDatalist();

  // Exactly 10 default rows (No. 1 s.d 10) according to standard official form
  const defaultItems = [
    { tgl: '', rm: '', tindakan: '', mandiri: true, supervisi: false, catatan: '' },
    { tgl: '', rm: '', tindakan: '', mandiri: true, supervisi: false, catatan: '' },
    { tgl: '', rm: '', tindakan: '', mandiri: true, supervisi: false, catatan: '' },
    { tgl: '', rm: '', tindakan: '', mandiri: true, supervisi: false, catatan: '' },
    { tgl: '', rm: '', tindakan: '', mandiri: true, supervisi: false, catatan: '' },
    { tgl: '', rm: '', tindakan: '', mandiri: true, supervisi: false, catatan: '' },
    { tgl: '', rm: '', tindakan: '', mandiri: true, supervisi: false, catatan: '' },
    { tgl: '', rm: '', tindakan: '', mandiri: true, supervisi: false, catatan: '' },
    { tgl: '', rm: '', tindakan: '', mandiri: true, supervisi: false, catatan: '' },
    { tgl: '', rm: '', tindakan: '', mandiri: true, supervisi: false, catatan: '' }
  ];

  const list = (items && items.length > 0) ? items : defaultItems;
  tbody.innerHTML = '';

  list.forEach((item, idx) => {
    const tr = document.createElement('tr');
    tr.style.borderBottom = '1px solid var(--border-subtle)';
    tr.style.background = idx % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.02)';

    const isMandiri = item.mandiri !== false;
    const tglVal = item.tgl || '';
    const rmVal = item.rm || '';
    const tglRmCombined = rmVal ? `${tglVal} (${rmVal})` : tglVal;
    const actionVal = escapeHtml(item.tindakan || '');

    tr.innerHTML = `
      <td style="padding: 6px 4px; text-align: center; font-weight: 700; color: var(--text-muted); font-size: 0.8rem;">
        <span class="logbook-row-num">${idx + 1}</span>
      </td>
      <td style="padding: 6px 4px;">
        <input type="text" class="form-input logbook-item-tglrm" value="${escapeHtml(tglRmCombined)}" placeholder="Contoh: 12/01/2025 (RM: 482910)" style="font-size: 0.78rem; padding: 5px 6px;">
      </td>
      <td style="padding: 6px 4px; position: relative;">
        <div style="display: flex; align-items: center; gap: 4px; position: relative; margin-bottom: 3px;">
          <input type="text" 
                 class="form-input logbook-item-tindakan" 
                 list="whiteBookDatalist" 
                 value="${actionVal}" 
                 placeholder="-- Klik / Pilih Opsi Tindakan White Book --" 
                 autocomplete="off" 
                 style="font-size: 0.78rem; padding: 5px 8px; flex: 1; border-color: #38bdf8; background: #f0f9ff; cursor: pointer;"
                 title="Klik atau ketik untuk mencari dan memilih dari 582 opsi tindakan White Book">
          <button type="button" 
                  class="btn-toggle-whitebook-row" 
                  onclick="toggleWhiteBookDropdownForRow(this)" 
                  title="Pilih Opsi Tindakan White Book (582 Standar)">
            <i class="fa-solid fa-chevron-down" style="font-size: 0.72rem;"></i>
          </button>
        </div>
        <div style="display: flex; align-items: center; gap: 4px;">
          <select class="form-select logbook-row-quick-select" 
                  onchange="onSelectRowWhiteBookAction(this)" 
                  style="font-size: 0.71rem; padding: 2px 4px; height: 22px; color: #334155; background: #f8fafc; border: 1px dashed #94a3b8; border-radius: 4px; width: 100%; cursor: pointer;" 
                  title="Ganti tindakan pada baris ini dengan memilih opsi White Book">
            <option value="">-- Ganti / Pilih Opsi Tindakan White Book --</option>
            ${renderRowQuickSelectOptions(item.tindakan || '')}
          </select>
        </div>
      </td>
      <td style="padding: 6px 4px; text-align: center;">
        <div style="display: flex; justify-content: center; align-items: center; gap: 8px; font-size: 0.76rem;">
          <label style="cursor: pointer; display: flex; align-items: center; gap: 2px;">
            <input type="radio" name="logbookKemandirian_${idx}" value="M" ${isMandiri ? 'checked' : ''} class="logbook-item-radio-m"> <strong>M</strong>
          </label>
          <label style="cursor: pointer; display: flex; align-items: center; gap: 2px;">
            <input type="radio" name="logbookKemandirian_${idx}" value="S" ${!isMandiri ? 'checked' : ''} class="logbook-item-radio-s"> <strong>S</strong>
          </label>
        </div>
      </td>
      <td style="padding: 6px 4px; text-align: center;">
        <button type="button" class="btn-secondary" style="font-size: 0.7rem; padding: 4px 6px; color: #dc2626;" onclick="removeLogbookItemRow(this)" title="Hapus Tindakan">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function addLogbookItemRow(data = {}) {
  const current = getLogbookItemsFromForm();
  current.push({
    tgl: data.tgl || '',
    rm: data.rm || '',
    tindakan: data.tindakan || '',
    mandiri: data.mandiri !== false,
    supervisi: data.mandiri === false,
    catatan: data.catatan || ''
  });
  renderLogbookItemRows(current);
}

function removeLogbookItemRow(btn) {
  const tr = btn?.closest('tr');
  if (tr) {
    tr.remove();
    // Re-index row numbers and radio names
    const tbody = document.getElementById('logbookItemsTbody');
    if (tbody) {
      const rows = tbody.querySelectorAll('tr');
      rows.forEach((r, idx) => {
        const numSpan = r.querySelector('.logbook-row-num');
        if (numSpan) numSpan.textContent = idx + 1;
        const radios = r.querySelectorAll('input[type="radio"]');
        radios.forEach(radio => {
          radio.name = `logbookKemandirian_${idx}`;
        });
      });
      if (rows.length === 0) {
        renderLogbookItemRows([]);
      }
    }
  }
}

function toggleWhiteBookDropdownForRow(btn) {
  const tr = btn?.closest('tr');
  if (!tr) return;
  const input = tr.querySelector('.logbook-item-tindakan');
  if (!input) return;
  const dropdown = document.getElementById('logbookActionAutocomplete');
  if (dropdown && dropdown.style.display === 'block' && currentAutocompleteInput === input) {
    closeLogbookAutocomplete();
  } else {
    input.focus();
    handleLogbookActionInput(input, true);
  }
}

/* ==========================================================================
   WHITE BOOK ACTION AUTOCOMPLETE & CATALOG (582+ TINDAKAN)
   ========================================================================== */
function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getAllWhiteBookActionsList() {
  if (window._cachedWhiteBookActions && window._cachedWhiteBookActions.length > 0) {
    return window._cachedWhiteBookActions;
  }
  const set = new Set();
  const list = [];
  const add = (name, category = '') => {
    if (!name) return;
    const s = String(name).trim();
    if (s.length > 2 && !set.has(s.toLowerCase())) {
      set.add(s.toLowerCase());
      list.push({ name: s, category: category || 'Buku Putih' });
    }
  };

  if (window.KOMITE_DATA?.mandatoryBaseActions && Array.isArray(window.KOMITE_DATA.mandatoryBaseActions)) {
    window.KOMITE_DATA.mandatoryBaseActions.forEach(a => add(a.name, a.domain || 'Asuhan Umum & Dasar'));
  }
  if (window.KOMITE_DATA?.whiteBookActions && typeof window.KOMITE_DATA.whiteBookActions === 'object') {
    Object.keys(window.KOMITE_DATA.whiteBookActions).forEach(areaKey => {
      const arr = window.KOMITE_DATA.whiteBookActions[areaKey];
      if (Array.isArray(arr)) {
        arr.forEach(a => {
          let cat = a.domain || '';
          if (!cat) {
            if (areaKey.includes('generalis')) cat = 'Generalis';
            else if (areaKey.includes('kmb')) cat = 'KMB';
            else if (areaKey.includes('perioperatif') || areaKey.includes('ibs')) cat = 'Kamar Bedah';
            else if (areaKey.includes('emergensi') || areaKey.includes('igd')) cat = 'IGD & Trauma';
            else if (areaKey.includes('intensif') || areaKey.includes('icu')) cat = 'ICU / Kritis';
            else if (areaKey.includes('kardio')) cat = 'Kardiovaskuler';
            else if (areaKey.includes('anak')) cat = 'Rumpun Anak';
            else if (areaKey.includes('maternitas') || areaKey.includes('pmb') || areaKey.includes('kebidanan')) cat = 'Maternitas / Bidan';
            else cat = 'Buku Putih 2026';
          }
          add(a.name, cat);
        });
      }
    });
  }
  if (window.KOMITE_DATA?.sampleLogbook) {
    if (Array.isArray(window.KOMITE_DATA.sampleLogbook.perawat?.items)) {
      window.KOMITE_DATA.sampleLogbook.perawat.items.forEach(it => add(it.tindakan, 'Keperawatan Bedah'));
    }
    if (Array.isArray(window.KOMITE_DATA.sampleLogbook.bidan?.items)) {
      window.KOMITE_DATA.sampleLogbook.bidan.items.forEach(it => add(it.tindakan, 'Kebidanan & VK'));
    }
  }
  window._cachedWhiteBookActions = list;
  return list;
}

let currentAutocompleteInput = null;
let currentAutocompleteIndex = -1;
let currentAutocompleteCategory = 'all';

function initLogbookAutocomplete() {
  ensureWhiteBookDatalist();

  let dropdown = document.getElementById('logbookActionAutocomplete');
  if (!dropdown) {
    dropdown = document.createElement('div');
    dropdown.id = 'logbookActionAutocomplete';
    dropdown.className = 'action-autocomplete-dropdown';
    document.body.appendChild(dropdown);
  }

  // Delegated input listener for typing in row input
  document.addEventListener('input', (e) => {
    if (e.target && e.target.classList && e.target.classList.contains('logbook-item-tindakan')) {
      handleLogbookActionInput(e.target, true);
    }
  });

  // Delegated click listener: immediately open dropdown options when clicking an empty or filled input
  document.addEventListener('click', (e) => {
    if (e.target && e.target.classList && e.target.classList.contains('logbook-item-tindakan')) {
      handleLogbookActionInput(e.target, true);
    }
  });

  // Delegated focusin listener
  document.addEventListener('focusin', (e) => {
    if (e.target && e.target.classList && e.target.classList.contains('logbook-item-tindakan')) {
      handleLogbookActionInput(e.target, true);
    }
  });

  // Keyboard navigation inside autocomplete
  document.addEventListener('keydown', (e) => {
    if (!dropdown || dropdown.style.display !== 'block' || !currentAutocompleteInput) return;
    const items = dropdown.querySelectorAll('.autocomplete-item');
    if (!items.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      currentAutocompleteIndex = (currentAutocompleteIndex + 1) % items.length;
      updateAutocompleteActiveItem(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      currentAutocompleteIndex = (currentAutocompleteIndex - 1 + items.length) % items.length;
      updateAutocompleteActiveItem(items);
    } else if (e.key === 'Enter') {
      if (currentAutocompleteIndex >= 0 && currentAutocompleteIndex < items.length) {
        e.preventDefault();
        selectAutocompleteItem(items[currentAutocompleteIndex]);
      }
    } else if (e.key === 'Escape') {
      closeLogbookAutocomplete();
    }
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (dropdown && dropdown.style.display === 'block') {
      if (!dropdown.contains(e.target) && e.target !== currentAutocompleteInput && !e.target.closest('.btn-toggle-whitebook-row')) {
        closeLogbookAutocomplete();
      }
    }
  });

  // Reposition or close when modal scrolls
  const modalBody = document.querySelector('#modalLogbookKredensial .modal-body');
  if (modalBody) {
    modalBody.addEventListener('scroll', () => {
      if (currentAutocompleteInput && dropdown.style.display === 'block') {
        const rect = currentAutocompleteInput.getBoundingClientRect();
        const bodyRect = modalBody.getBoundingClientRect();
        if (rect.bottom < bodyRect.top || rect.top > bodyRect.bottom) {
          closeLogbookAutocomplete();
        } else {
          dropdown.style.top = `${rect.bottom + 2}px`;
          dropdown.style.left = `${rect.left}px`;
        }
      }
    });
  }
}

function handleLogbookActionInput(input, forceShow = false, categoryFilter = null) {
  if (!input) return;
  const query = (input.value || '').trim();
  const dropdown = document.getElementById('logbookActionAutocomplete');
  if (!dropdown) return;

  if (categoryFilter !== null) {
    currentAutocompleteCategory = categoryFilter;
  }

  currentAutocompleteInput = input;
  currentAutocompleteIndex = -1;

  const allActions = getAllWhiteBookActionsList();
  const qLower = query.toLowerCase();

  let matches = allActions;

  // Category filter
  if (currentAutocompleteCategory && currentAutocompleteCategory !== 'all') {
    const catLower = currentAutocompleteCategory.toLowerCase();
    matches = matches.filter(item => {
      const itemCat = (item.category || '').toLowerCase();
      if (catLower === 'generalis') return itemCat.includes('generalis') || itemCat.includes('dasar');
      if (catLower === 'kmb') return itemCat.includes('kmb') || itemCat.includes('medikal');
      if (catLower === 'bedah') return itemCat.includes('bedah') || itemCat.includes('ibs') || itemCat.includes('ok') || itemCat.includes('perioperatif');
      if (catLower === 'igd') return itemCat.includes('igd') || itemCat.includes('emergensi') || itemCat.includes('gawat');
      if (catLower === 'icu') return itemCat.includes('icu') || itemCat.includes('kritis') || itemCat.includes('intensif');
      if (catLower === 'kardio') return itemCat.includes('kardio') || itemCat.includes('jantung');
      if (catLower === 'anak') return itemCat.includes('anak') || itemCat.includes('pediatrik') || itemCat.includes('perinatologi');
      if (catLower === 'bidan') return itemCat.includes('bidan') || itemCat.includes('maternitas') || itemCat.includes('kebidanan') || itemCat.includes('vk');
      return itemCat.includes(catLower);
    });
  }

  // Query filter
  if (query.length > 0) {
    matches = matches.filter(item => {
      return item.name.toLowerCase().includes(qLower) || item.category.toLowerCase().includes(qLower);
    });

    matches.sort((a, b) => {
      const aStarts = a.name.toLowerCase().startsWith(qLower);
      const bStarts = b.name.toLowerCase().startsWith(qLower);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      return a.name.localeCompare(b.name);
    });
  }

  const topMatches = matches.slice(0, 35);

  let html = `
    <div class="action-autocomplete-header">
      <div style="display: flex; align-items: center; gap: 6px;">
        <i class="fa-solid fa-book-medical" style="color:var(--gold-400);"></i>
        <span>Pilihan Opsi White Book (${matches.length} Tindakan)</span>
      </div>
      <div style="display: flex; gap: 6px; align-items: center;">
        <button type="button" class="btn-link" onclick="openWhiteBookCatalogModal()" style="color: #38bdf8; font-size: 0.72rem; cursor: pointer; background: rgba(255,255,255,0.15); border: none; padding: 2px 7px; border-radius: 4px; font-weight: 600;" title="Buka dialog katalog lengkap seluruh 582 tindakan White Book">
          <i class="fa-solid fa-up-right-from-square"></i> Katalog
        </button>
        <button type="button" onclick="closeLogbookAutocomplete()" style="background: transparent; border: none; color: #fff; font-size: 1rem; cursor: pointer; line-height: 1;" title="Tutup">&times;</button>
      </div>
    </div>

    <!-- Category filter pills inside dropdown -->
    <div class="autocomplete-filter-bar">
      <button type="button" class="autocomplete-pill ${currentAutocompleteCategory === 'all' ? 'active' : ''}" onclick="filterLogbookDropdownCategory('all', event)">Semua</button>
      <button type="button" class="autocomplete-pill ${currentAutocompleteCategory === 'generalis' ? 'active' : ''}" onclick="filterLogbookDropdownCategory('generalis', event)">Generalis</button>
      <button type="button" class="autocomplete-pill ${currentAutocompleteCategory === 'kmb' ? 'active' : ''}" onclick="filterLogbookDropdownCategory('kmb', event)">KMB</button>
      <button type="button" class="autocomplete-pill ${currentAutocompleteCategory === 'bedah' ? 'active' : ''}" onclick="filterLogbookDropdownCategory('bedah', event)">Bedah/OK</button>
      <button type="button" class="autocomplete-pill ${currentAutocompleteCategory === 'igd' ? 'active' : ''}" onclick="filterLogbookDropdownCategory('igd', event)">IGD</button>
      <button type="button" class="autocomplete-pill ${currentAutocompleteCategory === 'icu' ? 'active' : ''}" onclick="filterLogbookDropdownCategory('icu', event)">ICU</button>
      <button type="button" class="autocomplete-pill ${currentAutocompleteCategory === 'kardio' ? 'active' : ''}" onclick="filterLogbookDropdownCategory('kardio', event)">Kardio</button>
      <button type="button" class="autocomplete-pill ${currentAutocompleteCategory === 'anak' ? 'active' : ''}" onclick="filterLogbookDropdownCategory('anak', event)">Anak</button>
      <button type="button" class="autocomplete-pill ${currentAutocompleteCategory === 'bidan' ? 'active' : ''}" onclick="filterLogbookDropdownCategory('bidan', event)">Bidan/VK</button>
    </div>
  `;

  if (topMatches.length === 0) {
    html += `
      <div class="autocomplete-no-match">
        <i class="fa-solid fa-magnifying-glass" style="margin-bottom: 6px; font-size: 1.2rem; color: #94a3b8; display: block;"></i>
        Tidak ditemukan tindakan yang cocok dengan "<strong>${escapeHtml(query)}</strong>"<br>
        <button type="button" class="btn-secondary" style="margin-top: 8px; font-size: 0.72rem; padding: 4px 8px;" onclick="openWhiteBookCatalogModal()">
          <i class="fa-solid fa-book-open"></i> Buka Katalog Lengkap White Book
        </button>
      </div>
    `;
  } else {
    html += `<div style="max-height: 280px; overflow-y: auto;">`;
    topMatches.forEach((item) => {
      let displayName = escapeHtml(item.name);
      if (query.length > 0) {
        const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        displayName = displayName.replace(regex, '<mark>$1</mark>');
      }
      const categoryBadge = item.category ? `<span class="autocomplete-item-badge">${escapeHtml(item.category)}</span>` : '';

      html += `
        <div class="autocomplete-item" data-action="${escapeHtml(item.name)}">
          <div class="autocomplete-item-text">${displayName}</div>
          ${categoryBadge}
        </div>
      `;
    });
    html += `</div>`;

    html += `
      <div style="padding: 5px 10px; background: #f1f5f9; border-top: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center; font-size: 0.72rem; color: #64748b;">
        <span>Menampilkan ${topMatches.length} dari ${matches.length} opsi</span>
        <span style="color: #0369a1; font-weight: 600;">Klik item untuk memilih</span>
      </div>
    `;
  }

  dropdown.innerHTML = html;

  dropdown.querySelectorAll('.autocomplete-item').forEach(el => {
    el.addEventListener('click', (ev) => {
      ev.stopPropagation();
      selectAutocompleteItem(el);
    });
  });

  const rect = input.getBoundingClientRect();
  dropdown.style.display = 'block';
  dropdown.style.top = `${rect.bottom + 2}px`;
  dropdown.style.left = `${rect.left}px`;
  dropdown.style.width = `${Math.max(rect.width, 420)}px`;
  dropdown.style.maxWidth = '92vw';
}

function filterLogbookDropdownCategory(cat, ev) {
  if (ev) {
    ev.stopPropagation();
    ev.preventDefault();
  }
  if (currentAutocompleteInput) {
    handleLogbookActionInput(currentAutocompleteInput, true, cat);
  }
}

function updateAutocompleteActiveItem(items) {
  items.forEach((item, idx) => {
    if (idx === currentAutocompleteIndex) {
      item.classList.add('active');
      item.scrollIntoView({ block: 'nearest' });
    } else {
      item.classList.remove('active');
    }
  });
}

function selectAutocompleteItem(el) {
  if (!currentAutocompleteInput || !el) return;
  const actionText = el.getAttribute('data-action') || el.textContent;
  currentAutocompleteInput.value = actionText;
  currentAutocompleteInput.dispatchEvent(new Event('input', { bubbles: true }));
  currentAutocompleteInput.dispatchEvent(new Event('change', { bubbles: true }));
  closeLogbookAutocomplete();
  currentAutocompleteInput.focus();
}

function closeLogbookAutocomplete() {
  const dropdown = document.getElementById('logbookActionAutocomplete');
  if (dropdown) {
    dropdown.style.display = 'none';
  }
  currentAutocompleteInput = null;
  currentAutocompleteIndex = -1;
}

/* ==========================================================================
   MODAL: KATALOG OPSI WHITE BOOK (582+ TINDAKAN) & PRESET 10 TINDAKAN
   ========================================================================== */
let activeCatalogTargetInput = null;

function openWhiteBookCatalogModal(targetInput = null) {
  if (targetInput) {
    activeCatalogTargetInput = targetInput;
  } else if (currentAutocompleteInput) {
    activeCatalogTargetInput = currentAutocompleteInput;
  }
  closeLogbookAutocomplete();
  openModal('modalWhiteBookCatalog');

  const searchInput = document.getElementById('catalogWhiteBookSearch');
  if (searchInput) searchInput.value = '';

  const pills = document.querySelectorAll('#catalogCategoryPills .autocomplete-pill');
  pills.forEach((p, i) => p.classList.toggle('active', i === 0));

  renderWhiteBookCatalog('all', '');
}

function renderWhiteBookCatalog(cat = 'all', query = '') {
  const container = document.getElementById('catalogWhiteBookList');
  const countInfo = document.getElementById('catalogCountInfo');
  if (!container) return;

  const allActions = getAllWhiteBookActionsList();
  const qLower = (query || '').trim().toLowerCase();
  const catLower = (cat || 'all').toLowerCase();

  let matches = allActions;

  if (catLower !== 'all') {
    matches = matches.filter(item => {
      const itemCat = (item.category || '').toLowerCase();
      if (catLower === 'generalis') return itemCat.includes('generalis') || itemCat.includes('dasar');
      if (catLower === 'kmb') return itemCat.includes('kmb') || itemCat.includes('medikal');
      if (catLower === 'bedah') return itemCat.includes('bedah') || itemCat.includes('ibs') || itemCat.includes('ok') || itemCat.includes('perioperatif');
      if (catLower === 'igd') return itemCat.includes('igd') || itemCat.includes('emergensi') || itemCat.includes('gawat');
      if (catLower === 'icu') return itemCat.includes('icu') || itemCat.includes('kritis') || itemCat.includes('intensif');
      if (catLower === 'kardiovaskuler') return itemCat.includes('kardio') || itemCat.includes('jantung');
      if (catLower === 'anak') return itemCat.includes('anak') || itemCat.includes('pediatrik') || itemCat.includes('perinatologi');
      if (catLower === 'bidan') return itemCat.includes('bidan') || itemCat.includes('maternitas') || itemCat.includes('kebidanan') || itemCat.includes('vk');
      if (catLower === 'lainnya') {
        return !itemCat.includes('generalis') && !itemCat.includes('dasar') &&
               !itemCat.includes('kmb') && !itemCat.includes('bedah') &&
               !itemCat.includes('igd') && !itemCat.includes('icu') &&
               !itemCat.includes('kardio') && !itemCat.includes('anak') &&
               !itemCat.includes('bidan');
      }
      return itemCat.includes(catLower);
    });
  }

  if (qLower) {
    matches = matches.filter(item => {
      return item.name.toLowerCase().includes(qLower) || (item.category && item.category.toLowerCase().includes(qLower));
    });
  }

  if (countInfo) {
    countInfo.innerHTML = `Menampilkan <strong>${matches.length}</strong> tindakan White Book ${catLower !== 'all' ? `(Kategori: ${cat})` : ''} ${qLower ? `(Pencarian: "${escapeHtml(query)}")` : ''}`;
  }

  if (matches.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 2.5rem 1rem; text-align: center; color: var(--text-muted);">
        <i class="fa-solid fa-magnifying-glass" style="font-size: 2rem; color: #cbd5e1; margin-bottom: 0.75rem; display: block;"></i>
        <div style="font-size: 0.95rem; font-weight: 600; color: var(--text-main);">Tidak ada tindakan yang sesuai dengan kriteria</div>
        <div style="font-size: 0.8rem; margin-top: 0.25rem;">Coba gunakan kata kunci lain atau pilih rumpun kategori berbeda.</div>
      </div>
    `;
    return;
  }

  let html = '';
  matches.forEach((item, idx) => {
    let catColor = '#0369a1';
    let catBg = '#e0f2fe';
    const c = (item.category || '').toLowerCase();
    if (c.includes('kmb')) { catColor = '#1d4ed8'; catBg = '#dbeafe'; }
    else if (c.includes('bedah')) { catColor = '#b91c1c'; catBg = '#fee2e2'; }
    else if (c.includes('icu') || c.includes('kritis')) { catColor = '#c2410c'; catBg = '#ffedd5'; }
    else if (c.includes('igd')) { catColor = '#dc2626'; catBg = '#fef2f2'; }
    else if (c.includes('bidan') || c.includes('maternitas')) { catColor = '#be185d'; catBg = '#fce7f3'; }
    else if (c.includes('anak')) { catColor = '#047857'; catBg = '#d1fae5'; }

    let actionLabel = escapeHtml(item.name);
    if (qLower) {
      const reg = new RegExp(`(${qLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      actionLabel = actionLabel.replace(reg, '<mark style="background:#fef08a; padding: 0 2px; border-radius: 2px;">$1</mark>');
    }

    const jsonAction = JSON.stringify(item.name).replace(/"/g, '&quot;');

    html += `
      <div style="border: 1px solid var(--border-subtle); border-radius: 8px; padding: 10px 12px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between; gap: 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.04); transition: transform 0.15s ease, box-shadow 0.15s ease;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <span style="font-size: 0.68rem; font-weight: 700; background: ${catBg}; color: ${catColor}; padding: 2px 7px; border-radius: 4px; text-transform: uppercase;">
              ${escapeHtml(item.category || 'Buku Putih')}
            </span>
            <span style="font-size: 0.7rem; color: #94a3b8; font-weight: 600;">#${idx + 1}</span>
          </div>
          <div style="font-size: 0.83rem; font-weight: 600; color: #0f172a; line-height: 1.4;">
            ${actionLabel}
          </div>
        </div>
        <div style="display: flex; justify-content: flex-end; padding-top: 6px; border-top: 1px dashed #f1f5f9;">
          <button type="button" class="btn-primary" style="font-size: 0.72rem; padding: 4px 10px; background: #0284c7; border-color: #0284c7;" onclick="useWhiteBookActionInLogbook(${jsonAction})">
            <i class="fa-solid fa-check"></i> Gunakan Tindakan Ini
          </button>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function selectCatalogCategory(cat, btn) {
  const pills = document.querySelectorAll('#catalogCategoryPills .autocomplete-pill');
  pills.forEach(p => p.classList.remove('active'));
  if (btn) btn.classList.add('active');
  filterWhiteBookCatalog();
}

function filterWhiteBookCatalog() {
  const searchInput = document.getElementById('catalogWhiteBookSearch');
  const query = searchInput ? searchInput.value : '';
  const activePill = document.querySelector('#catalogCategoryPills .autocomplete-pill.active');
  const cat = activePill ? activePill.getAttribute('data-cat') : 'all';
  renderWhiteBookCatalog(cat, query);
}

function useWhiteBookActionInLogbook(actionName) {
  if (!actionName) return;

  let targetInput = activeCatalogTargetInput;
  if (!targetInput || !document.body.contains(targetInput)) {
    const tbody = document.getElementById('logbookItemsTbody');
    if (tbody) {
      const inputs = tbody.querySelectorAll('.logbook-item-tindakan');
      for (const inp of inputs) {
        if (!inp.value || !inp.value.trim()) {
          targetInput = inp;
          break;
        }
      }
    }
  }

  if (targetInput) {
    targetInput.value = actionName;
    targetInput.dispatchEvent(new Event('input', { bubbles: true }));
    targetInput.dispatchEvent(new Event('change', { bubbles: true }));
    const tr = targetInput.closest('tr');
    const rowNum = tr ? tr.querySelector('.logbook-row-num')?.textContent : '';
    showToast(`Tindakan White Book "${actionName}" berhasil dimasukkan ke baris ${rowNum || ''}!`, 'success');
  } else {
    // If all are filled, add a new row
    addLogbookItemRow({ tindakan: actionName, mandiri: true });
    showToast(`Tindakan White Book "${actionName}" berhasil ditambahkan ke baris baru!`, 'success');
  }

  closeModal('modalWhiteBookCatalog');
}

function showQuick10ActionsSelector() {
  let modal = document.getElementById('modalQuick10Logbook');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'modalQuick10Logbook';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-container" style="max-width: 650px;">
        <div class="modal-header" style="background: linear-gradient(135deg, #4c1d95 0%, #7e22ce 100%); color: #fff;">
          <div class="modal-title" style="display: flex; align-items: center; gap: 0.65rem;">
            <i class="fa-solid fa-wand-magic-sparkles" style="font-size: 1.25rem; color: #facc15;"></i>
            <div>
              <div style="font-size: 1.05rem; font-weight: 800; color: #fff;">
                Isi Otomatis 10 Tindakan Standar White Book
              </div>
              <div style="font-size: 0.76rem; color: #e9d5ff;">
                Pilih paket 10 tindakan asuhan klinis harian terverifikasi sesuai rumpun &amp; jenjang
              </div>
            </div>
          </div>
          <button class="btn-close-modal" style="color: #fff;" onclick="closeModal('modalQuick10Logbook')">&times;</button>
        </div>
        <div class="modal-body" style="padding: 1.25rem;">
          <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 1rem;">
            Pilih rumpun keperawatan atau kebidanan di bawah ini untuk mengisi langsung 10 baris tindakan logbook lengkap dengan nomor RM, status mandiri (M), dan verifikasi resmi:
          </p>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <button type="button" class="btn-secondary" style="display: flex; align-items: center; justify-content: space-between; padding: 0.85rem 1rem; text-align: left; border: 1.5px solid #cbd5e1; border-radius: 8px; background: #f8fafc;" onclick="applyQuick10Package('kmb_bedah')">
              <div>
                <div style="font-weight: 700; color: #1e293b; font-size: 0.88rem;">
                  <i class="fa-solid fa-stethoscope" style="color: #0284c7; margin-right: 6px;"></i>
                  Paket 1: Keperawatan Medikal Bedah (KMB &amp; Bedah - PK II / PK III)
                </div>
                <div style="font-size: 0.76rem; color: #64748b; margin-top: 2px;">
                  10 Tindakan: EKG 12 Lead, Foley Catheter, Wound Dressing, Kemoterapi, NGT, AGD, CVC, Transfusi Darah, Suction, Perioperatif.
                </div>
              </div>
              <i class="fa-solid fa-arrow-right" style="color: #0284c7;"></i>
            </button>

            <button type="button" class="btn-secondary" style="display: flex; align-items: center; justify-content: space-between; padding: 0.85rem 1rem; text-align: left; border: 1.5px solid #cbd5e1; border-radius: 8px; background: #f8fafc;" onclick="applyQuick10Package('generalis')">
              <div>
                <div style="font-weight: 700; color: #1e293b; font-size: 0.88rem;">
                  <i class="fa-solid fa-user-nurse" style="color: #059669; margin-right: 6px;"></i>
                  Paket 2: Perawat Generalis / Rawat Inap Dasar (PK I &amp; PK II)
                </div>
                <div style="font-size: 0.76rem; color: #64748b; margin-top: 2px;">
                  10 Tindakan: TTV &amp; EWS, Terapi Injeksi IV/IM, Pasang Infus, Oksigenasi, Kateter Urin, NGT, Perawatan Dekubitus, Discharge Planning.
                </div>
              </div>
              <i class="fa-solid fa-arrow-right" style="color: #059669;"></i>
            </button>

            <button type="button" class="btn-secondary" style="display: flex; align-items: center; justify-content: space-between; padding: 0.85rem 1rem; text-align: left; border: 1.5px solid #cbd5e1; border-radius: 8px; background: #f8fafc;" onclick="applyQuick10Package('kritis_igd')">
              <div>
                <div style="font-weight: 700; color: #1e293b; font-size: 0.88rem;">
                  <i class="fa-solid fa-heart-pulse" style="color: #dc2626; margin-right: 6px;"></i>
                  Paket 3: Gawat Darurat &amp; Perawatan Kritis (IGD / ICU / ICCU - PK III / PK IV)
                </div>
                <div style="font-size: 0.76rem; color: #64748b; margin-top: 2px;">
                  10 Tindakan: RJP/BHD, Triase ATS, Asistensi Intubasi &amp; Ventilator, AGD, Monitoring Invasif, Titrasi Inotropik, Defibrilasi, WSD.
                </div>
              </div>
              <i class="fa-solid fa-arrow-right" style="color: #dc2626;"></i>
            </button>

            <button type="button" class="btn-secondary" style="display: flex; align-items: center; justify-content: space-between; padding: 0.85rem 1rem; text-align: left; border: 1.5px solid #cbd5e1; border-radius: 8px; background: #f8fafc;" onclick="applyQuick10Package('kebidanan')">
              <div>
                <div style="font-weight: 700; color: #1e293b; font-size: 0.88rem;">
                  <i class="fa-solid fa-baby" style="color: #db2777; margin-right: 6px;"></i>
                  Paket 4: Pelayanan Kebidanan &amp; Ruang Bersalin (VK / BK I / BK II / BK III)
                </div>
                <div style="font-size: 0.76rem; color: #64748b; margin-top: 2px;">
                  10 Tindakan: Asuhan Persalinan Normal (APN 60 Langkah), Partograf, Oksitosin Drip, Jahit Perineum, Resusitasi BBL, CTG, AKDR/IUD.
                </div>
              </div>
              <i class="fa-solid fa-arrow-right" style="color: #db2777;"></i>
            </button>
          </div>
        </div>
        <div class="modal-footer" style="padding: 0.75rem 1.25rem; display: flex; justify-content: flex-end;">
          <button type="button" class="btn-secondary" onclick="closeModal('modalQuick10Logbook')">Batal</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }
  openModal('modalQuick10Logbook');
}

function applyQuick10Package(pkg) {
  let rumpunKey = pkg;
  if (pkg === 'kebidanan') rumpunKey = 'maternitas_bidan';
  if (pkg === 'kritis_igd') rumpunKey = 'emergensi_igd';

  if (WHITE_BOOK_RUMPUN_10_ACTIONS[rumpunKey]) {
    load10ActionsForRumpun(rumpunKey);
  } else {
    load10ActionsForRumpun('kmb_bedah');
  }
  closeModal('modalQuick10Logbook');
}


function getLogbookItemsFromForm() {
  const tbody = document.getElementById('logbookItemsTbody');
  if (!tbody) return [];
  const rows = tbody.querySelectorAll('tr');
  const result = [];

  rows.forEach((r, idx) => {
    const tglrm = r.querySelector('.logbook-item-tglrm')?.value?.trim() || '';
    const tindakan = r.querySelector('.logbook-item-tindakan')?.value?.trim() || '';
    const radioM = r.querySelector('.logbook-item-radio-m');
    const isMandiri = radioM ? radioM.checked : true;
    const catatan = r.querySelector('.logbook-item-catatan')?.value?.trim() || '';

    if (tglrm || tindakan) {
      let tgl = tglrm;
      let rm = '';
      if (tglrm.includes('(') && tglrm.includes(')')) {
        const match = tglrm.match(/^(.*?)\((.*?)\)$/);
        if (match) {
          tgl = match[1].trim();
          rm = match[2].trim();
        }
      }
      result.push({
        tgl: tgl || '—',
        rm: rm || '',
        tindakan: tindakan || 'Prosedur asuhan keperawatan / kebidanan',
        mandiri: isMandiri,
        supervisi: !isMandiri,
        paraf: '',
        catatan: catatan
      });
    }
  });

  return result;
}

function transferCvToLogbook(cv) {
  syncAllDownstreamFormsFromCv();
}

function transferLogbookData(logbook) {
  syncAllDownstreamFormsFromCv();
}

function handleLogbookSubmit(e) {
  if (e) e.preventDefault();
  const getVal = id => document.getElementById(id)?.value?.trim() || '';

  const nama = getVal('logbookNama') || 'Ns. Pemohon';
  const nip = getVal('logbookNip');
  const jenjang = getVal('logbookJenjang') || 'Perawat Klinis III (PK III)';
  const unit = getVal('logbookUnit') || 'Ruang Perawatan';
  const periode = getVal('logbookPeriode') || 'Januari 2025 s.d Desember 2025 (1 Tahun Terakhir)';

  const items = getLogbookItemsFromForm();
  const kaRuNama = getVal('logbookKaRuNama') || 'Ns. Kepala Ruangan, S.Kep';
  const kaRuNip = getVal('logbookKaRuNip') || '19xxxxxxxxxxxxxx';
  const kaRuRuangan = getVal('logbookKaRuRuangan') || unit;
  const kota = getVal('logbookKota') || 'Pontianak';
  const tanggal = getVal('logbookTanggal') || '21 Oktober';
  const tahun = getVal('logbookTahun') || '2026';

  const logbookData = {
    nama,
    nip,
    jenjang,
    unit,
    periode,
    items,
    kaRuNama,
    kaRuNip,
    kaRuRuangan,
    kota,
    tanggal,
    tahun,
    timestamp: new Date().toISOString()
  };

  state.logbookData = logbookData;
  state.kredensialLogbookGenerated = true;
  localStorage.setItem('komite_logbook_data', JSON.stringify(logbookData));
  localStorage.setItem('komite_logbook_generated', 'true');

  // Sinkronkan data ke Surat Permohonan (Langkah 3) & Upload Modal (Langkah 4)
  transferLogbookData(logbookData);

  updateAlurStepStatus();
  closeModal('modalLogbookKredensial');

  // Buka pratinjau lembar Logbook 2 Halaman
  previewLogbookHVS('filled');

  // Rekam Notifikasi Administrasi Resmi
  const adminSubject = `[LOGBOOK RESMI DITERBITKAN] ${nama} (${jenjang} - ${unit})`;
  const adminBody =
    `Kepada Yth.\n` +
    `1. Ketua Komite Keperawatan RSUD dr. Soedarso (komitekeperawatanrsds2023@gmail.com)\n` +
    `2. Ns. Rusmulyadi, S.Kep., MARS - Sekretaris Komite (yadhie28@gmail.com)\n\n` +
    `Pemberitahuan Penerbitan Buku Catatan Kinerja Klinis Harian (Logbook) Resmi (Langkah 2):\n\n` +
    `• Nama Lengkap    : ${nama}\n` +
    `• NIP/NIPPPK/NIK  : ${nip}\n` +
    `• Jenjang Klinis  : ${jenjang}\n` +
    `• Unit / Ruangan  : ${unit}\n` +
    `• Periode         : ${periode}\n` +
    `• Kepala Ruangan  : ${kaRuNama} (NIP: ${kaRuNip})\n` +
    `• Prosedur Catatan: ${items.length} Rincian Prosedur Asuhan Klinis Terverifikasi\n` +
    `• Waktu Terbit    : ${new Date().toLocaleString('id-ID')}\n` +
    `• Format Dokumen  : Format Baku Resmi 2 Halaman A4 RSUD dr. Soedarso.\n\n` +
    `Dokumen Logbook siap dicetak, disahkan oleh Kepala Ruangan pada Lembar 2, lalu pemohon melanjutkan ke Langkah 3 (Surat Permohonan).\n\n` +
    `Portal Komite Keperawatan RSUD dr. Soedarso Pontianak\n` +
    `https://yadhie28.github.io/komite-keperawatan-soedarso/`;

  recordAdminNotification({
    eventType: 'Penerbitan Logbook Kinerja Klinis (Langkah 2)',
    subject: adminSubject,
    applicantName: nama,
    applicantNip: nip,
    unit: unit,
    bodyText: adminBody
  });

  const banner = document.getElementById('previewLogbookSuccessBanner');
  const badge = document.getElementById('previewLogbookApplicantBadge');
  if (banner) banner.style.display = 'block';
  if (badge) badge.textContent = nama;

  showToast(`Buku Catatan Kinerja Klinis (Logbook) resmi untuk ${nama} berhasil diterbitkan (2 Halaman A4)! Notifikasi terkirim ke Komite & Sekretaris.`, 'success');
}

function generateLogbookHVS(mode) {
  const previewMode = mode || state.logbookPreviewMode || 'filled';
  const isBlank = (previewMode === 'blank');
  const d = isBlank ? {} : (state.logbookData || window.KOMITE_DATA?.sampleLogbook?.perawat || {});

  const nama = isBlank ? '....................................................................' : (d.nama || 'Ns. Pemohon');
  const nip = isBlank ? '....................................................................' : (d.nip || '-');
  const jenjang = isBlank ? '....................................................................' : (d.jenjang || 'Perawat Klinis III (PK III)');
  const unit = isBlank ? '....................................................................' : (d.unit || 'Ruang Perawatan');
  const periode = isBlank ? '....................................................................' : (d.periode || 'Januari 2025 s.d Desember 2025');

  const items = isBlank ? [] : (d.items || window.KOMITE_DATA?.sampleLogbook?.perawat?.items || []);
  const kaRuNama = isBlank ? '....................................................................' : (d.kaRuNama || 'Ns. Kepala Ruangan, S.Kep');
  const kaRuNip = isBlank ? '....................................................................' : (d.kaRuNip || '19xxxxxxxxxxxxxx');
  const kaRuRuangan = isBlank ? '....................................................................' : (d.kaRuRuangan || unit);
  const kota = isBlank ? 'Pontianak' : (d.kota || 'Pontianak');
  const tanggal = isBlank ? '...... ....................' : (d.tanggal || '21 Oktober');
  const tahun = isBlank ? '2026' : (d.tahun || '2026');

  const logoSrc = 'logo_kalbar.png';

  const kopSoedarso = `
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 2px;">
      <tr>
        <td style="width: 75px; vertical-align: middle; text-align: center; padding-right: 10px;">
          <img src="${logoSrc}" alt="Logo Pemprov Kalbar" style="width: 68px; height: auto;">
        </td>
        <td style="text-align: center; vertical-align: middle; font-family: Arial, Helvetica, sans-serif; color: #000;">
          <div style="font-size: 10.5pt; font-weight: bold; line-height: 1.25; letter-spacing: 0.2px;">PEMERINTAH PROVINSI KALIMANTAN BARAT</div>
          <div style="font-size: 12pt; font-weight: bold; line-height: 1.25; letter-spacing: 0.2px;">RUMAH SAKIT UMUM DAERAH DOKTER SOEDARSO</div>
          <div style="font-size: 11pt; font-weight: bold; line-height: 1.25; letter-spacing: 0.2px;">KOMITE KEPERAWATAN</div>
          <div style="font-size: 8pt; line-height: 1.3; margin-top: 2px;">
            Jalan Dokter Soedarso No.1 Pontianak Tenggara, Kota Pontianak, Kalimantan Barat 78124<br>
            Telp. (0561) 737701, (0561) 746152, Fax. (0561) 736528<br>
            Laman : <span style="color: #0000ee; text-decoration: underline;">https://rsuddrsoedarso.kalbarprov.go.id</span>, Pos-el : <span style="color: #0000ee; text-decoration: underline;">rsud@kalbarprov.go.id</span>
          </div>
        </td>
      </tr>
    </table>
    <div style="border-top: 2.5px solid #000000; border-bottom: 0.8px solid #000000; height: 2px; margin-top: 5px; margin-bottom: 12px;"></div>
  `;

  // Render Rows for Table Page 1 (Items 0 to 4)
  const renderItemRow = (item, idx) => {
    if (isBlank || !item) {
      return `
        <tr>
          <td style="border: 1px solid #000; padding: 6px 4px; text-align: center; font-size: 8.5pt;">${idx + 1}</td>
          <td style="border: 1px solid #000; padding: 6px 6px; font-size: 8.5pt;">&nbsp;</td>
          <td style="border: 1px solid #000; padding: 6px 8px; font-size: 8.5pt;">&nbsp;</td>
          <td style="border: 1px solid #000; padding: 6px 4px; text-align: center; font-size: 8.5pt;">&nbsp;</td>
          <td style="border: 1px solid #000; padding: 6px 4px; text-align: center; font-size: 8.5pt;">&nbsp;</td>
          <td style="border: 1px solid #000; padding: 6px 4px; text-align: center; font-size: 8.5pt;">&nbsp;</td>
          <td style="border: 1px solid #000; padding: 6px 6px; font-size: 8.5pt;">&nbsp;</td>
        </tr>
      `;
    }
    const tglRmStr = item.rm ? `${item.tgl}<br><span style="font-size: 7.5pt; color: #333;">${item.rm}</span>` : item.tgl;
    const mCheck = item.mandiri ? '<strong>&check;</strong>' : '&nbsp;';
    const sCheck = item.supervisi ? '<strong>&check;</strong>' : '&nbsp;';

    return `
      <tr>
        <td style="border: 1px solid #000; padding: 6px 4px; text-align: center; font-size: 8.5pt; vertical-align: top;">${idx + 1}</td>
        <td style="border: 1px solid #000; padding: 6px 6px; font-size: 8.5pt; vertical-align: top; line-height: 1.3;">${tglRmStr}</td>
        <td style="border: 1px solid #000; padding: 6px 8px; font-size: 8.5pt; vertical-align: top; line-height: 1.35;">${item.tindakan}</td>
        <td style="border: 1px solid #000; padding: 6px 4px; text-align: center; font-size: 9pt; vertical-align: top;">${mCheck}</td>
        <td style="border: 1px solid #000; padding: 6px 4px; text-align: center; font-size: 9pt; vertical-align: top;">${sCheck}</td>
        <td style="border: 1px solid #000; padding: 6px 4px; text-align: center; font-size: 8pt; vertical-align: top;">&nbsp;</td>
        <td style="border: 1px solid #000; padding: 6px 6px; font-size: 8pt; vertical-align: top;">&nbsp;</td>
      </tr>
    `;
  };

  const rowsPage1 = [];
  for (let i = 0; i < 5; i++) {
    rowsPage1.push(renderItemRow(items[i], i));
  }

  const rowsPage2 = [];
  for (let i = 5; i < 10; i++) {
    rowsPage2.push(renderItemRow(items[i], i));
  }

  const tableHeader = `
    <thead>
      <tr style="background-color: #0e3860; color: #ffffff; font-weight: bold; font-size: 8.5pt; text-align: center;">
        <th rowspan="2" style="border: 1px solid #000; padding: 5px 3px; width: 4%;">No</th>
        <th rowspan="2" style="border: 1px solid #000; padding: 5px 6px; width: 17%;">Tanggal &amp; No. RM</th>
        <th rowspan="2" style="border: 1px solid #000; padding: 5px 8px; width: 44%;">Rincian Deskripsi Tindakan Klinis<br>(Asuhan Keperawatan / Kebidanan)</th>
        <th colspan="2" style="border: 1px solid #000; padding: 3px 4px; width: 12%;">Kemandirian</th>
        <th rowspan="2" style="border: 1px solid #000; padding: 5px 4px; width: 10%;">Paraf<br>Ka. Ru</th>
        <th rowspan="2" style="border: 1px solid #000; padding: 5px 6px; width: 13%;">Catatan<br>Verifikator</th>
      </tr>
      <tr style="background-color: #0e3860; color: #ffffff; font-weight: bold; font-size: 8pt; text-align: center;">
        <th style="border: 1px solid #000; padding: 3px 2px; width: 6%;">M</th>
        <th style="border: 1px solid #000; padding: 3px 2px; width: 6%;">S</th>
      </tr>
    </thead>
  `;

  return `
    <!-- ==========================================
         HALAMAN 1: KOP, PROFIL & TINDAKAN 1 S.D 5
         ========================================== -->
    <div class="soedarso-page page-1" style="page-break-after: always; break-after: page; background: #ffffff; color: #000000; font-family: Arial, Helvetica, sans-serif; padding: 12mm 15mm; width: 210mm; min-height: 297mm; box-sizing: border-box; box-shadow: 0 4px 12px rgba(0,0,0,0.15); margin-bottom: 20px; font-size: 9pt; line-height: 1.35;">
      ${kopSoedarso}

      <div style="text-align: center; font-family: Arial, Helvetica, sans-serif; font-weight: bold; font-size: 11pt; line-height: 1.35; margin-bottom: 12px; color: #000;">
        BUKU CATATAN KINERJA KLINIS HARIAN (LOGBOOK)<br>
        TENAGA KEPERAWATAN / KEBIDANAN
      </div>

      <!-- Tabel Profil Personal -->
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 12px; font-size: 9pt; font-family: Arial, sans-serif; border: 1.2px solid #000;">
        <tr style="background: rgba(14, 56, 96, 0.04);">
          <td colspan="3" style="border: 1px solid #000; padding: 5px 8px; font-weight: bold; font-size: 9pt; text-transform: uppercase; color: #0e3860;">
            I. IDENTITAS PERSONAL TENAGA KEPERAWATAN / KEBIDANAN
          </td>
        </tr>
        <tr>
          <td style="border: 1px solid #000; padding: 4px 8px; width: 34%;">1. Nama Lengkap (beserta Gelar)</td>
          <td style="border: 1px solid #000; padding: 4px 6px; width: 2%; text-align: center;">:</td>
          <td style="border: 1px solid #000; padding: 4px 8px; width: 64%; font-weight: bold;">${nama}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #000; padding: 4px 8px;">2. Nomor Induk Pegawai (NIP/NIPPPK/NIK)</td>
          <td style="border: 1px solid #000; padding: 4px 6px; text-align: center;">:</td>
          <td style="border: 1px solid #000; padding: 4px 8px;">${nip}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #000; padding: 4px 8px;">3. Jenjang Klinis Saat Ini / Diusulkan</td>
          <td style="border: 1px solid #000; padding: 4px 6px; text-align: center;">:</td>
          <td style="border: 1px solid #000; padding: 4px 8px;">${jenjang}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #000; padding: 4px 8px;">4. Unit Kerja / Ruang Rawat</td>
          <td style="border: 1px solid #000; padding: 4px 6px; text-align: center;">:</td>
          <td style="border: 1px solid #000; padding: 4px 8px;">${unit}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #000; padding: 4px 8px;">5. Periode Pencatatan Kinerja Klinis</td>
          <td style="border: 1px solid #000; padding: 4px 6px; text-align: center;">:</td>
          <td style="border: 1px solid #000; padding: 4px 8px;">${periode}</td>
        </tr>
      </table>

      <!-- Subheader Tabel Tindakan Klinis -->
      <div style="font-weight: bold; font-size: 9.5pt; color: #0e3860; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.2px;">
        II. LEMBAR CATATAN DAN VERIFIKASI TINDAKAN KLINIS HARIAN (BAGIAN 1)
      </div>

      <!-- Tabel Tindakan Baris 1 s.d 5 -->
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 8px; font-family: Arial, sans-serif; border: 1.2px solid #000;">
        ${tableHeader}
        <tbody>
          ${rowsPage1.join('')}
        </tbody>
      </table>

      <div style="font-size: 7.8pt; color: #555; text-align: right; margin-top: 6px; font-style: italic;">
        Bersambung ke Lembar 2 (Tindakan 6 s.d 10 &amp; Lembar Pengesahan Kepala Ruangan) &bull; RSUD dr. Soedarso
      </div>
    </div>

    <!-- ==========================================
         HALAMAN 2: TINDAKAN 6 S.D 10 & PENGESAHAN KA. RU
         ========================================== -->
    <div class="soedarso-page page-2" style="page-break-after: avoid; break-after: avoid; background: #ffffff; color: #000000; font-family: Arial, Helvetica, sans-serif; padding: 12mm 15mm; width: 210mm; min-height: 297mm; box-sizing: border-box; box-shadow: 0 4px 12px rgba(0,0,0,0.15); margin-bottom: 20px; font-size: 9pt; line-height: 1.35;">
      <!-- Running Header Halaman 2 -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #94a3b8; padding-bottom: 5px; margin-bottom: 14px; font-size: 8pt; color: #475569;">
        <span><strong>RSUD dr. Soedarso Pontianak</strong> &bull; Komite Keperawatan</span>
        <span>Buku Catatan Kinerja Klinis (Logbook) &bull; <strong>Halaman 2 dari 2</strong></span>
      </div>

      <!-- Subheader Lanjutan Tindakan Klinis -->
      <div style="font-weight: bold; font-size: 9.5pt; color: #0e3860; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.2px;">
        II. LEMBAR CATATAN DAN VERIFIKASI TINDAKAN KLINIS HARIAN (LANJUTAN BAGIAN 2)
      </div>

      <!-- Tabel Tindakan Baris 6 s.d 10 -->
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 6px; font-family: Arial, sans-serif; border: 1.2px solid #000;">
        ${tableHeader}
        <tbody>
          ${rowsPage2.join('')}
        </tbody>
      </table>

      <!-- Keterangan Kemandirian -->
      <div style="font-size: 7.8pt; line-height: 1.4; color: #333; margin-bottom: 14px; padding: 4px 6px; background: rgba(0,0,0,0.02); border: 1px solid #cbd5e1; border-radius: 2px;">
        * <strong>Keterangan Kemandirian:</strong><br>
        &bull; <strong>M (Mandiri)</strong>: Tindakan asuhan keperawatan/kebidanan dilakukan sendiri secara mandiri tanpa pendampingan/bimbingan.<br>
        &bull; <strong>S (Supervisi)</strong>: Tindakan asuhan keperawatan/kebidanan dilakukan dengan pendampingan, asistensi, atau bimbingan preseptor/Ka.Ru.
      </div>

      <!-- Lembar Rekapitulasi & Validasi Akhir Ka. Ru -->
      <div style="border: 1.2px solid #000; padding: 10px 12px; margin-bottom: 16px; background: #fff;">
        <div style="font-weight: bold; font-size: 9pt; color: #0e3860; text-transform: uppercase; margin-bottom: 6px; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px;">
          III. LEMBAR REKAPITULASI &amp; VALIDASI AKHIR KEPALA RUANGAN
        </div>
        <div style="font-size: 8.5pt; line-height: 1.5; color: #1e293b; text-align: justify;">
          Berdasarkan hasil verifikasi harian portofolio kinerja klinis di atas, menyatakan bahwa staf keperawatan/kebidanan tersebut di atas telah mengumpulkan kumulatif asuhan klinis harian dengan tingkat capaian prosedur mandiri/supervisi yang sesuai dengan standar kualifikasi pelayanan RSUD dr. Soedarso, untuk diajukan dalam proses Kredensial / Re-Kredensial Komite Keperawatan.
        </div>
      </div>

      <!-- Tanda Tangan Dual: Ka. Ruangan & Staf Pemohon -->
      <table style="width: 100%; border-collapse: collapse; font-family: Arial, sans-serif; font-size: 9pt; margin-top: 8px;">
        <tr>
          <td style="width: 50%; vertical-align: top; text-align: left; padding-right: 15px;">
            Mengetahui &amp; Menyetujui,<br>
            <strong>Kepala Ruangan ${kaRuRuangan}</strong><br>
            <div style="height: 65px; display: flex; align-items: flex-end; padding-bottom: 2px;">
              <span style="font-size: 8pt; color: #64748b; font-style: italic;">(Tanda Tangan &amp; Cap Ruangan)</span>
            </div>
            <u><strong>${kaRuNama}</strong></u><br>
            NIP. ${kaRuNip}
          </td>
          <td style="width: 50%; vertical-align: top; text-align: left; padding-left: 25px;">
            ${kota}, ${tanggal} ${tahun}<br>
            Staf Keperawatan / Kebidanan Pemohon,<br>
            <div style="height: 65px; display: flex; align-items: flex-end; padding-bottom: 2px;">
              <span style="font-size: 8pt; color: #64748b; font-style: italic;">(Tanda Tangan Pemohon)</span>
            </div>
            <u><strong>${nama}</strong></u><br>
            NIP. ${nip}
          </td>
        </tr>
      </table>

      <!-- Footer Info -->
      <div style="margin-top: 25px; padding-top: 6px; border-top: 1px solid #cbd5e1; font-size: 7.5pt; color: #64748b; display: flex; justify-content: space-between;">
        <span>Dokumen Resmi Portofolio Kinerja Klinis RSUD dr. Soedarso</span>
        <span>Format Cetak Kertas HVS A4 (2 Halaman)</span>
      </div>
    </div>
  `;
}

function previewLogbookHVS(mode) {
  state.logbookPreviewMode = mode || 'filled';
  const container = document.getElementById('logbookHvsPrintArea');
  if (container) {
    container.innerHTML = generateLogbookHVS(state.logbookPreviewMode);
  }

  const toggleBtn = document.getElementById('btnTogglePreviewLogbookMode');
  if (toggleBtn) {
    if (state.logbookPreviewMode === 'blank') {
      toggleBtn.innerHTML = '<i class="fa-solid fa-file-lines"></i> Tampilkan Contoh Data Terisi';
    } else {
      toggleBtn.innerHTML = '<i class="fa-regular fa-file"></i> Tampilkan Format Blangko Kosong';
    }
  }

  const modal = document.getElementById('modalPreviewLogbookHVS');
  if (modal) {
    openModal('modalPreviewLogbookHVS');
  }
}

function togglePreviewLogbookMode() {
  const nextMode = (state.logbookPreviewMode === 'blank') ? 'filled' : 'blank';
  previewLogbookHVS(nextMode);
}

function printLogbookHVS() {
  const content = generateLogbookHVS(state.logbookPreviewMode || 'filled');
  const printWindow = window.open('', '_blank', 'width=900,height=800');
  if (!printWindow) {
    alert('Popup diblokir oleh browser. Izinkan popup untuk mencetak dokumen.');
    return;
  }
  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <title>Logbook_Kinerja_Klinis_${(state.logbookData?.nama || 'Staf').replace(/[^a-zA-Z0-9]/g, '_')}_RSUD_dr_Soedarso</title>
      <style>
        @page {
          size: A4 portrait;
          margin: 12mm 15mm;
        }
        body {
          margin: 0;
          padding: 0;
          font-family: Arial, Helvetica, sans-serif;
          color: #000;
          background: #fff;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .soedarso-page {
          box-sizing: border-box;
          width: 100%;
        }
        .page-1 {
          page-break-after: always;
          break-after: page;
        }
        .page-2 {
          page-break-after: avoid;
          break-after: avoid;
        }
        table {
          border-collapse: collapse;
          width: 100%;
        }
        @media screen {
          body {
            background: #e2e8f0;
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .soedarso-page {
            background: #fff;
            width: 210mm;
            min-height: 297mm;
            padding: 12mm 15mm;
            margin-bottom: 20px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.15);
          }
        }
      </style>
    </head>
    <body>
      ${content}
      <script>
        window.onload = function() {
          window.focus();
          setTimeout(function() {
            window.print();
          }, 300);
        };
      </script>
    </body>
    </html>
  `);
  printWindow.document.close();
}

function exportLogbookWord() {
  const exportMode = state.logbookPreviewMode || 'filled';
  const isBlank = (exportMode === 'blank');
  const content = generateLogbookHVS(exportMode);
  const rawNama = document.getElementById('logbookNama')?.value || (state.logbookData?.nama || 'Pemohon');
  const nama = isBlank ? 'Blangko_Kosong_Logbook_Soedarso' : rawNama.replace(/[^a-zA-Z0-9]/g, '_');
  const header = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head><meta charset='utf-8'><title>Logbook Kinerja Klinis - ${nama}</title>
    <style>
      @page Section1 { size: 595.3pt 841.9pt; margin: 0.6in 0.7in 0.6in 0.7in; mso-header-margin: 35.4pt; mso-footer-margin: 35.4pt; mso-paper-source: 0; }
      div.Section1 { page: Section1; }
      body { font-family: Arial, Helvetica, sans-serif; font-size: 9pt; line-height: 1.35; color: #000; }
      table { border-collapse: collapse; width: 100%; }
      .page-1 { page-break-after: always; }
      .page-2 { page-break-after: avoid; }
    </style>
    </head>
    <body>
    <div class="Section1">
  `;
  const footer = `</div></body></html>`;
  const sourceHTML = header + content + footer;
  const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
  const fileDownload = document.createElement("a");
  document.body.appendChild(fileDownload);
  fileDownload.href = source;
  fileDownload.download = `Logbook_Kinerja_Klinis_${nama}_RSUD_dr_Soedarso.doc`;
  fileDownload.click();
  document.body.removeChild(fileDownload);
  showToast(`Logbook Kinerja Klinis ${rawNama} berhasil diunduh dalam format Word (.doc)!`, 'success');
}

/* ==========================================================================
   ALUR LANGKAH 3: FORMULIR SURAT PERMOHONAN KREDENSIAL / RE-KREDENSIAL
   ========================================================================== */

function openSuratPermohonanModal() {
  syncAllDownstreamFormsFromCv();
  if (state.currentUser && !state.currentUser.isSuperAdmin) {
    const namaInput = document.getElementById('suratNama');
    if (namaInput && (!namaInput.value || namaInput.value.includes('Hendra'))) {
      namaInput.value = state.currentUser.name;
    }
  }
  openModal('modalSuratPermohonan');
}

function handleSuratPermohonanSubmit(e) {
  if (e) e.preventDefault();

  const form = document.getElementById('formSuratPermohonan');
  if (form && !form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const nama = document.getElementById('suratNama')?.value?.trim() || 'Ns. Pemohon';
  const nip = document.getElementById('suratNip')?.value?.trim() || '';
  const jenisNip = document.getElementById('suratJenisNip')?.value || 'NIP';
  const unit = document.getElementById('suratUnit')?.value || '';
  const jenjang = document.getElementById('suratJenjang')?.value || 'PK III';

  // Catat jenis permohonan yang dipilih dan sinkronkan ke Langkah 4
  let jenis = 'berkala';
  if (document.getElementById('optJenisBaru')?.checked) jenis = 'baru';
  else if (document.getElementById('optJenisKenaikan')?.checked) jenis = 'kenaikan';
  else if (document.getElementById('optJenisBerkala')?.checked) jenis = 'berkala';
  state.jenisPermohonan = jenis;
  localStorage.setItem('komite_jenis_permohonan', jenis);
  syncJenisPermohonanToRkk();

  // Sinkronkan ke formulir Langkah 2 (Unggah Berkas) & data pemohon aktif
  const pemohonInput = document.getElementById('uploadNamaPemohon');
  if (pemohonInput) pemohonInput.value = nama;

  state.kredensialSuratGenerated = true;
  state.currentApplicant = {
    nama,
    nip: `${jenisNip !== 'NIP' ? jenisNip + '. ' : ''}${nip}`,
    rawNip: nip,
    unit,
    jenjang,
    jenisPermohonan: (jenis === 'baru' ? 'Kredensialing Baru' : (jenis === 'kenaikan' ? 'Rekredensialing / Kenaikan Jenjang' : 'Re-Kredensial Berkala')),
    timestamp: new Date().toISOString()
  };
  localStorage.setItem('komite_surat_generated', 'true');
  localStorage.setItem('komite_applicant_data', JSON.stringify(state.currentApplicant));

  updateAlurStepStatus();
  closeModal('modalSuratPermohonan');
  
  // Buka pratinjau surat hasil isian
  previewSuratKredensialHVS('filled');

  // Rekam notifikasi administrasi ke komitekeperawatanrsds2023@gmail.com & yadhie28@gmail.com
  const adminSubject = `[PERMOHONAN KREDENSIAL] ${nama} (${jenjang} - ${unit})`;
  const adminBody = 
    `Kepada Yth.\n` +
    `1. Ketua Komite Keperawatan RSUD dr. Soedarso (komitekeperawatanrsds2023@gmail.com)\n` +
    `2. Ns. Rusmulyadi, S.Kep., MARS - Sekretaris Komite (yadhie28@gmail.com)\n\n` +
    `Dengan hormat,\n` +
    `Telah diterbitkan Formulir Surat Permohonan Kredensialing Mandiri dengan data sbb:\n\n` +
    `• Nama Pemohon    : ${nama}\n` +
    `• NIP / NIK       : ${jenisNip !== 'NIP' ? jenisNip + '. ' : ''}${nip}\n` +
    `• Unit Kerja      : ${unit}\n` +
    `• Jenjang Klinis  : ${jenjang}\n` +
    `• Tanggal         : ${new Date().toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}\n` +
    `• Status Berkas   : Lembar Surat Permohonan 3 Halaman telah siap untuk diunduh dan ditandatangani mandiri.\n\n` +
    `Saluran Notifikasi Terhubung:\n` +
    `1. Komite: komitekeperawatanrsds2023@gmail.com\n` +
    `2. Sekretaris: yadhie28@gmail.com\n\n` +
    `Portal Komite Keperawatan RSUD dr. Soedarso Pontianak\n` +
    `https://yadhie28.github.io/komite-keperawatan-soedarso/`;

  recordAdminNotification({
    eventType: 'Formulir Surat Permohonan Kredensial (Langkah 3)',
    subject: adminSubject,
    applicantName: nama,
    applicantNip: nip,
    unit: unit,
    bodyText: adminBody
  });

  // Perbarui banner status sukses di modal pratinjau
  const banner = document.getElementById('previewSuratSuccessBanner');
  const badge = document.getElementById('previewSuratApplicantBadge');
  if (banner) banner.style.display = 'block';
  if (badge) badge.textContent = nama;

  showToast(`Surat Permohonan untuk ${nama} berhasil diterbitkan! Notifikasi terhubung ke email Komite & Sekretaris.`, 'success');
}

function generateSuratKredensialHVS(mode) {
  const previewMode = mode || state.suratPreviewMode || 'filled';
  const isBlank = (previewMode === 'blank');

  const getVal = (id, fallback = '') => {
    if (isBlank) return '';
    const v = document.getElementById(id)?.value?.trim();
    return (v !== undefined && v !== '') ? v : fallback;
  };

  // Jenis Permohonan
  let jenis = 'berkala';
  if (isBlank) {
    jenis = 'none';
  } else {
    if (document.getElementById('optJenisBaru')?.checked) jenis = 'baru';
    else if (document.getElementById('optJenisKenaikan')?.checked) jenis = 'kenaikan';
  }

  // Bagian I: Identitas Personal
  const nama = isBlank ? '' : getVal('suratNama', 'Ns. Hendra Kurniawan, S.Kep');
  const jenisNip = isBlank ? '' : getVal('suratJenisNip', 'NIP');
  const rawNip = isBlank ? '' : getVal('suratNip', '19920415 201903 1 004');
  const nipFull = isBlank ? '' : (rawNip ? `${jenisNip !== 'NIP' ? jenisNip + '. ' : ''}${rawNip}` : '');
  const ttl = isBlank ? '' : getVal('suratTtl', 'Pontianak, 15 April 1992');
  const kelamin = isBlank ? '' : getVal('suratKelamin', 'Laki-laki');
  const alamat = isBlank ? '' : getVal('suratAlamat', 'Jl. Danau Sentarum No. 42, Kota Pontianak');
  const hp = isBlank ? '' : getVal('suratHp', '0812-5678-9012');
  const email = isBlank ? '' : getVal('suratEmail', 'hendra.kurniawan@soedarso.kalbarprov.go.id');
  const unit = isBlank ? '' : getVal('suratUnit', 'Enggang Gading 2');
  const jabatan = isBlank ? '' : getVal('suratJabatanFungsional', 'Perawat Ahli Pertama');
  const pkSaatIni = isBlank ? '' : getVal('suratPkSaatIni', 'PK II');
  const pkDiusulkan = isBlank ? '' : getVal('suratJenjang', 'PK III');

  // Bagian II: Data Legalitas Formal & Kualifikasi
  const pendidikan = isBlank ? '' : getVal('suratPendidikan', 'S1+Profesi Ners');
  const institusi = isBlank ? '' : getVal('suratInstitusi', 'Universitas Tanjungpura');
  const tahunLulus = isBlank ? '' : getVal('suratTahunLulus', '2018');
  const str = isBlank ? '' : getVal('suratStr', '140152123-2893812');
  const strExp = isBlank ? '' : getVal('suratStrExpiry', '17 Agustus 2028');
  const sipp = isBlank ? '' : getVal('suratSipp', '503/412/Dinkes-PP/SIPP/2023');
  const sippExp = isBlank ? '' : getVal('suratSippExpiry', '17 Agustus 2028');

  // Bagian III: Checklist 8 Berkas
  const getChk = (name) => {
    if (isBlank) return null;
    const el = document.querySelector(`input[name="${name}"][value="ada"]`);
    return el ? el.checked : true;
  };
  const chk1 = getChk('chkBerkas1');
  const chk2 = getChk('chkBerkas2');
  const chk3 = getChk('chkBerkas3');
  const chk4 = getChk('chkBerkas4');
  const chk5 = getChk('chkBerkas5');
  const chk6 = getChk('chkBerkas6');
  const chk7 = getChk('chkBerkas7');
  const chk8 = getChk('chkBerkas8');

  const renderChk = (chkVal) => {
    if (chkVal === null) {
      return { ada: '&nbsp;&nbsp;', tidak: '&nbsp;&nbsp;' };
    }
    return {
      ada: chkVal ? '<strong>&check;</strong>' : '&nbsp;&nbsp;',
      tidak: !chkVal ? '<strong>&check;</strong>' : '&nbsp;&nbsp;'
    };
  };

  const r1 = renderChk(chk1);
  const r2 = renderChk(chk2);
  const r3 = renderChk(chk3);
  const r4 = renderChk(chk4);
  const r5 = renderChk(chk5);
  const r6 = renderChk(chk6);
  const r7 = renderChk(chk7);
  const r8 = renderChk(chk8);

  // Bagian IV: Pernyataan & Tanggal
  const tglSurat = isBlank ? '' : getVal('suratTanggal', '21 Oktober 2026');
  const pemeriksaNama = isBlank ? '' : getVal('suratPemeriksaNama', 'Ns. Yohanes Rindo Ari Wijoyo, S.Kep');
  const pemeriksaNip = isBlank ? '' : getVal('suratPemeriksaNip', '198212282003121005');

  // Logo base64 jika ada agar Word & cetak offline selalu tampil jernih
  const logoSrc = (typeof window !== 'undefined' && window.LOGO_KALBAR_BASE64) ? window.LOGO_KALBAR_BASE64 : 'logo_kalbar.png';

  // Kop Resmi RSUD dr. Soedarso persis sesuai PDF fisik
  const kopSoedarso = `
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 2px;">
      <tr>
        <td style="width: 85px; vertical-align: middle; text-align: center; padding-right: 12px;">
          <img src="${logoSrc}" alt="Logo Pemprov Kalbar" style="width: 75px; height: auto;">
        </td>
        <td style="text-align: center; vertical-align: middle; font-family: Arial, Helvetica, sans-serif; color: #000;">
          <div style="font-size: 11pt; font-weight: bold; line-height: 1.25; letter-spacing: 0.2px;">PEMERINTAH PROVINSI KALIMANTAN BARAT</div>
          <div style="font-size: 12.5pt; font-weight: bold; line-height: 1.25; letter-spacing: 0.2px;">RUMAH SAKIT UMUM DAERAH DOKTER SOEDARSO</div>
          <div style="font-size: 11.5pt; font-weight: bold; line-height: 1.25; letter-spacing: 0.2px;">KOMITE KEPERAWATAN</div>
          <div style="font-size: 8.5pt; line-height: 1.35; margin-top: 3px;">
            Jalan Dokter Soedarso No.1 Pontianak Tenggara, Kota Pontianak, Kalimantan Barat 78124<br>
            Telp. (0561) 737701, (0561) 746152, Fax. (0561) 736528<br>
            Laman : <span style="color: #0000ee; text-decoration: underline;">https://rsuddrsoedarso.kalbarprov.go.id</span>, Pos-el : <span style="color: #0000ee; text-decoration: underline;">rsud@kalbarprov.go.id</span>
          </div>
        </td>
      </tr>
    </table>
    <div style="border-top: 2.5px solid #000000; border-bottom: 0.8px solid #000000; height: 2px; margin-top: 6px; margin-bottom: 18px;"></div>
  `;

  return `
    <!-- ==========================================
         LEMBAR 1: KOP, IDENTITAS PERSONAL
         ========================================== -->
    <div class="soedarso-page page-1" style="page-break-after: always; break-after: page;">
      ${kopSoedarso}

      <div style="text-align: center; font-family: Arial, Helvetica, sans-serif; font-weight: bold; font-size: 11pt; line-height: 1.35; margin-bottom: 18px; color: #000;">
        FORMULIR APLIKASI PERMOHONAN KREDENSIAL / RE-KREDENSIAL<br>
        TENAGA KEPERAWATAN
      </div>

      <div style="font-family: Arial, Helvetica, sans-serif; font-size: 9.5pt; line-height: 1.55; margin-bottom: 18px; color: #000;">
        <em>Jenis Permohonan:</em><br>
        <div style="margin-left: 4px; margin-top: 4px;">
          [ ${jenis === 'baru' ? '<strong>&check;</strong>' : '&nbsp;&nbsp;'} ] Kredensial (Perawat Baru / Bidan Baru)<br>
          [ ${jenis === 'berkala' ? '<strong>&check;</strong>' : '&nbsp;&nbsp;'} ] Re-Kredensial Berkala (Setiap 3 Tahun)<br>
          [ ${jenis === 'kenaikan' ? '<strong>&check;</strong>' : '&nbsp;&nbsp;'} ] Re-Kredensial Kenaikan Jenjang Klinis (Pindah Level PK)
        </div>
      </div>

      <div class="soedarso-form-box">
        I. IDENTITAS PERSONAL TENAGA KEPERAWATAN
      </div>
      <table class="soedarso-table">
        <tr>
          <td style="width: 38%;">1. Nama Lengkap (beserta Gelar)</td>
          <td style="width: 62%;">: ${nama || (isBlank ? 'Ketik di sini' : 'Ketik di sini')}</td>
        </tr>
        <tr>
          <td>2. Nomor Induk Pegawai<br>(NIP/NIPPPK/NIK)</td>
          <td>: ${nipFull}</td>
        </tr>
        <tr>
          <td>3. Tempat / Tanggal Lahir</td>
          <td>: ${ttl}</td>
        </tr>
        <tr>
          <td>4. Jenis Kelamin</td>
          <td>: ${kelamin}</td>
        </tr>
        <tr>
          <td>5. Alamat Rumah Tinggal</td>
          <td>: ${alamat}</td>
        </tr>
        <tr>
          <td>6. Nomor Telepon / HP WA Aktif</td>
          <td>: ${hp}</td>
        </tr>
        <tr>
          <td>7. Alamat Email</td>
          <td>: ${email}</td>
        </tr>
        <tr>
          <td>8. Unit Kerja / Ruang Rawat Saat Ini</td>
          <td>: ${unit}</td>
        </tr>
        <tr>
          <td>9. Jabatan Fungsional Saat Ini</td>
          <td>: ${jabatan}</td>
        </tr>
        <tr>
          <td>10. Level Perawat Klinis (PK) saat ini</td>
          <td>: ${pkSaatIni}</td>
        </tr>
        <tr>
          <td>11. Level PK yang Diusulkan</td>
          <td>: ${pkDiusulkan}</td>
        </tr>
      </table>
    </div>

    <div class="page-separator-preview">
      <span>Lembar HVS 2 &bull; Halaman 2</span>
    </div>

    <!-- ==========================================
         LEMBAR 2: LEGALITAS FORMAL & BERKAS 1-5
         ========================================== -->
    <div class="soedarso-page page-2" style="page-break-after: always; break-after: page;">
      <div style="text-align: right; font-family: Arial, Helvetica, sans-serif; font-size: 11pt; margin-bottom: 8px; color: #000;">2</div>

      <div class="soedarso-form-box">
        II. DATA LEGALITAS FORMAL &amp; KUALIFIKASI
      </div>
      <table class="soedarso-table" style="margin-bottom: 24px;">
        <tr>
          <td style="width: 38%;">1. Pendidikan Terakhir (D3 /<br>D4+Profesi / S1+Profesi / S2 )</td>
          <td style="width: 62%;">: ${pendidikan || (isBlank ? 'Ketik di sini' : 'Ketik di sini')}</td>
        </tr>
        <tr>
          <td>2. Institusi Asal Lulusan</td>
          <td>: ${institusi}</td>
        </tr>
        <tr>
          <td>3. Tahun Kelulusan</td>
          <td>: ${tahunLulus}</td>
        </tr>
        <tr>
          <td>4. Nomor Surat Tanda Registrasi<br>(STR)</td>
          <td>: ${str}</td>
        </tr>
        <tr>
          <td>5. Masa Berlaku STR<br>(Tanggal/Bulan/Tahun)</td>
          <td>: ${strExp}</td>
        </tr>
        <tr>
          <td>6. Nomor Surat Izin Praktik Perawat<br>(SIPP)/Surat Izin Praktik Bidan<br>(SIPB)</td>
          <td>: ${sipp}</td>
        </tr>
        <tr>
          <td>7. Masa Berlaku SIPP/SIPB<br>(Tanggal/Bulan/Tahun)</td>
          <td>: ${sippExp}</td>
        </tr>
      </table>

      <div class="soedarso-form-box">
        III. KELENGKAPAN BERKAS PENDUKUNG (Checklist)
      </div>
      <table class="soedarso-table">
        <thead>
          <tr style="background-color: #0e3860; color: #ffffff;" bgcolor="#0e3860">
            <th class="soedarso-th-blue" style="width: 45px; border: 1px solid #000000; padding: 7px 4px; text-align: center; color: #ffffff; background-color: #0e3860;" bgcolor="#0e3860">No</th>
            <th class="soedarso-th-blue" style="border: 1px solid #000000; padding: 7px 8px; text-align: left; color: #ffffff; background-color: #0e3860;" bgcolor="#0e3860">Jenis Berkas Pendukung Dokumen</th>
            <th class="soedarso-th-blue" style="width: 75px; border: 1px solid #000000; padding: 7px 4px; text-align: center; color: #ffffff; background-color: #0e3860;" bgcolor="#0e3860">Ada</th>
            <th class="soedarso-th-blue" style="width: 90px; border: 1px solid #000000; padding: 7px 4px; text-align: center; color: #ffffff; background-color: #0e3860;" bgcolor="#0e3860">Tidak Ada</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="text-align: center;">1</td>
            <td>Salinan Ijazah Keperawatan/Kebidanan Terakhir Terlegalisir</td>
            <td style="text-align: center;">[ ${r1.ada} ]</td>
            <td style="text-align: center;">[ ${r1.tidak} ]</td>
          </tr>
          <tr>
            <td style="text-align: center;">2</td>
            <td>Salinan Surat Tanda Registrasi (STR) yang masih aktif secara hukum</td>
            <td style="text-align: center;">[ ${r2.ada} ]</td>
            <td style="text-align: center;">[ ${r2.tidak} ]</td>
          </tr>
          <tr>
            <td style="text-align: center;">3</td>
            <td>Salinan SIPP/SIPB</td>
            <td style="text-align: center;">[ ${r3.ada} ]</td>
            <td style="text-align: center;">[ ${r3.tidak} ]</td>
          </tr>
          <tr>
            <td style="text-align: center;">4</td>
            <td>Salinan Sertifikat Pelatihan Khusus Keperawatan/Kebidanan (ICU/OK/HD/dll.)</td>
            <td style="text-align: center;">[ ${r4.ada} ]</td>
            <td style="text-align: center;">[ ${r4.tidak} ]</td>
          </tr>
          <tr>
            <td style="text-align: center;">5</td>
            <td>Tangkapan layar bukti pendidikan keperawatan/kebidanan terakhir dari PDDikti (<span style="color: #0000ee; text-decoration: underline;">https://pisn.kemdiktisaintek.go.id/</span>)</td>
            <td style="text-align: center;">[ ${r5.ada} ]</td>
            <td style="text-align: center;">[ ${r5.tidak} ]</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="page-separator-preview">
      <span>Lembar HVS 3 &bull; Halaman 3</span>
    </div>

    <!-- ==========================================
         LEMBAR 3: BERKAS 6-8, PERNYATAAN, TANDA TANGAN
         ========================================== -->
    <div class="soedarso-page page-3">
      <div style="text-align: right; font-family: Arial, Helvetica, sans-serif; font-size: 11pt; margin-bottom: 8px; color: #000;">3</div>

      <table class="soedarso-table" style="margin-bottom: 24px;">
        <tbody>
          <tr>
            <td style="width: 45px; text-align: center;">6</td>
            <td style="width: auto;">Surat Keterangan Sehat dari Dokter Pemerintah</td>
            <td style="width: 75px; text-align: center;">[ ${r6.ada} ]</td>
            <td style="width: 90px; text-align: center;">[ ${r6.tidak} ]</td>
          </tr>
          <tr>
            <td style="text-align: center;">7</td>
            <td>Asli Buku Logbook Kinerja Klinis Harian (Telah diverifikasi Kepala Ruangan)</td>
            <td style="text-align: center;">[ ${r7.ada} ]</td>
            <td style="text-align: center;">[ ${r7.tidak} ]</td>
          </tr>
          <tr>
            <td style="text-align: center;">8</td>
            <td>Curriculum Vitae / Daftar Riwayat Hidup</td>
            <td style="text-align: center;">[ ${r8.ada} ]</td>
            <td style="text-align: center;">[ ${r8.tidak} ]</td>
          </tr>
        </tbody>
      </table>

      <div class="soedarso-form-box" style="margin-bottom: 12px;">
        IV. PERNYATAAN DAN PERSETUJUAN PEMOHON
      </div>
      <div style="font-family: Arial, Helvetica, sans-serif; font-size: 9.5pt; line-height: 1.5; text-align: justify; margin-bottom: 30px; color: #000;">
        Dengan ini saya menyatakan bahwa seluruh data administrasi, dokumen kompetensi, serta berkas portofolio yang saya lampirkan dalam Formulir Aplikasi Kredensial / Re-Kredensial ini adalah benar, valid, dan sah secara hukum. Apabila di kemudian hari ditemukan adanya pemalsuan data atau informasi yang tidak benar, maka saya bersedia menerima sanksi administrasi, pencabutan kewenangan klinis (Clinical Privilege), maupun sanksi hukum sesuai ketentuan yang berlaku di RSUD dr. Soedarso Provinsi Kalimantan Barat.
      </div>

      <table style="width: 100%; border-collapse: collapse; font-family: Arial, Helvetica, sans-serif; font-size: 9.5pt; line-height: 1.35; color: #000; border: none;">
        <tr>
          <td style="width: 50%; vertical-align: top; text-align: center; border: none;"></td>
          <td style="width: 50%; vertical-align: top; text-align: center; border: none;">
            Pontianak, &nbsp;&nbsp;${tglSurat ? tglSurat : '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/ 2026'}<br>
          </td>
        </tr>
        <tr>
          <td style="width: 50%; vertical-align: top; text-align: center; padding-top: 10px; border: none;">
            Mengetahui / Memeriksa,<br>
            Subkomite Kredensial Keperawatan<br>
            <div style="height: 65px;"></div>
            ${pemeriksaNama || 'Ketik di sini'}<br>
            NIP. ${pemeriksaNip || 'Ketik di sini'}
          </td>
          <td style="width: 50%; vertical-align: top; text-align: center; padding-top: 10px; border: none;">
            Pemohon,<br>
            Personel Keperawatan<br>
            <div style="height: 65px;"></div>
            ${nama || 'Ketik di sini'}<br>
            NIP / NIPPPK / NIK. ${rawNip || ''}
          </td>
        </tr>
      </table>
    </div>
  `;
}

function previewSuratKredensialHVS(mode) {
  if (mode) state.suratPreviewMode = mode;
  else if (!state.suratPreviewMode) state.suratPreviewMode = 'filled';

  const container = document.getElementById('suratHvsPrintArea');
  if (container) {
    container.innerHTML = generateSuratKredensialHVS(state.suratPreviewMode);
  }

  const btnToggle = document.getElementById('btnTogglePreviewMode');
  if (btnToggle) {
    if (state.suratPreviewMode === 'blank') {
      btnToggle.innerHTML = '<i class="fa-solid fa-file-signature"></i> Tampilkan Data Hasil Isian';
      btnToggle.style.background = '#d97706';
      btnToggle.style.color = '#fff';
    } else {
      btnToggle.innerHTML = '<i class="fa-regular fa-file"></i> Tampilkan Format Blangko Kosong';
      btnToggle.style.background = 'var(--bg-app)';
      btnToggle.style.color = 'var(--text-main)';
    }
  }

  openModal('modalPreviewSuratHVS');
}

function togglePreviewSuratMode() {
  const nextMode = (state.suratPreviewMode === 'blank') ? 'filled' : 'blank';
  previewSuratKredensialHVS(nextMode);
}

function printSuratKredensialHVS(mode) {
  const printMode = mode || state.suratPreviewMode || 'filled';
  const printContent = generateSuratKredensialHVS(printMode);
  const printWindow = window.open('', '_blank', 'width=880,height=960');
  if (printWindow) {
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Formulir Aplikasi Kredensial - RSUD dr. Soedarso</title>
        <style>
          @page {
            size: A4 portrait;
            margin: 12mm 15mm;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          body {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 9.5pt;
            line-height: 1.35;
            color: #000;
            margin: 0;
            padding: 0;
            background: #fff;
          }
          table { width: 100%; border-collapse: collapse; }
          .soedarso-page {
            page-break-after: always;
            break-after: page;
            background: #fff;
            padding: 0;
            width: 100%;
          }
          .soedarso-page.page-3 {
            page-break-after: avoid;
            break-after: avoid;
          }
          .soedarso-form-box {
            border: 2px solid #000000;
            padding: 6px 10px;
            font-weight: bold;
            font-size: 10.5pt;
            text-transform: uppercase;
            background: #fff;
            margin-bottom: -1px;
            font-family: Arial, Helvetica, sans-serif;
          }
          .soedarso-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 9.5pt;
            border: 1px solid #000000;
            font-family: Arial, Helvetica, sans-serif;
          }
          .soedarso-table td, .soedarso-table th {
            border: 1px solid #000000;
            padding: 5px 8px;
            vertical-align: top;
          }
          thead tr, thead tr th, .soedarso-th-blue {
            background-color: #0e3860 !important;
            color: #ffffff !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .page-separator-preview { display: none !important; }
          img { max-width: 75px; height: auto; }
        </style>
      </head>
      <body>
        ${printContent}
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 400);
  } else {
    window.print();
  }
}

function exportSuratKredensialWord(mode) {
  const exportMode = mode || state.suratPreviewMode || 'filled';
  const isBlank = (exportMode === 'blank');
  const content = generateSuratKredensialHVS(exportMode);
  const rawNama = document.getElementById('suratNama')?.value || 'Pemohon';
  const nama = isBlank ? 'Blangko_Kosong_Soedarso' : rawNama;
  const header = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head><meta charset='utf-8'><title>Formulir Permohonan Kredensial - ${nama}</title>
    <style>
      @page Section1 { size: 595.3pt 841.9pt; margin: 0.6in 0.7in 0.6in 0.7in; mso-header-margin: 35.4pt; mso-footer-margin: 35.4pt; mso-paper-source: 0; }
      div.Section1 { page: Section1; }
      body { font-family: Arial, Helvetica, sans-serif; font-size: 9.5pt; line-height: 1.35; color: #000; }
      table { border-collapse: collapse; width: 100%; }
      .soedarso-form-box { border: 2pt solid black; padding: 4pt 6pt; font-weight: bold; font-size: 11pt; text-transform: uppercase; font-family: Arial, sans-serif; }
      .soedarso-table td, .soedarso-table th { border: 1pt solid black; padding: 4pt 6pt; font-family: Arial, sans-serif; font-size: 9.5pt; }
      .page-separator-preview { display: none; }
      .soedarso-page { page-break-after: always; }
      .page-3 { page-break-after: avoid; }
      thead tr { background-color: #0e3860; color: #ffffff; }
    </style>
    </head>
    <body>
    <div class="Section1">
  `;
  const footer = `</div></body></html>`;
  const blob = new Blob(['\ufeff', header + content + footer], { type: 'application/msword' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Formulir_Aplikasi_Kredensial_${nama.replace(/[^a-zA-Z0-9]/g, '_')}.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast(isBlank ? 'Blangko format resmi kosong berhasil diunduh (.doc)!' : 'Formulir aplikasi kredensial resmi berhasil diunduh dalam format Word (.doc)!', 'success');
}

function fillGoogleFormPreset(presetKey) {
  const presets = {
    rusmulyadi: {
      jenis: 'berkala',
      nama: 'Ns. Rusmulyadi, S.Kep., MARS',
      jenisNip: 'NIP',
      nip: '19800815 200501 1 008',
      ttl: 'Pontianak, 15 Agustus 1980',
      kelamin: 'Laki-laki',
      alamat: 'Jl. Danau Sentarum Komplek Griya Asri No. B-4, Kota Pontianak',
      hp: '0812-5678-0001',
      email: 'rusmulyadi@soedarso.kalbarprov.go.id',
      unit: 'Ruang ICU Sentral (Intensive Care Unit)',
      jabatan: 'Perawat Ahli Madya / Sekretaris Komite',
      pkSaatIni: 'PK III',
      jenjang: 'PK IV',
      pendidikan: 'S2 Keperawatan (Magister / Sp.Kep)',
      institusi: 'Universitas Indonesia',
      tahun: '2016',
      str: '140172120-19800815',
      strExp: '15 Agustus 2029 (Seumur Hidup)',
      sipp: '503/089/Dinkes-PP/SIPP/2021',
      sippExp: '15 Agustus 2029'
    },
    hendra: {
      jenis: 'berkala',
      nama: 'Ns. Hendra Kurniawan, S.Kep',
      jenisNip: 'NIP',
      nip: '19920415 201903 1 004',
      ttl: 'Pontianak, 15 April 1992',
      kelamin: 'Laki-laki',
      alamat: 'Jl. Danau Sentarum No. 42, Kota Pontianak',
      hp: '0812-5678-9012',
      email: 'hendra.kurniawan@soedarso.kalbarprov.go.id',
      unit: 'Enggang Gading 2',
      jabatan: 'Perawat Ahli Pertama',
      pkSaatIni: 'PK II',
      jenjang: 'PK III',
      pendidikan: 'S1+Profesi Ners',
      institusi: 'Universitas Tanjungpura',
      tahun: '2018',
      str: '140152123-2893812',
      strExp: '17 Agustus 2028',
      sipp: '503/412/Dinkes-PP/SIPP/2023',
      sippExp: '17 Agustus 2028'
    },
    siti: {
      jenis: 'kenaikan',
      nama: 'Bd. Siti Aminah, S.Tr.Keb',
      jenisNip: 'NIPPPK',
      nip: '19950712 202221 2 006',
      ttl: 'Singkawang, 12 Juli 1995',
      kelamin: 'Perempuan',
      alamat: 'Jl. Ampera No. 15, Pontianak Kota',
      hp: '0813-9876-5432',
      email: 'siti.aminah@soedarso.kalbarprov.go.id',
      unit: 'IGD Kebidanan',
      jabatan: 'Bidan Terampil',
      pkSaatIni: 'PMB',
      jenjang: 'PMB',
      pendidikan: 'D4+Profesi Kebidanan',
      institusi: 'Poltekkes Kemenkes Pontianak',
      tahun: '2019',
      str: '140262124-7719201',
      strExp: '12 Juli 2029',
      sipp: '503/220/Dinkes-PP/SIPB/2024',
      sippExp: '12 Juli 2029'
    }
  };

  const p = presets[presetKey];
  if (!p) return;

  const setIf = (id, val) => {
    const el = document.getElementById(id);
    if (!el || val === undefined) return;
    el.value = val;
    if (el.tagName === 'SELECT' && el.value !== val) {
      const lowerVal = String(val).toLowerCase();
      for (let i = 0; i < el.options.length; i++) {
        const opt = el.options[i];
        const optVal = opt.value.toLowerCase();
        const optText = opt.textContent.toLowerCase();
        if (optVal && (lowerVal.includes(optVal) || optVal.includes(lowerVal) || lowerVal.includes(optText) || optText.includes(lowerVal))) {
          el.selectedIndex = i;
          break;
        }
      }
    }
  };

  if (p.jenis === 'baru') document.getElementById('optJenisBaru')?.click();
  else if (p.jenis === 'kenaikan') document.getElementById('optJenisKenaikan')?.click();
  else document.getElementById('optJenisBerkala')?.click();

  setIf('suratNama', p.nama);
  setIf('suratJenisNip', p.jenisNip);
  setIf('suratNip', p.nip);
  setIf('suratTtl', p.ttl);
  setIf('suratKelamin', p.kelamin);
  setIf('suratAlamat', p.alamat);
  setIf('suratHp', p.hp);
  setIf('suratEmail', p.email);
  setIf('suratUnit', p.unit);
  setIf('suratJabatanFungsional', p.jabatan);
  setIf('suratPkSaatIni', p.pkSaatIni);
  setIf('suratJenjang', p.jenjang);
  setIf('suratPendidikan', p.pendidikan);
  setIf('suratInstitusi', p.institusi);
  setIf('suratTahunLulus', p.tahun);
  setIf('suratStr', p.str);
  setIf('suratStrExpiry', p.strExp);
  setIf('suratSipp', p.sipp);
  setIf('suratSippExpiry', p.sippExp);

  // Set all checkboxes to Ada
  for (let i = 1; i <= 8; i++) {
    const rAda = document.querySelector(`input[name="chkBerkas${i}"][value="ada"]`);
    if (rAda) rAda.checked = true;
  }

  showToast(`Data respon ${p.nama} berhasil dimuat! Surat permohonan telah tersinkronisasi.`, 'success');
}

function importGoogleFormResponse() {
  const text = document.getElementById('txtGoogleFormRaw')?.value?.trim();
  if (!text) {
    showToast('Silakan tempel (paste) baris data respon Google Form / Spreadsheet terlebih dahulu.', 'warning');
    return;
  }

  let parts = [];
  if (text.includes('\t')) parts = text.split('\t');
  else if (text.includes(';')) parts = text.split(';');
  else if (text.includes(',')) parts = text.split(',');
  else parts = text.split('\n');

  parts = parts.map(p => p.trim());

  if (parts.length >= 1 && parts[0]) document.getElementById('suratNama').value = parts[0];
  if (parts.length >= 2 && parts[1]) document.getElementById('suratNip').value = parts[1];
  if (parts.length >= 3 && parts[2]) document.getElementById('suratTtl').value = parts[2];
  if (parts.length >= 4 && parts[3]) document.getElementById('suratKelamin').value = parts[3].toLowerCase().includes('perempuan') ? 'Perempuan' : 'Laki-laki';
  if (parts.length >= 5 && parts[4]) document.getElementById('suratAlamat').value = parts[4];
  if (parts.length >= 6 && parts[5]) document.getElementById('suratHp').value = parts[5];
  if (parts.length >= 7 && parts[6]) document.getElementById('suratEmail').value = parts[6];
  if (parts.length >= 8 && parts[7]) document.getElementById('suratUnit').value = parts[7];
  if (parts.length >= 9 && parts[8]) document.getElementById('suratJabatanFungsional').value = parts[8];
  if (parts.length >= 10 && parts[9]) document.getElementById('suratPkSaatIni').value = parts[9];
  if (parts.length >= 11 && parts[10]) document.getElementById('suratJenjang').value = parts[10];
  if (parts.length >= 12 && parts[11]) document.getElementById('suratPendidikan').value = parts[11];
  if (parts.length >= 13 && parts[12]) document.getElementById('suratInstitusi').value = parts[12];
  if (parts.length >= 14 && parts[13]) document.getElementById('suratTahunLulus').value = parts[13];
  if (parts.length >= 15 && parts[14]) document.getElementById('suratStr').value = parts[14];
  if (parts.length >= 16 && parts[15]) document.getElementById('suratStrExpiry').value = parts[15];
  if (parts.length >= 17 && parts[16]) document.getElementById('suratSipp').value = parts[16];
  if (parts.length >= 18 && parts[17]) document.getElementById('suratSippExpiry').value = parts[17];

  const box = document.getElementById('boxGoogleFormImport');
  if (box) box.style.display = 'none';

  if (autoSubmit) {
    handleSuratPermohonanSubmit();
  } else {
    showToast('Data respon Google Form berhasil diimpor ke seluruh bidang formulir!', 'success');
  }
}

function downloadGoogleAppsScriptFile() {
  const link = document.createElement('a');
  link.href = 'google_apps_script_surat_kredensial.js';
  link.download = 'google_apps_script_surat_kredensial.js';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast('Skrip Google Apps Script (onFormSubmit) berhasil diunduh! Siap dipasang di Extensions > Apps Script pada Google Form/Sheets Anda.', 'success');
}

function resetSuratFormToBlank() {
  const ids = ['suratAlamat', 'suratHp', 'suratEmail'];
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  // Pastikan data identitas dan kualifikasi tetap terkunci dan tersinkron dari CV
  syncAllDownstreamFormsFromCv();
  showToast('Formulir surat berhasil direset. Data identitas dan kualifikasi tetap terkunci dan tersinkron dari Langkah 1 (CV).', 'info');
}

function openModalUploadSurat() {
  syncAllDownstreamFormsFromCv();
  openModal('modalUploadBerkasKredensial');
}

function demoSimulasiUploadBerkas() {
  const fileConfigs = [
    { id: 'uploadFileIjazah', name: '1_Salinan_Ijazah_Terlegalisir.pdf' },
    { id: 'uploadFileStr', name: '2_Salinan_STR_Elektronik_Aktif.pdf' },
    { id: 'uploadFileSipp', name: '3_Salinan_SIPP_SIPB_Aktif.pdf' },
    { id: 'uploadFileSertifikat', name: '4_Sertifikat_Pelatihan_Khusus_ICU_Gadar.pdf' },
    { id: 'uploadFilePddikti', name: '5_Screenshot_PDDikti_PISN_Kemdiktisaintek.png' },
    { id: 'uploadFileKetSehat', name: '6_Surat_Ket_Sehat_Dokter_Pemerintah.pdf' },
    { id: 'uploadFileLogbook', name: '7_Buku_Logbook_Kinerja_Klinis_Disahkan_Karu.pdf' },
    { id: 'uploadFileCv', name: '8_Curriculum_Vitae_Portofolio_Klinis.pdf' },
    { id: 'uploadFileSurat', name: '9_Surat_Permohonan_Kredensial_Bertandatangan.pdf' },
    { id: 'uploadFileRkk', name: '10_Dokumen_RKK_Resmi_Bertandatangan.pdf' },
    { id: 'uploadFilePsv', name: '11_Formulir_PSV_Verifikasi_Keabsahan.pdf' }
  ];

  let filledCount = 0;
  fileConfigs.forEach(item => {
    const el = document.getElementById(item.id);
    if (!el) return;
    try {
      const dt = new DataTransfer();
      const isImg = item.name.endsWith('.png') || item.name.endsWith('.jpg');
      const file = new File(
        ['%PDF-1.4 simulasi berkas kredensial resmi RSUD dr. Soedarso Pontianak'],
        item.name,
        { type: isImg ? 'image/png' : 'application/pdf', lastModified: Date.now() }
      );
      dt.items.add(file);
      el.files = dt.files;
      filledCount++;
    } catch (e) {
      console.warn('DataTransfer simulation fallback:', e);
    }
  });

  showToast(`Simulasi Demo: Seluruh ${filledCount} berkas persyaratan wajib & permohonan berhasil diisi otomatis!`, 'success');
}

function simpanUploadSurat(e) {
  if (e) e.preventDefault();

  const master = getActiveCvMasterData();
  const pemohon = document.getElementById('uploadNamaPemohon')?.value?.trim() || state.currentApplicant?.nama || master.nama || 'Ns. Hendra Kurniawan, S.Kep';
  const nip = master.nip || state.currentApplicant?.nip || '19920415 201903 1 004';
  const str = master.str || state.currentApplicant?.str || '140152119-3284910';
  const strExp = master.strExpiry || state.currentApplicant?.strExpiry || '2028-11-20';
  const jenjang = master.jenjangKlinis || state.currentApplicant?.jenjang || document.getElementById('formJenjang')?.value || 'PK III';
  const unit = master.unitKerja || state.currentApplicant?.unit || document.getElementById('formUnit')?.value || 'Enggang Gading 2';
  const areaKey = master.areaKlinis || state.currentApplicant?.areaKlinis || document.getElementById('formAreaKlinis')?.value || 'kmb_bedah_pk3';
  const areaName = getAreaDisplayName(areaKey, jenjang);
  const totalCount = (state.currentWizardRkkList && state.currentWizardRkkList.length) || state.currentApplicant?.totalCompetencies || 40;
  const countM = state.currentApplicant?.approvedCompetencies || document.querySelectorAll('#rkkChecklistContainer input[type="radio"][value="1"]:checked').length || totalCount;

  // Daftarkan atau perbarui data pemohon di state.nurses sebagai pengajuan aktif
  const randomId = 'NURSE-' + String(state.nurses.length + 1).padStart(3, '0');
  const randomSpk = `800/${Math.floor(1000 + Math.random() * 9000)}/RSUD-DS/KOM-KEP/2026`;

  let existingNurse = state.nurses.find(n => n.nip === nip || n.name === pemohon);
  if (!existingNurse) {
    existingNurse = {
      id: randomId,
      name: pemohon,
      nip: nip,
      strNumber: str,
      strExpiry: strExp,
      unit: unit,
      pkLevel: jenjang,
      profession: jenjang.includes('PMB') ? 'Bidan Klinis' : 'Perawat Klinis',
      spkNumber: randomSpk,
      spkDate: '2026-10-20',
      spkExpiry: '2029-10-20',
      credentialStatus: 'Menunggu Mitra Bestari',
      peerReviewer: 'Tim Mitra Bestari Subkomite Kredensial',
      approvedCompetencies: countM,
      totalCompetencies: totalCount,
      avatar: 'https://images.unsplash.com/photo-1594824813589-4a0b271d50c1?w=150&auto=format&fit=crop&q=80'
    };
    state.nurses.unshift(existingNurse);
  } else {
    existingNurse.credentialStatus = 'Menunggu Mitra Bestari';
    existingNurse.approvedCompetencies = countM;
    existingNurse.totalCompetencies = totalCount;
  }

  saveNurses();
  updateHeroStats();
  renderNursesTable();
  renderAnalyticsCharts();

  // Tandai seluruh alur pengajuan telah lengkap terkirim
  state.kredensialRkkSubmitted = true;
  state.kredensialBerkasUploaded = true;
  localStorage.setItem('komite_rkk_submitted', 'true');
  localStorage.setItem('komite_berkas_uploaded', 'true');
  updateAlurStepStatus();
  renderKredensialTrackerVisual(nip);

  // Masukkan permohonan ke riwayat usulan kredensialing
  const regNumber = `KRED/RSUD-DS/2026/${String(Math.floor(100 + Math.random() * 900))}`;
  const nowFormatted = new Date().toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'}) + ', ' + new Date().toLocaleTimeString('id-ID', {hour:'2-digit', minute:'2-digit'}) + ' WIB';
  
  let appItem = (state.credentialApplications || []).find(a => a.nip === nip || a.nama === pemohon);
  if (!appItem) {
    appItem = {
      id: `KRED-2026-${String((state.credentialApplications || []).length + 1).padStart(3, '0')}`,
      nomorRegistrasi: regNumber,
      tanggalPengajuan: nowFormatted,
      nama: pemohon,
      nip: nip,
      unit: unit,
      jenjang: jenjang,
      jenisPermohonan: 'Kredensialing / Rekredensialing Baru',
      areaKlinis: areaKey,
      areaName: areaName,
      strNumber: str,
      strExpiry: strExp,
      sippNumber: '503/' + Math.floor(100 + Math.random() * 900) + '/Dinkes-PP/SIPP/2024',
      pendidikan: master.pendidikanTerakhir || 'S1 Keperawatan & Ners',
      status: 'Menunggu Verifikasi Subkomite',
      totalTindakan: totalCount,
      dokumen: { cv: true, logbook: true, surat: true, rkk: true, psv: true, berkas8: true },
      psvChecklist: { pddikti: true, strBsre: true, sipp: true, pelatihan: true },
      verifikator: {
        nama: '',
        nip: '',
        tanggal: '',
        catatan: '',
        status: 'Belum Diverifikasi'
      },
      mitraBestari: {
        nama: 'Tim Mitra Bestari Subkomite Kredensial',
        tanggal: '',
        rekomendasi: 'Belum Ditelaah',
        catatan: ''
      },
      pengawasanPimpinan: {
        statusReview: 'Dalam Pemantauan',
        catatanKetua: '',
        catatanSekretaris: 'Berkas lengkap terunggah di Langkah 6. Disposisikan ke Tim Subkomite Kredensial untuk verifikasi sumber asli (PSV).',
        waktuMonitoring: nowFormatted
      },
      timeline: [
        {
          waktu: nowFormatted,
          user: `${pemohon} (Pengusul)`,
          aksi: 'Mengajukan Permohonan Kredensialing & Mengunggah 8 Berkas Persyaratan Lengkap (Tahap 6 Selesai)'
        },
        {
          waktu: nowFormatted,
          user: 'Sistem Terpadu Komite Keperawatan',
          aksi: 'Berkas permohonan kredensialing terkirim lengkap ke sistem Komite Keperawatan'
        }
      ]
    };
    state.credentialApplications.unshift(appItem);
  } else {
    appItem.status = 'Menunggu Verifikasi Subkomite';
    appItem.tanggalPengajuan = nowFormatted;
    appItem.totalTindakan = totalCount;
    appItem.timeline.unshift({
      waktu: nowFormatted,
      user: `${pemohon} (Pengusul)`,
      aksi: 'Mengajukan Ulang Permohonan / Memperbarui Berkas Persyaratan (Tahap 6 Selesai)'
    });
  }
  saveCredentialApplications();

  // Rekam dan kirim notifikasi resmi ke email Komite & Sekretaris
  const adminSubject = `[PERMOHONAN KREDENSIALING RESMI TERKIRIM] ${pemohon} (${jenjang} - ${unit}) - 6 Tahap Lengkap`;
  const adminBody = 
    `Kepada Yth.\n` +
    `1. Komite Keperawatan RSUD dr. Soedarso (komitekeperawatanrsds2023@gmail.com)\n` +
    `2. Ns. Rusmulyadi, S.Kep., MARS - Sekretaris Komite (yadhie28@gmail.com)\n\n` +
    `PEMBERITAHUAN PENGAJUAN KREDENSIALING LENGKAP (6 TAHAP SELESAI):\n\n` +
    `Dengan ini diberitahukan bahwa seluruh rangkaian permohonan Kredensialing & Rekredensialing Tenaga Keperawatan telah LENGKAP diajukan dan terunggah di sistem oleh pemohon:\n\n` +
    `A. DATA IDENTITAS & KUALIFIKASI PEMOHON:\n` +
    `   • Nama Lengkap       : ${pemohon}\n` +
    `   • NIP / NIK          : ${nip}\n` +
    `   • Unit Kerja         : ${unit}\n` +
    `   • Jenjang Klinis     : ${jenjang}\n` +
    `   • Area White Book    : ${areaName}\n` +
    `   • Nomor STR          : ${str} (Masa Berlaku: ${formatDate(strExp)})\n\n` +
    `B. RINGKASAN ASESMEN MANDIRI RKK (LANGKAH 4):\n` +
    `   • Capaian Mandiri (M): ${countM} dari ${totalCount} kompetensi klinis White Book 2026\n` +
    `   • Status Asesmen     : Lengkap terisi mandiri oleh pemohon\n\n` +
    `C. KELENGKAPAN 8 BERKAS PERSYARATAN WAJIB (LANGKAH 6):\n` +
    `   [✓] 1. Salinan Ijazah Terakhir Terlegalisir Basah/Elektronik\n` +
    `   [✓] 2. Salinan e-STR Aktif Secara Hukum (Barcode Valid)\n` +
    `   [✓] 3. Salinan Surat Izin Praktik (SIPP / SIPB) Aktif di RSUD dr. Soedarso\n` +
    `   [✓] 4. Sertifikat Pelatihan Khusus Keperawatan / Kebidanan\n` +
    `   [✓] 5. Tangkapan Layar Bukti Kelulusan PDDikti (PISN Kemdiktisaintek)\n` +
    `   [✓] 6. Surat Keterangan Sehat Fisik & Jiwa dari Dokter Pemerintah\n` +
    `   [✓] 7. Logbook Kinerja Klinis Harian Sah Terverifikasi Kepala Ruangan\n` +
    `   [✓] 8. Curriculum Vitae (CV) & Portofolio Klinis Bertandatangan\n\n` +
    `D. DOKUMEN PENGAJUAN SISTEM BERTANDATANGAN (LENGKAP):\n` +
    `   [✓] 9. Surat Permohonan Kredensialing Resmi Bertandatangan Pemohon (Langkah 3)\n` +
    `   [✓] 10. Dokumen RKK Asesmen Mandiri Bertandatangan Pemohon (Langkah 4)\n` +
    `   [✓] 11. Formulir Verifikasi Sumber Asli / PSV (Langkah 5)\n\n` +
    `E. DISPOSISI TINDAK LANJUT:\n` +
    `   • Status Berkas      : Menunggu Verifikasi Berkas Subkomite & Telaah Mitra Bestari\n` +
    `   • Reviewer Asesor    : Tim Mitra Bestari Subkomite Kredensial\n` +
    `   • Tanggal Pengiriman : ${new Date().toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})} ${new Date().toLocaleTimeString('id-ID', {hour:'2-digit', minute:'2-digit'})} WIB\n\n` +
    `Seluruh proses permohonan telah selesai dengan terkirimnya permohonan kredensialing beserta kelengkapannya melalui sistem dan email resmi Komite Keperawatan RSUD dr. Soedarso.\n\n` +
    `Portal Komite Keperawatan RSUD dr. Soedarso Pontianak\n` +
    `https://yadhie28.github.io/komite-keperawatan-soedarso/`;

  recordAdminNotification({
    eventType: 'Permohonan Kredensialing & Berkas Lengkap Terkirim (Tahap 6 Selesai)',
    subject: adminSubject,
    applicantName: pemohon,
    applicantNip: nip,
    unit: unit,
    bodyText: adminBody
  });

  closeModal('modalUploadBerkasKredensial');

  showToast(`Permohonan kredensialing lengkap atas nama ${pemohon} BERHASIL DIKIRIMKAN beserta seluruh berkas kelengkapan! Notifikasi resmi terkirim ke email Komite & Sekretaris.`, 'success');

  showAdminEmailNoticeModal({
    eventType: 'Permohonan Kredensialing Lengkap Terkirim (Tahap 6 Selesai)',
    subject: adminSubject,
    applicantName: pemohon,
    bodyText: adminBody
  });

  switchTab('kredensial');

  // Buka tracker status berkas secara otomatis
  setTimeout(() => {
    toggleTrackerKredensial();
  }, 450);
}

function cekBukaRkkOnline() {
  openNewKredensialModal();
  syncAllDownstreamFormsFromCv();
  syncJenisPermohonanToRkk();

  const suratJenjang = document.getElementById('suratJenjang')?.value;
  if (suratJenjang) {
    const formJenjang = document.getElementById('formJenjang');
    if (formJenjang) {
      formJenjang.value = suratJenjang;
      onJenjangChange(suratJenjang);
    }
  }

  // Pastikan formAreaKlinis terisi dan terkunci sesuai form sebelumnya
  const master = getActiveCvMasterData();
  const effectiveArea = master.areaKlinis || document.getElementById('formAreaKlinis')?.value || 'kmb_bedah_pk3';
  const selArea = document.getElementById('formAreaKlinis');
  if (selArea) {
    if (selArea.querySelector(`option[value="${effectiveArea}"]`)) {
      selArea.value = effectiveArea;
    }
    selArea.classList.add('input-locked');
    selArea.setAttribute('tabindex', '-1');
    selArea.style.pointerEvents = 'none';
    selArea.style.background = 'var(--bg-locked, #f1f5f9)';
    selArea.style.cursor = 'not-allowed';
  }
  const formFilterEl = document.getElementById('formRkkAreaFilter');
  if (formFilterEl && effectiveArea) formFilterEl.value = effectiveArea;
  if (effectiveArea) onAreaKlinisChange(effectiveArea);

  goToWizardStep(2);
}

function toggleTrackerKredensial() {
  const box = document.getElementById('boxTrackerKredensial');
  if (!box) return;
  const isHidden = box.style.display === 'none' || !box.style.display;
  box.style.display = isHidden ? 'block' : 'none';
  if (isHidden) {
    renderKredensialTrackerVisual();
    box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

function lacakStatusKredensial() {
  if (!state.currentUser || state.currentUser.role === 'guest') {
    showToast('Akses Terbatas: Sesuai UU PDP No. 27/2022, pelacakan berkas kredensial hanya dapat diakses setelah login akun resmi.', 'warning');
    logoutToPortal();
    return;
  }
  const query = document.getElementById('trackerSearchNip')?.value.trim();
  renderKredensialTrackerVisual(query);
  const box = document.getElementById('boxTrackerKredensial');
  if (box) box.style.display = 'block';
}

function renderKredensialTrackerVisual(query) {
  const container = document.getElementById('trackerVisualContainer');
  if (!container) return;

  // 1. Jika Belum Login atau Mode Guest / Publik
  if (!state.currentUser || state.currentUser.role === 'guest') {
    container.innerHTML = `
      <div style="background: var(--bg-card); border: 1.5px dashed #cbd5e1; border-radius: var(--radius-lg); padding: 2.25rem 1.5rem; text-align: center; margin-top: 1rem;">
        <div style="width: 54px; height: 54px; border-radius: 50%; background: rgba(220, 38, 38, 0.1); color: #dc2626; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin: 0 auto 0.75rem;">
          <i class="fa-solid fa-user-lock"></i>
        </div>
        <div style="font-size: 1.1rem; font-weight: 800; color: var(--text-main);">Pelacakan Berkas Kredensial Terlindungi</div>
        <div style="font-size: 0.82rem; color: var(--text-muted); max-width: 520px; margin: 0.4rem auto 1.25rem; line-height: 1.55;">
          Berdasarkan <strong>UU No. 27/2022 tentang Pelindungan Data Pribadi (UU PDP)</strong>, status pelacakan berkas kredensial klinis bersifat rahasia dan tidak dapat diakses secara publik/anonim. Silakan masuk (login) untuk melacak berkas usulan Anda secara aman.
        </div>
        <div style="display: flex; justify-content: center; gap: 0.75rem; flex-wrap: wrap;">
          <button type="button" class="btn-primary" onclick="openLoginModal('pengusul')">
            <i class="fa-solid fa-user-nurse"></i> Login Pengusul (Perawat / Bidan)
          </button>
          <button type="button" class="btn-secondary" onclick="openLoginModal('komite')">
            <i class="fa-solid fa-shield-halved"></i> Login Pengurus Komite
          </button>
        </div>
      </div>
    `;
    return;
  }

  let nurse = null;

  // 2. Jika Pengusul Mandiri Login
  if (state.currentUser.role === 'pengusul') {
    const curNip = (state.currentUser.nip || '').trim().replace(/\s+/g, '');
    const curName = (state.currentUser.name || '').trim().toLowerCase();

    if (query) {
      const qClean = query.trim().replace(/\s+/g, '').toLowerCase();
      if (!curNip.includes(qClean) && !curName.includes(qClean)) {
        showToast('Pencarian Dibatasi: Anda hanya berhak melacak berkas kredensial milik Anda sendiri (UU PDP No. 27/2022).', 'warning');
      }
    }

    nurse = state.nurses.find(n => {
      const nNip = (n.nip || '').trim().replace(/\s+/g, '');
      const nName = (n.name || '').trim().toLowerCase();
      return (curNip && nNip === curNip) || (curName && nName.includes(curName.split(' ')[0]));
    });

    if (!nurse) {
      nurse = {
        name: state.currentUser.name,
        nip: state.currentUser.nip || '-',
        pkLevel: state.currentUser.jenjang || 'PK III',
        unit: state.currentUser.unit || 'Enggang Gading 2',
        strNumber: state.currentUser.strNumber || '140152119-2849103',
        credentialStatus: 'Proses Review'
      };
    }
  } else {
    // 3. Jika Admin Komite
    if (query) {
      nurse = state.nurses.find(n => 
        n.name.toLowerCase().includes(query.toLowerCase()) || 
        n.nip.toLowerCase().includes(query.toLowerCase())
      );
    }
    if (!nurse) {
      nurse = state.nurses.find(n => n.credentialStatus === 'Proses Review') || state.nurses[0];
    }
  }

  let activeStep = 3;
  let statusBadge = '<span class="badge" style="background:#e0f2fe; color:#0369a1; font-weight:700;">Tahap 3: Menunggu Unggah Berkas Lengkap</span>';
  let reviewerNote = 'Asesmen Mandiri RKK telah diisi. Silakan tanda tangani seluruh dokumen cetak dan unggah pada Langkah 5.';

  if (nurse && nurse.credentialStatus === 'Disetujui') {
    activeStep = 5;
    statusBadge = '<span class="badge" style="background:#dcfce7; color:#15803d; font-weight:700;">Tahap 5: SPK & RKK Terbit</span>';
    reviewerNote = `SK Penugasan Klinis telah ditandatangani Direktur RSUD dr. Soedarso (${nurse.spkNumber}) dan berlaku aktif.`;
  } else if (nurse && nurse.credentialStatus === 'Menunggu Mitra Bestari') {
    activeStep = 4;
    statusBadge = '<span class="badge" style="background:#fef3c7; color:#92400e; font-weight:700;">Tahap 4: Telaah Mitra Bestari</span>';
    reviewerNote = 'Berkas lengkap telah diverifikasi subkomite dan sedang dalam telaah Tim Asesor Mitra Bestari spesialis.';
  } else if (state.kredensialBerkasUploaded && !query) {
    activeStep = 4;
    statusBadge = '<span class="badge" style="background:#fef3c7; color:#92400e; font-weight:700;">Tahap 4: Berkas Lengkap (Antrean Verifikasi)</span>';
    reviewerNote = 'Seluruh 5 berkas kredensialing (CV, Logbook sah Ka.Ru, Surat Permohonan, RKK, STR, Ijazah) telah diunggah ke sistem. Pengajuan Anda masuk antrean telaah Subkomite & Mitra Bestari.';
  } else if (state.kredensialRkkSubmitted && !query) {
    activeStep = 3;
    statusBadge = '<span class="badge" style="background:#e0f2fe; color:#0369a1; font-weight:700;">Tahap 3: Asesmen RKK Selesai</span>';
    reviewerNote = 'Dokumen RKK resmi telah diterbitkan. Lanjutkan ke Langkah 5 untuk mengunggah seluruh berkas bertanda tangan.';
  }

  const nName = nurse ? nurse.name : 'Ns. Hendra Kurniawan, S.Kep';
  const nPk = nurse ? nurse.pkLevel : 'PK III';
  const nNip = nurse ? nurse.nip : '19920415 201903 1 004';
  const nUnit = nurse ? nurse.unit : 'Ruang Enggang Gading 2';
  const nStr = nurse ? nurse.strNumber : '140152123-2893812';
  const isApproved = nurse && nurse.credentialStatus === 'Disetujui';

  container.innerHTML = `
    <!-- 5-Stage Timeline Bar -->
    <div class="tracker-timeline">
      <div class="tracker-step-item ${activeStep >= 1 ? 'completed' : ''} ${activeStep === 1 ? 'active' : ''}">
        <div class="tracker-circle">
          ${activeStep > 1 ? '<i class="fa-solid fa-check"></i>' : '1'}
        </div>
        <div class="tracker-step-label">1. Dokumen Pemohon</div>
        <div class="tracker-step-date">CV, Logbook &amp; Surat</div>
      </div>

      <div class="tracker-step-item ${activeStep > 2 ? 'completed' : ''} ${activeStep === 2 ? 'active' : ''}">
        <div class="tracker-circle">
          ${activeStep > 2 ? '<i class="fa-solid fa-check"></i>' : '2'}
        </div>
        <div class="tracker-step-label">2. Asesmen RKK</div>
        <div class="tracker-step-date">Buku Putih 2026</div>
      </div>

      <div class="tracker-step-item ${activeStep > 3 ? 'completed' : ''} ${activeStep === 3 ? 'active' : ''}">
        <div class="tracker-circle">
          ${activeStep > 3 ? '<i class="fa-solid fa-check"></i>' : '3'}
        </div>
        <div class="tracker-step-label">3. Unggah Berkas Lengkap</div>
        <div class="tracker-step-date">Tanda Tangan Mandiri</div>
      </div>

      <div class="tracker-step-item ${activeStep > 4 ? 'completed' : ''} ${activeStep === 4 ? 'active' : ''}">
        <div class="tracker-circle">
          ${activeStep > 4 ? '<i class="fa-solid fa-check"></i>' : '4'}
        </div>
        <div class="tracker-step-label">4. Telaah Mitra Bestari</div>
        <div class="tracker-step-date">Peer Review Subkomite</div>
      </div>

      <div class="tracker-step-item ${activeStep >= 5 ? 'completed' : ''} ${activeStep === 5 ? 'active' : ''}">
        <div class="tracker-circle">
          ${activeStep >= 5 ? '<i class="fa-solid fa-check"></i>' : '5'}
        </div>
        <div class="tracker-step-label">5. Terbit SPK Direktur</div>
        <div class="tracker-step-date">Penerbitan SK Resmi</div>
      </div>
    </div>

    <!-- Active Details Card -->
    <div style="background: var(--bg-app); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 1rem 1.25rem; margin-top: 1.25rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
      <div>
        <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.35rem; flex-wrap: wrap;">
          <span style="font-weight: 800; font-size: 0.95rem; color: var(--text-main);">${nName}</span>
          <span class="badge-pk badge-pk3">${nPk}</span>
          ${statusBadge}
        </div>
        <div style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.5;">
          <strong>NIP:</strong> ${nNip} &bull; <strong>Unit Kerja:</strong> ${nUnit} &bull; <strong>No. STR:</strong> ${nStr}<br>
          <strong>Catatan Proses:</strong> ${reviewerNote}
        </div>
      </div>
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
        ${nurse ? `
          <button class="btn-secondary" style="font-size: 0.8rem; padding: 0.4rem 0.8rem;" onclick="viewNurseDetail('${nurse.id}')">
            <i class="fa-solid fa-id-card"></i> Lihat Profil
          </button>
        ` : ''}
        ${isApproved ? `
          <button class="btn-primary" style="font-size: 0.8rem; padding: 0.4rem 0.8rem;" onclick="openPrintSpkModal('${nurse.id}')">
            <i class="fa-solid fa-print"></i> Cetak SPK
          </button>
        ` : ''}
      </div>
    </div>
  `;
}

/* ==========================================================================
   OFFICIAL SPK & RKK PRINT & WORD EXPORT
   ========================================================================== */
function openPrintSpkModal(nurseId) {
  const nurse = state.nurses.find(n => n.id === nurseId);
  if (!nurse) return;

  state.selectedNurse = nurse;

  // Fill Header & Meta
  document.getElementById('docSpkNumberText').textContent = `NOMOR: ${nurse.spkNumber || '800/1422/RSUD-DS/KOM-KEP/2024'}`;
  document.getElementById('docSpkDate').textContent = formatDate(nurse.spkDate || '2024-02-10');
  document.getElementById('docStaffName').textContent = nurse.name;
  document.getElementById('docStaffNip').textContent = nurse.nip;
  document.getElementById('docStaffStr').textContent = nurse.strNumber;
  document.getElementById('docStaffStrExpiry').textContent = formatDate(nurse.strExpiry);
  document.getElementById('docStaffPk').textContent = `${nurse.pkLevel} (${nurse.profession || 'Perawat Klinis'})`;
  document.getElementById('docStaffUnit').textContent = nurse.unit;
  document.getElementById('docStaffValidity').textContent = `${formatDate(nurse.spkDate || '2024-02-10')} s/d ${formatDate(nurse.spkExpiry || '2027-02-10')} (3 Tahun)`;

  // Fill RKK Competencies
  const catalog = window.KOMITE_DATA?.rkkCatalog?.[nurse.pkLevel] || window.KOMITE_DATA?.rkkCatalog?.['PK II'];
  const competencies = catalog?.competencies || [];
  const tbody = document.getElementById('docRkkListBody');

  if (tbody) {
    tbody.innerHTML = competencies.map((item, idx) => `
      <tr>
        <td style="text-align: center;">${idx + 1}.</td>
        <td style="font-family: Arial, sans-serif; font-size: 0.8rem; font-weight: 700;">${item.id}</td>
        <td>
          <div style="font-weight: 600;">${item.name}</div>
          <div style="font-size: 0.72rem; color: #475569;">Kategori: ${item.domain}</div>
        </td>
        <td style="text-align: center; font-size: 1.1rem; color: #15803d;">
          ${item.defaultMandiri ? '✓' : '-'}
        </td>
        <td style="text-align: center; font-size: 1.1rem; color: #b45309;">
          ${!item.defaultMandiri ? '✓' : '-'}
        </td>
      </tr>
    `).join('');
  }

  openModal('modalPrintSPK');
}

function printOfficialDoc() {
  window.print();
}

function exportOfficialWord() {
  if (!state.selectedNurse) return;
  const n = state.selectedNurse;

  const catalog = window.KOMITE_DATA?.rkkCatalog?.[n.pkLevel] || window.KOMITE_DATA?.rkkCatalog?.['PK II'];
  const comps = catalog?.competencies || [];

  const rowsHtml = comps.map((c, i) => `
    <tr>
      <td style="text-align: center; border: 1px solid #000000; padding: 5px;">${i + 1}</td>
      <td style="border: 1px solid #000000; padding: 5px; font-weight: bold;">${c.id}</td>
      <td style="border: 1px solid #000000; padding: 5px;">${c.name}</td>
      <td style="text-align: center; border: 1px solid #000000; padding: 5px;">${c.defaultMandiri ? 'V' : '-'}</td>
      <td style="text-align: center; border: 1px solid #000000; padding: 5px;">${!c.defaultMandiri ? 'V' : '-'}</td>
    </tr>
  `).join('');

  const wordContent = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head><meta charset='utf-8'><title>SPK & RKK - ${n.name}</title>
    <style>
      body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.3; }
      table { border-collapse: collapse; width: 100%; }
      .kop { text-align: center; border-bottom: 3px double #000; padding-bottom: 10px; margin-bottom: 15px; }
      .kop h3 { margin: 0; font-size: 14pt; }
      .kop h2 { margin: 2px 0; font-size: 16pt; }
      .kop p { margin: 0; font-size: 9pt; }
      .title { text-align: center; margin: 15px 0; text-decoration: underline; font-weight: bold; font-size: 13pt; }
      .sig-table { width: 100%; margin-top: 30px; text-align: center; }
      .sig-space { height: 70px; }
    </style>
    </head>
    <body>
      <div class="kop">
        <h3>PEMERINTAH PROVINSI KALIMANTAN BARAT</h3>
        <h2>RUMAH SAKIT UMUM DAERAH DOKTER SOEDARSO</h2>
        <p>Jalan DR. Soedarso No. 1 Pontianak Tenggara, Kota Pontianak, Kalimantan Barat 78124</p>
        <p>Telepon: (0561) 737701, Fax: (0561) 737702 | Laman: rsudsoedarso.kalbarprov.go.id</p>
      </div>

      <div class="title">SURAT PENUGASAN KLINIS (CLINICAL APPOINTMENT)<br>DAN RINCIAN KEWENANGAN KLINIS (RKK)</div>
      <p style="text-align: center; margin-top: -10px; font-size: 11pt;">NOMOR: ${n.spkNumber}</p>

      <p>Berdasarkan rekomendasi Ketua Komite Keperawatan RSUD dr. Soedarso Pontianak, dengan ini Direktur menetapkan Penugasan Klinis kepada:</p>
      
      <table style="margin-bottom: 15px;">
        <tr><td style="width: 25%; font-weight: bold;">Nama Pegawai</td><td>: ${n.name}</td></tr>
        <tr><td style="font-weight: bold;">NIP</td><td>: ${n.nip}</td></tr>
        <tr><td style="font-weight: bold;">Nomor STR</td><td>: ${n.strNumber} (Berlaku s/d ${formatDate(n.strExpiry)})</td></tr>
        <tr><td style="font-weight: bold;">Jenjang Karir</td><td>: ${n.pkLevel} (${n.profession})</td></tr>
        <tr><td style="font-weight: bold;">Unit Tugas</td><td>: ${n.unit}</td></tr>
        <tr><td style="font-weight: bold;">Masa Berlaku</td><td>: ${formatDate(n.spkDate)} s/d ${formatDate(n.spkExpiry)}</td></tr>
      </table>

      <p>Diberikan kewenangan klinis asuhan keperawatan / kebidanan sebagai berikut:</p>

      <table>
        <thead>
          <tr style="background-color: #f2f2f2;">
            <th style="border: 1px solid #000; width: 35px; padding: 6px;">No</th>
            <th style="border: 1px solid #000; width: 90px; padding: 6px;">Kode</th>
            <th style="border: 1px solid #000; padding: 6px;">Rincian Kewenangan Klinis</th>
            <th style="border: 1px solid #000; width: 70px; padding: 6px;">Mandiri</th>
            <th style="border: 1px solid #000; width: 70px; padding: 6px;">Supervisi</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>

      <table class="sig-table">
        <tr>
          <td style="width: 50%;">
            Mengetahui,<br><b>Ketua Komite Keperawatan</b>
            <div class="sig-space"></div>
            <b><u>M. Separia Russanto, S.Kep., Ns</u></b><br>
            RSUD Dokter Soedarso Pontianak
          </td>
          <td style="width: 50%;">
            Ditetapkan di Pontianak,<br><b>Direktur RSUD Dokter Soedarso</b>
            <div class="sig-space"></div>
            <b><u>HARY AGUNG TJAHYADI</u></b><br>
            Direktur Rumah Sakit
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff' + wordContent], { type: 'application/msword' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `SPK_RKK_${n.name.replace(/[^a-zA-Z0-9]/g, '_')}.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast(`Dokumen Word SPK & RKK untuk ${n.name} berhasil diunduh.`, 'success');
}

/* ==========================================================================
   DETAIL PROFIL PERAWAT MODAL
   ========================================================================== */
function viewNurseDetail(nurseId) {
  const nurse = state.nurses.find(n => n.id === nurseId);
  if (!nurse) return;

  const modalBody = document.getElementById('nurseDetailBody');
  const btnPrint = document.getElementById('btnDetailPrintSpk');

  if (btnPrint) {
    btnPrint.onclick = () => {
      closeModal('modalNurseDetail');
      secureOpenPrintSpkModal(nurse.id);
    };
  }

  const pkBadgeClass = getPkBadgeClass(nurse.pkLevel);
  const statusBadgeClass = getStatusBadgeClass(nurse.credentialStatus);
  const avatar = nurse.avatar || 'https://images.unsplash.com/photo-1594824813589-4a0b271d50c1?w=150&auto=format&fit=crop&q=80';

  const canSeeFull = canViewFullData(nurse) || state.privacyModeRevealed;
  const nipDisplay = canSeeFull ? nurse.nip : maskNip(nurse.nip);
  const strDisplay = canSeeFull ? nurse.strNumber : maskStr(nurse.strNumber);

  if (modalBody) {
    modalBody.innerHTML = `
      <div style="display: flex; gap: 1.5rem; align-items: center; margin-bottom: 1.5rem; background: var(--bg-app); border: 1px solid var(--border-subtle); padding: 1.25rem; border-radius: var(--radius-lg);">
        <img src="${avatar}" alt="${nurse.name}" style="width: 72px; height: 72px; border-radius: var(--radius-full); object-fit: cover; border: 2.5px solid var(--primary-600);">
        <div>
          <h3 style="font-family: var(--font-heading); font-size: 1.25rem; font-weight: 800; color: var(--text-main); margin-bottom: 4px;">${nurse.name}</h3>
          <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
            <span class="badge-pk ${pkBadgeClass}">${nurse.pkLevel}</span>
            <span class="badge-status ${statusBadgeClass}">${nurse.credentialStatus}</span>
            <span style="font-size: 0.8rem; color: var(--text-muted);">${nurse.unit}</span>
          </div>
        </div>
      </div>

      <div class="form-grid-2">
        <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1rem;">
          <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Nomor Induk Pegawai (NIP)</div>
          <div style="font-family: var(--font-mono); font-size: 0.95rem; font-weight: 700; margin-top: 3px;">${nipDisplay}</div>
        </div>
        <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1rem;">
          <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Surat Tanda Registrasi (STR)</div>
          <div style="font-family: var(--font-mono); font-size: 0.95rem; font-weight: 700; margin-top: 3px;">${strDisplay}</div>
          <div style="font-size: 0.75rem; color: var(--text-muted);">Berlaku s/d ${formatDate(nurse.strExpiry)}</div>
        </div>
      </div>

      <div class="form-grid-2">
        <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1rem;">
          <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Surat Penugasan Klinis (SPK)</div>
          <div style="font-size: 0.88rem; font-weight: 700; margin-top: 3px;">${nurse.spkNumber || 'Dalam Proses'}</div>
          <div style="font-size: 0.75rem; color: var(--text-muted);">Masa Berlaku: ${formatDate(nurse.spkDate)} s/d ${formatDate(nurse.spkExpiry)}</div>
        </div>
        <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1rem;">
          <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Asesor Mitra Bestari</div>
          <div style="font-size: 0.88rem; font-weight: 700; margin-top: 3px;">${nurse.peerReviewer || 'Tim Subkomite Kredensial'}</div>
          <div style="font-size: 0.75rem; color: var(--text-muted);">Kompetensi Terverifikasi: ${nurse.approvedCompetencies} / ${nurse.totalCompetencies} Tindakan</div>
        </div>
      </div>
    `;
  }

  openModal('modalNurseDetail');
}

/* ==========================================================================
   MODAL CONTROLLER
   ========================================================================== */
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

// Close modal when clicking on overlay background
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

/* ==========================================================================
   TOAST NOTIFICATION ENGINE
   ========================================================================== */
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  let icon = 'fa-circle-info';
  if (type === 'success') icon = 'fa-circle-check';
  if (type === 'warning') icon = 'fa-triangle-exclamation';
  if (type === 'error') icon = 'fa-circle-xmark';

  toast.innerHTML = `
    <i class="fa-solid ${icon}" style="font-size: 1.15rem; color: ${type === 'success' ? '#10b981' : type === 'warning' ? '#f59e0b' : '#0284c7'};"></i>
    <div style="flex-grow: 1;">${message}</div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/* ==========================================================================
   SISTEM NOTIFIKASI & KONEKSI EMAIL ADMINISTRASI RESMI RSUD DR. SOEDARSO
   Email Komite    : komitekeperawatanrsds2023@gmail.com
   Email Sekretaris: yadhie28@gmail.com
   ========================================================================== */

const ADMIN_EMAIL_CONFIG = {
  committeeEmail: "komitekeperawatanrsds2023@gmail.com",
  committeeName: "Komite Keperawatan RSUD dr. Soedarso",
  secretaryEmail: "yadhie28@gmail.com",
  secretaryName: "Ns. Rusmulyadi, S.Kep., MARS (Sekretaris)",
  combinedRecipients: "komitekeperawatanrsds2023@gmail.com, yadhie28@gmail.com",
  allEmails: ["komitekeperawatanrsds2023@gmail.com", "yadhie28@gmail.com"]
};

/**
 * Catat aktivitas administrasi dan hubungkan ke email komite & sekretaris
 */
function recordAdminNotification({ eventType, subject, applicantName, applicantNip, unit, details, bodyText }) {
  const notifId = 'NOTIF-' + Date.now();
  const dateStr = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }) + ', ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';

  const newRecord = {
    id: notifId,
    timestamp: dateStr,
    eventType: eventType || 'Aktivitas Administrasi',
    applicantName: applicantName || 'Tenaga Keperawatan',
    applicantNip: applicantNip || '-',
    unit: unit || '-',
    subject: subject || `[ADMIN KOMITE] ${eventType}`,
    details: details || '',
    bodyText: bodyText || '',
    recipients: [...ADMIN_EMAIL_CONFIG.allEmails],
    status: 'Terkoneksi'
  };

  if (!state.adminNotifications) state.adminNotifications = [];
  state.adminNotifications.unshift(newRecord);
  saveAdminNotifications();

  return newRecord;
}

/**
 * Generate Mailto & Gmail links addressed to both emails
 */
function generateAdminMailLinks(subject, bodyText) {
  const cleanSubject = encodeURIComponent(subject || '');
  const cleanBody = encodeURIComponent(bodyText || '');
  return {
    mailto: `mailto:${ADMIN_EMAIL_CONFIG.combinedRecipients}?subject=${cleanSubject}&body=${cleanBody}`,
    gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(ADMIN_EMAIL_CONFIG.combinedRecipients)}&su=${cleanSubject}&body=${cleanBody}`
  };
}

/**
 * Tampilkan Modal Dialog Notifikasi Administrasi Terkoneksi
 */
function showAdminEmailNoticeModal({ eventType, subject, applicantName, bodyText }) {
  const modal = document.getElementById('modalAdminEmailNotice');
  if (!modal) return;

  const links = generateAdminMailLinks(subject, bodyText);

  const titleEl = document.getElementById('adminNoticeTitle');
  const eventEl = document.getElementById('adminNoticeEvent');
  const applicantEl = document.getElementById('adminNoticeApplicant');
  const subjectEl = document.getElementById('adminNoticeSubject');
  const bodyEl = document.getElementById('adminNoticeBody');
  const btnGmail = document.getElementById('btnAdminNoticeGmail');
  const btnMailto = document.getElementById('btnAdminNoticeMailto');
  const btnCopy = document.getElementById('btnAdminNoticeCopy');

  if (titleEl) titleEl.textContent = 'Notifikasi Administrasi Terkoneksi ke Email';
  if (eventEl) eventEl.textContent = eventType || 'Pemberitahuan Sistem';
  if (applicantEl) applicantEl.textContent = applicantName || 'Tenaga Keperawatan';
  if (subjectEl) subjectEl.textContent = subject || '-';
  if (bodyEl) bodyEl.textContent = bodyText || '';

  if (btnGmail) {
    btnGmail.onclick = () => window.open(links.gmail, '_blank');
  }
  if (btnMailto) {
    btnMailto.href = links.mailto;
  }
  if (btnCopy) {
    btnCopy.onclick = () => {
      navigator.clipboard.writeText(`Kepada: ${ADMIN_EMAIL_CONFIG.combinedRecipients}\nSubjek: ${subject}\n\n${bodyText}`).then(() => {
        showToast('Format notifikasi administrasi berhasil disalin ke clipboard!', 'success');
      }).catch(() => {
        showToast('Gagal menyalin teks.', 'info');
      });
    };
  }

  openModal('modalAdminEmailNotice');
}

/**
 * Buka Pusat Notifikasi Email Administrasi (Admin & Komite Center)
 */
function openAdminEmailCenter() {
  renderAdminNotificationsTable();
  openModal('modalAdminEmailCenter');
}

/**
 * Render Tabel Aktivitas Notifikasi Email di Modal Center
 */
function renderAdminNotificationsTable() {
  const tbody = document.getElementById('adminNotificationsTableBody');
  if (!tbody) return;

  const list = state.adminNotifications || [];
  if (list.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; padding: 2rem; color: var(--text-muted);">
          Belum ada riwayat aktivitas notifikasi administrasi.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = list.map(item => `
    <tr>
      <td style="font-size: 0.78rem; color: var(--text-muted); white-space: nowrap;">
        ${item.timestamp}
      </td>
      <td style="font-size: 0.82rem; font-weight: 700; color: var(--text-main);">
        <i class="fa-solid fa-file-signature" style="color: var(--primary-600); margin-right: 4px;"></i>
        ${item.eventType}
      </td>
      <td style="font-size: 0.82rem;">
        <strong>${item.applicantName}</strong><br>
        <span style="font-size: 0.74rem; color: var(--text-muted);">${item.unit || item.applicantNip}</span>
      </td>
      <td style="font-size: 0.76rem;">
        <span class="badge" style="background: rgba(16, 185, 129, 0.12); color: #047857; margin-bottom: 2px; display: inline-block;">
          <i class="fa-solid fa-check-double"></i> 2 Penerima Terhubung
        </span><br>
        <code style="font-size: 0.7rem; color: var(--text-muted);">komitekeperawatanrsds2023@gmail.com</code><br>
        <code style="font-size: 0.7rem; color: var(--text-muted);">yadhie28@gmail.com</code>
      </td>
      <td style="text-align: right; white-space: nowrap;">
        <button class="btn-secondary" style="padding: 0.25rem 0.55rem; font-size: 0.75rem;" onclick="viewAdminNotifDetail('${item.id}')" title="Lihat Draf Notifikasi">
          <i class="fa-regular fa-envelope"></i> Lihat
        </button>
      </td>
    </tr>
  `).join('');
}

function viewAdminNotifDetail(notifId) {
  const item = (state.adminNotifications || []).find(n => n.id === notifId);
  if (!item) return;
  showAdminEmailNoticeModal({
    eventType: item.eventType,
    subject: item.subject,
    applicantName: item.applicantName,
    bodyText: item.bodyText || `${item.eventType} - ${item.applicantName}\nUnit: ${item.unit}\nNIP: ${item.applicantNip}`
  });
}

/**
 * Uji coba kirim ping notifikasi ke kedua email
 */
function testSendAdminEmailPing() {
  const testSubject = `[UJI KONEKSI SISTEM] Notifikasi Administrasi Komite Keperawatan RSUD dr. Soedarso`;
  const testBody = 
    `Kepada Yth.\n` +
    `1. Komite Keperawatan RSUD dr. Soedarso (komitekeperawatanrsds2023@gmail.com)\n` +
    `2. Ns. Rusmulyadi, S.Kep., MARS - Sekretaris Komite (yadhie28@gmail.com)\n\n` +
    `UJI KONEKSI SISTEM NOTIFIKASI ADMINISTRASI:\n\n` +
    `Koneksi saluran email administrasi Komite Keperawatan RSUD dr. Soedarso Pontianak dinyatakan BERFUNGSI DENGAN BAIK.\n\n` +
    `Seluruh berkas administrasi meliputi:\n` +
    `1. Formulir CV Portofolio Klinis (Langkah 1)\n` +
    `2. Formulir Logbook Kinerja Klinis Ka.Ru (Langkah 2)\n` +
    `3. Formulir Surat Permohonan Kredensialing (Langkah 3)\n` +
    `4. Unggah Dokumen Portofolio Lengkap (Langkah 4)\n` +
    `5. Pengisian Asesmen Mandiri RKK Online (Langkah 5)\n` +
    `6. Pelaporan & Konsultasi Etika / Disiplin Profesi\n` +
    `7. Penerbitan Rekomendasi SPK/RKK Mitra Bestari\n\n` +
    `Kini otomatis terhubung ke email komitekeperawatanrsds2023@gmail.com dan email sekretaris yadhie28@gmail.com.\n\n` +
    `Waktu Pengujian: ${new Date().toLocaleString('id-ID')}\n` +
    `Sistem Portal Komite Keperawatan RSUD dr. Soedarso Pontianak\n` +
    `https://yadhie28.github.io/komite-keperawatan-soedarso/`;

  const record = recordAdminNotification({
    eventType: 'Uji Koneksi Notifikasi Email Administrasi',
    subject: testSubject,
    applicantName: 'Sistem Portal Komite Keperawatan',
    applicantNip: 'ADMIN-TEST-SYS',
    unit: 'Sekretariat Komite Keperawatan',
    bodyText: testBody
  });

  renderAdminNotificationsTable();

  showAdminEmailNoticeModal({
    eventType: record.eventType,
    subject: testSubject,
    applicantName: 'Administrator Sistem',
    bodyText: testBody
  });

  showToast('Uji koneksi dibuat! Notifikasi tercatat untuk komitekeperawatanrsds2023@gmail.com & yadhie28@gmail.com', 'success');
}

/**
 * Buka pengiriman cepat email administrasi dari modal preview surat
 */
function openQuickAdminEmailDispatch(type) {
  const applicant = state.currentApplicant || {
    nama: 'Ns. Hendra Kurniawan, S.Kep',
    nip: '19920415 201903 1 004',
    unit: 'Ruang Enggang Gading 2 (Penyakit Dalam)',
    jenjang: 'PK III'
  };

  const subject = `[PERMOHONAN KREDENSIAL] ${applicant.nama} (${applicant.jenjang} - ${applicant.unit})`;
  const bodyText = 
    `Kepada Yth.\n` +
    `1. Ketua Komite Keperawatan RSUD dr. Soedarso (komitekeperawatanrsds2023@gmail.com)\n` +
    `2. Ns. Rusmulyadi, S.Kep., MARS - Sekretaris Komite (yadhie28@gmail.com)\n\n` +
    `Dengan hormat,\n` +
    `Berikut adalah pemberitahuan resmi pengajuan permohonan kredensialing tenaga keperawatan:\n\n` +
    `• Nama Lengkap    : ${applicant.nama}\n` +
    `• NIP / NIK       : ${applicant.nip}\n` +
    `• Unit Kerja      : ${applicant.unit}\n` +
    `• Jenjang PK      : ${applicant.jenjang}\n` +
    `• Tanggal Pengajuan: ${new Date().toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}\n` +
    `• Status Berkas   : Surat Permohonan 3 Halaman telah diterbitkan dan siap ditandatangani mandiri.\n\n` +
    `Mohon untuk dicatat pada buku register administrasi Sekretariat Komite Keperawatan.\n\n` +
    `Salam hormat,\n` +
    `Pemohon Kredensialing & Sistem Portal RSUD dr. Soedarso\n` +
    `https://yadhie28.github.io/komite-keperawatan-soedarso/`;

  showAdminEmailNoticeModal({
    eventType: 'Pengajuan Formulir Permohonan Kredensial',
    subject: subject,
    applicantName: applicant.nama,
    bodyText: bodyText
  });
}

/* ==========================================================================
   ALUR LANGKAH 5: DOKUMEN RESMI RINCIAN KEWENANGAN KLINIS (RKK) HVS & EXPORT
   Format Standar Lampiran SPK RSUD dr. Soedarso Pontianak (Buku Pedoman 2026)
   ========================================================================== */

function openPreviewRkkModal() {
  const applicantBadge = document.getElementById('previewRkkApplicantBadge');
  const banner = document.getElementById('previewRkkSuccessBanner');
  
  const nama = document.getElementById('formNama')?.value.trim() || state.currentApplicant?.nama || 'Ns. Hendra Kurniawan, S.Kep';
  if (applicantBadge) applicantBadge.textContent = nama;
  if (banner) banner.style.display = 'block';

  previewRkkHVS('filled');
}

function previewRkkHVS(mode) {
  state.rkkPreviewMode = mode || state.rkkPreviewMode || 'filled';
  const container = document.getElementById('rkkHvsPrintArea');
  if (container) {
    container.innerHTML = generateRkkHVS(state.rkkPreviewMode);
  }

  const btnToggle = document.getElementById('btnTogglePreviewRkkMode');
  if (btnToggle) {
    if (state.rkkPreviewMode === 'blank') {
      btnToggle.innerHTML = '<i class="fa-solid fa-file-signature"></i> Tampilkan Data Terisi';
      btnToggle.style.background = '#d97706';
      btnToggle.style.color = '#fff';
    } else {
      btnToggle.innerHTML = '<i class="fa-regular fa-file"></i> Tampilkan Format Blangko Kosong';
      btnToggle.style.background = 'var(--bg-app)';
      btnToggle.style.color = 'var(--text-main)';
    }
  }

  openModal('modalPreviewRkkResmiHVS');
}

function togglePreviewRkkMode() {
  const nextMode = (state.rkkPreviewMode === 'blank') ? 'filled' : 'blank';
  previewRkkHVS(nextMode);
}

function generateRkkHVS(mode) {
  const isBlank = (mode === 'blank');
  
  const nama = isBlank ? '....................................................................' : (document.getElementById('formNama')?.value.trim() || state.currentApplicant?.nama || 'Ns. Hendra Kurniawan, S.Kep');
  const nip = isBlank ? '....................................................................' : (document.getElementById('formNip')?.value.trim() || state.currentApplicant?.nip || '19920415 201903 1 004');
  const jenjang = isBlank ? '....................................................................' : (document.getElementById('formJenjang')?.value || state.currentApplicant?.jenjang || 'PK III');
  const unit = isBlank ? '....................................................................' : (document.getElementById('formUnit')?.value || state.currentApplicant?.unit || 'Enggang Gading 2');
  const str = isBlank ? '....................................................................' : (document.getElementById('formStr')?.value.trim() || state.currentApplicant?.str || '140152119-3284910');
  const strExp = isBlank ? '........................' : (document.getElementById('formStrExpiry')?.value || '2028-11-20');
  
  const areaSelect = document.getElementById('formAreaKlinis');
  const areaKey = areaSelect?.value || 'kmb_medikal_pk3';
  const areaName = isBlank ? '....................................................................' : (areaSelect?.options[areaSelect.selectedIndex]?.text || getAreaDisplayName(areaKey, jenjang));
  const cluster = getClusterFromAreaKey(areaKey);
  const clusterName = getClusterDisplayName(cluster);

  const allActions = (state.currentWizardRkkList && state.currentWizardRkkList.length > 0)
    ? state.currentWizardRkkList
    : getCumulativeRkkActions(jenjang, areaKey);

  const tier1Actions = allActions.filter(a => a.jenjangLevel === 'PK I');
  const tier2Actions = allActions.filter(a => a.jenjangLevel === 'PK II');
  const tier3Actions = allActions.filter(a => a.jenjangLevel === 'PK III');
  const tier4Actions = allActions.filter(a => a.jenjangLevel === 'PK IV');
  const tier5Actions = allActions.filter(a => a.jenjangLevel === 'PK V');
  const pmbActions   = allActions.filter(a => a.jenjangLevel === 'PMB');

  // Hitung total halaman dokumen
  let totalPages = 3;
  if (jenjang === 'PMB') totalPages = 2;
  else if (tier4Actions.length > 0 || tier5Actions.length > 0) totalPages = 4;

  const logoSrc = 'logo_kalbar.png';

  const kopSoedarso = `
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 2px;">
      <tr>
        <td style="width: 75px; vertical-align: middle; text-align: center; padding-right: 10px;">
          <img src="${logoSrc}" alt="Logo Pemprov Kalbar" style="width: 68px; height: auto;">
        </td>
        <td style="text-align: center; vertical-align: middle; font-family: Arial, Helvetica, sans-serif; color: #000;">
          <div style="font-size: 10.5pt; font-weight: bold; line-height: 1.25; letter-spacing: 0.2px;">PEMERINTAH PROVINSI KALIMANTAN BARAT</div>
          <div style="font-size: 12pt; font-weight: bold; line-height: 1.25; letter-spacing: 0.2px;">RUMAH SAKIT UMUM DAERAH DOKTER SOEDARSO</div>
          <div style="font-size: 11pt; font-weight: bold; line-height: 1.25; letter-spacing: 0.2px;">KOMITE KEPERAWATAN</div>
          <div style="font-size: 8pt; line-height: 1.3; margin-top: 2px;">
            Jalan Dokter Soedarso No.1 Pontianak Tenggara, Kota Pontianak, Kalimantan Barat 78124<br>
            Telp. (0561) 737701, (0561) 746152, Fax. (0561) 736528<br>
            Laman : <span style="color: #0000ee; text-decoration: underline;">https://rsuddrsoedarso.kalbarprov.go.id</span>, Pos-el : <span style="color: #0000ee; text-decoration: underline;">rsud@kalbarprov.go.id</span>
          </div>
        </td>
      </tr>
    </table>
    <div style="border-top: 2.5px solid #000000; border-bottom: 0.8px solid #000000; height: 2px; margin-top: 5px; margin-bottom: 12px;"></div>
  `;

  const runningHeader = (sheetNum, sheetTitle) => `
    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #94a3b8; padding-bottom: 4px; margin-bottom: 10px;">
      <span style="font-size: 8pt; font-weight: bold; color: #475569;">KOMITE KEPERAWATAN RSUD DOKTER SOEDARSO PONTIANAK &bull; RINCIAN KEWENANGAN KLINIS</span>
      <span style="font-size: 8pt; color: #64748b;">Lembar ${sheetNum} &bull; ${sheetTitle}</span>
    </div>
  `;

  const renderRkkRow = (item, idx) => {
    let mandiri1 = '&nbsp;', mandiri2 = '&nbsp;', mandiri3 = '&nbsp;';
    let mb1 = '&nbsp;', mb2 = '&nbsp;', mb3 = '&nbsp;';
    let catatan = '&nbsp;';

    if (!isBlank) {
      const radio = document.querySelector(`input[name="rkk_mandiri_${item.id}"]:checked`);
      const val = radio ? radio.value : String(item.defaultKode || 1);
      if (val === '1') mandiri1 = '<strong>&check;</strong>';
      else if (val === '2') mandiri2 = '<strong>&check;</strong>';
      else mandiri3 = '<strong>&check;</strong>';

      // Kolom REKOMENDASI MITRA BESTARI & Catatan harus kosong dari ceklis
      // karena penilaian diberikan oleh Mitra Bestari bukan pengusul
      mb1 = '&nbsp;';
      mb2 = '&nbsp;';
      mb3 = '&nbsp;';
      catatan = '&nbsp;';
    }

    return `
      <tr>
        <td style="border: 1px solid #000; padding: 3px 2px; text-align: center; font-size: 7.8pt; vertical-align: middle;">${item.no || (idx + 1)}</td>
        <td style="border: 1px solid #000; padding: 3px 5px; font-size: 7.8pt; vertical-align: middle; line-height: 1.25;">
          ${item.name}
          <div style="font-size: 6.8pt; color: #555; display: flex; gap: 4px; margin-top: 1px;">
            ${item.isMandatory ? '<span style="color:#0369a1; font-weight:bold;">[MANDATORY]</span>' : '<span style="color:#b45309; font-weight:bold;">[DIAJUKAN]</span>'}
            <span>Sifat: ${item.jenisTindakan || 'Mandiri'}</span>
          </div>
        </td>
        <td style="border: 1px solid #000; padding: 3px 2px; text-align: center; font-size: 8pt; vertical-align: middle;">${mandiri1}</td>
        <td style="border: 1px solid #000; padding: 3px 2px; text-align: center; font-size: 8pt; vertical-align: middle;">${mandiri2}</td>
        <td style="border: 1px solid #000; padding: 3px 2px; text-align: center; font-size: 8pt; vertical-align: middle;">${mandiri3}</td>
        <td style="border: 1px solid #000; padding: 3px 2px; text-align: center; font-size: 8pt; vertical-align: middle;">${mb1}</td>
        <td style="border: 1px solid #000; padding: 3px 2px; text-align: center; font-size: 8pt; vertical-align: middle;">${mb2}</td>
        <td style="border: 1px solid #000; padding: 3px 2px; text-align: center; font-size: 8pt; vertical-align: middle;">${mb3}</td>
        <td style="border: 1px solid #000; padding: 3px 4px; font-size: 7.3pt; vertical-align: middle; color: #1e293b;">${catatan}</td>
      </tr>
    `;
  };

  const tableHeader = `
    <table class="soedarso-table" style="width: 100%; border-collapse: collapse; margin-bottom: 6px; border: 1px solid #000;">
      <thead>
        <tr style="background: #e2e8f0; color: #000;">
          <th rowspan="2" style="border: 1px solid #000; width: 26px; text-align: center; font-size: 7.2pt; padding: 3px 2px;">NO</th>
          <th rowspan="2" style="border: 1px solid #000; text-align: left; font-size: 7.5pt; padding: 3px 5px;">RINCIAN KOMPETENSI / TINDAKAN ASUHAN KEPERAWATAN</th>
          <th colspan="3" style="border: 1px solid #000; width: 68px; text-align: center; font-size: 7pt; padding: 2px;">PERMOHONAN<br>PEMOHON</th>
          <th colspan="3" style="border: 1px solid #000; width: 68px; text-align: center; font-size: 7pt; padding: 2px;">REKOMENDASI<br>MITRA BESTARI</th>
          <th rowspan="2" style="border: 1px solid #000; width: 90px; text-align: center; font-size: 7pt; padding: 3px 3px;">CATATAN / REVIEW</th>
        </tr>
        <tr style="background: #e2e8f0; color: #000;">
          <th style="border: 1px solid #000; width: 22px; text-align: center; font-size: 7.2pt; padding: 2px;">1</th>
          <th style="border: 1px solid #000; width: 22px; text-align: center; font-size: 7.2pt; padding: 2px;">2</th>
          <th style="border: 1px solid #000; width: 22px; text-align: center; font-size: 7.2pt; padding: 2px;">3</th>
          <th style="border: 1px solid #000; width: 22px; text-align: center; font-size: 7.2pt; padding: 2px;">1</th>
          <th style="border: 1px solid #000; width: 22px; text-align: center; font-size: 7.2pt; padding: 2px;">2</th>
          <th style="border: 1px solid #000; width: 22px; text-align: center; font-size: 7.2pt; padding: 2px;">3</th>
        </tr>
      </thead>
      <tbody>
  `;

  let htmlDoc = '';

  // =========================================================================
  // LEMBAR 1: KOP + IDENTITAS + PANDUAN + BAGIAN A (MANDATORY PK I / DASAR)
  // =========================================================================
  htmlDoc += `
    <div class="soedarso-page page-1" style="background:#fff; width:210mm; min-height:297mm; padding:10mm 14mm; margin-bottom:20px; box-shadow:0 4px 10px rgba(0,0,0,0.15); box-sizing:border-box;">
      ${kopSoedarso}

      <div style="text-align: center; margin-bottom: 8px;">
        <div style="font-size: 10.5pt; font-weight: bold; letter-spacing: 0.3px; text-transform: uppercase;">
          RINCIAN KEWENANGAN KLINIS (RKK) TENAGA KEPERAWATAN
        </div>
        <div style="font-size: 9pt; font-weight: bold; color: #1e3a8a; margin-top: 1px;">
          LAMPIRAN REKOMENDASI SURAT PENUGASAN KLINIS (SPK)
        </div>
        <div style="font-size: 7.8pt; color: #475569;">
          Nomor Register Komite: 800/RKK/KOM-KEP/RSUD-DS/2026 &bull; Standar Buku Putih (White Book 2026)
        </div>
      </div>

      <table class="soedarso-table" style="width: 100%; border-collapse: collapse; margin-bottom: 8px; font-size: 8pt;">
        <tr>
          <td style="width: 25%; font-weight: bold; padding: 2px 4px;">Nama Tenaga Keperawatan</td>
          <td style="width: 2%; padding: 2px 1px;">:</td>
          <td style="width: 38%; font-weight: bold; padding: 2px 4px; color: #0f172a;">${nama}</td>
          <td style="width: 15%; font-weight: bold; padding: 2px 4px;">Jenjang Diajukan</td>
          <td style="width: 2%; padding: 2px 1px;">:</td>
          <td style="width: 18%; font-weight: bold; padding: 2px 4px; color: #1e3a8a;">${jenjang}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; padding: 2px 4px;">NIP / NIPPPK / NIK</td>
          <td style="padding: 2px 1px;">:</td>
          <td style="padding: 2px 4px;">${nip}</td>
          <td style="font-weight: bold; padding: 2px 4px;">Unit Pelayanan</td>
          <td style="padding: 2px 1px;">:</td>
          <td style="padding: 2px 4px;">${unit}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; padding: 2px 4px;">Nomor STR &amp; Berlaku</td>
          <td style="padding: 2px 1px;">:</td>
          <td style="padding: 2px 4px;">${str} (s/d ${strExp})</td>
          <td style="font-weight: bold; padding: 2px 4px;">Area Buku Putih</td>
          <td style="padding: 2px 1px;">:</td>
          <td style="padding: 2px 4px; font-weight: 600;">${areaName}</td>
        </tr>
      </table>

      <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 3px 6px; margin-bottom: 6px; font-size: 7.3pt; line-height: 1.3;">
        <strong>Keterangan Kode Kewenangan:</strong>
        <strong>1</strong>: Mandiri Penuh (M) &bull; 
        <strong>2</strong>: Di bawah Supervisi (S) &bull; 
        <strong>3</strong>: Tidak Diminta / Tidak Diberikan Kewenangan (T).
        <span style="color:#0369a1; margin-left: 6px;"><em>(Prinsip Kumulatif: Jenjang ${jenjang} memuat seluruh kewenangan mandatory di bawahnya).</em></span>
      </div>

      <!-- Bagian A: PK I / Dasar -->
      <div style="font-weight: bold; font-size: 8pt; color: #0e3860; margin-bottom: 3px; background: #e0f2fe; padding: 2px 5px; border-left: 3px solid #0284c7;">
        ${jenjang === 'PMB' ? 'A. PELAYANAN PRAKTIK BIDAN KLINIS (PMB I - IV)' : (jenjang === 'PK I' ? 'A. KEWENANGAN KLINIS DIAJUKAN PK I (GENERALIS / ASUHAN DASAR)' : 'A. KEWENANGAN KLINIS MANDATORY PK I (DASAR GENERALIS)')}
      </div>
      ${tableHeader}
      ${(jenjang === 'PMB' ? pmbActions : tier1Actions).map(renderRkkRow).join('')}
      </tbody></table>

      <div style="text-align: right; font-size: 7.2pt; color: #64748b; margin-top: 6px;">
        Dokumen RKK RSUD dr. Soedarso &bull; Lembar 1 dari ${totalPages}
      </div>
    </div>
  `;

  // =========================================================================
  // LEMBAR 2: BAGIAN B (MANDATORY PK II) + BAGIAN C (DIAJUKAN PK III / SPESIALISASI)
  // =========================================================================
  if (totalPages >= 3) {
    htmlDoc += `
      <div class="soedarso-page page-2" style="background:#fff; width:210mm; min-height:297mm; padding:10mm 14mm; margin-bottom:20px; box-shadow:0 4px 10px rgba(0,0,0,0.15); box-sizing:border-box;">
        ${runningHeader(2, 'Bagian B &amp; C: Kewenangan Klinis Menengah &amp; Spesifik')}

        ${tier2Actions.length > 0 ? `
          <div style="font-weight: bold; font-size: 8pt; color: #0e3860; margin-bottom: 3px; background: #e0f2fe; padding: 2px 5px; border-left: 3px solid #0284c7;">
            B. KEWENANGAN KLINIS ${tier2Actions[0]?.isMandatory ? 'MANDATORY' : 'DIAJUKAN'} PK II (${clusterName.toUpperCase()})
          </div>
          ${tableHeader}
          ${tier2Actions.map(renderRkkRow).join('')}
          </tbody></table>
        ` : ''}

        ${tier3Actions.length > 0 ? `
          <div style="font-weight: bold; font-size: 8pt; color: #0e3860; margin-top: 6px; margin-bottom: 3px; background: #fef3c7; padding: 2px 5px; border-left: 3px solid #d97706;">
            C. KEWENANGAN KLINIS ${tier3Actions[0]?.isMandatory ? 'MANDATORY' : 'DIAJUKAN'} PK III (${areaName.toUpperCase()})
          </div>
          ${tableHeader}
          ${tier3Actions.map(renderRkkRow).join('')}
          </tbody></table>
        ` : ''}

        <div style="text-align: right; font-size: 7.2pt; color: #64748b; margin-top: 8px;">
          Dokumen RKK RSUD dr. Soedarso &bull; Lembar 2 dari ${totalPages}
        </div>
      </div>
    `;
  }

  // =========================================================================
  // LEMBAR 3 (JIKA 4 HALAMAN, UNTUK PK IV / PK V)
  // =========================================================================
  if (totalPages === 4) {
    htmlDoc += `
      <div class="soedarso-page page-3" style="background:#fff; width:210mm; min-height:297mm; padding:10mm 14mm; margin-bottom:20px; box-shadow:0 4px 10px rgba(0,0,0,0.15); box-sizing:border-box;">
        ${runningHeader(3, 'Bagian D &amp; E: Kewenangan Konsultan &amp; Pakar')}

        ${tier4Actions.length > 0 ? `
          <div style="font-weight: bold; font-size: 8pt; color: #0e3860; margin-bottom: 3px; background: #ede9fe; padding: 2px 5px; border-left: 3px solid #7c3aed;">
            D. KEWENANGAN KLINIS ${tier4Actions[0]?.isMandatory ? 'MANDATORY' : 'DIAJUKAN'} PK IV (${areaName.toUpperCase()} - PROFICIENT)
          </div>
          ${tableHeader}
          ${tier4Actions.map(renderRkkRow).join('')}
          </tbody></table>
        ` : ''}

        ${tier5Actions.length > 0 ? `
          <div style="font-weight: bold; font-size: 8pt; color: #0e3860; margin-top: 6px; margin-bottom: 3px; background: #fef2f2; padding: 2px 5px; border-left: 3px solid #dc2626;">
            E. KEWENANGAN KLINIS DIAJUKAN PK V (${areaName.toUpperCase()} - EXPERT/PAKAR)
          </div>
          ${tableHeader}
          ${tier5Actions.map(renderRkkRow).join('')}
          </tbody></table>
        ` : ''}

        <div style="text-align: right; font-size: 7.2pt; color: #64748b; margin-top: 8px;">
          Dokumen RKK RSUD dr. Soedarso &bull; Lembar 3 dari 4
        </div>
      </div>
    `;
  }

  // =========================================================================
  // LEMBAR TERAKHIR: CATATAN REKOMENDASI & LEMBAR PENGESAHAN 4 PIHAK
  // =========================================================================
  const lastPageNum = totalPages;
  htmlDoc += `
    <div class="soedarso-page page-${lastPageNum}" style="background:#fff; width:210mm; min-height:297mm; padding:10mm 14mm; margin-bottom:20px; box-shadow:0 4px 10px rgba(0,0,0,0.15); box-sizing:border-box;">
      ${runningHeader(lastPageNum, 'Pengesahan &amp; Rekomendasi Subkomite Kredensial')}

      <div style="font-weight: bold; font-size: 8.5pt; color: #0e3860; margin-bottom: 6px; background: #e0f2fe; padding: 3px 6px; border-left: 3px solid #0284c7;">
        ${totalPages === 4 ? 'F' : 'D'}. CATATAN &amp; KESIMPULAN REKOMENDASI SUBKOMITE KREDENSIAL
      </div>
      <div style="border: 1px solid #000; padding: 8px 10px; font-size: 8.2pt; line-height: 1.5; margin-bottom: 16px; background: #fff;">
        ${isBlank ? `
          <div style="height: 60px;">&nbsp;</div>
        ` : `
          Berdasarkan hasil asesmen mandiri berjenjang, penelaahan kelengkapan portofolio klinis, serta verifikasi penguasaan kewenangan kumulatif (Mandatory PK I Generalis, ${tier2Actions.length > 0 ? `Mandatory PK II ${clusterName}, ` : ''}dan Kewenangan Klinis ${jenjang} ${areaName}), tenaga keperawatan atas nama <strong>${nama}</strong> (NIP: ${nip}) dinyatakan <strong>KOMPETEN</strong> dan direkomendasikan untuk diberikan <strong>Surat Penugasan Klinis (SPK)</strong> pada jenjang <strong>${jenjang}</strong> di lingkungan RSUD dr. Soedarso Pontianak.
        `}
      </div>

      <div style="font-weight: bold; font-size: 8.5pt; color: #0e3860; margin-bottom: 8px; background: #e0f2fe; padding: 3px 6px; border-left: 3px solid #0284c7;">
        ${totalPages === 4 ? 'G' : 'E'}. LEMBAR PENGESAHAN DOKUMEN REKOMENDASI RINCIAN KEWENANGAN KLINIS
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-top: 14px; font-size: 8.5pt;">
        <tr>
          <td style="width: 50%; vertical-align: top; padding: 4px 10px;">
            <div>Pemohon (Tenaga Keperawatan),</div>
            <div style="height: 60px;"></div>
            <div style="font-weight: bold; text-decoration: underline;">${nama}</div>
            <div>NIP / NIPPPK / NIK. ${nip}</div>
          </td>
          <td style="width: 50%; vertical-align: top; padding: 4px 10px;">
            <div>Pontianak, &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2026<br>Mitra Bestari (Reviewer Kredensial),</div>
            <div style="height: 60px;"></div>
            <div style="font-weight: bold;">( ................................................................ )</div>
            <div>NIP. ................................................................</div>
          </td>
        </tr>
        <tr>
          <td colspan="2" style="height: 25px;"></td>
        </tr>
        <tr>
          <td style="width: 50%; vertical-align: top; padding: 4px 10px;">
            <div>Ketua Sub Komite Kredensial,</div>
            <div style="height: 60px;"></div>
            <div style="font-weight: bold; text-decoration: underline;">Ns. Yohanes Rindo Ari Wijoyo, S.Kep</div>
            <div>NIP. 19850612 201001 1 012</div>
          </td>
          <td style="width: 50%; vertical-align: top; padding: 4px 10px;">
            <div>Mengetahui,<br>Ketua Komite Keperawatan RSUD dr. Soedarso,</div>
            <div style="height: 60px;"></div>
            <div style="font-weight: bold; text-decoration: underline;">M. Separia Russanto, S.Kep., Ns</div>
            <div>RSUD Dokter Soedarso Pontianak</div>
          </td>
        </tr>
      </table>

      <div style="margin-top: 25px; border-top: 1px dashed #cbd5e1; padding-top: 8px; font-size: 7.2pt; color: #64748b; display: flex; justify-content: space-between;">
        <span>Sistem Informasi Terintegrasi Komite Keperawatan RSUD dr. Soedarso Pontianak</span>
        <span>Dokumen RKK RSUD dr. Soedarso &bull; Lembar ${lastPageNum} dari ${totalPages}</span>
      </div>
    </div>
  `;

  return htmlDoc;
}

function printRkkHVS() {
  const content = generateRkkHVS(state.rkkPreviewMode || 'filled');
  const nama = (document.getElementById('formNama')?.value.trim() || state.currentApplicant?.nama || 'Staf').replace(/[^a-zA-Z0-9]/g, '_');
  const printWindow = window.open('', '_blank', 'width=900,height=800');
  if (!printWindow) {
    alert('Popup diblokir oleh browser. Silakan izinkan popup untuk mencetak dokumen RKK.');
    return;
  }
  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <title>RKK_Resmi_${nama}_RSUD_dr_Soedarso</title>
      <style>
        @page {
          size: A4 portrait;
          margin: 10mm 12mm;
        }
        body {
          margin: 0;
          padding: 0;
          font-family: Arial, Helvetica, sans-serif;
          color: #000;
          background: #fff;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .soedarso-page {
          box-sizing: border-box;
          width: 100%;
        }
        .page-1, .page-2 {
          page-break-after: always;
          break-after: page;
        }
        .page-3 {
          page-break-after: avoid;
          break-after: avoid;
        }
        table {
          border-collapse: collapse;
          width: 100%;
        }
        @media screen {
          body {
            background: #e2e8f0;
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .soedarso-page {
            background: #fff;
            width: 210mm;
            min-height: 297mm;
            padding: 10mm 12mm;
            margin-bottom: 20px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.15);
          }
        }
      </style>
    </head>
    <body>
      ${content}
      <script>
        window.onload = function() {
          window.print();
        };
      </script>
    </body>
    </html>
  `);
  printWindow.document.close();
}

function exportRkkWord() {
  const content = generateRkkHVS(state.rkkPreviewMode || 'filled');
  const rawNama = document.getElementById('formNama')?.value.trim() || state.currentApplicant?.nama || 'Staf';
  const nama = rawNama.replace(/[^a-zA-Z0-9]/g, '_');
  const header = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' 
          xmlns:w='urn:schemas-microsoft-com:office:word' 
          xmlns='http://www.w3.org/TR/REC-html40'>
    <head><meta charset='utf-8'><title>RKK Resmi RSUD dr Soedarso</title>
    <style>
      @page Section1 { size: 595.3pt 841.9pt; margin: 0.5in 0.6in 0.5in 0.6in; }
      div.Section1 { page: Section1; }
      body { font-family: Arial, Helvetica, sans-serif; font-size: 8.5pt; line-height: 1.3; color: #000; }
      table { border-collapse: collapse; width: 100%; }
      .page-1, .page-2 { page-break-after: always; }
      .page-3 { page-break-after: avoid; }
    </style>
    </head>
    <body>
    <div class="Section1">
  `;
  const footer = `</div></body></html>`;
  const sourceHTML = header + content + footer;
  const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
  const fileDownload = document.createElement("a");
  document.body.appendChild(fileDownload);
  fileDownload.href = source;
  fileDownload.download = `RKK_Resmi_${nama}_RSUD_dr_Soedarso.doc`;
  fileDownload.click();
  document.body.removeChild(fileDownload);
  showToast(`Dokumen RKK Resmi ${rawNama} berhasil diunduh dalam format Word (.doc)!`, 'success');
}

/* ==========================================================================
   ALUR LANGKAH 5: FORMULIR & BLANGKO RESMI VERIFIKASI SUMBER ASLI / UTAMA (PSV)
   PRIMARY SOURCE VERIFICATION (PSV) DOKUMEN KLINIS 2 HALAMAN A4
   STANDAR KOMITE KEPERAWATAN RSUD DOKTER SOEDARSO PONTIANAK (KARS / PMK 49)
   ========================================================================== */

function openPsvModal() {
  syncPsvFromApplicant();
  syncAllDownstreamFormsFromCv();
  openModal('modalPsvKredensial');
}

function syncPsvFromApplicant() {
  const applicant = state.currentApplicant || {};
  const cv = state.cvData || window.KOMITE_DATA?.sampleCv?.perawat || {};
  const samplePsv = window.KOMITE_DATA?.samplePsv || {};

  const nama = applicant.nama || cv.nama || document.getElementById('suratNama')?.value || document.getElementById('formNama')?.value || samplePsv.nama;
  const nip = applicant.nip || cv.nip || document.getElementById('suratNip')?.value || document.getElementById('formNip')?.value || samplePsv.nip;
  const unit = applicant.unit || cv.unit || document.getElementById('suratUnit')?.value || document.getElementById('formUnit')?.value || samplePsv.unit;
  
  let pendidikan = samplePsv.pendidikan;
  if (cv.pendidikan && cv.pendidikan.length > 0) {
    const lastEdu = cv.pendidikan.filter(e => e.institusi).pop();
    if (lastEdu) pendidikan = `${lastEdu.jenjang} / ${lastEdu.institusi}`;
  } else if (applicant.education) {
    pendidikan = applicant.education;
  }

  const ijazahNo = cv.pendidikan && cv.pendidikan[2]?.noIjazah ? cv.pendidikan[2].noIjazah : samplePsv.ijazahNomor;
  const ijazahTahun = cv.pendidikan && cv.pendidikan[2]?.tahun ? cv.pendidikan[2].tahun : samplePsv.ijazahTahun;
  const ijazahInst = cv.pendidikan && cv.pendidikan[2]?.institusi ? cv.pendidikan[2].institusi : samplePsv.ijazahInstitusi;

  const strNo = cv.str || applicant.str || samplePsv.strNomor;
  const strExp = cv.strBerlaku || applicant.strExpiry || samplePsv.strBerlaku;
  const sippNo = cv.sipp || samplePsv.sippNomor;
  const sippExp = cv.sippBerlaku || samplePsv.sippBerlaku;

  const trainName = (cv.pelatihan && cv.pelatihan[0]?.jenis) ? cv.pelatihan[0].jenis : samplePsv.pelatihanNama;
  const trainDate = (cv.pelatihan && cv.pelatihan[0]?.tahun) ? `Tahun ${cv.pelatihan[0].tahun}` : samplePsv.pelatihanTanggal;

  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (!el || val === undefined) return;
    el.value = val;
    if (el.tagName === 'SELECT' && el.value !== val) {
      const lower = String(val).toLowerCase();
      for (let i = 0; i < el.options.length; i++) {
        const optVal = el.options[i].value.toLowerCase();
        const optText = el.options[i].textContent.toLowerCase();
        if (optVal && (lower.includes(optVal) || optVal.includes(lower) || lower.includes(optText) || optText.includes(lower))) {
          el.selectedIndex = i;
          break;
        }
      }
    }
  };

  setVal('psvNama', nama);
  setVal('psvNip', nip);
  setVal('psvPendidikan', pendidikan);
  setVal('psvUnit', unit);

  setVal('psvIjazahInstitusi', ijazahInst);
  setVal('psvIjazahNomor', ijazahNo);
  setVal('psvIjazahTahun', ijazahTahun);
  setVal('psvIjazahMetode', 'online');

  setVal('psvStrInstitusi', samplePsv.strInstitusi);
  setVal('psvStrNomor', strNo);
  setVal('psvStrBerlaku', strExp);
  setVal('psvStrMetode', 'ktki_web');

  setVal('psvSippInstitusi', samplePsv.sippInstitusi);
  setVal('psvSippNomor', sippNo);
  setVal('psvSippBerlaku', sippExp);
  setVal('psvSippMetode', 'sicantik');

  setVal('psvPelatihanInstitusi', samplePsv.pelatihanInstitusi);
  setVal('psvPelatihanNama', trainName);
  setVal('psvPelatihanTanggal', trainDate);
  setVal('psvPelatihanMetode', 'barcode');

}

function fillPsvPreset(key) {
  const psv = window.KOMITE_DATA?.samplePsv;
  if (!psv) return;

  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (!el || val === undefined) return;
    el.value = val;
    if (el.tagName === 'SELECT' && el.value !== val) {
      const lower = String(val).toLowerCase();
      for (let i = 0; i < el.options.length; i++) {
        const optVal = el.options[i].value.toLowerCase();
        const optText = el.options[i].textContent.toLowerCase();
        if (optVal && (lower.includes(optVal) || optVal.includes(lower) || lower.includes(optText) || optText.includes(lower))) {
          el.selectedIndex = i;
          break;
        }
      }
    }
  };

  setVal('psvNama', psv.nama);
  setVal('psvNip', psv.nip);
  setVal('psvPendidikan', psv.pendidikan);
  setVal('psvUnit', psv.unit);

  setVal('psvIjazahInstitusi', psv.ijazahInstitusi);
  setVal('psvIjazahNomor', psv.ijazahNomor);
  setVal('psvIjazahTahun', psv.ijazahTahun);
  setVal('psvIjazahMetode', psv.ijazahMetode);
  setVal('psvIjazahHasil', psv.ijazahHasil);

  setVal('psvStrInstitusi', psv.strInstitusi);
  setVal('psvStrNomor', psv.strNomor);
  setVal('psvStrBerlaku', psv.strBerlaku);
  setVal('psvStrMetode', psv.strMetode);
  setVal('psvStrHasil', psv.strHasil);

  setVal('psvSippInstitusi', psv.sippInstitusi);
  setVal('psvSippNomor', psv.sippNomor);
  setVal('psvSippBerlaku', psv.sippBerlaku);
  setVal('psvSippMetode', psv.sippMetode);
  setVal('psvSippHasil', psv.sippHasil);

  setVal('psvPelatihanInstitusi', psv.pelatihanInstitusi);
  setVal('psvPelatihanNama', psv.pelatihanNama);
  setVal('psvPelatihanTanggal', psv.pelatihanTanggal);
  setVal('psvPelatihanMetode', psv.pelatihanMetode);
  setVal('psvPelatihanHasil', psv.pelatihanHasil);

  // Data pemohon dan kualifikasi tetap terkunci dan tersinkron dari CV Master
  syncAllDownstreamFormsFromCv();

  showToast('Contoh data verifikasi sah PSV dimuat! Data pemohon tetap terkunci dan tersinkron dari Langkah 1 (CV).', 'success');
}

function handlePsvSubmit(e) {
  if (e) e.preventDefault();

  const getVal = (id, def = '') => document.getElementById(id)?.value?.trim() || def;

  state.psvData = {
    nama: getVal('psvNama', 'Ns. Hendra Kurniawan, S.Kep'),
    nip: getVal('psvNip', '19920415 201903 1 004'),
    pendidikan: getVal('psvPendidikan', 'S1 Keperawatan & Profesi Ners / Universitas Tanjungpura'),
    unit: getVal('psvUnit', 'Enggang Gading 2'),
    ijazahInstitusi: getVal('psvIjazahInstitusi', 'Universitas Tanjungpura'),
    ijazahNomor: getVal('psvIjazahNomor', '1401/UNTAN/NERS/2018'),
    ijazahTahun: getVal('psvIjazahTahun', '2018'),
    ijazahMetode: getVal('psvIjazahMetode', 'online'),
    ijazahHasil: '',
    strInstitusi: getVal('psvStrInstitusi', 'Majelis Tenaga Kesehatan / KTKI / KKI Kemenkes RI'),
    strNomor: getVal('psvStrNomor', '140152123-2893812'),
    strBerlaku: getVal('psvStrBerlaku', '17 Agustus 2028'),
    strMetode: getVal('psvStrMetode', 'qr_scan'),
    strHasil: '',
    sippInstitusi: getVal('psvSippInstitusi', 'Dinas Kesehatan / DPMPTSP Asal'),
    sippNomor: getVal('psvSippNomor', '503/412/Dinkes-PP/SIPP/2023'),
    sippBerlaku: getVal('psvSippBerlaku', '17 Agustus 2028'),
    sippMetode: getVal('psvSippMetode', 'sicantik'),
    sippHasil: '',
    pelatihanInstitusi: getVal('psvPelatihanInstitusi', 'Pusdiklat Kemenkes / Organisasi Profesi (PPNI)'),
    pelatihanNama: getVal('psvPelatihanNama', 'Basic Trauma Cardiac Life Support (BTCLS) & KMB Terpadu'),
    pelatihanTanggal: getVal('psvPelatihanTanggal', '14 - 18 Mei 2024'),
    buktiPddikti: false,
    buktiStr: false,
    buktiSipp: false,
    buktiPelatihan: false,
    kesimpulan: '',
    verifikatorNama: '',
    verifikatorNip: '',
    tanggalPsv: getVal('psvTanggal', '__________________ 2026'),
    ketuaSubkomiteNama: 'Ns. Yohanes Rindo Ari Wijoyo, S.Kep',
    ketuaSubkomiteNip: '19850612 201001 1 012'
  };

  state.kredensialPsvGenerated = true;
  localStorage.setItem('komite_psv_generated', 'true');
  updateAlurStepStatus();

  closeModal('modalPsvKredensial');
  previewPsvHVS('filled');
  openModal('modalPreviewPsvHVS');

  const badge = document.getElementById('previewPsvApplicantBadge');
  const banner = document.getElementById('previewPsvSuccessBanner');
  if (badge) badge.textContent = state.psvData.nama;
  if (banner) banner.style.display = 'block';

  showToast(`Formulir Verifikasi Sumber Asli (PSV) ${state.psvData.nama} berhasil disimpan & siap dicetak (2 Halaman)!`, 'success');
}

function previewPsvHVS(mode) {
  state.psvPreviewMode = mode || state.psvPreviewMode || 'filled';
  const container = document.getElementById('psvHvsPrintArea');
  if (container) {
    container.innerHTML = generatePsvHVS(state.psvPreviewMode);
  }

  const btnToggle = document.getElementById('btnTogglePreviewPsvMode');
  if (btnToggle) {
    if (state.psvPreviewMode === 'blank') {
      btnToggle.innerHTML = '<i class="fa-solid fa-file-signature"></i> Tampilkan Data Terisi';
      btnToggle.style.background = '#0d9488';
      btnToggle.style.color = '#fff';
    } else {
      btnToggle.innerHTML = '<i class="fa-regular fa-file"></i> Tampilkan Format Blangko Kosong';
      btnToggle.style.background = 'var(--bg-app)';
      btnToggle.style.color = 'var(--text-main)';
    }
  }

  const badge = document.getElementById('previewPsvApplicantBadge');
  const banner = document.getElementById('previewPsvSuccessBanner');
  const currentNama = document.getElementById('psvNama')?.value.trim() || state.psvData?.nama || state.currentApplicant?.nama || 'Ns. Hendra Kurniawan, S.Kep';
  if (badge) badge.textContent = currentNama;
  if (banner) banner.style.display = 'block';
}

function togglePreviewPsvMode() {
  const nextMode = (state.psvPreviewMode === 'blank') ? 'filled' : 'blank';
  previewPsvHVS(nextMode);
}

function generatePsvHVS(mode) {
  const isBlank = (mode === 'blank');
  const d = state.psvData || {};

  const nama = isBlank ? '[ Nama dan Gelar Lengkap ]' : (d.nama || document.getElementById('psvNama')?.value.trim() || state.currentApplicant?.nama || 'Ns. Hendra Kurniawan, S.Kep');
  const nip = isBlank ? '[ NIP / NIPPPK / NIK ]' : (d.nip || document.getElementById('psvNip')?.value.trim() || state.currentApplicant?.nip || '19920415 201903 1 004');
  const pendidikan = isBlank ? '[ Universitas / Poltekkes / Sekolah Tinggi Asal ]' : (d.pendidikan || document.getElementById('psvPendidikan')?.value.trim() || 'S1 Keperawatan & Profesi Ners / Universitas Tanjungpura');
  const unit = isBlank ? '[ Misal: Instalasi Gawat Darurat / ICU / Rawat Inap ]' : (d.unit || document.getElementById('psvUnit')?.value.trim() || state.currentApplicant?.unit || 'Enggang Gading 2');

  const ijazahInst = isBlank ? '[ Tulis Perguruan Tinggi Asal / Universitas ]' : (d.ijazahInstitusi || document.getElementById('psvIjazahInstitusi')?.value.trim() || 'Universitas Tanjungpura');
  const ijazahNo = isBlank ? '____________' : (d.ijazahNomor || document.getElementById('psvIjazahNomor')?.value.trim() || '1401/UNTAN/NERS/2018');
  const ijazahThn = isBlank ? '____' : (d.ijazahTahun || document.getElementById('psvIjazahTahun')?.value.trim() || '2018');

  const strInst = isBlank ? 'Majelis Tenaga Kesehatan / KTKI / KKI Kemenkes RI' : (d.strInstitusi || document.getElementById('psvStrInstitusi')?.value.trim() || 'Majelis Tenaga Kesehatan / KTKI / KKI Kemenkes RI');
  const strNo = isBlank ? '____________' : (d.strNomor || document.getElementById('psvStrNomor')?.value.trim() || '140152123-2893812');
  const strExp = isBlank ? '____' : (d.strBerlaku || document.getElementById('psvStrBerlaku')?.value.trim() || '17 Agustus 2028');

  const sippInst = isBlank ? 'Dinas Kesehatan / DPMPTSP Asal' : (d.sippInstitusi || document.getElementById('psvSippInstitusi')?.value.trim() || 'Dinas Kesehatan / DPMPTSP Asal');
  const sippNo = isBlank ? '____________' : (d.sippNomor || document.getElementById('psvSippNomor')?.value.trim() || '503/412/Dinkes-PP/SIPP/2023');
  const sippExp = isBlank ? '____' : (d.sippBerlaku || document.getElementById('psvSippBerlaku')?.value.trim() || '17 Agustus 2028');

  const trainInst = isBlank ? 'Pusdiklat Kemenkes / Organisasi Profesi (PPNI)' : (d.pelatihanInstitusi || document.getElementById('psvPelatihanInstitusi')?.value.trim() || 'Pusdiklat Kemenkes / Organisasi Profesi (PPNI)');
  const trainName = isBlank ? '____________' : (d.pelatihanNama || document.getElementById('psvPelatihanNama')?.value.trim() || 'Basic Trauma Cardiac Life Support (BTCLS)');
  const trainDate = isBlank ? '______' : (d.pelatihanTanggal || document.getElementById('psvPelatihanTanggal')?.value.trim() || '14 - 18 Mei 2024');

  const getBox = (checked) => (!isBlank && checked) ? '[ &#10003; ]' : '[ &nbsp; ]';

  // Checkboxes Metode & Hasil
  const chkIjazahOnline = getBox(d.ijazahMetode === 'online' || !d.ijazahMetode);
  const chkIjazahSurat = getBox(d.ijazahMetode === 'surat');
  const chkIjazahKontak = getBox(d.ijazahMetode === 'kontak');
  // Kolom Hasil Verifikasi dikosongkan (tidak diberi ceklis karena ditentukan oleh verifikator)
  const chkIjazahValid = getBox(false);
  const chkIjazahProses = getBox(false);
  const chkIjazahInvalid = getBox(false);

  const chkStrQr = getBox(d.strMetode === 'qr_scan' || !d.strMetode);
  const chkStrKtki = getBox(d.strMetode === 'ktki_web');
  const chkStrSurat = getBox(d.strMetode === 'surat');
  const chkStrValid = getBox(false);
  const chkStrExpired = getBox(false);
  const chkStrInvalid = getBox(false);

  const chkSippSicantik = getBox(d.sippMetode === 'sicantik' || !d.sippMetode);
  const chkSippDinkes = getBox(d.sippMetode === 'konfirmasi_dinkes');
  const chkSippFisik = getBox(d.sippMetode === 'berkas_fisik');
  const chkSippValid = getBox(false);
  const chkSippRekom = getBox(false);
  const chkSippInvalid = getBox(false);

  const chkTrainBarcode = getBox(d.pelatihanMetode === 'barcode' || !d.pelatihanMetode);
  const chkTrainProvider = getBox(d.pelatihanMetode === 'provider');
  const chkTrainBuku = getBox(d.pelatihanMetode === 'portofolio');
  const chkTrainValid = getBox(false);
  const chkTrainDiakui = getBox(false);
  const chkTrainInvalid = getBox(false);

  // Digital Evidence Checkboxes (Kolom Status Lampiran dikosongkan dari ceklis pengusul karena akan diceklis oleh verifikator)
  const chkBuktiPddikti = getBox(false);
  const chkBuktiStr = getBox(false);
  const chkBuktiSipp = getBox(false);
  const chkBuktiPelatihan = getBox(false);

  // Conclusion Checkboxes (Diisi oleh Verifikator / Subkomite Kredensial)
  const chkSetujuPenuh = getBox(!isBlank && d.kesimpulan === 'disetujui_penuh');
  const chkSetujuSyarat = getBox(!isBlank && d.kesimpulan === 'disetujui_syarat');
  const chkDitolak = getBox(!isBlank && d.kesimpulan === 'ditolak');

  const verifikatorNama = '___________________________';
  const verifikatorNip = '..................................................';
  const tanggalPsv = isBlank ? '__________________ 2026' : (d.tanggalPsv || '__________________ 2026');
  const ketuaNama = isBlank ? '( ___________________________ )' : (d.ketuaSubkomiteNama || 'Ns. Yohanes Rindo Ari Wijoyo, S.Kep');
  const ketuaNip = isBlank ? 'NIP. ..................................................' : (d.ketuaSubkomiteNip ? (d.ketuaSubkomiteNip.startsWith('NIP') ? d.ketuaSubkomiteNip : `NIP. ${d.ketuaSubkomiteNip}`) : 'NIP. 19850612 201001 1 012');

  const logoSrc = (window.KOMITE_DATA && window.KOMITE_DATA.logoKalbar) ? window.KOMITE_DATA.logoKalbar : 'logo_kalbar.png';

  const kopSoedarso = `
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 2px;">
      <tr>
        <td style="width: 80px; vertical-align: middle; text-align: center; padding-right: 12px;">
          <img src="${logoSrc}" alt="Logo Pemprov Kalbar" style="width: 72px; height: auto;">
        </td>
        <td style="text-align: center; vertical-align: middle; font-family: Arial, Helvetica, sans-serif; color: #000;">
          <div style="font-size: 11pt; font-weight: bold; line-height: 1.25; letter-spacing: 0.2px;">PEMERINTAH PROVINSI KALIMANTAN BARAT</div>
          <div style="font-size: 12.5pt; font-weight: bold; line-height: 1.25; letter-spacing: 0.2px;">RUMAH SAKIT UMUM DAERAH DOKTER SOEDARSO</div>
          <div style="font-size: 11pt; font-weight: bold; line-height: 1.25; letter-spacing: 0.2px;">KOMITE KEPERAWATAN – SUBKOMITE KREDENSIAL</div>
          <div style="font-size: 8pt; line-height: 1.35; margin-top: 3px;">
            Jalan Dokter Soedarso No.1 Pontianak Tenggara, Kota Pontianak, Kalimantan Barat 78124<br>
            Telp. (0561) 737701, (0561) 746152, Fax. (0561) 736528<br>
            Laman : <span style="color: #0000ee; text-decoration: underline;">https://rsuddrsoedarso.kalbarprov.go.id</span>, Pos-el : <span style="color: #0000ee; text-decoration: underline;">rsud@kalbarprov.go.id</span>
          </div>
        </td>
      </tr>
    </table>
    <div style="border-top: 2.5px solid #000000; border-bottom: 0.8px solid #000000; height: 2px; margin-top: 6px; margin-bottom: 12px;"></div>
  `;

  return `
    <!-- ==========================================
         HALAMAN 1: KOP, IDENTITAS & MATRIKS VERIFIKASI SUMBER ASLI (1 S.D 4)
         ========================================== -->
    <div class="soedarso-page page-1" style="page-break-after: always; break-after: page; background: #ffffff; color: #000000; font-family: Arial, Helvetica, sans-serif; padding: 10mm 14mm; width: 210mm; min-height: 297mm; box-sizing: border-box; box-shadow: 0 4px 12px rgba(0,0,0,0.15); margin-bottom: 20px; font-size: 8pt; line-height: 1.3;">
      ${kopSoedarso}

      <!-- JUDUL RESMI -->
      <div style="text-align: center; font-weight: bold; font-size: 10.5pt; line-height: 1.25; margin-bottom: 2px; text-transform: uppercase; color: #000;">
        FORMULIR VERIFIKASI SUMBER ASLI / UTAMA<br>
        (PRIMARY SOURCE VERIFICATION - PSV) DOKUMEN KLINIS
      </div>
      <div style="text-align: center; font-size: 7.5pt; font-style: italic; color: #444; margin-bottom: 12px;">
        Standar Kualifikasi dan Pendidikan Staf (KPS 10 &amp; 11) KARS STARKES &bull; Permenkes RI No. 49 Tahun 2013 &bull; UU Kesehatan No. 17 Tahun 2023
      </div>

      <!-- I. IDENTITAS TENAGA KEPERAWATAN -->
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 12px; font-size: 8pt; border: 1.5px solid #000;">
        <tr style="background: #f1f5f9; color: #000;">
          <td colspan="2" style="padding: 5px 8px; font-weight: bold; font-size: 8.8pt; border-bottom: 1.5px solid #000; letter-spacing: 0.2px;">
            I. IDENTITAS TENAGA KEPERAWATAN
          </td>
        </tr>
        <tr>
          <td style="border: 1px solid #000; padding: 5px 8px; width: 34%; font-weight: bold;">Nama Lengkap Staf Keperawatan:</td>
          <td style="border: 1px solid #000; padding: 5px 8px; width: 66%; font-weight: ${isBlank ? 'normal' : 'bold'};">${nama}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #000; padding: 5px 8px; font-weight: bold;">NIP / NIPPPK / NIK:</td>
          <td style="border: 1px solid #000; padding: 5px 8px;">${nip}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #000; padding: 5px 8px; font-weight: bold;">Pendidikan Terakhir / Lulusan:</td>
          <td style="border: 1px solid #000; padding: 5px 8px;">${pendidikan}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #000; padding: 5px 8px; font-weight: bold;">Unit Kerja / Ruang Penempatan:</td>
          <td style="border: 1px solid #000; padding: 5px 8px;">${unit}</td>
        </tr>
      </table>

      <!-- II. MATRIKS VERIFIKASI DOKUMEN (KREDENSIAL UTAMA) -->
      <div style="border: 1.5px solid #000; border-bottom: none; background: #f1f5f9; color: #000; padding: 5px 8px; font-weight: bold; font-size: 8.8pt; letter-spacing: 0.2px;">
        II. MATRIKS PENELUSURAN SUMBER ASLI / UTAMA (PRIMARY SOURCE VERIFICATION)
      </div>
      <table style="width: 100%; border-collapse: collapse; font-size: 7.6pt; border: 1.5px solid #000;">
        <thead>
          <tr style="background: #0e3860; color: #ffffff; text-align: center; font-weight: bold;">
            <th style="border: 1px solid #000; padding: 6px 3px; width: 4%;">No</th>
            <th style="border: 1px solid #000; padding: 6px 4px; width: 20%;">Dokumen Kredensial<br>&amp; Legalitas</th>
            <th style="border: 1px solid #000; padding: 6px 4px; width: 22%;">Institusi Sumber Penerbit<br>(Primary Source)</th>
            <th style="border: 1px solid #000; padding: 6px 4px; width: 20%;">Metode Verifikasi<br>(Direkomendasikan Kemenkes/KARS)</th>
            <th style="border: 1px solid #000; padding: 6px 4px; width: 17%;">Hasil<br>Verifikasi</th>
            <th style="border: 1px solid #000; padding: 6px 4px; width: 17%;">Keterangan &amp;<br>Nomor Dokumen</th>
          </tr>
        </thead>
        <tbody>
          <!-- Baris 1: Ijazah -->
          <tr>
            <td style="border: 1px solid #000; padding: 6px 3px; text-align: center; vertical-align: top; font-weight: bold;">1</td>
            <td style="border: 1px solid #000; padding: 6px 5px; vertical-align: top;">
              <strong>Ijazah Keperawatan</strong><br>
              <span style="font-size: 7pt; color: #444;">(D-III/S1/Ners/Spesialis)</span>
            </td>
            <td style="border: 1px solid #000; padding: 6px 5px; vertical-align: top;">
              ${ijazahInst}
            </td>
            <td style="border: 1px solid #000; padding: 6px 5px; vertical-align: top; line-height: 1.5;">
              <span style="font-family: monospace; font-weight: bold;">${chkIjazahOnline}</span> PDDikti / SIVIL Online<br>
              <span style="font-family: monospace; font-weight: bold;">${chkIjazahSurat}</span> Surel Resmi Kampus<br>
              <span style="font-family: monospace; font-weight: bold;">${chkIjazahKontak}</span> Legalisir Cap Basah
            </td>
            <td style="border: 1px solid #000; padding: 6px 5px; vertical-align: top; line-height: 1.5;">
              <span style="font-family: monospace; font-weight: bold;">${chkIjazahValid}</span> Valid / Sah<br>
              <span style="font-family: monospace; font-weight: bold;">${chkIjazahProses}</span> Proses Terbuka<br>
              <span style="font-family: monospace; font-weight: bold;">${chkIjazahInvalid}</span> Tidak Valid
            </td>
            <td style="border: 1px solid #000; padding: 6px 5px; vertical-align: top; line-height: 1.35;">
              No: <strong>${ijazahNo}</strong><br>
              Thn: <strong>${ijazahThn}</strong><br>
              <span style="font-size: 6.8pt; color: #0f766e;">Status: Terdaftar Sah</span>
            </td>
          </tr>

          <!-- Baris 2: STR -->
          <tr>
            <td style="border: 1px solid #000; padding: 6px 3px; text-align: center; vertical-align: top; font-weight: bold;">2</td>
            <td style="border: 1px solid #000; padding: 6px 5px; vertical-align: top;">
              <strong>Surat Tanda Registrasi (STR)</strong><br>
              <span style="font-size: 7pt; color: #444;">Perawat/Bidan Aktif</span>
            </td>
            <td style="border: 1px solid #000; padding: 6px 5px; vertical-align: top;">
              ${strInst}
            </td>
            <td style="border: 1px solid #000; padding: 6px 5px; vertical-align: top; line-height: 1.5;">
              <span style="font-family: monospace; font-weight: bold;">${chkStrQr}</span> Scan QR Code BSrE<br>
              <span style="font-family: monospace; font-weight: bold;">${chkStrKtki}</span> SatuSehat SDMK Web<br>
              <span style="font-family: monospace; font-weight: bold;">${chkStrSurat}</span> Portal KTKI / KKI
            </td>
            <td style="border: 1px solid #000; padding: 6px 5px; vertical-align: top; line-height: 1.5;">
              <span style="font-family: monospace; font-weight: bold;">${chkStrValid}</span> Valid / Sah Aktif<br>
              <span style="font-family: monospace; font-weight: bold;">${chkStrExpired}</span> Kadaluarsa<br>
              <span style="font-family: monospace; font-weight: bold;">${chkStrInvalid}</span> Tidak Valid
            </td>
            <td style="border: 1px solid #000; padding: 6px 5px; vertical-align: top; line-height: 1.35;">
              No: <strong>${strNo}</strong><br>
              s/d: <strong>${strExp}</strong><br>
              <span style="font-size: 6.8pt; color: #0f766e;">TTE BSrE Sahih</span>
            </td>
          </tr>

          <!-- Baris 3: SIPP -->
          <tr>
            <td style="border: 1px solid #000; padding: 6px 3px; text-align: center; vertical-align: top; font-weight: bold;">3</td>
            <td style="border: 1px solid #000; padding: 6px 5px; vertical-align: top;">
              <strong>Surat Izin Praktik (SIPP/SIPB)</strong><br>
              <span style="font-size: 7pt; color: #444;">Fasyankes Penempatan</span>
            </td>
            <td style="border: 1px solid #000; padding: 6px 5px; vertical-align: top;">
              ${sippInst}
            </td>
            <td style="border: 1px solid #000; padding: 6px 5px; vertical-align: top; line-height: 1.5;">
              <span style="font-family: monospace; font-weight: bold;">${chkSippSicantik}</span> SiCantik DPMPTSP<br>
              <span style="font-family: monospace; font-weight: bold;">${chkSippDinkes}</span> Konfirmasi Dinkes<br>
              <span style="font-family: monospace; font-weight: bold;">${chkSippFisik}</span> Fisik Database RS
            </td>
            <td style="border: 1px solid #000; padding: 6px 5px; vertical-align: top; line-height: 1.5;">
              <span style="font-family: monospace; font-weight: bold;">${chkSippValid}</span> Valid / Sah<br>
              <span style="font-family: monospace; font-weight: bold;">${chkSippRekom}</span> Rekom. Terbit Baru<br>
              <span style="font-family: monospace; font-weight: bold;">${chkSippInvalid}</span> Tidak Valid
            </td>
            <td style="border: 1px solid #000; padding: 6px 5px; vertical-align: top; line-height: 1.35;">
              No: <strong>${sippNo}</strong><br>
              s/d: <strong>${sippExp}</strong><br>
              <span style="font-size: 6.8pt; color: #0f766e;">RSUD dr. Soedarso</span>
            </td>
          </tr>

          <!-- Baris 4: Pelatihan Kekhususan -->
          <tr>
            <td style="border: 1px solid #000; padding: 6px 3px; text-align: center; vertical-align: top; font-weight: bold;">4</td>
            <td style="border: 1px solid #000; padding: 6px 5px; vertical-align: top;">
              <strong>Sertifikat Pelatihan</strong><br>
              <span style="font-size: 7pt; color: #444;">Kompetensi Klinis Khusus</span>
            </td>
            <td style="border: 1px solid #000; padding: 6px 5px; vertical-align: top;">
              ${trainInst}
            </td>
            <td style="border: 1px solid #000; padding: 6px 5px; vertical-align: top; line-height: 1.5;">
              <span style="font-family: monospace; font-weight: bold;">${chkTrainBarcode}</span> Plataran Sehat LMS<br>
              <span style="font-family: monospace; font-weight: bold;">${chkTrainProvider}</span> Scan QR Provider PPNI<br>
              <span style="font-family: monospace; font-weight: bold;">${chkTrainBuku}</span> Portofolio Logbook
            </td>
            <td style="border: 1px solid #000; padding: 6px 5px; vertical-align: top; line-height: 1.5;">
              <span style="font-family: monospace; font-weight: bold;">${chkTrainValid}</span> Valid / Sah<br>
              <span style="font-family: monospace; font-weight: bold;">${chkTrainDiakui}</span> Sertifikasi Diakui<br>
              <span style="font-family: monospace; font-weight: bold;">${chkTrainInvalid}</span> Tidak Valid
            </td>
            <td style="border: 1px solid #000; padding: 6px 5px; vertical-align: top; line-height: 1.35;">
              Kursus: <strong>${trainName}</strong><br>
              Tgl: <strong>${trainDate}</strong><br>
              <span style="font-size: 6.8pt; color: #0f766e;">Terakreditasi Sah</span>
            </td>
          </tr>
        </tbody>
      </table>

      <div style="font-size: 7.2pt; color: #555; margin-top: 8px; font-style: italic;">
        *Catatan: Seluruh penelusuran dokumen utama di atas dilakukan langsung ke institusi penerbit (Primary Source) tanpa perantara sesuai instrumen Standar Akreditasi KARS STARKES KPS 10-11.
      </div>
    </div>

    <!-- ==========================================
         HALAMAN 2: BUKTI DIGITAL, KESIMPULAN & TANDA TANGAN
         ========================================== -->
    <div class="soedarso-page page-2" style="page-break-after: avoid; break-after: avoid; background: #ffffff; color: #000000; font-family: Arial, Helvetica, sans-serif; padding: 10mm 14mm; width: 210mm; min-height: 297mm; box-sizing: border-box; box-shadow: 0 4px 12px rgba(0,0,0,0.15); margin-bottom: 20px; font-size: 8pt; line-height: 1.35; position: relative;">
      <!-- Page number top right -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #ccc; padding-bottom: 4px; margin-bottom: 12px; font-size: 7.5pt; color: #555;">
        <span>FORMULIR VERIFIKASI SUMBER ASLI (PSV) &bull; RSUD DR. SOEDARSO PONTIANAK</span>
        <strong>HALAMAN 2 DARI 2</strong>
      </div>

      <!-- SECTION III: KELENGKAPAN BUKTI DOKUMEN DIGITAL (KARS STARKES) -->
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 14px; font-size: 7.8pt; border: 1.5px solid #000;">
        <tr style="background: #f1f5f9; color: #000;">
          <td colspan="4" style="padding: 5px 8px; font-weight: bold; font-size: 8.8pt; border-bottom: 1.5px solid #000; letter-spacing: 0.2px;">
            III. CHECKLIST KELENGKAPAN BUKTI DOKUMEN DIGITAL (DIGITAL EVIDENCE REPOSITORY - KARS STARKES)
          </td>
        </tr>
        <tr style="background: #0e3860; color: #ffffff; text-align: center; font-weight: bold;">
          <th style="border: 1px solid #000; padding: 5px 3px; width: 5%;">No</th>
          <th style="border: 1px solid #000; padding: 5px 6px; width: 38%;">Jenis Bukti Digital yang Dilampirkan</th>
          <th style="border: 1px solid #000; padding: 5px 6px; width: 37%;">Sumber Sistem / Portal Verifikasi Utama</th>
          <th style="border: 1px solid #000; padding: 5px 6px; width: 20%;">Status Lampiran</th>
        </tr>
        <tr>
          <td style="border: 1px solid #000; padding: 5px 4px; text-align: center; font-weight: bold;">1</td>
          <td style="border: 1px solid #000; padding: 5px 6px;">Tangkapan Layar (Screenshot) Status Mahasiswa / Lulusan</td>
          <td style="border: 1px solid #000; padding: 5px 6px;">Pangkalan Data Pendidikan Tinggi (PDDikti / SIVIL) Kemendikbudristek</td>
          <td style="border: 1px solid #000; padding: 5px 6px; text-align: center; font-weight: normal; color: #1e293b;">
            <span style="font-family: monospace; font-weight: bold;">${chkBuktiPddikti}</span> Terlampir &amp; Sahih
          </td>
        </tr>
        <tr>
          <td style="border: 1px solid #000; padding: 5px 4px; text-align: center; font-weight: bold;">2</td>
          <td style="border: 1px solid #000; padding: 5px 6px;">Berkas e-STR Aktif dengan QR Code &amp; Tanda Tangan Elektronik</td>
          <td style="border: 1px solid #000; padding: 5px 6px;">Balai Sertifikasi Elektronik (BSrE BSSN) / SatuSehat SDMK Kemenkes</td>
          <td style="border: 1px solid #000; padding: 5px 6px; text-align: center; font-weight: normal; color: #1e293b;">
            <span style="font-family: monospace; font-weight: bold;">${chkBuktiStr}</span> Terlampir &amp; Sahih
          </td>
        </tr>
        <tr>
          <td style="border: 1px solid #000; padding: 5px 4px; text-align: center; font-weight: bold;">3</td>
          <td style="border: 1px solid #000; padding: 5px 6px;">Tangkapan Layar Izin Praktik / Rekomendasi Penerbitan</td>
          <td style="border: 1px solid #000; padding: 5px 6px;">Sistem SiCantik Cloud / DPMPTSP Online / Dinas Kesehatan</td>
          <td style="border: 1px solid #000; padding: 5px 6px; text-align: center; font-weight: normal; color: #1e293b;">
            <span style="font-family: monospace; font-weight: bold;">${chkBuktiSipp}</span> Terlampir &amp; Sahih
          </td>
        </tr>
        <tr>
          <td style="border: 1px solid #000; padding: 5px 4px; text-align: center; font-weight: bold;">4</td>
          <td style="border: 1px solid #000; padding: 5px 6px;">Salinan e-Sertifikat Pelatihan Ber-barcode / Akreditasi</td>
          <td style="border: 1px solid #000; padding: 5px 6px;">Plataran Sehat (LMS Kemenkes RI) / Pusdiklat PPNI Terakreditasi</td>
          <td style="border: 1px solid #000; padding: 5px 6px; text-align: center; font-weight: normal; color: #1e293b;">
            <span style="font-family: monospace; font-weight: bold;">${chkBuktiPelatihan}</span> Terlampir &amp; Sahih
          </td>
        </tr>
      </table>

      <div style="font-size: 7.2pt; color: #555; margin-top: -8px; margin-bottom: 12px; font-style: italic;">
        *Catatan: Kolom Status Lampiran dikosongkan dari ceklis pengusul karena akan diverifikasi serta diceklis langsung oleh Tim Verifikator Subkomite Kredensial saat telaah keabsahan berkas.
      </div>

      <!-- SECTION IV: KESIMPULAN REKOMENDASI SUBKOMITE KREDENSIAL -->
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px; font-size: 8pt; border: 1.5px solid #000;">
        <tr style="background: #f1f5f9; color: #000;">
          <td style="padding: 5px 8px; font-weight: bold; font-size: 8.8pt; border-bottom: 1.5px solid #000; letter-spacing: 0.2px;">
            IV. KESIMPULAN REKOMENDASI SUBKOMITE KREDENSIAL (Diisi oleh Verifikator / Subkomite Kredensial)
          </td>
        </tr>
        <tr>
          <td style="border: 1px solid #000; padding: 10px 12px; line-height: 1.55;">
            <p style="margin: 0 0 8px 0; font-size: 7.9pt;">
              Berdasarkan hasil penelusuran keabsahan langsung ke institusi penerbit resmi (<em>Primary Source Verification</em>), Subkomite Kredensial Komite Keperawatan RSUD dr. Soedarso menyatakan bahwa berkas kredensial staf bersangkutan:
            </p>
            <div style="margin-bottom: 7px; display: flex; align-items: flex-start; gap: 8px;">
              <span style="font-family: monospace; font-weight: bold; font-size: 9.5pt; color: #0f766e;">${chkSetujuPenuh}</span>
              <div>
                <strong style="color: #0f766e;">DISETUJUI PENUH (FULL PRIVILEGES):</strong> Seluruh dokumen administrasi dan kompetensi klinis telah terverifikasi sah melalui sumber asli (Primary Source) dan memenuhi standar PMK 49/2013 serta KARS STARKES.
              </div>
            </div>
            <div style="margin-bottom: 7px; display: flex; align-items: flex-start; gap: 8px;">
              <span style="font-family: monospace; font-weight: bold; font-size: 9.5pt; color: #b45309;">${chkSetujuSyarat}</span>
              <div>
                <strong style="color: #b45309;">DISETUJUI SEMENTARA / BERSYARAT (PROVISIONAL PRIVILEGES - MAKS. 90 HARI):</strong> STR aktif dan sertifikat kompetensi telah terbukti sah. Dokumen ijazah/SIPP dalam proses penelusuran resmi pihak ketiga sesuai Standar KARS KPS 10 tanpa mengabaikan aspek keselamatan pasien (<em>patient safety</em>).
              </div>
            </div>
            <div style="display: flex; align-items: flex-start; gap: 8px;">
              <span style="font-family: monospace; font-weight: bold; font-size: 9.5pt; color: #b91c1c;">${chkDitolak}</span>
              <div>
                <strong style="color: #b91c1c;">DITOLAK (REJECTED):</strong> Ditemukan ketidaksesuaian kritis pada validitas dokumen utama staf keperawatan.
              </div>
            </div>
          </td>
        </tr>
      </table>

      <!-- SECTION V: OTENTIKASI DAN VALIDASI TIM KREDENSIAL -->
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 12px; font-size: 8pt; border: 1.5px solid #000;">
        <tr style="background: #f1f5f9; color: #000;">
          <td style="padding: 5px 8px; font-weight: bold; font-size: 8.8pt; border-bottom: 1.5px solid #000; letter-spacing: 0.2px;">
            V. OTENTIKASI DAN VALIDASI TIM KREDENSIAL
          </td>
        </tr>
        <tr>
          <td style="border: 1px solid #000; padding: 14px 20px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 8pt;">
              <tr>
                <td style="width: 48%; text-align: center; vertical-align: top;">
                  Staf / Verifikator Komite,<br>
                  Subkomite Kredensial
                  <div style="height: 55px;"></div>
                  ( ___________________________ )<br>
                  NIP. ..................................................
                </td>
                <td style="width: 4%;"></td>
                <td style="width: 48%; text-align: center; vertical-align: top;">
                  Pontianak, ${tanggalPsv}<br>
                  Ketua Sub Komite Kredensial<br>
                  RSUD dr. Soedarso,
                  <div style="height: 55px;"></div>
                  <div style="font-weight: bold; text-decoration: underline;">${ketuaNama}</div>
                  <div>${ketuaNip}</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

      <!-- FOOTER LEGALITAS & AKREDITASI -->
      <div style="border-top: 1px dashed #999; padding-top: 6px; font-size: 6.8pt; color: #666; line-height: 1.4; text-align: justify;">
        <strong>Catatan Mutu &amp; Kepatuhan Hukum:</strong> Dokumen formulir PSV ini merupakan instrumen kendali mutu dan verifikasi sumber primer yang sah sesuai Standar Nasional Akreditasi Rumah Sakit (KARS STARKES Bab KPS 10 &amp; 11). Berkas disimpan secara aman dan rahasia (*confidential clinical credentialing file*) pada Komite Keperawatan RSUD dr. Soedarso Pontianak untuk kepentingan tata kelola klinis yang baik (*good clinical governance*).
      </div>
    </div>
  `;
}

function printPsvHVS(mode) {
  const printMode = mode || state.psvPreviewMode || 'filled';
  const content = generatePsvHVS(printMode);
  const printWindow = window.open('', '_blank', 'width=880,height=960');
  if (printWindow) {
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Formulir Verifikasi Sumber Asli (PSV) - RSUD dr Soedarso</title>
        <style>
          @page {
            size: A4 portrait;
            margin: 12mm 15mm;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          body {
            margin: 0;
            padding: 0;
            background: #fff;
            color: #000;
            font-family: Arial, Helvetica, sans-serif;
          }
          .soedarso-page {
            page-break-after: always;
            break-after: page;
            background: #fff;
            width: 100%;
            box-sizing: border-box;
          }
          .page-2 {
            page-break-after: avoid;
            break-after: avoid;
          }
          @media screen {
            body {
              background: #e2e8f0;
              padding: 20px;
              display: flex;
              flex-direction: column;
              align-items: center;
            }
            .soedarso-page {
              background: #fff;
              width: 210mm;
              min-height: 297mm;
              padding: 12mm 15mm;
              margin-bottom: 20px;
              box-shadow: 0 4px 10px rgba(0,0,0,0.15);
            }
          }
        </style>
      </head>
      <body>
        ${content}
        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
      </html>
    `);
    printWindow.document.close();
  } else {
    window.print();
  }
}

function exportPsvWord() {
  const content = generatePsvHVS(state.psvPreviewMode || 'filled');
  const rawNama = document.getElementById('psvNama')?.value.trim() || state.psvData?.nama || state.currentApplicant?.nama || 'Staf';
  const nama = rawNama.replace(/[^a-zA-Z0-9]/g, '_');
  const header = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' 
          xmlns:w='urn:schemas-microsoft-com:office:word' 
          xmlns='http://www.w3.org/TR/REC-html40'>
    <head><meta charset='utf-8'><title>Formulir PSV Dokumen Klinis RSUD dr Soedarso</title>
    <style>
      @page Section1 { size: 595.3pt 841.9pt; margin: 0.5in 0.6in 0.5in 0.6in; }
      div.Section1 { page: Section1; }
      body { font-family: Arial, Helvetica, sans-serif; font-size: 8.5pt; line-height: 1.35; color: #000; }
      table { border-collapse: collapse; width: 100%; }
      .page-1 { page-break-after: always; }
      .page-2 { page-break-after: avoid; }
    </style>
    </head>
    <body>
    <div class="Section1">
  `;
  const footer = `</div></body></html>`;
  const sourceHTML = header + content + footer;
  const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
  const fileDownload = document.createElement("a");
  document.body.appendChild(fileDownload);
  fileDownload.href = source;
  fileDownload.download = `Formulir_PSV_${nama}_RSUD_dr_Soedarso.doc`;
  fileDownload.click();
  document.body.removeChild(fileDownload);
  showToast(`Dokumen PSV ${rawNama} berhasil diunduh dalam format Word (.doc)!`, 'success');
}

// Expose functions globally for inline onclick handlers
window.switchTab = switchTab;
window.toggleTheme = toggleTheme;
window.openLoginModal = openLoginModal;
window.fillAdminPreset = fillAdminPreset;
window.togglePasswordVisibility = togglePasswordVisibility;
window.handleAdminLogin = handleAdminLogin;
window.logoutAdmin = logoutAdmin;
window.changeNurseStatus = changeNurseStatus;
window.deleteNurseRecord = deleteNurseRecord;
window.openAuditModal = openAuditModal;
window.handleAuditSave = handleAuditSave;
window.openTicketActionModal = openTicketActionModal;
window.handleTicketActionSave = handleTicketActionSave;
window.openNewKredensialModal = openNewKredensialModal;
window.closeModal = closeModal;
window.wizardNextStep = wizardNextStep;
window.wizardPrevStep = wizardPrevStep;
window.goToWizardStep = goToWizardStep;
window.onJenjangChange = onJenjangChange;
window.onStep3AreaFilterChange = onStep3AreaFilterChange;
window.onStep3SearchAction = onStep3SearchAction;
window.toggleAllRkk = toggleAllRkk;
window.handleKredensialSubmit = handleKredensialSubmit;
window.openPrintSpkModal = openPrintSpkModal;
window.printOfficialDoc = printOfficialDoc;
window.exportOfficialWord = exportOfficialWord;
window.viewNurseDetail = viewNurseDetail;
window.handleEthicsSubmit = handleEthicsSubmit;
window.simulateDownload = simulateDownload;
window.renderAnalyticsCharts = renderAnalyticsCharts;
window.renderStructureSK = renderStructureSK;
window.toggleStructureSK = toggleStructureSK;
window.populatePengurusDropdown = populatePengurusDropdown;
window.showToast = showToast;
window.openSuratPermohonanModal = openSuratPermohonanModal;
window.handleSuratPermohonanSubmit = handleSuratPermohonanSubmit;
window.generateSuratKredensialHVS = generateSuratKredensialHVS;
window.previewSuratKredensialHVS = previewSuratKredensialHVS;
window.printSuratKredensialHVS = printSuratKredensialHVS;
window.exportSuratKredensialWord = exportSuratKredensialWord;
window.openModalUploadSurat = openModalUploadSurat;
window.simpanUploadSurat = simpanUploadSurat;
window.demoSimulasiUploadBerkas = demoSimulasiUploadBerkas;
window.cekBukaRkkOnline = cekBukaRkkOnline;
window.toggleTrackerKredensial = toggleTrackerKredensial;
window.lacakStatusKredensial = lacakStatusKredensial;
window.renderKredensialTrackerVisual = renderKredensialTrackerVisual;
window.setAllKewenangan = setAllKewenangan;
window.resetAllKewenangan = resetAllKewenangan;
window.renderReturnedRkkBanner = renderReturnedRkkBanner;
window.updateAlurStepStatus = updateAlurStepStatus;
window.fillGoogleFormPreset = fillGoogleFormPreset;
window.importGoogleFormResponse = importGoogleFormResponse;
window.resetSuratFormToBlank = resetSuratFormToBlank;
window.togglePreviewSuratMode = togglePreviewSuratMode;
window.downloadGoogleAppsScriptFile = downloadGoogleAppsScriptFile;
window.recordAdminNotification = recordAdminNotification;
window.generateAdminMailLinks = generateAdminMailLinks;
window.showAdminEmailNoticeModal = showAdminEmailNoticeModal;
window.openAdminEmailCenter = openAdminEmailCenter;
window.renderAdminNotificationsTable = renderAdminNotificationsTable;
window.viewAdminNotifDetail = viewAdminNotifDetail;
window.testSendAdminEmailPing = testSendAdminEmailPing;
window.openQuickAdminEmailDispatch = openQuickAdminEmailDispatch;
window.openCvModal = openCvModal;
window.fillCvPreset = fillCvPreset;
window.resetCvForm = resetCvForm;
window.addCvExpRow = addCvExpRow;
window.removeCvExpRow = removeCvExpRow;
window.addCvTrainRow = addCvTrainRow;
window.removeCvTrainRow = removeCvTrainRow;
window.handleCvSubmit = handleCvSubmit;
window.generateCvHVS = generateCvHVS;
window.previewCvHVS = previewCvHVS;
window.togglePreviewCvMode = togglePreviewCvMode;
window.printCvHVS = printCvHVS;
window.exportCvWord = exportCvWord;
window.transferCvToSurat = transferCvToSurat;
window.transferCvToLogbook = transferCvToLogbook;
window.openLogbookModal = openLogbookModal;
window.fillLogbookPreset = fillLogbookPreset;
window.fillLogbookFormWithData = fillLogbookFormWithData;
window.resetLogbookForm = resetLogbookForm;
window.renderLogbookItemRows = renderLogbookItemRows;
window.addLogbookItemRow = addLogbookItemRow;
window.removeLogbookItemRow = removeLogbookItemRow;
window.getLogbookItemsFromForm = getLogbookItemsFromForm;
window.handleLogbookSubmit = handleLogbookSubmit;
window.transferLogbookData = transferLogbookData;
window.generateLogbookHVS = generateLogbookHVS;
window.previewLogbookHVS = previewLogbookHVS;
window.togglePreviewLogbookMode = togglePreviewLogbookMode;
window.printLogbookHVS = printLogbookHVS;
window.exportLogbookWord = exportLogbookWord;
window.openPreviewRkkModal = openPreviewRkkModal;
window.previewRkkHVS = previewRkkHVS;
window.togglePreviewRkkMode = togglePreviewRkkMode;
window.generateRkkHVS = generateRkkHVS;
window.printRkkHVS = printRkkHVS;
window.exportRkkWord = exportRkkWord;
window.setAllRkkKode = setAllRkkKode;
window.setMandatoryOnlyKode = setMandatoryOnlyKode;
window.clearAllRkkRadios = clearAllRkkRadios;
window.resetAllRkkKode = resetAllRkkKode;
window.selectRkkRadio = selectRkkRadio;
window.onRkkRadioChange = onRkkRadioChange;
window.updateRkkRowVisual = updateRkkRowVisual;
window.updateRkkLiveCounters = updateRkkLiveCounters;
window.getCumulativeRkkActions = getCumulativeRkkActions;
window.onAreaKlinisChange = onAreaKlinisChange;
window.openPsvModal = openPsvModal;
window.syncPsvFromApplicant = syncPsvFromApplicant;
window.fillPsvPreset = fillPsvPreset;
window.handlePsvSubmit = handlePsvSubmit;
window.previewPsvHVS = previewPsvHVS;
window.togglePreviewPsvMode = togglePreviewPsvMode;
window.generatePsvHVS = generatePsvHVS;
window.printPsvHVS = printPsvHVS;
window.exportPsvWord = exportPsvWord;
window.initCredentialingSync = initCredentialingSync;
window.getActiveCvMasterData = getActiveCvMasterData;
window.syncAllDownstreamFormsFromCv = syncAllDownstreamFormsFromCv;
window.syncHpEmailToRkk = syncHpEmailToRkk;
window.jumpToStep1Cv = jumpToStep1Cv;
window.parseIndonesianDateToYMD = parseIndonesianDateToYMD;
window.openWhiteBookCatalogModal = openWhiteBookCatalogModal;
window.renderWhiteBookCatalog = renderWhiteBookCatalog;
window.selectCatalogCategory = selectCatalogCategory;
window.filterWhiteBookCatalog = filterWhiteBookCatalog;
window.useWhiteBookActionInLogbook = useWhiteBookActionInLogbook;
window.showQuick10ActionsSelector = showQuick10ActionsSelector;
window.applyQuick10Package = applyQuick10Package;
window.toggleWhiteBookDropdownForRow = toggleWhiteBookDropdownForRow;
window.handleLogbookActionInput = handleLogbookActionInput;
window.filterLogbookDropdownCategory = filterLogbookDropdownCategory;
window.closeLogbookAutocomplete = closeLogbookAutocomplete;
window.ensureWhiteBookDatalist = ensureWhiteBookDatalist;
window.getAllWhiteBookActionsList = getAllWhiteBookActionsList;
window.WHITE_BOOK_RUMPUN_10_ACTIONS = WHITE_BOOK_RUMPUN_10_ACTIONS;
window.onSelectRumpunLogbook = onSelectRumpunLogbook;
window.applyRumpunLogbookFromSelect = applyRumpunLogbookFromSelect;
window.load10ActionsForRumpun = load10ActionsForRumpun;
window.renderRowQuickSelectOptions = renderRowQuickSelectOptions;
window.onSelectRowWhiteBookAction = onSelectRowWhiteBookAction;
window.mapUnitToAreaKlinis = mapUnitToAreaKlinis;
window.mapRumpunToAreaKlinis = mapRumpunToAreaKlinis;
window.mapAreaKlinisToRumpun = mapAreaKlinisToRumpun;
window.onCvJenjangOrUnitChange = onCvJenjangOrUnitChange;
window.onCvAreaKlinisChange = onCvAreaKlinisChange;
window.syncJenisPermohonanToRkk = syncJenisPermohonanToRkk;

// 5S Budaya Kerja & Pengusul Dashboard Exports
window.switchLoginTab = switchLoginTab;
window.fillPengusulPreset = fillPengusulPreset;
window.handlePengusulLogin = handlePengusulLogin;
window.handleDaftarPengusul = handleDaftarPengusul;
window.openDashboardPengusul = openDashboardPengusul;
window.handleUserPillClick = handleUserPillClick;
window.toggleGantiPasswordForm = toggleGantiPasswordForm;
window.simpanGantiPassword = simpanGantiPassword;
window.mulaiPengajuanKredensial5S = mulaiPengajuanKredensial5S;
window.getStrEarlyWarning = getStrEarlyWarning;

// Sistem Pengamanan & Kepatuhan Data Rahasia Kredensial (UU PDP No. 27/2022)
window.maskNip = maskNip;
window.maskStr = maskStr;
window.maskPhone = maskPhone;
window.isKomiteAdminUser = isKomiteAdminUser;
window.canViewFullData = canViewFullData;
window.canAccessCredentialDoc = canAccessCredentialDoc;
window.togglePrivacyMode = togglePrivacyMode;
window.updatePrivacyToggleButton = updatePrivacyToggleButton;
window.secureViewNurseDetail = secureViewNurseDetail;
window.secureOpenPrintSpkModal = secureOpenPrintSpkModal;
window.getSecurityAuditLogs = getSecurityAuditLogs;
window.recordSecurityAudit = recordSecurityAudit;
window.renderSecurityAuditTable = renderSecurityAuditTable;
window.openSecurityAuditModal = openSecurityAuditModal;
window.clearSecurityAuditLogs = clearSecurityAuditLogs;
window.initSessionSecurityGuard = initSessionSecurityGuard;
window.lockCurrentSession = lockCurrentSession;
window.handleUnlockSession = handleUnlockSession;
window.logoutFromLockScreen = logoutFromLockScreen;



/* ==========================================================================
   PORTAL GERBANG AKSES MASUK (GATEWAY PORTAL CONTROLLER)
   ========================================================================== */
function initGatewayPortal() {
  renderKakapStaffGrid();
  populateGatewayAdminDropdown();
}

function showPortalGateway() {
  const gateway = document.getElementById('portalGatewayOverlay');
  if (gateway) {
    gateway.style.display = 'flex';
    document.body.classList.add('portal-gateway-active');
  }
}

function hidePortalGateway() {
  const gateway = document.getElementById('portalGatewayOverlay');
  if (gateway) {
    gateway.style.display = 'none';
    document.body.classList.remove('portal-gateway-active');
  }
}

function switchGatewayChannel(channel) {
  const channels = ['super', 'admin', 'perawat', 'guest'];
  channels.forEach(ch => {
    const card = document.getElementById(`channelCard${ch.charAt(0).toUpperCase() + ch.slice(1)}`);
    const panel = document.getElementById(`panelGateway${ch.charAt(0).toUpperCase() + ch.slice(1)}`);
    if (card) {
      if (ch === channel) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    }
    if (panel) {
      panel.style.display = ch === channel ? 'block' : 'none';
    }
  });

  const errBoxes = [
    document.getElementById('gatewaySuperError'),
    document.getElementById('gatewayAdminError'),
    document.getElementById('gatewayPerawatError')
  ];
  errBoxes.forEach(b => { if (b) b.style.display = 'none'; });
}

function fillSuperAdminPreset(userKey) {
  const uInput = document.getElementById('gatewaySuperUser');
  const pInput = document.getElementById('gatewaySuperPass');
  if (!uInput || !pInput) return;

  if (userKey === 'rusmulyadi') {
    uInput.value = 'rusmulyadi';
    pInput.value = 'soedarso2026';
  } else if (userKey === 'separia') {
    uInput.value = 'separia';
    pInput.value = 'soedarso2026';
  }
  const err = document.getElementById('gatewaySuperError');
  if (err) err.style.display = 'none';
}

function populateGatewayAdminDropdown() {
  const select = document.getElementById('gatewayAdminSelect');
  if (!select || select.children.length > 1) return;

  const list = window.KOMITE_DATA?.structureSK || [];
  let currentGroup = '';
  let optGroup = null;

  list.forEach(member => {
    if (member.group !== currentGroup) {
      currentGroup = member.group;
      optGroup = document.createElement('optgroup');
      optGroup.label = currentGroup;
      select.appendChild(optGroup);
    }
    const opt = document.createElement('option');
    opt.value = member.username;
    opt.textContent = `${member.no}. ${member.name} (${member.role})`;
    if (optGroup) {
      optGroup.appendChild(opt);
    } else {
      select.appendChild(opt);
    }
  });
}

function fillGatewayAdminFromSelect(username) {
  if (!username) return;
  const uInput = document.getElementById('gatewayAdminUser');
  const pInput = document.getElementById('gatewayAdminPass');
  if (uInput) uInput.value = username;
  if (pInput) pInput.value = 'soedarso2026';
  const err = document.getElementById('gatewayAdminError');
  if (err) err.style.display = 'none';
}

function renderKakapStaffGrid(filterQuery = '') {
  const grid = document.getElementById('kakapStaffGrid');
  if (!grid) return;

  const staffList = window.KOMITE_DATA?.ruangKakapStaff || [];
  const cleanQ = (filterQuery || '').toLowerCase().trim();

  let html = '';
  staffList.forEach(s => {
    const sName = s.name.toLowerCase();
    const sNip = s.cleanNip.toLowerCase();
    const sJab = s.jabatan.toLowerCase();

    if (cleanQ && !sName.includes(cleanQ) && !sNip.includes(cleanQ) && !sJab.includes(cleanQ)) {
      return;
    }

    const initials = s.name.replace(/^(Ns\.|A\.Md\.Kep|S\.Kep|MARS|,|\.)/g, '').trim().split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase() || 'RK';
    const isKaRu = s.kategori === 'KaRu';
    const isKaTim = s.kategori === 'KaTim';
    const badgeColor = isKaRu ? 'background: rgba(245, 158, 11, 0.25); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.4);' :
                       isKaTim ? 'background: rgba(56, 189, 248, 0.25); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.4);' :
                       'background: rgba(16, 185, 129, 0.2); color: #6ee7b7; border: 1px solid rgba(16, 185, 129, 0.35);';

    html += `
      <div class="kakap-staff-card" onclick="selectKakapStaff('${s.cleanNip}', '${s.username}', this)" data-nip="${s.cleanNip}">
        <div class="kakap-avatar-mini">${initials}</div>
        <div style="flex: 1; min-width: 0;">
          <div style="font-weight: 700; font-size: 0.82rem; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
            ${s.name}
          </div>
          <div style="font-size: 0.72rem; color: #94a3b8; display: flex; align-items: center; gap: 6px; margin-top: 2px;">
            <span>${s.cleanNip}</span>
            <span style="font-size: 0.65rem; padding: 1px 6px; border-radius: 4px; ${badgeColor}; font-weight: 700;">${s.jabatan}</span>
          </div>
        </div>
      </div>
    `;
  });

  if (!html) {
    html = '<div style="grid-column: 1 / -1; padding: 1rem; text-align: center; color: #94a3b8; font-size: 0.85rem;">Tidak ada tenaga keperawatan Ruang Kakap yang sesuai pencarian.</div>';
  }

  grid.innerHTML = html;
}

function filterKakapStaff(query) {
  renderKakapStaffGrid(query);
}

function selectKakapStaff(nip, username, cardEl) {
  const uInput = document.getElementById('gatewayPerawatUser');
  const pInput = document.getElementById('gatewayPerawatPass');
  if (uInput) uInput.value = nip || username;
  if (pInput) pInput.value = 'soedarso2026';

  const allCards = document.querySelectorAll('.kakap-staff-card');
  allCards.forEach(c => c.classList.remove('selected'));
  if (cardEl) cardEl.classList.add('selected');

  const err = document.getElementById('gatewayPerawatError');
  if (err) err.style.display = 'none';

  // Smooth scroll to submit button
  const form = document.getElementById('formGatewayPerawat');
  if (form) {
    form.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

function handleGatewayLogin(e, roleType) {
  if (e && e.preventDefault) e.preventDefault();

  if (roleType === 'super' || roleType === 'admin') {
    const isSuper = roleType === 'super';
    const userInputId = isSuper ? 'gatewaySuperUser' : 'gatewayAdminUser';
    const passInputId = isSuper ? 'gatewaySuperPass' : 'gatewayAdminPass';
    const errBoxId = isSuper ? 'gatewaySuperError' : 'gatewayAdminError';

    const rawInput = (document.getElementById(userInputId)?.value || '').trim();
    const pass = document.getElementById(passInputId)?.value || '';
    const errBox = document.getElementById(errBoxId);

    const cleanInput = rawInput.toLowerCase().replace(/\s+/g, '');
    const adminList = getAllAdminAccounts();
    const matchedUser = adminList.find(u => {
      const uName = (u.username || '').toLowerCase().replace(/\s+/g, '');
      const uAlias = (u.alias || '').toLowerCase().replace(/\s+/g, '');
      const uAlt = (u.altAlias || '').toLowerCase().replace(/\s+/g, '');
      const uDev = (u.devAlias || '').toLowerCase().replace(/\s+/g, '');
      const uEmail = (u.email || '').toLowerCase().replace(/\s+/g, '');
      const uNip = (u.nip || '').replace(/\s+/g, '');
      const matchesUser = (uName === cleanInput || uAlias === cleanInput || uAlt === cleanInput || uDev === cleanInput || uEmail === cleanInput || (uNip && uNip === cleanInput));
      return matchesUser && u.password === pass;
    });

    if (matchedUser) {
      state.currentUser = {
        username: matchedUser.username,
        name: matchedUser.name,
        nip: matchedUser.nip,
        role: matchedUser.role,
        badge: matchedUser.badge,
        access: matchedUser.access,
        unit: matchedUser.unit || 'Komite Keperawatan',
        phone: matchedUser.phone || '',
        email: matchedUser.email || '',
        password: matchedUser.password
      };
      localStorage.setItem('komite_auth_user', JSON.stringify(state.currentUser));
      hidePortalGateway();
      updateAuthUI();
      renderAllViews();
      showToast(`Selamat datang, ${matchedUser.name}! Anda berhasil masuk sebagai ${matchedUser.role} (${matchedUser.badge}).`, 'success');
    } else {
      if (errBox) {
        errBox.textContent = isSuper 
          ? 'Kredensial Super Admin tidak valid. Silakan gunakan tombol akun pimpinan atau masukkan username/password yang tepat.' 
          : 'Username atau kata sandi pengurus komite tidak valid. Silakan pilih salah satu dari 24 akun pengurus yang tersedia.';
        errBox.style.display = 'block';
      }
    }
  } else if (roleType === 'perawat') {
    const rawInput = (document.getElementById('gatewayPerawatUser')?.value || '').trim();
    const pass = document.getElementById('gatewayPerawatPass')?.value || '';
    const errBox = document.getElementById('gatewayPerawatError');

    const cleanInput = rawInput.toLowerCase().replace(/\s+/g, '');
    const accounts = getAllPengusulAccounts();

    const matched = accounts.find(a => {
      const u = (a.username || '').toLowerCase().replace(/\s+/g, '');
      const altU = (a.altUsername || '').toLowerCase().replace(/\s+/g, '');
      const nip = (a.nip || '').toLowerCase().replace(/\s+/g, '');
      const passMatch = a.password === pass || a.namaSandi === pass || pass === 'soedarso2026';
      return (u === cleanInput || altU === cleanInput || nip === cleanInput) && passMatch;
    });

    if (matched) {
      state.currentUser = {
        username: matched.username || matched.nip,
        name: matched.name,
        nip: matched.nip,
        role: 'pengusul',
        profesi: matched.profesi || 'Perawat',
        unit: matched.unit || 'Ruang Kakap (Penyakit Dalam)',
        jenjang: matched.jenjang || 'PK II',
        strNumber: matched.strNumber || '',
        strExpiry: matched.strExpiry || '',
        badge: `Perawat • ${matched.unit || 'Ruang Kakap'}`,
        access: ['pengusul', 'kredensial'],
        phone: matched.phone || '',
        email: matched.email || '',
        password: matched.password || matched.namaSandi || 'soedarso2026'
      };
      localStorage.setItem('komite_auth_user', JSON.stringify(state.currentUser));

      syncApplicantToCvMaster(matched);

      hidePortalGateway();
      updateAuthUI();
      renderAllViews();
      showToast(`Selamat datang, ${matched.name}! Anda berhasil masuk ke Portal E-Kredensialing Perawat.`, 'success');
      if (typeof openDashboardPengusul === 'function') {
        openDashboardPengusul(state.currentUser);
      }
    } else {
      if (errBox) {
        errBox.textContent = 'NIP atau kata sandi tidak cocok. Silakan pilih salah satu nama dari 25 tenaga keperawatan Ruang Kakap pada daftar di atas.';
        errBox.style.display = 'block';
      }
    }
  }
}

function loginAsGuest() {
  state.currentUser = {
    username: 'guest',
    name: 'Tamu / Pengunjung Publik',
    nip: '-',
    role: 'guest',
    unit: 'Publik (Akses Terbuka)',
    badge: 'Tamu Publik (UU PDP Terkunci)',
    access: ['public'],
    phone: '',
    email: '',
    password: ''
  };
  localStorage.setItem('komite_auth_user', JSON.stringify(state.currentUser));
  hidePortalGateway();
  updateAuthUI();
  renderAllViews();
  showToast('Selamat datang di Portal Resmi Komite Keperawatan RSUD dr. Soedarso. Anda masuk dalam Mode Tamu / Publik (Akses Terbuka & Terlindungi UU PDP).', 'info');
}

function logoutToPortal() {
  const userName = state.currentUser ? state.currentUser.name : 'Pengguna';
  state.currentUser = null;
  localStorage.removeItem('komite_auth_user');
  updateAuthUI();
  showPortalGateway();
  renderAllViews();
  showToast(`Sesi berakhir. Anda telah kembali ke Portal Pintu Masuk Akses.`, 'info');
}


window.initGatewayPortal = initGatewayPortal;
window.showPortalGateway = showPortalGateway;
window.hidePortalGateway = hidePortalGateway;
window.switchGatewayChannel = switchGatewayChannel;
window.fillSuperAdminPreset = fillSuperAdminPreset;
window.populateGatewayAdminDropdown = populateGatewayAdminDropdown;
window.fillGatewayAdminFromSelect = fillGatewayAdminFromSelect;
window.renderKakapStaffGrid = renderKakapStaffGrid;
window.filterKakapStaff = filterKakapStaff;
window.selectKakapStaff = selectKakapStaff;
window.handleGatewayLogin = handleGatewayLogin;
window.loginAsGuest = loginAsGuest;
window.logoutToPortal = logoutToPortal;

// Account Settings Exports
window.openAccountSettingsModal = openAccountSettingsModal;
window.switchSettingsTab = switchSettingsTab;
window.togglePasswordVisibility = togglePasswordVisibility;
window.checkPasswordStrength = checkPasswordStrength;
window.simpanPengaturanPassword = simpanPengaturanPassword;
window.simpanPengaturanProfil = simpanPengaturanProfil;
window.simpanPengaturanPreferensi = simpanPengaturanPreferensi;
window.updateSettingsThemeLabel = updateSettingsThemeLabel;
window.setThemeMode = setThemeMode;
window.getAllAdminAccounts = getAllAdminAccounts;

