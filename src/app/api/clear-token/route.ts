import { NextResponse } from "next/server";

export async function POST() {
  try {
    console.log("Gọi API /api/clear-token");
    const response = NextResponse.json({ success: true });
    response.cookies.delete("idToken");
    console.log("Cookie idToken đã được xóa");
    return response;
  } catch (error) {
    console.error("Lỗi server:", error);
    return NextResponse.json(
      { error: "Không thể xóa cookie" },
      { status: 500 }
    );
  }
}