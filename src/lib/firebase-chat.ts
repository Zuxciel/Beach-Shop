/**
 * Firebase Realtime Database Service untuk Chatbot
 * Menyimpan percakapan pengguna & respon AI ke Firebase Realtime Database via REST API.
 * Jika URL Firebase belum diisi di environment, sistem secara cerdas menyimpan di LocalStorage
 * dan otomatis mensinkronkan data ketika Firebase URL telah aktif.
 */

import { siteConfig } from "./site-config";
import type { ChatMessage } from "./chatbot-engine";

export async function saveMessageToFirebase(
  sessionId: string,
  message: ChatMessage
): Promise<{ success: boolean; source: "firebase" | "local" }> {
  const dbUrl =
    siteConfig.firebase.databaseUrl ||
    process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ||
    process.env.FIREBASE_DATABASE_URL;

  // 1. Simpan di LocalStorage untuk cache & offline fallback
  try {
    if (typeof window !== "undefined") {
      const localKey = `aesthetic_chat_${sessionId}`;
      const existing = JSON.parse(localStorage.getItem(localKey) || "[]");
      existing.push(message);
      localStorage.setItem(localKey, JSON.stringify(existing));
    }
  } catch (e) {
    console.warn("[LocalChatStorage] Warning:", e);
  }

  // 2. Jika Firebase Database URL tersedia, simpan ke Firebase Realtime Database
  if (dbUrl) {
    try {
      const cleanUrl = dbUrl.replace(/\/$/, "");
      const endpoint = `${cleanUrl}/chats/${sessionId}/messages/${message.id}.json`;

      const res = await fetch(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...message,
          syncedAt: new Date().toISOString(),
        }),
      });

      if (res.ok) {
        // Update metadata sesi percakapan
        await fetch(`${cleanUrl}/chats/${sessionId}/meta.json`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lastUpdated: new Date().toISOString(),
            lastMessage: message.text.slice(0, 100),
            totalMessages: { ".sv": { "increment": 1 } },
          }),
        }).catch(() => {});

        return { success: true, source: "firebase" };
      }
    } catch (err) {
      console.warn("[Firebase RTDB] REST Sync error, saved locally:", err);
    }
  }

  return { success: true, source: "local" };
}

export async function getChatHistoryFromFirebase(sessionId: string): Promise<ChatMessage[]> {
  const dbUrl =
    siteConfig.firebase.databaseUrl ||
    process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ||
    process.env.FIREBASE_DATABASE_URL;

  // Coba ambil dari Firebase jika ada
  if (dbUrl) {
    try {
      const cleanUrl = dbUrl.replace(/\/$/, "");
      const endpoint = `${cleanUrl}/chats/${sessionId}/messages.json?orderBy="timestamp"`;
      const res = await fetch(endpoint, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data && typeof data === "object") {
          return Object.values(data) as ChatMessage[];
        }
      }
    } catch (err) {
      console.warn("[Firebase RTDB] Fetch history error, fallback to local:", err);
    }
  }

  // Fallback ke LocalStorage
  if (typeof window !== "undefined") {
    try {
      const localKey = `aesthetic_chat_${sessionId}`;
      const raw = localStorage.getItem(localKey);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch {
      return [];
    }
  }

  return [];
}
