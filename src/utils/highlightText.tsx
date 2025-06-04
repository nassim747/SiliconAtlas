import React, { type ReactNode } from 'react'

export const escapeRegExp = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

export const highlightText = (text: string, search: string): ReactNode[] => {
  if (!search) return [text as ReactNode]
  const regex = new RegExp(`(${escapeRegExp(search)})`, 'gi')
  const parts = text.split(regex)
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="bg-yellow-200 text-yellow-900 rounded px-1">
        {part}
      </mark>
    ) : (
      part as ReactNode
    )
  )
}
