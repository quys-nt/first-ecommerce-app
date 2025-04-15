import Link from "next/link";
import { Button } from "./ui/button";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header>
        <div className="max-w-5xl mx-auto px-2.5 py-1.5">
          <nav className="flex justify-center">
            <Button variant="ghost" className="" asChild>
              <Link href="/">Home</Link>
            </Button>
            <Button variant="ghost" className="" asChild>
              <Link href="/login">Login</Link>
            </Button>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer>
        <div className="max-w-5xl mx-auto px-2.5 py-1.5">
          <div className="text-center">footer</div>
        </div>
      </footer>
    </>
  )
}