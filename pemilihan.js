/**
 * ============================================================================
 * MODUL E-VOTING: PEMILIHAN KETUA KOMITE KEPERAWATAN (2027–2030)
 * RSUD dr. SOEDARSO PONTIANAK
 * ============================================================================
 * Catatan:
 * 1.Tidak menggunakan modal "Portal Sistem Kredensialing" di halaman ini.
 *   Portal login hanya ada satu, yaitu di awal pertama kali mengakses web.
 * 2.Seluruh penulisan NIP/NIPPPK/NIK tanpa spasi.
 * 3.Simulasi Pemilihan saat ini dibatalkan/ditunda sementara.
 * ============================================================================
 */

(function () {
  'use strict';

  const SIMULATION_ELECTION_ID = 'e1ec7100-2026-1123-0000-000000000001';
  const PESAN_SIMULASI_DIBATALKAN = 'Simulasi Pemilihan Ketua Komite Keperawatan Periode 2027–2030 saat ini dibatalkan / ditunda sementara selama penataan sistem akses masuk akun pegawai.';

  const CANDIDATES_SIMULASI = [
    {
      id: 'cand-1',
      number: 1,
      name: 'Ns. Siti Rahmawati, S.Kep., M.Kep. (SIMULASI)',
      nip: '000000000000001031',
      unit: 'Instalasi Rawat Intensif (ICU)',
      badgeColor: '#0e7490',
      badgeBg: '#ecfeff',
      photoGradient: 'linear-gradient(135deg, #0e7490 0%, #1e3a8a 100%)',
      visi: 'Mewujudkan Komite Keperawatan RSUD dr. Soedarso sebagai organisasi profesional yang unggul dalam mendorong mutu pelayanan keperawatan berstandar internasional dan keselamatan pasien.',
      misi: 'Meningkatkan kompetensi perawat melalui diklat terstruktur; mengembangkan standar praktik berbasis evidence-based nursing; membangun sistem kredensial transparan dan akuntabel.',
      pengalaman: 'Calon Simulasi (Dummy) Nomor Urut 01 • Asesor Kredensial Klinis',
      isAbstain: false
    },
    {
      id: 'cand-2',
      number: 2,
      name: 'Ns. Muhammad Fadli Hidayat, S.Kep., Sp.KMB. (SIMULASI)',
      nip: '000000000000001032',
      unit: 'Instalasi Rawat Inap Bedah',
      badgeColor: '#047857',
      badgeBg: '#ecfdf5',
      photoGradient: 'linear-gradient(135deg, #047857 0%, #065f46 100%)',
      visi: 'Menjadikan Komite Keperawatan sebagai motor penggerak transformasi pelayanan keperawatan yang humanis, profesional, dan berorientasi pada kepuasan pasien di RSUD dr. Soedarso.',
      misi: 'Membangun budaya kerja profesional dengan etika keperawatan; mengoptimalkan peran komite dalam pembinaan etik dan disiplin; meningkatkan perlindungan advokasi klinis.',
      pengalaman: 'Calon Simulasi (Dummy) Nomor Urut 02 • Instruktur Klinis Keperawatan Medikal Bedah',
      isAbstain: false
    },
    {
      id: 'cand-3',
      number: 3,
      name: 'Ns. Rusmulyadi, S.Kep.Ners., M.A.R.S (SIMULASI)',
      nip: '198212282008011005',
      unit: 'Enggang Gading',
      badgeColor: '#7c3aed',
      badgeBg: '#f5f3ff',
      photoGradient: 'linear-gradient(135deg, #6d28d9 0%, #4c1d95 100%)',
      visi: 'Optimalisasi sinergi tata kelola klinis keperawatan dan kebidanan secara modern, digital, kredibel, dan berkeadilan menuju standar akreditasi rumah sakit kelas A.',
      misi: 'Digitalisasi sistem kredensialing dan logbook perawat; penguatan audit mutu klinis berkala; perlindungan hukum dan pembinaan etik independen.',
      pengalaman: 'Calon Simulasi (Dummy) Nomor Urut 03 • Sekretaris Komite Keperawatan',
      isAbstain: false
    },
    {
      id: 'cand-abstain',
      number: 4,
      name: 'Kotak Kosong / Abstain (Tidak Memilih)',
      nip: '-',
      unit: 'Seluruh Unit Kerja',
      badgeColor: '#64748b',
      badgeBg: '#f8fafc',
      photoGradient: 'linear-gradient(135deg, #475569 0%, #1e293b 100%)',
      visi: 'Menyediakan hak suara sah bagi pemilih yang menyatakan sikap abstain secara resmi sesuai tata tertib pemilihan.',
      misi: 'Mengakomodasi preferensi pemilih sesuai asas demokrasi dan transparansi pemungutan suara.',
      pengalaman: 'Opsi Hak Suara Sah Abstain Resmi (Simulasi)',
      isAbstain: true
    }
  ];

  const state = {
    election: {
      id: SIMULATION_ELECTION_ID,
      title: 'Pemilihan Ketua Komite Keperawatan',
      period: '2027–2030',
      nomorBeritaAcara: '400.7.2/ 1428 /KOMKEP-RSDS/2026'
    },
    candidates: CANDIDATES_SIMULASI,
    activeSubTab: 'voting'
  };

  function notify(msg, type = 'info') {
    if (typeof window.showToast === 'function') {
      window.showToast(msg, type);
    } else {
      alert(msg);
    }
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function getActivePortalUser() {
    if (window.state && window.state.currentUser) {
      return window.state.currentUser;
    }
    try {
      const saved = localStorage.getItem('komite_auth_user');
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return null;
  }

  function renderAll() {
    renderDisclaimerBanner();
    renderUserPill();
    renderSubTabNavigation();
    renderVotingCards();
    renderResults();
    renderProfileView();
    renderAdminPanel();
  }

  function renderDisclaimerBanner() {
    const pane = document.getElementById('pane-evoting');
    if (!pane) return;

    let banner = document.getElementById('pemilihanSimulasiDisclaimerBanner');
    if (!banner) {
      banner = document.createElement('div');
      banner.id = 'pemilihanSimulasiDisclaimerBanner';
      banner.style.cssText = 'background: #fef2f2; border: 2px solid #ef4444; border-radius: 12px; padding: 1rem 1.25rem; margin-bottom: 1.5rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap; box-shadow: var(--shadow-sm);';
      pane.insertBefore(banner, pane.children[1] || pane.firstChild);
    }

    banner.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.85rem;">
        <div style="width: 42px; height: 42px; border-radius: 10px; background: #dc2626; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; flex-shrink: 0;">
          <i class="fa-solid fa-ban"></i>
        </div>
        <div>
          <div style="font-size: 0.82rem; font-weight: 900; color: #991b1b; text-transform: uppercase; letter-spacing: 0.5px;">
            SIMULASI PEMILIHAN DIBATALKAN SEMENTARA
          </div>
          <div style="font-size: 0.86rem; font-weight: 700; color: #7f1d1d; margin-top: 2px;">
            ${escapeHtml(PESAN_SIMULASI_DIBATALKAN)}
          </div>
        </div>
      </div>
    `;
  }

  // Menampilkan akun yang sedang masuk dari Portal Awal (tanpa memunculkan modal Portal Sistem Kredensialing)
  function renderUserPill() {
    const pill = document.getElementById('pemilihanUserPill');
    const actionBox = document.getElementById('pemilihanAuthActionBox');
    if (!pill || !actionBox) return;

    const user = getActivePortalUser();
    if (!user || user.role === 'guest') {
      pill.innerHTML = `
        <span style="font-size: 0.82rem; color: var(--text-muted); display: inline-flex; align-items: center; gap: 0.4rem;">
          <i class="fa-solid fa-user"></i> Mode Tamu Publik
        </span>
      `;
      actionBox.innerHTML = `
        <button type="button" class="btn-secondary" onclick="logoutToPortal()" style="font-size: 0.78rem; padding: 5px 12px; border-radius: 6px;">
          <i class="fa-solid fa-right-to-bracket"></i> Ke Halaman Masuk Awal
        </button>
      `;
    } else {
      const cleanId = String(user.nip || user.id_login || user.username || '-').replace(/\s+/g, '');
      pill.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem; background: var(--bg-surface); border: 1px solid var(--border-subtle); padding: 4px 10px; border-radius: 8px;">
          <div style="width: 24px; height: 24px; border-radius: 50%; background: #0d5f5b; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 0.72rem; font-weight: bold;">
            ${escapeHtml((user.name || 'P').charAt(0))}
          </div>
          <div style="line-height: 1.2;">
            <div style="font-size: 0.8rem; font-weight: 800; color: var(--text-main);">${escapeHtml(user.name)}</div>
            <div style="font-size: 0.72rem; color: var(--text-muted); font-family: monospace;">ID: ${escapeHtml(cleanId)} &bull; ${escapeHtml(user.unit || 'RSUD dr. Soedarso')}</div>
          </div>
        </div>
      `;
      actionBox.innerHTML = '';
    }
  }

  function renderSubTabNavigation() {
    const validTabs = ['voting', 'hasil', 'profil', 'admin'];
    if (!validTabs.includes(state.activeSubTab)) {
      state.activeSubTab = 'voting';
    }

    validTabs.forEach(t => {
      const btn  = document.getElementById(`pemilihan-nav-${t}`);
      const pane = document.getElementById(`pemilihan-subpane-${t}`);
      if (btn) {
        if (t === state.activeSubTab) {
          btn.style.background = '#0d5f5b';
          btn.style.color      = '#ffffff';
          btn.style.fontWeight = '800';
          btn.style.border     = '2px solid #0d5f5b';
          btn.classList.add('active');
        } else {
          btn.style.background = '#f8fafc';
          btn.style.color      = '#334155';
          btn.style.fontWeight = '600';
          btn.style.border     = '1.5px solid #cbd5e1';
          btn.classList.remove('active');
        }
      }
      if (pane) {
        pane.style.display = (t === state.activeSubTab) ? 'block' : 'none';
      }
    });
  }

  function renderVotingCards() {
    const container = document.getElementById('pemilihanVotingGrid');
    const statusBox = document.getElementById('pemilihanVoterStatusBox');
    if (!container) return;

    if (statusBox) {
      statusBox.innerHTML = `
        <div style="background: #fef2f2; border: 2px solid #fca5a5; border-radius: 14px; padding: 1.5rem; text-align: center;">
          <i class="fa-solid fa-circle-pause" style="font-size: 2.2rem; color: #dc2626; margin-bottom: 0.6rem;"></i>
          <div style="font-size: 1.1rem; font-weight: 900; color: #991b1b;">Simulasi Pemungutan Suara Dibatalkan Sementara</div>
          <div style="font-size: 0.86rem; color: #7f1d1d; margin-top: 0.4rem; max-width: 680px; margin-left: auto; margin-right: auto;">
            Bilik suara simulasi dinonaktifkan untuk sementara waktu agar penataan sistem akses masuk akun pegawai dapat diselesaikan terlebih dahulu.
          </div>
        </div>
      `;
    }

    container.innerHTML = state.candidates.map(c => `
      <div style="background: var(--bg-surface); border: 2px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: var(--shadow-sm); display: flex; flex-direction: column; opacity: 0.75;">
        <div style="background: ${c.photoGradient}; padding: 1.5rem 1rem; text-align: center; color: #ffffff; position: relative;">
          <div style="position: absolute; top: 12px; left: 12px; background: rgba(255,255,255,0.25); border: 1px solid rgba(255,255,255,0.3); color: #fff; font-weight: 900; font-size: 0.74rem; padding: 3px 10px; border-radius: 20px;">
            NOMOR URUT 0${c.number}
          </div>
          <div style="width: 72px; height: 72px; margin: 0 auto; border-radius: 50%; background: rgba(255,255,255,0.2); border: 3px solid rgba(255,255,255,0.6); display: flex; align-items: center; justify-content: center; font-size: 1.8rem; font-weight: 900;">
            ${c.isAbstain ? '<i class="fa-solid fa-ban fa-sm"></i>' : escapeHtml(c.name.charAt(4) || 'C')}
          </div>
          <h3 style="font-size: 1rem; font-weight: 800; margin-top: 0.75rem; line-height: 1.3;">${escapeHtml(c.name)}</h3>
          <div style="font-size: 0.8rem; opacity: 0.9; margin-top: 2px;">${escapeHtml(c.unit)}</div>
        </div>

        <div style="padding: 1.25rem; flex: 1; display: flex; flex-direction: column; justify-content: space-between; gap: 1rem;">
          <div>
            <p style="font-size: 0.82rem; line-height: 1.5; color: #334155; margin: 0;">${escapeHtml(c.visi)}</p>
          </div>
          <button class="btn-primary" disabled style="width: 100%; justify-content: center; padding: 0.7rem; font-size: 0.82rem; font-weight: 800; border-radius: 10px; background: #94a3b8; cursor: not-allowed; border: none;">
            <i class="fa-solid fa-ban"></i> SIMULASI DIBATALKAN
          </button>
        </div>
      </div>
    `).join('');
  }

  function renderResults() {
    const mDpt    = document.getElementById('pemilihanMetricTotalDpt');
    const mTotal  = document.getElementById('pemilihanMetricTotalVotes');
    const barsBox = document.getElementById('pemilihanResultsBars');

    const totalDpt = (window.KOMKEP_PEGAWAI_717 && window.KOMKEP_PEGAWAI_717.length) || 717;
    if (mDpt)   mDpt.textContent   = `${totalDpt} Pemilih`;
    if (mTotal) mTotal.textContent = `0 Pemilih`;

    if (barsBox) {
      barsBox.innerHTML = `
        <div style="text-align: center; padding: 2rem 1rem; color: #64748b;">
          <i class="fa-solid fa-ban" style="font-size: 2rem; color: #dc2626; margin-bottom: 0.75rem;"></i>
          <div style="font-size: 1rem; font-weight: 800; color: #0f172a;">
            ${escapeHtml(PESAN_SIMULASI_DIBATALKAN)}
          </div>
        </div>
      `;
    }
  }

  function renderProfileView() {
    const container = document.getElementById('pemilihanProfilContainer');
    if (!container) return;

    container.innerHTML = state.candidates.map(c => `
      <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 1.5rem; margin-bottom: 1.25rem; box-shadow: var(--shadow-sm);">
        <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 0.75rem;">
          <div style="width: 48px; height: 48px; border-radius: 50%; background: #0d5f5b; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; font-weight: 800;">
            0${c.number}
          </div>
          <div>
            <h3 style="font-size: 1.05rem; font-weight: 800; margin: 0; color: var(--text-main);">${escapeHtml(c.name)}</h3>
            <div style="font-size: 0.8rem; color: var(--text-muted);">${escapeHtml(c.unit)}</div>
          </div>
        </div>
        <p style="font-size: 0.84rem; color: #334155; margin: 0;">${escapeHtml(c.visi)}</p>
      </div>
    `).join('');
  }

  function renderAdminPanel() {
    const container = document.getElementById('pemilihanAdminPanelContainer');
    const statusTextEl = document.getElementById('pemilihanAdminStatusText');
    const tbody = document.getElementById('pemilihanDptTableBody');

    if (container) {
      container.innerHTML = `
        <div style="background: #fef2f2; border: 1.5px solid #fca5a5; border-radius: 12px; padding: 1.25rem; margin-bottom: 1.5rem; color: #991b1b; font-weight: 700; font-size: 0.88rem;">
          <i class="fa-solid fa-ban"></i> ${escapeHtml(PESAN_SIMULASI_DIBATALKAN)}
        </div>
      `;
    }
    if (statusTextEl) {
      statusTextEl.innerHTML = `<span style="color: #dc2626; font-weight: 800;"><i class="fa-solid fa-ban"></i> Simulasi Pemilihan Dibatalkan Sementara</span>`;
    }
    if (tbody) {
      const list = (window.KOMKEP_PEGAWAI_717 || []).slice(0, 100);
      tbody.innerHTML = list.map((p, idx) => {
        const cleanNip = String(p.id || '').replace(/\s+/g, '');
        return `
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 0.65rem 0.75rem; color: #64748b;">${idx + 1}</td>
            <td style="padding: 0.65rem 0.75rem; font-weight: 700; color: #0f172a;">${escapeHtml(p.nama)}</td>
            <td style="padding: 0.65rem 0.75rem; color: #334155;">${escapeHtml(p.unit || '-')}</td>
            <td style="padding: 0.65rem 0.75rem; font-family: monospace; color: #475569;">${escapeHtml(cleanNip)}</td>
            <td style="padding: 0.65rem 0.75rem; text-align: center;">
              <span style="font-size: 0.75rem; font-weight: 700; padding: 3px 8px; border-radius: 6px; background: #f1f5f9; color: #64748b;">
                Simulasi Dibatalkan
              </span>
            </td>
          </tr>
        `;
      }).join('');
    }
  }

  function disabledNotice() {
    notify(PESAN_SIMULASI_DIBATALKAN, 'warning');
  }

  window.PemilihanKomkep = {
    init: renderAll,
    switchSubTab: function (tabId) {
      state.activeSubTab = tabId;
      renderAll();
    },
    enterBoothFlow: disabledNotice,
    openBuktiBilikSuaraModal: disabledNotice,
    printBuktiBilikSuara: disabledNotice,
    openVoteModal: disabledNotice,
    closeVoteModal: function () {},
    confirmVote: disabledNotice,
    openSlipBuktiModal: disabledNotice,
    closeSlipBuktiModal: function () {},
    printSlipBukti: disabledNotice,
    openBeritaAcaraModal: disabledNotice,
    closeBeritaAcaraModal: function () {},
    printBeritaAcara: disabledNotice,
    exportResultsCsv: disabledNotice,
    resetSimulationData: disabledNotice,
    sendEmailLaporan: disabledNotice,
    exportLogVotesCsv: disabledNotice,
    toggleElection: disabledNotice,
    resetAllVotes: disabledNotice,
    selectCandidateFromProfile: disabledNotice,
    renderDptTable: renderAdminPanel,
    renderAll
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.PemilihanKomkep.init());
  } else {
    window.PemilihanKomkep.init();
  }

})();
