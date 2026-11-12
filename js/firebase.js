// Konfigurasi Firebase web. Firebase apiKey adalah identifier publik, bukan password.
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBa4dpL4iY1dyvKaSwtGnjoLs1mi4IMKHk",
  authDomain: "cbt-informatika-ac0ae.firebaseapp.com",
  projectId: "cbt-informatika-ac0ae",
  storageBucket: "cbt-informatika-ac0ae.firebasestorage.app",
  messagingSenderId: "21240865535",
  appId: "1:21240865535:web:66ee678ce228dc6ed2a2ca"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
