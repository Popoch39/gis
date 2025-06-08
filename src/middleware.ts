import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const protectedRoutes = ["/", "/profile"];

export function middleware(request: NextRequest) {
	const { nextUrl } = request;
	const sessionCookie = getSessionCookie(request);
	const isLoggedIn = !!sessionCookie;

	const isOnProtectedRoute = protectedRoutes.includes(nextUrl.pathname);
	const isOnAuthRoute = nextUrl.pathname.startsWith("/auth");

	if (isOnProtectedRoute && !isLoggedIn) {
		return NextResponse.redirect(new URL("/auth/login", request.url));
	}

	if (isOnAuthRoute && isLoggedIn) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico, sitemap.xml, robots.txt (metadata files)
		 */
		"/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
	],
};
