"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import type { ChatMessage, ProductCardData } from "@/lib/chatbot-engine";
import { submitInquiry } from "@/lib/firebase-chat";

// --- Rich Text Markdown Parser Component ---
function FormattedMessage({ text }: { text: string }) {
  const renderedElements = useMemo(() => {
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      if (!line.trim()) {
        return <div key={idx} className="h-1.5" />;
      }

      const parseInlineStyles = (content: string) => {
        const parts = content.split(/(\*\*.*?\*\*|\*.*?\*)/g);
        return parts.map((part, pIdx) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <strong key={pIdx} className="font-semibold text-charcoal">
                {part.slice(2, -2)}
              </strong>
            );
          }
          if (part.startsWith("*") && part.endsWith("*")) {
            return (
              <em key={pIdx} className="italic text-stone-600">
                {part.slice(1, -1)}
              </em>
            );
          }
          return part;
        });
      };

      if (line.trim().startsWith("• ") || line.trim().startsWith("- ")) {
        return (
          <div key={idx} className="flex items-start gap-1.5 my-0.5 pl-0.5">
            <span className="text-ocean font-bold text-xs mt-0.5 shrink-0">•</span>
            <span className="text-stone-700 leading-relaxed text-xs sm:text-sm">
              {parseInlineStyles(line.trim().slice(2))}
            </span>
          </div>
        );
      }

      const numMatch = line.trim().match(/^(\d+)\.\s(.*)/);
      if (numMatch) {
        return (
          <div key={idx} className="flex items-start gap-1.5 my-0.5 pl-0.5">
            <span className="flex h-4 w-4 items-center justify-center rounded bg-sand-200 text-[10px] font-bold text-charcoal shrink-0 mt-0.5">
              {numMatch[1]}
            </span>
            <span className="text-stone-700 leading-relaxed text-xs sm:text-sm">
              {parseInlineStyles(numMatch[2])}
            </span>
          </div>
        );
      }

      return (
        <p key={idx} className="my-0.5 leading-relaxed text-stone-700 text-xs sm:text-sm">
          {parseInlineStyles(line)}
        </p>
      );
    });
  }, [text]);

  return <div className="space-y-0.5">{renderedElements}</div>;
}

