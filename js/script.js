// js/script.js

// -- Inisialisasi Data (Persistent Register) --
if (localStorage.getItem("savedUsers")) {
  dataPengguna = JSON.parse(localStorage.getItem("savedUsers"));
}

// -- A. Fitur Login & Logout --
function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  const user = dataPengguna.find(
    (u) => u.email === email && u.password === pass,
  );
  if (user) {
    localStorage.setItem("userLogin", JSON.stringify(user));
    window.location.href = "dashboard.html";
  } else {
    alert("Email/password yang Anda masukkan salah"); // Kriteria OFL.md
  }
}

function handleLogout() {
  localStorage.removeItem("userLogin");
  window.location.href = "login.html";
}

// -- B. Fitur Registrasi (DOM) --
function handleRegister(event) {
  event.preventDefault();
  const nama = document.getElementById("regNama").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  if (dataPengguna.find((u) => u.email === email)) {
    alert("Email sudah terdaftar!");
    return;
  }

  dataPengguna.push({
    id: dataPengguna.length + 1,
    nama,
    email,
    password,
    role: "User",
  });
  localStorage.setItem("savedUsers", JSON.stringify(dataPengguna));
  alert("Pendaftaran akun toko buku berhasil! Silakan login.");
  event.target.reset();
  closeModal("modalDaftar");
}

// -- Kontrol Modal --
const openModal = (id) => (document.getElementById(id).style.display = "block");
const closeModal = (id) => (document.getElementById(id).style.display = "none");

// -- C. Dashboard: Greeting DOM Berdasarkan Waktu Lokal & User Login --
function setGreeting() {
  const nameEl = document.getElementById("greetingName");
  if (!nameEl) return;

  const user = JSON.parse(localStorage.getItem("userLogin")) || {
    nama: "Pelanggan",
  };
  nameEl.innerText = user.nama;

  // --- Tambahkan logika waktu lokal di sini ---
  const now = new Date();
  const hours = now.getHours();
  let greetingText = "Selamat Datang";

  if (hours >= 4 && hours < 11) {
    greetingText = "Good Morning";
  } else if (hours >= 11 && hours < 15) {
    greetingText = "Good Afternoon";
  } else if (hours >= 15 && hours < 18) {
    greetingText = "Good Evening";
  } else {
    greetingText = "Good Night";
  }

  const headingEl = document.querySelector(".dash-text h1");
  if (headingEl) {
    headingEl.innerHTML = `${greetingText},<br /><span id="greetingName">${user.nama}</span>`;
  }
}

// -- D. Stok & Katalog Toko (Manipulasi Tabel) --
function formatRupiah(angka) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(angka);
}

function renderStok() {
  const tbody = document.getElementById("tabelKatalog");
  if (!tbody) return;
  tbody.innerHTML = "";

  dataKatalogBuku.forEach((buku) => {
    // Manipulasi DOM Render dari data.js
    tbody.innerHTML += `
            <tr>
                <td style="font-weight: 500;">${buku.kodeBarang}</td>
                <td>
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <img src="${buku.cover}" alt="${buku.namaBarang}" width="50" style="border-radius: 4px;">
                        <span>${buku.namaBarang} <br><small style="color:gray;">Ed. ${buku.edisi}</small></span>
                    </div>
                </td>
                <td>${formatRupiah(buku.harga)}</td>
                <td><span style="background:#dcfce7; padding:2px 8px; border-radius:12px; font-size:0.8rem; color:#166534;">${buku.stok} Tersedia</span></td>
            </tr>`;
  });
}

function tambahBukuBaru(event) {
  event.preventDefault();
  const tbody = document.getElementById("tabelKatalog");
  const nama = document.getElementById("namaBuku").value;
  const harga = document.getElementById("hargaBuku").value;

  // Fitur Menambahkan Baris Baru (Kriteria OFL.md)
  const tr = document.createElement("tr");
  tr.innerHTML = `
        <td style="font-weight: 500;">NEW-${Math.floor(Math.random() * 1000)}</td>
        <td>
            <div style="display: flex; align-items: center; gap: 1rem;">
                <img src="img/buku1.png" alt="Buku Baru" width="50" style="border-radius: 4px;">
                <span>${nama}</span>
            </div>
        </td>
        <td>${formatRupiah(harga)}</td>
        <td><span style="background:#fef9c3; padding:2px 8px; border-radius:12px; font-size:0.8rem; color:#a16207;">Baru Masuk</span></td>
    `;
  tbody.insertBefore(tr, tbody.firstChild);
  event.target.reset();
}

