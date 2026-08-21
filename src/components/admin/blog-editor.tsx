"use client"

import type React from "react"

import { useMemo, useState } from "react"
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
import { categories, categoryColor, type Category } from "@/lib/blog-data"

import { useTransition } from "react"
import { createBlogAction } from "@/app/actions/blog-actions"

const coverByCategory: Record<Category, string> = {
  "Web Development": "/images/blog-web.png",
  "AI/ML": "/images/blog-ai.png",
  Cloud: "/images/blog-cloud.png",
  Android: "/images/blog-android.png",
  Events: "/images/blog-events.png",
}

export function BlogEditor() {
  const [title, setTitle] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [category, setCategory] = useState<Category>("Web Development")
  const [tagsInput, setTagsInput] = useState("")
  const [content, setContent] = useState("")
  const [status, setStatus] = useState<"draft" | "published">("published")
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const tags = useMemo(
    () =>
      tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    [tagsInput],
  )

  const readTime = useMemo(() => {
    const words = content.trim().split(/\s+/).filter(Boolean).length
    return Math.max(1, Math.round(words / 200))
  }, [content])

  const cover = coverByCategory[category]
  const accent = categoryColor[category]

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", excerpt)
    formData.append("category", category)
    formData.append("cover", cover)
    formData.append("status", status === "published" ? "Published" : "Draft")
    formData.append("content", content)

    startTransition(async () => {
      const res = await createBlogAction(formData)
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
            <h1 className="text-2xl font-semibold tracking-tight text-balance">Create blog post</h1>
            <p className="text-sm text-muted-foreground">Draft, preview, and publish to the community.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" className="gap-2 bg-transparent">
            <Eye className="h-4 w-4" />
            Preview
          </Button>
          <Button type="submit" disabled={isPending} className="gap-2">
            <Save className="h-4 w-4" />
            {isPending ? "Saving..." : "Publish Post"}
          </Button>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive font-medium">
          {error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
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
              <span className="text-xs text-muted-foreground">
                {readTime} min read &middot; Markdown supported
              </span>
            </div>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={"## Introduction\n\nStart writing your story here..."}
              rows={18}
              className="resize-y font-mono text-sm leading-relaxed"
            />
          </div>
        </div>

        <aside className="flex flex-col gap-6">
          <div className="rounded-2xl border bg-card p-6">
            <h2 className="mb-4 text-sm font-semibold">Publishing</h2>
            <div className="flex flex-col gap-4">
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
            <Button type="button" variant="outline" className="mt-3 w-full gap-2 bg-transparent">
              <Upload className="h-4 w-4" />
              Upload cover
            </Button>
            <p className="mt-2 text-xs text-muted-foreground">
              Auto-selected from category. Upload your own to override.
            </p>
          </div>
        </aside>
      </div>
    </form>
  )
}
