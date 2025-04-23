import Link from "next/link"

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return (
    <>
      <div>My Post: {slug}</div>
      <Link href="/">Home</Link>
      <Link href="/blog">Blog</Link>
    </>
  )
}