import { NextResponse, type NextRequest } from "next/server";
import {
  defaultPublicLocale,
  isPublicLocale,
  localePath,
} from "@/lib/i18n/config";
import { updateSession } from "@/lib/supabase/proxy";

const workspacePrefixes = ["/admin", "/admin-preview", "/staff-login"];

function isWorkspace(pathname: string) {
  return workspacePrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isWorkspace(pathname)) {
    return updateSession(request);
  }

  const segments = pathname.split("/").filter(Boolean);
  const maybeLocale = segments[0];

  if (!isPublicLocale(maybeLocale)) {
    const url = request.nextUrl.clone();
    url.pathname = localePath(defaultPublicLocale, pathname);
    return NextResponse.redirect(url);
  }

  const strippedSegments = segments.slice(1);
  const strippedPath = `/${strippedSegments.join("/")}` || "/";

  if (isWorkspace(strippedPath)) {
    const url = request.nextUrl.clone();
    url.pathname = strippedPath;
    return NextResponse.redirect(url);
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-public-locale", maybeLocale);

  const url = request.nextUrl.clone();
  url.pathname = strippedPath;

  const response = NextResponse.rewrite(url, {
    request: {
      headers: requestHeaders,
    },
  });

  return updateSession(request, response);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
