/**
 * ============================================================================
 * KONFIGURASI PUBLIK PORTAL & E-VOTING KOMITE KEPERAWATAN RSUD dr. SOEDARSO
 * ============================================================================
 * Catatan:
 * - File ini dimuat oleh seluruh peramban pemilih (bukan di localStorage admin).
 * - URL Web App Google Apps Script (/exec) tidak bersifat rahasia; keamanan
 *   dijaga di sisi server (validasi token sesi, rate-limit, dan kunci waktu).
 * - Setelah Anda selesai men-deploy Apps Script dan menempelkan URL /exec,
 *   isi GAS_EXEC_URL di bawah ini dengan URL tersebut.
 * ============================================================================
 */
(function (window) {
  'use strict';

  window.KOMKEP_CONFIG = {
    // Tempel URL Web App Google Apps Script yang berakhiran /exec di sini:
    GAS_EXEC_URL: '',

    // Jadwal Resmi Simulasi (Zona Waktu Asia/Jakarta, UTC+7)
    // Sumber kebenaran tetap berada di server Apps Script (Script Properties).
    WAKTU_BUKA_DEFAULT: '2026-11-23T10:00:00+07:00',
    WAKTU_TUTUP_DEFAULT: '2026-11-24T10:00:00+07:00',

    // Label wajib simulasi
    LABEL_SIMULASI: 'PERCOBAAN / SIMULASI - HASIL TIDAK MENGIKAT'
  };
})(window);
