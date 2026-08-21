'use server'

import { revalidatePath } from 'next/cache'
import { getSession } from '@/lib/auth'
import { addMemberToWhitelist, removeMemberFromWhitelist } from '@/lib/members-db'
import { MemberRole } from '@/lib/members'

export async function addMemberAction(formData: FormData) {
  const session = await getSession()
  if (!session?.user || session.user.systemRole !== 'admin') {
    return { error: 'Unauthorized: Only administrators can add members to the whitelist.' }
  }

  const name = formData.get('name')?.toString()?.trim()
  const email = formData.get('email')?.toString()?.trim()
  const role = formData.get('role')?.toString()?.trim() || 'GDG Member'
  const systemRole = (formData.get('systemRole')?.toString() as MemberRole) || 'member'
  const avatar = formData.get('avatar')?.toString()?.trim() || ''

  if (!name || !email) {
    return { error: 'Name and email address are required.' }
  }

  const result = await addMemberToWhitelist({
    name,
    email,
    role,
    systemRole,
    avatar,
  })

  if (result.success) {
    revalidatePath('/admin')
  }

  return result
}

export async function removeMemberAction(email: string) {
  const session = await getSession()
  if (!session?.user || session.user.systemRole !== 'admin') {
    return { error: 'Unauthorized: Only administrators can remove members from the whitelist.' }
  }

  if (email.toLowerCase() === session.user.email.toLowerCase()) {
    return { error: 'You cannot remove your own active account from the whitelist.' }
  }

  const result = await removeMemberFromWhitelist(email)
  if (result.success) {
    revalidatePath('/admin')
  }

  return result
}
