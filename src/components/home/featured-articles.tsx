import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Clock } from 'lucide-react'
import { formatDate } from '@/lib/blog-data'
import { featuredBlogs } from '@/lib/blog-db'
import { CategoryBadge } from '@/components/blog-card'
import { AuthorTag } from '@/components/author-tag'

export async function FeaturedArticles() {
  const featured = (await featuredBlogs()).slice(0, 3)
  const [lead, ...rest] = featured

  if (!lead) {
    return null
  }

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-24">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-primary">Editor&apos;s picks</p>
          <h2 className="mt-2 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Featured articles
          </h2>
        </div>
        <Link
          href="/blog"
          className="hidden shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline sm:inline-flex"
        >
          View all
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Link
          href={`/blog/${lead.slug}`}
          className="group relative flex flex-col justify-end overflow-hidden rounded-3xl border border-border p-6 focus-visible:outline-2 focus-visible:outline-ring sm:p-8"
        >
          <Image
            src={lead.cover || '/placeholder.svg'}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
          <div className="relative">
            <CategoryBadge category={lead.category} />
            <h3 className="mt-4 text-balance text-2xl font-semibold leading-tight text-white sm:text-3xl">
              {lead.title}
            </h3>
            <p className="mt-3 line-clamp-2 max-w-lg text-sm leading-relaxed text-white/80">{lead.description}</p>
            <div className="mt-5 flex items-center gap-4 text-xs text-white/80">
              <span>{lead.author.name}</span>
              <span>·</span>
              <span>{formatDate(lead.date)}</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {lead.readingTime} min
              </span>
            </div>
          </div>
        </Link>

        <div className="flex flex-col gap-6">
          {rest.map((blog) => (
            <Link
              key={blog.slug}
              href={`/blog/${blog.slug}`}
              className="group flex gap-4 overflow-hidden rounded-2xl border border-border bg-card p-3 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_16px_36px_-24px_rgba(66,133,244,0.5)] focus-visible:outline-2 focus-visible:outline-ring sm:p-4"
            >
              <div className="relative h-28 w-32 shrink-0 overflow-hidden rounded-xl sm:h-32 sm:w-40">
                <Image
                  src={blog.cover || '/placeholder.svg'}
                  alt=""
                  fill
                  sizes="160px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex min-w-0 flex-col justify-center">
                <CategoryBadge category={blog.category} />
                <h3 className="mt-2 line-clamp-2 text-pretty font-semibold leading-snug tracking-tight text-foreground">
                  {blog.title}
                </h3>
                <div className="mt-3">
                  <AuthorTag author={blog.author} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
