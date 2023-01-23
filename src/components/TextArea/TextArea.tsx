import { useState } from 'react'
import './text-area.css'
import classnames from 'classnames'

export interface TextAreaProps {
  data: any
}
/** The TextArea component */
function TextArea({ data }: TextAreaProps) {
  /** The highlighted text */
  const [highlighted, setHighlighted] = useState('')
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
      {stringify(data)}
    </div>
  )
  /**
   * Place each word of the text within a separate span element that has the
   * class "highlightable". If the word is equal to the value of the state
   * "highlighted", the span should also have the class "highlighted". If the
   * word is an url make a link from it.
   */
  function wrapWords(text: string) {
    const separator = /(\s|"|,+)/
    const words = text.split(separator)

    const wrapedWordsText = words.map((word, index) =>
      separator.test(word) ? (
        word
      ) : (
        <span
          key={index}
          className={classnames({
            highlightable: true,
            highlighted: word === highlighted,
          })}
        >
          {linkify(word)}
        </span>
      )
    )
    return wrapedWordsText

    /**
     * If the text is a URL, encase it in an "a" HTML tag.
     */
    function linkify(text: string) {
      const url =
        /^(http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
      return url.test(text) ? <a href={text}>{text}</a> : text
    }
  }
  /**
   * Stringify, prettyfy, syntax highligh a variable, and also apply the
   * "wrapWords" function to its text.
   */
  function stringify(data: any): JSX.Element {
    return processVar(data, 0)

    function processVar(v: any, depth: number) {
      return typeof v === 'object' && v !== null ? (
        Array.isArray(v) ? ( // if v is array
          <>
            <span className={'bracket' + (depth % 3)}>&#91;</span>
            {!!v.length && (
              <div className='editor__scope'>
                {v.map((item: any, index, arr) => (
                  <div key={index}>
                    {processVar(item, depth + 1)}
                    {index < arr.length - 1 && (
                      <span className='editor__delimiter'>,</span>
                    )}
                  </div>
                ))}
              </div>
            )}
            <span className={'bracket' + (depth % 3)}>&#93;</span>
          </>
        ) : (
          // if v is object
          <>
            <span className={'bracket' + (depth % 3)}>&#123;</span>
            {!!Object.entries(v).length && (
              <div className='editor__scope'>
                {Object.entries(v).map(([key, value], index, arr) => (
                  <div key={index}>
                    <span className='key'>"{wrapWords(key)}"</span>
                    <span className='editor__delimiter'>: </span>
                    {processVar(value, depth + 1)}
                    {index < arr.length - 1 && (
                      <span className='editor__delimiter'>,</span>
                    )}
                  </div>
                ))}
              </div>
            )}
            <span className={'bracket' + (depth % 3)}>&#125;</span>
          </>
        )
      ) : (
        // if v is primitive
        <span className={`inline ${typeof v}`}>
          {wrapWords(
            typeof v === 'string' ? JSON.stringify(v.toString()) : v.toString()
          )}
        </span>
      )
    }
  }
}
export default TextArea
