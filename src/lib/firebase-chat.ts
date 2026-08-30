/**
 * Firebase Realtime Database Service — Dioptimalkan untuk Efisiensi & Panel Admin
 * Hanya mengirimkan data-data penting (Pesanan, Leads, Inquiries) ke database.
 * Percakapan umum disimpan di client-side (LocalStorage) untuk mencegah pemborosan kuota/memori.
 */

import { siteConfig } from "./site-config";

export interface InquiryPayload {
  customerName: string;
  contact: string;
  notes?: string;
  product?: { handle: string; title: string; price: string };
  type?: "order_inquiry" | "stock_check" | "custom_request";
}

export async function submitInquiry(
  payload: InquiryPayload
): Promise<{ success: boolean; message: string; inquiryId?: string }> {
  try {
    const res = await fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || "Gagal mengirim data pesanan.");
    }

    return {
      success: true,
      message: data.message,
      inquiryId: data.inquiryId,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message || "Terjadi kesalahan saat menghubungi server.",
    };
  }
}
