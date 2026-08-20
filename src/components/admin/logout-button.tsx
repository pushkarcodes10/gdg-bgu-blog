'use client'

import React, { useTransition } from 'react'
import { signOut } from 'next-auth/react'
import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { logoutAction } from '@/app/actions/auth-actions'

interface LogoutButtonProps {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive' | 'secondary'
  className?: string
  showText?: boolean
}

export function LogoutButton({
  variant = 'outline',
  className = '',
  showText = true,
}: LogoutButtonProps) {
  const [isPending, startTransition] = useTransition()

  const handleLogout = () => {
    startTransition(async () => {
      await logoutAction()
      await signOut({ callbackUrl: '/login' })
    })
  }

  return (
    <Button
      variant={variant}
      onClick={handleLogout}
      disabled={isPending}
      className={`rounded-full gap-2 transition-all hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 ${className}`}
    >
      <LogOut className="h-4 w-4" />
      {showText && <span>{isPending ? 'Logging out...' : 'Log Out'}</span>}
    </Button>
  )
}
