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

  const openChat = () => {
    window.dispatchEvent(
      new CustomEvent("open-aesthetic-chat", {
        detail: {
          message: message || (product ? `Tanya tentang ${product}` : "Halo! Saya ingin konsultasi."),
        },
      })
    );
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div>
        <label className="text-xs font-medium text-charcoal">Nama Lengkap *</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Nama Anda"
          className="mt-1 w-full rounded-xl border border-sand-200 bg-[#fdfbf7] px-4 py-2.5 text-sm outline-none transition focus:border-ocean focus:bg-white"
        />
      </div>
      <div>
        <label className="text-xs font-medium text-charcoal">Email *</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
          placeholder="email@example.com"
          className="mt-1 w-full rounded-xl border border-sand-200 bg-[#fdfbf7] px-4 py-2.5 text-sm outline-none transition focus:border-ocean focus:bg-white"
        />
      </div>
      <div>
        <label className="text-xs font-medium text-charcoal">Pesan / Pertanyaan *</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={4}
          placeholder="Tuliskan pertanyaan atau kebutuhan Anda..."
          className="mt-1 w-full rounded-xl border border-sand-200 bg-[#fdfbf7] px-4 py-2.5 text-sm outline-none transition focus:border-ocean focus:bg-white"
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-2 pt-1">
        <button
          type="submit"
          disabled={status === "loading"}
          className="flex-1 rounded-full bg-ocean py-3 text-sm font-medium text-white shadow hover:bg-[#0f2e2c] transition disabled:opacity-60"
        >
          {status === "loading" ? "Mengirim..." : "Kirim Pesan"}
        </button>
        <button
          type="button"
          onClick={openChat}
          className="rounded-full border border-sand-200 bg-sand-100 px-5 py-3 text-sm font-medium text-ocean hover:bg-sand-200 transition"
        >
          Tanya Asisten AI 💬
        </button>
      </div>

      {msg && (
        <div
          className={`mt-2 rounded-xl p-3 text-xs leading-5 ${
            status === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-red-50 text-clay border border-red-200"
          }`}
        >
          {msg}
        </div>
      )}
      <p className="text-[11px] text-stone-500">
        Pesan Anda akan diterima oleh tim {siteConfig.brand.name}.
      </p>
    </form>
  );
}
