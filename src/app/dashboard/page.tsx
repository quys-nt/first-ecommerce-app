import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "admin Dashboard",
};

export default function Dashboard() {
  return (
    <>
      <h1>Dashboard</h1>
      <p>Chào mừng bạn đến với dashboard!</p>
    </>
  )

}