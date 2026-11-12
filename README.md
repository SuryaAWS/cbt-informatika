# CBT Informatika — SMP Negeri 1 Kanor

Starter tahap pertama: login Firebase Authentication dan pengalihan dashboard berdasarkan profil Firestore.

## Struktur data profil pengguna
Buat dokumen `users/{UID}` di Firestore dengan field:
- `role`: `"admin"` atau `"siswa"`
- `nama`: nama lengkap (opsional untuk tahap awal)

UID didapat dari Firebase Authentication setelah akun dibuat.

## Menjalankan
Karena menggunakan JavaScript module, jalankan melalui web server (bukan membuka file HTML langsung). Untuk uji lokal dapat memakai ekstensi Live Server atau `npx http-server`.

## Deploy GitHub Pages
1. Unggah seluruh isi folder ke root repository.
2. GitHub → Settings → Pages.
3. Pada Build and deployment pilih Deploy from a branch.
4. Branch `main`, folder `/(root)`, lalu Save.
5. Tunggu URL Pages aktif.

## Catatan keamanan penting
- Firebase web apiKey bukan password dan memang tampil di frontend.
- Batasi Authorized domains pada Firebase Authentication ke domain GitHub Pages yang dipakai.
- Jangan gunakan Firestore Rules terbuka (`allow read, write: if true`).
- Sebelum uji siswa, pasang Firestore Security Rules yang membatasi akses berdasarkan UID dan role.
- Jangan masukkan password, service account key, atau private key ke repository.

## Tahap berikutnya
Tambahkan pembuatan akun massal, profil siswa, dashboard admin, bank soal, jadwal ujian, penyimpanan jawaban, dan ekspor hasil untuk penilaian offline.
