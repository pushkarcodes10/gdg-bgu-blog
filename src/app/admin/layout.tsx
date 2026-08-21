import type { Metadata } from 'next'
import { Suspense } from 'react'
import { redirect } from 'next/navigation'
import { AdminShell } from '@/components/admin/admin-shell'
import { getSession } from '@/lib/auth'

export const metadata: Metadata = {
  title: 'Admin — GDG BGU',
  description: 'Manage blogs, drafts, and content for the GDG BGU community platform.',
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()

  if (!session?.user) {
    redirect('/login')
  }

  return (
    <Suspense>
      <AdminShell user={session.user}>{children}</AdminShell>
    </Suspense>
  )
}

