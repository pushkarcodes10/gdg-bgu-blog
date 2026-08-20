import { BlogTable } from "@/components/admin/blog-table"
import { type BlogStatus } from "@/lib/blog-data"
import { getAllBlogs } from "@/lib/blog-db"

export default async function AdminBlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const { status } = await searchParams
  const validStatuses: BlogStatus[] = ["Published", "Draft", "Archived"]
  const initialStatus = validStatuses.includes(status as BlogStatus) ? (status as BlogStatus) : "All"

  const allBlogs = await getAllBlogs()
  const sorted = [...allBlogs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-balance">All blogs</h1>
        <p className="mt-1 text-muted-foreground">Search, filter, and manage every post in one place.</p>
      </div>
      <BlogTable blogs={sorted} initialStatus={initialStatus} title="All posts" />
    </div>
  )
}
