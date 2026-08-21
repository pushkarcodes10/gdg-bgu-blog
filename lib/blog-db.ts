import 'server-only'
import { connectToDatabase } from '@/lib/mongodb'
import { BlogModel } from '@/lib/models/Blog'
import { Blog, BlogStatus, Category, blogs } from '@/lib/blog-data'

function normalizeAuthor(raw: any) {
  if (typeof raw === 'string') {
    return {
      name: raw,
      role: 'Contributor',
      initials: raw.split(' ').map((n) => n[0]).slice(0, 2).join(''),
      color: 'var(--google-blue)',
    }
  }
  return {
    name: raw?.name || 'GDG Member',
    role: raw?.role || 'Member',
    initials: raw?.initials || 'MB',
    color: raw?.color || 'var(--google-blue)',
    avatar: raw?.avatar || raw?.image || undefined,
  }
}

export async function getAllBlogs(): Promise<Blog[]> {
  const db = await connectToDatabase()
  if (db) {
    const docs = await BlogModel.find({}).sort({ createdAt: -1 }).lean()
    return docs.map((doc: any) => ({
      slug: doc.slug,
      title: doc.title,
      description: doc.description || doc.excerpt || '',
      cover: doc.cover || doc.coverImage || '/placeholder.svg',
      category: doc.category as Category,
      author: normalizeAuthor(doc.author),
      date: doc.date || (doc.createdAt ? new Date(doc.createdAt).toISOString() : new Date().toISOString()),
      readingTime: doc.readingTime || 3,
      status: (doc.status === 'published' ? 'Published' : doc.status === 'draft' ? 'Draft' : doc.status) as BlogStatus,
      views: doc.views || 0,
      featured: doc.featured || false,
      content: doc.content || [],
      contentHtml: doc.contentHtml,
    }))
  }
  return blogs
}

export async function publishedBlogs(): Promise<Blog[]> {
  const db = await connectToDatabase()
  if (db) {
    const docs = await BlogModel.find({
      status: { $in: ['Published', 'published'] as any },
    }).sort({ createdAt: -1 }).lean()
    return docs.map((doc: any) => ({
      slug: doc.slug,
      title: doc.title,
      description: doc.description || doc.excerpt || '',
      cover: doc.cover || doc.coverImage || '/placeholder.svg',
      category: doc.category as Category,
      author: normalizeAuthor(doc.author),
      date: doc.date || (doc.createdAt ? new Date(doc.createdAt).toISOString() : new Date().toISOString()),
      readingTime: doc.readingTime || 3,
      status: (doc.status === 'published' ? 'Published' : doc.status === 'draft' ? 'Draft' : doc.status) as BlogStatus,
      views: doc.views || 0,
      featured: doc.featured || false,
      content: doc.content || [],
      contentHtml: doc.contentHtml,
    }))
  }
  return blogs.filter((b) => b.status === 'Published')
}

export async function featuredBlogs(): Promise<Blog[]> {
  const allPublished = await publishedBlogs()
  return allPublished.filter((b) => b.featured)
}

export async function getBlog(slug: string): Promise<Blog | null> {
  const db = await connectToDatabase()
  if (db) {
    const doc: any = await BlogModel.findOne({ slug }).lean()
    if (doc) {
      // Increment views count asynchronously
      BlogModel.updateOne({ slug }, { $inc: { views: 1 } }).catch(() => {})
      return {
        slug: doc.slug,
        title: doc.title,
        description: doc.description || doc.excerpt || '',
        cover: doc.cover || doc.coverImage || '/placeholder.svg',
        category: doc.category as Category,
        author: normalizeAuthor(doc.author),
        date: doc.date || (doc.createdAt ? new Date(doc.createdAt).toISOString() : new Date().toISOString()),
        readingTime: doc.readingTime || 3,
        status: (doc.status === 'published' ? 'Published' : doc.status === 'draft' ? 'Draft' : doc.status) as BlogStatus,
        views: (doc.views || 0) + 1,
        featured: doc.featured || false,
        content: doc.content || [],
        contentHtml: doc.contentHtml,
      }
    }
    return null
  }
  return blogs.find((b) => b.slug === slug) || null
}

export async function relatedBlogs(current: Blog, count = 3): Promise<Blog[]> {
  const allPublished = await publishedBlogs()
  return allPublished
    .filter((b) => b.slug !== current.slug)
    .sort((a, b) => (a.category === current.category ? -1 : 1))
    .slice(0, count)
}
