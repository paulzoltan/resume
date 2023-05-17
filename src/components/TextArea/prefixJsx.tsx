import React from 'react'

function countNonWhiteSpace(str: string): number {
  const nonWhitespaceRegex = /\S/g // regular expression to match non-whitespace characters
  const matches = str.match(nonWhitespaceRegex) // find all matches of non-whitespace characters in the string
  return matches ? matches.length : 0 // return the number of matches (or zero if there are none)
}

export default function prefixJsx(jsx: JSX.Element, limit: number) {
  let omit = false
  let letterCount = 0
  type JSXElement = React.ReactElement<
    any,
    string | React.JSXElementConstructor<any>
  >
  function cloneJSXElement(element: JSXElement): JSXElement {
    const children = React.Children.toArray(element.props.children)
    const clonedChildren: (
      | string
      | number
      | JSXElement
      | React.ReactFragment
    )[] = []

    for (const key in children) {
      if (omit) break
      const child = children[key]
      if (React.isValidElement(child)) {
        clonedChildren.push(cloneJSXElement(child))
      } else {
        letterCount += countNonWhiteSpace(child.toString())
        if (letterCount > limit) {
          clonedChildren.push(
            <span className='being-typed'>
              {child.toString().slice(0, limit - letterCount)}
              <span className='cursor'>█</span>
            </span>
          )
          omit = true
          break
        } else {
          clonedChildren.push(child)
        }
      }
    }

    return React.createElement(
      element.type,
      { ...element.props },
      ...clonedChildren
    )
  }
  return cloneJSXElement(jsx)
}
