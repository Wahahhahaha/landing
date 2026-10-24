import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://bukanota.com"),
  title: "Buka Nota",
  description: "Aplikasi mudah untuk mengelola penjualan, stok, keuangan, dan operasional bisnis dalam satu sistem.",
  alternates: { canonical: "https://bukanota.com" },
  openGraph: { title: "Buka Nota", description: "Platform manajemen bisnis terintegrasi untuk operasional yang lebih terstruktur.", url: "https://bukanota.com", siteName: "Buka Nota", locale: "id_ID", type: "website", images: [{ url: "/hero-image.png", width: 1200, height: 630, alt: "Dashboard Buka Nota" }] },
  twitter: { card: "summary_large_image", title: "Buka Nota", description: "Kelola bisnis lebih terstruktur dari satu platform.", images: ["/hero-image.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
