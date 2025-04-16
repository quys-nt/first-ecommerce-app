import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { initializeApp, cert } from "firebase-admin/app";

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

const app = initializeApp({
  credential: cert(serviceAccount),
});

const adminAuth = getAuth(app);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/dashboard")) {
    const idToken = request.cookies.get("idToken")?.value;
    console.log("Middleware: idToken:", idToken ? "Có" : "Thiếu");

    if (!idToken) {
      console.log("Middleware: Chuyển hướng đến login (không có token)");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      await adminAuth.verifyIdToken(idToken);
      console.log("Middleware: Token hợp lệ, tiếp tục");
      return NextResponse.next();
    } catch (error) {
      console.error("Middleware: Lỗi xác minh token:", error);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};