"use client"

import type React from "react"

import { useMemo, useRef, useState } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Eye, Save, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { categories, categoryColor, type Category, type Blog } from "@/lib/blog-data"

import { useTransition } from "react"
import { createBlogAction, updateBlogAction } from "@/app/actions/blog-actions"

import "react-quill-new/dist/quill.snow.css"

// Quill touches `document` directly, so it must be loaded client-side only.
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[320px] items-center justify-center rounded-xl border bg-muted/30 text-sm text-muted-foreground">
      Loading editor...
    </div>
  ),
})

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "code-block"],
    ["link", "image"],
    ["clean"],
  ],
}

const quillFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "blockquote",
  "code-block",
  "link",
  "image",
]

const coverByCategory: Record<Category, string> = {
  "Web Development": "/images/blog-web.png",
  "AI/ML": "/images/blog-ai.png",
  Cloud: "/images/blog-cloud.png",
  Android: "/images/blog-android.png",
  Events: "/images/blog-events.png",
}

// Rough read-time estimate from rendered HTML — strips tags before counting words.
function estimateReadTime(html: string) {
  const text = html.replace(/<[^>]*>/g, " ")
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

interface BlogEditorProps {
  initialBlog?: Blog
}

export function BlogEditor({ initialBlog }: BlogEditorProps = {}) {
  const isEditing = Boolean(initialBlog)

  const [title, setTitle] = useState(initialBlog?.title || "")
  const [excerpt, setExcerpt] = useState(initialBlog?.description || "")
  const [category, setCategory] = useState<Category>(initialBlog?.category || "Web Development")
  const [tagsInput, setTagsInput] = useState("")
  const [content, setContent] = useState(
    initialBlog?.contentHtml || initialBlog?.content?.[0]?.body?.join("\n\n") || ""
  )
  const [status, setStatus] = useState<"draft" | "published">(
    initialBlog?.status === "Draft" ? "draft" : "published"
  )
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const [customCover, setCustomCover] = useState<string | null>(initialBlog?.cover || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const tags = useMemo(
    () =>
      tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    [tagsInput],
  )

  const readTime = useMemo(() => estimateReadTime(content), [content])

  const cover = customCover || coverByCategory[category]
  const accent = categoryColor[category]

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      setError("Image file size should be less than 5MB.")
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setCustomCover(reader.result)
        setError(null)
      }
    }
    reader.readAsDataURL(file)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", excerpt)
    formData.append("category", category)
    formData.append("cover", cover)
    formData.append("status", status === "published" ? "Published" : "Draft")
    formData.append("content", content) // now HTML, not markdown

    startTransition(async () => {
      const res = isEditing && initialBlog
        ? await updateBlogAction(initialBlog.slug, formData)
        : await createBlogAction(formData)
      if (res?.error) {
        setError(res.error)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="icon" className="rounded-full">
            <Link href="/admin/blogs" aria-label="Back to blogs">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-balance">
              {isEditing ? "Edit blog post" : "Create blog post"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isEditing ? "Update and save changes to your post." : "Draft, preview, and publish to the community."}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" className="gap-2 bg-transparent">
            <Eye className="h-4 w-4" />
            Preview
          </Button>
          <Button type="submit" disabled={isPending} className="gap-2">
            <Save className="h-4 w-4" />
            {isPending ? "Saving..." : isEditing ? "Update Post" : "Publish Post"}
          </Button>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive font-medium">
          {error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_23rem]">
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border bg-card p-6">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="An unmissable, specific headline"
                  className="h-11 text-base"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="A short summary shown on cards and previews."
                  rows={2}
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-6">
            <div className="mb-3 flex items-center justify-between">
              <Label htmlFor="content">Content</Label>
              <span className="text-xs text-muted-foreground">{readTime} min read</span>
            </div>
            <div className="quill-wrapper rounded-xl border overflow-hidden [&_.ql-toolbar]:rounded-t-xl [&_.ql-toolbar]:border-x-0 [&_.ql-toolbar]:border-t-0 [&_.ql-container]:rounded-b-xl [&_.ql-container]:border-x-0 [&_.ql-container]:border-b-0 [&_.ql-editor]:min-h-[320px] [&_.ql-editor]:text-sm [&_.ql-editor]:leading-relaxed [&_.ql-editor.ql-blank::before]:!text-white [&_.ql-editor.ql-blank::before]:!not-italic">
              <ReactQuill
                id="content"
                theme="snow"
                value={content}
                onChange={setContent}
                modules={quillModules}
                formats={quillFormats}
                placeholder="Start writing your thoughts here..."
              />
            </div>
          </div>
        </div>

        <aside className="flex flex-col gap-6">
          <div className="rounded-2xl border bg-card p-6">
            <h2 className="mb-4 text-sm font-semibold">Publishing</h2>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={(v) => setStatus(v as "draft" | "published")}>
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={(v) => setCategory(v as Category)}>
                  <SelectTrigger id="category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="nextjs, react, performance"
                />
                {tags.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {tags.map((t) => (
                      <Badge key={t} variant="secondary" className="rounded-full font-normal">
                        {t}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-6">
            <h2 className="mb-4 text-sm font-semibold">Cover image</h2>
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl border">
              <Image src={cover || "/placeholder.svg"} alt="Cover preview" fill className="object-cover" />
              <span
                className="absolute left-3 top-3 rounded-full border border-border/60 bg-background/90 px-2.5 py-0.5 text-xs font-medium"
                style={{ color: accent }}
              >
                {category}
              </span>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <div className="mt-3 flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="w-full gap-2 bg-transparent"
              >
                <Upload className="h-4 w-4" />
                {customCover ? "Change cover" : "Upload cover"}
              </Button>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {customCover ? "Custom cover uploaded." : "Auto-selected from category. Upload your own to override."}
            </p>
          </div>
        </aside>
      </div>
    </form>
  )
}