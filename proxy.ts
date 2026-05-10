import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const trimmed = pathname.replace(/\.+$/, "");
  if (trimmed !== pathname) {
    const url = request.nextUrl.clone();
    url.pathname = trimmed || "/";
    return NextResponse.redirect(url);
  }

  const res = NextResponse.next();
  res.headers.set("X-Scatter-Game", "hzl-game");
  res.headers.set("X-Scatter-Sureality-Path", "/sureality");
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
