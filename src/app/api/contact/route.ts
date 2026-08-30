import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site-config";

export async function POST(req: Request) {
  try {
    const { name, email, message, product } = await req.json();
    if (!name || !message) {
      return NextResponse.json(
        { success: false, message: "Nama dan pesan wajib diisi." },
        { status: 400 }
      );
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, message: "Email tidak valid." },
        { status: 400 }
      );
    }

    console.log("[contact message received]", {
      brand: siteConfig.brand.name,
      name,
      email,
      message,
      product,
      date: new Date().toISOString(),
    });

    // Simpan ke Firebase jika ada
    const dbUrl =
      siteConfig.firebase.databaseUrl ||
      process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ||
      process.env.FIREBASE_DATABASE_URL;

    if (dbUrl) {
      const cleanUrl = dbUrl.replace(/\/$/, "");
      const contactId = `contact_${Date.now()}`;
      await fetch(`${cleanUrl}/contacts/${contactId}.json`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email: email || "",
          message,
          product: product || "",
          createdAt: new Date().toISOString(),
        }),
      }).catch((e) => console.warn("[Firebase Contact Save Error]", e));
    }

    await new Promise((r) => setTimeout(r, 300));
    return NextResponse.json({
      success: true,
      message:
        "Pesan Anda telah berhasil dikirim ke tim Aesthetic of Indonesia! Kami akan menindaklanjuti pesan Anda secepatnya.",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Gagal mengirim pesan." },
      { status: 500 }
    );
  }
}
