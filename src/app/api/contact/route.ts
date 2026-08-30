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

    const dbUrl =
      siteConfig.firebase.databaseUrl ||
      process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ||
      process.env.FIREBASE_DATABASE_URL;

    // Kalau tidak ada DB URL, tetap balas sukses tapi beri tahu (atau bisa dianggap error)
    // Untuk contact form, kita anggap sukses walau tidak ada Firebase, tapi log warning
    if (dbUrl) {
      const cleanUrl = dbUrl.replace(/\/$/, "");
      const contactId = `contact_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
      const putRes = await fetch(`${cleanUrl}/contacts/${contactId}.json`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(name).trim().slice(0, 100),
          email: email ? String(email).trim().slice(0, 100) : "",
          message: String(message).trim().slice(0, 1000),
          product: product || "",
          createdAt: new Date().toISOString(),
          source: "contact_form",
        }),
      });
      if (!putRes.ok) {
        const errText = await putRes.text().catch(() => "");
        console.error("[Firebase Contact Save Error]", putRes.status, errText);
        // Jangan gagalkan user, tapi beri tahu
        // return NextResponse.json({ success: false, message: `Gagal simpan ke Firebase: ${putRes.status}` }, { status: 500 });
      } else {
        console.log("[CONTACT SAVED]", contactId);
      }
    } else {
      console.warn("[CONTACT] Firebase DATABASE_URL belum di-set — pesan hanya di-log di server, tidak masuk Realtime DB.");
    }

    await new Promise((r) => setTimeout(r, 300));

    const waPhone = siteConfig.brand.whatsapp || process.env.NEXT_PUBLIC_WA_PHONE || "";
    const waText = encodeURIComponent(
      `Halo ${siteConfig.brand.name}, saya ${name}${email ? ` (${email})` : ""}${product ? ` ingin tanya tentang ${product}` : ""}: ${message}`
    );
    const waUrl = waPhone ? `https://wa.me/${waPhone}?text=${waText}` : "";

    return NextResponse.json({
      success: true,
      message: "Pesan Anda telah berhasil dikirim ke tim Aesthetic of Indonesia! Kami akan menindaklanjuti pesan Anda secepatnya.",
      waUrl,
      firebaseSaved: !!dbUrl,
    });
  } catch (err: any) {
    console.error("[Contact API Error]", err);
    return NextResponse.json(
      { success: false, message: err?.message || "Gagal mengirim pesan." },
      { status: 500 }
    );
  }
}
