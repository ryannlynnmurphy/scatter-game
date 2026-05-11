"use client";

import { useState } from "react";

const SAMPLE_INK = `=== start ===
The scouts gather around the fire.
* [Speak up]
    You clear your throat.
    -> end
* [Stay silent]
    The silence stretches.
    -> end

=== end ===
The night continues.
-> END`;

interface Choice {
  index: number;
  text: string;
}

interface PreviewState {
  lines: string[];
  choices: Choice[];
}

export default function GamePage() {
  const [inkScript, setInkScript] = useState(SAMPLE_INK);
  const [preview, setPreview] = useState<PreviewState>({ lines: [], choices: [] });
  const [parseError, setParseError] = useState<string | null>(null);

  const CHARACTERS = ["Scout Leader", "Cadet Rho", "Cadet Lyra", "Narrator"];
  const ASSETS = ["Forest BG", "Fire Sprite", "Tent Overlay", "Rain Ambience"];

  function handlePreview() {
    try {
      setParseError(null);
      const lines = inkScript
        .split("\n")
        .filter((l) => l.trim() && !l.trim().startsWith("=") && !l.trim().startsWith("->"))
        .map((l) => l.replace(/^\s*\*\s*\[([^\]]+)\]/, ">> $1").trim())
        .slice(0, 6);
      const choices = inkScript
        .split("\n")
        .filter((l) => l.trim().match(/^\*\s*\[/))
        .map((l, i) => ({
          index: i,
          text: l.replace(/^\s*\*\s*\[([^\]]+)\]/, "$1").trim(),
        }))
        .slice(0, 4);
      setPreview({ lines, choices });
    } catch (err) {
      setParseError(String(err));
    }
  }

  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        background: "#2D2A26",
        color: "#FAF8F5",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <header
        style={{
          borderBottom: "1px solid #3D3A36",
          background: "#1A1816",
          padding: "0.75rem 1.5rem",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            color: "#C9A96E",
            fontSize: "1.25rem",
            fontWeight: 700,
          }}
        >
          Scatter Game
        </h1>
        <span style={{ color: "#888", fontSize: "0.8rem" }}>Narrative Engine</span>
        <span style={{ color: "#555", fontSize: "0.68rem", marginLeft: "0.5rem" }}>
          Dev: use port <strong style={{ color: "#888" }}>3000</strong> only —{" "}
          <a href="/api/scatter-health" style={{ color: "#888" }}>
            health
          </a>
        </span>
        <div style={{ flex: 1 }} />
        <button
          onClick={handlePreview}
          style={{
            background: "#C9A96E",
            color: "#2D2A26",
            border: "none",
            borderRadius: "3px",
            padding: "0.4rem 1.1rem",
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            fontSize: "0.8rem",
          }}
        >
          Preview Story
        </button>
      </header>

      {/* Main layout */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* Ink Script Editor */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            borderRight: "1px solid #3D3A36",
          }}
        >
          <div
            style={{
              padding: "0.5rem 1rem",
              borderBottom: "1px solid #3D3A36",
              background: "#1A1816",
            }}
          >
            <span
              style={{ color: "#C9A96E", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em" }}
            >
              INK SCRIPT
            </span>
          </div>
          <textarea
            value={inkScript}
            onChange={(e) => setInkScript(e.target.value)}
            spellCheck={false}
            style={{
              flex: 1,
              fontFamily: "'Courier New', monospace",
              fontSize: "0.875rem",
              lineHeight: "1.7",
              color: "#E8E3DC",
              background: "#2D2A26",
              border: "none",
              outline: "none",
              padding: "1rem",
              resize: "none",
            }}
          />
        </div>

        {/* Live Preview */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            borderRight: "1px solid #3D3A36",
          }}
        >
          <div
            style={{
              padding: "0.5rem 1rem",
              borderBottom: "1px solid #3D3A36",
              background: "#1A1816",
            }}
          >
            <span
              style={{ color: "#C9A96E", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em" }}
            >
              STORY PREVIEW
            </span>
          </div>
          <div style={{ flex: 1, padding: "1.5rem", overflowY: "auto" }}>
            {parseError && (
              <p style={{ color: "#C0392B", fontSize: "0.8rem", marginBottom: "1rem" }}>{parseError}</p>
            )}
            {preview.lines.length === 0 && !parseError && (
              <p style={{ color: "#555", fontSize: "0.875rem" }}>
                Press &quot;Preview Story&quot; to render your Ink script.
              </p>
            )}
            {preview.lines.map((line, i) => (
              <p
                key={i}
                style={{
                  color: "#FAF8F5",
                  fontSize: "0.9375rem",
                  lineHeight: "1.8",
                  marginBottom: "0.5rem",
                }}
              >
                {line}
              </p>
            ))}
            {preview.choices.length > 0 && (
              <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {preview.choices.map((choice) => (
                  <button
                    key={choice.index}
                    style={{
                      background: "#1A1816",
                      color: "#C9A96E",
                      border: "1px solid #C9A96E",
                      borderRadius: "3px",
                      padding: "0.5rem 1rem",
                      cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.875rem",
                      textAlign: "left",
                    }}
                  >
                    {choice.text}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Character/Asset Sidebar */}
        <aside
          style={{ width: "200px", background: "#1A1816", padding: "1rem" }}
        >
          <p
            style={{
              color: "#C9A96E",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              marginBottom: "0.75rem",
            }}
          >
            CHARACTERS
          </p>
          {CHARACTERS.map((c) => (
            <div
              key={c}
              style={{
                padding: "0.4rem 0.5rem",
                marginBottom: "0.25rem",
                background: "#2A2724",
                borderRadius: "3px",
                fontSize: "0.8rem",
                color: "#FAF8F5",
              }}
            >
              {c}
            </div>
          ))}

          <p
            style={{
              color: "#C9A96E",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              marginTop: "1.25rem",
              marginBottom: "0.75rem",
            }}
          >
            ASSETS
          </p>
          {ASSETS.map((a) => (
            <div
              key={a}
              style={{
                padding: "0.4rem 0.5rem",
                marginBottom: "0.25rem",
                background: "#2A2724",
                borderRadius: "3px",
                fontSize: "0.8rem",
                color: "#888",
              }}
            >
              {a}
            </div>
          ))}
        </aside>
      </div>

      {/* Bottom panel: dialogue tree placeholder */}
      <div
        style={{
          height: "80px",
          borderTop: "1px solid #3D3A36",
          background: "#1A1816",
          padding: "0.75rem 1.5rem",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <span
          style={{ color: "#C9A96E", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em" }}
        >
          DIALOGUE TREE
        </span>
        <div
          style={{
            flex: 1,
            height: "40px",
            background: "#2A2724",
            borderRadius: "3px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ color: "#555", fontSize: "0.75rem" }}>
            Visual dialogue tree visualization — coming in Phase 2
          </span>
        </div>
      </div>
    </div>
  );
}
