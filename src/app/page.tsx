import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";
import MainLayout from "@/components/main-layout";

export const metadata: Metadata = {
  title: "Home",
  description: "Home page",
};

export default function Home() {
  return (
    <MainLayout>
      <section className="py-5">
        <div className="max-w-5xl mx-auto px-2.5">
          <h1 className="text-3xl mb-3">Home Page</h1>
          <div className="flex gap-1.5">
            <Button asChild>
              <Link href="/blog">Go to Blog</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard/">Go to dasdoad</Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
