"use client";
import { useState } from "react";
import {
  Storefront,
  Package,
  Wallet,
  FileText,
  ShoppingCart,
  Calculator,
  SquaresFour,
  Plus,
  ArrowsClockwise,
  CaretDown,
  CaretLeft,
  CaretRight,
  CalendarBlank,
  Clock,
  MagnifyingGlass,
  FloppyDisk,
  NotePencil,
  Prohibit,
  Circle,
} from "@phosphor-icons/react/dist/ssr";

export type ViewKey = "penjualan" | "inventori" | "akunting" | "kasbank" | "pembelian" | "laporan";

const views: Record<
  ViewKey,
  {
    label: string;
    title: string;
    stats: { name: string; value: string; note: string }[];
    cols: [string, string, string];
    rows: { a: string; status: "done" | "proc"; b: string; c: string }[];
  }
> = {
  penjualan: {
    label: "Penjualan",
    title: "Aktivitas Penjualan",
    stats: [
      { name: "Penjualan hari ini", value: "Rp 18,6 jt", note: "↑ 8,2% dari kemarin" },
      { name: "Transaksi", value: "248", note: "↑ 12 transaksi" },
      { name: "Rata-rata nota", value: "Rp 75 rb", note: "↑ 3,1%" },
    ],
    cols: ["Produk", "Status", "Nilai"],
    rows: [
      { a: "Kopi Arabika 250g", status: "done", b: "", c: "Rp 2,4 jt" },
      { a: "Paket Member Bulanan", status: "done", b: "", c: "Rp 1,8 jt" },
      { a: "Pesanan Meja 04", status: "proc", b: "", c: "Rp 850 rb" },
      { a: "Katering Kantor", status: "done", b: "", c: "Rp 3,2 jt" },
    ],
  },
  inventori: {
    label: "Inventori",
    title: "Ketersediaan Stok",
    stats: [
      { name: "Item aktif", value: "1.284", note: "6 gudang terpantau" },
      { name: "Stok menipis", value: "14 item", note: "Perlu restock" },
      { name: "Akurasi opname", value: "98,2%", note: "↑ 1,4% kuartal ini" },
    ],
    cols: ["Item", "Status", "Sisa"],
    rows: [
      { a: "Gula Aren 1kg", status: "proc", b: "", c: "23 pcs" },
      { a: "Susu Full Cream", status: "done", b: "", c: "112 pcs" },
      { a: "Kemasan Cup 16oz", status: "done", b: "", c: "860 pcs" },
      { a: "Syrup Vanila 1L", status: "proc", b: "", c: "9 pcs" },
    ],
  },
  akunting: {
    label: "Akunting",
    title: "Daftar Akun",
    stats: [],
    cols: ["#", "Kode Perkiraan", "Nama Akun"],
    rows: [],
  },
  kasbank: {
    label: "Kas & Bank",
    title: "Arus Kas & Bank",
    stats: [
      { name: "Saldo kas & bank", value: "Rp 214 jt", note: "4 rekening aktif" },
      { name: "Pemasukan hari ini", value: "Rp 12,8 jt", note: "↑ 12,8% dari kemarin" },
      { name: "Pengeluaran hari ini", value: "Rp 4,6 jt", note: "Terpantau" },
    ],
    cols: ["Transaksi", "Status", "Nilai"],
    rows: [
      { a: "Setoran penjualan", status: "done", b: "", c: "Rp 8,4 jt" },
      { a: "Bayar listrik & air", status: "done", b: "", c: "Rp 2,1 jt" },
      { a: "Transfer antar rekening", status: "proc", b: "", c: "Rp 5,0 jt" },
      { a: "Tarik tunai operasional", status: "done", b: "", c: "Rp 1,8 jt" },
    ],
  },
  pembelian: {
    label: "Pembelian",
    title: "Aktivitas Pembelian",
    stats: [
      { name: "PO aktif", value: "12", note: "Menunggu penerimaan" },
      { name: "Nilai pembelian", value: "Rp 42 jt", note: "Bulan ini" },
      { name: "Supplier aktif", value: "18", note: "Terdaftar" },
    ],
    cols: ["Item", "Status", "Nilai"],
    rows: [
      { a: "Bahan baku kopi", status: "proc", b: "", c: "Rp 9,6 jt" },
      { a: "Kemasan & cup", status: "done", b: "", c: "Rp 4,2 jt" },
      { a: "Susu & syrup", status: "done", b: "", c: "Rp 6,4 jt" },
      { a: "Perlengkapan dapur", status: "proc", b: "", c: "Rp 2,8 jt" },
    ],
  },
  laporan: {
    label: "Laporan",
    title: "Ringkasan Laporan",
    stats: [
      { name: "Laba bersih", value: "Rp 62 jt", note: "↑ 9,6% vs bulan lalu" },
      { name: "Omset", value: "Rp 428 jt", note: "↑ 7,8% vs bulan lalu" },
      { name: "Margin kotor", value: "38,4%", note: "Stabil" },
    ],
    cols: ["Laporan", "Status", "Periode"],
    rows: [
      { a: "Laba Rugi", status: "done", b: "", c: "Bulan ini" },
      { a: "Neraca", status: "done", b: "", c: "Bulan ini" },
      { a: "Arus Kas", status: "done", b: "", c: "Bulan ini" },
      { a: "Penjualan per produk", status: "done", b: "", c: "Bulan ini" },
    ],
  },
};

