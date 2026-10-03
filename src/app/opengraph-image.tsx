import { ImageResponse } from "next/og";
import { profile } from "@/data/site";

export const runtime = "edge";
export const alt = "Salman Muhammad — Senior Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#08080a",
          color: "#ececf0",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          padding: "72px 80px",
        }}
      >
        {/* grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        {/* header */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 52,
              height: 52,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(255,255,255,0.2)",
              background: "#0d0d10",
              fontFamily: "ui-monospace, monospace",
              fontSize: 22,
              fontWeight: 600,
            }}
          >
            {profile.monogram}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "ui-monospace, monospace",
              fontSize: 16,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "#9d9da7",
            }}
          >
            <span>{profile.name}</span>
            <span style={{ color: "#34d399" }}>{profile.location} · {profile.timezone}</span>
          </div>
        </div>

        {/* statement */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", gap: 16, marginBottom: 28 }}>
            {["TypeScript", "Node.js", "Python", "Rust", "Payments"].map((t) => (
              <span
                key={t}
                style={{
                  border: "1px solid rgba(255,255,255,0.14)",
                  background: "#0d0d10",
                  padding: "10px 18px",
                  fontFamily: "ui-monospace, monospace",
                  fontSize: 15,
                  letterSpacing: "0.18em",
                  color: "#9d9da7",
                }}
              >
                {t}
              </span>
            ))}
          </div>
          <div
            style={{
              fontSize: 84,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.02,
              display: "flex",
            }}
          >
            <span>Salman Muhammad</span>
            <span style={{ color: "#34d399" }}>.</span>
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 26,
              color: "#9d9da7",
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <span
              style={{
                width: 12,
                height: 12,
                background: "#34d399",
                display: "flex",
              }}
            />
            <span>Senior Software Engineer</span>
          </div>
        </div>

        {/* footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "ui-monospace, monospace",
            fontSize: 14,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#61616d",
          }}
        >
          <span>secure · scalable · production systems</span>
          <span>est. 2017</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
