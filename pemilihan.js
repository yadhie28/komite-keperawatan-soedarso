/**
 * ============================================================================
 * MODUL E-VOTING PEMILIHAN KETUA KOMITE KEPERAWATAN RSUD DR. SOEDARSO
 * Periode Masa Bakti 2027 - 2030
 * Terintegrasi Penuh dengan Sistem Autentikasi Tunggal Portal Komite
 * ============================================================================
 */

(function () {
  const STORAGE_KEY = 'komkep_pemilihan_2027_state_v2';

  const DEFAULT_STATE = {
    election: {
      title: 'Pemilihan Ketua Komite Keperawatan RSUD dr. Soedarso',
      period: '2027 - 2030',
      isActive: true,
      startDate: '2026-11-01',
      endDate: '2026-12-15'
    },
    candidates: [
      {
        id: 'cand-1',
        number: 1,
        name: 'Ns. Siti Rahmawati, S.Kep., M.Kep.',
        nip: '000000000000000000',
        unit: 'Instalasi Rawat Intensif (ICU)',
        badgeColor: '#0e7490',
        badgeBg: '#ecfeff',
        photoGradient: 'linear-gradient(135deg, #0e7490 0%, #1e3a8a 100%)',
        visi: 'Mewujudkan Komite Keperawatan RSUD dr. Soedarso sebagai organisasi profesional yang unggul dalam mendorong mutu pelayanan keperawatan berstandar internasional dan keselamatan pasien.',
        misi: [
          'Meningkatkan kompetensi perawat melalui program pendidikan dan pelatihan berkelanjutan yang terstruktur.',
          'Mengembangkan standar praktik keperawatan berbasis evidence-based nursing practice.',
          'Membangun sistem kredensial dan rekredensial yang transparan, akuntabel, dan berkeadilan.'
        ],
        pengalaman: 'Kepala Ruang ICU (2018 - 2024) • Wakil Ketua Komite Keperawatan (2024 - 2027) • Asesor Kredensial Klinis',
        votes: 12
      },
      {
        id: 'cand-2',
        number: 2,
        name: 'Ns. Muhammad Fadli Hidayat, S.Kep., Sp.KMB.',
        nip: '000000000000000000',
        unit: 'Instalasi Rawat Inap Bedah',
        badgeColor: '#047857',
        badgeBg: '#ecfdf5',
        photoGradient: 'linear-gradient(135deg, #047857 0%, #065f46 100%)',
        visi: 'Menjadikan Komite Keperawatan sebagai motor penggerak transformasi pelayanan keperawatan yang humanis, profesional, dan berorientasi pada kepuasan pasien di RSUD dr. Soedarso.',
        misi: [
          'Membangun budaya kerja profesional dengan mengedepankan etika keperawatan dan caring behavior.',
          'Mengoptimalkan peran komite dalam pembinaan etik dan disiplin profesi keperawatan.',
          'Meningkatkan kesejahteraan dan perlindungan hukum bagi tenaga keperawatan.'
        ],
        pengalaman: 'Kepala Instalasi Rawat Inap Bedah (2020 - Sekarang) • Ketua Tim Keselamatan Pasien (2019 - 2023) • Pengurus PPNI',
        votes: 9
      },
      {
        id: 'cand-3',
        number: 3,
        name: 'Ns. Dewi Kartika Sari, S.Kep., M.Kep.',
        nip: '000000000000000000',
        unit: 'Instalasi Diklat & SDM Keperawatan',
        badgeColor: '#7c3aed',
        badgeBg: '#f5f3ff',
        photoGradient: 'linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%)',
        visi: 'Membangun Komite Keperawatan yang adaptif, inovatif, dan kolaboratif dalam mewujudkan pelayanan keperawatan prima di era transformasi digital RSUD dr. Soedarso.',
        misi: [
          'Mengakselerasi digitalisasi dokumentasi dan sistem informasi keperawatan terpadu.',
          'Meningkatkan mutu asuhan keperawatan melalui audit klinis berkala dan terukur.',
          'Mengembangkan program mentoring dan preceptorship untuk perawat klinis baru.'
        ],
        pengalaman: 'Koordinator Diklat Keperawatan (2021 - Sekarang) • Anggota Subkomite Mutu Keperawatan • Magister Manajemen Keperawatan UGM',
        votes: 14
      }
    ],
    // Map catatan voting tersimpan berdasarkan kunci pemilih (NIP bersih)
    voterRecords: {
      '000000000000000000': { hasVoted: true, votedFor: 'cand-3', voterName: 'Ns. Bambang Irawan, S.Kep.', voterNip: '000000000000000000', voterUnit: 'Instalasi Gawat Darurat (IGD)' },
      '000000000000000000': { hasVoted: true, votedFor: 'cand-1', voterName: 'Ns. Nurul Hidayati, S.Kep.', voterNip: '000000000000000000', voterUnit: 'Instalasi Bedah Sentral (OK)' },
      '000000000000000000': { hasVoted: true, votedFor: 'cand-3', voterName: 'Ns. Sri Wahyuni, A.Md.Kep.', voterNip: '000000000000000000', voterUnit: 'Poliklinik Rawat Jalan' }
    },
    activeSubTab: 'voting', // 'voting', 'hasil', 'profil', 'admin'
    pendingVoteCandidateId: null
  };

  // State in-memory
  let state = loadState();

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Gagal membaca state pemilihan dari localStorage:', e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Gagal menyimpan state pemilihan ke localStorage:', e);
    }
  }

  function notify(msg, type = 'success') {
    if (typeof window.showToast === 'function') {
      window.showToast(msg, type === 'error' ? 'error' : (type === 'warning' ? 'warning' : 'success'));
    } else {
      alert(msg);
    }
  }

  /**
   * Mengambil data akun yang sedang login di portal secara real-time
   */
  function getActivePortalUser() {
    // 1. Cek dari window.state portal
    if (window.state && window.state.currentUser) {
      return window.state.currentUser;
    }
    // 2. Cek fallback dari localStorage auth portal
    try {
      const saved = localStorage.getItem('komite_auth_user');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {}
    return null;
  }

  /**
   * Menghasilkan identifier unik pemilih
   */
  function getUserKey(user) {
    if (!user) return '';
    const raw = (user.nip && user.nip !== '-') ? user.nip : (user.username || user.name || '');
    return String(raw).replace(/[\s\.\-]/g, '').toLowerCase();
  }

  /**
   * Menilai tipe akses akun login
   */
  function resolveUserStatus() {
    const user = getActivePortalUser();
    if (!user || user.role === 'guest') {
      return {
        type: 'GUEST',
        user: user || { name: 'Tamu Publik', role: 'guest' },
        hasVoted: false,
        votedFor: null
      };
    }

    const roleLower = String(user.role || '').toLowerCase();
    const isPengusul = roleLower === 'pengusul' || roleLower === 'perawat' || roleLower === 'bidan';

    // Cek status suara tersimpan
    const key = getUserKey(user);
    const voteRecord = key ? state.voterRecords[key] : null;

    if (!isPengusul) {
      // Akun Pengurus / Panitia / Admin
      return {
        type: 'ADMIN',
        user: user,
        hasVoted: false,
        votedFor: null
      };
    }

    // Tenaga Keperawatan / Pengusul (Voter)
    return {
      type: 'VOTER',
      user: user,
      hasVoted: Boolean(voteRecord?.hasVoted),
      votedFor: voteRecord?.votedFor || null
    };
  }

  // Objek Publik
  window.PemilihanKomkep = {
    init: function () {
      renderAll();
    },

    switchSubTab: function (tabId) {
      state.activeSubTab = tabId;
      saveState();
      renderAll();
    },

    openVoteModal: function (candidateId) {
      const auth = resolveUserStatus();

      if (!state.election.isActive) {
        notify('Pemilihan sedang dinonaktifkan / dijeda oleh panitia.', 'warning');
        return;
      }

      if (auth.type === 'GUEST') {
        notify('Anda belum masuk akun portal. Silakan masuk akun terlebih dahulu untuk memberikan suara.', 'warning');
        if (typeof window.openLoginModal === 'function') {
          window.openLoginModal();
        }
        return;
      }

      if (auth.type === 'ADMIN') {
        notify('Akun Panitia / Pengurus Komite bertindak sebagai administrator dan tidak memiliki hak suara di bilik suara pemilih.', 'warning');
        return;
      }

      if (auth.hasVoted) {
        notify('Anda sudah memberikan suara sebelumnya! Setiap perawat hanya berhak atas 1 suara sah.', 'warning');
        return;
      }

      const cand = state.candidates.find(c => c.id === candidateId);
      if (!cand) return;

      state.pendingVoteCandidateId = candidateId;

      const modal = document.getElementById('modalKonfirmasiVoting');
      if (modal) {
        document.getElementById('modalVoteCandName').textContent = cand.name;
        document.getElementById('modalVoteCandNum').textContent = `Nomor Urut 0${cand.number}`;
        document.getElementById('modalVoteCandUnit').textContent = cand.unit;
        modal.style.display = 'flex';
      }
    },

    closeVoteModal: function () {
      const modal = document.getElementById('modalKonfirmasiVoting');
      if (modal) modal.style.display = 'none';
      state.pendingVoteCandidateId = null;
    },

    confirmVote: function () {
      if (!state.pendingVoteCandidateId) return;

      const auth = resolveUserStatus();
      if (auth.type !== 'VOTER' || auth.hasVoted) {
        window.PemilihanKomkep.closeVoteModal();
        notify('Penyaluran suara dibatalkan karena status akun tidak valid.', 'error');
        return;
      }

      const cand = state.candidates.find(c => c.id === state.pendingVoteCandidateId);
      if (cand) {
        cand.votes += 1;
      }

      const userKey = getUserKey(auth.user);
      state.voterRecords[userKey] = {
        hasVoted: true,
        votedFor: state.pendingVoteCandidateId,
        votedAt: new Date().toISOString(),
        voterName: auth.user.name,
        voterNip: auth.user.nip || '-',
        voterUnit: auth.user.unit || 'Keperawatan'
      };

      saveState();
      window.PemilihanKomkep.closeVoteModal();
      notify(`Suara Anda untuk ${cand.name} telah berhasil dicatat secara resmi ke dalam sistem e-voting. Terima kasih atas partisipasi Anda!`, 'success');
      state.activeSubTab = 'hasil';
      renderAll();
    },

    toggleElection: function () {
      state.election.isActive = !state.election.isActive;
      saveState();
      notify(`Status pemilihan diubah: ${state.election.isActive ? 'AKTIF (Bilik Suara Dibuka)' : 'DIJEDA / DITUTUP'}`, 'warning');
      renderAll();
    },

    resetAllVotes: function () {
      if (!confirm('PERINGATAN: Apakah Anda yakin ingin mereset seluruh perolehan suara menjadi 0? Tindakan ini akan menghapus semua riwayat pemungutan suara.')) return;
      
      state.candidates.forEach(c => c.votes = 0);
      state.voterRecords = {};
      saveState();
      notify('Semua data perolehan suara berhasil direset ke 0.', 'success');
      renderAll();
    },

    resetVoterStatus: function (userKey) {
      const record = state.voterRecords[userKey];
      if (!record) return;

      if (record.votedFor) {
        const c = state.candidates.find(cand => cand.id === record.votedFor);
        if (c && c.votes > 0) c.votes -= 1;
      }

      delete state.voterRecords[userKey];
      saveState();
      notify(`Status hak suara untuk ${record.voterName || userKey} berhasil direset.`, 'success');
      renderAll();
    }
  };

  function renderAll() {
    renderUserPill();
    renderSubTabNavigation();
    renderVotingCards();
    renderResults();
    renderProfileView();
    renderAdminPanel();
  }

  function renderUserPill() {
    const pill = document.getElementById('pemilihanUserPill');
    const actionBox = document.getElementById('pemilihanAuthActionBox');
    if (!pill) return;

    const auth = resolveUserStatus();

    if (auth.type === 'GUEST') {
      pill.innerHTML = `
        <span style="background: #fef3c7; color: #92400e; font-weight: 800; padding: 2px 8px; border-radius: 4px; font-size: 0.72rem;">TAMU PUBLIK</span>
        <span style="font-size: 0.82rem; color: #64748b;">Belum masuk akun perawat RSUD dr. Soedarso</span>
      `;
      if (actionBox) {
        actionBox.innerHTML = `
          <button type="button" class="btn-primary" onclick="openLoginModal()" style="font-size: 0.78rem; padding: 5px 12px; background: #0d5f5b; border: none; color: #fff; font-weight: 700; border-radius: 6px; display: flex; align-items: center; gap: 0.35rem;">
            <i class="fa-solid fa-right-to-bracket"></i> Masuk Akun Portal
          </button>
        `;
      }
    } else if (auth.type === 'ADMIN') {
      pill.innerHTML = `
        <span style="background: #fbbf24; color: #78350f; font-weight: 800; padding: 2px 8px; border-radius: 4px; font-size: 0.72rem;">PANITIA / PENGURUS</span>
        <span style="font-weight: 800; font-size: 0.85rem; color: #0f172a;">${auth.user.name}</span>
        <span style="font-size: 0.75rem; color: #64748b;">(NIP: ${auth.user.nip || '-'} • ${auth.user.role})</span>
      `;
      if (actionBox) {
        actionBox.innerHTML = `
          <button type="button" class="btn-secondary" onclick="logoutToPortal()" style="font-size: 0.75rem; padding: 4px 10px; background: #ffffff; color: #64748b; border: 1px solid #cbd5e1; border-radius: 6px; display: flex; align-items: center; gap: 0.35rem;">
            <i class="fa-solid fa-right-from-bracket"></i> Ganti Akun
          </button>
        `;
      }
    } else {
      // VOTER (Tenaga Keperawatan Pengusul)
      const nipDisplay = auth.user.nip ? `NIP: ${auth.user.nip}` : '';
      const unitDisplay = auth.user.unit ? `Unit: ${auth.user.unit}` : '';
      const detail = [nipDisplay, unitDisplay].filter(Boolean).join(' • ');

      pill.innerHTML = `
        <span style="width: 8px; height: 8px; border-radius: 50%; background: ${auth.hasVoted ? '#10b981' : '#f59e0b'}; display: inline-block;"></span>
        <span style="font-weight: 800; font-size: 0.85rem; color: #0f172a;">${auth.user.name}</span>
        <span style="font-size: 0.75rem; color: #64748b;">(${detail})</span>
        <span style="background: ${auth.hasVoted ? '#dcfce7' : '#fef3c7'}; color: ${auth.hasVoted ? '#166534' : '#92400e'}; font-weight: 800; font-size: 0.7rem; padding: 2px 8px; border-radius: 4px; margin-left: 4px;">
          ${auth.hasVoted ? '✓ Sudah Memilih' : 'Belum Memilih'}
        </span>
      `;
      if (actionBox) {
        actionBox.innerHTML = `
          <button type="button" class="btn-secondary" onclick="logoutToPortal()" style="font-size: 0.75rem; padding: 4px 10px; background: #ffffff; color: #64748b; border: 1px solid #cbd5e1; border-radius: 6px; display: flex; align-items: center; gap: 0.35rem;">
            <i class="fa-solid fa-right-from-bracket"></i> Ganti Akun
          </button>
        `;
      }
    }
  }

  function renderSubTabNavigation() {
    const tabs = ['voting', 'hasil', 'profil', 'admin'];
    tabs.forEach(t => {
      const btn = document.getElementById(`pemilihan-nav-${t}`);
      const pane = document.getElementById(`pemilihan-subpane-${t}`);
      if (btn) {
        if (t === state.activeSubTab) {
          btn.style.background = '#0d5f5b';
          btn.style.color = '#ffffff';
          btn.style.fontWeight = '700';
        } else {
          btn.style.background = 'transparent';
          btn.style.color = '#475569';
          btn.style.fontWeight = '600';
        }
      }
      if (pane) {
        pane.style.display = (t === state.activeSubTab) ? 'block' : 'none';
      }
    });
  }

  function renderVotingCards() {
    const container = document.getElementById('pemilihanVotingGrid');
    if (!container) return;

    const auth = resolveUserStatus();
    const canVote = state.election.isActive && auth.type === 'VOTER' && !auth.hasVoted;

    // Status Banner di atas grid voting
    const statusBox = document.getElementById('pemilihanVoterStatusBox');
    if (statusBox) {
      if (!state.election.isActive) {
        statusBox.innerHTML = `
          <div style="background: #fffbeb; border: 1.5px solid #fde68a; border-radius: 12px; padding: 1rem; display: flex; align-items: center; gap: 0.75rem;">
            <i class="fa-solid fa-triangle-exclamation" style="color: #d97706; font-size: 1.3rem;"></i>
            <div>
              <div style="font-weight: 800; color: #92400e; font-size: 0.9rem;">Pemilihan Sedang Dijeda oleh Panitia</div>
              <div style="font-size: 0.8rem; color: #b45309;">Bilik suara saat ini belum dapat menerima suara pemilih baru.</div>
            </div>
          </div>
        `;
      } else if (auth.type === 'GUEST') {
        statusBox.innerHTML = `
          <div style="background: #fffbeb; border: 1.5px solid #fde68a; border-radius: 12px; padding: 1rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <i class="fa-solid fa-lock" style="color: #d97706; font-size: 1.3rem;"></i>
              <div>
                <div style="font-weight: 800; color: #92400e; font-size: 0.9rem;">Autentikasi Diperlukan untuk Memberikan Suara</div>
                <div style="font-size: 0.8rem; color: #b45309;">Anda saat ini masuk sebagai Tamu Publik. Silakan masuk menggunakan akun perawat Anda untuk membuka bilik suara.</div>
              </div>
            </div>
            <button class="btn-primary" style="font-size: 0.82rem; padding: 0.5rem 1rem; background: #0d5f5b; border: none; font-weight: 700;" onclick="openLoginModal()">
              <i class="fa-solid fa-right-to-bracket"></i> Masuk Sekarang
            </button>
          </div>
        `;
      } else if (auth.type === 'ADMIN') {
        statusBox.innerHTML = `
          <div style="background: #f0fdf4; border: 1.5px solid #bbf7d0; border-radius: 12px; padding: 1rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <i class="fa-solid fa-shield-halved" style="color: #16a34a; font-size: 1.3rem;"></i>
              <div>
                <div style="font-weight: 800; color: #166534; font-size: 0.9rem;">Login Terverifikasi Sebagai Pengurus / Panitia Pemilihan</div>
                <div style="font-size: 0.8rem; color: #15803d;">Anda memiliki wewenang untuk memantau rekapitulasi atau mengelola DPT pada tab Panel Admin.</div>
              </div>
            </div>
            <button class="btn-secondary" style="font-size: 0.8rem;" onclick="window.PemilihanKomkep.switchSubTab('admin')">Buka Panel Admin</button>
          </div>
        `;
      } else if (auth.hasVoted) {
        statusBox.innerHTML = `
          <div style="background: #ecfdf5; border: 1.5px solid #a7f3d0; border-radius: 12px; padding: 1rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <i class="fa-solid fa-circle-check" style="color: #059669; font-size: 1.3rem;"></i>
              <div>
                <div style="font-weight: 800; color: #065f46; font-size: 0.9rem;">Hak Suara Anda Telah Tersalurkan</div>
                <div style="font-size: 0.8rem; color: #047857;">Terima kasih <strong>${auth.user.name}</strong>, suara Anda telah dicatat secara sah. Pantau perolehan suara secara langsung di tab Hasil Rekapitulasi.</div>
              </div>
            </div>
            <button class="btn-secondary" style="font-size: 0.8rem;" onclick="window.PemilihanKomkep.switchSubTab('hasil')">Lihat Hasil Real-time</button>
          </div>
        `;
      } else {
        statusBox.innerHTML = `
          <div style="background: #f0f9ff; border: 1.5px solid #bae6fd; border-radius: 12px; padding: 1rem; display: flex; align-items: center; gap: 0.75rem;">
            <i class="fa-solid fa-check-to-slot" style="color: #0284c7; font-size: 1.3rem;"></i>
            <div>
              <div style="font-weight: 800; color: #075985; font-size: 0.9rem;">Selamat Datang, ${auth.user.name}!</div>
              <div style="font-size: 0.8rem; color: #0369a1;">Silakan gunakan hak suara Anda dengan memilih salah satu calon di bawah ini. Pilihan bersifat langsung, bebas, rahasia, jujur, dan adil.</div>
            </div>
          </div>
        `;
      }
    }

    container.innerHTML = state.candidates.map(c => `
      <div style="background: var(--bg-surface); border: 2px solid ${canVote ? '#e2e8f0' : '#f1f5f9'}; border-radius: 16px; overflow: hidden; box-shadow: var(--shadow-sm); display: flex; flex-direction: column; transition: all 0.2s;" onmouseover="this.style.boxShadow='var(--shadow-md)'; this.style.borderColor='${canVote ? '#0d5f5b' : '#e2e8f0'}'" onmouseout="this.style.boxShadow='var(--shadow-sm)'; this.style.borderColor='${canVote ? '#e2e8f0' : '#f1f5f9'}'">
        <div style="background: ${c.photoGradient}; padding: 1.75rem 1rem; text-align: center; color: #ffffff; position: relative;">
          <div style="position: absolute; top: 12px; left: 12px; background: rgba(255,255,255,0.25); backdrop-filter: blur(4px); border: 1px solid rgba(255,255,255,0.3); color: #fff; font-weight: 900; font-size: 0.78rem; padding: 3px 10px; border-radius: 20px;">
            NOMOR URUT 0${c.number}
          </div>
          <div style="width: 80px; height: 80px; margin: 0 auto; border-radius: 50%; background: rgba(255,255,255,0.2); border: 3px solid rgba(255,255,255,0.6); display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: 900; box-shadow: inset 0 2px 6px rgba(0,0,0,0.2);">
            ${c.name.charAt(4) || 'P'}
          </div>
          <h3 style="font-size: 1.05rem; font-weight: 800; margin-top: 0.75rem; line-height: 1.3;">${c.name}</h3>
          <div style="font-size: 0.8rem; opacity: 0.9; margin-top: 2px;">${c.unit}</div>
          <div style="font-size: 0.72rem; opacity: 0.8; font-family: monospace; margin-top: 2px;">NIP: ${c.nip}</div>
        </div>

        <div style="padding: 1.25rem; flex: 1; display: flex; flex-direction: column; justify-content: space-between; gap: 1rem;">
          <div>
            <div style="font-size: 0.72rem; font-weight: 800; color: var(--primary-700); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.35rem;">
              <i class="fa-solid fa-bullseye"></i> Visi Utama
            </div>
            <p style="font-size: 0.82rem; line-height: 1.5; color: #334155;">${c.visi}</p>

            <div style="font-size: 0.72rem; font-weight: 800; color: var(--gold-700); text-transform: uppercase; letter-spacing: 0.05em; margin-top: 0.75rem; margin-bottom: 0.35rem;">
              <i class="fa-solid fa-briefcase"></i> Pengalaman Klinis
            </div>
            <p style="font-size: 0.78rem; color: #64748b; line-height: 1.4;">${c.pengalaman}</p>
          </div>

          <button class="btn-primary" style="width: 100%; justify-content: center; padding: 0.75rem; font-size: 0.88rem; font-weight: 800; border-radius: 10px; background: ${canVote ? '#0d5f5b' : '#cbd5e1'}; cursor: ${canVote ? 'pointer' : 'not-allowed'}; border: none;" onclick="${canVote ? `window.PemilihanKomkep.openVoteModal('${c.id}')` : ''}" ${!canVote ? 'disabled' : ''}>
            <i class="fa-solid ${auth.hasVoted ? 'fa-check' : 'fa-check-to-slot'}"></i>
            ${auth.hasVoted ? 'Suara Telah Diberikan' : (auth.type === 'GUEST' ? 'Masuk Akun untuk Memilih' : 'PILIH CALON INI')}
          </button>
        </div>
      </div>
    `).join('');
  }

  function renderResults() {
    const totalVotes = state.candidates.reduce((sum, c) => sum + c.votes, 0);
    const totalRegistered = Object.keys(state.voterRecords).length;
    // Angka estimasi DPT atau pemilih yang berpartisipasi
    const totalDpt = Math.max(totalVotes, 35); 
    const turnout = totalDpt > 0 ? Math.round((totalVotes / totalDpt) * 100) : 0;

    // Metrics boxes
    const mTotal = document.getElementById('pemilihanMetricTotalVotes');
    const mTurnout = document.getElementById('pemilihanMetricTurnout');
    const mLeader = document.getElementById('pemilihanMetricLeader');

    if (mTotal) mTotal.textContent = `${totalVotes} Suara`;
    if (mTurnout) mTurnout.textContent = `${turnout}% Partisipasi`;

    const sorted = [...state.candidates].sort((a, b) => b.votes - a.votes);
    if (mLeader && sorted[0]) {
      mLeader.textContent = totalVotes > 0 ? `0${sorted[0].number}. ${sorted[0].name.split(',')[0]}` : '-';
    }

    // Results Bar Chart Container
    const barsContainer = document.getElementById('pemilihanResultsBars');
    if (barsContainer) {
      barsContainer.innerHTML = state.candidates.map(c => {
        const pct = totalVotes > 0 ? Math.round((c.votes / totalVotes) * 100) : 0;
        return `
          <div style="margin-bottom: 1.25rem;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; font-size: 0.85rem; font-weight: 700; margin-bottom: 0.4rem;">
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span style="width: 22px; height: 22px; border-radius: 50%; background: #0d5f5b; color: #fff; font-size: 0.72rem; display: inline-flex; align-items: center; justify-content: center; font-weight: 800;">
                  0${c.number}
                </span>
                <span style="color: var(--text-main);">${c.name}</span>
                <span style="font-size: 0.75rem; color: #64748b; font-weight: 500;">(${c.unit})</span>
              </div>
              <div style="font-family: monospace; font-size: 0.9rem; color: #0f172a;">
                <strong>${c.votes} Suara</strong>
                <span style="color: #64748b; font-size: 0.8rem; margin-left: 4px;">(${pct}%)</span>
              </div>
            </div>
            <div style="width: 100%; height: 12px; background: #f1f5f9; border-radius: 6px; overflow: hidden; display: flex;">
              <div style="width: ${pct}%; background: linear-gradient(90deg, #0d5f5b 0%, #14b8a6 100%); transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1); border-radius: 6px;"></div>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  function renderProfileView() {
    const container = document.getElementById('pemilihanProfilContainer');
    if (!container) return;

    container.innerHTML = state.candidates.map(c => `
      <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: 16px; padding: 1.5rem; margin-bottom: 1.25rem; box-shadow: var(--shadow-sm);">
        <div style="display: flex; gap: 1.25rem; flex-wrap: wrap;">
          <div style="width: 80px; height: 80px; border-radius: 16px; background: ${c.photoGradient}; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: 900; flex-shrink: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.15);">
            0${c.number}
          </div>
          <div style="flex: 1; min-width: 250px;">
            <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
              <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--text-main);">${c.name}</h3>
              <span style="background: ${c.badgeBg}; color: ${c.badgeColor}; font-weight: 800; font-size: 0.72rem; padding: 2px 8px; border-radius: 6px;">
                ${c.unit}
              </span>
            </div>
            <div style="font-size: 0.8rem; color: #64748b; font-family: monospace; margin-top: 2px;">
              NIP: ${c.nip}
            </div>

            <div style="margin-top: 1rem;">
              <div style="font-weight: 800; font-size: 0.82rem; color: var(--primary-700); text-transform: uppercase;">
                Visi:
              </div>
              <p style="font-size: 0.85rem; color: #334155; margin-top: 0.25rem; line-height: 1.5;">${c.visi}</p>
            </div>

            <div style="margin-top: 0.75rem;">
              <div style="font-weight: 800; font-size: 0.82rem; color: var(--primary-700); text-transform: uppercase;">
                Misi Prioritas:
              </div>
              <ul style="font-size: 0.83rem; color: #475569; margin-top: 0.25rem; padding-left: 1.25rem; line-height: 1.6;">
                ${c.misi.map(m => `<li>${m}</li>`).join('')}
              </ul>
            </div>

            <div style="margin-top: 0.75rem; padding-top: 0.75rem; border-top: 1px dashed #e2e8f0; font-size: 0.8rem; color: #64748b;">
              <strong>Rekam Jejak &amp; Penugasan:</strong> ${c.pengalaman}
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }

  function renderAdminPanel() {
    // Status text
    const statusText = document.getElementById('pemilihanAdminStatusText');
    const toggleBtn = document.getElementById('pemilihanBtnToggleElection');
    if (statusText) {
      statusText.innerHTML = state.election.isActive
        ? '<span style="color: #16a34a; font-weight: 800;">● AKTIF (Bilik Suara Dibuka)</span>'
        : '<span style="color: #dc2626; font-weight: 800;">● DIJEDA (Bilik Suara Ditutup)</span>';
    }
    if (toggleBtn) {
      toggleBtn.textContent = state.election.isActive ? 'Jeda Pemilihan' : 'Buka Kembali Pemilihan';
      toggleBtn.style.background = state.election.isActive ? '#d97706' : '#16a34a';
    }

    // DPT Table
    const tbody = document.getElementById('pemilihanDptTableBody');
    if (tbody) {
      const records = Object.entries(state.voterRecords);
      if (records.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="5" style="padding: 1.5rem; text-align: center; color: #94a3b8;">
              Belum ada riwayat suara pemilih yang tersimpan.
            </td>
          </tr>
        `;
        return;
      }

      tbody.innerHTML = records.map(([key, v], i) => `
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 0.75rem; font-weight: 600; color: #1e293b;">${i + 1}. ${v.voterName || '-'}</td>
          <td style="padding: 0.75rem; font-family: monospace; color: #64748b; font-size: 0.8rem;">${v.voterNip || key}</td>
          <td style="padding: 0.75rem; color: #475569; font-size: 0.82rem;">${v.voterUnit || '-'}</td>
          <td style="padding: 0.75rem; text-align: center;">
            <span style="display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 0.72rem; font-weight: 800; background: #dcfce7; color: #166534;">
              Sudah Memilih
            </span>
          </td>
          <td style="padding: 0.75rem; text-align: center;">
            <button class="btn-secondary" style="font-size: 0.72rem; padding: 3px 8px; color: #b91c1c;" onclick="window.PemilihanKomkep.resetVoterStatus('${key}')">
              <i class="fa-solid fa-rotate-left"></i> Reset Suara
            </button>
          </td>
        </tr>
      `).join('');
    }
  }

  // Event listener saat tab aktif berganti
  window.addEventListener('hashchange', () => {
    if (window.location.hash === '#pemilihan') {
      renderAll();
    }
  });

  // Sinkronisasi otomatis saat DOM siap dan saat auth portal diperbarui
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.PemilihanKomkep.init);
  } else {
    window.PemilihanKomkep.init();
  }
})();
