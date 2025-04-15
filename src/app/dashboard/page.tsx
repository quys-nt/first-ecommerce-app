import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "admin Dashboard",
};

export default function Dashboard() {
  return (
    <>
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="aspect-video max-w-full rounded-xl bg-muted/50"
        />
      ))}
    </>
  )

}