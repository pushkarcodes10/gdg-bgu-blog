import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { communityStats } from '@/lib/blog-data'
import { Button } from '@/components/ui/button'

export function Community() {
  return (
    <section id="community" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-16 lg:px-8 lg:py-24">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {communityStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
          >
            <div className="h-1.5 w-10 rounded-full" style={{ backgroundColor: stat.color }} />
            <p className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{stat.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="relative mt-8 overflow-hidden rounded-3xl border border-border bg-foreground px-6 py-12 text-center sm:px-12 sm:py-16">
        <div className="pointer-events-none absolute -left-16 -top-16 h-52 w-52 rounded-full bg-primary/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-10 h-52 w-52 rounded-full bg-[var(--google-green)]/20 blur-3xl" />
        <div className="relative">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-background sm:text-4xl">
            Ready to build with the community?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-pretty leading-relaxed text-background/70">
            Join hundreds of student developers learning, sharing, and shipping together. No experience required —
            just curiosity.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-7">
            <Button asChild size="lg" className="rounded-full text-base">
              <Link href="/blog">
                Start reading
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-emerald-500/40 bg-emerald-500/10 text-base text-background transition-all duration-300 hover:border-emerald-500/70 hover:bg-emerald-500/20 hover:text-background hover:shadow-lg hover:shadow-emerald-500/20 active:scale-95"
            >
              <a
                href="https://chat.whatsapp.com/LLZTIbSQotaElCp2UXjGbe"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5"
              >
                <Image
                  src="/whatsapp.svg"
                  alt="WhatsApp"
                  width={22}
                  height={22}
                  className="h-5.5 w-5.5 shrink-0 transition-transform duration-300 group-hover:scale-110"
                />
                <span>Join WhatsApp Community</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
