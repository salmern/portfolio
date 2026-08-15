export function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* base grid, faded toward the bottom of the viewport */}
      <div className="bg-grid mask-fade absolute inset-0 opacity-70" />

      {/* ambient glows */}
      <div
        className="absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full blur-[140px]"
        style={{
          background: "radial-gradient(closest-side, rgba(52,211,153,0.07), transparent)",
        }}
      />
      <div
        className="absolute right-[-320px] top-[38%] h-[520px] w-[520px] rounded-full blur-[160px]"
        style={{
          background: "radial-gradient(closest-side, rgba(148,163,184,0.05), transparent)",
        }}
      />

      {/* subtle vignette so the edges sit back */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 90% at 50% 0%, transparent 55%, rgba(4,4,6,0.6) 100%)",
        }}
      />
    </div>
  );
}
