import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Cookie'den locale'i kontrol et
  const currentLocale = request.cookies.get("NEXT_LOCALE")?.value;
  const defaultLocale = "tr";
  const locale = currentLocale || defaultLocale;

  // Response'u oluştur
  const response = NextResponse.next();

  // Cookie yoksa veya locale değişmişse, cookie'yi güvenlik flag'leri ile set et
  // secure flag'i sadece production'da aktif olsun (HTTPS gereksinimi için)
  const isProduction = process.env.NODE_ENV === "production";

  if (!currentLocale || currentLocale !== locale) {
    response.cookies.set("NEXT_LOCALE", locale, {
      maxAge: 60 * 60 * 24 * 365, // 1 yıl
      path: "/",
      secure: isProduction, // Sadece production'da secure
      sameSite: "strict",
      httpOnly: false, // Client-side erişim için false
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
