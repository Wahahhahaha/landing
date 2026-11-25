"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Barbell, Briefcase, Check, CookingPot, FlowArrow, List, Storefront, Truck, X, CaretDown, Buildings, ChartLineUp, ClipboardText, UsersThree, ChatCircleDots, PaperPlaneTilt } from "@phosphor-icons/react/dist/ssr";
import type { ViewKey } from "./product-preview";

const industries = [[Storefront, "Retail & toko", "Penjualan dan stok lebih teratur.", "/industri/retail.jpg"], [CookingPot, "Restoran & kafe", "Pesanan, kasir, dan dapur terhubung.", "/industri/restoran.jpg"], [Truck, "Distributor", "Persediaan dan pengadaan lebih terkendali.", "/industri/distributor.jpg"], [Briefcase, "Bisnis jasa", "Aktivitas pelanggan tetap terarah.", "/industri/jasa.jpg"], [Barbell, "Gym & fitness", "Kelola member dan layanan harian.", "/industri/gym.jpg"], [FlowArrow, "Bisnis proyek", "Jaga pekerjaan dan laporan tetap rapi.", "/industri/proyek.jpg"]] as const;
const features = [
  { name: "Laporan", view: "laporan" as ViewKey, image: "/fitur/1.png", title: "Laporan usaha siap dipantau.", points: ["Ringkasan performa bisnis", "Bandingkan periode dengan mudah", "Pantau metrik penting", "Ambil keputusan dari data"] },
  { name: "Akunting", view: "akunting" as ViewKey, image: "/fitur/2.png", title: "Akuntansi tersusun rapi.", points: ["Daftar akun terstruktur", "Jurnal tercatat otomatis", "Laporan keuangan siap pakai", "Memudahkan pelaporan"] },
  { name: "Aset", view: "laporan" as ViewKey, image: "/fitur/3.png", title: "Aset tetap terdokumentasi.", points: ["Daftar aset usaha", "Nilai dan status tercatat", "Pemantauan lebih mudah", "Data aset tersentral"] },
  { name: "Kas dan Bank", view: "kasbank" as ViewKey, image: "/fitur/4.png", title: "Arus kas lebih jelas.", points: ["Catat pemasukan dan pengeluaran", "Pantau saldo kas dan bank", "Mutasi mudah ditelusuri", "Data siap direkap"] },
  { name: "Penjualan", view: "penjualan" as ViewKey, image: "/fitur/5.png", title: "Catat penjualan dengan rapi.", points: ["Transaksi dan nota tercatat", "Pantau produk terlaris", "Lihat total penjualan harian", "Data siap dievaluasi"] },
  { name: "Pembelian", view: "pembelian" as ViewKey, image: "/fitur/6.png", title: "Pembelian lebih terkendali.", points: ["Catat pesanan supplier", "Pantau status penerimaan", "Detail harga dan jumlah jelas", "Proses pembelian tertata"] },
  { name: "Inventory", view: "inventori" as ViewKey, image: "/fitur/7.png", title: "Stok terpantau di setiap lokasi.", points: ["Sisa stok real-time", "Perpindahan barang tercatat", "Notifikasi stok menipis", "Opname lebih teratur"] },
  { name: "Produksi", view: "produksi" as ViewKey, image: "/fitur/8.png", title: "Alur produksi mudah dipantau.", points: ["Rencana produksi harian", "Pemakaian bahan tercatat", "Progres tiap tahap terlihat", "Hasil produksi terekam"] },
  { name: "Data", view: "penjualan" as ViewKey, image: "/fitur/9.png", title: "Nota dan data usaha tersimpan.", points: ["Nota digital tersimpan rapi", "Pencarian dokumen cepat", "Riwayat transaksi lengkap", "Akses data kapan saja"] },
  { name: "Resto", view: "pos" as ViewKey, image: "/fitur/10.png", title: "Kasir dan dapur terhubung.", points: ["Pesanan meja tercatat", "Pembayaran lebih cepat", "Pantau pesanan berjalan", "Ringkas penjualan harian"] },
  { name: "Gym", view: "timproyek" as ViewKey, image: "/fitur/11.png", title: "Operasional gym lebih rapi.", points: ["Kelola member dan paket", "Pantau kehadiran", "Catat layanan harian", "Laporan operasional jelas"] },
  { name: "Pengaturan", view: "laporan" as ViewKey, image: "/fitur/12.png", title: "Pengaturan sistem lebih fleksibel.", points: ["Sesuaikan kebutuhan usaha", "Atur akses dan preferensi", "Kelola data operasional", "Konfigurasi mudah dipantau"] },
  { name: "Member", view: "pos" as ViewKey, image: "/fitur/13.png", title: "Pelanggan lebih loyal.", points: ["Kelola data member", "Program loyalitas sederhana", "Riwayat kunjungan tercatat", "Dorong pembelian ulang"] },
  { name: "Project", view: "timproyek" as ViewKey, image: "/fitur/14.png", title: "Proyek tim tetap terarah.", points: ["Pantau progres proyek", "Tanggung jawab jelas", "Aktivitas tim tercatat", "Ringkasan pekerjaan mudah dilihat"] },
  { name: "Absensi", view: "timproyek" as ViewKey, image: "/fitur/15.png", title: "Kehadiran tim lebih terpantau.", points: ["Catat kehadiran harian", "Pantau jam kerja tim", "Rekap absensi otomatis", "Data hadir mudah dicek"] },
];
const faqs = [
  ["Apa itu Buka Nota?", "Buka Nota adalah sistem pencatatan usaha yang membantu pemilik bisnis menyimpan transaksi, nota, dan informasi penting dalam satu tempat. Catatan yang tertata memudahkan Anda menemukan kembali informasi dan memantau kegiatan usaha."],
  ["Apa saja yang bisa dilakukan dengan Buka Nota?", "Anda dapat mencatat transaksi, menyimpan nota dengan rapi, menemukan informasi usaha dengan mudah, dan melihat ringkasan kegiatan bisnis dalam satu sistem."],
  ["Apakah Buka Nota cocok untuk usaha saya?", "Buka Nota dirancang untuk membantu berbagai jenis usaha yang membutuhkan pencatatan transaksi dan nota yang lebih rapi, praktis, dan mudah dipantau."],
  ["Bagaimana cara mulai menggunakan Buka Nota?", "Gunakan tombol Coba Sekarang untuk mulai menggunakan Buka Nota dan temukan alur pencatatan yang sesuai dengan kebutuhan bisnis Anda."],
];
const products = [
  { icon: Storefront, image: "/industri/retail.jpg", name: "Retail & FnB", slug: "retail-fnb", desc: "Catat penjualan dan stok toko." },
  { icon: Truck, image: "/industri/distributor.jpg", name: "Logistik", slug: "logistik", desc: "Pantau persediaan dan pergerakan barang." },
  { icon: ChartLineUp, image: "/industri/jasa.jpg", name: "Akuntansi", slug: "akuntansi", desc: "Lihat catatan dan ringkasan keuangan." },
  { icon: UsersThree, image: "/industri/gym.jpg", name: "Absensi", slug: "absensi", desc: "Kelola kehadiran tim kerja." },
];
const clientLogos = [{ name: "Kopi Sudut", icon: CookingPot }, { name: "Ruang Rasa", icon: Storefront }, { name: "Saji Nusantara", icon: ClipboardText }, { name: "Mitra Distribusi", icon: Truck }, { name: "Studio Harian", icon: Briefcase }, { name: "Toko Kita", icon: Buildings }];
const stats = [
  { value: 1200, suffix: "+", label: "outlet aktif", detail: "Jangkauan usaha" },
  { value: 42, suffix: "", label: "kota", detail: "Cakupan nasional" },
  { value: 18500, suffix: "+", label: "transaksi diproses", detail: "Aktivitas harian" },
  { value: 2018, suffix: "", label: "tahun berdiri", detail: "Pengalaman industri" },
] as const;


