/**
 * ============================================================================
 * MODUL E-VOTING: SIMULASI PEMILIHAN KETUA KOMITE KEPERAWATAN (2027–2030)
 * RSUD dr. SOEDARSO PONTIANAK
 * ============================================================================
 * Kepatuhan Keamanan & UU Perlindungan Data Pribadi (UU PDP No. 27/2022):
 * 1. Jadwal Dipaksa Sisi Server: 23 Nov 2026 10.00 WIB s.d. 24 Nov 2026 10.00 WIB
 * 2. Kerahasiaan Penuh: Pemisahan Mutlak Tabel Partisipasi vs Tabel Suara (Anonim)
 * 3. Satu Orang Satu Suara: Cegah Suara Ganda via Transaksi Atomik
 * 4. Bukti Masuk Bilik Suara & Bukti Telah Memilih (Tanpa Pilihan Calon)
 * 5. Rekapitulasi Partisipasi Per Unit Kerja & Rekapitulasi Hasil Suara
 * 6. Label Wajib: "PERCOBAAN / SIMULASI — hasil tidak mengikat"
 * ============================================================================
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'komkep_pemilihan_simulasi_2026_state_v5';
  const TARGET_EMAIL_KOMITE = 'komitekeperawatanrsds2023@gmail.com';
  const SIMULATION_ELECTION_ID = 'e1ec7100-2026-1123-0000-000000000001';

  const DEFAULT_STATE = {
    election: {
      id: SIMULATION_ELECTION_ID,
      title: 'Simulasi Pemilihan Ketua Komite Keperawatan',
      period: '2027–2030',
      nomorBeritaAcara: '400.7.2/ 1428 /KOMKEP-RSDS/2026',
      disclaimer: 'PERCOBAAN / SIMULASI — hasil tidak mengikat',
      startTime: '2026-11-23T10:00:00+07:00',
      endTime: '2026-11-24T10:00:00+07:00',
      resultsVisibility: 'realtime' // 'realtime' atau 'closed_until_ended'
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
        misi: 'Meningkatkan kompetensi perawat melalui diklat terstruktur; mengembangkan standar praktik berbasis evidence-based nursing; membangun sistem kredensial transparan dan akuntabel.',
        pengalaman: 'Kepala Ruang ICU (2018 - 2024) • Wakil Ketua Komite Keperawatan (2024 - 2027) • Asesor Kredensial Klinis',
        isAbstain: false
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
        misi: 'Membangun budaya kerja profesional dengan etika keperawatan; mengoptimalkan peran komite dalam pembinaan etik dan disiplin; meningkatkan perlindungan advokasi klinis.',
        pengalaman: 'Ketua Subkomite Mutu Keperawatan (2021 - 2024) • Case Manager Bedah • Instruktur Klinis Keperawatan Medikal Bedah',
        isAbstain: false
      },
      {
        id: 'cand-3',
        number: 3,
        name: 'Ns. Rusmulyadi, S.Kep.Ners., M.A.R.S',
        nip: '000000000000000000',
        unit: 'Enggang Gading',
        badgeColor: '#7c3aed',
        badgeBg: '#f5f3ff',
        photoGradient: 'linear-gradient(135deg, #6d28d9 0%, #4c1d95 100%)',
        visi: 'Optimalisasi sinergi tata kelola klinis keperawatan dan kebidanan secara modern, digital, kredibel, dan berkeadilan menuju standar akreditasi rumah sakit kelas A.',
        misi: 'Digitalisasi sistem kredensialing dan logbook perawat; penguatan audit mutu klinis berkala; perlindungan hukum dan pembinaan etik independen.',
        pengalaman: 'Sekretaris Komite Keperawatan (2024 - 2027) • Manajer Pelayanan Pasien (MPP) • Auditor Klinis KARS',
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
        pengalaman: 'Opsi Hak Suara Sah Abstain Resmi',
        isAbstain: true
      }
    ],
    activeSubTab: 'voting', // 'voting', 'hasil', 'profil', 'admin'
    pendingVoteCandidateId: null,
    countdownTimerId: null
  };

  let state = loadState();

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_STATE,
          ...parsed,
          election: { ...DEFAULT_STATE.election, ...(parsed.election || {}) },
          candidates: parsed.candidates && parsed.candidates.length ? parsed.candidates : DEFAULT_STATE.candidates
        };
      }
    } catch (e) {
      console.warn('Gagal memuat state e-voting dari localStorage:', e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Gagal menyimpan state e-voting:', e);
    }
  }

  function notify(msg, type = 'success') {
    if (typeof window.showToast === 'function') {
      window.showToast(msg, type);
    } else {
      alert(msg);
    }
  }

  function getActivePortalUser() {
    if (window.state && window.state.currentUser) {
      return window.state.currentUser;
    }
    try {
      const saved = localStorage.getItem('komite_auth_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return null;
  }

  function getUserKey(user) {
    if (!user) return '';
    const raw = user.id_login || user.nip || user.username || user.name || '';
    return String(raw).replace(/[\s\.\-]/g, '').toLowerCase();
  }

  function resolveUserStatus() {
    const user = getActivePortalUser();
    if (!user || user.role === 'guest') {
      return {
        type: 'GUEST',
        user: user || { name: 'Tamu Publik', role: 'guest' },
        hasVoted: false,
        votedRecord: null
      };
    }

    const key = user.id_login || user.nip || user.username;
    const cleanKey = String(key || '').trim().replace(/\s+/g, '');

    // Cek apakah akun ini tercatat di data pemilih yang sudah memilih
    const simVoters = JSON.parse(localStorage.getItem('komkep_sim_voters') || '{}');
    const votedItem = simVoters[cleanKey];

    const roleLower = String(user.role || '').toLowerCase();
    const isAdmin = roleLower === 'super_admin' || roleLower === 'admin_komite' || roleLower.includes('admin') || Boolean(user.isAdmin) || Boolean(user.isPengurus) || roleLower.includes('sekretaris') || roleLower.includes('ketua') || (Array.isArray(user.access) && user.access.includes('superadmin'));

    return {
      type: isAdmin ? 'ADMIN' : 'VOTER',
      user: user,
      hasVoted: Boolean(votedItem),
      token: votedItem?.receiptToken || null,
      votedRecord: votedItem || null
    };
  }

  // ==========================================================================
  // ALUR MASUK BILIK SUARA & PENCATATAN BUKTI MASUK
  // ==========================================================================
  async function enterBoothFlow() {
    const auth = resolveUserStatus();
    if (auth.type === 'GUEST') {
      notify('Silakan login dengan NIP/NIPPPK/NIK Anda untuk masuk ke bilik suara.', 'warning');
      if (typeof window.openLoginModal === 'function') {
        window.openLoginModal();
      }
      return;
    }

    if (window.SupabaseKomkep && typeof window.SupabaseKomkep.enterBooth === 'function') {
      const res = await window.SupabaseKomkep.enterBooth(state.election.id, auth.user.id_login || auth.user.nip);
      if (res.success && res.booth_entry) {
        openBuktiBilikSuaraModal(res.booth_entry);
        notify('Akses bilik suara simulasi terverifikasi. Bukti masuk diterbitkan.', 'success');
      } else {
        notify(res.message || 'Gagal memverifikasi akses bilik suara.', 'danger');
      }
    } else {
      notify('Bilik suara simulasi aktif.', 'info');
    }
  }

  function openBuktiBilikSuaraModal(entry) {
    const container = document.getElementById('bodyBuktiBilikSuara');
    if (!container) return;

    const auth = resolveUserStatus();
    const user = auth.user;
    const cleanId = user.id_login || user.nip || '-';
    const masked = (window.SupabaseKomkep && window.SupabaseKomkep.maskId) ? window.SupabaseKomkep.maskId(cleanId) : cleanId;
    const wibNow = (window.SupabaseKomkep && window.SupabaseKomkep.formatWibDate) ? window.SupabaseKomkep.formatWibDate(new Date()) : new Date().toLocaleString('id-ID');
    const token = entry?.access_token || `BILIK-SIM-2026-${cleanId.slice(-4)}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    container.innerHTML = `
      <div style="border: 2px dashed #0d9488; border-radius: 12px; padding: 1.5rem; background: #f0fdf4;">
        <!-- Banner Simulasi -->
        <div style="background: #fef3c7; border: 1.5px solid #fde68a; border-radius: 8px; padding: 6px 12px; text-align: center; margin-bottom: 1.25rem;">
          <span style="font-size: 0.76rem; font-weight: 800; color: #92400e; text-transform: uppercase; letter-spacing: 0.5px;">
            <i class="fa-solid fa-triangle-exclamation"></i> PERCOBAAN / SIMULASI — HASIL TIDAK MENGIKAT
          </span>
        </div>

        <div style="text-align: center; border-bottom: 2px solid #0d9488; padding-bottom: 1rem; margin-bottom: 1rem;">
          <div style="font-size: 0.8rem; font-weight: 800; color: #042f2e; text-transform: uppercase; letter-spacing: 0.5px;">KOMITE KEPERAWATAN RSUD dr. SOEDARSO</div>
          <div style="font-size: 1.15rem; font-weight: 900; color: #0d5f5b; margin-top: 2px;">BUKTI LOGIN BILIK SUARA ELEKTRONIK</div>
          <div style="font-size: 0.75rem; color: #64748b;">Simulasi Pemilihan Ketua Komite Keperawatan Masa Bakti 2027–2030</div>
        </div>

        <table style="width: 100%; font-size: 0.85rem; border-collapse: collapse; margin-bottom: 1.25rem;">
          <tr>
            <td style="padding: 6px 0; color: #475569; width: 38%;">Nama Pemilih</td>
            <td style="padding: 6px 0; font-weight: 800; color: #0f172a;">: ${user.name}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #475569;">ID Pemilih (Masked)</td>
            <td style="padding: 6px 0; font-weight: 700; color: #0f172a; font-family: monospace;">: ${masked}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #475569;">Unit Kerja Portal</td>
            <td style="padding: 6px 0; font-weight: 700; color: #0f172a;">: ${user.unit || 'RSUD dr. Soedarso'}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #475569;">Waktu Masuk Bilik</td>
            <td style="padding: 6px 0; font-weight: 700; color: #0f172a;">: ${entry?.entered_at_wib || wibNow}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #475569;">Kode Akses Unik</td>
            <td style="padding: 6px 0; font-weight: 900; color: #0d5f5b; font-family: monospace;">: ${token}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #475569;">Status Hak Suara</td>
            <td style="padding: 6px 0; font-weight: 800; color: ${auth.hasVoted ? '#059669' : '#0284c7'};">: ${auth.hasVoted ? 'Sudah Digunakan' : 'Siap Menyalurkan Suara'}</td>
          </tr>
        </table>

        <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; padding: 0.75rem; text-align: center; font-size: 0.75rem; color: #64748b;">
          <i class="fa-solid fa-shield-halved" style="color: #0d5f5b;"></i> Kerahasiaan pemilih terjamin penuh. Pilihan calon Anda tidak dapat dilacak oleh panitia maupun sistem.
        </div>
      </div>
    `;

    if (typeof window.openModal === 'function') {
      window.openModal('modalBuktiBilikSuara');
    }
  }

  function printBuktiBilikSuara() {
    const content = document.getElementById('bodyBuktiBilikSuara')?.innerHTML;
    if (!content) return;

    const printWin = window.open('', '_blank', 'width=750,height=600');
    printWin.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Bukti Akses Masuk Bilik Suara - RSUD dr. Soedarso</title>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; padding: 2rem; color: #0f172a; }
          @media print { body { padding: 0; } }
        </style>
      </head>
      <body>
        ${content}
        <div style="text-align: center; margin-top: 2rem; font-size: 0.75rem; color: #64748b;">
          Dicetak dari Portal Terpadu Komite Keperawatan RSUD dr. Soedarso Pontianak
        </div>
      </body>
      </html>
    `);
    printWin.document.close();
    printWin.focus();
    setTimeout(() => {
      printWin.print();
      printWin.close();
    }, 400);
  }

  // ==========================================================================
  // ALUR PENYALURAN SUARA & KONFIRMASI
  // ==========================================================================
  function openVoteModal(candidateId) {
    const auth = resolveUserStatus();
    if (auth.type === 'GUEST') {
      notify('Silakan login dengan NIP/NIPPPK/NIK Anda untuk memilih.', 'warning');
      if (typeof window.openLoginModal === 'function') {
        window.openLoginModal();
      }
      return;
    }

    if (auth.hasVoted) {
      notify('Anda telah menggunakan hak suara Anda sebelumnya.', 'info');
      return;
    }

    const schedule = window.SupabaseKomkep ? window.SupabaseKomkep.checkElectionSchedule() : { isOpen: true };
    if (!schedule.isOpen) {
      notify(`Pemungutan suara tidak aktif (${schedule.statusText}).`, 'danger');
      return;
    }

    state.pendingVoteCandidateId = candidateId;
    const cand = state.candidates.find(c => c.id === candidateId);
    if (!cand) return;

    const modal = document.getElementById('modalKonfirmasiVoting');
    if (!modal) {
      // Buat dialog konfirmasi bila elemen belum ada di index.html
      const conf = confirm(`KONFIRMASI PEMILIHAN SIMULASI:\n\nAnda akan memilih: ${cand.name}\n\nApakah Anda yakin dengan pilihan Anda?`);
      if (conf) {
        confirmVote();
      }
      return;
    }

    const candNameElem = document.getElementById('modalVoteCandName') || document.getElementById('konfirmasiNamaCalon');
    const candUnitElem = document.getElementById('modalVoteCandUnit') || document.getElementById('konfirmasiUnitCalon');
    const candNumElem = document.getElementById('modalVoteCandNum') || document.getElementById('konfirmasiNomorCalon');

    if (candNameElem) candNameElem.textContent = cand.name;
    if (candUnitElem) candUnitElem.textContent = cand.unit;
    if (candNumElem) candNumElem.textContent = `Nomor Urut 0${cand.number}`;

    modal.style.display = 'flex';
  }

  function closeVoteModal() {
    const modal = document.getElementById('modalKonfirmasiVoting');
    if (modal) modal.style.display = 'none';
    state.pendingVoteCandidateId = null;
  }

  async function confirmVote() {
    if (!state.pendingVoteCandidateId) return;

    const auth = resolveUserStatus();
    if (auth.type === 'GUEST') {
      closeVoteModal();
      notify('Sesi tidak valid. Silakan login kembali.', 'error');
      return;
    }

    if (auth.hasVoted) {
      closeVoteModal();
      notify('Hak suara Anda telah digunakan sebelumnya.', 'error');
      return;
    }

    const candId = state.pendingVoteCandidateId;
    const cand = state.candidates.find(c => c.id === candId);
    const idLogin = auth.user.id_login || auth.user.nip;

    // Panggil RPC Supabase / Cryptographic Engine Sisi Server
    if (window.SupabaseKomkep && typeof window.SupabaseKomkep.castVote === 'function') {
      const res = await window.SupabaseKomkep.castVote(state.election.id, idLogin, candId);
      closeVoteModal();

      if (!res.success) {
        notify(res.message || 'Penyaluran suara ditolak sistem.', 'danger');
        renderAll();
        return;
      }

      notify(`Suara Anda berhasil dicatat secara sah! Nomor Bukti Suara: ${res.receipt.receipt_token}`, 'success');
      state.activeSubTab = 'hasil';
      renderAll();

      // Buka Tanda Terima Bukti Pemilih (Tanpa Nama Calon!)
      setTimeout(() => {
        openSlipBuktiModal(res.receipt);
      }, 400);
    }
  }

  // ==========================================================================
  // BUKTI TELAH MEMILIH (KERAHASIAAN MUTLAK: TANPA PILIHAN KANDIDAT)
  // ==========================================================================
  function openSlipBuktiModal(receiptParam = null) {
    const auth = resolveUserStatus();
    const user = auth.user;
    const simVoters = JSON.parse(localStorage.getItem('komkep_sim_voters') || '{}');
    const cleanKey = String(user.id_login || user.nip || '').trim().replace(/\s+/g, '');
    const record = receiptParam || simVoters[cleanKey];

    const token = record?.receipt_token || record?.receiptToken || 'VOTE-SIM-2026-XXXX';
    const votedAt = record?.voted_at_wib || record?.votedAt || '23 November 2026 WIB';
    const masked = record?.masked_id || record?.maskedId || (window.SupabaseKomkep ? window.SupabaseKomkep.maskId(cleanKey) : cleanKey);
    const unit = record?.unit_kerja || record?.unit || user.unit || 'RSUD dr. Soedarso';

    // Update field-field modal slip bukti jika ada elemen spesifik di index.html
    const elToken = document.getElementById('slipTokenBukti');
    const elNama = document.getElementById('slipNamaPemilih');
    const elNip = document.getElementById('slipNipPemilih');
    const elUnit = document.getElementById('slipUnitPemilih');
    const elWaktu = document.getElementById('slipWaktuPemilihan');
    if (elToken) elToken.textContent = token;
    if (elNama) elNama.textContent = user.name;
    if (elNip) elNip.textContent = masked;
    if (elUnit) elUnit.textContent = unit;
    if (elWaktu) elWaktu.textContent = votedAt;

    const slipContainer = document.getElementById('bodySlipBukti');
    if (slipContainer) {
      slipContainer.innerHTML = `
        <div style="border: 2px solid #059669; border-radius: 12px; padding: 1.5rem; background: #f0fdf4;">
          <div style="background: #fef3c7; border: 1.5px solid #fde68a; border-radius: 6px; padding: 5px 10px; text-align: center; margin-bottom: 1rem;">
            <span style="font-size: 0.72rem; font-weight: 800; color: #92400e; text-transform: uppercase;">
              PERCOBAAN / SIMULASI — HASIL TIDAK MENGIKAT
            </span>
          </div>

          <div style="text-align: center; border-bottom: 2px dashed #059669; padding-bottom: 0.85rem; margin-bottom: 1rem;">
            <div style="font-size: 0.75rem; font-weight: 800; color: #064e3b; text-transform: uppercase;">KOMITE KEPERAWATAN RSUD dr. SOEDARSO</div>
            <div style="font-size: 1.15rem; font-weight: 900; color: #047857; margin-top: 2px;">BUKTI TELAH MEMILIH (E-VOTING)</div>
            <div style="font-size: 0.72rem; color: #64748b;">Simulasi Pemilihan Ketua Komite Keperawatan 2027–2030</div>
          </div>

          <table style="width: 100%; font-size: 0.85rem; border-collapse: collapse; margin-bottom: 1.25rem;">
            <tr>
              <td style="padding: 5px 0; color: #475569; width: 40%;">Nama Pemilih</td>
              <td style="padding: 5px 0; font-weight: 800; color: #0f172a;">: ${user.name}</td>
            </tr>
            <tr>
              <td style="padding: 5px 0; color: #475569;">ID Pemilih (Masked)</td>
              <td style="padding: 5px 0; font-weight: 700; color: #0f172a; font-family: monospace;">: ${masked}</td>
            </tr>
            <tr>
              <td style="padding: 5px 0; color: #475569;">Unit Kerja</td>
              <td style="padding: 5px 0; font-weight: 700; color: #0f172a;">: ${unit}</td>
            </tr>
            <tr>
              <td style="padding: 5px 0; color: #475569;">Waktu Pemungutan</td>
              <td style="padding: 5px 0; font-weight: 700; color: #0f172a;">: ${votedAt}</td>
            </tr>
            <tr>
              <td style="padding: 5px 0; color: #475569;">Kode Kuitansi Sah</td>
              <td style="padding: 5px 0; font-weight: 900; color: #047857; font-family: monospace; font-size: 0.92rem;">: ${token}</td>
            </tr>
            <tr>
              <td style="padding: 5px 0; color: #475569;">Status Hak Suara</td>
              <td style="padding: 5px 0; font-weight: 800; color: #059669;">: <i class="fa-solid fa-circle-check"></i> Sudah Memilih (Sah)</td>
            </tr>
          </table>

          <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; padding: 0.75rem; text-align: center; font-size: 0.74rem; color: #64748b;">
            <i class="fa-solid fa-user-shield" style="color: #059669;"></i> <strong>Prinsip Kerahasiaan (Luber Jurdil):</strong> Tanda terima ini sah tanpa memuat pilihan kandidat untuk menjaga hak kerahasiaan suara pemilih.
          </div>
        </div>
      `;
    }

    const modal = document.getElementById('modalSlipBuktiSuara') || document.getElementById('modalSlipBuktiVoting');
    if (modal) modal.style.display = 'flex';
  }

  function closeSlipBuktiModal() {
    const modal = document.getElementById('modalSlipBuktiSuara') || document.getElementById('modalSlipBuktiVoting');
    if (modal) modal.style.display = 'none';
  }

  function printSlipBukti() {
    const content = document.getElementById('bodySlipBukti')?.innerHTML;
    if (!content) return;

    const printWin = window.open('', '_blank', 'width=700,height=600');
    printWin.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Tanda Terima Hak Suara E-Voting - RSUD dr. Soedarso</title>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; padding: 2rem; color: #0f172a; }
          @media print { body { padding: 0; } }
        </style>
      </head>
      <body>
        ${content}
      </body>
      </html>
    `);
    printWin.document.close();
    printWin.focus();
    setTimeout(() => {
      printWin.print();
      printWin.close();
    }, 400);
  }

  // ==========================================================================
  // BERITA ACARA RESMI (KOP SURAT KOMITE & TANDA TANGAN)
  // ==========================================================================
  async function openBeritaAcaraModal() {
    const rekapData = await (window.SupabaseKomkep ? window.SupabaseKomkep.getElectionRekap(state.election.id) : { metrics: { total_voted: 0 } });
    const metrics = rekapData.metrics || {};
    const candidates = rekapData.rekap_kandidat || [];

    const container = document.getElementById('bodyBeritaAcara');
    const wibDate = window.SupabaseKomkep ? window.SupabaseKomkep.formatWibDate(new Date()) : new Date().toLocaleDateString('id-ID');

    // Update elemen bawaan index.html jika ada
    const baTanggal = document.getElementById('baTanggalLengkap');
    const baTabelBody = document.getElementById('baTabelHasilBody');
    const baTotal = document.getElementById('baTotalSuara');
    const baKetua = document.getElementById('baKetuaTerpilih');

    if (baTanggal) baTanggal.textContent = `Selasa, 24 November 2026`;
    if (baTotal) baTotal.textContent = String(metrics.total_voted || 0);

    if (baTabelBody) {
      baTabelBody.innerHTML = candidates.map(c => `
        <tr>
          <td style="border: 1px solid #334155; padding: 8px; text-align: center;">0${c.candidate_number}</td>
          <td style="border: 1px solid #334155; padding: 8px; text-align: left; font-weight: 700;">${c.name}</td>
          <td style="border: 1px solid #334155; padding: 8px; text-align: left; font-family: monospace;">-</td>
          <td style="border: 1px solid #334155; padding: 8px; text-align: left;">${c.unit || '-'}</td>
          <td style="border: 1px solid #334155; padding: 8px; text-align: center; font-weight: 800;">${c.vote_count}</td>
          <td style="border: 1px solid #334155; padding: 8px; text-align: center;">${c.percent}%</td>
          <td style="border: 1px solid #334155; padding: 8px; text-align: center;">-</td>
        </tr>
      `).join('');
    }

    if (baKetua) {
      const winner = candidates.reduce((max, c) => (c.vote_count > (max?.vote_count || 0) ? c : max), null);
      baKetua.textContent = (winner && winner.vote_count > 0) ? `${winner.name} (Perolehan: ${winner.vote_count} Suara)` : 'Belum Ada Suara Masuk / Belum Ditetapkan';
    }

    if (container) {
      container.innerHTML = `
      <div style="font-family: 'Times New Roman', serif; color: #000; line-height: 1.5; padding: 1.5rem; background: #fff;">
        <div style="text-align: center; border-bottom: 3px double #000; padding-bottom: 0.75rem; margin-bottom: 1.25rem;">
          <div style="font-size: 1.1rem; font-weight: bold;">PEMERINTAH PROVINSI KALIMANTAN BARAT</div>
          <div style="font-size: 1.2rem; font-weight: bold;">RSUD DOKTER SOEDARSO</div>
          <div style="font-size: 1rem; font-weight: bold; color: #0d5f5b;">KOMITE KEPERAWATAN</div>
          <div style="font-size: 0.8rem; font-style: italic;">Jalan Dokter Soedarso Nomor 1 Pontianak, Kalimantan Barat 78124</div>
        </div>

        <div style="background: #fef3c7; border: 1px solid #fde68a; padding: 4px 10px; text-align: center; margin-bottom: 1rem;">
          <strong style="font-size: 0.75rem; color: #92400e;">PERCOBAAN / SIMULASI — HASIL TIDAK MENGIKAT</strong>
        </div>

        <div style="text-align: center; margin-bottom: 1.25rem;">
          <div style="font-size: 1.1rem; font-weight: bold; text-decoration: underline;">BERITA ACARA SIMULASI PEMILIHAN KETUA KOMITE KEPERAWATAN</div>
          <div style="font-size: 0.85rem;">Nomor: ${state.election.nomorBeritaAcara}</div>
        </div>

        <p style="font-size: 0.9rem; text-align: justify; text-indent: 2rem;">
          Pada hari ini, bertempat di Ruang Sekretariat Komite Keperawatan RSUD dr. Soedarso Pontianak, telah dilaksanakan Simulasi Pemilihan Ketua Komite Keperawatan Periode 2027–2030 secara elektronik (e-voting) yang dibuka pada <strong>Senin, 23 November 2026 pukul 10.00 WIB</strong> dan ditutup pada <strong>Selasa, 24 November 2026 pukul 10.00 WIB</strong>.
        </p>

        <div style="font-size: 0.9rem; margin-bottom: 0.75rem;">
          <strong>A. REKAPITULASI PARTISIPASI PEMILIH (DPT):</strong>
          <ul>
            <li>Total Pemilih Terdaftar (DPT) : <strong>${metrics.total_dpt || 717} Orang</strong></li>
            <li>Jumlah Suara Tersalurkan : <strong>${metrics.total_voted || 0} Suara</strong></li>
            <li>Tingkat Partisipasi : <strong>${metrics.turnout_percent || 0}%</strong></li>
          </ul>
        </div>

        <div style="font-size: 0.9rem; margin-bottom: 1.5rem;">
          <strong>B. PEROLEHAN SUARA KANDIDAT (SIMULASI):</strong>
          <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem; margin-top: 0.5rem;" border="1">
            <thead>
              <tr style="background: #f1f5f9;">
                <th style="padding: 6px;">No</th>
                <th style="padding: 6px; text-align: left;">Nama Calon Ketua</th>
                <th style="padding: 6px;">Perolehan Suara</th>
                <th style="padding: 6px;">Persentase</th>
              </tr>
            </thead>
            <tbody>
              ${candidates.map(c => `
                <tr>
                  <td style="padding: 6px; text-align: center;">0${c.candidate_number}</td>
                  <td style="padding: 6px;">${c.name}</td>
                  <td style="padding: 6px; text-align: center; font-weight: bold;">${c.vote_count}</td>
                  <td style="padding: 6px; text-align: center;">${c.percent}%</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-top: 2rem;">
          <div style="text-align: center; width: 45%;">
            <div>Saksi Pemilihan,</div>
            <div style="height: 55px;"></div>
            <div style="font-weight: bold; text-decoration: underline;">Ns. Yohanes Rindo Ari Wijoyo, S.Kep</div>
            <div>Ketua Subkomite Kredensial</div>
          </div>
          <div style="text-align: center; width: 45%;">
            <div>Pontianak, ${wibDate}</div>
            <div>Ketua Panitia Pemilihan,</div>
            <div style="height: 55px;"></div>
            <div style="font-weight: bold; text-decoration: underline;">Ns. Rusmulyadi, S.Kep., MARS</div>
            <div>Sekretaris Komite Keperawatan</div>
          </div>
        </div>

        <div style="margin-top: 25px; text-align: center; font-size: 0.88rem;">
          <div>Mengetahui / Mengesahkan,</div>
          <div><strong>Direktur RSUD Dokter Soedarso</strong></div>
          <div style="height: 55px;"></div>
          <div style="font-weight: bold; text-decoration: underline;">drg. Hary Agung Tjahyadi, M.Kes</div>
          <div>Pembina Utama Madya / NIP. 000000000000000000</div>
        </div>
      </div>
    `;

    const modal = document.getElementById('modalBeritaAcaraPemilihan') || document.getElementById('modalBeritaAcaraVoting');
    if (modal) modal.style.display = 'flex';
  }

  function closeBeritaAcaraModal() {
    const modal = document.getElementById('modalBeritaAcaraPemilihan') || document.getElementById('modalBeritaAcaraVoting');
    if (modal) modal.style.display = 'none';
  }

  function printBeritaAcara() {
    const content = document.getElementById('bodyBeritaAcara')?.innerHTML;
    if (!content) return;

    const printWin = window.open('', '_blank', 'width=800,height=800');
    printWin.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Berita Acara Simulasi Pemilihan - RSUD dr. Soedarso</title>
        <style>
          body { font-family: 'Times New Roman', serif; padding: 2rem; color: #000; }
          @media print { body { padding: 0; } }
        </style>
      </head>
      <body>
        ${content}
      </body>
      </html>
    `);
    printWin.document.close();
    printWin.focus();
    setTimeout(() => {
      printWin.print();
      printWin.close();
    }, 400);
  }

  // ==========================================================================
  // EKSPOR REKAPITULASI CSV (TANPA DATA PEMILIH-PILIHAN)
  // ==========================================================================
  async function exportResultsCsv() {
    const rekapData = await (window.SupabaseKomkep ? window.SupabaseKomkep.getElectionRekap(state.election.id) : { metrics: {}, rekap_unit: [], rekap_kandidat: [] });
    const unitList = rekapData.rekap_unit || [];
    const candList = rekapData.rekap_kandidat || [];

    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'REKAPITULASI SIMULASI PEMILIHAN KETUA KOMITE KEPERAWATAN RSUD DR. SOEDARSO\n';
    csvContent += 'PERIODE: 2027-2030 (JADWAL: 23-24 NOVEMBER 2026)\n';
    csvContent += 'CATATAN: PERCOBAAN / SIMULASI - HASIL TIDAK MENGIKAT\n\n';

    csvContent += 'BAGIAN 1: PEROLEHAN SUARA KANDIDAT (ANONIM)\n';
    csvContent += 'Nomor Urut,Nama Calon,Perolehan Suara,Persentase\n';
    candList.forEach(c => {
      csvContent += `"0${c.candidate_number}","${c.name.replace(/"/g, '""')}",${c.vote_count},"${c.percent}%"\n`;
    });

    csvContent += '\nBAGIAN 2: PARTISIPASI PEMILIH PER UNIT KERJA (TANPA PILIHAN CALON)\n';
    csvContent += 'Unit Kerja,Total DPT,Sudah Memilih,Belum Memilih,Persentase Partisipasi\n';
    unitList.forEach(u => {
      csvContent += `"${u.unit_kerja.replace(/"/g, '""')}",${u.total_dpt},${u.sudah_memilih},${u.belum_memilih},"${u.persen}%"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Rekapitulasi_Simulasi_E-Voting_Komite_Keperawatan_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    notify('Berkas Rekapitulasi CSV berhasil diunduh.', 'success');
  }

  // ==========================================================================
  // RESET DATA SIMULASI (KHUSUS ADMIN PENGUJIAN)
  // ==========================================================================
  async function resetSimulationData() {
    const auth = resolveUserStatus();
    const conf = confirm('PERINGATAN ADMIN:\n\nApakah Anda yakin ingin mereset seluruh data simulasi pemungutan suara?\n\nTindakan ini akan mengosongkan kotak suara dan mereset status memilih seluruh 717 pegawai.');
    if (!conf) return;

    if (window.SupabaseKomkep && typeof window.SupabaseKomkep.resetSimulation === 'function') {
      const res = await window.SupabaseKomkep.resetSimulation(state.election.id);
      if (res.success) {
        notify('Data simulasi pemilihan berhasil direset bersih.', 'success');
        renderAll();
      } else {
        notify(res.message || 'Gagal mereset data simulasi.', 'danger');
      }
    }
  }

  // ==========================================================================
  // RENDERING TAMPILAN MODUL PEMILIHAN
  // ==========================================================================
  function renderAll() {
    renderDisclaimerBanner();
    renderUserPill();
    renderSubTabNavigation();
    renderVotingCards();
    renderResults();
    renderProfileView();
    renderAdminPanel();
    updateCountdownLive();
  }

  // Banner Simulasi Permanen di Bagian Atas
  function renderDisclaimerBanner() {
    const pane = document.getElementById('pane-evoting') || document.getElementById('pane-pemilihan');
    if (!pane) return;

    let banner = document.getElementById('pemilihanSimulasiDisclaimerBanner');
    if (!banner) {
      banner = document.createElement('div');
      banner.id = 'pemilihanSimulasiDisclaimerBanner';
      banner.style.cssText = 'background: #fffbeb; border: 2px solid #f59e0b; border-radius: 12px; padding: 0.9rem 1.25rem; margin-bottom: 1.5rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap; box-shadow: var(--shadow-sm);';
      pane.insertBefore(banner, pane.children[1] || pane.firstChild);
    }

    const schedule = window.SupabaseKomkep ? window.SupabaseKomkep.checkElectionSchedule() : { countdownStr: '-' };

    banner.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <div style="width: 42px; height: 42px; border-radius: 10px; background: #f59e0b; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 1.25rem;">
          <i class="fa-solid fa-flask-vial"></i>
        </div>
        <div>
          <div style="font-size: 0.76rem; font-weight: 800; color: #b45309; text-transform: uppercase; letter-spacing: 0.5px;">
            PERCOBAAN / SIMULASI E-VOTING — HASIL TIDAK MENGIKAT
          </div>
          <div style="font-size: 0.88rem; font-weight: 800; color: #78350f;">
            Jadwal: Senin, 23 Nov 2026 10.00 WIB s.d. Selasa, 24 Nov 2026 10.00 WIB
          </div>
        </div>
      </div>
      <div style="display: flex; align-items: center; gap: 0.6rem;">
        <div style="text-align: right;">
          <div style="font-size: 0.72rem; color: #92400e; font-weight: 700;">Status Pemungutan:</div>
          <div id="liveScheduleBadge" style="font-size: 0.85rem; font-weight: 900; color: #b45309;">${schedule.countdownStr}</div>
        </div>
        <button type="button" class="btn-primary" onclick="window.PemilihanKomkep.enterBoothFlow()" style="font-size: 0.8rem; padding: 6px 14px; background: #b45309; border: none; font-weight: 800; border-radius: 8px;">
          <i class="fa-solid fa-door-open"></i> Bilik Suara
        </button>
      </div>
    `;
  }

  function updateCountdownLive() {
    if (state.countdownTimerId) clearInterval(state.countdownTimerId);
    state.countdownTimerId = setInterval(() => {
      const schedule = window.SupabaseKomkep ? window.SupabaseKomkep.checkElectionSchedule() : null;
      if (!schedule) return;

      const liveBadge = document.getElementById('liveScheduleBadge');
      if (liveBadge) {
        liveBadge.textContent = schedule.isOpen ? `Sisa: ${schedule.countdownStr}` : schedule.statusText;
      }
      const simCountdown = document.getElementById('simulasiCountdownText');
      if (simCountdown && schedule.isOpen) {
        simCountdown.textContent = schedule.countdownStr;
      }
    }, 1000);
  }

  function renderUserPill() {
    const pill = document.getElementById('pemilihanUserPill');
    const actionBox = document.getElementById('pemilihanAuthActionBox');
    if (!pill || !actionBox) return;

    const auth = resolveUserStatus();
    const cleanId = auth.user ? (auth.user.id_login || auth.user.nip || '-') : '-';
    const masked = (window.SupabaseKomkep && window.SupabaseKomkep.maskId) ? window.SupabaseKomkep.maskId(cleanId) : cleanId;

    if (auth.type === 'GUEST') {
      pill.innerHTML = `
        <span style="font-size: 0.78rem; color: var(--text-muted); display: inline-flex; align-items: center; gap: 0.4rem;">
          <i class="fa-solid fa-user-clock"></i> Belum masuk (Mode Tamu)
        </span>
      `;
      actionBox.innerHTML = `
        <button type="button" class="btn-primary" onclick="openLoginModal()" style="font-size: 0.8rem; padding: 6px 14px; background: #0d5f5b; border: none; font-weight: 700; border-radius: 8px;">
          <i class="fa-solid fa-right-to-bracket"></i> Masuk NIP / NIPPPK / NIK
        </button>
      `;
    } else {
      pill.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem; background: var(--bg-surface); border: 1px solid var(--border-subtle); padding: 4px 10px; border-radius: 8px;">
          <div style="width: 24px; height: 24px; border-radius: 50%; background: #0d5f5b; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 0.72rem; font-weight: bold;">
            ${(auth.user.name || 'P').charAt(0)}
          </div>
          <div style="line-height: 1.2;">
            <div style="font-size: 0.8rem; font-weight: 800; color: var(--text-main);">${auth.user.name}</div>
            <div style="font-size: 0.7rem; color: var(--text-muted); font-family: monospace;">ID: ${masked} • ${auth.user.unit || 'Keperawatan'}</div>
          </div>
        </div>
      `;

      actionBox.innerHTML = `
        <button type="button" class="btn-secondary" onclick="window.PemilihanKomkep.openBuktiBilikSuaraModal()" style="font-size: 0.75rem; padding: 5px 10px; background: #f0fdf4; color: #047857; border: 1px solid #bbf7d0; border-radius: 6px; font-weight: 700;">
          <i class="fa-solid fa-id-badge"></i> Bukti Akses Bilik
        </button>
        ${auth.hasVoted ? `
          <button type="button" class="btn-secondary" onclick="window.PemilihanKomkep.openSlipBuktiModal()" style="font-size: 0.75rem; padding: 5px 10px; background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; border-radius: 6px; font-weight: 700;">
            <i class="fa-solid fa-ticket"></i> Lihat Bukti Suara
          </button>
        ` : ''}
        <button type="button" class="btn-secondary" onclick="logoutToPortal()" style="font-size: 0.75rem; padding: 5px 10px; border-radius: 6px;">
          <i class="fa-solid fa-right-from-bracket"></i> Keluar
        </button>
      `;
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
    const schedule = window.SupabaseKomkep ? window.SupabaseKomkep.checkElectionSchedule() : { isOpen: true };
    const canVote = schedule.isOpen && auth.type !== 'GUEST' && !auth.hasVoted;

    const statusBox = document.getElementById('pemilihanVoterStatusBox');
    if (statusBox) {
      if (!schedule.isOpen) {
        statusBox.innerHTML = `
          <div style="background: #fef2f2; border: 1.5px solid #fecaca; border-radius: 12px; padding: 1rem; display: flex; align-items: center; gap: 0.75rem;">
            <i class="fa-solid fa-clock" style="color: #dc2626; font-size: 1.3rem;"></i>
            <div>
              <div style="font-weight: 800; color: #991b1b; font-size: 0.9rem;">Bilik Suara Simulasi Sedang Tidak Aktif (${schedule.statusText})</div>
              <div style="font-size: 0.8rem; color: #b91c1c;">Pemungutan suara hanya dapat dilakukan antara <strong>23 November 2026 pukul 10.00 WIB</strong> s.d. <strong>24 November 2026 pukul 10.00 WIB</strong>.</div>
            </div>
          </div>
        `;
      } else if (auth.type === 'GUEST') {
        statusBox.innerHTML = `
          <div style="background: #fffbeb; border: 1.5px solid #fde68a; border-radius: 12px; padding: 1rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <i class="fa-solid fa-lock" style="color: #d97706; font-size: 1.3rem;"></i>
              <div>
                <div style="font-weight: 800; color: #92400e; font-size: 0.9rem;">Autentikasi NIP/NIPPPK/NIK Diperlukan</div>
                <div style="font-size: 0.8rem; color: #b45309;">Silakan masuk menggunakan akun pegawai keperawatan terdaftar Anda untuk membuka bilik suara simulasi.</div>
              </div>
            </div>
            <button class="btn-primary" style="font-size: 0.82rem; padding: 0.5rem 1rem; background: #0d5f5b; border: none; font-weight: 700;" onclick="openLoginModal()">
              <i class="fa-solid fa-right-to-bracket"></i> Masuk Sekarang
            </button>
          </div>
        `;
      } else if (auth.hasVoted) {
        statusBox.innerHTML = `
          <div style="background: #ecfdf5; border: 1.5px solid #a7f3d0; border-radius: 12px; padding: 1rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <i class="fa-solid fa-circle-check" style="color: #059669; font-size: 1.3rem;"></i>
              <div>
                <div style="font-weight: 800; color: #065f46; font-size: 0.9rem;">Hak Suara Simulasi Anda Telah Digunakan &amp; Tercatat Sah</div>
                <div style="font-size: 0.8rem; color: #047857;">
                  Nomor Bukti Kuitansi Anda: <code style="background: #d1fae5; padding: 2px 6px; border-radius: 4px; font-weight: bold; font-family: monospace;">${auth.token || 'TERCATAT'}</code>. Suara Anda tersimpan secara rahasia dan independen.
                </div>
              </div>
            </div>
            <div style="display: flex; gap: 0.5rem;">
              <button class="btn-secondary" style="font-size: 0.8rem; background: #ffffff; color: #047857; border: 1.5px solid #059669; font-weight: 700;" onclick="window.PemilihanKomkep.openSlipBuktiModal()">
                <i class="fa-solid fa-ticket"></i> Lihat Bukti Suara
              </button>
              <button class="btn-secondary" style="font-size: 0.8rem;" onclick="window.PemilihanKomkep.switchSubTab('hasil')">Lihat Rekapitulasi</button>
            </div>
          </div>
        `;
      } else {
        statusBox.innerHTML = `
          <div style="background: #f0fdf4; border: 1.5px solid #bbf7d0; border-radius: 12px; padding: 1rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <i class="fa-solid fa-check-to-slot" style="color: #059669; font-size: 1.3rem;"></i>
              <div>
                <div style="font-weight: 800; color: #065f46; font-size: 0.9rem;">Selamat Datang di Bilik Suara Simulasi, ${auth.user.name}!</div>
                <div style="font-size: 0.8rem; color: #047857;">Pilihlah salah satu kandidat di bawah ini. Suara Anda dijamin anonim dan rahasia.</div>
              </div>
            </div>
            <button class="btn-secondary" style="font-size: 0.78rem; background: #fff; color: #0d5f5b; border: 1px solid #0d5f5b; font-weight: 700;" onclick="window.PemilihanKomkep.openBuktiBilikSuaraModal()">
              <i class="fa-solid fa-id-badge"></i> Cetak Bukti Masuk Bilik
            </button>
          </div>
        `;
      }
    }

    container.innerHTML = state.candidates.map(c => `
      <div style="background: var(--bg-surface); border: 2px solid ${canVote ? '#e2e8f0' : '#f1f5f9'}; border-radius: 16px; overflow: hidden; box-shadow: var(--shadow-sm); display: flex; flex-direction: column; transition: all 0.2s;" onmouseover="this.style.boxShadow='var(--shadow-md)'; if(${canVote}) this.style.borderColor='#0d5f5b'" onmouseout="this.style.boxShadow='var(--shadow-sm)'; this.style.borderColor='${canVote ? '#e2e8f0' : '#f1f5f9'}'">
        <div style="background: ${c.photoGradient}; padding: 1.75rem 1rem; text-align: center; color: #ffffff; position: relative;">
          <div style="position: absolute; top: 12px; left: 12px; background: rgba(255,255,255,0.25); backdrop-filter: blur(4px); border: 1px solid rgba(255,255,255,0.3); color: #fff; font-weight: 900; font-size: 0.78rem; padding: 3px 10px; border-radius: 20px;">
            NOMOR URUT 0${c.number}
          </div>
          <div style="width: 80px; height: 80px; margin: 0 auto; border-radius: 50%; background: rgba(255,255,255,0.2); border: 3px solid rgba(255,255,255,0.6); display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: 900; box-shadow: inset 0 2px 6px rgba(0,0,0,0.2);">
            ${c.isAbstain ? '<i class="fa-solid fa-ban fa-sm"></i>' : (c.name.charAt(4) || 'P')}
          </div>
          <h3 style="font-size: 1.05rem; font-weight: 800; margin-top: 0.75rem; line-height: 1.3;">${c.name}</h3>
          <div style="font-size: 0.8rem; opacity: 0.9; margin-top: 2px;">${c.unit}</div>
        </div>

        <div style="padding: 1.25rem; flex: 1; display: flex; flex-direction: column; justify-content: space-between; gap: 1rem;">
          <div>
            <div style="font-size: 0.72rem; font-weight: 800; color: var(--primary-700); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.35rem;">
              <i class="fa-solid fa-bullseye"></i> Visi / Tujuan
            </div>
            <p style="font-size: 0.82rem; line-height: 1.5; color: #334155;">${c.visi}</p>

            <div style="font-size: 0.72rem; font-weight: 800; color: var(--gold-700); text-transform: uppercase; letter-spacing: 0.05em; margin-top: 0.75rem; margin-bottom: 0.35rem;">
              <i class="fa-solid fa-briefcase"></i> Pengalaman / Profil Singkat
            </div>
            <p style="font-size: 0.78rem; color: #64748b; line-height: 1.4;">${c.pengalaman}</p>
          </div>

          <button class="btn-primary" style="width: 100%; justify-content: center; padding: 0.75rem; font-size: 0.88rem; font-weight: 800; border-radius: 10px; background: ${canVote ? '#0d5f5b' : '#cbd5e1'}; cursor: ${canVote ? 'pointer' : 'not-allowed'}; border: none;" onclick="${canVote ? `window.PemilihanKomkep.openVoteModal('${c.id}')` : ''}" ${!canVote ? 'disabled' : ''}>
            <i class="fa-solid ${auth.hasVoted ? 'fa-check' : 'fa-check-to-slot'}"></i>
            ${auth.hasVoted ? 'Suara Telah Diberikan' : (auth.type === 'GUEST' ? 'Masuk Akun untuk Memilih' : (c.isAbstain ? 'PILIH ABSTAIN' : 'PILIH CALON INI'))}
          </button>
        </div>
      </div>
    `).join('');
  }

  async function renderResults() {
    let rekapData = { metrics: {}, rekap_kandidat: [] };
    if (window.SupabaseKomkep && typeof window.SupabaseKomkep.getElectionRekap === 'function') {
      rekapData = await window.SupabaseKomkep.getElectionRekap(state.election.id);
    }

    const metrics = rekapData.metrics || {};
    const totalVotes = metrics.total_voted || 0;
    const totalDpt = metrics.total_dpt || 717;
    const turnout = metrics.turnout_percent || 0;

    const mTotal = document.getElementById('pemilihanMetricTotalVotes');
    const mTurnout = document.getElementById('pemilihanMetricTurnout');
    const mLeader = document.getElementById('pemilihanMetricLeader');

    if (mTotal) mTotal.textContent = `${totalVotes} Suara`;
    if (mTurnout) mTurnout.textContent = `${turnout}% (${totalVotes}/${totalDpt})`;

    const candList = rekapData.rekap_kandidat || [];
    const sorted = [...candList].sort((a, b) => b.vote_count - a.vote_count);
    if (mLeader && sorted[0]) {
      mLeader.textContent = totalVotes > 0 ? `0${sorted[0].candidate_number}. ${sorted[0].name.split(',')[0]} (${sorted[0].vote_count} suara)` : 'Belum ada suara masuk';
    }

    const barsContainer = document.getElementById('pemilihanResultsBars');
    if (barsContainer) {
      barsContainer.innerHTML = candList.map(c => {
        return `
          <div style="margin-bottom: 1.25rem;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; font-size: 0.85rem; font-weight: 700; margin-bottom: 0.4rem;">
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span style="width: 22px; height: 22px; border-radius: 50%; background: #0d5f5b; color: #fff; font-size: 0.72rem; display: inline-flex; align-items: center; justify-content: center; font-weight: 800;">
                  0${c.candidate_number}
                </span>
                <span style="color: var(--text-main);">${c.name}</span>
                <span style="font-size: 0.75rem; color: #64748b; font-weight: 500;">${c.is_abstain ? '(Abstain)' : ''}</span>
              </div>
              <div style="font-family: monospace; font-size: 0.9rem; color: #0f172a;">
                <strong>${c.vote_count} Suara</strong>
                <span style="color: #64748b; font-size: 0.8rem; margin-left: 4px;">(${c.percent}%)</span>
              </div>
            </div>
            <div style="width: 100%; height: 12px; background: #f1f5f9; border-radius: 6px; overflow: hidden; display: flex;">
              <div style="width: ${c.percent}%; background: linear-gradient(90deg, #0d5f5b 0%, #14b8a6 100%); transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1); border-radius: 6px;"></div>
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
      <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: var(--shadow-sm);">
        <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 1rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.75rem;">
          <div style="width: 50px; height: 50px; border-radius: 50%; background: #0d5f5b; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; font-weight: 800;">
            ${c.isAbstain ? '<i class="fa-solid fa-ban"></i>' : (c.name.charAt(4) || 'P')}
          </div>
          <div>
            <div style="font-size: 0.75rem; font-weight: 800; color: #0d5f5b; text-transform: uppercase;">Kandidat Nomor 0${c.number}</div>
            <h3 style="font-size: 1.1rem; font-weight: 800; margin: 0; color: var(--text-main);">${c.name}</h3>
            <div style="font-size: 0.8rem; color: var(--text-muted);">${c.unit}</div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; font-size: 0.85rem;">
          <div>
            <strong style="display: block; color: var(--primary-700); margin-bottom: 4px;"><i class="fa-solid fa-bullseye"></i> Visi:</strong>
            <p style="margin: 0; color: #334155;">${c.visi}</p>
          </div>
          <div>
            <strong style="display: block; color: var(--gold-700); margin-bottom: 4px;"><i class="fa-solid fa-briefcase"></i> Pengalaman:</strong>
            <p style="margin: 0; color: #475569;">${c.pengalaman}</p>
          </div>
        </div>
      </div>
    `).join('');
  }

  async function renderAdminPanel() {
    const container = document.getElementById('pemilihanAdminPanelContainer');
    if (!container) return;

    let rekapData = { metrics: {}, rekap_unit: [], rekap_kandidat: [] };
    if (window.SupabaseKomkep && typeof window.SupabaseKomkep.getElectionRekap === 'function') {
      rekapData = await window.SupabaseKomkep.getElectionRekap(state.election.id);
    }

    const unitList = rekapData.rekap_unit || [];
    const metrics = rekapData.metrics || {};

    container.innerHTML = `
      <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.5rem;">
          <div>
            <h3 style="margin: 0; font-size: 1.05rem; font-weight: 800; color: var(--text-main);">Rekapitulasi Partisipasi Per Unit Kerja (717 Pemilih)</h3>
            <div style="font-size: 0.78rem; color: var(--text-muted);">Data partisipasi agregat tanpa membuka kerahasiaan pilihan individu</div>
          </div>
          <div style="display: flex; gap: 0.5rem;">
            <button type="button" class="btn-primary" onclick="window.PemilihanKomkep.exportResultsCsv()" style="font-size: 0.8rem; background: #0d5f5b; border: none;">
              <i class="fa-solid fa-file-csv"></i> Ekspor Rekap CSV
            </button>
            <button type="button" class="btn-secondary" onclick="window.PemilihanKomkep.openBeritaAcaraModal()" style="font-size: 0.8rem;">
              <i class="fa-solid fa-file-signature"></i> Cetak Berita Acara
            </button>
            <button type="button" class="btn-secondary" onclick="window.PemilihanKomkep.resetSimulationData()" style="font-size: 0.8rem; color: #991b1b; border-color: #fecaca; background: #fef2f2;">
              <i class="fa-solid fa-arrows-rotate"></i> Reset Data Simulasi
            </button>
          </div>
        </div>

        <div style="max-height: 380px; overflow-y: auto; border: 1px solid var(--border-subtle); border-radius: 8px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 0.82rem;">
            <thead style="background: var(--bg-main); position: sticky; top: 0; border-bottom: 2px solid var(--border-subtle);">
              <tr>
                <th style="padding: 8px 12px; text-align: left;">Unit Kerja</th>
                <th style="padding: 8px 12px; text-align: center;">Total DPT</th>
                <th style="padding: 8px 12px; text-align: center;">Sudah Memilih</th>
                <th style="padding: 8px 12px; text-align: center;">Belum Memilih</th>
                <th style="padding: 8px 12px; text-align: center;">Partisipasi</th>
              </tr>
            </thead>
            <tbody>
              ${unitList.map(u => `
                <tr style="border-bottom: 1px solid var(--border-subtle);">
                  <td style="padding: 8px 12px; font-weight: 600;">${u.unit_kerja}</td>
                  <td style="padding: 8px 12px; text-align: center;">${u.total_dpt}</td>
                  <td style="padding: 8px 12px; text-align: center; color: #059669; font-weight: 700;">${u.sudah_memilih}</td>
                  <td style="padding: 8px 12px; text-align: center; color: #94a3b8;">${u.belum_memilih}</td>
                  <td style="padding: 8px 12px; text-align: center; font-weight: 700; color: #0d5f5b;">${u.persen}%</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // ==========================================================================
  // EKSPOR INTERFACE KE GLOBAL WINDOW
  // ==========================================================================
  window.PemilihanKomkep = {
    init: function () {
      renderAll();
    },
    switchSubTab: function (tabId) {
      state.activeSubTab = tabId;
      saveState();
      renderAll();
    },
    enterBoothFlow: enterBoothFlow,
    openBuktiBilikSuaraModal: openBuktiBilikSuaraModal,
    printBuktiBilikSuara: printBuktiBilikSuara,
    openVoteModal: openVoteModal,
    closeVoteModal: closeVoteModal,
    confirmVote: confirmVote,
    openSlipBuktiModal: openSlipBuktiModal,
    closeSlipBuktiModal: closeSlipBuktiModal,
    printSlipBukti: printSlipBukti,
    openBeritaAcaraModal: openBeritaAcaraModal,
    closeBeritaAcaraModal: closeBeritaAcaraModal,
    printBeritaAcara: printBeritaAcara,
    exportResultsCsv: exportResultsCsv,
    resetSimulationData: resetSimulationData,
    renderAll: renderAll
  };

  // Auto Inisialisasi saat Dokumen Siap
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.PemilihanKomkep.init());
  } else {
    window.PemilihanKomkep.init();
  }

})();
