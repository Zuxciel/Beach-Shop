import { NextResponse } from "next/server";
import { processChatbotMessage, type ChatMessage } from "@/lib/chatbot-engine";
import { siteConfig } from "@/lib/site-config";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, sessionId, history = [] } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { success: false, message: "Pesan tidak boleh kosong." },
        { status: 400 }
      );
    }

    const currentSessionId = sessionId || `session_${Date.now()}`;
    const userMsgId = `msg_user_${Date.now()}`;
    const botMsgId = `msg_bot_${Date.now() + 1}`;

    const userMessage: ChatMessage = {
      id: userMsgId,
      sender: "user",
      text: message,
      timestamp: Date.now(),
    };

    // Proses melalui algoritma simulasi AI Chatbot
    const intentResult = processChatbotMessage(message, history);

    const botMessage: ChatMessage = {
      id: botMsgId,
      sender: "bot",
      text: intentResult.text,
      timestamp: Date.now() + 300,
      suggestions: intentResult.suggestions,
      actionLinks: intentResult.actionLinks,
    };

    // Coba sync ke Firebase Realtime Database jika URL tersedia
    const dbUrl =
      siteConfig.firebase.databaseUrl ||
      process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ||
      process.env.FIREBASE_DATABASE_URL;

    if (dbUrl) {
      const cleanUrl = dbUrl.replace(/\/$/, "");
      try {
        await Promise.all([
          fetch(`${cleanUrl}/chats/${currentSessionId}/messages/${userMsgId}.json`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userMessage),
          }),
          fetch(`${cleanUrl}/chats/${currentSessionId}/messages/${botMsgId}.json`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(botMessage),
          }),
        ]);
      } catch (fbErr) {
        console.warn("[Firebase API Sync Warning]", fbErr);
      }
    }

    return NextResponse.json({
      success: true,
      sessionId: currentSessionId,
      userMessage,
      botMessage,
    });
  } catch (error: any) {
    console.error("[Chat API Error]", error);
    return NextResponse.json(
      { success: false, message: "Gagal memproses pesan chat." },
      { status: 500 }
    );
  }
}
