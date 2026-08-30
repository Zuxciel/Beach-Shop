"use client";

import { useState, useEffect } from "react";
import { siteConfig } from "@/lib/site-config";

export function AnnouncementBar() {
  const { messages, intervalMs, enabled, dismissible } = siteConfig.announcement;
  const [dismissed, setDismissed] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (dismissed || !enabled) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % messages.length), intervalMs);
    return () => clearInterval(id);
  }, [dismissed, enabled, intervalMs, messages.length]);

  if (!enabled || dismissed) return null;

  return (
    <div className="relative z-30 flex min-h-8 items-center justify-center bg-ocean px-8 py-2 text-center text-[10px] xs:text-[11px] sm:text-xs font-medium tracking-wide text-white">
      <p className="max-w-[78vw] xs:max-w-[82vw] sm:max-w-[90vw] break-words leading-tight line-clamp-2 animate-in transition-all duration-500">{messages[index]}</p>
      {dismissible && (
        <button
          aria-label="Dismiss announcement"
          onClick={() => setDismissed(true)}
          className="absolute right-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full hover:bg-white/10 transition"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="sm:w-[14px] sm:h-[14px]">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
