import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, message: "Email tidak valid." }, { status: 400 });
    }
    // Mock: simpan ke DB / kirim ke email service (Mailchimp, Resend, dll)
    // Di sini kita hanya log dan return sukses — ganti dengan integrasi nyata jika perlu
    console.log("[newsletter] new subscriber:", email);
    // Simulate latency
    await new Promise((r) => setTimeout(r, 400));
    return NextResponse.json({ success: true, message: "Berhasil bergabung! Cek email untuk konfirmasi." });
  } catch {
    return NextResponse.json({ success: false, message: "Gagal memproses, coba lagi." }, { status: 500 });
  }
}
