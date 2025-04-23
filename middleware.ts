import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

// Khởi tạo Firebase Admin (chỉ khởi tạo một lần)
let adminApp;
try {
  adminApp = initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
} catch (error) {
  adminApp = initializeApp(); // Nếu đã khởi tạo, reuse instance
}
const adminAuth = getAuth(adminApp);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log(`Middleware: Xử lý request cho ${pathname}`);

  // Bảo vệ các route /dashboard/*
  if (pathname.startsWith("/dashboard")) {
    const idToken = request.cookies.get("idToken")?.value;
    console.log("Middleware: idToken:", idToken ? "Có" : "Thiếu");

    if (!idToken) {
      console.log("Middleware: Chuyển hướng đến /login (không có token)");
      return NextResponse.redirect(
        new URL("/login?redirected=true", request.url)
      );
    }

    try {
      // Xác minh idToken
      const decodedToken = await adminAuth.verifyIdToken(idToken);
      console.log("Middleware: Token hợp lệ, UID:", decodedToken.uid);

      // Kiểm tra role admin (tùy chọn, nếu cần)
      return NextResponse.next();
    } catch (error) {
      console.error("Middleware: Lỗi xác minh token:", error);
      return NextResponse.redirect(
        new URL("/login?redirected=true", request.url)
      );
    }
  }

  // Chuyển hướng từ /login nếu đã đăng nhập
  if (pathname === "/login") {
    const idToken = request.cookies.get("idToken")?.value;
    if (idToken) {
      try {
        await adminAuth.verifyIdToken(idToken);
        console.log("Middleware: Đã đăng nhập, chuyển hướng đến /dashboard");
        return NextResponse.redirect(new URL("/dashboard", request.url));
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        console.log("Middleware: Token không hợp lệ, tiếp tục hiển thị /login");
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
