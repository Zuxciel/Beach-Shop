"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import type { ChatMessage } from "@/lib/chatbot-engine";
import { saveMessageToFirebase, getChatHistoryFromFirebase } from "@/lib/firebase-chat";

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Inisialisasi sesi percakapan
  useEffect(() => {
    let sid = "";
    try {
      sid = localStorage.getItem("aesthetic_chat_session_id") || "";
      if (!sid) {
        sid = `session_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
        localStorage.setItem("aesthetic_chat_session_id", sid);
      }
    } catch {
      sid = `session_${Date.now()}`;
    }
    setSessionId(sid);

    // Ambil histori chat sebelumnya
    getChatHistoryFromFirebase(sid).then((history) => {
      if (history && history.length > 0) {
        setMessages(history);
      } else {
        // Pesan sambutan awal
        const welcomeMsg: ChatMessage = {
          id: "welcome_msg",
          sender: "bot",
          text: siteConfig.chatbot.welcomeMessage,
          timestamp: Date.now(),
          suggestions: siteConfig.chatbot.quickSuggestions,
        };
        setMessages([welcomeMsg]);
        saveMessageToFirebase(sid, welcomeMsg);
      }
    });

    // Event listener global untuk membuka chat dari tombol manapun di website
    const handleOpenChat = (event: any) => {
      setIsOpen(true);
      setUnreadCount(0);
      if (event.detail?.message) {
        setTimeout(() => {
          handleSendMessage(event.detail.message);
        }, 300);
      }
    };

    window.addEventListener("open-aesthetic-chat", handleOpenChat as EventListener);
    return () => {
      window.removeEventListener("open-aesthetic-chat", handleOpenChat as EventListener);
    };
  }, []);

  // Auto-scroll ke pesan terbawah saat ada pesan baru
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = async (textToSend: string) => {
    const cleanText = textToSend.trim();
    if (!cleanText || isTyping) return;

    setInputValue("");

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      sender: "user",
      text: cleanText,
      timestamp: Date.now(),
    };

    // Tambah pesan user ke UI
    setMessages((prev) => [...prev, userMsg]);
    saveMessageToFirebase(sessionId, userMsg);
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: cleanText,
          sessionId,
          history: messages.slice(-6),
        }),
      });

      const data = await res.json();
      // Simulasi jeda pengetikan agar terasa natural seperti asisten cerdas
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (data.success && data.botMessage) {
        setMessages((prev) => [...prev, data.botMessage]);
        saveMessageToFirebase(sessionId, data.botMessage);
      } else {
        throw new Error("Gagal mendapatkan balasan.");
      }
    } catch {
      const fallbackBotMsg: ChatMessage = {
        id: `bot_err_${Date.now()}`,
        sender: "bot",
        text: `Maaf, terjadi kendala saat memproses jawaban. Anda tetap dapat menjelajahi seluruh koleksi tas, topi, dan sandal melalui menu katalog kami.`,
        timestamp: Date.now(),
        suggestions: ["👜 Semua Koleksi", "📍 Lokasi Toko", "✉️ Hubungi Kontak"],
        actionLinks: [{ label: "Buka Katalog", url: "/collections/shop-all" }],
      };
      setMessages((prev) => [...prev, fallbackBotMsg]);
      saveMessageToFirebase(sessionId, fallbackBotMsg);
    } finally {
      setIsTyping(false);
    }
  };

  const handleResetChat = () => {
    const newSid = `session_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    try {
      localStorage.setItem("aesthetic_chat_session_id", newSid);
    } catch {}
    setSessionId(newSid);

    const welcomeMsg: ChatMessage = {
      id: `welcome_${Date.now()}`,
      sender: "bot",
      text: siteConfig.chatbot.welcomeMessage,
      timestamp: Date.now(),
      suggestions: siteConfig.chatbot.quickSuggestions,
    };
    setMessages([welcomeMsg]);
    saveMessageToFirebase(newSid, welcomeMsg);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-20 right-4 z-40 md:bottom-6 md:right-6">
        {!isOpen && (
          <button
            onClick={() => {
              setIsOpen(true);
              setUnreadCount(0);
            }}
            aria-label="Buka AI Chatbot"
            className="group relative flex h-14 items-center gap-2.5 rounded-full bg-ocean px-4 text-white shadow-xl shadow-ocean/30 transition-all duration-300 hover:scale-105 hover:bg-[#0f2e2c] focus:outline-none"
          >
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
              </span>
            </div>
            <span className="hidden pr-1 text-xs font-medium tracking-wide sm:inline">Tanya Asisten AI</span>
            {unreadCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-clay text-[10px] font-bold text-white shadow-md">
                {unreadCount}
              </span>
            )}
          </button>
        )}
      </div>

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="fixed bottom-0 right-0 z-50 flex h-[100dvh] w-full flex-col bg-white shadow-2xl transition-all sm:bottom-6 sm:right-6 sm:h-[600px] sm:max-h-[85vh] sm:w-[400px] sm:rounded-3xl sm:border sm:border-sand-200">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-sand-200 bg-ocean px-5 py-4 text-white sm:rounded-t-3xl">
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-lg">
                🌊
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-ocean bg-emerald-400"></span>
              </div>
              <div>
                <h3 className="font-medium text-sm leading-tight">{siteConfig.chatbot.botName}</h3>
                <p className="text-[11px] text-white/80">Aesthetic of Indonesia • Online</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                title="Mulai Sesi Percakapan Baru"
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/15 transition text-white/80 hover:text-white"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                  <path d="M21 3v5h-5" />
                  <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                  <path d="M8 16H3v5" />
                </svg>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/15 transition text-white/80 hover:text-white"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto bg-[#faf8f5] p-4 space-y-4 text-sm">
            <div className="text-center">
              <span className="inline-block rounded-full bg-sand-200/60 px-3 py-1 text-[11px] text-stone-500">
                Terhubung ke Realtime Database • Simulasi AI
              </span>
            </div>

            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    m.sender === "user"
                      ? "rounded-br-xs bg-ocean text-white shadow-sm"
                      : "rounded-bl-xs border border-sand-200 bg-white text-charcoal shadow-sm"
                  }`}
                >
                  <p className="whitespace-pre-line">{m.text}</p>

                  {/* Action Links jika bot menyarankan link halaman */}
                  {m.actionLinks && m.actionLinks.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2 pt-2 border-t border-sand-100">
                      {m.actionLinks.map((al, idx) => (
                        <Link
                          key={idx}
                          href={al.url}
                          onClick={() => {
                            if (window.innerWidth < 640) setIsOpen(false);
                          }}
                          className="inline-flex items-center gap-1 rounded-lg bg-sand-100 px-3 py-1.5 text-xs font-semibold text-ocean hover:bg-sand-200 transition"
                        >
                          {al.label} →
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Quick suggestions chips untuk pesan bot terakhir */}
                {m.sender === "bot" && m.suggestions && m.suggestions.length > 0 && (
                  <div className="mt-2.5 flex max-w-[90%] flex-wrap gap-1.5">
                    {m.suggestions.map((sug, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(sug)}
                        className="rounded-full border border-sand-200 bg-white px-3 py-1 text-xs text-stone-700 hover:border-ocean hover:bg-ocean/5 hover:text-ocean transition"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start">
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-xs border border-sand-200 bg-white px-4 py-3 text-stone-500 shadow-sm">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-ocean/70" style={{ animationDelay: "0ms" }}></span>
                  <span className="h-2 w-2 animate-bounce rounded-full bg-ocean/70" style={{ animationDelay: "150ms" }}></span>
                  <span className="h-2 w-2 animate-bounce rounded-full bg-ocean/70" style={{ animationDelay: "300ms" }}></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputValue);
            }}
            className="border-t border-sand-200 bg-white p-3 sm:rounded-b-3xl"
          >
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ketik pertanyaan (cth: Rekomendasi tas pantai)..."
                className="flex-1 rounded-full border border-sand-200 bg-[#fdfbf7] px-4 py-2.5 text-sm outline-none transition focus:border-ocean focus:bg-white"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-ocean text-white transition hover:bg-[#0f2e2c] disabled:opacity-40"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
              </button>
            </div>
            <div className="mt-2 flex items-center justify-between px-2 text-[10px] text-stone-400">
              <span>Aesthetic of Indonesia AI</span>
              <span>Katalog & Bantuan</span>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
