"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Play, RotateCcw } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { cn } from "@/lib/utils";

interface LogLine {
  text: string;
  tone?: "ok" | "warn" | "dim";
}

interface FlowStep {
  id: string;
  code: string;
  title: string;
  sub: string;
  log: LogLine[];
  ms: number;
}

const steps: FlowStep[] = [
  {
    id: "request",
    code: "REQ",
    title: "Request",
    sub: "POST /v1/payments",
    ms: 380,
    log: [
      { text: "POST /v1/payments", tone: "dim" },
      { text: "body: amount=1250.00 ngn · idempotency-key=7f3c…", tone: "dim" },
      { text: "accepted → routed to api gateway", tone: "ok" },
    ],
  },
  {
    id: "api",
    code: "API",
    title: "API gateway",
    sub: "route · authenticate",
    ms: 420,
    log: [
      { text: "route matched · /v1/payments", tone: "dim" },
      { text: "jwt verified · scope payments.write", tone: "ok" },
      { text: "request forwarded to merchant service", tone: "dim" },
    ],
  },
  {
    id: "validation",
    code: "VAL",
    title: "Validation",
    sub: "amount · idempotency",
    ms: 460,
    log: [
      { text: "amount=1250.00 > 0 · rust_decimal, no floats", tone: "ok" },
      { text: "idempotency key: no prior result — first attempt", tone: "ok" },
      { text: "signature & payload integrity verified", tone: "ok" },
    ],
  },
  {
    id: "logic",
    code: "BIZ",
    title: "Business logic",
    sub: "double-entry · fees",
    ms: 520,
    log: [
      { text: "debit merchant virtual account …", tone: "dim" },
      { text: "fee split: processor 0.75% + flat 25.00", tone: "dim" },
      { text: "amounts computed in decimal · exact", tone: "ok" },
      { text: "instruction enqueued to redis queue", tone: "ok" },
    ],
  },
  {
    id: "ledger",
    code: "DB",
    title: "Ledger",
    sub: "PostgreSQL · transaction",
    ms: 520,
    log: [
      { text: "BEGIN;", tone: "dim" },
      { text: "insert payment · insert ledger entries", tone: "dim" },
      { text: "constraints hold · COMMIT;", tone: "ok" },
      { text: "settlement worker notified", tone: "ok" },
    ],
  },
  {
    id: "response",
    code: "RES",
    title: "Response",
    sub: "201 Created",
    ms: 380,
    log: [
      { text: "201 Created", tone: "ok" },
      { text: "reference: pay_9x2… · receipt queued", tone: "dim" },
      { text: "webhook scheduled for merchant", tone: "ok" },
    ],
  },
];

