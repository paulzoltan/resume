import { useEffect, useMemo, useState } from 'react'
import './text-area.css'
import prefixJsx from './prefixJsx'
import stringify from './stringify'

export interface TextAreaProps {
  dataToDisplay: any
}

/** The TextArea component */
function TextArea({ dataToDisplay }: TextAreaProps) {
  const stringifiedDataLength = useMemo(
    () => JSON.stringify(dataToDisplay).replace(/\s/g, '').length,
    [dataToDisplay]
  )
  /** The highlighted text */
  const [highlighted, setHighlighted] = useState('')
  const [limit, setLimit] = useState(0)

  useEffect(() => {
    if (limit > stringifiedDataLength) {
      return
    }
    let timeoutId: ReturnType<typeof setTimeout>
    const setLoop = () => {
      timeoutId = setTimeout(() => {
        setLimit((l) => l + 1)
        setLoop()
      }, 0)
    }
    setLoop()

    return () => {
      clearTimeout(timeoutId)
    }
  }, [limit, stringifiedDataLength])

  /**
   * If the cursor is in an element (or a selection starts and ends in the
   * same element) that has the class "highlightable" set the "highlighted" state
   * to the text of that element.
   */
  const onCursorChange = () => {
    setTimeout(() => {
      const selection = window.getSelection()
      const startNode = selection?.anchorNode
      const endNode = selection?.focusNode
      // selection starts and ends in the  same element
      const spread = startNode !== endNode
      const selected = window.getSelection()?.getRangeAt(0)
      const selectedContainer = selected?.startContainer.parentElement
      const highlightable =
        selectedContainer?.classList.contains('highlightable')
      const selectedText = selectedContainer?.innerText ?? ''

      setHighlighted(!spread && highlightable ? selectedText : '')
    })
  }
  /**  Only the navigation keys can take effect. */
  const filterNavKeys = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (
      ![
        'ArrowRight',
        'ArrowLeft',
        'ArrowUp',
        'ArrowDown',
        'Home',
        'End',
        'PageUp',
        'PageDown',
      ].includes(e.key)
    ) {
      e.preventDefault()
    }
  }
  const jsx = useMemo(() => {
    console.log(stringify(dataToDisplay, highlighted))
    return stringify(dataToDisplay, highlighted)
  }, [dataToDisplay, highlighted])
  const stringifiedData = prefixJsx(jsx, limit)

  return (
    <div
      className='editor__text-area'
      onMouseDown={onCursorChange}
      onMouseUp={onCursorChange}
      onKeyDown={(e) => {
        filterNavKeys(e)
        onCursorChange()
      }}
      spellCheck='false'
      // contentEditable={true}
    >
      {stringifiedData}
    </div>
  )
}
export default TextArea
