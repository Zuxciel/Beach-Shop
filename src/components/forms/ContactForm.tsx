"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site-config";

export function ContactForm({ product }: { product?: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(product ? `Halo, saya ingin tanya tentang ${product}` : "");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setStatus("error");
      setMsg("Nama dan pesan wajib diisi.");
      return;
    }
    setStatus("loading");
    setMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim(), product }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Gagal");
      setStatus("success");
      setMsg(data.message);
      // Buka WhatsApp otomatis (dipakai juga di mobile)
      if (data.waUrl) {
        window.open(data.waUrl, "_blank", "noopener,noreferrer");
      } else {
        const waText = encodeURIComponent(`Halo Easthtic, saya ${name}${email ? ` (${email})` : ""}: ${message}`);
        window.open(`https://wa.me/${siteConfig.brand.whatsapp}?text=${waText}`, "_blank");
      }
      setName("");
      setEmail("");
      setMessage(product ? `Halo, saya ingin tanya tentang ${product}` : "");
    } catch (err: any) {
      setStatus("error");
      setMsg(err.message || "Gagal mengirim pesan.");
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div>
        <label className="text-xs font-medium">Nama *</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Nama Anda" className="mt-1 w-full rounded-xl border border-sand-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-ocean" />
      </div>
      <div>
        <label className="text-xs font-medium">Email (opsional)</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email@example.com" className="mt-1 w-full rounded-xl border border-sand-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-ocean" />
      </div>
      <div>
        <label className="text-xs font-medium">Pesan *</label>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} required rows={4} placeholder="Tulis pesan..." className="mt-1 w-full rounded-xl border border-sand-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-ocean" />
      </div>
      <button type="submit" disabled={status === "loading"} className="w-full rounded-full bg-ocean py-3 text-sm font-medium text-white hover:bg-[#0f2e2c] disabled:opacity-60">
        {status === "loading" ? "Mengirim..." : "Kirim ke WhatsApp"}
      </button>
      {msg && <p className={`text-xs ${status === "success" ? "text-emerald-600" : "text-clay"}`}>{msg}</p>}
      <p className="text-[11px] text-stone-500">Pesan akan dikirim via WhatsApp {siteConfig.brand.phone} — konfirmasi manual.</p>
    </form>
  );
}