export function SystemFlow() {
  const [step, setStep] = useState(-1);
  const [line, setLine] = useState(0);
  const [log, setLog] = useState<{ text: string; tone?: LogLine["tone"] }[]>([]);
  const [playing, setPlaying] = useState(false);
  const [done, setDone] = useState(false);
  const [started, setStarted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Array<HTMLDivElement | null>>([]);
  const logRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-120px" });
  const reduce = useReducedMotion();

  const reset = useCallback(() => {
    setStep(-1);
    setLine(0);
    setLog([]);
    setPlaying(false);
    setDone(false);
    setStarted(false);
  }, []);

  const play = useCallback(() => {
    setStep(0);
    setLine(0);
    setLog([]);
    setDone(false);
    setStarted(true);
    setPlaying(true);
  }, []);

  /* playback engine */
  useEffect(() => {
    if (!playing || step < 0) return;
    const s = steps[step];

    if (line < s.log.length) {
      const t = setTimeout(() => {
        setLog((prev) => [...prev, s.log[line]]);
        setLine((l) => l + 1);
      }, reduce ? 0 : s.ms);
      return () => clearTimeout(t);
    }

    if (step < steps.length - 1) {
      const t = setTimeout(() => {
        setStep((v) => v + 1);
        setLine(0);
      }, reduce ? 0 : 260);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setPlaying(false);
      setDone(true);
    }, reduce ? 0 : 420);
    return () => clearTimeout(t);
  }, [playing, step, line, reduce]);

  /* auto-run once when scrolled into view */
  useEffect(() => {
    if (inView && !started && !reduce) {
      play();
    }
  }, [inView, started, reduce, play]);

  /* scroll log to bottom */
  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [log]);

  /* packet position */
  const [dotY, setDotY] = useState(0);
  useEffect(() => {
    const node = step >= 0 ? nodeRefs.current[step] : null;
    const container = containerRef.current;
    if (!node || !container) return;
    const update = () => {
      setDotY(
        node.offsetTop - container.offsetTop + node.clientHeight / 2 - 4
      );
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [step]);

  const active = Math.max(0, step);

  return (
    <section id="system" className="relative z-10 border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
        <Reveal>
          <SectionHeading
            index="07"
            label="Systems in motion"
            title="A payment intent, traced end to end."
            description="This is how I think about a request moving through a system — every hop validated, every step accounted for. Press run, or watch it go."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-14">
            {/* ── pipeline ─────────────────────────────────── */}
            <div className="flex flex-col">
              <div className="mb-5 flex items-center justify-between">
                <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-ink-3">
                  pipeline: payment intent
                </p>
                <p className="font-mono text-[11px] tracking-[0.2em] text-ink-2">
                  {done ? (
                    <span className="text-accent">COMPLETE · 6/6</span>
                  ) : started ? (
                    <>STEP {String(Math.min(active + 1, 6)).padStart(2, "0")}/06</>
                  ) : (
                    "IDLE"
                  )}
                </p>
              </div>

              <div ref={containerRef} className="relative flex flex-col">
                {/* rail + packet */}
                <div className="absolute bottom-4 left-[13px] top-4 w-px bg-line" aria-hidden="true" />
                <motion.div
                  aria-hidden="true"
                  className="absolute left-[9px] z-10 h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_rgba(52,211,153,0.9)]"
                  animate={reduce ? undefined : { y: dotY }}
                  transition={{ duration: reduce ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
                  style={{ top: 0 }}
                />

                {steps.map((s, i) => {
                  const state = !started ? "pending" : i < active ? "done" : i === active ? "active" : "pending";
                  return (
                    <div key={s.id} className="flex gap-4 py-1.5">
                      {/* marker */}
                      <div className="relative z-[5] flex w-7 shrink-0 items-center justify-center">
                        <span
                          className={cn(
                            "flex h-7 w-7 items-center justify-center border font-mono text-[9px] tracking-wider transition-all duration-300",
                            state === "active" && "border-accent bg-accent-soft text-accent",
                            state === "done" && "border-accent-line bg-accent-soft/50 text-accent",
                            state === "pending" && "border-line-strong bg-surface-2 text-ink-3"
                          )}
                        >
                          {s.code}
                        </span>
                      </div>

                      <div
                        ref={(el) => {
                          nodeRefs.current[i] = el;
                        }}
                        className={cn(
                          "flex-1 border px-5 py-4 transition-all duration-300",
                          state === "active" &&
                            "border-accent-line bg-accent-soft/60 shadow-[0_0_24px_rgba(52,211,153,0.08)]",
                          state === "done" && "border-line-strong bg-surface/60",
                          state === "pending" && "border-line bg-surface/30"
                        )}
                      >
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                          <h3
                            className={cn(
                              "font-display text-[15px] font-medium transition-colors duration-300",
                              state === "active" ? "text-ink" : "text-ink-2"
                            )}
                          >
                            {s.title}
                          </h3>
                          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">{s.sub}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* controls */}
              <div className="mt-7 flex items-center gap-3">
                {done ? (
                  <button
                    type="button"
                    onClick={play}
                    className="group inline-flex items-center gap-2 bg-accent px-5 py-2.5 text-[13px] font-medium text-[#04120c] transition-all duration-300 hover:shadow-[0_0_24px_rgba(52,211,153,0.3)]"
                  >
                    <Play className="h-3.5 w-3.5" /> Replay flow
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={play}
                    disabled={playing}
                    className="group inline-flex items-center gap-2 bg-accent px-5 py-2.5 text-[13px] font-medium text-[#04120c] transition-all duration-300 hover:shadow-[0_0_24px_rgba(52,211,153,0.3)] disabled:opacity-50"
                  >
                    <Play className="h-3.5 w-3.5" /> {started ? "Running…" : "Run flow"}
                  </button>
                )}
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center gap-2 border border-line-strong bg-surface-2 px-4 py-2.5 text-[13px] text-ink-2 transition-all duration-300 hover:border-line-strong hover:text-ink"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Reset
                </button>
              </div>
            </div>

            {/* ── trace log ────────────────────────────────── */}
            <div className="flex flex-col border border-line bg-[#0a0a0c]">
              <div className="flex items-center justify-between border-b border-line px-4 py-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-ink-3">trace.log</p>
                <p className="font-mono text-[10px] text-ink-3">session {done ? "#9f21c4" : started ? "#a1c…" : "—"}</p>
              </div>
              <div
                ref={logRef}
                className="h-[420px] flex-1 overflow-y-auto px-4 py-4 font-mono text-[11.5px] leading-[1.9] lg:h-auto lg:min-h-[420px]"
                role="log"
                aria-label="System trace output"
              >
                {log.length === 0 ? (
                  <p className="text-ink-3">
                    <span className="text-accent">$</span> waiting for input
                    <span className="animate-blink text-accent">▋</span>
                  </p>
                ) : (
                  log.map((l, i) => (
                    <p key={i} className={cn("whitespace-pre-wrap", l.tone === "ok" ? "text-accent" : l.tone === "warn" ? "text-warn" : "text-ink-2")}>
                      <span className="mr-3 text-ink-3">{`0${Math.floor(i / 2)}:${String((i * 137) % 60).padStart(2, "0")}.${String((i * 337) % 100).padStart(2, "0")}`}</span>
                      {l.text}
                    </p>
                  ))
                )}
                {started && !done ? (
                  <p className="text-ink-3">
                    <span className="text-accent">$</span> <span className="animate-blink text-accent">▋</span>
                  </p>
                ) : null}
              </div>
              <div className="flex items-center justify-between border-t border-line px-4 py-2.5">
                <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-ink-3">{log.length} lines</p>
                <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-ink-3">utf-8 · no buffer</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
