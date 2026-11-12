import { auth, db } from "./firebase.js";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const form = document.querySelector("#login-form");
const message = document.querySelector("#login-message");
const button = document.querySelector("#login-button");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  message.textContent = "";
  button.disabled = true;
  button.textContent = "Memeriksa...";
  try {
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value;
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const profile = await getDoc(doc(db, "users", credential.user.uid));

    if (!profile.exists()) {
      await signOut(auth);
      throw new Error("Profil pengguna belum terdaftar. Hubungi administrator.");
    }

    const role = profile.data().role;
    if (role === "admin") {
      location.href = "admin.html";
    } else if (role === "siswa") {
      location.href = "siswa.html";
    } else {
      await signOut(auth);
      throw new Error("Peran akun tidak valid. Hubungi administrator.");
    }
  } catch (error) {
    message.textContent = friendlyError(error);
  } finally {
    button.disabled = false;
    button.textContent = "Masuk";
  }
});

function friendlyError(error) {
  const code = error?.code || "";
  if (code === "auth/invalid-credential" || code === "auth/wrong-password" || code === "auth/user-not-found") {
    return "Email atau password tidak sesuai.";
  }
  if (code === "auth/too-many-requests") return "Terlalu banyak percobaan. Coba lagi nanti.";
  return error?.message || "Login gagal. Periksa koneksi internet.";
}

onAuthStateChanged(auth, async (user) => {
  if (!user) return;
  // Pengguna yang sudah login diarahkan sesuai profil Firestore.
  try {
    const profile = await getDoc(doc(db, "users", user.uid));
    if (!profile.exists()) return;
    const role = profile.data().role;
    if (role === "admin") location.replace("admin.html");
    if (role === "siswa") location.replace("siswa.html");
  } catch (_) {
    // Jika profil tidak dapat dibaca, biarkan form menampilkan pesan saat login.
  }
});
