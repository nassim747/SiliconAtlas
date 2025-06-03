import { describe, it, expect } from 'vitest'
import React from 'react'
import { highlightText } from './highlightText'

describe('highlightText', () => {
  it('escapes regex characters in search string', () => {
    const result = highlightText('a.c', 'a.c') as (string | JSX.Element)[]
    const mark = result.find((el) => React.isValidElement(el))
    expect(mark).toBeTruthy()
    expect(mark.props.children).toBe('a.c')
  })
  it('does not treat regex chars specially', () => {
    const result = highlightText('abc', 'a.c') as (string | JSX.Element)[]
    const mark = result.find((el) => React.isValidElement(el))
    expect(mark).toBeUndefined()
  })
})
