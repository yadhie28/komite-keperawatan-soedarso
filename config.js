/**
 * ============================================================================
 * KONFIGURASI PUBLIK PORTAL & E-VOTING KOMITE KEPERAWATAN RSUD dr. SOEDARSO
 * ============================================================================
 * - File ini dimuat oleh seluruh peramban pemilih.
 * - Agar suara dari SEMUA HP / laptop masuk ke 1 kotak suara pusat,
 *   isi GAS_EXEC_URL di bawah dengan URL Web App Google Apps Script (/exec).
 * ============================================================================
 */
(function (window) {
  'use strict';

  window.KOMKEP_CONFIG = {
    // Tempel URL Web App Google Apps Script yang berakhiran /exec di sini:
    GAS_EXEC_URL: 'https://script.google.com/macros/s/AKfycbzglms4tYovrpOL0256Iu9hDMBSI824UrMtmrraAExt13GVyEBfY6BNWNszxnD_HPQX/exec',

    // Jadwal Resmi Simulasi Tahap 2 (Zona Waktu Asia/Jakarta, UTC+7 — Diperpanjang)
    WAKTU_BUKA_DEFAULT: '2026-11-24T09:00:00+07:00',
    WAKTU_TUTUP_DEFAULT: '2026-11-26T23:59:59+07:00',

    // Label wajib simulasi
    LABEL_SIMULASI: 'SIMULASI PEMILIHAN TAHAP 2 — HASIL TIDAK MENGIKAT'
  };
})(window);
