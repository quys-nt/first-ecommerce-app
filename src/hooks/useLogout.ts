"use client";

import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export function useLogout() {
  const router = useRouter();

  const logout = async (): Promise<{ success: boolean; error?: string }> => {
    try {
      console.log("Bắt đầu đăng xuất...");

      // Đăng xuất Firebase
      if (!auth) {
        throw new Error("Firebase auth chưa khởi tạo");
      }
      await signOut(auth);
      console.log("Đăng xuất Firebase thành công");

      // Xóa cookie
      console.log("Gửi yêu cầu xóa cookie...");
      const response = await fetch("/api/clear-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Lỗi API /api/clear-token:", errorData, "Status:", response.status);
        throw new Error(errorData.error || "Không thể xóa token");
      }

      console.log("Cookie xóa thành công");

      // Chuyển hướng
      router.push("/login");
      return { success: true };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Lỗi đăng xuất:", error);
      return { success: false, error: error.message || "Không thể đăng xuất" };
    }
  };

  return { logout };
}