import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="border-t border-sand-200 bg-[#faf7f2] text-charcoal">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Col */}
          <div>
            <p className="font-display text-lg font-medium tracking-wide">
              {siteConfig.brand.name}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-stone-500">
              Katalog referensi produk tas anyaman, topi, dan sandal bertema pesisir pantai.
            </p>
            <div className="mt-4 text-xs text-stone-600 space-y-1">
              <p>{siteConfig.brand.address}</p>
              <p>{siteConfig.brand.email}</p>
              <p>Instagram: @{siteConfig.brand.instagram}</p>
            </div>
          </div>

          {/* Navigasi Katalog */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal">
              Kategori
            </h4>
            <ul className="mt-3 space-y-2 text-xs text-stone-600">
              <li>
                <Link href="/collections/shop-all" className="hover:text-ocean transition">
                  Semua Koleksi
                </Link>
              </li>
              <li>
                <Link href="/collections/beach-bags" className="hover:text-ocean transition">
                  Tas Pantai
                </Link>
              </li>
              <li>
                <Link href="/collections/sun-hats" className="hover:text-ocean transition">
                  Topi Anyaman
                </Link>
              </li>
              <li>
                <Link href="/collections/footwear" className="hover:text-ocean transition">
                  Sandal
                </Link>
              </li>
            </ul>
          </div>

          {/* Informasi */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal">
              Informasi
            </h4>
            <ul className="mt-3 space-y-2 text-xs text-stone-600">
              <li>
                <Link href="/pages/lookbook" className="hover:text-ocean transition">
                  Lookbook
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-ocean transition">
                  Kontak & Lokasi
                </Link>
              </li>
              <li>
                <a
                  href={`https://instagram.com/${siteConfig.brand.instagram}`}
                  target="_blank"
                  rel="noopener"
                  className="hover:text-ocean transition"
                >
                  Instagram @{siteConfig.brand.instagram}
                </a>
              </li>
            </ul>
          </div>

          {/* Jam Operasional */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal">
              Jam Operasional
            </h4>
            <div className="mt-3 text-xs text-stone-600 space-y-1 leading-relaxed">
              <p>{siteConfig.brand.operationalHours.weekdays}</p>
              <p>{siteConfig.brand.operationalHours.weekend}</p>
              <p className="text-[11px] text-stone-400 mt-2">
                Informasi dan pertanyaan dapat disampaikan melalui halaman kontak.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-sand-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-stone-400">
          <p>© 2026 {siteConfig.brand.name}. Seluruh hak cipta dilindungi.</p>
          <p>Katalog Koleksi Bertema Pantai</p>
        </div>
      </div>
    </footer>
  );
}
