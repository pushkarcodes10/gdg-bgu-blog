'use server'

import { redirect } from 'next/navigation'
import { createSession, deleteSession } from '@/lib/auth'

export async function loginAction(formData: FormData) {
  const email = formData.get('email')?.toString()?.trim()
  const callbackUrl = formData.get('callbackUrl')?.toString() || '/admin'

  if (!email) {
    return { error: 'Email address is required.' }
  }

  const success = await createSession(email)
  if (!success) {
    return { error: 'Access Denied: Your email is not in the authorized member list.' }
  }

  redirect(callbackUrl)
}

export async function loginWithEmailDirect(email: string, callbackUrl: string = '/admin') {
  if (!email) {
    return { error: 'Email address is required.' }
  }

  const success = await createSession(email)
  if (!success) {
    return { error: 'Access Denied: Your email is not in the authorized member list.' }
  }

  redirect(callbackUrl)
}

export async function logoutAction() {
  await deleteSession()
  return { success: true }
}

