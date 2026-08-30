import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site-config";

// Rate limiter sederhana in-memory (mencegah spam submission)
const ipRateLimit = new Map<string, { count: number; resetAt: number }>();

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "anonymous";
    const now = Date.now();

    // Batasi maksimal 5 submission per 2 menit per IP
    const rateData = ipRateLimit.get(ip) || { count: 0, resetAt: now + 120000 };
    if (now > rateData.resetAt) {
      rateData.count = 0;
      rateData.resetAt = now + 120000;
    }
    if (rateData.count >= 5) {
      return NextResponse.json(
        {
          success: false,
          message: "Terlalu banyak permintaan. Silakan tunggu 2 menit sebelum mengirim kembali.",
        },
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
      status: "new", // "new" | "processed" | "completed" | "cancelled"
      createdAt: new Date().toISOString(),
      source: "ai_chatbot",
    };

    console.log("[INQUIRY RECEIVED FOR ADMIN PANEL]", inquiryData);

    // Simpan ke Firebase Realtime Database di node terstruktur /inquiries
    const dbUrl =
      siteConfig.firebase.databaseUrl ||
      process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ||
      process.env.FIREBASE_DATABASE_URL;

    if (dbUrl) {
      const cleanUrl = dbUrl.replace(/\/$/, "");
      await fetch(`${cleanUrl}/inquiries/${inquiryId}.json`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inquiryData),
      });

      // Update counter ringkas harian (efisien, hanya 1 baris)
      const dateKey = new Date().toISOString().split("T")[0];
      await fetch(`${cleanUrl}/stats/${dateKey}/totalInquiries.json`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ".sv": { "increment": 1 } }),
      }).catch(() => {});
    }

    return NextResponse.json({
      success: true,
      inquiryId,
      message: "Data pesanan/konsultasi Anda telah tercatat dengan aman di panel kami!",
    });
  } catch (err: any) {
    console.error("[Inquiry API Error]", err);
    return NextResponse.json(
      { success: false, message: "Gagal menyimpan data ke panel pesanan." },
      { status: 500 }
    );
  }
}
