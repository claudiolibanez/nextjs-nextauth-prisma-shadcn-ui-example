import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {

  // const { pathname } = request.nextUrl;
  // console.log("--- Middleware ---", { pathname });

  const response = NextResponse.next();

  return response;
}