/**
 * Offline interpretive layer: language → atmosphere parameters.
 * Deliberately imperfect (emotional, not literal) for the vertical slice.
 */
export type RoomMood = {
  warmth: number; // 0–1 amber interior
  rain: number; // 0–1 storm intensity
  openness: number; // 0–1 window / sky dominance
  clutter: number; // 0–1 extra domestic shapes
  line: string; // what the “room understood”
};

const clamp = (n: number) => Math.min(1, Math.max(0, n));

export function interpretWords(text: string): RoomMood {
  const t = text.toLowerCase();
  let warmth = 0.35;
  let rain = 0.55;
  let openness = 0.2;
  let clutter = 0.15;
  const notes: string[] = [];

  if (/\b(lonely|alone|empty|quiet|silence|ghost)\b/.test(t)) {
    rain += 0.22;
    warmth -= 0.12;
    notes.push("loneliness");
  }
  if (/\b(warm|home|kitchen|grandma|grandmother|family|love|safe|soft)\b/.test(t)) {
    warmth += 0.35;
    rain -= 0.1;
    clutter += 0.15;
    notes.push("home");
  }
  if (/\b(city|noise|traffic|party|crowd|loud)\b/.test(t)) {
    clutter += 0.12;
    openness += 0.15;
    notes.push("distance hum");
  }
  if (/\b(sky|tall|open|air|roof|high|breathe|wide)\b/.test(t)) {
    openness += 0.35;
    rain -= 0.08;
    notes.push("height");
  }
  if (/\b(rain|storm|cold|winter|blue|sad|tired)\b/.test(t)) {
    rain += 0.18;
    warmth -= 0.08;
    notes.push("weather in the chest");
  }
  if (/\b(angry|tight|stuck|trapped|small|closet)\b/.test(t)) {
    openness -= 0.2;
    warmth -= 0.05;
    notes.push("compression");
  }

  warmth = clamp(warmth);
  rain = clamp(rain);
  openness = clamp(openness);
  clutter = clamp(clutter);

  const line =
    notes.length === 0
      ? "The room waits. It doesn't know you yet."
      : `The room leans toward: ${[...new Set(notes)].join(", ")}.`;

  return { warmth, rain, openness, clutter, line };
}
