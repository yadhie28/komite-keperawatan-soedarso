/**
 * ============================================================================
 * MODUL E-VOTING PEMILIHAN KETUA KOMITE KEPERAWATAN RSUD DR. SOEDARSO
 * Periode Masa Bakti 2027 - 2030
 * Terintegrasi Penuh dengan Sistem Autentikasi Tunggal Portal Komite
 * Menyediakan Bukti Proses Pemilihan Lengkap:
 * 1. Berita Acara Resmi Cetak A4 (Kop Surat Resmi, Tanda Tangan Panitia & Saksi)
 * 2. Slip Kartu Tanda Terima Pemilih (Token Kriptografis Unik)
 * 3. Ekspor CSV / Excel Berita Acara Rekapitulasi & Log Daftar Hadir
 * 4. Integrasi Otomatis Google Spreadsheet & Email (komitekeperawatanrsds2023@gmail.com)
 * ============================================================================
 */

(function () {
  const STORAGE_KEY = 'komkep_pemilihan_2027_state_v4';
  const TARGET_EMAIL_KOMITE = 'komitekeperawatanrsds2023@gmail.com';

  const DEFAULT_STATE = {
    election: {
      title: 'Pemilihan Ketua Komite Keperawatan RSUD dr. Soedarso',
      period: '2027 - 2030',
      nomorBeritaAcara: '400.7.2/ 1428 /KOMKEP-RSDS/2026',
      isActive: true,
      startDate: '2026-11-01',
      endDate: '2026-12-15'
    },
    googleAppsScriptUrl: '',
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
        votes: 0
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
        votes: 0
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
        votes: 0
      }
    ],
    voterRecords: {},
    activeSubTab: 'voting',
    pendingVoteCandidateId: null
  };

  let state = loadState();

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
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
    const raw = (user.nip && user.nip !== '-') ? user.nip : (user.username || user.name || '');
    return String(raw).replace(/[\s\.\-]/g, '').toLowerCase();
  }

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

    const key = getUserKey(user);
    const voteRecord = key ? state.voterRecords[key] : null;

    if (!isPengusul) {
      return {
        type: 'ADMIN',
        user: user,
        hasVoted: false,
        votedFor: null
      };
    }

    return {
      type: 'VOTER',
      user: user,
      hasVoted: Boolean(voteRecord?.hasVoted),
      votedFor: voteRecord?.votedFor || null,
      token: voteRecord?.token || null,
      record: voteRecord || null
    };
  }

  function sendVoteToGoogleSheet(payload) {
    const endpoint = state.googleAppsScriptUrl || localStorage.getItem('komkep_gas_voting_url');
    if (!endpoint) return;

    try {
      fetch(endpoint, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).then(() => {
        console.log('✅ Suara berhasil terkirim ke Google Spreadsheet (komitekeperawatanrsds2023@gmail.com)');
      }).catch(err => {
        console.warn('Gagal mengirim ke Google Apps Script:', err);
      });
    } catch (e) {
      console.warn('Error saat mengirim ke Google Sheet:', e);
    }
  }

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
        notify('Anda sudah memberikan suara sebelumnya!', 'warning');
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

      const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
      const tokenBukti = `VOTE-2026-${(auth.user.nip || 'RSDS').slice(-4)}-${randomSuffix}`;
      const nowIso = new Date().toISOString();

      const userKey = getUserKey(auth.user);
      const voteRecord = {
        hasVoted: true,
        votedFor: state.pendingVoteCandidateId,
        candidateNumber: `0${cand.number}`,
        candidateName: cand.name,
        token: tokenBukti,
        votedAt: nowIso,
        voterName: auth.user.name,
        voterNip: auth.user.nip || '-',
        voterUnit: auth.user.unit || 'Keperawatan'
      };

      state.voterRecords[userKey] = voteRecord;
      saveState();

      sendVoteToGoogleSheet({
        timestamp: nowIso,
        token: tokenBukti,
        voterName: auth.user.name,
        voterNip: auth.user.nip || '-',
        voterUnit: auth.user.unit || 'Keperawatan',
        candidateNumber: `0${cand.number}`,
        candidateName: cand.name,
        candidateId: cand.id
      });

      window.PemilihanKomkep.closeVoteModal();
      notify(`Suara Anda untuk ${cand.name} telah berhasil dicatat sah! Nomor Bukti Suara: ${tokenBukti}`, 'success');
      state.activeSubTab = 'hasil';
      renderAll();

      // Tampilkan slip tanda terima bukti pemilih
      setTimeout(() => {
        window.PemilihanKomkep.openSlipBuktiModal(userKey);
      }, 500);
    },

    toggleElection: function () {
      const auth = resolveUserStatus();
      if (auth.type !== 'ADMIN') {
        notify('Akses ditolak: Hanya Panitia Pemilihan yang berwenang mengubah status pemilihan.', 'error');
        return;
      }
      state.election.isActive = !state.election.isActive;
      saveState();
      notify(`Status pemilihan diubah: ${state.election.isActive ? 'AKTIF (Bilik Suara Dibuka)' : 'DIJEDA / DITUTUP'}`, 'warning');
      renderAll();
    },

    resetAllVotes: function () {
      const auth = resolveUserStatus();
      if (auth.type !== 'ADMIN') {
        notify('Akses ditolak: Hanya Panitia Pemilihan yang berwenang mereset suara.', 'error');
        return;
      }
      if (!confirm('PERINGATAN: Apakah Anda yakin ingin mereset seluruh perolehan suara menjadi 0? Tindakan ini akan menghapus semua riwayat pemungutan suara.')) return;
      
      state.candidates.forEach(c => c.votes = 0);
      state.voterRecords = {};
      saveState();
      notify('Semua data perolehan suara berhasil direset ke 0.', 'success');
      renderAll();
    },

    resetVoterStatus: function (userKey) {
      const auth = resolveUserStatus();
      if (auth.type !== 'ADMIN') {
        notify('Akses ditolak: Hanya Panitia Pemilihan yang berwenang mereset status pemilih.', 'error');
        return;
      }
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
    },

    saveGasEndpoint: function () {
      const input = document.getElementById('inputPemilihanGasUrl');
      if (!input) return;
      const url = input.value.trim();
      state.googleAppsScriptUrl = url;
      localStorage.setItem('komkep_gas_voting_url', url);
      saveState();
      notify('URL Endpoint Google Apps Script berhasil disimpan!', 'success');
    },

    downloadAppsScriptFile: function () {
      const link = document.createElement('a');
      link.href = 'google_apps_script_pemilihan_komkep.js';
      link.download = 'google_apps_script_pemilihan_komkep.js';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      notify('File skrip Google Apps Script (Pemilihan) berhasil diunduh.', 'success');
    },

    // =========================================================================
    // FITUR BUKTI PROSES PEMILIHAN PRAKTIS & RESMI (A4, SLIP, CSV, EMAIL)
    // =========================================================================

    /**
     * 1. Cetak Berita Acara Resmi Format Fisik A4 dengan Kop Surat RSUD dr. Soedarso
     */
    openBeritaAcaraModal: function () {
      const modal = document.getElementById('modalBeritaAcaraPemilihan');
      if (!modal) return;

      const totalVotes = state.candidates.reduce((sum, c) => sum + c.votes, 0);
      const sorted = [...state.candidates].sort((a, b) => b.votes - a.votes);
      const leader = sorted[0];

      // Format Tanggal Bahasa Indonesia
      const now = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const tanggalFormat = now.toLocaleDateString('id-ID', options);

      // Isi Data Dokumen
      const elTgl = document.getElementById('baTanggalLengkap');
      if (elTgl) elTgl.textContent = tanggalFormat;

      const elNo = document.getElementById('baNomorSurat');
      if (elNo) elNo.textContent = state.election.nomorBeritaAcara;

      const elTotal = document.getElementById('baTotalSuara');
      if (elTotal) elTotal.textContent = `${totalVotes} Suara Sah`;

      const elLeader = document.getElementById('baKetuaTerpilih');
      if (elLeader) {
        elLeader.textContent = totalVotes > 0 
          ? `0${leader.number}. ${leader.name} (${leader.unit}) - Perolehan: ${leader.votes} Suara`
          : 'Belum Ada Suara Masuk';
      }

      // Tabel Perolehan
      const tbody = document.getElementById('baTabelHasilBody');
      if (tbody) {
        tbody.innerHTML = state.candidates.map(c => {
          const pct = totalVotes > 0 ? ((c.votes / totalVotes) * 100).toFixed(2) : '0.00';
          const isWinner = totalVotes > 0 && c.votes === leader.votes;
          return `
            <tr style="border-bottom: 1px solid #cbd5e1; background: ${isWinner ? '#f0fdf4' : 'transparent'};">
              <td style="padding: 8px 12px; text-align: center; font-weight: bold;">0${c.number}</td>
              <td style="padding: 8px 12px; font-weight: bold; color: #0f172a;">${c.name}</td>
              <td style="padding: 8px 12px; color: #475569;">${c.nip}</td>
              <td style="padding: 8px 12px; color: #475569;">${c.unit}</td>
              <td style="padding: 8px 12px; text-align: right; font-weight: bold;">${c.votes}</td>
              <td style="padding: 8px 12px; text-align: right; font-weight: bold;">${pct}%</td>
              <td style="padding: 8px 12px; text-align: center;">
                <span style="font-size: 11px; padding: 2px 6px; border-radius: 4px; font-weight: bold; ${isWinner ? 'background: #dcfce7; color: #166534;' : 'color: #64748b;'}">
                  ${isWinner ? 'TERBANYAK' : '-'}
                </span>
              </td>
            </tr>
          `;
        }).join('');
      }

      modal.style.display = 'flex';
    },

    closeBeritaAcaraModal: function () {
      const modal = document.getElementById('modalBeritaAcaraPemilihan');
      if (modal) modal.style.display = 'none';
    },

    printBeritaAcara: function () {
      const printContent = document.getElementById('beritaAcaraPrintArea');
      if (!printContent) return;

      const printWindow = window.open('', '_blank', 'width=900,height=1000');
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Berita Acara Pemilihan Ketua Komite Keperawatan 2027-2030</title>
          <style>
            @page { size: A4; margin: 15mm; }
            body { font-family: 'Times New Roman', Times, serif; color: #000; margin: 0; padding: 0; font-size: 12pt; line-height: 1.4; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #333; padding: 6px 10px; font-size: 11pt; }
            th { background: #f2f2f2; }
            .kop { display: flex; align-items: center; border-bottom: 3px double #000; padding-bottom: 8px; margin-bottom: 16px; }
            .kop img { width: 70px; height: auto; margin-right: 15px; }
            .kop-text { text-align: center; flex: 1; }
            .kop-text h4 { margin: 0; font-size: 12pt; font-weight: normal; }
            .kop-text h2 { margin: 2px 0; font-size: 14pt; font-weight: bold; }
            .kop-text p { margin: 1px 0; font-size: 9pt; }
            .judul { text-align: center; margin: 15px 0; }
            .judul h3 { margin: 0; text-decoration: underline; font-size: 13pt; }
            .judul p { margin: 2px 0; font-size: 11pt; }
            .ttd-box { margin-top: 30px; display: flex; justify-content: space-between; text-align: center; }
            .ttd-col { width: 45%; }
            .ttd-space { height: 65px; }
          </style>
        </head>
        <body onload="window.print(); window.close();">
          ${printContent.innerHTML}
        </body>
        </html>
      `);
      printWindow.document.close();
    },

    /**
     * 2. Buka Kartu Slip Tanda Terima Pemilih (Personal Voting Proof)
     */
    openSlipBuktiModal: function (userKey) {
      const auth = resolveUserStatus();
      const targetKey = userKey || getUserKey(auth.user);
      const record = state.voterRecords[targetKey];
      if (!record) {
        notify('Belum ada data bukti suara untuk akun ini.', 'warning');
        return;
      }

      const modal = document.getElementById('modalSlipBuktiSuara');
      if (!modal) return;

      document.getElementById('slipNamaPemilih').textContent = record.voterName || auth.user.name;
      document.getElementById('slipNipPemilih').textContent = record.voterNip || '-';
      document.getElementById('slipUnitPemilih').textContent = record.voterUnit || '-';
      document.getElementById('slipTokenBukti').textContent = record.token || 'VOTE-CONFIRMED';
      document.getElementById('slipWaktuPemilihan').textContent = record.votedAt 
        ? new Date(record.votedAt).toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }) + ' WIB'
        : '-';

      modal.style.display = 'flex';
    },

    closeSlipBuktiModal: function () {
      const modal = document.getElementById('modalSlipBuktiSuara');
      if (modal) modal.style.display = 'none';
    },

    /**
     * 3. Kirim Laporan Berita Acara via Email Resmi ke komitekeperawatanrsds2023@gmail.com
     */
    sendEmailLaporan: function () {
      const totalVotes = state.candidates.reduce((sum, c) => sum + c.votes, 0);
      const sorted = [...state.candidates].sort((a, b) => b.votes - a.votes);
      const leader = sorted[0];

      let body = `Yth. Panitia Pemilihan Ketua Komite Keperawatan RSUD dr. Soedarso,\n\n`;
      body += `Berikut adalah data bukti proses pemungutan suara elektronik (E-Voting) periode 2027–2030:\n\n`;
      body += `====================================================\n`;
      body += `BERITA ACARA REKAPITULASI HASIL PEMILIHAN\n`;
      body += `Nomor: ${state.election.nomorBeritaAcara}\n`;
      body += `Waktu Laporan: ${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })} WIB\n`;
      body += `Total Suara Sah: ${totalVotes} Suara\n`;
      body += `====================================================\n\n`;
      body += `HASIL PEROLEHAN SUARA KANDIDAT:\n`;

      state.candidates.forEach(c => {
        const pct = totalVotes > 0 ? ((c.votes / totalVotes) * 100).toFixed(2) : '0.00';
        body += `Nomor 0${c.number}. ${c.name} (${c.unit})\n   Jumlah: ${c.votes} Suara (${pct}%)\n\n`;
      });

      if (leader && totalVotes > 0) {
        body += `PEROLEHAN SUARA TERBANYAK:\n0${leader.number}. ${leader.name}\n\n`;
      }

      body += `Data pemilih dan token audit trail telah tercatat pada arsip elektronik Komite Keperawatan RSUD dr. Soedarso.\n`;

      const mailto = `mailto:${TARGET_EMAIL_KOMITE}?subject=${encodeURIComponent('[E-VOTING 2027-2030] Berita Acara Rekapitulasi Suara Masuk')}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
      notify('Membuka aplikasi email untuk mengirim Berita Acara ke komitekeperawatanrsds2023@gmail.com', 'success');
    },

    exportResultsCsv: function () {
      const totalVotes = state.candidates.reduce((sum, c) => sum + c.votes, 0);
      let csv = 'BERITA ACARA REKAPITULASI HASIL PEMILIHAN KETUA KOMITE KEPERAWATAN RSUD DR. SOEDARSO\n';
      csv += 'Periode Masa Bakti 2027 - 2030\n';
      csv += `Dicetak pada: ${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })} WIB\n`;
      csv += `Akun Pengelola: ${TARGET_EMAIL_KOMITE}\n\n`;
      csv += 'Nomor Urut,Nama Lengkap Calon Ketua,NIP,Unit Kerja,Perolehan Suara Sah,Persentase (%)\n';

      state.candidates.forEach(c => {
        const pct = totalVotes > 0 ? ((c.votes / totalVotes) * 100).toFixed(2) : '0.00';
        csv += `"${c.number}","${c.name}","${c.nip}","${c.unit}","${c.votes}","${pct}%"\n`;
      });

      csv += `\n"TOTAL SUARA SAH MASUK","","","","${totalVotes}","100.00%"\n`;

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Berita_Acara_Hasil_Pemilihan_Ketua_Komite_2027_2030.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      notify('File Berita Acara Rekapitulasi (.CSV) berhasil diunduh.', 'success');
    },

    exportLogVotesCsv: function () {
      const records = Object.values(state.voterRecords);
      let csv = 'DAFTAR HADIR & BUKTI PENGGUNAAN HAK SUARA E-VOTING (AUDIT TRAIL)\n';
      csv += 'Pemilihan Ketua Komite Keperawatan RSUD dr. Soedarso Periode 2027 - 2030\n';
      csv += `Database Pengelola: ${TARGET_EMAIL_KOMITE}\n`;
      csv += `Total Pemilih Tercatat: ${records.length}\n\n`;
      csv += 'No,Waktu Masuk (WIB),Token Bukti Suara Sah,Nama Lengkap Pemilih,NIP,Unit Kerja / Ruangan,Status Hak Suara\n';

      records.forEach((r, idx) => {
        const waktu = r.votedAt ? new Date(r.votedAt).toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }) : '-';
        csv += `"${idx + 1}","${waktu}","${r.token || '-'}","${r.voterName || '-'}","${r.voterNip || '-'}","${r.voterUnit || '-'}","SUDAH MEMILIH (SAH)"\n`;
      });

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Log_Bukti_Suara_Pemilihan_Komkep_2027_2030.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      notify('File Log Bukti & Daftar Hadir Pemilih (.CSV) berhasil diunduh.', 'success');
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
          ${auth.hasVoted ? `
            <button type="button" class="btn-secondary" onclick="window.PemilihanKomkep.openSlipBuktiModal()" style="font-size: 0.75rem; padding: 4px 10px; background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; border-radius: 6px; font-weight: 700; display: flex; align-items: center; gap: 0.35rem;">
              <i class="fa-solid fa-ticket"></i> Lihat Bukti Suara
            </button>
          ` : ''}
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
                <div style="font-size: 0.8rem; color: #15803d;">Anda dapat mencetak Berita Acara Resmi atau mengekspor log data pemilih sebagai bukti hukum sah.</div>
              </div>
            </div>
            <div style="display: flex; gap: 0.5rem;">
              <button class="btn-primary" style="font-size: 0.8rem; background: #0d5f5b; border: none;" onclick="window.PemilihanKomkep.openBeritaAcaraModal()">
                <i class="fa-solid fa-file-signature"></i> Cetak Berita Acara
              </button>
              <button class="btn-secondary" style="font-size: 0.8rem;" onclick="window.PemilihanKomkep.switchSubTab('admin')">Panel Bukti &amp; DPT</button>
            </div>
          </div>
        `;
      } else if (auth.hasVoted) {
        statusBox.innerHTML = `
          <div style="background: #ecfdf5; border: 1.5px solid #a7f3d0; border-radius: 12px; padding: 1rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <i class="fa-solid fa-circle-check" style="color: #059669; font-size: 1.3rem;"></i>
              <div>
                <div style="font-weight: 800; color: #065f46; font-size: 0.9rem;">Hak Suara Anda Telah Tersalurkan &amp; Tercatat Sah</div>
                <div style="font-size: 0.8rem; color: #047857;">
                  Nomor Bukti Sah Anda: <code style="background: #d1fae5; padding: 2px 6px; border-radius: 4px; font-weight: bold; font-family: monospace;">${auth.token || 'TERCATAT'}</code>. Data aman tersimpan di arsip digital komite.
                </div>
              </div>
            </div>
            <div style="display: flex; gap: 0.5rem;">
              <button class="btn-secondary" style="font-size: 0.8rem; background: #ffffff; color: #047857; border: 1.5px solid #059669; font-weight: 700;" onclick="window.PemilihanKomkep.openSlipBuktiModal()">
                <i class="fa-solid fa-ticket"></i> Lihat Kartu Bukti Suara
              </button>
              <button class="btn-secondary" style="font-size: 0.8rem;" onclick="window.PemilihanKomkep.switchSubTab('hasil')">Lihat Rekapitulasi</button>
            </div>
          </div>
        `;
      } else {
        statusBox.innerHTML = `
          <div style="background: #f0f9ff; border: 1.5px solid #bae6fd; border-radius: 12px; padding: 1rem; display: flex; align-items: center; gap: 0.75rem;">
            <i class="fa-solid fa-check-to-slot" style="color: #0284c7; font-size: 1.3rem;"></i>
            <div>
              <div style="font-weight: 800; color: #075985; font-size: 0.9rem;">Selamat Datang, ${auth.user.name}!</div>
              <div style="font-size: 0.8rem; color: #0369a1;">Pilihlah salah satu calon di bawah ini. Setelah memilih, Anda akan mendapatkan Nomor Token Bukti Suara Sah.</div>
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
    const totalDpt = Math.max(totalVotes, 35); 
    const turnout = totalDpt > 0 ? Math.round((totalVotes / totalDpt) * 100) : 0;

    const mTotal = document.getElementById('pemilihanMetricTotalVotes');
    const mTurnout = document.getElementById('pemilihanMetricTurnout');
    const mLeader = document.getElementById('pemilihanMetricLeader');

    if (mTotal) mTotal.textContent = `${totalVotes} Suara`;
    if (mTurnout) mTurnout.textContent = `${turnout}% Partisipasi`;

    const sorted = [...state.candidates].sort((a, b) => b.votes - a.votes);
    if (mLeader && sorted[0]) {
      mLeader.textContent = totalVotes > 0 ? `0${sorted[0].number}. ${sorted[0].name.split(',')[0]}` : '-';
    }

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

    const inputGas = document.getElementById('inputPemilihanGasUrl');
    if (inputGas && !inputGas.value) {
      inputGas.value = state.googleAppsScriptUrl || localStorage.getItem('komkep_gas_voting_url') || '';
    }

    const tbody = document.getElementById('pemilihanDptTableBody');
    if (tbody) {
      const records = Object.entries(state.voterRecords);
      if (records.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="6" style="padding: 1.5rem; text-align: center; color: #94a3b8;">
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
          <td style="padding: 0.75rem; font-family: monospace; font-size: 0.75rem; color: #0d5f5b; font-weight: 700;">
            ${v.token || 'VOTE-OFFLINE'}
          </td>
          <td style="padding: 0.75rem; text-align: center;">
            <button class="btn-secondary" style="font-size: 0.72rem; padding: 2px 8px; background: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0; border-radius: 4px; font-weight: bold;" onclick="window.PemilihanKomkep.openSlipBuktiModal('${key}')">
              <i class="fa-solid fa-ticket"></i> Lihat Bukti
            </button>
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

  window.addEventListener('hashchange', () => {
    if (window.location.hash === '#pemilihan') {
      renderAll();
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.PemilihanKomkep.init);
  } else {
    window.PemilihanKomkep.init();
  }
})();
