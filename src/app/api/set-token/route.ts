import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { idToken } = body;

    console.log("Nhận idToken:", idToken ? "Hợp lệ" : "Thiếu");

    if (!idToken || typeof idToken !== "string") {
      console.error("idToken không hợp lệ");
      return NextResponse.json({ error: "idToken không hợp lệ" }, { status: 400 });
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set("idToken", idToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    console.log("Cookie token lưu thành công");
    return response;
  } catch (error) {
    console.error("Lỗi lưu token:", error);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}