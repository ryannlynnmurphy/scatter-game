"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";
import { interpretWords, type RoomMood } from "./mood";

type Phase = "pulse" | "room";

function RainCanvas({ intensity }: { intensity: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const drops = useRef<{ x: number; y: number; len: number; speed: number; o: number }[]>([]);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.floor(80 + intensity * 220);
      drops.current = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        len: 12 + Math.random() * 28,
        speed: 18 + Math.random() * 34,
        o: 0.08 + Math.random() * 0.2,
      }));
    };
    resize();
    window.addEventListener("resize", resize);

    const tick = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = `rgba(180, 200, 255, ${0.12 + intensity * 0.35})`;
      ctx.lineWidth = 1;
      for (const d of drops.current) {
        ctx.globalAlpha = d.o;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - 6, d.y + d.len);
        ctx.stroke();
        d.y += d.speed * (0.02 + intensity * 0.03);
        d.x -= d.speed * 0.008;
        if (d.y > h) {
          d.y = -20;
          d.x = Math.random() * w;
        }
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [intensity]);

  return <canvas ref={ref} className="sureality-rain" aria-hidden />;
}

function useMoodFromText(initial: string) {
  const [text, setText] = useState(initial);
  const [mood, setMood] = useState<RoomMood>(() => interpretWords(initial));

  useEffect(() => {
    const t = setTimeout(() => setMood(interpretWords(text)), 180);
    return () => clearTimeout(t);
  }, [text]);

  return { text, setText, mood };
}

export default function SurealityExperience() {
  const [phase, setPhase] = useState<Phase>("pulse");
  const { text, setText, mood } = useMoodFromText(
    "She moves slow after everything. Rain helps her think."
  );

  useEffect(() => {
    const id = window.setTimeout(() => setPhase("room"), 3200);
    return () => clearTimeout(id);
  }, []);

  const shellStyle: CSSProperties = {
    ["--sure-warmth" as string]: String(mood.warmth),
    ["--sure-rain" as string]: String(mood.rain),
    ["--sure-open" as string]: String(mood.openness),
    ["--sure-clutter" as string]: String(mood.clutter),
  };

  const cityGlow = 0.25 + mood.openness * 0.55;
  const extraChairOp = 0.2 + mood.clutter * 0.85;
  const extraTableOp = 0.15 + mood.clutter * 0.9;
  const rugRx = 140 + mood.clutter * 80;

  return (
    <div className="sureality-root" style={shellStyle}>
      {phase === "pulse" && (
        <div className="sureality-intro" aria-label="Opening">
          <div className="sureality-heart" />
          <p className="sureality-whisper muted">push</p>
        </div>
      )}

      <div className={`sureality-world ${phase === "room" ? "sureality-world--visible" : ""}`}>
        <RainCanvas intensity={mood.rain} />
        <div className="sureality-vignette" aria-hidden />

        <div className="sureality-scene">
          <svg
            className="sureality-svg"
            viewBox="0 0 1000 640"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden
          >
            <defs>
              <linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1a1a2e" />
                <stop offset="55%" stopColor="#2d1f3d" />
                <stop offset="100%" stopColor="#0f0f18" />
              </linearGradient>
              <linearGradient id="glass" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(140,170,220,0.15)" />
                <stop offset="100%" stopColor="rgba(40,50,90,0.35)" />
              </linearGradient>
              <radialGradient id="lamp" cx="40%" cy="35%" r="55%">
                <stop offset="0%" stopColor="rgba(255, 220, 160, 0.55)" />
                <stop offset="70%" stopColor="rgba(255, 190, 120, 0.08)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0)" />
              </radialGradient>
            </defs>

            <rect width="1000" height="640" fill="url(#sky)" />

            <polygon fill="#16131c" points="0,640 0,180 420,120 620,640" />
            <polygon fill="#1c1822" points="1000,640 1000,200 560,115 620,640" />
            <polygon fill="#121018" points="0,640 1000,640 1000,520 0,520" />

            <polygon fill="#22202a" points="120,520 120,200 560,160 880,220 880,520" />
            <polygon fill="#18161f" points="120,520 120,200 560,160 560,520" />

            <polygon fill="#0e0c12" opacity="0.85" points="560,160 880,220 880,520 560,520" />

            <rect x="200" y="170" width="320" height="220" fill="url(#glass)" stroke="rgba(80,70,95,0.5)" strokeWidth="3" />

            <g style={{ opacity: cityGlow }}>
              <rect x="210" y="185" width="40" height="50" fill="rgba(255,200,120,0.12)" rx="2" />
              <rect x="265" y="195" width="35" height="45" fill="rgba(255,210,140,0.1)" rx="2" />
              <rect x="320" y="175" width="50" height="70" fill="rgba(240,230,180,0.08)" rx="2" />
            </g>

            <ellipse cx="390" cy="480" rx={rugRx} ry="42" fill="rgba(0,0,0,0.45)" />

            <rect x="300" y="320" width="180" height="28" rx="3" fill="#2a2632" stroke="#3d3848" />
            <polygon points="300,352 292,392 486,392 480,352" fill="#363242" />

            <rect x="520" y="300" width="14" height="110" fill="#3a3542" />
            <ellipse cx="527" cy="292" rx="38" ry="18" fill="#4a4455" />

            <rect x="650" y="340" width="70" height="90" rx="4" fill="#2d2a35" stroke="#454050" />
            <circle cx="685" cy="375" r="22" fill="#1a1820" stroke="#555" strokeWidth="2" />
            <circle cx="685" cy="375" r="8" fill="#6cf0b4" opacity="0.35" className="sureality-dial-glow" />

            <rect x="430" y="360" width="64" height="88" rx="4" fill="#2f2b38" opacity={extraChairOp} />
            <rect x="250" y="330" width="52" height="70" rx="3" fill="#3a3240" opacity={extraTableOp} />

            <rect x="0" y="0" width="1000" height="640" fill="url(#lamp)" style={{ mixBlendMode: "screen" as const }} />

            <rect
              x="0"
              y="0"
              width="1000"
              height="640"
              fill="rgba(255, 180, 120, 0)"
              className="sureality-warm-overlay"
            />
          </svg>
        </div>

        <header className="sureality-header">
          <h1 className="sureality-title">SUREALITY</h1>
          <p className="sureality-tag">Scatter — one room, one voice, one listening world.</p>
        </header>

        <footer className="sureality-panel">
          <label className="sureality-label" htmlFor="sure-prompt">
            Who lives here? Speak in character, memory, or metaphor.
          </label>
          <textarea
            id="sure-prompt"
            className="sureality-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            spellCheck={false}
            placeholder="Try: warm kitchen noise through walls — or — alone with the radiator ticking"
          />
          <p className="sureality-interpret">{mood.line}</p>
        </footer>

        <a className="sureality-back" href="/">
          ← Scatter Game
        </a>
      </div>
    </div>
  );
}
