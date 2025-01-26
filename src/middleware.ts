import createIntlMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  const handleI18nRouting = createIntlMiddleware({
    locales: ["en", "fr", "ar"],
    defaultLocale: "en",
  });

  const response = handleI18nRouting(request);
  return response;
}

export const config = {
  matcher: ["/", "/(fr|ar|en)/:path*"],
};
