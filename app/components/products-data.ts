export type ProductKey = "retail-fnb" | "logistik" | "akuntansi" | "absensi";

export type Product = {
  slug: ProductKey;
  name: string;
  tagline: string;
  description: string;
  image: string;
  features: { title: string; desc: string }[];
};

export const productsData: Record<ProductKey, Product> = {
  "retail-fnb": {
    slug: "retail-fnb",
    name: "Retail & FnB",
    tagline: "Kasir, stok, promosi, dan operasional toko dalam satu alur.",
    description:
      "Jalankan penjualan di counter maupun meja, kelola stok, dan atur promosi dari satu sistem yang terhubung. Cocok untuk toko retail, restoran, kafe, hingga bisnis multi outlet.",
    image: "/industri/retail.jpg",
    features: [
      { title: "Kasir cepat", desc: "Transaksi cepat dengan promo/voucher, captain order, split and join bill, dan reservasi meja." },
      { title: "Multi outlet", desc: "Pantau penjualan dan stok setiap outlet dalam satu tampilan terpusat." },
      { title: "Stok & opname", desc: "Mutasi, opname, produksi, dan peringatan stok menipis otomatis." },
      { title: "Promosi", desc: "Buat penawaran, pantau produk terlaris, dan evaluasi hasil promosi dengan data." },
    ],
  },
  logistik: {
    slug: "logistik",
    name: "Logistik",
    tagline: "Pantau gudang, pengiriman, dan persediaan yang terus bergerak.",
    description:
      "Kelola persediaan di banyak gudang, atur pengiriman, dan jaga alur barang tetap terkendali dari pengadaan hingga distribusi.",
    image: "/industri/distributor.jpg",
    features: [
      { title: "Persediaan terpusat", desc: "Lihat ketersediaan barang di setiap gudang secara real-time." },
      { title: "Pengiriman", desc: "Catat pesanan dan pengiriman agar barang sampai dengan rapi." },
      { title: "Pengadaan", desc: "Kelola pembelian dan supplier untuk menjaga stok tetap siap." },
      { title: "Laporan stok", desc: "Pantau pergerakan barang dengan laporan yang mudah dibaca." },
    ],
  },
  akuntansi: {
    slug: "akuntansi",
    name: "Akuntansi",
    tagline: "Jurnal, laba rugi, dan neraca yang siap dipakai mengambil keputusan.",
    description:
      "Keuangan rapi sejak transaksi pertama. Semua catatan tersusun otomatis sehingga Anda dapat memantau arus kas dan mengambil keputusan dengan data.",
    image: "/industri/jasa.jpg",
    features: [
      { title: "Jurnal otomatis", desc: "Setiap transaksi tercatat ke jurnal tanpa input ulang." },
      { title: "Hutang & piutang", desc: "Pantau kewajiban dan tagihan agar arus kas tetap terjaga." },
      { title: "Laba rugi & neraca", desc: "Laporan keuangan siap kapan pun dibutuhkan." },
      { title: "Cash & bank", desc: "Kelola kas dan rekening bank dalam satu tempat." },
    ],
  },
  absensi: {
    slug: "absensi",
    name: "Absensi",
    tagline: "Kelola kehadiran tim dan aktivitas kerja dengan lebih tertib.",
    description:
      "Atur kehadiran, jam kerja, dan aktivitas tim dengan lebih terstruktur. Rekap kehadiran tersusun otomatis untuk mempermudah administrasi.",
    image: "/industri/gym.jpg",
    features: [
      { title: "Absensi kehadiran", desc: "Catat kehadiran tim dengan rapi dan real-time." },
      { title: "Jadwal & shift", desc: "Atur jadwal kerja dan shift sesuai kebutuhan operasional." },
      { title: "Rekap otomatis", desc: "Rekap kehadiran tersusun otomatis untuk penggajian." },
      { title: "Akses per peran", desc: "Atur akses setiap anggota tim sesuai perannya." },
    ],
  },
};

export const productKeys = Object.keys(productsData) as ProductKey[];
