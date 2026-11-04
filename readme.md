# Jun's Bookstore (Frontend Web Application)
link youtube: https://youtu.be/GOURq-pl-LY

Aplikasi web frontend e-commerce toko buku interaktif yang dirancang menggunakan **HTML Semantik**, **CSS Modern (Modular/Variables)**, dan **JavaScript (DOM Manipulation & LocalStorage)**. Proyek ini dikembangkan dengan pendekatan *Single-Page Application (SPA) feel* melalui navigasi antar halaman, manajemen keranjang belanja interaktif, sistem autentikasi pengguna lokal, katalog buku dinamis, serta simulasi pelacakan pengiriman (tracking).

---

## Struktur File Proyek

```text
├── index.html            # Halaman landing page utama
├── login.html            # Halaman autentikasi (Login & Pendaftaran)
├── dashboard.html        # Beranda/Dashboard utama user dengan sapaan & showcase buku
├── stok.html             # Halaman katalog dan manajemen stok buku (Admin/User)
├── checkout.html         # Halaman keranjang belanja, form pengiriman & struk pembayaran
├── tracking.html         # Halaman pelacakan paket berdasarkan nomor resi/DO
├── css/
│   └── style.css         # Styling global, CSS variables, layout, grid, dan komponen
├── js/
│   ├── data.js           # Penyimpanan data statis (Users, Katalog Buku, Data Tracking)
│   └── script.js         # Logika interaktif DOM, autentikasi, keranjang, dan animasi
└── img/
    ├── kepemimpinan.jpg
    ├── managemen_keuangan.jpg
    ├── mikrobiologi.jpg
    ├── paud_perkembangan.jpg
    └── pengantar_komunikasi.jpg
```

---

## Fitur Utama

1. **Autentikasi Pengguna & Sesi Lokal:**
   - Validasi login menggunakan data pengguna tersimpan.
   - Fitur Pendaftaran akun baru yang langsung tersimpan secara persisten melalui `localStorage`.
   - Sapaan dinamis (*greeting*) di dashboard yang menyesuaikan waktu lokal perangkat (Good Morning/Afternoon/Evening/Night) dan nama pengguna yang sedang login.

2. **Katalog Buku & Showcase Interaktif:**
   - Menampilkan daftar inventaris buku lengkap dengan cover, harga (format IDR), edisi, dan stok.
   - Fitur *Buku Bergerak* (otomatis berganti setiap 5 detik dengan efek *fade-in/fade-out*) di halaman dashboard.
   - Modal detail buku interaktif yang mendetailkan informasi literatur ketika cover buku diklik.
   - Kemampuan menambah data buku baru langsung ke tabel katalog secara dinamis (*DOM manipulation*).

3. **Keranjang Belanja & Pembayaran (Checkout):**
   - Penambahan item buku secara fleksibel melalui dropdown pilihan katalog.
   - Pengaturan kuantitas barang secara *real-time* dengan perhitungan otomatis subtotal, ongkir tetap, dan total tagihan.
   - Pemrosesan pembayaran yang menghasilkan **Struk Digital** berformat khusus layaknya nota kasir resmi.

4. **Pelacakan Pengiriman (Tracking):**
   - Masukkan Nomor Resi / Delivery Order (contoh: `20230012` atau `20230013`) untuk memantau status pengiriman paket.
   - Visualisasi progress bar dinamis beserta linimasa riwayat perjalanan paket.

---

## Teknologi yang Digunakan

- **HTML5:** Menggunakan tag semantik (`<header>`, `<nav>`, `<main>`, `<section>`, `<aside>`) untuk aksesibilitas dan struktur dokumen yang bersih.
- **CSS3:** Menggunakan CSS Grid & Flexbox, Google Fonts (*Poppins*), Custom Properties (`:root`), serta animasi keyframes (`slideDown`, `fade-transition`).
- **JavaScript (ES6+):** Manajemen state lokal (`localStorage`), manipulasi DOM asinkron/sinkron, array manipulation methods (`find`, `reduce`, `forEach`), serta event handling.

---

## Cara Menjalankan Proyek

1. Unduh atau clone seluruh repositori file ke dalam satu folder lokal yang sama.
2. Pastikan struktur folder `css/`, `js/`, dan `img/` berada sejajar dengan file-file `.html`.
3. Buka file **`index.html`** melalui browser web modern (Chrome, Edge, Firefox, Safari).
4. Klik tombol "Masuk ke Toko", gunakan akun default (misal: `sekitanijun@gmail.com` / `123`) atau buat akun baru melalui menu *Daftar Baru*.
