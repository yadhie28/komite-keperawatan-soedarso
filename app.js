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
  wizardStep: 1,
  selectedNurse: null,
  currentWizardRkkList: [],
  kredensialSuratGenerated: localStorage.getItem('komite_surat_generated') === 'true',
  kredensialBerkasUploaded: localStorage.getItem('komite_berkas_uploaded') === 'true',
  trackerQueryNip: ''
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  loadData();
  initAuth();
  setupNavigation();
  setupEventListeners();
  renderAllViews();
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
  updateAuthUI();
}

function openLoginModal() {
  const errBox = document.getElementById('loginErrorMessage');
  if (errBox) errBox.style.display = 'none';
  const form = document.getElementById('adminLoginForm');
  if (form) form.reset();
  populatePengurusDropdown();
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
    const uNip = (u.nip || '').replace(/\s+/g, '');
    const matchesUser = (uName === cleanInput || uAlias === cleanInput || uAlt === cleanInput || (uNip && uNip === cleanInput));
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
  const userName = state.currentUser ? state.currentUser.name : 'Admin';
  state.currentUser = null;
  localStorage.removeItem('komite_auth_user');
  updateAuthUI();
  renderAllViews();
  showToast(`Anda telah keluar dari sesi administrator (${userName}).`, 'info');
}

