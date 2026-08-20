import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Clock } from 'lucide-react'
import type { Blog } from '@/lib/blog-data'
import { categoryColor, formatDate } from '@/lib/blog-data'
import { AuthorTag } from '@/components/author-tag'

export function CategoryBadge({ category }: { category: Blog['category'] }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/80 px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur"
      style={{ color: categoryColor[category] }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: categoryColor[category] }} />
      {category}
    </span>
  )
}

export function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Link
      href={`/blog/${blog.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_18px_40px_-24px_rgba(66,133,244,0.5)] focus-visible:outline-2 focus-visible:outline-ring"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={blog.cover || '/placeholder.svg'}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3">
          <CategoryBadge category={blog.category} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-pretty text-lg font-semibold leading-snug tracking-tight text-foreground">
          {blog.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{blog.description}</p>

        <div className="mt-4 flex items-center justify-between">
          <AuthorTag author={blog.author} />
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
          <span>{formatDate(blog.date)}</span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {blog.readingTime} min read
          </span>
        </div>

        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
          Read article
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  )
}
