import mongoose, { Schema, Document, Model } from 'mongoose'
import { Category, BlogStatus, Author, Section } from '@/lib/blog-data'

export interface IBlogDocument extends Document {
  slug: string
  title: string
  description: string
  cover: string
  category: Category
  author: Author
  date: string
  readingTime: number
  status: BlogStatus
  views: number
  featured?: boolean
  content: Section[]
  createdAt: Date
  updatedAt: Date
}

const AuthorSchema = new Schema<Author>(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    initials: { type: String, required: true },
    color: { type: String, required: true },
  },
  { _id: false }
)

const SectionSchema = new Schema<Section>(
  {
    id: { type: String, required: true },
    heading: { type: String, required: true },
    body: [{ type: String, required: true }],
  },
  { _id: false }
)

const BlogSchema: Schema = new Schema<IBlogDocument>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    cover: { type: String, required: true },
    category: {
      type: String,
      enum: ['Web Development', 'AI/ML', 'Cloud', 'Android', 'Events'],
      required: true,
    },
    author: { type: AuthorSchema, required: true },
    date: { type: String, required: true },
    readingTime: { type: Number, required: true, default: 3 },
    status: {
      type: String,
      enum: ['Published', 'Draft', 'Archived'],
      default: 'Published',
    },
    views: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    content: [SectionSchema],
  },
  {
    timestamps: true,
  }
)

export const BlogModel: Model<IBlogDocument> =
  mongoose.models.Blog || mongoose.model<IBlogDocument>('Blog', BlogSchema)
