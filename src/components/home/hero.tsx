import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Code2, Sparkles, Terminal, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { publishedBlogs } from '@/lib/blog-db'

const floatingCards = [
  {
    icon: Terminal,
    title: 'npm-i-gdg',
    subtitle: 'Join BGU Chapter',
    color: 'var(--google-blue)',
    className: 'left-0 top-10 animate-float',
  },
  {
    icon: Sparkles,
    title: 'New Workshops',
    subtitle: 'coming soon',
    color: 'var(--google-green)',
    className: 'right-0 top-24 animate-float-slow',
  },
  {
    icon: Users,
    title: '150+ members',
    subtitle: 'and growing fast',
    color: 'var(--google-red)',
    className: 'left-6 bottom-6 animate-float-slow',
  },
]

export async function Hero() {
  const blogs = await publishedBlogs()
  const blogCount = blogs.length

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">
        <div className="animate-in-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
            <span className="flex h-2 w-2">
              <span className="absolute h-2 w-2 animate-ping rounded-full bg-primary/60" />
              <span className="h-2 w-2 rounded-full bg-primary" />
            </span>
            Google Developer Groups · On Campus
          </span>

          <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Building the Next Generation of <span className="text-gradient-google">Developers</span> at BGU
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Explore technical blogs, workshops, events, and insights from GDG On Campus Birla Global University.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="rounded-full text-base">
              <Link href="/blog">
                Explore Blogs
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full text-base">
              <Link href="#community">Join Community</Link>
            </Button>
          </div>

          <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <Code2 className="h-4 w-4 text-primary" /> {blogCount} {blogCount === 1 ? 'blog' : 'blogs'}
            </span>
            <span className="inline-flex items-center gap-2">
              <Users className="h-4 w-4 text-[var(--google-green)]" /> 10+ events / year
            </span>
          </div>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-md animate-in-up [animation-delay:120ms]">
          <div className="absolute inset-0 rounded-[2rem] border border-border bg-card/60 backdrop-blur" />
          <Image
            src="/images/hero-abstract.png"
            alt="Abstract developer technology illustration"
            fill
            priority
            sizes="(max-width: 1224px) 90vw, 40vw"
            className="rounded-[2rem] object-cover p-1"
          />

          {floatingCards.map((card) => {
            const Icon = card.icon
            return (
              <div
                key={card.title}
                className={`absolute ${card.className} glass-strong flex items-center gap-3 rounded-2xl border border-border/70 p-3 shadow-lg`}
              >
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-white"
                  style={{ backgroundColor: card.color }}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="font-mono text-xs font-medium text-foreground">{card.title}</span>
                  <span className="text-[11px] text-muted-foreground">{card.subtitle}</span>
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
