import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, Check, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { productsData, productKeys, type ProductKey } from "../../components/products-data";

export function generateStaticParams() {
  return productKeys.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = productsData[slug as ProductKey];
  if (!product) return {};
  return {
    title: `${product.name} — Buka Nota`,
    description: product.tagline,
    alternates: { canonical: `https://bukanota.com/produk/${product.slug}` },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = productsData[slug as ProductKey];
  if (!product) notFound();

  return (
    <main id="top">
      <header className="site-nav">
        <div className="container nav-inner">
          <a className="brand" href="/" aria-label="Buka Nota beranda">
            <Image className="brand-logo" src="/logo/bukanota-logo.png" alt="Buka Nota" width={1600} height={356} priority />
          </a>
          <nav className="nav-links" aria-label="Navigasi utama">
            <a href="/#produk">Produk</a>
            <a href="/#industri">Solusi</a>
            <a href="/#solusi">Fitur</a>
            <a href="/#tentang">Tentang</a>
            <a href="#footer">Hubungi Kami</a>
          </nav>
          <div className="nav-actions">
            <a className="login" href="https://bukanota.com/login">Masuk</a>
            <a className="btn btn--primary" href="https://bukanota.com/harga">Coba Sekarang</a>
          </div>
        </div>
      </header>

      <section className="hero product-hero">
        <div className="container hero-layout">
          <div className="hero-copy">
            <p className="eyebrow">Produk / {product.name}</p>
            <h1>{product.name}</h1>
            <p className="hero-lede">{product.tagline}</p>
            <div className="hero-actions">
              <a className="btn btn--primary" href="https://bukanota.com/harga">Coba Sekarang <ArrowRight size={17} /></a>
              <a className="text-link" href="https://bukanota.com/contact">Jadwalkan Demo <ArrowRight size={16} /></a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-label">PRODUK / {product.name.toUpperCase()}</div>
            <div className="hero-image">
              <Image src={product.image} alt={product.name} fill sizes="(max-width: 860px) 100vw, 56vw" />
            </div>
          </div>
        </div>
      </section>

      <section className="section product-detail">
        <div className="container">
          <div className="section-topline">
            <div>
              <div className="section-index">FITUR {product.name.toUpperCase()}</div>
              <h2>Apa yang Anda<br /><span>dapatkan.</span></h2>
            </div>
            <p>{product.description}</p>
          </div>
          <div className="product-feature-grid">
            {product.features.map((f) => (
              <article className="product-feature" key={f.title}>
                <span className="product-feature-icon"><Check size={20} /></span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="closing">
        <div className="container closing-inner">
          <div>
            <p className="eyebrow">SIAP MEMULAI?</p>
            <h2>Kerjakan bisnis Anda.<br /><em>Biarkan sistem membantu.</em></h2>
          </div>
          <a className="btn btn--light" href="https://bukanota.com/harga">Coba Sekarang <ArrowRight size={17} /></a>
        </div>
      </section>

      <footer className="footer" id="footer">
        <div className="container footer-top">
          <div className="footer-brand">
            <a className="brand" href="/" aria-label="Buka Nota beranda">
              <Image className="brand-logo" src="/logo/logo_teks_gelap.png" alt="Buka Nota" width={1748} height={192} />
            </a>
            <p>PT Meta Digital Informasi<br />Jl. Jend. Sudirman No. 21, Jakarta<br />Platform manajemen bisnis untuk operasional yang lebih terstruktur.</p>
          </div>
          <div className="footer-column">
            <h3>Produk</h3>
            <a href="/produk/retail-fnb">Retail &amp; FnB</a>
            <a href="/produk/logistik">Logistik</a>
            <a href="/produk/akuntansi">Akuntansi</a>
            <a href="/produk/absensi">Absensi</a>
          </div>
          <div className="footer-column">
            <h3>Perusahaan</h3>
            <a href="/#faq">FAQ</a>
            <a href="https://bukanota.com/contact">Hubungi Kami</a>
            <a href="https://bukanota.com/privacy">Kebijakan Privasi</a>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© 2026 Buka Nota · PT Meta Digital Informasi</span>
          <span>Syarat &amp; Ketentuan · Kebijakan Privasi</span>
        </div>
      </footer>

      <a className="whatsapp-float" href="https://wa.me/6280000000000" aria-label="Hubungi Buka Nota lewat WhatsApp">
        <WhatsappLogo size={23} weight="fill" />
      </a>
    </main>
  );
}
