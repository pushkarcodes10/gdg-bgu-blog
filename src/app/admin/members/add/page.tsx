import Link from 'next/link'
import { getSession } from '@/lib/auth'
import { AddMemberForm } from '@/src/components/admin/add-member-form'
import { ShieldAlert, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const dynamic = 'force-dynamic'

export default async function AddMemberPage() {
  const session = await getSession()
  const user = session?.user

  // Check if current user is an admin
  const isAdmin = user?.systemRole === 'admin'

  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-md py-16 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive mb-4">
          <ShieldAlert className="h-7 w-7" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Access Restricted</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Only administrators can access the Add Member page to whitelist new users in MongoDB.
        </p>
        <Button asChild className="mt-6 rounded-full" variant="outline">
          <Link href="/admin">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" size="icon" className="rounded-full">
          <Link href="/admin" aria-label="Back to Dashboard">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Add New Team Member</h1>
          <p className="text-sm text-muted-foreground">
            Add a Google account email and assign role permissions in MongoDB.
          </p>
        </div>
      </div>

      <AddMemberForm />
    </div>
  )
}
