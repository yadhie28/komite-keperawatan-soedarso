/**
 * ============================================================================
 * MODUL E-VOTING: SIMULASI PEMILIHAN KETUA KOMITE KEPERAWATAN (2027–2030)
 * RSUD dr. SOEDARSO PONTIANAK
 * ============================================================================
 * Kepatuhan Keamanan & Server-Truth (P2, P3, P4, P5, P6):
 * 1. Sumber Kebenaran: Server Google Apps Script (bukan localStorage/jam perangkat).
 * 2. Jadwal Server: Senin, 23 Nov 2026 10.00 WIB s.d. Selasa, 24 Nov 2026 10.00 WIB.
 * 3. Sebelum Waktu Tutup:
 *    - Hanya menampilkan 2 angka: Jumlah DPT dan Jumlah yang sudah memilih.
 *    - Tidak ada persentase partisipasi, perolehan suara tertinggi, grafik,
 *      atau tabel per calon di layar maupun di localStorage/jaringan.
 *    - Tombol Cetak Berita Acara & Kirim ke Email dinonaktifkan sampai TUTUP.
 * 4. Tabel Daftar Pemilih (Khusus Panitia):
 *    - Diambil dari server (aksi daftar_pemilih), hanya menampilkan Nama, Unit,
 *      NIP tersamar, dan status Sudah/Belum (tanpa token bukti & tanpa pilihan).
 * 5. Jika server backend belum dikonfigurasi, bilik suara menampilkan pesan
 *    "Pemilihan sedang dalam pemeliharaan".
 * ============================================================================
 */

