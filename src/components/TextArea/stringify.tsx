import { decodeNumeric } from '../../utils/helpers'
import { Indentation } from './Indentation'
import wrapWord from './wrapWord'

const CHAR_WIDTH = 1.111 /* em */

const isPrimitive = (v: any) => typeof v !== 'object' || v === null

const indentStyle = (indenVal: number) => ({
  textIndent: `${-indenVal * CHAR_WIDTH}em`,
  paddingLeft: `${indenVal * CHAR_WIDTH}em`,
})

/**
 * Stringify, prettyfy, syntax highligh a variable, and also apply the
 * "wrapWords" function to its text.
 */
export default function stringify(data: any, highlighted: string) {
  let counter = 0
  const indent = new Indentation(0)
  return (
    <>
      <div className='dot'>{counter++}</div>
      {indent.render()}
      {processVar(data, 0)}
    </>
  )

  function processVar(v: any, depth: number) {
    return !isPrimitive(v) ? (
      Array.isArray(v) ? ( // if v is array
        <>
          <span className={'bracket' + (depth % 3)}>&#91;</span>
          {!!v.length && (
            <>
              {indent.increase()}
              {v.map((item: any, index, arr) => (
                <div
                  key={index}
                  style={isPrimitive(item) ? indentStyle(indent.value) : {}}
                >
                  <div className='dot'>{counter++}</div>
                  {indent.render()}
                  {processVar(item, depth + 1)}
                  {index < arr.length - 1 && (
                    <span className='editor__delimiter'>,</span>
                  )}
                </div>
              ))}
              {indent.decrease()}
              <div className='dot'>{counter++}</div>
              {indent.render()}
            </>
          )}
          <span className={'bracket' + (depth % 3)}>&#93;</span>
        </>
      ) : (
        // if v is object
        <>
          <span className={'bracket' + (depth % 3)}>&#123;</span>
          {!!Object.entries(v).length && (
            <>
              {indent.increase()}
              {Object.entries(v).map(([key, value], index, arr) => (
                <div
                  key={index}
                  style={isPrimitive(value) ? indentStyle(indent.value) : {}}
                >
                  <div className='dot'>{counter++}</div>
                  {indent.render()}
                  <span className='key'>
                    "{wrapWord(decodeNumeric(key), highlighted)}"
                  </span>
                  <span className='editor__delimiter'>: </span>
                  {processVar(value, depth + 1)}
                  {index < arr.length - 1 && (
                    <span className='editor__delimiter'>,</span>
                  )}
                </div>
              ))}
              {indent.decrease()}
              <div className='dot'>{counter++}</div>
              {indent.render()}
            </>
          )}
          <span className={'bracket' + (depth % 3)}>&#125;</span>
        </>
      )
    ) : (
      // if v is primitive
      <span className={`inline ${typeof v}`}>
        {wrapWord(
          typeof v === 'string'
            ? JSON.stringify(decodeNumeric(v))
            : v.toString(),
          highlighted
        )}
      </span>
    )
  }
}