function Logo({ footer = false, light = false }: { footer?: boolean; light?: boolean }) {
  return (
    <a className="brand" href="#top" aria-label="Buka Nota beranda">
      <Image className="brand-logo" src={footer || light ? "/logo/logo_teks_gelap.png" : "/logo/bukanota-logo.png"} alt="Buka Nota" width={footer || light ? 1748 : 1600} height={footer || light ? 192 : 356} priority />
    </a>
  );
}

function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const elRef = useRef<HTMLSpanElement | null>(null);
  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    let raf = 0;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      raf = requestAnimationFrame(() => setDisplay(value));
      return () => cancelAnimationFrame(raf);
    }
    const animate = () => {
      const start = performance.now();
      const duration = 1800;
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 4);
        setDisplay(Math.round(value * eased));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    if (!("IntersectionObserver" in window)) {
      raf = requestAnimationFrame(() => setDisplay(value));
      return () => cancelAnimationFrame(raf);
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) { animate(); observer.disconnect(); } });
    }, { threshold: 0.4 });
    observer.observe(el);
    return () => { observer.disconnect(); cancelAnimationFrame(raf); };
  }, [value]);
  return <span ref={elRef}>{display.toLocaleString("id-ID")}{suffix}</span>;
}

export function LandingPage({ year }: { year: number }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [faq, setFaq] = useState(0);
  const [navScrolled, setNavScrolled] = useState(false);
  const [navBlur, setNavBlur] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const progressRef = useRef<HTMLSpanElement | null>(null);
  const [activeFeature, setActiveFeature] = useState(0);
  const [heroDevice, setHeroDevice] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatClosing, setChatClosing] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([{ from: "bot" as const, text: "Halo! Ada yang bisa kami bantu seputar Buka Nota?" }]);
  const active = features[activeFeature] ?? features[0];
  const heroDevices = [
    { key: "tv", label: "TV", image: "/buka-nota-dashboard-screenshot.png", alt: "Dashboard Buka Nota di layar TV" },
    { key: "tablet", label: "Tablet", image: "/devices/tablet.png", alt: "Dashboard Buka Nota di tablet" },
    { key: "pos", label: "POS", image: "/buka-nota-pos-photo.png", alt: "Buka Nota di perangkat POS" },
    { key: "phone", label: "HP", image: "/devices/hp.png", alt: "Buka Nota di ponsel" },
  ] as const;
  const closeChat = () => { setChatClosing(true); setTimeout(() => { setChatOpen(false); setChatClosing(false); }, 220); };
  const toggleChat = () => (chatOpen && !chatClosing ? closeChat() : (setChatOpen(true), setChatClosing(false)));

  useEffect(() => {
    const t = setInterval(() => setHeroDevice((s) => (s + 1) % heroDevices.length), 3200);
    return () => clearInterval(t);
  }, [heroDevices.length]);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.querySelector<HTMLElement>(".hero");
      const title = document.querySelector<HTMLElement>(".hero-copy h1");
      const pastHero = hero ? hero.getBoundingClientRect().bottom <= 68 : window.scrollY > 40;
      const titleRect = title?.getBoundingClientRect();
      const nearTitle = titleRect ? titleRect.top <= 148 && titleRect.bottom > 0 : false;
      setNavScrolled(pastHero);
      setNavBlur(nearTitle);
      const ids = ["produk", "industri", "solusi", "tentang", "footer"];
      const offset = window.innerHeight * 0.35;
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offset) current = id;
      }
      setActiveSection(current);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>("main > section:not(.hero), main > footer"));
    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("reveal", "is-visible"));
      return;
    }
    targets.forEach((el) => el.classList.add("reveal"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } });
    }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main id="top">
      <div className="announcement"><span>BUKA NOTA / SISTEM PENCATATAN USAHA</span><a href="#solusi">Kenali sistemnya <ArrowRight size={14} /></a></div>
      <header className={`site-nav${navScrolled ? " is-scrolled" : ""}${navBlur ? " is-blur" : ""}`}>
        <span className="nav-progress" ref={progressRef} aria-hidden="true" />
        <div className="container nav-inner">
          <Logo light={!navScrolled} />
          <nav className="nav-links" aria-label="Navigasi utama">
            <div className="nav-product">
              <button className={`nav-product-trigger ${productOpen ? "is-open" : ""} ${activeSection === "produk" ? "is-active" : ""}`} onClick={() => setProductOpen(!productOpen)} aria-expanded={productOpen}>Produk <CaretDown size={13} /></button>
              <div className={`mega-menu${productOpen ? " is-open" : ""}`}>
                {products.map(({ icon: Icon, name, desc }) => (
                  <a href="#produk" key={name} onClick={() => setProductOpen(false)}>
                    <span className="mega-icon"><Icon size={17} /></span>
                    <span><strong>{name}</strong><small>{desc}</small></span>
                  </a>
                ))}
                <a className="mega-all" href="#produk" onClick={() => setProductOpen(false)}>Lihat semua produk <ArrowRight size={15} /></a>
              </div>
            </div>
            <a href="#industri" className={activeSection === "industri" ? "is-active" : ""}>Solusi</a>
            <a href="#solusi" className={activeSection === "solusi" ? "is-active" : ""}>Fitur</a>
            <a href="#tentang" className={activeSection === "tentang" ? "is-active" : ""}>Tentang</a>
            <a href="#footer" className={activeSection === "footer" ? "is-active" : ""}>Hubungi Kami</a>
          </nav>
          <div className="nav-actions"><a className="btn btn--primary" href="https://bukanota.com/harga">Coba Sekarang</a></div>
          <button className="menu-btn" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? "Tutup menu" : "Buka menu"} aria-expanded={mobileOpen}>{mobileOpen ? <X size={22} /> : <List size={22} />}</button>
        </div>
        {mobileOpen && (
          <nav className="mobile-menu">
            <a href="#produk" className={activeSection === "produk" ? "is-active" : ""} onClick={() => setMobileOpen(false)}>Produk</a>
            <a href="#industri" className={activeSection === "industri" ? "is-active" : ""} onClick={() => setMobileOpen(false)}>Solusi</a>
            <a href="#solusi" className={activeSection === "solusi" ? "is-active" : ""} onClick={() => setMobileOpen(false)}>Fitur</a>
            <a href="#tentang" className={activeSection === "tentang" ? "is-active" : ""} onClick={() => setMobileOpen(false)}>Tentang</a>
            <a href="#footer" className={activeSection === "footer" ? "is-active" : ""} onClick={() => setMobileOpen(false)}>Hubungi Kami</a>
            <a className="btn btn--primary" href="https://bukanota.com/harga" onClick={() => setMobileOpen(false)}>Coba Sekarang</a>
          </nav>
        )}
      </header>

      <section className="hero">
        <div className="container hero-layout">
          <div className="hero-copy">
            <p className="eyebrow">Sistem pencatatan nota usaha</p>
            <h1>Kelola bisnis lebih mudah,<br /><em>Buka Nota solusinya!</em></h1>
            <p className="hero-lede">Catat, temukan, dan pantau nota usaha dalam satu sistem yang praktis. Catatan rapi, bisnis lebih pasti.</p>
            <div className="hero-actions">
              <a className="btn btn--primary" href="https://bukanota.com/harga">Coba Sekarang <ArrowRight size={17} /></a>
              <a className="text-link" href="#produk">Kenali Produk <ArrowRight size={16} /></a>
            </div>
            <div className="hero-note"><span className="status-dot" /> Dibuat untuk bisnis Indonesia</div>
          </div>
          <div className="hero-visual">
            <div className="hero-device-carousel" aria-label="Buka Nota di berbagai perangkat">
              {heroDevices.map((device, i) => (
                <div className={`hero-device-slide${i === heroDevice ? " is-active" : ""}`} key={device.key}>
                  <div className={`hero-device hero-device--${device.key}`}>
                    <div className="hero-device-screen">
                      <Image src={device.image} alt={device.alt} fill priority={i === 0} sizes="(max-width: 900px) 90vw, 50vw" />
                    </div>
                  </div>
                </div>
              ))}
              <div className="hero-device-dots">
                {heroDevices.map((device, i) => (
                  <button key={device.key} type="button" className={i === heroDevice ? "is-active" : ""} onClick={() => setHeroDevice(i)} aria-label={`Tampilkan ${device.label}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="trust" aria-label="Mitra Buka Nota">
        <div className="container">
          <div className="logo-marquee">
            <div className="logo-marquee-track">
              {[...clientLogos, ...clientLogos].map((_, index) => (
                <span key={index}><Image className="marquee-logo" src="/logo/logo_teks_terang.png" alt="Buka Nota" width={1748} height={192} /></span>
              ))}
            </div>
          </div>
          <div className="credibility">
            {stats.map(({ value, suffix, label, detail }) => (
              <div className="stat-card" key={label}>
                <span className="stat-detail">{detail}</span>
                <strong><CountUp value={value} suffix={suffix} /></strong>
                <span className="stat-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="product-cards section" id="produk">
        <div className="container">
          <div className="section-topline">
            <div>
              <div className="section-index">01 / PRODUK</div>
              <h2>Satu sistem untuk<br /><span>kebutuhan bisnis sehari-hari.</span></h2>
            </div>
            <p>Buka Nota membantu Anda mencatat transaksi, menyimpan nota, dan melihat ringkasan usaha dalam satu alur yang praktis.</p>
          </div>
          <div className="product-grid">
            {products.map(({ icon: Icon, name, slug, desc }) => (
              <article className="product-card" key={name}>
                <span className="product-card-icon"><Icon size={30} weight="duotone" aria-hidden /></span>
                <h3>{name}</h3>
                <p>{desc}</p>
                <a className="btn btn--outline" href={`/produk/${slug}`}>Lihat Produk <ArrowRight size={15} /></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="metrics" aria-label="Ringkasan platform">
        <div className="container metrics-grid">
          <div><strong>01</strong><span>Catat transaksi</span></div>
          <div><strong>02</strong><span>Simpan nota rapi</span></div>
          <div><strong>03</strong><span>Pantau ringkasan</span></div>
          <div><strong>04</strong><span>Kelola usaha terarah</span></div>
        </div>
      </section>

      <section className="section industry-section" id="industri">
        <div className="container">
          <div className="section-topline">
            <div>
              <div className="section-index">02 / SOLUSI INDUSTRI</div>
              <h2>Untuk cara kerja<br /><span>yang berbeda.</span></h2>
            </div>
            <p>Dari pencatatan nota hingga transaksi kasir, Buka Nota membantu aktivitas usaha tersusun dalam alur yang mudah dipantau.</p>
          </div>
          <div className="industry-grid industry-grid--light">
            {industries.map(([Icon, title, desc, img]) => (
              <a className="industry-item" href="#solusi" key={title}>
                <div className="industry-image"><Image src={img} alt={title} fill sizes="(max-width: 700px) 100vw, 33vw" /></div>
                <div className="industry-caption"><Icon size={19} /><div><h3>{title}</h3><p>{desc}</p></div><ArrowRight size={18} /></div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section feature-section feature-section--blue" id="solusi">
        <div className="container">
          <div className="feature-heading">
            <h2>Semua alat penting,<br /><span>di satu tempat.</span></h2>
            <p>Catat transaksi, simpan nota, dan pantau usaha dalam satu alur yang mudah diikuti.</p>
          </div>
          <div className="feature-layout">
            <div className="feature-tabs-wrap">
              <div className="feature-tabs" role="tablist" aria-label="Fitur Buka Nota">
                {features.map((feature, i) => (
                  <button type="button" role="tab" aria-selected={activeFeature === i} className={activeFeature === i ? "is-active" : ""} onClick={() => setActiveFeature(i)} key={feature.name}>
                    <span className="feature-tab-num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="feature-tab-name">{feature.name}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="feature-info-panel" key={activeFeature}>
              <div className="feature-copy">
                <h3>{active.title}</h3>
                <ul>
                  {active.points.map((point) => (
                    <li key={point}><span className="feature-check"><Check size={16} weight="bold" /></span><span>{point}</span></li>
                  ))}
                </ul>
              </div>
              <div className="feature-info-image">
                <div className="feature-image-frame">
                  <Image src={active.image} alt={`${active.name} Buka Nota`} fill sizes="(max-width: 700px) 100vw, 40vw" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--soft" id="tentang">
        <div className="container about-layout">
          <div>
            <div className="section-index">04 / MENGENAL BUKA NOTA</div>
            <h2>Apa itu Buka Nota?<br /><span>Catatan usaha lebih rapi.</span></h2>
            <p>Buka Nota adalah sistem pencatatan usaha yang membantu pemilik bisnis menyimpan transaksi, nota, dan informasi penting dalam satu tempat. Catatan yang tertata memudahkan Anda menemukan kembali informasi dan memantau kegiatan usaha.</p>
          </div>
          <div className="steps">
            <div><strong>01</strong><h3>Catat transaksi.</h3><p>Simpan catatan penjualan dan pembelian agar aktivitas usaha mudah ditelusuri.</p></div>
            <div><strong>02</strong><h3>Simpan nota dengan rapi.</h3><p>Kelompokkan dokumen dan informasi transaksi dalam satu sistem yang mudah ditemukan.</p></div>
            <div><strong>03</strong><h3>Pantau usaha.</h3><p>Gunakan ringkasan untuk melihat perkembangan kegiatan usaha sehari-hari.</p></div>
          </div>
        </div>
      </section>

      <section className="section faq-section" id="faq">
        <div className="container faq-layout">
          <div>
            <div className="section-index">05 / PERTANYAAN</div>
            <h2>Masih ingin<br />memastikan?</h2>
            <p>Kami siap membantu Anda melihat bagaimana Buka Nota cocok untuk kebutuhan pencatatan usaha Anda.</p>
            <a className="text-link" href="https://bukanota.com/contact">Hubungi tim kami <ArrowRight size={16} /></a>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer], index) => (
              <div className={`faq-item ${faq === index ? "is-open" : ""}`} key={question}>
                <button onClick={() => setFaq(faq === index ? -1 : index)} aria-expanded={faq === index}><span>{question}</span><span>{faq === index ? "−" : "+"}</span></button>
                <div className="faq-answer"><p>{answer}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="testimonial section" aria-label="Testimoni pelanggan">
        <div className="container">
          <div className="testimonial-head">
            <p className="section-index">06 / DIPERCAYA</p>
            <h2>Hasil yang terasa di operasional.</h2>
          </div>
          <div className="testimonial-grid">
            {[
              { quote: "Performa outlet lebih mudah dipantau tanpa menunggu rekap manual.", name: "XYZ", role: "Pemilik usaha · 27 outlet", metric: "+32%", detail: "transaksi 6 bulan", video: "/testimonial-vilo.mp4" },
              { quote: "Tim kasir jadi lebih cepat karena alur transaksi lebih rapi.", name: "Rina", role: "Manajer operasional · F&B", metric: "2x", detail: "lebih cepat rekap", video: "/testimonial-vilo.mp4" },
              { quote: "Laporan harian langsung siap, jadi keputusan bisa diambil lebih cepat.", name: "Budi", role: "Owner retail", metric: "Harian", detail: "laporan otomatis", video: "/testimonial-vilo.mp4" },
            ].map((item) => (
              <article className="testimonial-item" key={item.name}>
                <div className="testimonial-item-video">
                  <video src={item.video} controls playsInline preload="metadata" />
                </div>
                <p className="testimonial-item-metric"><b>{item.metric}</b><span>{item.detail}</span></p>
                <blockquote>{item.quote}</blockquote>
                <p className="testimonial-item-author"><strong>{item.name}</strong><span>{item.role}</span></p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="closing section">
        <div className="container closing-inner">
          <div className="closing-copy">
            <p className="section-index">SIAP MEMULAI</p>
            <h2>Catat bisnis,<br /><em>lebih rapi.</em></h2>
          </div>
          <div className="closing-action">
            <p>Mulai kelola operasional dengan lebih terstruktur.</p>
            <a className="btn btn--primary" href="https://bukanota.com/harga">Coba Sekarang <ArrowRight size={17} /></a>
          </div>
        </div>
      </section>

      <footer className="footer" id="footer">
        <div className="container footer-top">
          <div className="footer-brand">
            <Logo footer />
            <p>PT Meta Digital Informasi<br />Jl. Jend. Sudirman No. 21, Jakarta<br />Platform manajemen bisnis untuk operasional yang lebih terstruktur.</p>
            <span className="footer-contact"><b>Sales</b>: WhatsApp sales<br /><b>Support</b>: WhatsApp support</span>
            <div className="store-badges">
              <a href="#top" aria-label="Google Play"><Image src="/googleplay.svg" alt="Dapatkan di Google Play" width={180} height={54} /></a>
              <a href="#top" aria-label="App Store"><Image src="/appstore.svg" alt="Unduh di App Store" width={180} height={54} /></a>
            </div>
          </div>
          <div className="footer-column">
            <h3>Produk</h3>
            <a href="#produk">Retail &amp; FnB</a><a href="#produk">Logistik</a><a href="#solusi">Akuntansi</a><a href="#produk">Absensi</a>
          </div>
          <div className="footer-column">
            <h3>Solusi</h3>
            <a href="#industri">Restoran</a><a href="#industri">Kedai Kopi</a><a href="#industri">Barbershop &amp; Salon</a><a href="#industri">Katering</a>
          </div>
          <div className="footer-column">
            <h3>Perusahaan</h3>
            <a href="#faq">FAQ</a><a href="#solusi">Video Tutorial</a><a href="https://bukanota.com/contact">Hubungi Kami</a><a href="https://bukanota.com/privacy">Kebijakan Privasi</a>
            <span className="social-links">Instagram · Facebook · YouTube</span>
          </div>
        </div>
        <div className="container footer-bottom"><span>© {year} Buka Nota · PT Meta Digital Informasi</span><span>Syarat &amp; Ketentuan · Kebijakan Privasi</span></div>
      </footer>
      <div className={`chat-widget${chatOpen ? " is-open" : ""}`}>
        {chatOpen && (
          <div className={`chat-card${chatClosing ? " is-closing" : ""}`} role="dialog" aria-label="Chat Buka Nota">
            <div className="chat-card-head">
              <div><strong>Buka Nota</strong><span>Biasanya membalas cepat</span></div>
              <button type="button" className="chat-close" onClick={closeChat} aria-label="Tutup chat"><X size={16} /></button>
            </div>
            <div className="chat-messages">
              {chatMessages.map((msg, i) => <div key={i} className={`chat-msg chat-msg--${msg.from}`}>{msg.text}</div>)}
            </div>
            <form className="chat-form" onSubmit={(e) => {
              e.preventDefault();
              const text = chatInput.trim();
              if (!text) return;
              setChatMessages((m) => [...m, { from: "user" as const, text }, { from: "bot" as const, text: "Terima kasih! Tim kami akan segera membantu Anda." }]);
              setChatInput("");
            }}>
              <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Tulis pesan..." aria-label="Tulis pesan" />
              <button type="submit" aria-label="Kirim"><PaperPlaneTilt size={16} weight="fill" /></button>
            </form>
          </div>
        )}
        <button type="button" className="chat-float" onClick={toggleChat} aria-label={chatOpen ? "Tutup chat" : "Buka chat"}>
          {chatOpen && !chatClosing ? <X size={22} /> : <ChatCircleDots size={24} weight="fill" />}
        </button>
      </div>
    </main>
  );
}