(function () {
  'use strict';

  const TARGET_EMAIL_KOMITE = 'komitekeperawatanrsds2023@gmail.com';
  const SIMULATION_ELECTION_ID = 'e1ec7100-2026-1123-0000-000000000001';
  const PESAN_SEBELUM_TUTUP = 'Hasil rekapitulasi dibuka setelah pemilihan ditutup pada Selasa, 24 November 2026 pukul 10.00 WIB.';
  const KLAIM_KERAHASIAAN_JUJUR = 'Pilihan dicatat terpisah dari identitas pemilih dan antarmuka panitia tidak menampilkan pilihan individu.';

  const CANDIDATES_SIMULASI = [
    {
      id: 'cand-1',
      number: 1,
      name: 'Ns. Siti Rahmawati, S.Kep., M.Kep. (SIMULASI)',
      nip: '00000000 000000 1 031',
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
      nip: '00000000 000000 1 032',
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
      nip: '00000000 000000 1 002',
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
      title: 'Simulasi Pemilihan Ketua Komite Keperawatan',
      period: '2027–2030',
      nomorBeritaAcara: '400.7.2/ 1428 /KOMKEP-RSDS/2026',
      disclaimer: 'PERCOBAAN / SIMULASI - HASIL TIDAK MENGIKAT',
      startTime: '2026-11-23T10:00:00+07:00',
      endTime: '2026-11-24T10:00:00+07:00'
    },
    candidates: CANDIDATES_SIMULASI,
    activeSubTab: 'voting',
    pendingVoteCandidateId: null,
    countdownTimerId: null,
    cachedVoterList: [],
    lastRekapData: null
  };

  function notify(msg, type = 'success') {
    if (typeof window.showToast === 'function') {
      window.showToast(msg, type);
    } else {
      alert(msg);
    }
  }

  function escapeHtml(str) {
    if (window.SupabaseKomkep && typeof window.SupabaseKomkep.escapeHtml === 'function') {
      return window.SupabaseKomkep.escapeHtml(str);
    }
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
    if (window.SupabaseKomkep && typeof window.SupabaseKomkep.getActiveSession === 'function') {
      const sess = window.SupabaseKomkep.getActiveSession();
      if (sess && sess.user) return sess.user;
    }
    return null;
  }

  function resolveUserStatus() {
    const user = getActivePortalUser();
    if (!user || user.role === 'guest') {
      return {
        type: 'GUEST',
        user: { name: 'Tamu (Belum Login)', role: 'guest' },
        isPanitia: false,
        hasVoted: false,
        token: null
      };
    }

    const isPanitia = Boolean(
      user.isPanitiaEvoting ||
      user.peran_server === 'superadmin' ||
      user.peran_server === 'panitia' ||
      user.isAdmin ||
      user.isPengurus
    );

    const hasVoted = Boolean(user.sudah_memilih);
    const receiptCode = user.kode_bukti || null;

    return {
      type: user.tipe === 'panitia' ? 'ADMIN' : 'VOTER',
      isPanitia: isPanitia,
      user: user,
      hasVoted: hasVoted,
      token: receiptCode
    };
  }

  /* ==========================================================================
     1. MASUK BILIK SUARA & BUKTI AKSES
     ========================================================================== */

  async function enterBoothFlow() {
    const auth = resolveUserStatus();
    if (auth.type === 'GUEST') {
      notify('Silakan login dengan NIP/NIPPPK/NIK Anda terlebih dahulu untuk masuk ke bilik suara.', 'warning');
      if (typeof window.openLoginModal === 'function') {
        window.openLoginModal('pengusul');
      }
      return;
    }

    state.activeSubTab = 'voting';
    await renderAll();
    const grid = document.getElementById('pemilihanVotingGrid');
    if (grid) {
      grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function openBuktiBilikSuaraModal(entry = null) {
    const container = document.getElementById('bodyBuktiBilikSuara');
    if (!container) return;

    const auth = resolveUserStatus();
    if (auth.type === 'GUEST') {
      notify('Silakan login terlebih dahulu.', 'warning');
      return;
    }

    const user = auth.user;
    const cleanId = user.id_login || user.nip || user.username || '-';
    const masked  = user.masked_id || (window.SupabaseKomkep ? window.SupabaseKomkep.maskId(cleanId) : cleanId);
    const wibNow  = window.SupabaseKomkep ? window.SupabaseKomkep.formatWibDate(new Date()) : new Date().toLocaleString('id-ID');

    container.innerHTML = `
      <div style="border: 2px dashed #0d9488; border-radius: 12px; padding: 1.5rem; background: #f0fdf4;">
        <div style="background: #fef3c7; border: 1.5px solid #fde68a; border-radius: 8px; padding: 6px 12px; text-align: center; margin-bottom: 1.25rem;">
          <span style="font-size: 0.76rem; font-weight: 800; color: #92400e; text-transform: uppercase; letter-spacing: 0.5px;">
            <i class="fa-solid fa-triangle-exclamation"></i> PERCOBAAN / SIMULASI - HASIL TIDAK MENGIKAT
          </span>
        </div>

        <div style="text-align: center; border-bottom: 2px solid #0d9488; padding-bottom: 1rem; margin-bottom: 1rem;">
          <div style="font-size: 0.8rem; font-weight: 800; color: #042f2e; text-transform: uppercase;">KOMITE KEPERAWATAN RSUD dr. SOEDARSO</div>
          <div style="font-size: 1.15rem; font-weight: 900; color: #0d5f5b; margin-top: 2px;">BUKTI AKSES BILIK SUARA ELEKTRONIK</div>
          <div style="font-size: 0.75rem; color: #64748b;">Simulasi Pemilihan Ketua Komite Keperawatan Masa Bakti 2027–2030</div>
        </div>

        <table style="width: 100%; font-size: 0.85rem; border-collapse: collapse; margin-bottom: 1.25rem;">
          <tr>
            <td style="padding: 6px 0; color: #475569; width: 38%;">Nama Pemilih</td>
            <td style="padding: 6px 0; font-weight: 800; color: #0f172a;">: ${escapeHtml(user.name)}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #475569;">ID Pemilih (Disamarkan)</td>
            <td style="padding: 6px 0; font-weight: 700; color: #0f172a; font-family: monospace;">: ${escapeHtml(masked)}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #475569;">Unit Kerja</td>
            <td style="padding: 6px 0; font-weight: 700; color: #0f172a;">: ${escapeHtml(user.unit || 'RSUD dr. Soedarso')}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #475569;">Waktu Akses</td>
            <td style="padding: 6px 0; font-weight: 700; color: #0f172a;">: ${escapeHtml(entry?.entered_at_wib || wibNow)}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #475569;">Status Hak Suara</td>
            <td style="padding: 6px 0; font-weight: 800; color: ${auth.hasVoted ? '#059669' : '#0284c7'};">: ${auth.hasVoted ? 'Sudah Memilih' : 'Belum Memilih'}</td>
          </tr>
        </table>

        <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; padding: 0.75rem; text-align: center; font-size: 0.75rem; color: #64748b;">
          <i class="fa-solid fa-shield-halved" style="color: #0d5f5b;"></i> ${KLAIM_KERAHASIAAN_JUJUR}
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
    if (!printWin) {
      window.print();
      return;
    }
    printWin.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Bukti Akses Bilik Suara - RSUD dr. Soedarso</title>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; padding: 2rem; color: #0f172a; }
          @media print { body { padding: 0; } }
        </style>
      </head>
      <body>${content}</body>
      </html>
    `);
    printWin.document.close();
    printWin.focus();
    setTimeout(() => {
      printWin.print();
      printWin.close();
    }, 350);
  }

  /* ==========================================================================
     2. PEMILIHAN CALON & KONFIRMASI SUARA (SATU PEMILIH SATU SUARA DI SERVER)
     ========================================================================== */

  function openVoteModal(candidateId) {
    const schedule = window.SupabaseKomkep ? window.SupabaseKomkep.checkElectionSchedule() : { isOpen: false, isMaintenance: true };
    if (schedule.isMaintenance) {
      notify('Pemilihan sedang dalam pemeliharaan.', 'warning');
      return;
    }

    const auth = resolveUserStatus();
    if (auth.type === 'GUEST') {
      notify('Silakan login terlebih dahulu menggunakan NIP/NIPPPK/NIK Anda untuk memilih.', 'warning');
      if (typeof window.openLoginModal === 'function') {
        window.openLoginModal('pengusul');
      }
      return;
    }

    if (auth.type === 'ADMIN') {
      notify('Anda sedang masuk menggunakan akun username Panitia/Pengurus. Untuk memilih sebagai pemilih DPT, silakan keluar lalu masuk menggunakan NIP/NIPPPK/NIK pribadi Anda.', 'warning');
      return;
    }

    if (auth.user.wajib_ganti_password || auth.user.mustChangePassword) {
      notify('Anda wajib mengganti kata sandi awal terlebih dahulu sebelum memberikan suara.', 'warning');
      if (typeof window.toggleGantiPasswordForm === 'function') {
        window.toggleGantiPasswordForm(true);
      }
      return;
    }

    if (auth.hasVoted) {
      notify('Anda sudah menggunakan hak suara. Setiap pemilih hanya berhak memilih satu kali.', 'info');
      openSlipBuktiModal();
      return;
    }

    if (!schedule.isOpen) {
      notify(`Pemungutan suara tidak dapat dilakukan saat ini (${schedule.statusText}).`, 'danger');
      return;
    }

    const cand = state.candidates.find(c => c.id === candidateId);
    if (!cand) return;

    state.pendingVoteCandidateId = candidateId;

    const modal = document.getElementById('modalKonfirmasiVoting');
    const candNameElem = document.getElementById('modalVoteCandName');
    const candUnitElem = document.getElementById('modalVoteCandUnit');
    const candNumElem  = document.getElementById('modalVoteCandNum');

    if (candNameElem) candNameElem.textContent = cand.name;
    if (candUnitElem) candUnitElem.textContent = cand.unit;
    if (candNumElem)  candNumElem.textContent  = `Nomor Urut 0${cand.number} (SIMULASI)`;

    if (modal) {
      modal.style.display = 'flex';
    }
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

    const candId  = state.pendingVoteCandidateId;
    const idLogin = auth.user.id_login || auth.user.nip;

    const modal = document.getElementById('modalKonfirmasiVoting');
    const btnConfirm = modal ? modal.querySelector('button.btn-primary') : null;
    const origHtml = btnConfirm ? btnConfirm.innerHTML : '';
    if (btnConfirm) {
      btnConfirm.disabled = true;
      btnConfirm.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Mengirim ke Server...';
    }

    try {
      const res = await window.SupabaseKomkep.castVote(state.election.id, idLogin, candId);
      closeVoteModal();

      if (!res || !res.success) {
        notify((res && res.message) || 'Penyaluran suara ditolak oleh server.', 'danger');
        await renderAll();
        return;
      }

      if (window.state && window.state.currentUser) {
        window.state.currentUser.sudah_memilih = true;
        window.state.currentUser.kode_bukti    = res.receipt?.receipt_token || '';
        window.state.currentUser.waktu_memilih = res.receipt?.voted_at_wib || '';
      }

      notify(`Suara Anda berhasil dicatat di server! Kode Bukti: ${res.receipt.receipt_token}`, 'success');
      await renderAll();
      await openSlipBuktiModal(res.receipt);
    } finally {
      if (btnConfirm) {
        btnConfirm.disabled = false;
        btnConfirm.innerHTML = origHtml;
      }
    }
  }

  /* ==========================================================================
     3. KARTU BUKTI VOTING (HANYA MILIK PEMILIH SENDIRI, TANPA PILIHAN CALON)
     ========================================================================== */

  async function openSlipBuktiModal(receiptParam = null) {
    const auth = resolveUserStatus();
    if (auth.type === 'GUEST') {
      notify('Silakan login terlebih dahulu untuk melihat kartu bukti suara Anda.', 'warning');
      return;
    }

    let record = receiptParam;
    if (!record && window.SupabaseKomkep && typeof window.SupabaseKomkep.getVoterReceipt === 'function') {
      const res = await window.SupabaseKomkep.getVoterReceipt();
      if (res && res.success && res.receipt) {
        record = res.receipt;
      } else {
        notify((res && res.message) || 'Anda belum memberikan suara.', 'warning');
        return;
      }
    }

    const user    = auth.user;
    const token   = record?.receipt_token || user.kode_bukti || '-';
    const votedAt = record?.voted_at_wib  || user.waktu_memilih || 'Tercatat Sah di Server';
    const masked  = record?.masked_id     || user.masked_id || (window.SupabaseKomkep ? window.SupabaseKomkep.maskId(user.nip) : '-');
    const unit    = record?.unit_kerja    || user.unit || 'RSUD dr. Soedarso';

    const elToken = document.getElementById('slipTokenBukti');
    const elNama  = document.getElementById('slipNamaPemilih');
    const elNip   = document.getElementById('slipNipPemilih');
    const elUnit  = document.getElementById('slipUnitPemilih');
    const elWaktu = document.getElementById('slipWaktuPemilihan');

    if (elToken) elToken.textContent = token;
    if (elNama)  elNama.textContent  = record?.voter_name || user.name;
    if (elNip)   elNip.textContent   = masked;
    if (elUnit)  elUnit.textContent  = unit;
    if (elWaktu) elWaktu.textContent = votedAt;

    const modal = document.getElementById('modalSlipBuktiSuara');
    if (modal) modal.style.display = 'flex';
  }

  function closeSlipBuktiModal() {
    const modal = document.getElementById('modalSlipBuktiSuara');
    if (modal) modal.style.display = 'none';
  }

  function printSlipBukti() {
    window.print();
  }

  /* ==========================================================================
     4. BERITA ACARA & LAPORAN EMAIL (DINONAKTIFKAN SEBELUM WAKTU TUTUP)
     ========================================================================== */

  async function openBeritaAcaraModal() {
    const rekapData = await window.SupabaseKomkep.getElectionRekap(state.election.id);
    if (!rekapData || !rekapData.resultsAvailable) {
      notify(PESAN_SEBELUM_TUTUP, 'warning');
      return;
    }

    const metrics    = rekapData.metrics || {};
    const candidates = rekapData.rekap_kandidat || [];
    const baTanggal   = document.getElementById('baTanggalLengkap');
    const baTabelBody = document.getElementById('baTabelHasilBody');
    const baTotal     = document.getElementById('baTotalSuara');
    const baKetua     = document.getElementById('baKetuaTerpilih');

    if (baTanggal) baTanggal.textContent = 'Selasa, 24 November 2026';
    if (baTotal)   baTotal.textContent   = String(metrics.total_sah ?? metrics.total_voted ?? 0);

    if (baTabelBody) {
      baTabelBody.innerHTML = candidates.map(c => `
        <tr>
          <td style="border: 1px solid #334155; padding: 8px; text-align: center;">0${c.candidate_number}</td>
          <td style="border: 1px solid #334155; padding: 8px; text-align: left; font-weight: 700;">${escapeHtml(c.name)}</td>
          <td style="border: 1px solid #334155; padding: 8px; text-align: left; font-family: monospace;">-</td>
          <td style="border: 1px solid #334155; padding: 8px; text-align: left;">${escapeHtml(c.unit || '-')}</td>
          <td style="border: 1px solid #334155; padding: 8px; text-align: center; font-weight: 800;">${c.vote_count}</td>
          <td style="border: 1px solid #334155; padding: 8px; text-align: center;">${c.percent}%</td>
          <td style="border: 1px solid #334155; padding: 8px; text-align: center;">SIMULASI</td>
        </tr>
      `).join('');
    }

    if (baKetua) {
      const winner = candidates.reduce((max, c) => (c.vote_count > (max?.vote_count || 0) ? c : max), null);
      baKetua.textContent = (winner && winner.vote_count > 0)
        ? `${winner.name} (Perolehan: ${winner.vote_count} Suara / ${winner.percent}%)`
        : 'Belum Ada Suara Masuk';
    }

    const modal = document.getElementById('modalBeritaAcaraPemilihan');
    if (modal) modal.style.display = 'flex';
  }

  function closeBeritaAcaraModal() {
    const modal = document.getElementById('modalBeritaAcaraPemilihan');
    if (modal) modal.style.display = 'none';
  }

  function printBeritaAcara() {
    const content = document.getElementById('beritaAcaraPrintArea')?.innerHTML;
    if (!content) return;
    const printWin = window.open('', '_blank', 'width=850,height=850');
    if (!printWin) {
      window.print();
      return;
    }
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
      <body>${content}</body>
      </html>
    `);
    printWin.document.close();
    printWin.focus();
    setTimeout(() => {
      printWin.print();
      printWin.close();
    }, 350);
  }

  async function sendEmailLaporan() {
    const rekapData = await window.SupabaseKomkep.getElectionRekap(state.election.id);
    if (!rekapData || !rekapData.resultsAvailable) {
      notify(PESAN_SEBELUM_TUTUP, 'warning');
      return;
    }

    const metrics  = rekapData.metrics || {};
    const candList = rekapData.rekap_kandidat || [];
    const subject  = encodeURIComponent('Laporan Rekapitulasi Simulasi Pemilihan Ketua Komite Keperawatan 2027–2030');
    let body = `Yth. Panitia & Pengurus Komite Keperawatan RSUD dr. Soedarso Pontianak,%0D%0A%0D%0A`;
    body += `Berikut adalah hasil akhir Rekapitulasi Simulasi Pemilihan Ketua Komite Keperawatan (2027–2030):%0D%0A`;
    body += `- Total DPT: ${metrics.total_dpt || 717} Pemilih%0D%0A`;
    body += `- Jumlah Sudah Memilih: ${metrics.total_voted || 0} Pemilih%0D%0A%0D%0A`;
    candList.forEach(c => {
      body += `- 0${c.candidate_number}. ${c.name}: ${c.vote_count} Suara (${c.percent}%)%0D%0A`;
    });
    window.open(`mailto:${TARGET_EMAIL_KOMITE}?subject=${subject}&body=${body}`, '_blank');
  }

  /* ==========================================================================
     5. EKSPOR CSV & KONTROL PANITIA (JEDA / LANJUT / RESET DENGAN KONFIRMASI)
     ========================================================================== */

  async function exportResultsCsv() {
    const rekapData = await window.SupabaseKomkep.getElectionRekap(state.election.id);
    if (!rekapData || !rekapData.resultsAvailable) {
      notify(PESAN_SEBELUM_TUTUP, 'warning');
      return;
    }

    const candList = rekapData.rekap_kandidat || [];
    let csv = 'data:text/csv;charset=utf-8,';
    csv += 'REKAPITULASI SIMULASI PEMILIHAN KETUA KOMITE KEPERAWATAN RSUD DR. SOEDARSO\n';
    csv += 'CATATAN: PERCOBAAN / SIMULASI - HASIL TIDAK MENGIKAT\n\n';
    csv += 'Nomor Urut,Nama Calon,Perolehan Suara,Persentase\n';
    candList.forEach(c => {
      csv += `"0${c.candidate_number}","${c.name.replace(/"/g, '""')}",${c.vote_count},"${c.percent}%"\n`;
    });

    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', `Hasil_Simulasi_EVoting_Komkep_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    notify('Berkas Hasil Rekapitulasi CSV berhasil diunduh.', 'success');
  }

  async function exportLogVotesCsv() {
    const res = await window.SupabaseKomkep.getVoterListForAdmin();
    if (!res || !res.success) {
      notify((res && res.message) || 'Silakan login sebagai Panitia Pemilihan untuk mengunduh daftar partisipasi.', 'warning');
      return;
    }

    let csv = 'data:text/csv;charset=utf-8,';
    csv += 'DAFTAR PARTISIPASI PEMILIH SIMULASI E-VOTING KOMITE KEPERAWATAN RSUD DR. SOEDARSO\n';
    csv += 'CATATAN: TANPA KODE BUKTI DAN TANPA PILIHAN CALON\n\n';
    csv += 'No,Nama Pemilih,Unit Kerja,NIP Tersamar,Status Memilih\n';
    res.daftar.forEach((row, idx) => {
      const nama = String(row.nama || '').replace(/"/g, '""');
      const unit = String(row.unit || '').replace(/"/g, '""');
      const nip  = String(row.nip_tersamar || '').replace(/"/g, '""');
      const st   = String(row.status || 'Belum');
      csv += `${idx + 1},"${nama}","${unit}","${nip}","${st}"\n`;
    });

    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', `Daftar_Partisipasi_DPT_Tersamar_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    notify('Daftar partisipasi pemilih (NIP tersamar) berhasil diunduh.', 'success');
  }

  async function toggleElection() {
    const schedule = window.SupabaseKomkep.checkElectionSchedule();
    if (schedule.isMaintenance) {
      notify('Pemilihan sedang dalam pemeliharaan.', 'warning');
      return;
    }
    const perintah = schedule.isPaused ? 'lanjut' : 'jeda';
    const res = await window.SupabaseKomkep.controlElection(perintah);
    if (!res.success) {
      notify(res.message || 'Gagal mengubah status pemilihan.', 'danger');
      return;
    }
    notify(res.message, 'success');
    await renderAll();
  }

  async function resetSimulationData() {
    const schedule = window.SupabaseKomkep.checkElectionSchedule();
    if (schedule.isMaintenance) {
      notify('Pemilihan sedang dalam pemeliharaan.', 'warning');
      return;
    }
    if (schedule.isAfter) {
      notify('Reset suara tidak diizinkan setelah waktu penutupan pemilihan.', 'danger');
      return;
    }

    const ketik = prompt(
      'KONFIRMASI PANITIA — RESET SEMUA SUARA SIMULASI:\n\n' +
      'Tindakan ini akan menghapus seluruh suara di tab SUARA dan mengembalikan status memilih seluruh 717 pemilih menjadi Belum Memilih.\n\n' +
      'Ketik kata RESET (huruf besar semua) untuk melanjutkan:'
    );
    if (ketik === null) return;
    if (String(ketik).trim() !== 'RESET') {
      notify('Konfirmasi dibatalkan. Anda harus mengetik "RESET" dengan huruf besar.', 'warning');
      return;
    }

    const res = await window.SupabaseKomkep.resetSimulation('RESET');
    if (res.success) {
      if (window.state && window.state.currentUser) {
        window.state.currentUser.sudah_memilih = false;
        window.state.currentUser.kode_bukti = '';
      }
      state.cachedVoterList = [];
      notify(res.message || 'Semua suara simulasi berhasil direset menjadi 0.', 'success');
      await renderAll();
    } else {
      notify(res.message || 'Gagal mereset suara simulasi.', 'danger');
    }
  }

  function resetAllVotes() {
    resetSimulationData();
  }

  /* ==========================================================================
     6. RENDER TAMPILAN E-VOTING
     ========================================================================== */

  async function renderAll() {
    try {
      if (window.SupabaseKomkep && typeof window.SupabaseKomkep.fetchServerStatus === 'function') {
        await window.SupabaseKomkep.fetchServerStatus();
      }
    } catch (_) {}

    renderDisclaimerBanner();
    renderUserPill();
    renderSubTabNavigation();
    renderVotingCards();
    await renderResults();
    renderProfileView();
    await renderAdminPanel();
    updateCountdownLive();
  }

  function renderDisclaimerBanner() {
    const pane = document.getElementById('pane-evoting');
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
          <div style="font-size: 0.78rem; font-weight: 900; color: #b45309; text-transform: uppercase; letter-spacing: 0.5px;">
            PERCOBAAN / SIMULASI - HASIL TIDAK MENGIKAT
          </div>
          <div style="font-size: 0.86rem; font-weight: 800; color: #78350f;">
            Jadwal Resmi Server: Senin, 23 Nov 2026 10.00 WIB s.d. Selasa, 24 Nov 2026 10.00 WIB
          </div>
        </div>
      </div>
      <div style="display: flex; align-items: center; gap: 0.6rem;">
        <div style="text-align: right;">
          <div style="font-size: 0.72rem; color: #92400e; font-weight: 700;">Status Waktu Server:</div>
          <div id="liveScheduleBadge" style="font-size: 0.85rem; font-weight: 900; color: #b45309;">${escapeHtml(schedule.countdownStr)}</div>
        </div>
        <button type="button" class="btn-primary" onclick="window.PemilihanKomkep.enterBoothFlow()" style="font-size: 0.8rem; padding: 6px 14px; background: #b45309; border: none; font-weight: 800; border-radius: 8px;">
          <i class="fa-solid fa-door-open"></i> Buka Bilik Suara
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
        liveBadge.textContent = schedule.isOpen ? `Sisa Waktu: ${schedule.countdownStr}` : schedule.statusText;
      }
      const simCountdown = document.getElementById('simulasiCountdownText');
      if (simCountdown) {
        simCountdown.textContent = schedule.isOpen ? schedule.countdownStr : schedule.statusText;
      }
    }, 1000);
  }

  function renderUserPill() {
    const pill = document.getElementById('pemilihanUserPill');
    const actionBox = document.getElementById('pemilihanAuthActionBox');
    if (!pill || !actionBox) return;

    const auth   = resolveUserStatus();
    const user   = auth.user;
    const masked = user.masked_id || (window.SupabaseKomkep ? window.SupabaseKomkep.maskId(user.nip || user.id_login) : '-');

    if (auth.type === 'GUEST') {
      pill.innerHTML = `
        <span style="font-size: 0.8rem; color: var(--text-muted); display: inline-flex; align-items: center; gap: 0.4rem;">
          <i class="fa-solid fa-user-clock"></i> Belum Login (Mode Tamu)
        </span>
      `;
      actionBox.innerHTML = `
        <button type="button" class="btn-primary" onclick="openLoginModal('pengusul')" style="font-size: 0.8rem; padding: 6px 12px; background: #0d5f5b; border: none; font-weight: 700; border-radius: 8px;">
          <i class="fa-solid fa-right-to-bracket"></i> Masuk Pemilih (NIP/NIK)
        </button>
        <button type="button" class="btn-secondary" onclick="openLoginModal('komite')" style="font-size: 0.8rem; padding: 6px 12px; border-radius: 8px; font-weight: 700;">
          <i class="fa-solid fa-user-shield"></i> Masuk Panitia
        </button>
      `;
    } else {
      pill.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem; background: var(--bg-surface); border: 1px solid var(--border-subtle); padding: 4px 10px; border-radius: 8px;">
          <div style="width: 24px; height: 24px; border-radius: 50%; background: #0d5f5b; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 0.72rem; font-weight: bold;">
            ${escapeHtml((user.name || 'P').charAt(0))}
          </div>
          <div style="line-height: 1.2;">
            <div style="font-size: 0.8rem; font-weight: 800; color: var(--text-main);">${escapeHtml(user.name)}</div>
            <div style="font-size: 0.7rem; color: var(--text-muted); font-family: monospace;">ID: ${escapeHtml(masked)} &bull; ${escapeHtml(user.unit || 'RSUD dr. Soedarso')}</div>
          </div>
        </div>
      `;

      actionBox.innerHTML = `
        <button type="button" class="btn-secondary" onclick="window.PemilihanKomkep.openBuktiBilikSuaraModal()" style="font-size: 0.75rem; padding: 5px 10px; background: #f0fdf4; color: #047857; border: 1px solid #bbf7d0; border-radius: 6px; font-weight: 700;">
          <i class="fa-solid fa-id-badge"></i> Bukti Akses Bilik
        </button>
        ${auth.hasVoted ? `
          <button type="button" class="btn-secondary" onclick="window.PemilihanKomkep.openSlipBuktiModal()" style="font-size: 0.75rem; padding: 5px 10px; background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; border-radius: 6px; font-weight: 700;">
            <i class="fa-solid fa-ticket"></i> Kartu Bukti Voting
          </button>
        ` : ''}
        <button type="button" class="btn-secondary" onclick="logoutToPortal()" style="font-size: 0.75rem; padding: 5px 10px; border-radius: 6px;">
          <i class="fa-solid fa-right-from-bracket"></i> Keluar
        </button>
      `;
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

    const auth     = resolveUserStatus();
    const schedule = window.SupabaseKomkep ? window.SupabaseKomkep.checkElectionSchedule() : { isOpen: false, isMaintenance: true };

    // JIKA SERVER BELUM DIKONFIGURASI -> Tampilkan pesan pemeliharaan sesuai instruksi darurat
    if (schedule.isMaintenance) {
      if (statusBox) {
        statusBox.innerHTML = `
          <div style="background: #fffbeb; border: 2px solid #f59e0b; border-radius: 14px; padding: 1.5rem; text-align: center;">
            <i class="fa-solid fa-screwdriver-wrench" style="font-size: 2rem; color: #b45309; margin-bottom: 0.5rem;"></i>
            <div style="font-size: 1.1rem; font-weight: 900; color: #78350f;">Pemilihan sedang dalam pemeliharaan</div>
            <div style="font-size: 0.84rem; color: #92400e; margin-top: 0.35rem;">
              Server backend Google Apps Script sedang disambungkan oleh panitia. Data pemilih aman dan bilik suara akan segera aktif setelah URL server dipasang di <code>config.js</code>.
            </div>
          </div>
        `;
      }
      container.innerHTML = '';
      return;
    }

    if (statusBox) {
      if (!schedule.isOpen) {
        statusBox.innerHTML = `
          <div style="background: #fef2f2; border: 1.5px solid #fecaca; border-radius: 12px; padding: 1rem; display: flex; align-items: center; gap: 0.75rem;">
            <i class="fa-solid fa-clock" style="color: #dc2626; font-size: 1.3rem;"></i>
            <div>
              <div style="font-weight: 800; color: #991b1b; font-size: 0.9rem;">Bilik Suara Sedang Tidak Dibuka (${escapeHtml(schedule.statusText)})</div>
              <div style="font-size: 0.8rem; color: #b91c1c;">Jadwal resmi server: <strong>Senin, 23 November 2026 pukul 10.00 WIB</strong> s.d. <strong>Selasa, 24 November 2026 pukul 10.00 WIB</strong>.</div>
            </div>
          </div>
        `;
      } else if (auth.type === 'GUEST') {
        statusBox.innerHTML = `
          <div style="background: #fffbeb; border: 1.5px solid #fde68a; border-radius: 12px; padding: 1rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <i class="fa-solid fa-check-to-slot" style="color: #0d5f5b; font-size: 1.4rem;"></i>
              <div>
                <div style="font-weight: 800; color: #065f46; font-size: 0.92rem;">Bilik Suara Simulasi Sedang Dibuka</div>
                <div style="font-size: 0.82rem; color: #78350f;">Silakan masuk menggunakan NIP / NIPPPK / NIK Anda untuk menyalurkan hak suara.</div>
              </div>
            </div>
            <button class="btn-primary" style="font-size: 0.82rem; padding: 0.55rem 1rem; background: #0d5f5b; border: none; font-weight: 700;" onclick="openLoginModal('pengusul')">
              <i class="fa-solid fa-right-to-bracket"></i> Masuk dengan NIP / NIK
            </button>
          </div>
        `;
      } else if (auth.hasVoted) {
        statusBox.innerHTML = `
          <div style="background: #ecfdf5; border: 1.5px solid #a7f3d0; border-radius: 12px; padding: 1rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <i class="fa-solid fa-circle-check" style="color: #059669; font-size: 1.3rem;"></i>
              <div>
                <div style="font-weight: 800; color: #065f46; font-size: 0.9rem;">Anda Telah Menggunakan Hak Suara (1 Pemilih 1 Suara)</div>
                <div style="font-size: 0.8rem; color: #047857;">
                  ${KLAIM_KERAHASIAAN_JUJUR}
                </div>
              </div>
            </div>
            <button class="btn-secondary" style="font-size: 0.8rem; background: #ffffff; color: #047857; border: 1.5px solid #059669; font-weight: 700;" onclick="window.PemilihanKomkep.openSlipBuktiModal()">
              <i class="fa-solid fa-ticket"></i> Lihat &amp; Cetak Kartu Bukti
            </button>
          </div>
        `;
      } else {
        statusBox.innerHTML = `
          <div style="background: #f0fdf4; border: 1.5px solid #bbf7d0; border-radius: 12px; padding: 1rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <i class="fa-solid fa-check-to-slot" style="color: #059669; font-size: 1.3rem;"></i>
              <div>
                <div style="font-weight: 800; color: #065f46; font-size: 0.9rem;">Selamat Datang di Bilik Suara Simulasi, ${escapeHtml(auth.user.name)}!</div>
                <div style="font-size: 0.8rem; color: #047857;">Silakan pilih salah satu calon simulasi di bawah ini. ${KLAIM_KERAHASIAAN_JUJUR}</div>
              </div>
            </div>
          </div>
        `;
      }
    }

    container.innerHTML = state.candidates.map(c => {
      const disabledVote = !schedule.isOpen || auth.hasVoted;
      const btnBg   = auth.hasVoted ? '#64748b' : (!schedule.isOpen ? '#94a3b8' : '#0d5f5b');
      const btnText = auth.hasVoted
        ? 'SUDAH MEMILIH'
        : (!schedule.isOpen ? 'BILIK SUARA TUTUP' : (c.isAbstain ? 'PILIH ABSTAIN (SIMULASI)' : `PILIH CALON 0${c.number} (SIMULASI)`));

      return `
      <div style="background: var(--bg-surface); border: 2px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: var(--shadow-sm); display: flex; flex-direction: column;">
        <div style="background: ${c.photoGradient}; padding: 1.75rem 1rem; text-align: center; color: #ffffff; position: relative;">
          <div style="position: absolute; top: 12px; left: 12px; background: rgba(255,255,255,0.25); border: 1px solid rgba(255,255,255,0.3); color: #fff; font-weight: 900; font-size: 0.74rem; padding: 3px 10px; border-radius: 20px;">
            NOMOR URUT 0${c.number} &bull; SIMULASI
          </div>
          <div style="width: 76px; height: 76px; margin: 0 auto; border-radius: 50%; background: rgba(255,255,255,0.2); border: 3px solid rgba(255,255,255,0.6); display: flex; align-items: center; justify-content: center; font-size: 1.9rem; font-weight: 900;">
            ${c.isAbstain ? '<i class="fa-solid fa-ban fa-sm"></i>' : escapeHtml(c.name.charAt(4) || 'C')}
          </div>
          <h3 style="font-size: 1.02rem; font-weight: 800; margin-top: 0.75rem; line-height: 1.3;">${escapeHtml(c.name)}</h3>
          <div style="font-size: 0.8rem; opacity: 0.9; margin-top: 2px;">${escapeHtml(c.unit)}</div>
        </div>

        <div style="padding: 1.25rem; flex: 1; display: flex; flex-direction: column; justify-content: space-between; gap: 1rem;">
          <div>
            <div style="font-size: 0.72rem; font-weight: 800; color: var(--primary-700); text-transform: uppercase; margin-bottom: 0.35rem;">
              <i class="fa-solid fa-bullseye"></i> Visi / Tujuan (Simulasi)
            </div>
            <p style="font-size: 0.82rem; line-height: 1.5; color: #334155;">${escapeHtml(c.visi)}</p>

            <div style="font-size: 0.72rem; font-weight: 800; color: var(--gold-700); text-transform: uppercase; margin-top: 0.75rem; margin-bottom: 0.35rem;">
              <i class="fa-solid fa-briefcase"></i> Profil Singkat
            </div>
            <p style="font-size: 0.78rem; color: #64748b; line-height: 1.4;">${escapeHtml(c.pengalaman)}</p>
          </div>

          <button class="btn-primary" ${disabledVote ? 'disabled' : ''} style="width: 100%; justify-content: center; padding: 0.75rem; font-size: 0.85rem; font-weight: 800; border-radius: 10px; background: ${btnBg}; cursor: ${disabledVote ? 'not-allowed' : 'pointer'}; border: none;" onclick="window.PemilihanKomkep.openVoteModal('${c.id}')">
            <i class="fa-solid fa-check-to-slot"></i> ${btnText}
          </button>
        </div>
      </div>
      `;
    }).join('');
  }

  /* ==========================================================================
     7. RENDER TAB HASIL (TERTUTUP SEBELUM WAKTU TUTUP SERVER)
     ========================================================================== */

  async function renderResults() {
    const rekapData = await window.SupabaseKomkep.getElectionRekap(state.election.id);
    state.lastRekapData = rekapData;

    const metrics    = (rekapData && rekapData.metrics) || {};
    const totalDpt   = metrics.total_dpt ?? 717;
    const totalVoted = metrics.total_voted ?? 0;

    const mDpt       = document.getElementById('pemilihanMetricTotalDpt');
    const mTotal     = document.getElementById('pemilihanMetricTotalVotes');
    const cardLeader = document.getElementById('pemilihanCardLeaderAfterClose');
    const mLeader    = document.getElementById('pemilihanMetricLeader');
    const btnBa      = document.getElementById('btnCetakBeritaAcaraHasil');
    const btnEmail   = document.getElementById('btnKirimEmailHasil');
    const barsBox    = document.getElementById('pemilihanResultsBars');

    if (mDpt)   mDpt.textContent   = `${totalDpt} Pemilih`;
    if (mTotal) mTotal.textContent = `${totalVoted} Pemilih`;

    // SEBELUM WAKTU TUTUP: Hanya tampilkan DPT & Sudah Memilih, sembunyikan grafik & nonaktifkan Berita Acara
    if (!rekapData || !rekapData.resultsAvailable) {
      if (cardLeader) cardLeader.style.display = 'none';
      if (mLeader)    mLeader.textContent = '-';

      if (btnBa) {
        btnBa.disabled = true;
        btnBa.style.background = '#94a3b8';
        btnBa.style.cursor = 'not-allowed';
        btnBa.style.opacity = '0.65';
      }
      if (btnEmail) {
        btnEmail.disabled = true;
        btnEmail.style.cursor = 'not-allowed';
        btnEmail.style.opacity = '0.65';
      }

      if (barsBox) {
        barsBox.innerHTML = `
          <div style="text-align: center; padding: 2.25rem 1rem; color: #475569;">
            <i class="fa-solid fa-lock" style="font-size: 2.2rem; color: #b45309; margin-bottom: 0.75rem;"></i>
            <div style="font-size: 1.02rem; font-weight: 800; color: #0f172a;">
              ${escapeHtml(PESAN_SEBELUM_TUTUP)}
            </div>
            <div style="font-size: 0.82rem; color: #64748b; margin-top: 0.4rem;">
              Selama pemungutan suara berlangsung, sistem hanya menampilkan Jumlah DPT dan Jumlah Pemilih yang Sudah Memilih. Perolehan suara per calon tidak dikirim dan tidak ditampilkan sebelum waktu penutupan resmi.
            </div>
          </div>
        `;
      }
      return;
    }

    // SETELAH WAKTU TUTUP: Tampilkan grafik, tabel perolehan, ketua terpilih, dan aktifkan Berita Acara
    if (cardLeader) cardLeader.style.display = 'block';
    if (btnBa) {
      btnBa.disabled = false;
      btnBa.style.background = '#0d5f5b';
      btnBa.style.cursor = 'pointer';
      btnBa.style.opacity = '1';
    }
    if (btnEmail) {
      btnEmail.disabled = false;
      btnEmail.style.cursor = 'pointer';
      btnEmail.style.opacity = '1';
    }

    const candList = rekapData.rekap_kandidat || [];
    const sorted   = [...candList].sort((a, b) => b.vote_count - a.vote_count);
    if (mLeader) {
      mLeader.textContent = (sorted[0] && sorted[0].vote_count > 0)
        ? `0${sorted[0].candidate_number}. ${sorted[0].name} (${sorted[0].vote_count} suara / ${sorted[0].percent}%)`
        : 'Belum ada suara masuk';
    }

    if (barsBox) {
      barsBox.innerHTML = `
        <h3 style="font-size: 1.05rem; font-weight: 800; color: var(--text-main); margin-bottom: 1.25rem;">
          <i class="fa-solid fa-chart-simple" style="color: #0d5f5b;"></i> Grafik &amp; Tabel Perolehan Suara Akhir (Simulasi)
        </h3>
        ${candList.map(c => `
          <div style="margin-bottom: 1.25rem;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; font-size: 0.85rem; font-weight: 700; margin-bottom: 0.4rem;">
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span style="width: 22px; height: 22px; border-radius: 50%; background: #0d5f5b; color: #fff; font-size: 0.72rem; display: inline-flex; align-items: center; justify-content: center; font-weight: 800;">
                  0${c.candidate_number}
                </span>
                <span style="color: var(--text-main);">${escapeHtml(c.name)}</span>
              </div>
              <div style="font-family: monospace; font-size: 0.9rem; color: #0f172a;">
                <strong>${c.vote_count} Suara</strong>
                <span style="color: #64748b; font-size: 0.8rem; margin-left: 4px;">(${c.percent}%)</span>
              </div>
            </div>
            <div style="width: 100%; height: 12px; background: #f1f5f9; border-radius: 6px; overflow: hidden;">
              <div style="width: ${c.percent}%; height: 100%; background: linear-gradient(90deg, #0d5f5b 0%, #14b8a6 100%); border-radius: 6px;"></div>
            </div>
          </div>
        `).join('')}
      `;
    }
  }

  function renderProfileView() {
    const container = document.getElementById('pemilihanProfilContainer');
    if (!container) return;

    container.innerHTML = state.candidates.map(c => `
      <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: var(--shadow-sm);">
        <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 1rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.75rem; flex-wrap: wrap;">
          <div style="width: 50px; height: 50px; border-radius: 50%; background: #0d5f5b; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; font-weight: 800;">
            ${c.isAbstain ? '<i class="fa-solid fa-ban"></i>' : escapeHtml(c.name.charAt(4) || 'C')}
          </div>
          <div style="flex: 1;">
            <div style="font-size: 0.75rem; font-weight: 800; color: #0d5f5b; text-transform: uppercase;">Calon Simulasi Nomor 0${c.number}</div>
            <h3 style="font-size: 1.08rem; font-weight: 800; margin: 0; color: var(--text-main);">${escapeHtml(c.name)}</h3>
            <div style="font-size: 0.8rem; color: var(--text-muted);">${escapeHtml(c.unit)}</div>
          </div>
          <button class="btn-primary" style="font-size: 0.82rem; padding: 7px 14px; background: #0d5f5b; border: none; font-weight: 800; border-radius: 8px;" onclick="window.PemilihanKomkep.selectCandidateFromProfile('${c.id}')">
            <i class="fa-solid fa-check-to-slot"></i> Menuju Bilik Suara
          </button>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; font-size: 0.85rem;">
          <div>
            <strong style="display: block; color: var(--primary-700); margin-bottom: 4px;"><i class="fa-solid fa-bullseye"></i> Visi:</strong>
            <p style="margin: 0; color: #334155; line-height: 1.5;">${escapeHtml(c.visi)}</p>
          </div>
          <div>
            <strong style="display: block; color: var(--gold-700); margin-bottom: 4px;"><i class="fa-solid fa-briefcase"></i> Misi &amp; Pengalaman:</strong>
            <p style="margin: 0; color: #475569; line-height: 1.5;">${escapeHtml(c.misi)} (${escapeHtml(c.pengalaman)})</p>
          </div>
        </div>
      </div>
    `).join('');
  }

  function selectCandidateFromProfile(candId) {
    state.activeSubTab = 'voting';
    renderSubTabNavigation();
    renderVotingCards();
    const grid = document.getElementById('pemilihanVotingGrid');
    if (grid) grid.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => openVoteModal(candId), 200);
  }

  /* ==========================================================================
     8. RENDER PANEL PANITIA (HANYA DPT & SUDAH MEMILIH; DAFTAR PEMILIH DARI SERVER)
     ========================================================================== */

  async function renderAdminPanel() {
    const container = document.getElementById('pemilihanAdminPanelContainer');
    if (!container) return;

    const rekapData  = state.lastRekapData || await window.SupabaseKomkep.getElectionRekap(state.election.id);
    const metrics    = (rekapData && rekapData.metrics) || {};
    const totalDpt   = metrics.total_dpt ?? 717;
    const totalVoted = metrics.total_voted ?? 0;
    const isClosed   = Boolean(rekapData && rekapData.resultsAvailable);

    container.innerHTML = `
      <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
          <div>
            <h3 style="margin: 0; font-size: 1.05rem; font-weight: 800; color: var(--text-main);">Ringkasan Partisipasi Pemilih (Sumber: Server)</h3>
            <div style="font-size: 0.78rem; color: var(--text-muted);">${KLAIM_KERAHASIAAN_JUJUR}</div>
          </div>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <button type="button" class="btn-secondary" ${!isClosed ? 'disabled' : ''} onclick="window.PemilihanKomkep.openBeritaAcaraModal()" style="font-size: 0.8rem; font-weight: 700; opacity: ${isClosed ? '1' : '0.6'}; cursor: ${isClosed ? 'pointer' : 'not-allowed'};">
              <i class="fa-solid fa-file-signature"></i> Cetak Berita Acara
            </button>
            <button type="button" class="btn-secondary" onclick="window.PemilihanKomkep.resetSimulationData()" style="font-size: 0.8rem; color: #991b1b; border-color: #fecaca; background: #fef2f2; font-weight: 700;">
              <i class="fa-solid fa-arrows-rotate"></i> Reset Semua Suara
            </button>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem;">
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 1rem;">
            <div style="font-size: 0.75rem; font-weight: 700; color: #64748b; text-transform: uppercase;">Jumlah DPT Terdaftar</div>
            <div style="font-size: 1.6rem; font-weight: 900; color: #0f172a; margin-top: 4px;">${totalDpt} Pemilih</div>
          </div>
          <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 1rem;">
            <div style="font-size: 0.75rem; font-weight: 700; color: #166534; text-transform: uppercase;">Jumlah yang Sudah Memilih</div>
            <div style="font-size: 1.6rem; font-weight: 900; color: #059669; margin-top: 4px;">${totalVoted} Pemilih</div>
          </div>
        </div>
      </div>
    `;

    const schedule     = window.SupabaseKomkep.checkElectionSchedule();
    const statusTextEl = document.getElementById('pemilihanAdminStatusText');
    const toggleBtnEl  = document.getElementById('pemilihanBtnToggleElection');

    if (statusTextEl) {
      if (schedule.isMaintenance) {
        statusTextEl.innerHTML = `<span style="color: #b45309; font-weight: 800;"><i class="fa-solid fa-screwdriver-wrench"></i> Pemilihan sedang dalam pemeliharaan</span>`;
      } else if (schedule.isPaused) {
        statusTextEl.innerHTML = `<span style="color: #b45309; font-weight: 800;"><i class="fa-solid fa-circle-pause"></i> Pemungutan Suara Sedang DIJEDA Panitia</span>`;
      } else if (schedule.isOpen) {
        statusTextEl.innerHTML = `<span style="color: #059669; font-weight: 800;"><i class="fa-solid fa-circle-check"></i> Pemungutan Suara Sedang BUKA</span>`;
      } else {
        statusTextEl.innerHTML = `<span style="color: #dc2626; font-weight: 800;"><i class="fa-solid fa-lock"></i> ${escapeHtml(schedule.statusText)}</span>`;
      }
    }

    if (toggleBtnEl) {
      if (schedule.isPaused) {
        toggleBtnEl.style.background = '#059669';
        toggleBtnEl.innerHTML = '<i class="fa-solid fa-play"></i> Lanjutkan Pemilihan';
      } else {
        toggleBtnEl.style.background = '#b45309';
        toggleBtnEl.innerHTML = '<i class="fa-solid fa-pause"></i> Jeda Pemilihan';
      }
    }

    const btnCsvHasil = document.getElementById('btnUnduhRekapHasilCsv');
    if (btnCsvHasil) {
      btnCsvHasil.disabled = !isClosed;
      btnCsvHasil.style.opacity = isClosed ? '1' : '0.5';
      btnCsvHasil.style.cursor  = isClosed ? 'pointer' : 'not-allowed';
    }

    await renderDptTable(false);
  }

  async function renderDptTable(forceRefresh = false) {
    const tbody = document.getElementById('pemilihanDptTableBody');
    if (!tbody) return;

    const auth = resolveUserStatus();
    if (!auth.isPanitia) {
      tbody.innerHTML = `
        <tr>
          <td colspan="5" style="padding: 1.5rem; text-align: center; color: #64748b;">
            <i class="fa-solid fa-user-lock" style="margin-right: 6px; color: #0d5f5b;"></i>
            Daftar pemilih hanya dapat dilihat oleh Panitia Pemilihan setelah login menggunakan akun panitia.
          </td>
        </tr>
      `;
      return;
    }

    if (forceRefresh || state.cachedVoterList.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="5" style="padding: 1.5rem; text-align: center; color: #64748b;">
            <i class="fa-solid fa-spinner fa-spin"></i> Memuat daftar pemilih tersamar dari server...
          </td>
        </tr>
      `;
      const res = await window.SupabaseKomkep.getVoterListForAdmin();
      if (!res || !res.success) {
        tbody.innerHTML = `
          <tr>
            <td colspan="5" style="padding: 1.5rem; text-align: center; color: #b91c1c;">
              ${escapeHtml((res && res.message) || 'Gagal memuat daftar pemilih dari server.')}
            </td>
          </tr>
        `;
        return;
      }
      state.cachedVoterList = res.daftar || [];
    }

    if (state.cachedVoterList.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="5" style="padding: 1.5rem; text-align: center; color: #64748b;">
            Belum ada data pemilih di tab DPT server.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = state.cachedVoterList.map((p, idx) => {
      const sudah = String(p.status).toLowerCase() === 'sudah';
      return `
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 0.65rem 0.75rem; color: #64748b;">${idx + 1}</td>
          <td style="padding: 0.65rem 0.75rem; font-weight: 700; color: #0f172a;">${escapeHtml(p.nama)}</td>
          <td style="padding: 0.65rem 0.75rem; color: #334155;">${escapeHtml(p.unit || '-')}</td>
          <td style="padding: 0.65rem 0.75rem; font-family: monospace; color: #475569;">${escapeHtml(p.nip_tersamar)}</td>
          <td style="padding: 0.65rem 0.75rem; text-align: center;">
            <span style="font-size: 0.75rem; font-weight: 800; padding: 3px 8px; border-radius: 6px; background: ${sudah ? '#dcfce7; color: #15803d;' : '#f1f5f9; color: #64748b;'}">
              ${sudah ? 'Sudah' : 'Belum'}
            </span>
          </td>
        </tr>
      `;
    }).join('');
  }

  window.PemilihanKomkep = {
    init: function () {
      try {
        renderAll();
      } catch (e) {
        console.error('[PemilihanKomkep.init]', e);
      }
    },
    switchSubTab: function (tabId) {
      state.activeSubTab = tabId;
      renderAll();
    },
    enterBoothFlow,
    openBuktiBilikSuaraModal,
    printBuktiBilikSuara,
    openVoteModal,
    closeVoteModal,
    confirmVote,
    openSlipBuktiModal,
    closeSlipBuktiModal,
    printSlipBukti,
    openBeritaAcaraModal,
    closeBeritaAcaraModal,
    printBeritaAcara,
    exportResultsCsv,
    resetSimulationData,
    sendEmailLaporan,
    exportLogVotesCsv,
    toggleElection,
    resetAllVotes,
    selectCandidateFromProfile,
    renderDptTable,
    renderAll
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.PemilihanKomkep.init());
  } else {
    window.PemilihanKomkep.init();
  }

})();
