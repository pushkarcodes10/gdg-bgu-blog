'use client'

import { useTransition } from 'react'
import Link from 'next/link'
import { Users, UserPlus, Trash2 } from 'lucide-react'
import { Member } from '@/lib/members'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { removeMemberAction } from '@/app/actions/member-actions'

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
}

export function MemberWhitelistManager({
  members,
  currentUserEmail,
  currentUserRole,
}: {
  members: Member[]
  currentUserEmail?: string
  currentUserRole?: string
}) {
  const [isPending, startTransition] = useTransition()

  const isAdmin = currentUserRole === 'admin'

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Authorized Team Members ({members.length})
        </h2>

        <div className="flex items-center gap-3">

          {isAdmin && (
            <Button asChild size="sm" className="gap-2 rounded-full shadow-xs">
              <Link href="/admin/members/add">
                <UserPlus className="h-4 w-4" />
                Add Member
              </Link>
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => {
          const isCurrentUser = currentUserEmail?.toLowerCase() === member.email.toLowerCase()

          return (
            <div
              key={member.id || member.email}
              className={`group relative flex items-center gap-3 rounded-xl border p-3.5 transition-all bg-card ${isCurrentUser
                  ? 'border-primary/50 ring-2 ring-primary/10 shadow-xs'
                  : 'border-border/80 hover:border-primary/30'
                }`}
            >
              <Avatar className="h-11 w-11 shrink-0 border border-border">
                {member.avatar && <AvatarImage src={member.avatar} alt={member.name} className="object-cover" />}
                <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
                  {getInitials(member.name)}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="truncate text-xs font-bold text-foreground">
                    {member.name}
                  </p>
                  {isCurrentUser && (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-primary text-primary-foreground">
                      You
                    </span>
                  )}
                </div>
                <p className="truncate text-[11px] font-medium text-muted-foreground">
                  {member.role}
                </p>
                <p className="truncate text-[10px] text-muted-foreground/80 font-mono mt-0.5">
                  {member.email}
                </p>
              </div>

              {isAdmin && !isCurrentUser && (
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:bg-destructive/10 hover:text-destructive"
                  title="Remove"
                  disabled={isPending}
                  onClick={() => {
                    if (confirm(`Remove ${member.name} (${member.email}) from the team?`)) {
                      startTransition(async () => {
                        await removeMemberAction(member.email)
                      })
                    }
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