// -- E. Tracking Pengiriman (Simulasi Progress) --
function cariResi() {
  const noDO = document.getElementById("inputDO").value;
  const hasil = document.getElementById("hasilTracking");
  const data = dataTracking[noDO];

  if (data) {
    const persen = data.status === "Dikirim" ? "100%" : "50%";
    const warna = data.status === "Dikirim" ? "#10b981" : "#f59e0b"; // Hijau / Kuning

    let html = `
            <div class="card" style="margin-top: 1rem; border-top: 4px solid ${warna};">
                <h3>Pesanan: ${data.nama}</h3>
                <p style="color:gray; font-size:0.9rem;">Status: <strong>${data.status}</strong> | Ekspedisi: ${data.ekspedisi}</p>
                
                <!-- Progress Bar Simulasi -->
                <div style="width: 100%; height: 10px; background: #e5e7eb; border-radius: 5px; margin: 1rem 0;">
                    <div style="width: ${persen}; height: 100%; background: ${warna}; border-radius: 5px; transition: width 0.5s;"></div>
                </div>

                <ul style="list-style: none; margin-top: 1rem;">`;

    data.perjalanan.forEach((p) => {
      html += `<li style="padding: 0.5rem 0; border-bottom: 1px dashed #e5e7eb;">
                        <span style="color:var(--primary); font-size:0.85rem;">${p.waktu}</span><br>${p.keterangan}
                     </li>`;
    });
    html += `</ul></div>`;
    hasil.innerHTML = html;
  } else {
    hasil.innerHTML = `<div class="card" style="color:red; text-align:center;">Nomor DO tidak ditemukan dalam sistem toko.</div>`;
  }
}

window.onload = () => {
  setGreeting();
  renderStok();
  initBukuBergerak();
};

// -- F. Fitur Buku Bergerak di Dashboard (Showcase 1 Detik) --
let indeksBukuSaatIni = 0;
let intervalBuku;

function initBukuBergerak() {
  const showcaseEl = document.getElementById("bookShowcase");
  // Cek apakah elemen ada (agar tidak error di halaman lain)
  if (!showcaseEl) return;

  function gantiBuku() {
    // Ambil data buku berdasarkan indeks saat ini
    const buku = dataKatalogBuku[indeksBukuSaatIni];

    // Efek menghilang (fade-out)
    showcaseEl.style.opacity = 0;

    setTimeout(() => {
      // Suntikkan gambar tanpa judul teks
      showcaseEl.innerHTML = `
          <img src="${buku.cover}" alt="Buku" style="width: 220px; height: 300px; object-fit: cover; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
      `;
      // Simpan kode barang di elemen agar bisa dibaca saat diklik
      showcaseEl.dataset.kode = buku.kodeBarang;

      // Efek muncul (fade-in)
      showcaseEl.style.opacity = 1;

      // Naikkan indeks, jika mentok kembali ke 0
      indeksBukuSaatIni = (indeksBukuSaatIni + 1) % dataKatalogBuku.length;
    }, 200); // Jeda transisi CSS
  }

  // Jalankan fungsi pertama kali
  gantiBuku();

  // Ulangi fungsi setiap 1 detik (1000 milidetik)
  intervalBuku = setInterval(gantiBuku, 5000);

  // [Opsional] Hentikan pergerakan saat di-hover agar mudah diklik
  showcaseEl.onmouseenter = () => clearInterval(intervalBuku);
  showcaseEl.onmouseleave = () => (intervalBuku = setInterval(gantiBuku, 1000));
}