// --- In-Chat Inquiry / Order Form Card ---
function InChatInquiryForm({
  product,
  onSuccess,
}: {
  product?: { handle: string; title: string; price: string };
  onSuccess: (msg: string) => void;
}) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) {
      setError("Nama dan nomor kontak wajib diisi.");
      return;
    }
    setSubmitting(true);
    setError("");

    const res = await submitInquiry({
      customerName: name.trim(),
      contact: contact.trim(),
      notes: notes.trim(),
      product,
      type: "order_inquiry",
    });

    setSubmitting(false);
    if (res.success) {
      setSubmitted(true);
      onSuccess(
        `Pesanan untuk ${product?.title || "produk"} telah tercatat (No. Ref: ${res.inquiryId}). Tim kami akan segera menindaklanjuti!`
      );
    } else {
      setError(res.message);
    }
  };

  if (submitted) {
    return (
      <div className="mt-2.5 rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-800">
        <p className="font-semibold">✓ Data Pesanan Tercatat di Panel Toko</p>
        <p className="mt-0.5 text-[11px] text-emerald-700">
          Terima kasih {name}. Tim kami akan menghubungi Anda segera melalui {contact}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-2.5 rounded-xl border border-sand-200 bg-sand-50/90 p-3 space-y-2">
      <div className="flex items-center justify-between border-b border-sand-200 pb-1.5">
        <span className="text-xs font-semibold text-charcoal">
          Form Pesanan / Konsultasi
        </span>
        {product && (
          <span className="rounded-full bg-ocean/10 px-2 py-0.5 text-[10px] font-bold text-ocean truncate max-w-[130px]">
            {product.title}
          </span>
        )}
      </div>

      <div>
        <label className="text-[10px] font-medium text-stone-600">Nama Anda *</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Nama Lengkap"
          className="mt-0.5 w-full rounded-lg border border-sand-200 bg-white px-2.5 py-1.5 text-xs outline-none focus:border-ocean"
        />
      </div>

      <div>
        <label className="text-[10px] font-medium text-stone-600">No. WhatsApp / Email *</label>
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
          placeholder="08123456789 atau email@anda.com"
          className="mt-0.5 w-full rounded-lg border border-sand-200 bg-white px-2.5 py-1.5 text-xs outline-none focus:border-ocean"
        />
      </div>

      <div>
        <label className="text-[10px] font-medium text-stone-600">Catatan / Jumlah (opsional)</label>
        <input
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Contoh: Tanya stok 2 pcs warna natural"
          className="mt-0.5 w-full rounded-lg border border-sand-200 bg-white px-2.5 py-1.5 text-xs outline-none focus:border-ocean"
        />
      </div>

      {error && <p className="text-[10px] text-clay">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-ocean py-2 text-xs font-medium text-white shadow-sm hover:bg-[#0f2e2c] transition disabled:opacity-60"
      >
        {submitting ? "Mencatat ke Panel..." : "Kirim Data Pesanan ke Admin 📋"}
      </button>
    </form>
  );
}

// --- Main Chatbot Widget Component ---
export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastSentTimeRef = useRef<number>(0);

  // Body scroll lock on mobile when chat is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("chat-open");
    } else {
      document.body.classList.remove("chat-open");
    }
    return () => {
      document.body.classList.remove("chat-open");
    };
  }, [isOpen]);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("aesthetic_chat_history");
      if (saved) {
        setMessages(JSON.parse(saved));
      } else {
        const initialMsg: ChatMessage = {
          id: "welcome_init",
          sender: "bot",
          text: siteConfig.chatbot.welcomeMessage,
          timestamp: Date.now(),
          suggestions: siteConfig.chatbot.quickSuggestions,
        };
        setMessages([initialMsg]);
        sessionStorage.setItem("aesthetic_chat_history", JSON.stringify([initialMsg]));
      }
    } catch {
      setMessages([
        {
          id: "welcome_fallback",
          sender: "bot",
          text: siteConfig.chatbot.welcomeMessage,
          timestamp: Date.now(),
          suggestions: siteConfig.chatbot.quickSuggestions,
        },
      ]);
    }

    const handleOpenChat = (event: any) => {
      setIsOpen(true);
      setUnreadCount(0);
      if (event.detail?.message) {
        setTimeout(() => {
          handleSendMessage(event.detail.message);
        }, 200);
      }
    };

    window.addEventListener("open-aesthetic-chat", handleOpenChat as EventListener);
    return () => {
      window.removeEventListener("open-aesthetic-chat", handleOpenChat as EventListener);
    };
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      try {
        sessionStorage.setItem("aesthetic_chat_history", JSON.stringify(messages.slice(-20)));
      } catch {}
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = async (textToSend: string) => {
    const cleanText = textToSend.trim();
    if (!cleanText || isTyping) return;

    const now = Date.now();
    if (now - lastSentTimeRef.current < 400) return;
    lastSentTimeRef.current = now;

    setInputValue("");

    const userMsg: ChatMessage = {
      id: `usr_${now}`,
      sender: "user",
      text: cleanText,
      timestamp: now,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: cleanText,
          history: messages.slice(-4),
        }),
      });

      const data = await res.json();
      await new Promise((resolve) => setTimeout(resolve, 300));

      if (data.success && data.botMessage) {
        setMessages((prev) => [...prev, data.botMessage]);
      } else {
        throw new Error();
      }
    } catch {
      const fallbackMsg: ChatMessage = {
        id: `bot_fb_${Date.now()}`,
        sender: "bot",
        text: `Ada yang bisa saya bantu terkait koleksi **${siteConfig.brand.name}**? Anda juga dapat melihat katalog lengkap kami.`,
        timestamp: Date.now(),
        suggestions: ["👜 Rekomendasi Tas", "👒 Topi Pantai", "📍 Lokasi Toko"],
        actionLinks: [{ label: "Semua Koleksi", url: "/collections/shop-all" }],
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleResetChat = () => {
    const freshWelcome: ChatMessage = {
      id: `welcome_${Date.now()}`,
      sender: "bot",
      text: siteConfig.chatbot.welcomeMessage,
      timestamp: Date.now(),
      suggestions: siteConfig.chatbot.quickSuggestions,
    };
    setMessages([freshWelcome]);
    try {
      sessionStorage.setItem("aesthetic_chat_history", JSON.stringify([freshWelcome]));
    } catch {}
  };

  return (
    <>
      {/* Floating Launcher Button — positioned with clearance above bottom nav */}
      <div className="fixed bottom-[74px] right-3.5 z-30 sm:bottom-6 sm:right-6">
        {!isOpen && (
          <button
            onClick={() => {
              setIsOpen(true);
              setUnreadCount(0);
            }}
            aria-label="Buka AI Assistant"
            className="group relative flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-ocean text-white shadow-lg shadow-ocean/30 transition-all duration-300 hover:scale-105 hover:bg-[#0f2e2c] focus:outline-none"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
            </span>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-clay text-[9px] font-bold text-white shadow">
                {unreadCount}
              </span>
            )}
          </button>
        )}
      </div>

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white shadow-2xl transition-all sm:inset-auto sm:bottom-6 sm:right-6 sm:h-[600px] sm:max-h-[85vh] sm:w-[400px] sm:rounded-3xl sm:border sm:border-sand-200">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-sand-200 bg-ocean px-4 py-3.5 text-white sm:px-5 sm:py-4 sm:rounded-t-3xl">
            <div className="flex items-center gap-2.5">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-base">
                🌊
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-ocean bg-emerald-400"></span>
              </div>
              <div>
                <h3 className="font-medium text-xs sm:text-sm leading-tight">{siteConfig.chatbot.botName}</h3>
                <p className="text-[10px] sm:text-[11px] text-white/80">{siteConfig.brand.name} • Online</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                title="Bersihkan Percakapan"
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/15 transition text-white/80 hover:text-white"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                  <path d="M21 3v5h-5" />
                  <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                  <path d="M8 16H3v5" />
                </svg>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/15 transition text-white/80 hover:text-white"
                aria-label="Tutup Chat"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto bg-[#faf8f5] p-3 space-y-3 text-sm">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[92%] sm:max-w-[88%] rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 leading-relaxed ${
                    m.sender === "user"
                      ? "rounded-br-xs bg-ocean text-white shadow-sm"
                      : "rounded-bl-xs border border-sand-200 bg-white text-charcoal shadow-sm"
                  }`}
                >
                  {m.sender === "user" ? (
                    <p className="whitespace-pre-line text-white text-xs sm:text-sm">{m.text}</p>
                  ) : (
                    <FormattedMessage text={m.text} />
                  )}

                  {/* Product Mini Cards UI */}
                  {m.productCards && m.productCards.length > 0 && (
                    <div className="mt-2.5 space-y-2 pt-2 border-t border-sand-100">
                      {m.productCards.map((p) => (
                        <div
                          key={p.handle}
                          className="flex items-center gap-2 rounded-xl border border-sand-200 bg-[#fdfbf7] p-2 hover:border-ocean/40 transition"
                        >
                          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-sand-100">
                            <Image
                              src={p.imageUrl}
                              alt={p.title}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-xs text-charcoal truncate">{p.title}</p>
                            <p className="text-[11px] font-semibold text-clay">{p.price}</p>
                            <p className="text-[10px] text-stone-500 truncate">{p.material}</p>
                          </div>
                          <div className="flex flex-col gap-1 shrink-0">
                            <button
                              onClick={() => handleSendMessage(`Pesan ${p.title}`)}
                              className="rounded-md bg-ocean px-2 py-1 text-[10px] font-medium text-white shadow-xs hover:bg-[#0f2e2c]"
                            >
                              Pesan 🛒
                            </button>
                            <Link
                              href={`/products/${p.handle}`}
                              onClick={() => {
                                if (window.innerWidth < 640) setIsOpen(false);
                              }}
                              className="rounded-md border border-sand-200 bg-white px-2 py-0.5 text-[10px] font-medium text-stone-600 text-center hover:text-ocean"
                            >
                              Detail
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* In-Chat Inquiry Form */}
                  {m.showInquiryForm && (
                    <InChatInquiryForm
                      product={m.inquiryProduct}
                      onSuccess={(successMsg) => {
                        setMessages((prev) => [
                          ...prev,
                          {
                            id: `conf_${Date.now()}`,
                            sender: "bot",
                            text: successMsg,
                            timestamp: Date.now(),
                            suggestions: [
                              "👜 Lihat Koleksi Lainnya",
                              "📍 Alamat & Jam Buka",
                              "🌿 Tips Perawatan Anyaman",
                            ],
                            actionLinks: [{ label: "Semua Koleksi", url: "/collections/shop-all" }],
                          },
                        ]);
                      }}
                    />
                  )}

                  {/* Action Links */}
                  {m.actionLinks && m.actionLinks.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5 pt-1.5 border-t border-sand-100">
                      {m.actionLinks.map((al, idx) => (
                        <Link
                          key={idx}
                          href={al.url}
                          onClick={() => {
                            if (window.innerWidth < 640) setIsOpen(false);
                          }}
                          className="inline-flex items-center gap-1 rounded-lg bg-sand-100 px-2 py-1 text-[11px] sm:text-xs font-semibold text-ocean hover:bg-sand-200 transition"
                        >
                          {al.label} →
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Quick suggestions */}
                {m.sender === "bot" && m.suggestions && m.suggestions.length > 0 && (
                  <div className="mt-1.5 flex max-w-[95%] flex-wrap gap-1.5">
                    {m.suggestions.map((sug, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(sug)}
                        className="rounded-full border border-sand-200 bg-white px-2.5 py-1 text-[11px] sm:text-xs text-stone-700 hover:border-ocean hover:bg-ocean/5 hover:text-ocean transition shadow-xs"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-start">
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-xs border border-sand-200 bg-white px-3.5 py-2.5 text-stone-500 shadow-sm">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ocean/70" style={{ animationDelay: "0ms" }}></span>
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ocean/70" style={{ animationDelay: "150ms" }}></span>
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ocean/70" style={{ animationDelay: "300ms" }}></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputValue);
            }}
            className="border-t border-sand-200 bg-white p-2.5 sm:p-3 sm:rounded-b-3xl"
          >
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ketik pesan atau pilih topik..."
                className="flex-1 rounded-full border border-sand-200 bg-[#fdfbf7] px-3.5 py-2 text-xs sm:text-sm outline-none transition focus:border-ocean focus:bg-white"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-ocean text-white transition hover:bg-[#0f2e2c] disabled:opacity-40 shadow-sm"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
