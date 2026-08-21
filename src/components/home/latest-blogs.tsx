import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { publishedBlogs } from '@/lib/blog-db'
import { BlogCard } from '@/components/blog-card'

export async function LatestBlogs() {
  const allPublished = await publishedBlogs()
  const latest = allPublished
    .slice()
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, 3)

  return (
    <section className="border-y border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-24">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-primary">Fresh off the keyboard</p>
            <h2 className="mt-2 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Latest from GDG BGU
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline sm:inline-flex"
          >
            Browse all
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((blog) => (
            <BlogCard key={blog.slug} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  )
}