// Fungsi membuka modal jika buku di-klik
function bukaDetailBuku() {
  const showcaseEl = document.getElementById("bookShowcase");
  const kode = showcaseEl.dataset.kode;

  // Cari data lengkap buku berdasarkan kode
  const buku = dataKatalogBuku.find((b) => b.kodeBarang === kode);

  if (buku) {
    const isiDetail = document.getElementById("isiDetailBuku");

    // Menyuntikkan struktur HTML 2 kolom (Kiri: Gambar, Kanan: Teks) menggunakan Flexbox
    isiDetail.innerHTML = `
            <div style="display: flex; gap: 2.5rem; align-items: flex-start; text-align: left;">
                
                <!-- KOLOM KIRI: Gambar Buku -->
                <div style="flex-shrink: 0;">
                    <img src="${buku.cover}" alt="Cover ${buku.namaBarang}" style="width: 200px; height: 280px; object-fit: cover; border-radius: 8px; box-shadow: 0 6px 12px rgba(0,0,0,0.1);">
                </div>
                
                <!-- KOLOM KANAN: Detail Informasi -->
                <div style="display: flex; flex-direction: column; justify-content: flex-start; padding-top: 0.5rem;">
                    
                    <!-- Judul Buku -->
                    <h2 style="color: var(--text-dark); margin-bottom: 0.75rem; font-size: 1.6rem; line-height: 1.3;">
                        ${buku.namaBarang}
                    </h2>
                    
                    <!-- Penjelasan Terkait Buku -->
                    <p style="color: var(--text-muted); margin-bottom: 2rem; font-size: 0.95rem; line-height: 1.6;">
                        <strong>Kategori:</strong> ${buku.jenisBarang} (Edisi ${buku.edisi})<br>
                        Buku ini merupakan referensi literatur resmi yang tersedia di inventaris toko kami untuk menunjang kebutuhan akademik Anda.
                    </p>
                    
                    <!-- Harga -->
                    <h3 style="color: var(--primary); margin-bottom: 2rem; font-size: 1.4rem;">
                        ${formatRupiah(buku.harga)}
                    </h3>
                    
                    <!-- Stok -->
                    <div style="background: #dcfce7; color: #166534; padding: 0.6rem 1.2rem; border-radius: 8px; font-weight: 600; display: inline-block; width: fit-content;">
                        Sisa Stok: ${buku.stok} Pcs
                    </div>
                    
                </div>
            </div>
        `;

    openModal("modalDetailBuku");
  }
}

// -- G. Fitur Keranjang Belanja & Struk Pembayaran --

// Simulasi keranjang awal (Default isi 2 buku pertama)
let keranjangBelanja = [
  {
    kodeBarang: dataKatalogBuku[0].kodeBarang,
    namaBarang: dataKatalogBuku[0].namaBarang,
    harga: dataKatalogBuku[0].harga,
    jumlah: 1,
  },
  {
    kodeBarang: dataKatalogBuku[1].kodeBarang,
    namaBarang: dataKatalogBuku[1].namaBarang,
    harga: dataKatalogBuku[1].harga,
    jumlah: 1,
  },
];

function renderKeranjang() {
  const tbody = document.getElementById("tabelKeranjang");
  const selectPilih = document.getElementById("pilihBukuTambah");
  if (!tbody) return;

  // 1. Render dropdown pilihan buku untuk ditambah
  if (selectPilih) {
    selectPilih.innerHTML = `<option value="">-- Pilih Buku Lain --</option>`;
    dataKatalogBuku.forEach((b) => {
      selectPilih.innerHTML += `<option value="${b.kodeBarang}">${b.namaBarang} - ${formatRupiah(b.harga)}</option>`;
    });
  }

  // 2. Render isi tabel keranjang
  tbody.innerHTML = "";
  if (keranjangBelanja.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:var(--text-muted);">Keranjang belanja kosong.</td></tr>`;
    updateRingkasan(0, 0);
    return;
  }

  let subtotal = 0;
  let totalItem = 0;

  keranjangBelanja.forEach((item, index) => {
    let totalItemHarga = item.harga * item.jumlah;
    subtotal += totalItemHarga;
    totalItem += item.jumlah;

    tbody.innerHTML += `
            <tr>
                <td><strong>${item.namaBarang}</strong></td>
                <td>${formatRupiah(item.harga)}</td>
                <td>
                    <input type="number" min="1" value="${item.jumlah}" onchange="ubahJumlah(${index}, this.value)" style="width: 60px; padding: 4px; margin-bottom: 0;">
                </td>
                <td>
                    <button type="button" class="btn-danger" onclick="hapusItemKeranjang(${index})">Hapus</button>
                </td>
            </tr>
        `;
  });

  updateRingkasan(subtotal, totalItem);
}

function tambahItemKeKeranjang() {
  const selectPilih = document.getElementById("pilihBukuTambah");
  const kode = selectPilih.value;
  if (!kode) {
    alert("Silakan pilih buku terlebih dahulu!");
    return;
  }

  const bukuData = dataKatalogBuku.find((b) => b.kodeBarang === kode);
  const itemAda = keranjangBelanja.find((item) => item.kodeBarang === kode);

  if (itemAda) {
    itemAda.jumlah += 1;
  } else {
    keranjangBelanja.push({
      kodeBarang: bukuData.kodeBarang,
      namaBarang: bukuData.namaBarang,
      harga: bukuData.harga,
      jumlah: 1,
    });
  }
  renderKeranjang();
}

