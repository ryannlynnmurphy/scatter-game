import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    ok: true,
    app: "scatter-game",
    route: "GET /api/scatter-health",
    time: new Date().toISOString(),
  });
}
