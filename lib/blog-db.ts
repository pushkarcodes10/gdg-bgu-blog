import 'server-only'
import { connectToDatabase } from '@/lib/mongodb'
import { BlogModel } from '@/lib/models/Blog'
import { Blog, BlogStatus, Category, blogs } from '@/lib/blog-data'

export async function getAllBlogs(): Promise<Blog[]> {
  const db = await connectToDatabase()
  if (db) {
    const docs = await BlogModel.find({}).sort({ createdAt: -1 }).lean()
    return docs.map((doc) => ({
      slug: doc.slug,
      title: doc.title,
      description: doc.description,
      cover: doc.cover,
      category: doc.category as Category,
      author: doc.author,
      date: doc.date,
      readingTime: doc.readingTime,
      status: doc.status as BlogStatus,
      views: doc.views || 0,
      featured: doc.featured || false,
      content: doc.content || [],
    }))
  }
  return blogs
}

export async function publishedBlogs(): Promise<Blog[]> {
  const db = await connectToDatabase()
  if (db) {
    const docs = await BlogModel.find({ status: 'Published' }).sort({ createdAt: -1 }).lean()
    return docs.map((doc) => ({
      slug: doc.slug,
      title: doc.title,
      description: doc.description,
      cover: doc.cover,
      category: doc.category as Category,
      author: doc.author,
      date: doc.date,
      readingTime: doc.readingTime,
      status: doc.status as BlogStatus,
      views: doc.views || 0,
      featured: doc.featured || false,
      content: doc.content || [],
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
    const doc = await BlogModel.findOne({ slug }).lean()
    if (doc) {
      // Increment views count asynchronously
      BlogModel.updateOne({ slug }, { $inc: { views: 1 } }).catch(() => {})
      return {
        slug: doc.slug,
        title: doc.title,
        description: doc.description,
        cover: doc.cover,
        category: doc.category as Category,
        author: doc.author,
        date: doc.date,
        readingTime: doc.readingTime,
        status: doc.status as BlogStatus,
        views: (doc.views || 0) + 1,
        featured: doc.featured || false,
        content: doc.content || [],
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
