import { describe, it, expect } from 'vitest'
import React from 'react'
import { highlightText } from './highlightText'

describe('highlightText', () => {
  it('escapes regex characters in search string', () => {
    const result = highlightText('a.c', 'a.c')
    const mark = result.find((el) => React.isValidElement(el))
    expect(mark).toBeTruthy()
    if (mark && React.isValidElement(mark)) {
      expect((mark.props as { children: string }).children).toBe('a.c')
    }
  })
  it('does not treat regex chars specially', () => {
    const result = highlightText('abc', 'a.c')
    const mark = result.find((el) => React.isValidElement(el))
    expect(mark).toBeUndefined()
  })
})
