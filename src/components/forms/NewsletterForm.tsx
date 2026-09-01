"use client";

import { useState } from "react";

export function NewsletterForm({ placeholder = "Email Anda" }: { placeholder?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    setMsg("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Gagal");
      setStatus("success");
      setMsg(data.message);
      setEmail("");
    } catch (err: any) {
      setStatus("error");
      setMsg(err.message || "Gagal, coba lagi.");
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={onSubmit} className="flex gap-2 newsletter-form-responsive">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          className="flex-1 min-w-0 rounded-full border border-sand-200 bg-white px-4 max-[400px]:px-3 py-2.5 text-sm max-[400px]:text-xs outline-none focus:border-ocean focus:ring-1 focus:ring-ocean/20 disabled:opacity-60 transition-all"
          disabled={status === "loading"}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-full btn-premium px-6 max-[400px]:px-5 py-2.5 text-sm max-[400px]:text-xs font-medium text-white disabled:opacity-60 shrink-0 transition-all"
        >
          {status === "loading" ? "..." : "Join"}
        </button>
      </form>
      {msg && <p className={`mt-2 text-xs ${status === "success" ? "text-emerald-600" : "text-clay"}`}>{msg}</p>}
    </div>
  );
}
