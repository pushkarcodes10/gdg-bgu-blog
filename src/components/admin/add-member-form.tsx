'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { UserPlus, User, Mail, Briefcase, Shield, Image as ImageIcon, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { addMemberAction } from '@/app/actions/member-actions'
import { MemberRole } from '@/lib/members'

export function AddMemberForm() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    const formData = new FormData(e.currentTarget)

    startTransition(async () => {
      const res = await addMemberAction(formData)
      if (res?.error) {
        setError(res.error)
      } else {
        setSuccess('Member successfully added!')
        setTimeout(() => {
          router.push('/admin')
        }, 1500)
      }
    })
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xs">
      {error && (
        <div className="mb-6 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive font-medium flex items-center gap-2">
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="mb-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="name" className="text-sm font-semibold">
              Full Name <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <User className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                name="name"
                placeholder="e.g. Pushkar Raj"
                required
                className="pl-10 h-11"
              />
            </div>
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="email" className="text-sm font-semibold">
              Google Account Email Address <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="e.g. t.raj25ug107@bgu.ac.in"
                required
                className="pl-10 h-11 font-mono text-sm"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Only this Google email will be whitelisted for signing into the CMS.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role" className="text-sm font-semibold">
              Designation / Title
            </Label>
            <div className="relative">
              <Briefcase className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="role"
                name="role"
                placeholder="e.g. Technical Associate"
                defaultValue="GDG Member"
                className="pl-10 h-11"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="systemRole" className="text-sm font-semibold">
              System Access Level
            </Label>
            <div className="relative">
              <Select name="systemRole" defaultValue="member">
                <SelectTrigger id="systemRole" className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="member">Member (Read / Draft Access)</SelectItem>
                  <SelectItem value="associate">Associate (Team Member)</SelectItem>
                  <SelectItem value="lead">Lead (Team / Content Lead)</SelectItem>
                  <SelectItem value="admin">Admin (Full Whitelist & CMS Access)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="avatar" className="text-sm font-semibold">
              Avatar / Profile Picture URL (Optional)
            </Label>
            <div className="relative">
              <ImageIcon className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="avatar"
                name="avatar"
                placeholder="e.g. /team/pushkar.webp or https://..."
                className="pl-10 h-11 font-mono text-xs"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 flex items-center justify-end gap-3 border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/admin')}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isPending} className="gap-2">
            <UserPlus className="h-4 w-4" />
            {isPending ? 'Adding to Whitelist...' : 'Add Member to Whitelist'}
          </Button>
        </div>
      </form>
    </div>
  )
}
