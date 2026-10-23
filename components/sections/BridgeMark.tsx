// ============================================
// WHAT THIS FILE DOES (plain English):
// This is a small line drawing of a bridge, used as a quiet accent
// on Home and About. It is an original site mark for the "bridge"
// line. It is not a Crew Finance illustration. Those drawings are
// not in this repo yet.
// ============================================

type BridgeMarkProps = {
  className?: string;
};

export function BridgeMark({ className }: BridgeMarkProps) {
  return (
    <svg
      viewBox="0 0 180 72"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      {/* A slightly uneven arch, so it feels drawn rather than generated */}
      <path
        d="M8 54c18 0 28-30 52-33 22-3 34 8 48 8 16 0 28-18 64-16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path d="M10 58h160" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M36 58V46M62 58V34M96 58V30M128 58V40M154 58V48" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}
