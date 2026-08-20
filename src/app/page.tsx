import { SiteNavbar } from '@/components/site-navbar'
import { SiteFooter } from '@/components/site-footer'
import { Hero } from '@/components/home/hero'
import { LatestBlogs } from '@/components/home/latest-blogs'
import { FeaturedArticles } from '@/components/home/featured-articles'
import { Community } from '@/components/home/community'

export default function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteNavbar />
      <main className="flex-1">
        <Hero />
        <LatestBlogs />
        <FeaturedArticles />
        <Community />
      </main>
      <SiteFooter />
    </div>
  )
}
