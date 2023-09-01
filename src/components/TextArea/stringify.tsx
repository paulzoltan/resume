import { decodeNumeric } from '../../utils/helpers'
import wrapWord from './wrapWord'

/**
 * Stringify, prettyfy, syntax highligh a variable, and also apply the
 * "wrapWords" function to its text.
 */
export default function stringify(data: any, highlighted: string) {
  let counter = 0
  return (
    <>
      <div className='dot'>{counter++}</div>
      {processVar(data, 0)}
    </>
  )

  function processVar(v: any, depth: number) {
    return typeof v === 'object' && v !== null ? (
      Array.isArray(v) ? ( // if v is array
        <>
          <span className={'bracket' + (depth % 3)}>&#91;</span>
          {!!v.length && (
            <>
              <div className='editor__scope'>
                {v.map((item: any, index, arr) => (
                  <div key={index}>
                    <div className='dot'>{counter++}</div>
                    {processVar(item, depth + 1)}
                    {index < arr.length - 1 && (
                      <span className='editor__delimiter'>,</span>
                    )}
                  </div>
                ))}
              </div>
              <div className='dot'>{counter++}</div>
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
              <div className='editor__scope'>
                {Object.entries(v).map(([key, value], index, arr) => (
                  <div key={index}>
                    <div className='dot'>{counter++}</div>
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
              </div>
              <div className='dot'>{counter++}</div>
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
