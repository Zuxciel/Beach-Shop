import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site-config";

// Rate limiter sederhana in-memory
const ipRateLimit = new Map<string, { count: number; resetAt: number }>();

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "anonymous";
    const now = Date.now();

    const rateData = ipRateLimit.get(ip) || { count: 0, resetAt: now + 120000 };
    if (now > rateData.resetAt) {
      rateData.count = 0;
      rateData.resetAt = now + 120000;
    }
    if (rateData.count >= 5) {
      return NextResponse.json(
        { success: false, message: "Terlalu banyak permintaan. Silakan tunggu 2 menit sebelum mengirim kembali." },
        { status: 429 }
      );
    }
    rateData.count += 1;
    ipRateLimit.set(ip, rateData);

    const body = await req.json();
    const { customerName, contact, notes, product, type = "order_inquiry" } = body;

    if (!customerName || !contact) {
      return NextResponse.json(
        { success: false, message: "Nama dan kontak (No. WA/Email) wajib diisi." },
        { status: 400 }
      );
    }

    const inquiryId = `inq_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const inquiryData = {
      id: inquiryId,
      customerName: String(customerName).trim().slice(0, 100),
      contact: String(contact).trim().slice(0, 100),
      notes: notes ? String(notes).trim().slice(0, 500) : "",
      product: product || null,
      type,
      status: "new" as const,
      createdAt: new Date().toISOString(),
      source: "ai_chatbot" as const,
    };

    // Firebase - wajib ada, kalau tidak ada jangan pura-pura sukses
    const dbUrl =
      siteConfig.firebase.databaseUrl ||
      process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ||
      process.env.FIREBASE_DATABASE_URL;

    if (!dbUrl || dbUrl.trim() === "") {
      console.error("[INQUIRY] Firebase DATABASE_URL belum dikonfigurasi! Set NEXT_PUBLIC_FIREBASE_DATABASE_URL di .env / Vercel Env.");
      // Tetap log tapi beri tahu client bahwa panel tidak akan terisi
      return NextResponse.json(
        {
          success: false,
          message: "Konfigurasi Firebase belum lengkap: NEXT_PUBLIC_FIREBASE_DATABASE_URL belum di-set di server. Data tidak bisa disimpan ke Realtime Database. Cek .env atau Vercel Environment Variables.",
          inquiryId,
          debug: "missing_database_url",
        },
        { status: 503 }
      );
    }

    const cleanUrl = dbUrl.replace(/\/$/, "");

    // Tulis inquiry
    const putRes = await fetch(`${cleanUrl}/inquiries/${inquiryId}.json`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inquiryData),
    });

    if (!putRes.ok) {
      const errText = await putRes.text().catch(() => "");
      console.error("[INQUIRY] Gagal PUT ke Firebase:", putRes.status, putRes.statusText, errText);
      // Cek kemungkinan rules
      if (putRes.status === 401 || putRes.status === 403) {
        return NextResponse.json(
          {
            success: false,
            message: `Gagal menyimpan ke Firebase (HTTP ${putRes.status}): Rules menolak write. Atur di Firebase Console > Realtime Database > Rules: { "rules": { "inquiries": { ".write": true, ".read": "auth != null" } } } atau pakai auth token. Detail: ${errText.slice(0, 200)}`,
            inquiryId,
          },
          { status: 500 }
        );
      }
      return NextResponse.json(
        { success: false, message: `Gagal menyimpan ke Firebase (HTTP ${putRes.status}). Cek DATABASE_URL & Rules.`, inquiryId },
        { status: 500 }
      );
    }

    console.log("[INQUIRY SAVED]", inquiryId, "->", `${cleanUrl}/inquiries/${inquiryId}.json`);

    // Stats harian - non-kritis, jangan gagalkan request kalau ini error
    const dateKey = new Date().toISOString().split("T")[0];
    fetch(`${cleanUrl}/stats/${dateKey}/totalInquiries.json`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(1), // set 1 dulu, nanti bisa di-aggregate; increment server via .sv tidak work di REST tanpa auth
    }).catch((e) => console.warn("[Stats] non-kritis gagal:", e));

    return NextResponse.json({
      success: true,
      inquiryId,
      message: "Data pesanan/konsultasi Anda telah tercatat dengan aman di panel kami!",
    });
  } catch (err: any) {
    console.error("[Inquiry API Error]", err);
    return NextResponse.json(
      { success: false, message: err?.message || "Gagal menyimpan data ke panel pesanan." },
      { status: 500 }
    );
  }
}
