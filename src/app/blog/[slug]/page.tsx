import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar, Clock, Eye } from 'lucide-react'
import { SiteNavbar } from '@/components/site-navbar'
import { SiteFooter } from '@/components/site-footer'
import { TableOfContents } from '@/components/blog/table-of-contents'
import { ReadingProgress } from '@/components/blog/reading-progress'
import { CategoryBadge, BlogCard } from '@/components/blog-card'
import { AuthorTag } from '@/components/author-tag'
import { formatDate } from '@/lib/blog-data'
import { getAllBlogs, getBlog, relatedBlogs } from '@/lib/blog-db'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const blog = await getBlog(slug)
  if (!blog) return { title: 'Article not found — GDG BGU' }
  return {
    title: `${blog.title} — GDG BGU`,
    description: blog.description,
  }
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const blog = await getBlog(slug)
  if (!blog) notFound()

  const related = await relatedBlogs(blog)

  return (
    <div className="flex min-h-dvh flex-col">
      <ReadingProgress />
      <SiteNavbar />
      <main className="flex-1">
        <article>
          <header className="mx-auto max-w-3xl px-5 pt-12 lg:px-8 lg:pt-16">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to all articles
            </Link>

            <div className="mt-6">
              <CategoryBadge category={blog.category} />
            </div>

            <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
              {blog.title}
            </h1>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">{blog.description}</p>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-border py-5">
              <AuthorTag author={blog.author} size="lg" showRole />
              <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {formatDate(blog.date)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {blog.readingTime} min read
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Eye className="h-4 w-4" />
                  {blog.views.toLocaleString()} views
                </span>
              </div>
            </div>
          </header>

          <div className="mx-auto mt-10 max-w-5xl px-5 lg:px-8">
            <div className="relative aspect-[16/8] overflow-hidden rounded-3xl border border-border">
              <Image
                src={blog.cover || '/placeholder.svg'}
                alt=""
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="mx-auto mt-12 grid max-w-6xl gap-12 px-5 pb-4 lg:grid-cols-[220px_1fr] lg:px-8">
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <TableOfContents sections={blog.content} />
              </div>
            </aside>

            <div className="mx-auto w-full max-w-2xl lg:mx-0">
              {blog.content.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-24 pb-10">
                  <h2 className="text-pretty text-2xl font-semibold tracking-tight text-foreground">
                    {section.heading}
                  </h2>
                  {section.body.map((paragraph, i) => (
                    <p key={i} className="mt-4 text-[17px] leading-8 text-foreground/85">
                      {paragraph}
                    </p>
                  ))}
                </section>
              ))}

              <div className="mt-4 flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-secondary/40 p-6">
                <AuthorTag author={blog.author} size="lg" showRole />
                <p className="w-full text-sm leading-relaxed text-muted-foreground sm:mt-2">
                  {blog.author.name} contributes to the GDG On Campus BGU journal, sharing hands-on lessons from
                  workshops and community projects.
                </p>
              </div>
            </div>
          </div>
        </article>

        <section className="border-t border-border bg-secondary/40">
          <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-20">
            <h2 className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Related articles
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <BlogCard key={item.slug} blog={item} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
