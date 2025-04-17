import { NextResponse } from "next/server"

export function middleware(request) {
  // In a real app, you would check cookies or session to determine if user has seen intro
  // For this demo, we'll use a simple approach

  const hasSeenIntro = request.cookies.get("hasSeenIntro")?.value === "true"
  const isAuthPath = request.nextUrl.pathname.startsWith("/login") || request.nextUrl.pathname.startsWith("/signup")
  const isIntroPath = request.nextUrl.pathname.startsWith("/intro")
  const isRootPath = request.nextUrl.pathname === "/"

  // If user is at root and has seen intro, redirect to login
  if (isRootPath && hasSeenIntro) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/", "/intro/:path*"],
}
