import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value; //token이란 저장소에 토큰값만 추출
  const { pathname } = request.nextUrl; //request.nextUrl에는 href,pathname,serach등이 있어 pathname만 구조분해

  const protectedPaths = ["/cart"];

  const isProtectedPath = protectedPaths.some(
    (path) => pathname.startsWith(path), //보호경로 boolean으로 판단여부 => some
  );
  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url)); //절대경로 설정 두 번째 인자 도메인기준으로 /login이란 새로운 url생성
  }
  return NextResponse.next(); // 조건문에 걸리지 않으면 요청을 계속 진행
}

export const config = {
  matcher: ["/cart/:path*"], // "/cart/"다음 모든 경로를 보호대상으로 지정
};
