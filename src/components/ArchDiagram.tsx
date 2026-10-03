"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { ArchEdge, ArchNode } from "@/types";

const PAD_X = 12;
const COL_GAP = 64;
const ROW_H = 92;
const ROW_GAP = 22;
const PAD_TOP = 10;
const PAD_BOTTOM = 10;
const MIN_NODE_W = 92;
const MOBILE_BREAKPOINT = 860;

function kindClass(node: ArchNode) {
  switch (node.kind) {
    case "entry":
      return "border-line-strong bg-surface-2";
    case "store":
      return "border-accent-line bg-surface";
    case "external":
      return "border-dashed border-line-strong bg-surface/60";
    case "output":
      return "border-line-strong bg-surface-2";
    default:
      return "border-line bg-surface/70";
  }
}

function NodeBox({ node, width }: { node: ArchNode; width?: number }) {
  return (
    <div
      className={cn("relative flex h-full min-h-[64px] flex-col justify-center border px-3.5 py-2.5", kindClass(node))}
      style={width ? { width } : undefined}
    >
      {node.kind === "store" ? (
        <span className="absolute inset-x-0 bottom-0 h-[2px] bg-accent" aria-hidden="true" />
      ) : null}
      <p className="font-mono text-[11px] font-medium leading-tight tracking-wide text-ink">{node.title}</p>
      {node.sub ? <p className="mt-1 font-mono text-[9px] leading-snug text-ink-3">{node.sub}</p> : null}
    </div>
  );
}

const legend: Array<{ label: string; className: string }> = [
  { label: "entry / output", className: "border-line-strong bg-surface-2" },
  { label: "process", className: "border-line bg-surface/70" },
  { label: "store", className: "border-accent-line bg-surface" },
  { label: "external", className: "border-dashed border-line-strong bg-surface/60" },
];

