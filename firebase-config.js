/**
 * ============================================================
 *  FIREBASE CONFIGURATION
 *  Portal E-Kredensial – Komite Keperawatan RSUD dr. Soedarso
 * ============================================================
 *  LANGKAH SETUP (isi dari Firebase Console → Project Settings):
 *  1. Buka https://console.firebase.google.com
 *  2. Buat project baru: "komite-keperawatan-soedarso"
 *  3. Tambahkan Web App (</> icon)
 *  4. Salin config di bawah ini dan ganti nilainya
 *  5. Aktifkan: Authentication > Email/Password
 *  6. Aktifkan: Firestore Database (mode production / test)
 * ============================================================
 */

const FIREBASE_CONFIG = {
  apiKey:            "GANTI_DENGAN_API_KEY_ANDA",
  authDomain:        "komite-keperawatan-soedarso.firebaseapp.com",
  projectId:         "komite-keperawatan-soedarso",
  storageBucket:     "komite-keperawatan-soedarso.appspot.com",
  messagingSenderId: "GANTI_DENGAN_SENDER_ID",
  appId:             "GANTI_DENGAN_APP_ID"
};

window.FIREBASE_CONFIG = FIREBASE_CONFIG;
