import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, message, product } = await req.json();
    if (!name || !message) {
      return NextResponse.json({ success: false, message: "Nama dan pesan wajib diisi." }, { status: 400 });
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, message: "Email tidak valid." }, { status: 400 });
    }

    // Mock: kirim ke DB / email / CRM
    // Untuk identitas toko, kita log dan anggap terkirim.
    // Jika ingin kirim ke WhatsApp via API (WATI, Twilio), tambahkan di sini.
    console.log("[contact]", { name, email, message, product });

    // Buat link WhatsApp otomatis (dipakai frontend untuk redirect)
    const waPhone = process.env.NEXT_PUBLIC_WA_PHONE || "6281234567890";
    const waText = encodeURIComponent(
      `Halo Easthtic of Indonesia, saya ${name}${email ? ` (${email})` : ""}${product ? ` ingin tanya tentang ${product}` : ""}: ${message}`
    );
    const waUrl = `https://wa.me/${waPhone}?text=${waText}`;

    await new Promise((r) => setTimeout(r, 400));
    return NextResponse.json({ success: true, message: "Pesan diterima! Kami akan balas via WhatsApp/Email.", waUrl });
  } catch {
    return NextResponse.json({ success: false, message: "Gagal mengirim pesan." }, { status: 500 });
  }
}