export function ArchDiagram({ nodes, edges, caption }: { nodes: ArchNode[]; edges: ArchEdge[]; caption?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const w = el.getBoundingClientRect().width;
      setWidth(w);
      setMobile(w < MOBILE_BREAKPOINT);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* layered layout: level = longest path from an entry node */
  const layout = useMemo(() => {
    const level = new Map<string, number>();
    for (const n of nodes) level.set(n.id, n.kind === "entry" ? 0 : -1);

    let changed = true;
    let guard = 0;
    while (changed && guard < 20) {
      changed = false;
      guard++;
      for (const e of edges) {
        const lf = level.get(e.from);
        const lt = level.get(e.to);
        if (lf === undefined || lt === undefined) continue;
        if (lf >= 0 && lt < lf + 1) {
          level.set(e.to, lf + 1);
          changed = true;
        }
      }
    }

    const cols = Math.max(1, ...Array.from(level.values()).filter((v) => v >= 0).map((v) => v + 1));
    const columns: ArchNode[][] = Array.from({ length: cols }, () => []);
    for (const n of nodes) {
      const l = Math.max(0, level.get(n.id) ?? 0);
      columns[l].push(n);
    }
    return { columns, level };
  }, [nodes, edges]);

  /* pixel geometry for the schematic */
  const geom = useMemo(() => {
    if (mobile || !width) return null;
    const cols = layout.columns.length;
    const nodeW = Math.max(MIN_NODE_W, (width - PAD_X * 2 - COL_GAP * (cols - 1)) / cols);
    const rows = Math.max(...layout.columns.map((c) => c.length));
    const height = PAD_TOP + rows * (ROW_H + ROW_GAP) - ROW_GAP + PAD_BOTTOM;

    const pos = new Map<string, { x: number; y: number }>();
    layout.columns.forEach((col, ci) => {
      const colH = col.length;
      const startY = PAD_TOP + (rows - colH) * (ROW_H + ROW_GAP) / 2;
      col.forEach((n, ri) => {
        pos.set(n.id, {
          x: PAD_X + ci * (nodeW + COL_GAP),
          y: startY + ri * (ROW_H + ROW_GAP),
        });
      });
    });

    const edgePaths = edges
      .map((e) => {
        const a = pos.get(e.from);
        const b = pos.get(e.to);
        if (!a || !b) return null;
        const x1 = a.x + nodeW;
        const y1 = a.y + ROW_H / 2;
        const x2 = b.x;
        const y2 = b.y + ROW_H / 2;
        const mx = (x1 + x2) / 2;
        const d = `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2 - 8} ${y2}`;
        // bezier midpoint for label
        const lx = 0.125 * x1 + 0.375 * mx + 0.375 * mx + 0.125 * (x2 - 8);
        const ly = 0.125 * y1 + 0.375 * y1 + 0.375 * y2 + 0.125 * y2;
        return { ...e, d, labelX: lx, labelY: ly - 6 };
      })
      .filter((p): p is NonNullable<typeof p> => p !== null);

    return { nodeW, height, pos, edgePaths };
  }, [layout, mobile, width, edges]);

  /* vertical-list layout for mobile */
  const mobileRows = useMemo(() => {
    if (!mobile) return [];
    const out: Array<{ type: "node"; node: ArchNode } | { type: "edge"; edge: ArchEdge }> = [];
    for (const n of nodes) out.push({ type: "node", node: n });
    for (const e of edges) out.push({ type: "edge", edge: e });
    return out;
  }, [mobile, nodes, edges]);

  return (
    <div className="w-full">
      {geom ? (
        <div className="overflow-x-auto border border-line bg-surface/40 p-2 sm:p-3">
          <div ref={containerRef} className="relative w-full" style={{ height: geom.height }}>
          <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
            <defs>
              <marker id="arch-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#34d39966" />
              </marker>
            </defs>
            {geom.edgePaths.map((p) => (
              <g key={`${p.from}-${p.to}`}>
                <path d={p.d} fill="none" stroke="#ffffff1f" strokeWidth="1.5" markerEnd="url(#arch-arrow)" />
                {p.label ? (
                  <text x={p.labelX} y={p.labelY} textAnchor="middle" className="font-mono" fontSize="10" fill="#9d9da7" stroke="#0d0d10" strokeWidth="3" paintOrder="stroke">
                    {p.label}
                  </text>
                ) : null}
              </g>
            ))}
          </svg>

          {layout.columns.map((col, ci) => (
            <div key={ci} className="absolute" style={{ left: PAD_X + ci * (geom.nodeW + COL_GAP), top: 0, width: geom.nodeW }}>
              {col.map((n) => {
                const pos = geom.pos.get(n.id);
                if (!pos) return null;
                return (
                  <div key={n.id} className="absolute left-0" style={{ top: pos.y - PAD_TOP, width: geom.nodeW, height: ROW_H }}>
                    <NodeBox node={n} />
                  </div>
                );
              })}
            </div>
          ))}

            <div className="absolute bottom-2 right-3 flex flex-wrap justify-end gap-x-4 gap-y-1">
              {legend.map((l) => (
                <span key={l.label} className="flex items-center gap-1.5 font-mono text-[8.5px] uppercase tracking-[0.16em] text-ink-3">
                  <span className={cn("inline-block h-2.5 w-4 border", l.className)} aria-hidden="true" />
                  {l.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* mobile / pre-measure: vertical flow */
        <div className="border border-line bg-surface/40 p-4 sm:p-5">
          <div ref={containerRef} className="relative w-full">
          <div className="flex flex-col">
            {mobileRows.map((row) =>
              row.type === "node" ? (
                <div key={`n-${row.node.id}`} className="h-auto">
                  <NodeBox node={row.node} />
                </div>
              ) : (
                <div key={`e-${row.edge.from}-${row.edge.to}`} className="flex items-center gap-3 py-1.5 pl-4">
                  <span className="h-4 w-px bg-line" aria-hidden="true" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-3">↓</span>
                  <span className="font-mono text-[10px] text-ink-3">{row.edge.label ?? "→"}</span>
                  <span className="font-mono text-[10px] text-accent">{row.edge.to}</span>
                </div>
              )
            )}
          </div>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 border-t border-line pt-3">
            {legend.map((l) => (
              <span key={l.label} className="flex items-center gap-1.5 font-mono text-[8.5px] uppercase tracking-[0.16em] text-ink-3">
                <span className={cn("inline-block h-2.5 w-4 border", l.className)} aria-hidden="true" />
                {l.label}
              </span>
            ))}
          </div>
          </div>
        </div>
      )}

      {caption ? <p className="mt-3 text-[12.5px] leading-relaxed text-ink-3">{caption}</p> : null}
    </div>
  );
}
