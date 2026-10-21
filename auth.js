/**
 * ============================================================
 *  AUTH.JS – Firebase Authentication Handler
 *  Portal E-Kredensial Komite Keperawatan RSUD dr. Soedarso
 *  4 ROLE: perawat | subkomite | ketua | admin
 * ============================================================
 */

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  serverTimestamp
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

// ─── Inisialisasi Firebase ───────────────────────────────────────────────────
const cfg = window.FIREBASE_CONFIG;
const app = initializeApp(cfg);
const auth = getAuth(app);
const db   = getFirestore(app);

window.__firebaseAuth = auth;
window.__firebaseDb   = db;

// ─── State Auth Global ───────────────────────────────────────────────────────
window.authState = {
  user:    null,   // Firebase Auth user object
  profile: null,   // Firestore /users/{uid} document
  loading: true
};

// ─── Helper: Role → Dashboard URL ───────────────────────────────────────────
function getDashboardUrl(role) {
  switch (role) {
    case 'admin':      return 'dashboard-admin.html';
    case 'subkomite':  return 'dashboard-subkomite.html';
    case 'ketua':      return 'dashboard-ketua.html';
    case 'perawat':
    default:           return 'dashboard-perawat.html';
  }
}

// ─── Auth State Listener ─────────────────────────────────────────────────────
onAuthStateChanged(auth, async (user) => {
  window.authState.loading = false;
  if (user) {
    // Ambil profil dari Firestore
    try {
      const snap = await getDoc(doc(db, 'users', user.uid));
      if (snap.exists()) {
        window.authState.user    = user;
        window.authState.profile = snap.data();
        // Update last login
        await updateDoc(doc(db, 'users', user.uid), { lastLogin: serverTimestamp() });
      } else {
        // User ada di Auth tapi tidak ada profil Firestore → paksa logout
        await signOut(auth);
        window.authState.user    = null;
        window.authState.profile = null;
      }
    } catch (err) {
      console.error('Gagal membaca profil pengguna:', err);
    }
  } else {
    window.authState.user    = null;
    window.authState.profile = null;
  }
  // Panggil callback jika ada
  if (typeof window.onAuthReady === 'function') {
    window.onAuthReady(window.authState);
  }
});

// ─── Login ───────────────────────────────────────────────────────────────────
window.loginWithNip = async function(nip, password) {
  // NIP digunakan sebagai username, email dibentuk: nip@kredensial.rsdsoedarso.id
  const email = `${nip.replace(/\s+/g, '')}@kredensial.rsdsoedarso.id`;
  return signInWithEmailAndPassword(auth, email, password);
};

// ─── Logout ──────────────────────────────────────────────────────────────────
window.logoutFirebase = async function() {
  await signOut(auth);
  window.location.href = 'login.html';
};

// ─── Ganti Password (pertama kali login) ─────────────────────────────────────
window.changeFirstPassword = async function(currentPass, newPass) {
  const user = auth.currentUser;
  if (!user) throw new Error('Tidak ada sesi aktif');
  const cred = EmailAuthProvider.credential(user.email, currentPass);
  await reauthenticateWithCredential(user, cred);
  await updatePassword(user, newPass);
  // Tandai bahwa sudah ganti password
  await updateDoc(doc(db, 'users', user.uid), { mustChangePassword: false });
};

// ─── Cek apakah halaman butuh auth & redirect ────────────────────────────────
window.requireAuth = function(allowedRoles) {
  window.onAuthReady = function(state) {
    if (!state.user) {
      window.location.href = 'login.html';
      return;
    }
    if (allowedRoles && !allowedRoles.includes(state.profile?.role)) {
      window.location.href = getDashboardUrl(state.profile?.role);
      return;
    }
  };
};

// ─── Ekspor Firestore helpers ─────────────────────────────────────────────────
window.db = db;
window.auth = auth;
window.firestoreHelpers = {
  addDoc, updateDoc, getDocs, getDoc, doc, collection, query, where, serverTimestamp
};

console.log('[auth.js] Firebase Auth + Firestore siap.');