function hapusItemKeranjang(index) {
  keranjangBelanja.splice(index, 1);
  renderKeranjang();
}

function ubahJumlah(index, nilai) {
  let jml = parseInt(nilai);
  if (jml < 1) jml = 1;
  keranjangBelanja[index].jumlah = jml;
  renderKeranjang();
}

function updateRingkasan(subtotal, totalItem) {
  const ongkir = subtotal > 0 ? 15000 : 0;
  const totalTagihan = subtotal + ongkir;

  document.getElementById("summaryTotalItem").innerText = `${totalItem} Buku`;
  document.getElementById("summarySubtotal").innerText = formatRupiah(subtotal);
  document.getElementById("summaryTotalTagihan").innerText =
    formatRupiah(totalTagihan);
}

// Fitur Proses Pembayaran & Cetak Struk
function prosesPembayaran(event) {
  event.preventDefault();

  if (keranjangBelanja.length === 0) {
    alert("Keranjang belanja Anda masih kosong!");
    return;
  }

  const nama = document.getElementById("namaPenerima").value;
  const alamat = document.getElementById("alamatPenerima").value;
  const metode = document.getElementById("metodeBayar").value;

  let subtotal = keranjangBelanja.reduce(
    (sum, item) => sum + item.harga * item.jumlah,
    0,
  );
  let ongkir = 15000;
  let totalTagihan = subtotal + ongkir;
  let tanggalWaktu = new Date().toLocaleString("id-ID");
  let nomorResiDO = "DO-" + Math.floor(100000 + Math.random() * 900000);

  // Sembunyikan form checkout, tampilkan struk
  document.getElementById("checkoutLayout").style.display = "none";

  const areaStruk = document.getElementById("areaStruk");
  areaStruk.style.display = "block";

  let htmlStruk = `
        <div class="card receipt-box">
            <div class="receipt-header">
                <h2>JUN'S BOOKSTORE</h2>
                <p style="font-size:0.8rem; color:gray;">Bukti Pemesanan Resmi Toko Buku Online</p>
                <hr style="border: dashed 1px #ccc; margin: 10px 0;">
            </div>
            
            <div class="receipt-row"><span>No. DO / Resi:</span> <strong>${nomorResiDO}</strong></div>
            <div class="receipt-row"><span>Tanggal:</span> <span>${tanggalWaktu}</span></div>
            <div class="receipt-row"><span>Penerima:</span> <span>${nama}</span></div>
            <div class="receipt-row"><span>Alamat:</span> <span style="text-align:right; max-width:250px;">${alamat}</span></div>
            <div class="receipt-row"><span>Pembayaran:</span> <span>${metode}</span></div>

            <hr style="border: dashed 1px #ccc; margin: 10px 0;">
            <p style="font-weight:bold; margin-bottom:5px; font-size:0.9rem;">Daftar Buku:</p>
    `;

  keranjangBelanja.forEach((item) => {
    htmlStruk += `
            <div class="receipt-row" style="font-size:0.85rem;">
                <span>${item.namaBarang} (x${item.jumlah})</span>
                <span>${formatRupiah(item.harga * item.jumlah)}</span>
            </div>
        `;
  });

  htmlStruk += `
            <hr style="border: dashed 1px #ccc; margin: 10px 0;">
            <div class="receipt-row"><span>Subtotal:</span> <span>${formatRupiah(subtotal)}</span></div>
            <div class="receipt-row"><span>Ongkir:</span> <span>${formatRupiah(ongkir)}</span></div>
            <div class="receipt-row" style="font-weight:bold; font-size:1.1rem; margin-top:5px;">
                <span>Total Tagihan:</span> <span>${formatRupiah(totalTagihan)}</span>
            </div>
            
            <hr style="border: dashed 1px #ccc; margin: 15px 0;">
            <div style="text-align: center; font-size: 0.8rem; color: gray;">
                <p>Terima kasih telah berbelanja di Jun's Bookstore!</p>
                <button class="btn" onclick="window.location.href='dashboard.html'" style="margin-top: 15px; width: 100%;">Kembali ke Beranda</button>
            </div>
        </div>
    `;

  areaStruk.innerHTML = htmlStruk;
}

// Jalankan render keranjang saat halaman checkout dimuat
window.addEventListener("DOMContentLoaded", () => {
  renderKeranjang();
});
