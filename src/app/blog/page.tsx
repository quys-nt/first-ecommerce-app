import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description: "Blog page",
};

export default function Blog() {
  return (
    <>
      <h1>Blog</h1>
      <Link href="/">Home</Link>
      <Link href="/blog/tin-tuc-0111">blog detail</Link>
    </>
  );
}