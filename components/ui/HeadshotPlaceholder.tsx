// ============================================
// WHAT THIS FILE DOES (plain English):
// This stands in for the real portrait photo until one is added. It
// shows a tasteful framed box with a camera icon and a small label, so
// the About page looks finished even before the headshot exists. Swap it
// out once assets.headshot is set in content/site.ts.
// ============================================

import { Camera } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type HeadshotPlaceholderProps = {
  label?: string;
  ratio?: "square" | "portrait";
  className?: string;
};

// THIS SECTION DOES: render a framed placeholder in either a square or portrait shape
export function HeadshotPlaceholder({
  label = "Headshot",
  ratio = "portrait",
  className = "",
}: HeadshotPlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={`${label} placeholder`}
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-panel border border-line bg-surface/60",
        ratio === "square" ? "aspect-square" : "aspect-[4/5]",
        className
      )}
    >
      {/* THIS SECTION DOES: draw a faint diagonal texture so the empty frame still feels designed */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(0,0,0,0.035) 0px, rgba(0,0,0,0.035) 1px, transparent 1px, transparent 10px)",
        }}
      />
      <div className="relative flex flex-col items-center gap-2 text-ink-soft">
        <Camera className="h-5 w-5" aria-hidden="true" />
        <span className="font-mono text-[10px] uppercase tracking-[0.16em]">{label}</span>
      </div>
    </div>
  );
}