const accRows = [
  { code: "1101-0010", name: "Kas Besar", parent: "Tidak", type: "Kas", status: "Aktif" },
  { code: "1101-0020", name: "Kas Kecil", parent: "Tidak", type: "Kas", status: "Aktif" },
  { code: "1101-0030", name: "OVO", parent: "Tidak", type: "Kas", status: "Aktif" },
  { code: "1101-0040", name: "Shopee Pay", parent: "Tidak", type: "Kas", status: "Aktif" },
  { code: "1101-0041", name: "Kas Kasir", parent: "Tidak", type: "Kas", status: "Aktif" },
  { code: "1102-0010", name: "Bank Mandiri", parent: "Tidak", type: "Bank", status: "Aktif" },
  { code: "1102-0020", name: "Bank BCA", parent: "Tidak", type: "Bank", status: "Aktif" },
  { code: "1102-0021", name: "Bank CIMB", parent: "Tidak", type: "Bank", status: "Aktif" },
  { code: "1102-0022", name: "Bank BRI", parent: "Tidak", type: "Bank", status: "Aktif" },
];

const navItems: { key: ViewKey; icon: typeof Storefront }[] = [
  { key: "penjualan", icon: Storefront },
  { key: "inventori", icon: Package },
  { key: "akunting", icon: Calculator },
  { key: "kasbank", icon: Wallet },
  { key: "pembelian", icon: ShoppingCart },
  { key: "laporan", icon: FileText },
];

