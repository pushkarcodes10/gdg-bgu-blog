'use client'

import { useState } from 'react'

function getAvatarPlaceholder(name: string) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
    <rect width="200" height="200" fill="%234285F4" opacity="0.1"/>
    <circle cx="100" cy="76" r="42" fill="%234285F4" opacity="0.2"/>
    <path d="M30 180c0-38.66 31.34-70 70-70s70 31.34 70 70" fill="%234285F4" opacity="0.2"/>
    <text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="42" font-weight="700" fill="%234285F4">${initials}</text>
  </svg>`

  return `data:image/svg+xml;utf8,${svg}`
}

export function TeamAvatar({
  src,
  name,
  className = 'h-full w-full rounded-full object-cover',
}: {
  src?: string
  name: string
  className?: string
}) {
  const placeholder = getAvatarPlaceholder(name)
  const [imgSrc, setImgSrc] = useState(src || placeholder)

  return (
    <img
      src={imgSrc}
      alt={name}
      className={className}
      onError={() => {
        if (imgSrc !== placeholder) {
          setImgSrc(placeholder)
        }
      }}
    />
  )
}
