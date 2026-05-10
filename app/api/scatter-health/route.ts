import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    ok: true,
    app: "scatter-game",
    route: "GET /api/scatter-health",
    sureality: "/sureality",
    surealityAlias: "/scatter/sureality",
    hint: "If /sureality is 404 here but 200 on this endpoint, you are talking to a different server or port.",
    time: new Date().toISOString(),
  });
}