function AccountingDashboard() {
  const [kodeQ, setKodeQ] = useState("");
  const [namaQ, setNamaQ] = useState("");
  const [parentF, setParentF] = useState("Semua");
  const [typeQ, setTypeQ] = useState("");
  const [statusF, setStatusF] = useState("Semua");

  const filtered = accRows.filter(
    (r) =>
      r.code.toLowerCase().includes(kodeQ.toLowerCase()) &&
      r.name.toLowerCase().includes(namaQ.toLowerCase()) &&
      r.type.toLowerCase().includes(typeQ.toLowerCase()) &&
      (parentF === "Semua" || r.parent === parentF) &&
      (statusF === "Semua" || r.status === statusF),
  );

  const sort = <span className="acc-sort" aria-hidden><i /><i /></span>;

  return (
    <div className="acc">
      <div className="acc-tabs">
        <span className="acc-tab" aria-hidden>Dashboard</span>
        <span className="acc-tab is-on" aria-hidden>Daftar Akun <i aria-hidden>×</i></span>
        <span className="acc-tab" aria-hidden>Jurnal <i aria-hidden>×</i></span>
        <span className="acc-tab" aria-hidden>Kurs <i aria-hidden>×</i></span>
        <span className="acc-tab" aria-hidden>Proses Tutup Buku <i aria-hidden>×</i></span>
        <span className="acc-tab-n" aria-hidden>4 <CaretDown size={10} weight="bold" /></span>
      </div>
      <div className="acc-sub" aria-hidden>
        <span className="acc-grid-btn acc-grid-btn--or"><SquaresFour size={15} weight="fill" /></span>
        <span className="acc-dtab"><FileText size={13} weight="regular" /> Data Baru <i>×</i></span>
      </div>
      <div className="acc-tools" aria-hidden>
        <span className="acc-new"><Plus size={14} weight="bold" /> Baru</span>
        <span className="acc-ref"><ArrowsClockwise size={15} /></span>
      </div>
      <div className="acc-scroll">
        <table className="acc-table" aria-label="Daftar akun">
          <thead>
            <tr className="acc-lbl">
              <th scope="col">#</th>
              <th scope="col">Kode Perkiraan{sort}</th>
              <th scope="col">Nama Akun{sort}</th>
              <th scope="col">Parent{sort}</th>
              <th scope="col">Tipe Akun{sort}</th>
              <th scope="col">Saldo Awal{sort}</th>
              <th scope="col">Status{sort}</th>
            </tr>
            <tr className="acc-filters">
              <th aria-hidden />
              <th><input value={kodeQ} onChange={(e) => setKodeQ(e.target.value)} placeholder="Filter Kode Perkiraan" aria-label="Filter kode perkiraan" /></th>
              <th><input value={namaQ} onChange={(e) => setNamaQ(e.target.value)} placeholder="Filter Nama Akun" aria-label="Filter nama akun" /></th>
              <th>
                <select value={parentF} onChange={(e) => setParentF(e.target.value)} aria-label="Filter parent">
                  <option>Semua</option><option>Tidak</option><option>Ya</option>
                </select>
              </th>
              <th><input value={typeQ} onChange={(e) => setTypeQ(e.target.value)} placeholder="Filter Tipe Akun" aria-label="Filter tipe akun" /></th>
              <th><input placeholder="Filter Saldo Awal" aria-label="Filter saldo awal" /></th>
              <th>
                <select value={statusF} onChange={(e) => setStatusF(e.target.value)} aria-label="Filter status">
                  <option>Semua</option><option>Aktif</option><option>Nonaktif</option>
                </select>
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => (
              <tr key={r.code}>
                <td className="acc-td-n">{i + 1}</td>
                <td>{r.code}</td>
                <td className="acc-td-name">{r.name}</td>
                <td><span className="acc-badge">{r.parent}</span></td>
                <td>{r.type}</td>
                <td className="acc-td-saldo"><span className="acc-clear" aria-hidden>×</span></td>
                <td><span className="acc-status">{r.status}</span></td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={7} className="acc-empty">Tidak ada data yang cocok.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="acc-foot">
        <span className="acc-rows-per">
          Baris Persen Halaman :
          <select defaultValue="100" aria-label="Baris per halaman">
            <option value="100">100</option>
            <option value="50">50</option>
            <option value="25">25</option>
          </select>
        </span>
        <span className="acc-pager">
          <span className="acc-pg acc-pg--off"><CaretLeft size={11} weight="bold" /> Sebelumnya</span>
          <span className="acc-pg acc-pg--on">1</span>
          <span className="acc-pg">2</span>
          <span className="acc-pg">Selanjutnya <CaretRight size={11} weight="bold" /></span>
        </span>
        <span className="acc-note">Menampilkan 1 Hingga 100 Dari 154 Hasil</span>
      </div>
    </div>
  );
}

function SalesDashboard() {
  const sort = <span className="acc-sort" aria-hidden><i /><i /></span>;

  return (
    <div className="acc">
      <div className="acc-tabs">
        <span className="acc-tab" aria-hidden>Dashboard</span>
        <span className="acc-tab is-on" aria-hidden>Nota Kredit Penjualan <i aria-hidden>×</i></span>
        <span className="acc-tab" aria-hidden>Nota Debit Penjualan <i aria-hidden>×</i></span>
        <span className="acc-tab" aria-hidden>Penawaran <i aria-hidden>×</i></span>
        <span className="acc-tab" aria-hidden>Pesanan Penjualan <i aria-hidden>×</i></span>
        <span className="acc-tab" aria-hidden>Pengiriman Pesanan <i aria-hidden>×</i></span>
        <span className="acc-tab-n" aria-hidden>10 <CaretDown size={10} weight="bold" /></span>
      </div>
      <div className="acc-sub" aria-hidden>
        <span className="acc-grid-btn"><SquaresFour size={15} weight="fill" /></span>
        <span className="acc-dtab"><FileText size={13} weight="regular" /> Data Baru <i>×</i></span>
      </div>
      <div className="acc-tools">
        <span className="acc-date">
          Tanggal
          <span className="acc-date-in" aria-hidden>01/10/2026 <CalendarBlank size={13} weight="regular" /></span>
          <span className="acc-date-in" aria-hidden>20/10/2026 <CalendarBlank size={13} weight="regular" /></span>
        </span>
        <span className="acc-new" aria-hidden><Plus size={14} weight="bold" /> Baru</span>
        <span className="acc-ref" aria-hidden><ArrowsClockwise size={15} /></span>
        <span className="acc-detail" aria-hidden><i className="acc-cb" /> Detail</span>
      </div>
      <div className="acc-scroll">
        <table className="acc-table" aria-label="Nota kredit penjualan">
          <thead>
            <tr className="acc-lbl">
              <th scope="col">#</th>
              <th scope="col">Nomor{sort}</th>
              <th scope="col">Tanggal{sort}</th>
              <th scope="col">Keterangan{sort}</th>
              <th scope="col">Akun Perkiraan{sort}</th>
              <th scope="col">Status{sort}</th>
            </tr>
            <tr className="acc-filters">
              <th aria-hidden />
              <th><input placeholder="Filter Nomor" aria-label="Filter nomor" /></th>
              <th><input placeholder="Filter Tanggal" aria-label="Filter tanggal" /></th>
              <th><input placeholder="Filter Keterangan" aria-label="Filter keterangan" /></th>
              <th><input placeholder="Filter Akun Perkiraan" aria-label="Filter akun perkiraan" /></th>
              <th>
                <select aria-label="Filter status">
                  <option>Semua</option><option>Proses</option><option>Selesai</option>
                </select>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr><td colSpan={6} className="acc-spacer" /></tr>
          </tbody>
        </table>
      </div>
      <div className="acc-foot">
        <span className="acc-rows-per">
          Baris Persen Halaman :
          <select defaultValue="100" aria-label="Baris per halaman">
            <option value="100">100</option>
            <option value="50">50</option>
            <option value="25">25</option>
          </select>
        </span>
        <span className="acc-pager">
          <span className="acc-pg acc-pg--off"><CaretLeft size={11} weight="bold" /> Sebelumnya</span>
          <span className="acc-pg acc-pg--off">Selanjutnya <CaretRight size={11} weight="bold" /></span>
        </span>
        <span className="acc-note">Menampilkan 1 Hingga 0 Dari 0 Hasil</span>
      </div>
      <div className="acc-rec" aria-hidden>Rec : 0</div>
    </div>
  );
}

const invRows = [
  { desc: "Gula Aren 1kg", note: "Restock", gudang: "Utama", qty: "24", satuan: "kg", harga: "18.500", total: "444.000" },
  { desc: "Susu Full Cream", note: "Supplier ABC", gudang: "Utama", qty: "36", satuan: "pcs", harga: "21.000", total: "756.000" },
  { desc: "Cup 16oz", note: "Produksi", gudang: "Kemasan", qty: "800", satuan: "pcs", harga: "1.250", total: "1.000.000" },
];

function InventoryDashboard() {
  const sort = <span className="acc-sort" aria-hidden><i /><i /></span>;

  return (
    <div className="acc acc--inv">
      <div className="acc-tabs">
        <span className="acc-tab" aria-hidden>Dashboard</span>
        <span className="acc-tab is-on" aria-hidden>Mutasi Masuk <i aria-hidden>×</i></span>
        <span className="acc-tab" aria-hidden>Mutasi Keluar <i aria-hidden>×</i></span>
        <span className="acc-tab" aria-hidden>Stok Transfer <i aria-hidden>×</i></span>
        <span className="acc-tab" aria-hidden>Stok Opname <i aria-hidden>×</i></span>
        <span className="acc-tab" aria-hidden>Merakit <i aria-hidden>×</i></span>
        <span className="acc-tab" aria-hidden>Stok Detail <i aria-hidden>×</i></span>
        <span className="acc-tab" aria-hidden>Titip &amp; Ambil <i aria-hidden>×</i></span>
        <span className="acc-tab-n" aria-hidden>8 <CaretDown size={10} weight="bold" /></span>
      </div>
      <div className="acc-sub" aria-hidden>
        <span className="acc-grid-btn acc-grid-btn--or"><SquaresFour size={15} weight="fill" /></span>
        <span className="acc-dtab"><FileText size={13} weight="regular" /> Data Baru <i>×</i></span>
      </div>
      <div className="acc-sub acc-sub--plain" aria-hidden>
        <span className="acc-dtab"><FileText size={13} weight="regular" /> Umum</span>
      </div>
      <div className="acc-tools acc-tools--inv" aria-hidden>
        <span className="acc-auto"><i className="acc-cb acc-cb--on" /> Auto</span>
        <span className="acc-notrans">
          <b>No Trans</b>
          <em>Pilih Konfigurasi No Trans...</em>
          <span className="acc-search"><MagnifyingGlass size={12} weight="bold" /></span>
        </span>
        <span className="acc-date">
          Tanggal
          <span className="acc-date-in">20/10/2026 <CalendarBlank size={12} weight="regular" /></span>
        </span>
        <span className="acc-date">
          Jam
          <span className="acc-date-in acc-date-in--clock">12:04:04 <Clock size={12} weight="regular" /></span>
        </span>
      </div>
      <div className="acc-inv-actions">
        <span className="acc-btn"><Plus size={13} weight="bold" aria-hidden /> Baru</span>
        <span className="acc-btn"><Plus size={13} weight="bold" aria-hidden /> Tambah Dari Katalog</span>
      </div>
      <div className="acc-scroll">
        <table className="acc-table acc-table--inv" aria-label="Mutasi masuk inventori">
          <thead>
            <tr className="acc-lbl">
              <th scope="col">Aksi{sort}</th>
              <th scope="col">Deskripsi{sort}</th>
              <th scope="col">Keterangan{sort}</th>
              <th scope="col">Gudang{sort}</th>
              <th scope="col" className="acc-num">Qty{sort}</th>
              <th scope="col">Satuan{sort}</th>
              <th scope="col" className="acc-num">@ Harga{sort}</th>
              <th scope="col" className="acc-num">Grand Total{sort}</th>
            </tr>
          </thead>
          <tbody>
            {invRows.map((r) => (
              <tr key={r.desc}>
                <td className="acc-td-n">+</td>
                <td className="acc-td-name">{r.desc}</td>
                <td>{r.note}</td>
                <td>{r.gudang}</td>
                <td className="acc-num">{r.qty}</td>
                <td>{r.satuan}</td>
                <td className="acc-num">{r.harga}</td>
                <td className="acc-num">{r.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="acc-rec acc-rec--inv">
        <span>Rec : 3</span>
        <span className="acc-rec-sums"><b>0,00</b><b>2.200.000</b></span>
      </div>
      <div className="acc-fab" aria-hidden>
        <span className="acc-fab-btn acc-fab-btn--save"><FloppyDisk size={15} weight="fill" /></span>
        <span className="acc-fab-btn acc-fab-btn--edit"><NotePencil size={15} weight="fill" /></span>
        <span className="acc-fab-btn acc-fab-btn--off"><Prohibit size={15} weight="bold" /></span>
        <span className="acc-fab-btn acc-fab-btn--void"><Circle size={15} weight="bold" /></span>
      </div>
    </div>
  );
}

export function ProductPreview({
  withChrome = false,
  view: viewProp,
  onViewChange,
}: {
  withChrome?: boolean;
  view?: ViewKey;
  onViewChange?: (view: ViewKey) => void;
}) {
  const [innerView, setInnerView] = useState<ViewKey>("penjualan");
  const view = viewProp ?? innerView;
  const setView = (next: ViewKey) => {
    setInnerView(next);
    onViewChange?.(next);
  };
  const data = views[view];
  const isAcc = view === "akunting";
  const isSales = view === "penjualan";
  const isInv = view === "inventori";

  const panel = (
    <div className="pv-body">
      <div className="pv-side">
        <div className="pv-brand">Buka Nota</div>
        {navItems.map(({ key, icon: Icon }) => (
          <button
            key={key}
            type="button"
            className="pv-nav"
            aria-current={view === key}
            onClick={() => setView(key)}
          >
            <Icon size={15} weight="regular" aria-hidden />
            {views[key].label}
          </button>
        ))}
      </div>
      <div className={isAcc || isSales || isInv ? "pv-main pv-main--flush" : "pv-main"}>
        {isAcc ? (
          <AccountingDashboard />
        ) : isSales ? (
          <SalesDashboard />
        ) : isInv ? (
          <InventoryDashboard />
        ) : (
          <>
            <div className="pv-head">
              <h4>{data.title}</h4>
              <span className="pv-demo-tag">Data demo</span>
            </div>
            <div className="pv-stats">
              {data.stats.map((s) => (
                <div className="pv-stat" key={s.name}>
                  <small>{s.name}</small>
                  <strong>{s.value}</strong>
                  <span className="up">{s.note}</span>
                </div>
              ))}
            </div>
            <div className="pv-table" role="table" aria-label={data.title}>
              <div className="pv-row pv-row--head" role="row">
                <span role="columnheader">{data.cols[0]}</span>
                <span role="columnheader">{data.cols[1]}</span>
                <span role="columnheader">{data.cols[2]}</span>
              </div>
              {data.rows.map((r) => (
                <div className="pv-row" role="row" key={r.a}>
                  <span role="cell">{r.a}</span>
                  <span role="cell">
                    <span className={`pv-tag pv-tag--${r.status}`}>
                      {r.status === "done" ? "Selesai" : "Proses"}
                    </span>
                  </span>
                  <span role="cell">{r.c}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );

  if (!withChrome) {
    return (
      <div className="pv">
        {panel}
      </div>
    );
  }

  return (
    <div className="pv">
      <div className="pv-chrome" aria-hidden><i /><i /><i /></div>
      {panel}
      <div className="pv-float">
        <small>Arus kas hari ini</small>
        <strong>Rp 4,2 jt</strong>
        <span className="up">↑ 12,8% dari kemarin</span>
      </div>
    </div>
  );
}
