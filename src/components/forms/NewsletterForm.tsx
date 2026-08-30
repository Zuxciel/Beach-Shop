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
      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          className="flex-1 rounded-full border border-sand-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-ocean disabled:opacity-60"
          disabled={status === "loading"}
        />
        <button type="submit" disabled={status === "loading"} className="rounded-full bg-ocean px-6 py-2.5 text-sm font-medium text-white hover:bg-[#0f2e2c] disabled:opacity-60">
          {status === "loading" ? "..." : "Join"}
        </button>
      </form>
      {msg && <p className={`mt-2 text-xs ${status === "success" ? "text-emerald-600" : "text-clay"}`}>{msg}</p>}
    </div>
  );
}
