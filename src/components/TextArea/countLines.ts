import React from 'react'

export default function countLines(jsx: JSX.Element) {
  type JSXElement = React.ReactElement<
    any,
    string | React.JSXElementConstructor<any>
  >
  let isPrevElementAnOpenTag = false
  function countLinesRecursive(element: JSXElement): number {
    let count = 0
    const children = React.Children.toArray(element.props.children)
    for (const key in children) {
      const child = children[key]
      if (React.isValidElement(child)) {
        count += countLinesRecursive(child)
        if (child.type === 'div' && child.props.className !== 'editor__scope') {
          count++
        }
      } else {
        if (['}', ']'].includes(child.toString()) && !isPrevElementAnOpenTag) {
          count++
        }

        if (['{', '['].includes(child.toString())) {
          isPrevElementAnOpenTag = true
        } else {
          isPrevElementAnOpenTag = false
        }
      }
    }

    return count
  }

  return countLinesRecursive(jsx)
}
