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
    <div className="relative z-50 flex h-9 items-center justify-center bg-ocean px-4 text-center text-sm font-medium tracking-wide text-white md:h-8">
      <p className="animate-in transition-all duration-500">{messages[index]}</p>
      {dismissible && (
        <button
          aria-label="Dismiss announcement"
          onClick={() => setDismissed(true)}
          className="absolute right-3 flex h-6 w-6 items-center justify-center rounded-full hover:bg-white/10 transition"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
