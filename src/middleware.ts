import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

// Middleware quốc tế hóa
const intlMiddleware = createMiddleware(routing);

export async function middleware(req: NextRequest) {
   const response = intlMiddleware(req);
   return response;
}

export const config = {
   matcher: "/((?!_next|api|favicon.ico|image).*)",
};
