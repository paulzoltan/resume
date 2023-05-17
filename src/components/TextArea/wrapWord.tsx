import classnames from 'classnames'
import linkify from './linkify'

/**
 * Place each word of the text within a separate span element that has the
 * class "highlightable". If the word is equal to the value of the state
 * "highlighted", the span should also have the class "highlighted". If the
 * word is an url make a link from it.
 */
export default function wrapWord(text: string, highlighted: string) {
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
}
