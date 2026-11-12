import { auth, db } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const expectedRole = location.pathname.endsWith("admin.html") ? "admin" : "siswa";
const info = document.querySelector("#user-info");
document.querySelector("#logout").addEventListener("click", async () => {
  await signOut(auth);
  location.replace("index.html");
});

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    location.replace("index.html");
    return;
  }
  try {
    const snap = await getDoc(doc(db, "users", user.uid));
    if (!snap.exists() || snap.data().role !== expectedRole) {
      await signOut(auth);
      location.replace("index.html");
      return;
    }
    info.textContent = `Login sebagai ${user.email || "pengguna"}`;
  } catch (error) {
    info.textContent = "Tidak dapat memverifikasi profil. Periksa koneksi dan aturan Firestore.";
  }
});
