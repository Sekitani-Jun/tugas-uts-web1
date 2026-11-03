// js/data.js
var dataPengguna = [
  {
    id: 1,
    nama: "Sekitani Jun",
    email: "sekitanijun@gmail.com",
    password: "123",
    role: "admin",
  },
  {
    id: 2,
    nama: "Rina Wulandari",
    email: "rina@gmail.com",
    password: "rina123",
    role: "User",
  },
  {
    id: 3,
    nama: "Agus Pranoto",
    email: "agus@gmail.com",
    password: "agus123",
    role: "User",
  },
  {
    id: 4,
    nama: "Siti Marlina",
    email: "siti@gmail.com",
    password: "siti123",
    role: "Admin",
  },
];

var dataKatalogBuku = [
  {
    kodeBarang: "EKMA4310",
    namaBarang: "Kepemimpinan",
    jenisBarang: "Buku Ajar",
    edisi: "2",
    stok: 548,
    harga: 180000,
    cover: "img/kepemimpinan.jpg",
  },
  {
    kodeBarang: "EKMA4002",
    namaBarang: "Manajemen Keuangan",
    jenisBarang: "Buku Ajar",
    edisi: "3",
    stok: 392,
    harga: 220000,
    cover: "img/manajemen_keuangan.jpg",
  },
  {
    kodeBarang: "BIOL4211",
    namaBarang: "Mikrobiologi",
    jenisBarang: "Buku Ajar",
    edisi: "1",
    stok: 278,
    harga: 150000,
    cover: "img/mikrobiologi.jpg",
  },
  {
    kodeBarang: "PAUD4401",
    namaBarang: "Paud Perkembangan",
    jenisBarang: "Buku Ajar",
    edisi: "2",
    stok: 165,
    harga: 200000,
    cover: "img/paud_perkembangan.jpg",
  },
  {
    kodeBarang: "ASIP4301",
    namaBarang: "Pengantar Komunikasi",
    jenisBarang: "Buku Ajar",
    edisi: "4",
    stok: 204,
    harga: 250000,
    cover: "img/pengantar_komunikasi.jpg",
  },
];

var dataTracking = {
  20230012: {
    nomorDO: "20230012",
    nama: "Rina Wulandari",
    status: "Dalam Perjalanan",
    ekspedisi: "JNE",
    tanggalKirim: "2025-08-25",
    paket: "Reguler",
    total: "Rp 180.000",
    perjalanan: [
      {
        waktu: "2025-08-25 10:12",
        keterangan: "Penerimaan di Loket Tangerang",
      },
      { waktu: "2025-08-25 14:07", keterangan: "Tiba di Hub Transit" },
    ],
  },
  20230013: {
    nomorDO: "20230013",
    nama: "Agus Pranoto",
    status: "Dikirim",
    ekspedisi: "Pos Indonesia",
    tanggalKirim: "2025-08-25",
    paket: "Kilat Khusus",
    total: "Rp 220.000",
    perjalanan: [
      {
        waktu: "2025-08-25 10:12",
        keterangan: "Penerimaan di Loket Tangerang",
      },
      {
        waktu: "2025-08-26 15:06",
        keterangan: "Proses antar kurir ke alamat tujuan",
      },
      {
        waktu: "2025-08-26 20:00",
        keterangan: "Selesai Antar. Penerima: Agus Pranoto",
      },
    ],
  },
};
