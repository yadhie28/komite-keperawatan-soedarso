/**
 * ============================================================================
 * MODUL E-VOTING: SIMULASI PEMILIHAN TAHAP 2
 * PEMILIHAN KETUA KOMITE KEPERAWATAN (2027–2030) RSUD dr. SOEDARSO PONTIANAK
 * ============================================================================
 * Jadwal: Selasa, 24 November 2026 pukul 09.00 WIB s.d.
 *         Rabu, 25 November 2026 pukul 09.00 WIB
 * Catatan:
 * 1. Tidak menggunakan modal "Portal Sistem Kredensialing" di halaman ini.
 * 2. Seluruh penulisan NIP/NIPPPK/NIK tanpa spasi.
 * 3. Panel Panitia/Admin hanya untuk 24 Pengurus Komite sesuai SK Direktur.
 * ============================================================================
 */

(function () {
  'use strict';

  const SIMULATION_ELECTION_ID = 'e1ec7100-2026-1124-0000-000000000002';

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
      name: 'Ns. Rusmulyadi, S.Kep., MARS (SIMULASI)',
      nip: '198212282003121005',
      unit: 'Ruang Kakap',
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
      pengalaman: 'Opsi Hak Suara Sah Abstain Resmi (Simulasi Tahap 2)',
      isAbstain: true
    }
  ];

  const state = {
    election: {
      id: SIMULATION_ELECTION_ID,
      title: 'Pemilihan Ketua Komite Keperawatan (Simulasi Tahap 2)',
      period: '2027–2030',
      nomorBeritaAcara: '400.7.2/ 1428 /KOMKEP-RSDS/2026'
    },
    candidates: CANDIDATES_SIMULASI,
    activeSubTab: 'voting',
    pendingCandidateId: null,
    lastOpenState: null,
    countdownTimer: null
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

  const PANITIA_ADHOC_NIPS = [
    '198911022014021002', // M. Mushlihuddin, S.Kep., Ners (Ketua)
    '198212282003121005', // Ns. Rusmulyadi, S.Kep., MARS (Sekretaris)
    '199311132020121012', // Ns. Noveriansyah Akbar, S.Kep. (Verifikasi)
    '198606052022211002', // Herkulanus Yunus, A.Md.Kep (Verifikasi)
    '198806092023211004', // Stevanus Darmo, A.Md.Kep., SKM (Pemungutan & Penghitungan)
    '198205292006042012', // Diana Rachmawati, S.ST (Pemungutan & Penghitungan)
    '199704212022041001'  // Munazzil, A.Md.Kep. (Data Pemilih & Sistem Informasi)
  ];

  function getPanitiaAdHocMember(user) {
    if (!user) return null;
    const cleanId = String(user.nip || user.id_login || user.username || '').replace(/\s+/g, '');
    const list = (window.KOMITE_DATA && window.KOMITE_DATA.panitiaAdHocSK && Array.isArray(window.KOMITE_DATA.panitiaAdHocSK.anggota))
      ? window.KOMITE_DATA.panitiaAdHocSK.anggota
      : [];
    return list.find(p => String(p.nip || '').replace(/\s+/g, '') === cleanId) || null;
  }

  function isPengurusKomite(user) {
    if (!user) return false;
    const cleanId = String(user.nip || user.id_login || user.username || '').replace(/\s+/g, '');
    return Boolean(user.isPanitiaAdHoc === true || PANITIA_ADHOC_NIPS.includes(cleanId));
  }

  function getSchedule() {
    if (window.SupabaseKomkep && typeof window.SupabaseKomkep.checkElectionSchedule === 'function') {
      return window.SupabaseKomkep.checkElectionSchedule();
    }
    return {
      isOpen: true,
      isBefore: false,
      isAfter: false,
      countdownStr: '24:00:00',
      statusText: 'Simulasi Tahap 2 Aktif',
      disclaimer: 'SIMULASI PEMILIHAN TAHAP 2 — HASIL TIDAK MENGIKAT'
    };
  }

  function getUserReceipt(user) {
    if (!user || !window.SupabaseKomkep || typeof window.SupabaseKomkep.getVoterRecord !== 'function') {
      return null;
    }
    const id = user.id_login || user.nip || user.username;
    return window.SupabaseKomkep.getVoterRecord(id);
  }

  function startCountdownLoop() {
    if (state.countdownTimer) return;
    state.countdownTimer = setInterval(() => {
      const sched = getSchedule();
      const cdEl = document.getElementById('pemilihanCountdownLive');
      const statusBadgeEl = document.getElementById('pemilihanScheduleBadgeLive');
      const wajibCdEl = document.getElementById('wajibVoteCountdown');
      const wajibStickyCdEl = document.getElementById('wajibStickyCountdown');
      if (cdEl) cdEl.textContent = sched.countdownStr;
      if (statusBadgeEl) statusBadgeEl.textContent = sched.statusText;
      if (wajibCdEl) wajibCdEl.textContent = sched.countdownStr;
      if (wajibStickyCdEl) wajibStickyCdEl.textContent = sched.countdownStr;
      if (!sched.isOpen && typeof window.onMandatoryVoteCompleted === 'function') {
        window.onMandatoryVoteCompleted();
      }
      if (typeof window.updateBerandaElectionBanner === 'function') {
        window.updateBerandaElectionBanner();
      }
      // Otomatis buka/tutup bilik suara begitu melewati 09.00 WIB
      if (state.lastOpenState !== null && state.lastOpenState !== sched.isOpen) {
        renderAll();
      }
      state.lastOpenState = sched.isOpen;
    }, 1000);
  }

  async function renderAll() {
    const sched = getSchedule();
    state.lastOpenState = sched.isOpen;
    // Sinkronkan status suara pemilih dari server pusat bila aktif
    const user = getActivePortalUser();
    if (user && window.SupabaseKomkep && typeof window.SupabaseKomkep.getVoterRecordAsync === 'function') {
      await window.SupabaseKomkep.getVoterRecordAsync(user.id_login || user.nip || user.username);
    }
    renderDisclaimerBanner(sched);
    renderUserPill();
    renderSubTabNavigation();
    renderVotingCards(sched);
    await renderResults(sched);
    renderProfileView(sched);
    await renderAdminPanel(sched);
    startCountdownLoop();
  }

  function renderDisclaimerBanner(sched) {
    const pane = document.getElementById('pane-evoting');
    if (!pane) return;

    let banner = document.getElementById('pemilihanSimulasiDisclaimerBanner');
    if (!banner) {
      banner = document.createElement('div');
      banner.id = 'pemilihanSimulasiDisclaimerBanner';
      pane.insertBefore(banner, pane.children[1] || pane.firstChild);
    }

    const bg = sched.isOpen ? '#ecfdf5' : (sched.isBefore ? '#fffbeb' : '#f1f5f9');
    const border = sched.isOpen ? '#10b981' : (sched.isBefore ? '#f59e0b' : '#64748b');
    const iconBg = sched.isOpen ? '#059669' : (sched.isBefore ? '#d97706' : '#475569');
    const titleColor = sched.isOpen ? '#065f46' : (sched.isBefore ? '#92400e' : '#334155');
    const iconClass = sched.isOpen ? 'fa-check-to-slot' : (sched.isBefore ? 'fa-hourglass-half' : 'fa-flag-checkered');
    const cdLabel = sched.isBefore ? 'Dibuka dalam:' : (sched.isOpen ? 'Sisa waktu:' : 'Status:');

    banner.style.cssText = `background: ${bg}; border: 2px solid ${border}; border-radius: 12px; padding: 1rem 1.25rem; margin-bottom: 1.5rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap; box-shadow: var(--shadow-sm);`;
    banner.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.85rem; flex: 1; min-width: 260px;">
        <div style="width: 44px; height: 44px; border-radius: 10px; background: ${iconBg}; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; flex-shrink: 0;">
          <i class="fa-solid ${iconClass}"></i>
        </div>
        <div>
          <div style="font-size: 0.82rem; font-weight: 900; color: ${titleColor}; text-transform: uppercase; letter-spacing: 0.4px;">
            SIMULASI PEMILIHAN TAHAP 2 &bull; HASIL TIDAK MENGIKAT
          </div>
          <div id="pemilihanScheduleBadgeLive" style="font-size: 0.86rem; font-weight: 700; color: #0f172a; margin-top: 2px;">
            ${escapeHtml(sched.statusText)}
          </div>
          <div style="font-size: 0.78rem; color: #475569; margin-top: 2px;">
            Jadwal: <strong>Selasa, 24 Nov 2026 pukul 09.00 WIB</strong> s.d. <strong>Kamis, 26 Nov 2026 pukul 23.59 WIB</strong>
          </div>
        </div>
      </div>
      <div style="text-align: right; background: rgba(255,255,255,0.85); border: 1px solid ${border}; border-radius: 10px; padding: 0.5rem 0.9rem; min-width: 150px;">
        <div style="font-size: 0.7rem; font-weight: 700; color: #64748b; text-transform: uppercase;">${cdLabel}</div>
        <div id="pemilihanCountdownLive" style="font-size: 1.2rem; font-weight: 900; font-family: monospace; color: ${titleColor};">
          ${escapeHtml(sched.countdownStr)}
        </div>
      </div>
    `;
  }

  function renderUserPill() {
    const pill = document.getElementById('pemilihanUserPill');
    const actionBox = document.getElementById('pemilihanAuthActionBox');
    if (!pill || !actionBox) return;

    const user = getActivePortalUser();
    if (!user || user.role === 'guest') {
      pill.innerHTML = `
        <span style="font-size: 0.82rem; color: var(--text-muted); display: inline-flex; align-items: center; gap: 0.4rem;">
          <i class="fa-solid fa-lock"></i> Belum Masuk Akun
        </span>
      `;
      actionBox.innerHTML = `
        <button type="button" class="btn-secondary" onclick="logoutToPortal()" style="font-size: 0.78rem; padding: 5px 12px; border-radius: 6px;">
          <i class="fa-solid fa-right-to-bracket"></i> Masuk Akun Portal
        </button>
      `;
    } else {
      const cleanId = String(user.nip || user.id_login || user.username || '-').replace(/\s+/g, '');
      const receipt = getUserReceipt(user);
      const statusChip = receipt
        ? '<span style="font-size:0.7rem;font-weight:800;padding:2px 8px;border-radius:999px;background:#dcfce7;color:#166534;">Sudah Memilih</span>'
        : '<span style="font-size:0.7rem;font-weight:800;padding:2px 8px;border-radius:999px;background:#fef3c7;color:#92400e;">Belum Memilih</span>';
      pill.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem; background: var(--bg-surface); border: 1px solid var(--border-subtle); padding: 4px 10px; border-radius: 8px;">
          <div style="width: 24px; height: 24px; border-radius: 50%; background: #0d5f5b; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 0.72rem; font-weight: bold;">
            ${escapeHtml((user.name || 'P').charAt(0))}
          </div>
          <div style="line-height: 1.2;">
            <div style="font-size: 0.8rem; font-weight: 800; color: var(--text-main); display:flex; align-items:center; gap:6px;">
              ${escapeHtml(user.name)} ${statusChip}
            </div>
            <div style="font-size: 0.72rem; color: var(--text-muted); font-family: monospace;">ID: ${escapeHtml(cleanId)} &bull; ${escapeHtml(user.unit || 'RSUD dr. Soedarso')}</div>
          </div>
        </div>
      `;
      actionBox.innerHTML = receipt
        ? `<button type="button" class="btn-secondary" onclick="window.PemilihanKomkep.openSlipBuktiModal()" style="font-size: 0.78rem; padding: 5px 12px; border-radius: 6px;"><i class="fa-solid fa-receipt"></i> Lihat Bukti Suara</button>`
        : '';
    }
  }

  function renderSubTabNavigation() {
    const user = getActivePortalUser();
    const canAdmin = isPengurusKomite(user);
    const validTabs = canAdmin ? ['voting', 'hasil', 'profil', 'admin'] : ['voting', 'hasil', 'profil'];
    if (!validTabs.includes(state.activeSubTab)) {
      state.activeSubTab = 'voting';
    }

    const adminBtn = document.getElementById('pemilihan-nav-admin');
    if (adminBtn) {
      adminBtn.style.display = canAdmin ? 'flex' : 'none';
    }

    ['voting', 'hasil', 'profil', 'admin'].forEach(t => {
      const btn  = document.getElementById(`pemilihan-nav-${t}`);
      const pane = document.getElementById(`pemilihan-subpane-${t}`);
      if (btn && (t !== 'admin' || canAdmin)) {
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
        pane.style.display = (t === state.activeSubTab && (t !== 'admin' || canAdmin)) ? 'block' : 'none';
      }
    });
  }

  function renderVotingCards(sched) {
    const container = document.getElementById('pemilihanVotingGrid');
    const statusBox = document.getElementById('pemilihanVoterStatusBox');
    if (!container) return;

    const user = getActivePortalUser();
    const receipt = getUserReceipt(user);
    const canVoteNow = Boolean(sched.isOpen && user && user.role !== 'guest' && !receipt);

    if (statusBox) {
      if (receipt) {
        statusBox.innerHTML = `
          <div style="background: #ecfdf5; border: 2px solid #10b981; border-radius: 14px; padding: 1.4rem; text-align: center;">
            <i class="fa-solid fa-circle-check" style="font-size: 2.2rem; color: #059669; margin-bottom: 0.5rem;"></i>
            <div style="font-size: 1.08rem; font-weight: 900; color: #065f46;">Terima Kasih! Hak Suara Anda Telah Tercatat</div>
            <div style="font-size: 0.85rem; color: #047857; margin-top: 0.3rem;">
              Kode Bukti Suara Rahasia: <strong style="font-family: monospace; font-size: 0.95rem;">${escapeHtml(receipt.kode_bukti)}</strong> &bull; ${escapeHtml(receipt.waktu_wib)}
            </div>
            <div style="margin-top: 0.85rem;">
              <button type="button" class="btn-primary" onclick="window.PemilihanKomkep.openSlipBuktiModal()" style="background: #0d5f5b; border: none; padding: 0.55rem 1.2rem; font-size: 0.84rem;">
                <i class="fa-solid fa-receipt"></i> Tampilkan / Cetak Slip Bukti Suara
              </button>
            </div>
          </div>
        `;
      } else if (sched.isBefore) {
        statusBox.innerHTML = `
          <div style="background: #fffbeb; border: 2px solid #f59e0b; border-radius: 14px; padding: 1.4rem; text-align: center;">
            <i class="fa-solid fa-clock" style="font-size: 2rem; color: #d97706; margin-bottom: 0.5rem;"></i>
            <div style="font-size: 1.08rem; font-weight: 900; color: #92400e;">Bilik Suara Simulasi Tahap 2 Segera Dibuka</div>
            <div style="font-size: 0.85rem; color: #78350f; margin-top: 0.35rem;">
              Pemungutan suara dibuka otomatis pada <strong>Selasa, 24 November 2026 pukul 09.00 WIB</strong> hingga <strong>Kamis, 26 November 2026 pukul 23.59 WIB</strong>.
            </div>
          </div>
        `;
      } else if (sched.isAfter) {
        statusBox.innerHTML = `
          <div style="background: #f1f5f9; border: 2px solid #94a3b8; border-radius: 14px; padding: 1.4rem; text-align: center;">
            <i class="fa-solid fa-flag-checkered" style="font-size: 2rem; color: #475569; margin-bottom: 0.5rem;"></i>
            <div style="font-size: 1.08rem; font-weight: 900; color: #0f172a;">Pemungutan Suara Simulasi Tahap 2 Telah Ditutup</div>
            <div style="font-size: 0.85rem; color: #475569; margin-top: 0.35rem;">
              Silakan buka tab <strong>Rekapitulasi &amp; Hasil</strong> untuk melihat perolehan suara dan Berita Acara.
            </div>
          </div>
        `;
      } else {
        statusBox.innerHTML = `
          <div style="background: #f0fdfa; border: 2px solid #14b8a6; border-radius: 14px; padding: 1.2rem; display: flex; align-items: center; gap: 0.9rem; flex-wrap: wrap;">
            <i class="fa-solid fa-shield-halved" style="font-size: 1.8rem; color: #0d9488;"></i>
            <div style="flex: 1; min-width: 240px;">
              <div style="font-size: 0.98rem; font-weight: 900; color: #0f766e;">Bilik Suara Simulasi Tahap 2 AKTIF (LUBER &amp; JURDIL)</div>
              <div style="font-size: 0.83rem; color: #115e59; margin-top: 2px;">
                Pilih <strong>1 (satu)</strong> calon di bawah ini. Pilihan Anda bersifat rahasia dan tidak terhubung dengan identitas NIP Anda.
              </div>
            </div>
          </div>
        `;
      }
    }

    container.innerHTML = state.candidates.map(c => {
      let btnHtml = '';
      if (canVoteNow) {
        btnHtml = `
          <button type="button" class="btn-primary" onclick="window.PemilihanKomkep.openVoteModal('${c.id}')" style="width: 100%; justify-content: center; padding: 0.72rem; font-size: 0.85rem; font-weight: 800; border-radius: 10px; background: #0d5f5b; border: none; cursor: pointer;">
            <i class="fa-solid fa-check-to-slot"></i> PILIH NOMOR URUT 0${c.number}
          </button>
        `;
      } else {
        const label = receipt
          ? 'HAK SUARA SUDAH DIGUNAKAN'
          : (sched.isBefore ? 'DIBUKA PUKUL 09.00 WIB' : 'PEMILIHAN DITUTUP');
        btnHtml = `
          <button type="button" class="btn-primary" disabled style="width: 100%; justify-content: center; padding: 0.7rem; font-size: 0.8rem; font-weight: 800; border-radius: 10px; background: #94a3b8; cursor: not-allowed; border: none;">
            <i class="fa-solid fa-lock"></i> ${label}
          </button>
        `;
      }

      return `
        <div style="background: var(--bg-surface); border: 2px solid ${canVoteNow ? '#cbd5e1' : '#e2e8f0'}; border-radius: 16px; overflow: hidden; box-shadow: var(--shadow-sm); display: flex; flex-direction: column; opacity: ${canVoteNow ? '1' : '0.85'};">
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
            ${btnHtml}
          </div>
        </div>
      `;
    }).join('');
  }

  function openVoteModal(candidateId) {
    const sched = getSchedule();
    if (!sched.isOpen) {
      notify(sched.isBefore ? 'Bilik suara baru dibuka pukul 09.00 WIB.' : 'Pemungutan suara telah ditutup.', 'warning');
      return;
    }
    const user = getActivePortalUser();
    if (!user || user.role === 'guest') {
      notify('Silakan masuk akun terlebih dahulu.', 'warning');
      return;
    }
    if (getUserReceipt(user)) {
      notify('Anda sudah menggunakan hak suara pada Simulasi Tahap 2.', 'info');
      return;
    }
    const cand = state.candidates.find(c => c.id === candidateId);
    if (!cand) return;

    state.pendingCandidateId = candidateId;
    const numEl = document.getElementById('modalVoteCandNum');
    const nameEl = document.getElementById('modalVoteCandName');
    const unitEl = document.getElementById('modalVoteCandUnit');
    if (numEl) numEl.textContent = `NOMOR URUT 0${cand.number}`;
    if (nameEl) nameEl.textContent = cand.name;
    if (unitEl) unitEl.textContent = cand.unit;

    const modal = document.getElementById('modalKonfirmasiVoting');
    if (modal) {
      modal.classList.add('active');
      modal.style.display = 'flex';
    }
  }

  function closeVoteModal() {
    state.pendingCandidateId = null;
    const modal = document.getElementById('modalKonfirmasiVoting');
    if (modal) {
      modal.classList.remove('active');
      modal.style.display = 'none';
    }
  }

  async function confirmVote() {
    const user = getActivePortalUser();
    if (!user || !state.pendingCandidateId) return;

    const idLogin = user.id_login || user.nip || user.username;
    const res = await window.SupabaseKomkep.castVote(state.election.id, idLogin, state.pendingCandidateId);
    closeVoteModal();

    if (!res || !res.success) {
      notify(res?.message || 'Gagal menyimpan suara.', 'warning');
      await renderAll();
      return;
    }

    notify('Suara rahasia Anda berhasil direkam! Akses penuh Portal Komite Keperawatan kini terbuka.', 'success');
    if (typeof window.onMandatoryVoteCompleted === 'function') {
      window.onMandatoryVoteCompleted();
    }
    await renderAll();
    openSlipBuktiModal(res.receipt);
  }

  function openSlipBuktiModal(receiptParam = null) {
    const user = getActivePortalUser();
    const receipt = receiptParam || getUserReceipt(user);
    if (!receipt) {
      notify('Belum ada bukti suara untuk akun ini.', 'info');
      return;
    }
    const cleanId = String(user?.nip || user?.id_login || '-').replace(/\s+/g, '');
    const tEl = document.getElementById('slipTokenBukti');
    const nEl = document.getElementById('slipNamaPemilih');
    const idEl = document.getElementById('slipNipPemilih');
    const uEl = document.getElementById('slipUnitPemilih');
    const wEl = document.getElementById('slipWaktuPemilihan');
    if (tEl) tEl.textContent = receipt.kode_bukti || '-';
    if (nEl) nEl.textContent = user?.name || '-';
    if (idEl) idEl.textContent = cleanId;
    if (uEl) uEl.textContent = user?.unit || 'RSUD dr. Soedarso';
    if (wEl) wEl.textContent = receipt.waktu_wib || '-';

    const modal = document.getElementById('modalSlipBuktiSuara');
    if (modal) {
      modal.classList.add('active');
      modal.style.display = 'flex';
    }
  }

  function closeSlipBuktiModal() {
    const modal = document.getElementById('modalSlipBuktiSuara');
    if (modal) {
      modal.classList.remove('active');
      modal.style.display = 'none';
    }
  }

  async function renderResults(sched) {
    const mDpt = document.getElementById('pemilihanMetricTotalDpt');
    const mTotal = document.getElementById('pemilihanMetricTotalVotes');
    const barsBox = document.getElementById('pemilihanResultsBars');
    const btnBA = document.getElementById('btnCetakBeritaAcaraHasil');
    const btnEmail = document.getElementById('btnKirimEmailHasil');

    const rekap = window.SupabaseKomkep && typeof window.SupabaseKomkep.getElectionRekap === 'function'
      ? await window.SupabaseKomkep.getElectionRekap(state.election.id)
      : { metrics: { total_dpt: 717, total_voted: 0 }, rekap_kandidat: [], resultsAvailable: false };

    const totalDpt = rekap.metrics?.total_dpt || 717;
    const totalVoted = rekap.metrics?.total_voted || 0;
    const pct = totalDpt > 0 ? ((totalVoted / totalDpt) * 100).toFixed(1) : '0.0';

    if (mDpt) mDpt.textContent = `${totalDpt} Pemilih`;
    if (mTotal) mTotal.textContent = `${totalVoted} Pemilih (${pct}%)`;

    const user = getActivePortalUser();
    const isPanitia = isPengurusKomite(user);
    const canSeeBreakdown = Boolean(rekap.resultsAvailable || isPanitia);

    // Tombol 'Cetak Berita Acara Resmi (A4)' & 'Kirim ke Email Komite' HANYA ditampilkan untuk Panitia Ad Hoc
    const panitiaActionsWrap = document.getElementById('pemilihanPanitiaHasilActions');
    if (panitiaActionsWrap) {
      panitiaActionsWrap.style.display = isPanitia ? 'flex' : 'none';
    }
    if (btnBA) {
      btnBA.style.display = isPanitia ? 'flex' : 'none';
      btnBA.disabled = !isPanitia;
      btnBA.style.cursor = isPanitia ? 'pointer' : 'not-allowed';
      btnBA.style.opacity = isPanitia ? '1' : '0.65';
      btnBA.style.background = isPanitia ? '#0d5f5b' : '#94a3b8';
    }
    if (btnEmail) {
      btnEmail.style.display = isPanitia ? 'flex' : 'none';
      btnEmail.disabled = !isPanitia;
      btnEmail.style.cursor = isPanitia ? 'pointer' : 'not-allowed';
      btnEmail.style.opacity = isPanitia ? '1' : '0.65';
    }

    if (!barsBox) return;
    if (!canSeeBreakdown) {
      barsBox.innerHTML = `
        <div style="text-align: center; padding: 2rem 1rem; color: #475569;">
          <i class="fa-solid fa-lock" style="font-size: 2rem; color: #0d9488; margin-bottom: 0.75rem;"></i>
          <div style="font-size: 1rem; font-weight: 800; color: #0f172a;">Perolehan Suara Per Calon Masih Disegel</div>
          <div style="font-size: 0.85rem; margin-top: 0.35rem;">
            Hasil lengkap dibuka otomatis setelah Simulasi Tahap 2 ditutup pada <strong>Kamis, 26 November 2026 pukul 23.59 WIB</strong>.
          </div>
        </div>
      `;
      return;
    }

    const voteMap = {};
    (rekap.rekap_kandidat || []).forEach(r => { voteMap[r.candidate_id] = r.votes; });

    barsBox.innerHTML = state.candidates.map(c => {
      const v = voteMap[c.id] || 0;
      const p = totalVoted > 0 ? ((v / totalVoted) * 100).toFixed(1) : '0.0';
      return `
        <div style="margin-bottom: 1rem;">
          <div style="display: flex; justify-content: space-between; font-size: 0.86rem; font-weight: 700; margin-bottom: 0.3rem;">
            <span>0${c.number}. ${escapeHtml(c.name)}</span>
            <span>${v} suara (${p}%)</span>
          </div>
          <div style="height: 12px; background: #e2e8f0; border-radius: 999px; overflow: hidden;">
            <div style="width: ${p}%; height: 100%; background: ${c.badgeColor}; border-radius: 999px; transition: width 0.4s ease;"></div>
          </div>
        </div>
      `;
    }).join('');
  }

  function renderProfileView() {
    const container = document.getElementById('pemilihanProfilContainer');
    if (!container) return;

    const sk = window.KOMITE_DATA && window.KOMITE_DATA.panitiaAdHocSK;
    const panitiaRows = sk && Array.isArray(sk.anggota)
      ? sk.anggota.map(p => `
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 0.55rem 0.65rem; text-align: center; color: #64748b;">${p.no}</td>
            <td style="padding: 0.55rem 0.65rem; font-weight: 700; color: #0f172a;">${escapeHtml(p.kedudukan)}</td>
            <td style="padding: 0.55rem 0.65rem;">
              <div style="font-weight: 800; color: #0f172a;">${escapeHtml(p.name)}</div>
              <div style="font-size: 0.76rem; color: #475569; font-family: monospace;">NIP. ${escapeHtml(p.nip)} &bull; ${escapeHtml(p.unit)}</div>
            </td>
            <td style="padding: 0.55rem 0.65rem; font-size: 0.8rem; color: #334155;">${escapeHtml(p.unsur)}</td>
          </tr>
        `).join('')
      : '';

    const tugasItems = sk && Array.isArray(sk.tugasWewenang)
      ? sk.tugasWewenang.map(t => `<li style="margin-bottom: 0.35rem;">${escapeHtml(t)}</li>`).join('')
      : '';

    const panitiaCard = sk ? `
      <div style="background: var(--bg-surface); border: 1.5px solid #0d9488; border-radius: 14px; padding: 1.4rem; margin-top: 1.5rem; box-shadow: var(--shadow-sm);">
        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.9rem;">
          <div style="width: 40px; height: 40px; border-radius: 10px; background: #0d5f5b; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; flex-shrink: 0;">
            <i class="fa-solid fa-gavel"></i>
          </div>
          <div>
            <h3 style="font-size: 1.02rem; font-weight: 800; margin: 0; color: var(--text-main);">Susunan Panitia Ad Hoc Pemilihan Ketua Komite Keperawatan (2027–2030)</h3>
            <div style="font-size: 0.78rem; color: var(--text-muted);">
              SK Direktur RSUD dr. Soedarso Nomor ${escapeHtml(sk.nomorSK)} &bull; Nota Dinas ${escapeHtml(sk.notaDinas)} &bull; Perdir No. 01/II/05 Tahun 2026
            </div>
          </div>
        </div>
        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; font-size: 0.83rem;">
            <thead>
              <tr style="background: #f0fdfa; border-bottom: 2px solid #99f6e4; text-align: left;">
                <th style="padding: 0.6rem; text-align: center; width: 42px;">No</th>
                <th style="padding: 0.6rem;">Kedudukan dalam Panitia</th>
                <th style="padding: 0.6rem;">Nama, NIP &amp; Unit Kerja</th>
                <th style="padding: 0.6rem;">Unsur</th>
              </tr>
            </thead>
            <tbody>${panitiaRows}</tbody>
          </table>
        </div>
        <div style="margin-top: 1rem; padding-top: 0.85rem; border-top: 1px dashed #cbd5e1;">
          <div style="font-size: 0.82rem; font-weight: 800; color: #0f172a; margin-bottom: 0.4rem;">Tugas &amp; Wewenang Panitia Ad Hoc (Lampiran II SK):</div>
          <ol style="font-size: 0.8rem; color: #334155; padding-left: 1.25rem; margin: 0; line-height: 1.5;">
            ${tugasItems}
          </ol>
          <div style="font-size: 0.76rem; color: #64748b; margin-top: 0.6rem;">
            Ditetapkan oleh Direktur RSUD dr. Soedarso: <strong>${escapeHtml(sk.direktur.name)}</strong> (${escapeHtml(sk.direktur.pangkat)}, NIP. ${escapeHtml(sk.direktur.nip)}).
          </div>
        </div>
      </div>
    ` : '';

    container.innerHTML = state.candidates.map(c => `
      <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 1.5rem; margin-bottom: 1.25rem; box-shadow: var(--shadow-sm);">
        <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 0.75rem;">
          <div style="width: 48px; height: 48px; border-radius: 50%; background: #0d5f5b; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; font-weight: 800;">
            0${c.number}
          </div>
          <div>
            <h3 style="font-size: 1.05rem; font-weight: 800; margin: 0; color: var(--text-main);">${escapeHtml(c.name)}</h3>
            <div style="font-size: 0.8rem; color: var(--text-muted);">${escapeHtml(c.unit)} &bull; ${escapeHtml(c.pengalaman)}</div>
          </div>
        </div>
        <p style="font-size: 0.84rem; color: #334155; margin: 0 0 0.5rem 0;"><strong>Visi:</strong> ${escapeHtml(c.visi)}</p>
        <p style="font-size: 0.84rem; color: #475569; margin: 0;"><strong>Misi:</strong> ${escapeHtml(c.misi)}</p>
      </div>
    `).join('') + panitiaCard;
  }

  async function renderAdminPanel(sched) {
    const container = document.getElementById('pemilihanAdminPanelContainer');
    const statusTextEl = document.getElementById('pemilihanAdminStatusText');
    const tbody = document.getElementById('pemilihanDptTableBody');
    const btnToggle = document.getElementById('pemilihanBtnToggleElection');

    const rekap = window.SupabaseKomkep && typeof window.SupabaseKomkep.getElectionRekap === 'function'
      ? await window.SupabaseKomkep.getElectionRekap(state.election.id)
      : { voters_map: {}, metrics: { total_dpt: 717, total_voted: 0 } };
    const votersMap = rekap.voters_map || {};

    if (container) {
      const isCentral = Boolean(window.SupabaseKomkep && typeof window.SupabaseKomkep.isCentralBackendActive === 'function' && window.SupabaseKomkep.isCentralBackendActive());
      const syncBanner = isCentral
        ? `<div style="background:#ecfdf5;border:1.5px solid #10b981;border-radius:10px;padding:0.85rem 1rem;margin-bottom:0.85rem;color:#065f46;font-size:0.83rem;">
             <i class="fa-solid fa-cloud-check"></i> <strong>Server Pusat Lintas-Perangkat AKTIF:</strong> Seluruh suara dari semua HP &amp; komputer masuk ke 1 kotak suara Google Sheets pusat secara real-time.
           </div>`
        : `<div style="background:#fffbeb;border:1.5px solid #f59e0b;border-radius:10px;padding:0.85rem 1rem;margin-bottom:0.85rem;color:#92400e;font-size:0.83rem;">
             <i class="fa-solid fa-triangle-exclamation"></i> <strong>Mode Lokal (Perangkat Ini Saja):</strong> URL Server Pusat Google Apps Script (<code>GAS_EXEC_URL</code> di <code>config.js</code>) belum diisi, sehingga suara dari HP/device lain belum tergabung. Pasang <code>apps-script/SimulasiTahap2.gs</code> lalu isi <code>GAS_EXEC_URL</code> untuk mengaktifkan voting lintas-perangkat.
           </div>`;
      const member = getPanitiaAdHocMember(getActivePortalUser());
      const roleInfo = member ? `${member.kedudukan} (${member.unit})` : 'Panitia Ad Hoc SK Direktur';
      container.innerHTML = `
        ${syncBanner}
        <div style="background: #f0fdfa; border: 1.5px solid #14b8a6; border-radius: 12px; padding: 1.15rem; margin-bottom: 1.25rem; color: #115e59; font-weight: 700; font-size: 0.86rem;">
          <i class="fa-solid fa-user-shield"></i> Panel Panitia Ad Hoc Pemilihan Ketua Komite Keperawatan 2027–2030 &bull;
          Akses: <strong>${escapeHtml(roleInfo)}</strong> &bull;
          Partisipasi: <strong>${rekap.metrics?.total_voted || 0} / ${rekap.metrics?.total_dpt || 717}</strong> pemilih.
        </div>
      `;
    }
    if (statusTextEl) {
      statusTextEl.innerHTML = `<span style="color: ${sched.isOpen ? '#059669' : '#d97706'}; font-weight: 800;"><i class="fa-solid fa-circle-dot"></i> ${escapeHtml(sched.statusText)}</span>`;
    }
    if (btnToggle) {
      btnToggle.innerHTML = sched.isOpen
        ? '<i class="fa-solid fa-lock"></i> Tutup Bilik Suara Sekarang'
        : '<i class="fa-solid fa-lock-open"></i> Buka Bilik Suara Sekarang';
    }
    if (tbody) {
      const list = (window.KOMKEP_PEGAWAI_717 || []).slice(0, 150);
      tbody.innerHTML = list.map((p, idx) => {
        const cleanNip = String(p.id || '').replace(/\s+/g, '');
        const voted = Boolean(votersMap[cleanNip]);
        return `
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 0.65rem 0.75rem; color: #64748b;">${idx + 1}</td>
            <td style="padding: 0.65rem 0.75rem; font-weight: 700; color: #0f172a;">${escapeHtml(p.nama)}</td>
            <td style="padding: 0.65rem 0.75rem; color: #334155;">${escapeHtml(p.unit || '-')}</td>
            <td style="padding: 0.65rem 0.75rem; font-family: monospace; color: #475569;">${escapeHtml(cleanNip)}</td>
            <td style="padding: 0.65rem 0.75rem; text-align: center;">
              <span style="font-size: 0.75rem; font-weight: 700; padding: 3px 8px; border-radius: 6px; background: ${voted ? '#dcfce7' : '#f1f5f9'}; color: ${voted ? '#166534' : '#64748b'};">
                ${voted ? 'Sudah Memilih' : 'Belum Memilih'}
              </span>
            </td>
          </tr>
        `;
      }).join('');
    }
  }

  async function openBeritaAcaraModal() {
    if (!isPengurusKomite(getActivePortalUser())) {
      notify('Fungsi Cetak Berita Acara Resmi (A4) hanya tersedia untuk Panitia Ad Hoc Pemilihan Ketua Komite Keperawatan.', 'warning');
      return;
    }
    const rekap = await window.SupabaseKomkep.getElectionRekap(state.election.id);
    const voteMap = {};
    (rekap.rekap_kandidat || []).forEach(r => { voteMap[r.candidate_id] = r.votes; });
    const totalVoted = rekap.metrics?.total_voted || 0;

    const tbody = document.getElementById('baTabelHasilBody');
    const totalEl = document.getElementById('baTotalSuara');
    const winnerEl = document.getElementById('baKetuaTerpilih');
    let winner = state.candidates[0];
    let maxVotes = -1;

    if (tbody) {
      tbody.innerHTML = state.candidates.map(c => {
        const v = voteMap[c.id] || 0;
        if (!c.isAbstain && v > maxVotes) { maxVotes = v; winner = c; }
        const p = totalVoted > 0 ? ((v / totalVoted) * 100).toFixed(2) : '0.00';
        const ket = c.isAbstain ? 'Abstain Sah' : 'Sah';
        return `
          <tr>
            <td style="border:1px solid #334155;padding:8px;text-align:center;">0${c.number}</td>
            <td style="border:1px solid #334155;padding:8px;">${escapeHtml(c.name)}</td>
            <td style="border:1px solid #334155;padding:8px;font-family:monospace;">${escapeHtml(String(c.nip || '-').replace(/\s+/g, ''))}</td>
            <td style="border:1px solid #334155;padding:8px;">${escapeHtml(c.unit)}</td>
            <td style="border:1px solid #334155;padding:8px;text-align:center;font-weight:bold;">${v}</td>
            <td style="border:1px solid #334155;padding:8px;text-align:center;">${p}%</td>
            <td style="border:1px solid #334155;padding:8px;text-align:center;">${ket}</td>
          </tr>
        `;
      }).join('');
    }
    if (totalEl) totalEl.textContent = `${totalVoted} Suara`;
    if (winnerEl) winnerEl.textContent = totalVoted > 0 ? winner.name : '(Belum ada suara masuk)';

    const modal = document.getElementById('modalBeritaAcaraPemilihan');
    if (modal) {
      modal.classList.add('active');
      modal.style.display = 'flex';
    }
  }

  function closeBeritaAcaraModal() {
    const modal = document.getElementById('modalBeritaAcaraPemilihan');
    if (modal) {
      modal.classList.remove('active');
      modal.style.display = 'none';
    }
  }

  async function toggleElection() {
    if (!isPengurusKomite(getActivePortalUser())) {
      notify('Hanya 7 Anggota Panitia Ad Hoc sesuai SK Direktur yang dapat mengubah status bilik suara.', 'warning');
      return;
    }
    const sched = getSchedule();
    window.SupabaseKomkep.setManualScheduleOverride(sched.isOpen ? 'CLOSED' : 'OPEN');
    notify(sched.isOpen ? 'Bilik suara ditutup sementara oleh Panitia Ad Hoc.' : 'Bilik suara dibuka oleh Panitia Ad Hoc.', 'info');
    await renderAll();
  }

  async function resetSimulationData() {
    if (!isPengurusKomite(getActivePortalUser())) {
      notify('Hanya 7 Anggota Panitia Ad Hoc sesuai SK Direktur yang dapat mereset simulasi.', 'warning');
      return;
    }
    if (!confirm('Reset seluruh data suara Simulasi Tahap 2 pada browser ini?')) return;
    await window.SupabaseKomkep.resetSimulation();
    notify('Data Simulasi Pemilihan Tahap 2 berhasil direset.', 'success');
    await renderAll();
  }

  async function exportResultsCsv() {
    const rekap = await window.SupabaseKomkep.getElectionRekap(state.election.id);
    const voteMap = {};
    (rekap.rekap_kandidat || []).forEach(r => { voteMap[r.candidate_id] = r.votes; });
    const rows = [['No Urut', 'Nama Calon', 'Unit', 'Jumlah Suara']];
    state.candidates.forEach(c => rows.push([`0${c.number}`, c.name, c.unit, voteMap[c.id] || 0]));
    const csv = rows.map(r => r.map(x => `"${String(x).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'rekap_simulasi_tahap2_komkep_soedarso.csv';
    a.click();
  }

  window.PemilihanKomkep = {
    init: renderAll,
    switchSubTab: function (tabId) {
      if (tabId === 'admin' && !isPengurusKomite(getActivePortalUser())) {
        notify('Panel Panitia/Admin hanya dapat diakses oleh 7 Anggota Panitia Ad Hoc sesuai SK Direktur.', 'warning');
        return;
      }
      state.activeSubTab = tabId;
      renderAll();
    },
    enterBoothFlow: function () {
      state.activeSubTab = 'voting';
      renderAll();
    },
    openBuktiBilikSuaraModal: openSlipBuktiModal,
    printBuktiBilikSuara: function () { window.print(); },
    openVoteModal,
    closeVoteModal,
    confirmVote,
    openSlipBuktiModal,
    closeSlipBuktiModal,
    printSlipBukti: function () { window.print(); },
    openBeritaAcaraModal,
    closeBeritaAcaraModal,
    printBeritaAcara: function () { window.print(); },
    exportResultsCsv,
    resetSimulationData,
    sendEmailLaporan: function () {
      if (!isPengurusKomite(getActivePortalUser())) {
        notify('Fungsi Kirim ke Email Komite hanya tersedia untuk Panitia Ad Hoc Pemilihan Ketua Komite Keperawatan.', 'warning');
        return;
      }
      const subj = encodeURIComponent('Laporan Rekap Simulasi Pemilihan Tahap 2 Ketua Komite Keperawatan 2027-2030');
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=komitekeperawatanrsds2023@gmail.com&su=${subj}`, '_blank', 'noopener');
    },
    exportLogVotesCsv: exportResultsCsv,
    toggleElection,
    resetAllVotes: resetSimulationData,
    selectCandidateFromProfile: function (candId) {
      state.activeSubTab = 'voting';
      renderAll().then(() => openVoteModal(candId));
    },
    renderDptTable: function () { renderAdminPanel(getSchedule()); },
    renderAll
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.PemilihanKomkep.init());
  } else {
    window.PemilihanKomkep.init();
  }

})();
