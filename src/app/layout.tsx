import { Button } from "@/components/ui/button";
import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header>
          <div className="max-w-5xl mx-auto px-2.5 py-1.5">
            <nav className="flex">
              <Button variant="ghost" className="" asChild>
                <Link href="/">Home</Link>
              </Button>
              <Button variant="ghost" className="" asChild>
                <Link href="/login">Login</Link>
              </Button>
            </nav>
          </div>
        </header>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
