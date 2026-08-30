import { NextResponse } from "next/server";
import { processChatbotMessage } from "@/lib/chatbot-engine";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, history = [] } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { success: false, message: "Pesan tidak boleh kosong." },
        { status: 400 }
      );
    }

    const cleanMsg = message.trim().slice(0, 500); // Batasi panjang pesan untuk efisiensi
    const intentResult = processChatbotMessage(cleanMsg, history);

    const botMessage = {
      id: `msg_bot_${Date.now()}`,
      sender: "bot",
      text: intentResult.text,
      timestamp: Date.now(),
      suggestions: intentResult.suggestions,
      actionLinks: intentResult.actionLinks,
      productCards: intentResult.productCards,
      showInquiryForm: intentResult.showInquiryForm,
      inquiryProduct: intentResult.inquiryProduct,
    };

    return NextResponse.json({
      success: true,
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
