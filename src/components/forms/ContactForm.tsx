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
      setMsg(data.message || "Pesan berhasil dikirim! Tim kami akan segera merespon.");
      setName("");
      setEmail("");
      setMessage(product ? `Halo, saya ingin menanyakan informasi tentang ${product}` : "");
    } catch (err: any) {
      setStatus("error");
      setMsg(err.message || "Gagal mengirim pesan, silakan coba lagi.");
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3.5 sm:space-y-4">
      <div>
        <label className="block text-[11px] sm:text-xs font-semibold text-charcoal">Nama Lengkap *</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Nama Anda"
          className="mt-1 w-full rounded-xl border border-sand-200 bg-[#fdfbf7] px-3.5 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm text-charcoal outline-none transition focus:border-ocean focus:bg-white focus:ring-1 focus:ring-ocean/20"
        />
      </div>

      <div>
        <label className="block text-[11px] sm:text-xs font-semibold text-charcoal">Alamat Email *</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
          placeholder="email@example.com"
          className="mt-1 w-full rounded-xl border border-sand-200 bg-[#fdfbf7] px-3.5 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm text-charcoal outline-none transition focus:border-ocean focus:bg-white focus:ring-1 focus:ring-ocean/20"
        />
      </div>

      <div>
        <label className="block text-[11px] sm:text-xs font-semibold text-charcoal">Pesan / Pertanyaan *</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={3}
          placeholder="Tuliskan pertanyaan atau kebutuhan Anda..."
          className="mt-1 w-full rounded-xl border border-sand-200 bg-[#fdfbf7] px-3.5 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm text-charcoal outline-none transition focus:border-ocean focus:bg-white focus:ring-1 focus:ring-ocean/20 resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full btn-premium py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-white shadow-sm disabled:opacity-60 cursor-pointer"
      >
        {status === "loading" ? "Mengirim Pesan..." : "Kirim Pesan"}
      </button>

      {msg && (
        <div
          className={`rounded-xl p-3 text-xs leading-relaxed ${
            status === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-red-50 text-clay border border-red-200"
          }`}
        >
          {msg}
        </div>
      )}
      <p className="text-[10px] sm:text-[11px] text-stone-500 text-center">
        Pesan Anda akan diterima oleh tim {siteConfig.brand.name}.
      </p>
    </form>
  );
}
