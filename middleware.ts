export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";

const privateRoutes = ["/profile", "/notes"];
const publicRoutes = ["/sign-in", "/sign-up"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isPublicRoute) {
    if (!accessToken) {
      if (refreshToken) {
        return NextResponse.redirect(
          new URL(`/api/auth/refresh?next=${pathname}`, request.url)
        );
      }
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isPrivateRoute) {
    if (!accessToken) {
      if (refreshToken) {
        return NextResponse.redirect(
          new URL(`/api/auth/refresh?next=${pathname}`, request.url)
        );
      }
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    return NextResponse.next();
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
