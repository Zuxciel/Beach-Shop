"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site-config";

export function ContactForm({ product }: { product?: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(
    product ? `Halo, saya ingin menanyakan informasi tentang ${product}` : ""
  );
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
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          product,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Gagal mengirim pesan.");

      setStatus("success");
      setMsg(data.message || "Pesan berhasil dikirim! Tim kami akan segera menindaklanjuti.");
      setName("");
      setEmail("");
      setMessage(product ? `Halo, saya ingin menanyakan informasi tentang ${product}` : "");
    } catch (err: any) {
      setStatus("error");
      setMsg(err.message || "Gagal mengirim pesan, silakan coba lagi.");
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-charcoal">Nama Lengkap *</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Nama Anda"
          className="mt-1 w-full rounded-lg border border-sand-300 bg-white px-3.5 py-2.5 text-sm text-charcoal outline-none transition focus:border-ocean focus:ring-1 focus:ring-ocean"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-charcoal">Alamat Email *</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
          placeholder="email@anda.com"
          className="mt-1 w-full rounded-lg border border-sand-300 bg-white px-3.5 py-2.5 text-sm text-charcoal outline-none transition focus:border-ocean focus:ring-1 focus:ring-ocean"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-charcoal">Pesan / Pertanyaan *</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={4}
          placeholder="Tuliskan pertanyaan Anda mengenai produk atau ketersediaan katalog..."
          className="mt-1 w-full rounded-lg border border-sand-300 bg-white px-3.5 py-2.5 text-sm text-charcoal outline-none transition focus:border-ocean focus:ring-1 focus:ring-ocean"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full inline-flex h-11 items-center justify-center rounded-lg bg-ocean px-6 text-xs font-medium uppercase tracking-wider text-white shadow-xs hover:bg-[#0f2422] transition-colors disabled:opacity-60"
      >
        {status === "loading" ? "Mengirim..." : "Kirim Pesan"}
      </button>

      {msg && (
        <div
          className={`rounded-lg p-3 text-xs leading-relaxed ${
            status === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-red-50 text-clay border border-red-200"
          }`}
        >
          {msg}
        </div>
      )}
    </form>
  );
}