function updateAuthUI() {
  const banner = document.getElementById('adminModeBanner');
  const bannerUser = document.getElementById('adminBannerUser');
  const bannerRole = document.getElementById('adminBannerRole');
  const btnLoginNav = document.getElementById('btnLoginNav');
  const adminUserPill = document.getElementById('adminUserPill');
  const adminNavName = document.getElementById('adminNavName');
  const adminNavRole = document.getElementById('adminNavRole');
  const adminAvatar = document.getElementById('adminAvatarText');

  if (state.currentUser) {
    if (banner) banner.style.display = 'flex';
    if (bannerUser) bannerUser.textContent = state.currentUser.name;
    if (bannerRole) bannerRole.textContent = state.currentUser.role;
    if (btnLoginNav) btnLoginNav.style.display = 'none';
    if (adminUserPill) adminUserPill.style.display = 'flex';
    if (adminNavName) adminNavName.textContent = state.currentUser.name.split(',')[0];
    if (adminNavRole) adminNavRole.textContent = state.currentUser.badge || 'Admin';
    if (adminAvatar) {
      const parts = state.currentUser.name.split(' ');
      const initials = parts.length > 1 ? (parts[0][0] + parts[1][0]).toUpperCase() : 'AD';
      adminAvatar.textContent = initials;
    }
  } else {
    if (banner) banner.style.display = 'none';
    if (btnLoginNav) btnLoginNav.style.display = 'inline-flex';
    if (adminUserPill) adminUserPill.style.display = 'none';
  }
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
  const savedNurses = localStorage.getItem('komite_nurses');
  if (savedNurses) {
    try {
      state.nurses = JSON.parse(savedNurses);
    } catch (e) {
      state.nurses = master.nurses || [];
    }
  } else {
    state.nurses = master.nurses || [];
    saveNurses();
  }

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

/* ==========================================================================
   NAVIGATION & TAB SYSTEM
   ========================================================================== */
function setupNavigation() {
  const hash = window.location.hash.replace('#', '');
  if (hash && document.getElementById(`pane-${hash}`)) {
    switchTab(hash);
  } else {
    switchTab('beranda');
  }

  window.addEventListener('hashchange', () => {
    const newHash = window.location.hash.replace('#', '');
    if (newHash && document.getElementById(`pane-${newHash}`)) {
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

  // Handle URL Query Actions (openTracker, previewSurat, openRkk)
  try {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('openTracker') === '1') {
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

  // Quick Action Button
  const btnQuick = document.getElementById('btnQuickKredensial');
  if (btnQuick) {
    btnQuick.addEventListener('click', openSuratPermohonanModal);
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
   E-KREDENSIALING REGISTRY & TABLE (WITH ADMIN CONTROLS)
   ========================================================================== */
function renderNursesTable() {
  const tbody = document.getElementById('nurseTableBody');
  const countDisplay = document.getElementById('tableCountDisplay');
  if (!tbody) return;

  const q = (document.getElementById('nurseSearchInput')?.value || '').toLowerCase().trim();
  const unitFilter = document.getElementById('filterUnit')?.value || '';
  const pkFilter = document.getElementById('filterPkLevel')?.value || '';
  const statusFilter = document.getElementById('filterStatus')?.value || '';

  const filtered = state.nurses.filter(n => {
    const matchQ = !q || 
      n.name.toLowerCase().includes(q) || 
      n.nip.toLowerCase().includes(q) || 
      n.strNumber.toLowerCase().includes(q);
    const matchUnit = !unitFilter || n.unit.includes(unitFilter);
    const matchPk = !pkFilter || n.pkLevel === pkFilter;
    const matchStatus = !statusFilter || n.credentialStatus === statusFilter;
    return matchQ && matchUnit && matchPk && matchStatus;
  });

  if (countDisplay) {
    countDisplay.textContent = `Menampilkan ${filtered.length} dari ${state.nurses.length} tenaga keperawatan`;
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
      <button class="btn-secondary" style="padding: 0.4rem 0.75rem; font-size: 0.8rem;" onclick="viewNurseDetail('${nurse.id}')" title="Lihat Rekam Jejak">
        <i class="fa-solid fa-eye"></i> Detail
      </button>
      <button class="btn-primary" style="padding: 0.4rem 0.85rem; font-size: 0.8rem; margin-left: 4px;" onclick="openPrintSpkModal('${nurse.id}')" title="Cetak SPK & RKK Resmi">
        <i class="fa-solid fa-print"></i> SPK & RKK
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
          <div style="font-family: var(--font-mono); font-size: 0.82rem; font-weight: 600;">${nurse.nip}</div>
        </td>
        <td>
          <span style="font-size: 0.84rem; font-weight: 600; color: var(--primary-700);">${nurse.unit}</span>
        </td>
        <td>
          <span class="badge-pk ${pkBadgeClass}">${nurse.pkLevel}</span>
        </td>
        <td>
          <div style="font-family: var(--font-mono); font-size: 0.8rem;">${nurse.strNumber}</div>
          <div style="font-size: 0.74rem; color: var(--text-muted);">s/d ${formatDate(nurse.strExpiry)}</div>
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
  showToast(`Status kredensial ${nurse.name} berhasil diubah dari "${oldStatus}" menjadi "${newStatus}".`, 'success');
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

  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const newTicket = {
    ticketCode: `ETIK-2026-${randomNum}`,
    date: '20 Oktober 2026',
    category: category,
    unit: unit,
    status: 'Menunggu Telaah Subkomite',
    responseDate: 'Baru Masuk',
    note: 'Laporan telah diterima sekretariat Komite Keperawatan dan dijadwalkan untuk telaah awal berkas.'
  };

  state.ethicsTickets.unshift(newTicket);
  saveEthicsTickets();
  renderEthicsTickets();

  document.getElementById('formEthicsReport').reset();
  showToast(`Laporan etik berhasil dikirim! Nomor Tiket Anda: ${newTicket.ticketCode}`, 'success');
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
    ticket.status = status;
    ticket.note = notes;
    ticket.responseDate = '20 Oktober 2026';
    saveEthicsTickets();
    closeModal('modalTicketAction');
    renderEthicsTickets();
    showToast(`Status tindak lanjut tiket ${code} berhasil diperbarui!`, 'success');
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
  document.getElementById('kredensialForm').reset();
  updateWizardUI();
  openModal('modalNewKredensial');
}

function updateWizardUI() {
  const progressLine = document.getElementById('wizardProgressLine');
  const btnPrev = document.getElementById('btnWizardPrev');
  const btnNext = document.getElementById('btnWizardNext');
  const btnSubmit = document.getElementById('btnWizardSubmit');

  const pct = ((state.wizardStep - 1) / 3) * 100;
  if (progressLine) progressLine.style.width = `${pct}%`;

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

  if (state.wizardStep === 4) {
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
  }
}

function wizardPrevStep() {
  if (state.wizardStep > 1) {
    state.wizardStep--;
    updateWizardUI();
  }
}

function goToWizardStep(step, force = false) {
  if (force || step < state.wizardStep) {
    state.wizardStep = step;
    updateWizardUI();
  }
}

function onJenjangChange(pkLevel) {
  const container = document.getElementById('rkkChecklistContainer');
  const descEl = document.getElementById('jenjangDescText');
  const catalog = window.KOMITE_DATA?.rkkCatalog?.[pkLevel];

  if (!catalog || !container) {
    if (descEl) descEl.textContent = 'Pilih jenjang karir untuk memuat daftar rincian kewenangan klinis (RKK).';
    if (container) container.innerHTML = '<div style="padding: 1.5rem; text-align: center; color: var(--text-muted);">Silakan pilih jenjang karir klinis pada langkah sebelumnya.</div>';
    return;
  }

  if (descEl) descEl.textContent = `${catalog.title} - ${catalog.description}`;

  state.currentWizardRkkList = catalog.competencies || [];

  let html = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; background: var(--bg-surface); padding: 0.5rem 0.75rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); flex-wrap: wrap; gap: 0.5rem;">
      <div style="font-size: 0.76rem; color: var(--text-muted);">
        Klasifikasi KARS & BARI: <span class="badge-kewenangan mandiri">M: Mandiri</span> <span class="badge-kewenangan delegasi">D: Delegasi</span> <span class="badge-kewenangan mandat">Mn: Mandat</span> <span class="badge-kewenangan supervisi">S: Supervisi</span>
      </div>
      <div style="display: flex; gap: 0.35rem;">
        <button type="button" class="btn-secondary" style="font-size: 0.72rem; padding: 2px 8px;" onclick="setAllKewenangan('M')">Set Semua Mandiri (M)</button>
        <button type="button" class="btn-secondary" style="font-size: 0.72rem; padding: 2px 8px;" onclick="resetAllKewenangan()">Reset Standar</button>
      </div>
    </div>
    <div class="table-responsive" style="max-height: 320px; overflow-y: auto;">
      <table class="table-rkk-medis">
        <thead>
          <tr>
            <th style="width: 35px;">No</th>
            <th style="width: 85px;">Kode</th>
            <th>Rincian Kewenangan Klinis (RKK)</th>
            <th style="width: 110px;">Domain</th>
            <th style="width: 45px;" title="Mandiri">M</th>
            <th style="width: 45px;" title="Delegasi">D</th>
            <th style="width: 45px;" title="Mandat">Mn</th>
            <th style="width: 45px;" title="Supervisi">S</th>
          </tr>
        </thead>
        <tbody>
  `;

  state.currentWizardRkkList.forEach((item, idx) => {
    const isMandiri = item.defaultMandiri;
    html += `
      <tr>
        <td style="text-align: center; font-weight: 700; color: var(--text-muted); font-size: 0.75rem;">${idx + 1}</td>
        <td style="font-family: var(--font-mono); font-size: 0.72rem; font-weight: 700; color: var(--primary-700);">${item.id}</td>
        <td>
          <div style="font-weight: 600; color: var(--text-main); font-size: 0.84rem;">${item.name}</div>
        </td>
        <td><span class="badge-official" style="font-size: 0.68rem;">${item.domain}</span></td>
        <td style="text-align: center;">
          <input type="radio" name="rkk_opt_${item.id}" value="M" ${isMandiri ? 'checked' : ''} title="Mandiri">
        </td>
        <td style="text-align: center;">
          <input type="radio" name="rkk_opt_${item.id}" value="D" title="Delegasi">
        </td>
        <td style="text-align: center;">
          <input type="radio" name="rkk_opt_${item.id}" value="Mn" title="Mandat">
        </td>
        <td style="text-align: center;">
          <input type="radio" name="rkk_opt_${item.id}" value="S" ${!isMandiri ? 'checked' : ''} title="Supervisi">
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
}

function setAllKewenangan(val) {
  document.querySelectorAll('#rkkChecklistContainer input[type="radio"][value="' + val + '"]').forEach(r => {
    r.checked = true;
  });
}

function resetAllKewenangan() {
  const currentPk = document.getElementById('formJenjang')?.value;
  if (currentPk) {
    onJenjangChange(currentPk);
  }
}

function toggleAllRkk(checkAll) {
  setAllKewenangan(checkAll ? 'M' : 'S');
}

function generateWizardSummary() {
  const summaryBox = document.getElementById('wizardSummaryText');
  if (!summaryBox) return;

  const nama = document.getElementById('formNama').value;
  const nip = document.getElementById('formNip').value;
  const str = document.getElementById('formStr').value;
  const strExp = document.getElementById('formStrExpiry').value;
  const jenjang = document.getElementById('formJenjang').value;
  const unit = document.getElementById('formUnit').value;

  const radios = document.querySelectorAll('#rkkChecklistContainer input[type="radio"]:checked');
  let countM = 0, countD = 0, countMn = 0, countS = 0;
  radios.forEach(r => {
    if (r.value === 'M') countM++;
    else if (r.value === 'D') countD++;
    else if (r.value === 'Mn') countMn++;
    else if (r.value === 'S') countS++;
  });
  const totalCount = state.currentWizardRkkList.length || radios.length;

  summaryBox.innerHTML = `
    <div><strong>Nama Pegawai:</strong> ${nama}</div>
    <div><strong>NIP:</strong> ${nip}</div>
    <div><strong>Nomor STR:</strong> ${str} (Berlaku s/d ${formatDate(strExp)})</div>
    <div><strong>Jenjang Karir Diajukan:</strong> <span class="badge-pk badge-pk3">${jenjang}</span></div>
    <div><strong>Unit Pelayanan:</strong> ${unit}</div>
    <div style="margin-top: 6px; padding-top: 6px; border-top: 1px dashed var(--border-subtle);">
      <strong>Rincian Asesmen Mandiri (${totalCount} Kompetensi):</strong><br>
      <span class="badge-kewenangan mandiri">Mandiri (M): ${countM}</span>
      <span class="badge-kewenangan delegasi" style="margin-left:4px;">Delegasi (D): ${countD}</span>
      <span class="badge-kewenangan mandat" style="margin-left:4px;">Mandat (Mn): ${countMn}</span>
      <span class="badge-kewenangan supervisi" style="margin-left:4px;">Supervisi (S): ${countS}</span>
    </div>
  `;
}

function handleKredensialSubmit(e) {
  e.preventDefault();

  const nama = document.getElementById('formNama').value.trim();
  const nip = document.getElementById('formNip').value.trim();
  const str = document.getElementById('formStr').value.trim();
  const strExp = document.getElementById('formStrExpiry').value;
  const jenjang = document.getElementById('formJenjang').value;
  const unit = document.getElementById('formUnit').value;
  const totalCount = state.currentWizardRkkList.length || 10;
  const countM = document.querySelectorAll('#rkkChecklistContainer input[type="radio"][value="M"]:checked').length;

  const randomId = 'NURSE-' + String(state.nurses.length + 1).padStart(3, '0');
  const randomSpk = `800/${Math.floor(1000 + Math.random() * 9000)}/RSUD-DS/KOM-KEP/2026`;

  const newNurse = {
    id: randomId,
    name: nama,
    nip: nip,
    strNumber: str,
    strExpiry: strExp,
    unit: unit,
    pkLevel: jenjang,
    profession: jenjang.includes('PMB') ? 'Bidan Klinis' : 'Perawat Klinis',
    spkNumber: randomSpk,
    spkDate: '2026-10-20',
    spkExpiry: '2029-10-20',
    credentialStatus: 'Proses Review',
    peerReviewer: 'Ns. Yohanes Rindo Ari Wijoyo, S.Kep',
    approvedCompetencies: countM,
    totalCompetencies: totalCount,
    avatar: 'https://images.unsplash.com/photo-1594824813589-4a0b271d50c1?w=150&auto=format&fit=crop&q=80'
  };

  state.nurses.unshift(newNurse);
  saveNurses();
  updateHeroStats();
  renderNursesTable();
  renderAnalyticsCharts();

  // Mark step 3 as submitted
  const b3 = document.getElementById('badgeStep3Status');
  if (b3) {
    b3.style.background = '#dcfce7';
    b3.style.color = '#15803d';
    b3.innerHTML = '<i class="fa-solid fa-circle-check"></i> RKK Terkirim (Review)';
  }

  renderKredensialTrackerVisual(nip);

  closeModal('modalNewKredensial');
  showToast(`Permohonan kredensialing atas nama ${nama} berhasil didaftarkan! Status: Proses Review Subkomite & Mitra Bestari.`, 'success');
  switchTab('kredensial');
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
  const card3 = document.getElementById('cardStep3Rkk');

  if (state.kredensialSuratGenerated && b1) {
    b1.style.background = '#dcfce7';
    b1.style.color = '#15803d';
    const appName = state.currentApplicant?.nama ? ` (${state.currentApplicant.nama.split(' ')[0]})` : '';
    b1.innerHTML = `<i class="fa-solid fa-circle-check"></i> Surat Diunduh${appName}`;
  }

  if (state.kredensialBerkasUploaded) {
    if (b2) {
      b2.style.background = '#dcfce7';
      b2.style.color = '#15803d';
      b2.innerHTML = '<i class="fa-solid fa-circle-check"></i> Berkas Diunggah (Siap RKK)';
    }
    if (b3) {
      b3.style.background = 'rgba(37, 99, 235, 0.12)';
      b3.style.color = '#1d4ed8';
      b3.innerHTML = '<i class="fa-solid fa-circle-play"></i> Siap Asesmen Mandiri';
    }
    if (card3) card3.classList.remove('locked');
  }
}

function openSuratPermohonanModal() {
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
    timestamp: new Date().toISOString()
  };
  localStorage.setItem('komite_surat_generated', 'true');
  localStorage.setItem('komite_applicant_data', JSON.stringify(state.currentApplicant));

  updateAlurStepStatus();
  closeModal('modalSuratPermohonan');
  
  // Buka pratinjau surat hasil isian
  previewSuratKredensialHVS('filled');

  // Perbarui banner status sukses di modal pratinjau
  const banner = document.getElementById('previewSuratSuccessBanner');
  const badge = document.getElementById('previewSuratApplicantBadge');
  if (banner) banner.style.display = 'block';
  if (badge) badge.textContent = nama;

  showToast(`Surat Permohonan resmi untuk ${nama} berhasil diterbitkan sesuai template baku RSUD dr. Soedarso!`, 'success');
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
  const unit = isBlank ? '' : getVal('suratUnit', 'Ruang Enggang Gading 2 (Penyakit Dalam)');
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
        <em>Jenis Permohonan (Berikan tanda ceklis [&check;] pada kotak pilihan):</em><br>
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
      unit: 'Ruang Enggang Gading 2 (Penyakit Dalam)',
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
      unit: 'Ruang Bersalin (VK) & Maternal',
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
    if (el && val !== undefined) el.value = val;
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
  const ids = ['suratNama', 'suratNip', 'suratTtl', 'suratAlamat', 'suratHp', 'suratEmail', 'suratJabatanFungsional', 'suratInstitusi', 'suratTahunLulus', 'suratStr', 'suratStrExpiry', 'suratSipp', 'suratSippExpiry'];
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  showToast('Formulir berhasil dikosongkan. Siap diisi data baru atau dipratinjau sebagai blangko kosong.', 'info');
}

function openModalUploadSurat() {
  const pemohonInput = document.getElementById('uploadNamaPemohon');
  if (pemohonInput) {
    pemohonInput.value = document.getElementById('suratNama')?.value || (state.currentUser?.name || 'Ns. Hendra Kurniawan, S.Kep');
  }
  openModal('modalUploadBerkasKredensial');
}

function simpanUploadSurat(e) {
  if (e) e.preventDefault();
  state.kredensialBerkasUploaded = true;
  localStorage.setItem('komite_berkas_uploaded', 'true');
  updateAlurStepStatus();
  closeModal('modalUploadBerkasKredensial');
  renderKredensialTrackerVisual();
  showToast('Surat Permohonan bertanda tangan pemohon & portofolio berhasil diunggah! Langkah 3 (RKK Online) kini aktif.', 'success');

  // Opsi membuka langsung RKK Online tanpa hambatan
  setTimeout(() => {
    const bukaRkk = confirm(
      "Alur E-Kredensialing RSUD dr. Soedarso:\n\n" +
      "Surat Permohonan bertanda tangan mandiri dan portofolio berkas telah tersimpan ke sistem tanpa memerlukan persetujuan pengurus komite keperawatan di awal.\n\n" +
      "Apakah Anda ingin langsung melanjutkan ke LANGKAH 3 (Pengisian Asesmen Mandiri RKK Online) sekarang?"
    );
    if (bukaRkk) {
      cekBukaRkkOnline();
    }
  }, 350);
}

function cekBukaRkkOnline() {
  if (!state.kredensialBerkasUploaded) {
    const lanjut = confirm(
      "Pemberitahuan Sistem:\n\n" +
      "Anda belum menyelesaikan Langkah 2 (Unggah Surat Permohonan Bertanda Tangan & Portofolio Berkas).\n\n" +
      "Apakah Anda ingin tetap membuka formulir Asesmen Mandiri RKK sekarang?"
    );
    if (!lanjut) {
      openModalUploadSurat();
      return;
    }
  }
  openNewKredensialModal();
  const suratJenjang = document.getElementById('suratJenjang')?.value;
  if (suratJenjang) {
    const formJenjang = document.getElementById('formJenjang');
    if (formJenjang) {
      formJenjang.value = suratJenjang;
      onJenjangChange(suratJenjang);
    }
  }
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
  const query = document.getElementById('trackerSearchNip')?.value.trim();
  renderKredensialTrackerVisual(query);
  const box = document.getElementById('boxTrackerKredensial');
  if (box) box.style.display = 'block';
}

function renderKredensialTrackerVisual(query) {
  const container = document.getElementById('trackerVisualContainer');
  if (!container) return;

  let nurse = null;
  if (query) {
    nurse = state.nurses.find(n => 
      n.name.toLowerCase().includes(query.toLowerCase()) || 
      n.nip.toLowerCase().includes(query.toLowerCase())
    );
  }

  if (!nurse) {
    if (state.currentUser && !state.currentUser.isSuperAdmin) {
      nurse = state.nurses.find(n => n.name.toLowerCase().includes(state.currentUser.name.toLowerCase()));
    }
    if (!nurse) {
      nurse = state.nurses.find(n => n.credentialStatus === 'Proses Review') || state.nurses[0];
    }
  }

  let activeStep = 3;
  let statusBadge = '<span class="badge" style="background:#e0f2fe; color:#0369a1; font-weight:700;">Tahap 3: Asesmen Mitra Bestari</span>';
  let reviewerNote = 'Berkas administrasi dinyatakan lengkap. Jadwal peer review klinik telah diagendakan oleh Subkomite Kredensial.';

  if (nurse && nurse.credentialStatus === 'Disetujui') {
    activeStep = 5;
    statusBadge = '<span class="badge" style="background:#dcfce7; color:#15803d; font-weight:700;">Tahap 5: SPK & RKK Terbit</span>';
    reviewerNote = `SK Penugasan Klinis telah ditandatangani Direktur RSUD dr. Soedarso (${nurse.spkNumber}) dan berlaku aktif.`;
  } else if (nurse && nurse.credentialStatus === 'Menunggu Mitra Bestari') {
    activeStep = 3;
    statusBadge = '<span class="badge" style="background:#fef3c7; color:#92400e; font-weight:700;">Tahap 3: Menunggu Mitra Bestari</span>';
    reviewerNote = 'Berkas telah lolos verifikasi subkomite dan dialokasikan ke Tim Asesor Mitra Bestari spesialis.';
  } else if (state.kredensialBerkasUploaded && !query) {
    activeStep = 2;
    statusBadge = '<span class="badge" style="background:#fef3c7; color:#92400e; font-weight:700;">Tahap 2: Berkas Terunggah (Siap RKK)</span>';
    reviewerNote = 'Surat Permohonan bertanda tangan pemohon dan portofolio telah diunggah ke sistem tanpa memerlukan persetujuan pengurus komite di awal. Pemohon dapat langsung mengisi RKK Online.';
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
        <div class="tracker-step-label">1. Isi &amp; Unduh Surat</div>
        <div class="tracker-step-date">Pengajuan Mandiri</div>
      </div>

      <div class="tracker-step-item ${activeStep > 2 ? 'completed' : ''} ${activeStep === 2 ? 'active' : ''}">
        <div class="tracker-circle">
          ${activeStep > 2 ? '<i class="fa-solid fa-check"></i>' : '2'}
        </div>
        <div class="tracker-step-label">2. Unggah Surat &amp; Portofolio</div>
        <div class="tracker-step-date">Unggah Mandiri</div>
      </div>

      <div class="tracker-step-item ${activeStep > 3 ? 'completed' : ''} ${activeStep === 3 ? 'active' : ''}">
        <div class="tracker-circle">
          ${activeStep > 3 ? '<i class="fa-solid fa-check"></i>' : '3'}
        </div>
        <div class="tracker-step-label">3. Asesmen Mitra Bestari</div>
        <div class="tracker-step-date">Peer Review Subkomite</div>
      </div>

      <div class="tracker-step-item ${activeStep > 4 ? 'completed' : ''} ${activeStep === 4 ? 'active' : ''}">
        <div class="tracker-circle">
          ${activeStep > 4 ? '<i class="fa-solid fa-check"></i>' : '4'}
        </div>
        <div class="tracker-step-label">4. Rekomendasi Ketua</div>
        <div class="tracker-step-date">Komite Keperawatan</div>
      </div>

      <div class="tracker-step-item ${activeStep >= 5 ? 'completed' : ''} ${activeStep === 5 ? 'active' : ''}">
        <div class="tracker-circle">
          ${activeStep >= 5 ? '<i class="fa-solid fa-check"></i>' : '5'}
        </div>
        <div class="tracker-step-label">5. Terbit SPK Direktur</div>
        <div class="tracker-step-date">Penerbitan SK</div>
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
      openPrintSpkModal(nurse.id);
    };
  }

  const pkBadgeClass = getPkBadgeClass(nurse.pkLevel);
  const statusBadgeClass = getStatusBadgeClass(nurse.credentialStatus);
  const avatar = nurse.avatar || 'https://images.unsplash.com/photo-1594824813589-4a0b271d50c1?w=150&auto=format&fit=crop&q=80';

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
          <div style="font-family: var(--font-mono); font-size: 0.95rem; font-weight: 700; margin-top: 3px;">${nurse.nip}</div>
        </div>
        <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1rem;">
          <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Surat Tanda Registrasi (STR)</div>
          <div style="font-family: var(--font-mono); font-size: 0.95rem; font-weight: 700; margin-top: 3px;">${nurse.strNumber}</div>
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
