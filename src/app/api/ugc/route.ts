import { NextResponse } from "next/server";
import { ugcPosts } from "@/lib/data";

// Mock IG fetch — di produksi ganti dengan fetch ke Instagram Graph API
// Contoh: const res = await fetch(`https://graph.instagram.com/me/media?access_token=${token}`)

export async function GET() {
  // Simulasi delay jaringan
  await new Promise((r) => setTimeout(r, 300));
  // Kembalikan data typed UGCPost[] agar frontend bisa ganti ke sumber IG kapan saja
  return NextResponse.json({ success: true, data: ugcPosts });
}
