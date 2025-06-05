import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Cookie'den locale'i kontrol et
  const locale = request.cookies.get("NEXT_LOCALE")?.value || "tr";

  // Response'u oluştur
  const response = NextResponse.next();

  // Eğer cookie yoksa veya farklıysa, cookie'yi güvenlik flag'leri ile set et
  if (!request.cookies.get("NEXT_LOCALE")) {
    response.cookies.set("NEXT_LOCALE", locale, {
      maxAge: 60 * 60 * 24 * 365, // 1 yıl
      path: "/",
      secure: true,
      sameSite: "strict",
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
