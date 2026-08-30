import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import Link from "next/link";
import { ContactForm } from "@/components/forms/ContactForm";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export const metadata: Metadata = {
  title: `Kontak | ${siteConfig.brand.name}`,
  description: `Hubungi ${siteConfig.brand.name} — katalog identitas bertema pantai, ilustrasi koleksi, cek ketersediaan via WhatsApp. Alamat Bali, chat WA ${siteConfig.brand.phone}.`,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Kontak | ${siteConfig.brand.name}`,
    description: `Hubungi ${siteConfig.brand.name} — WA ${siteConfig.brand.phone}, alamat ${siteConfig.brand.address}`,
    url: `${siteConfig.brand.url}/contact`,
    type: "website",
  },
};

export default function ContactPage() {
  const wa = `https://wa.me/${siteConfig.brand.whatsapp}?text=Halo%20Easthtic%20of%20Indonesia%20saya%20ingin%20tanya%20koleksi`;
  return (
    <div className="mx-auto max-w-[900px] px-4 md:px-6 py-10">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta-dark">Kontak Toko</p>
      <h1 className="mt-2 font-display text-3xl md:text-4xl">{siteConfig.brand.name}</h1>
      <p className="mt-2 text-sm text-stone-600">Katalog identitas untuk referensi visual — ilustrasi koleksi, ketersediaan & detail dapat berbeda. Konfirmasi via WhatsApp sebelum kunjungan/pemesanan.</p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-sand-200 bg-white p-6">
          <h2 className="font-medium">Alamat</h2>
          <p className="mt-2 text-sm leading-6 text-stone-600">{siteConfig.brand.address}<br />Bali, Indonesia</p>
          <h3 className="mt-6 font-medium">Kontak</h3>
          <p className="mt-2 text-sm text-stone-600">Email: <a href={`mailto:${siteConfig.brand.email}`} className="text-ocean underline">{siteConfig.brand.email}</a></p>
          <p className="text-sm text-stone-600">WA: <a href={wa} target="_blank" rel="noopener" className="text-ocean underline">{siteConfig.brand.phone}</a></p>
          <p className="text-sm text-stone-600">IG: <a href={`https://instagram.com/${siteConfig.brand.instagram}`} target="_blank" rel="noopener" className="text-ocean underline">@{siteConfig.brand.instagram}</a></p>
          <div className="mt-6 flex gap-2">
            <a href={wa} target="_blank" rel="noopener" className="inline-flex rounded-full bg-ocean px-6 py-2.5 text-sm font-medium text-white hover:bg-[#0f2e2c]">Chat WhatsApp</a>
            <a href={`mailto:${siteConfig.brand.email}`} className="inline-flex rounded-full border border-sand-200 bg-white px-6 py-2.5 text-sm font-medium hover:border-ocean">Email</a>
          </div>
        </div>

        <div className="rounded-2xl border border-sand-200 bg-sand-50 p-6">
          <h2 className="font-medium">Cara Tanya Ketersediaan</h2>
          <ol className="mt-3 list-decimal pl-5 text-sm leading-6 text-stone-600 space-y-1">
            <li>Lihat katalog ilustrasi di <Link href="/collections/shop-all" className="text-ocean underline">Semua Koleksi</Link></li>
            <li>Buka halaman detail sebagai referensi visual (bukan jaminan stok)</li>
            <li>Chat WhatsApp sebut nama koleksi yang ditanyakan</li>
            <li>Kami bantu cek info terbaru — ketersediaan dapat berubah</li>
          </ol>
          <h3 className="mt-6 font-medium">Jam Buka (ilustrasi)</h3>
          <p className="mt-1 text-sm text-stone-600">Senin — Sabtu: 09:00–18:00 WITA (dapat berubah)<br />Minggu: 10:00–16:00 (konfirmasi via WA)</p>
          <div className="mt-6 rounded-xl bg-white p-4 border border-sand-200">
            <p className="text-xs font-semibold uppercase tracking-widest text-stone-500">Disclaimer</p>
            <p className="mt-1 text-xs leading-5 text-stone-600">Situs ini hanya katalog identitas ilustratif. Tidak ada keranjang/checkout otomatis. Foto, harga, deskripsi, dan ketersediaan bersifat referensi dan dapat berbeda dengan kondisi aktual. Hubungi WhatsApp untuk konfirmasi sebelum keputusan.</p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-sand-200 bg-white p-6">
          <h2 className="font-medium">Kirim Pesan</h2>
          <p className="mt-1 text-xs text-stone-500">Form ini akan kirim ke WhatsApp {siteConfig.brand.phone} & email kami via API.</p>
          <div className="mt-4">
            <ContactForm />
          </div>
        </div>
        <div className="rounded-2xl border border-sand-200 bg-sand-50 p-6">
          <h2 className="font-medium">Daftar Kabar Katalog</h2>
          <p className="mt-1 text-xs text-stone-500">Email untuk kabar koleksi — data tersimpan via <code>/api/newsletter</code>.</p>
          <div className="mt-4">
            <NewsletterForm placeholder="Email Anda" />
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-2xl overflow-hidden border border-sand-200 bg-white">
        <div className="h-64 bg-sand-100 flex items-center justify-center text-sm text-stone-500">
          Peta — {siteConfig.brand.address} (embed Google Maps bisa ditambahkan di sini)
        </div>
      </div>
    </div>
  );
}
