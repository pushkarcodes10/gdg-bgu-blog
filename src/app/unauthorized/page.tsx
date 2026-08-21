import Link from 'next/link'
import { ShieldAlert, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SiteNavbar } from '@/components/site-navbar'
import { SiteFooter } from '@/components/site-footer'

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <SiteNavbar />

      <main className="flex-1 flex items-center justify-center px-4 py-12 lg:py-16">
        <div className="w-full max-w-md text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-destructive/10 text-destructive shadow-inner">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
              Access Denied
            </h1>
            <p className="text-sm text-muted-foreground">
              Your Google account is not in the authorized member list. Please sign in with an approved GDG BGU member account.
            </p>
          </div>

          <div className="pt-2">
            <Button asChild className="w-full h-11 rounded-xl font-semibold gap-2">
              <Link href="/login">
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Login Portal</span>
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
