import classNames from 'classnames'
import { useElapsed } from '../../hooks'
import LoadingTextArea from '../LoadingTextArea'
import TextArea from '../TextArea/TextArea'
import './editor.css'

export interface EditorProps {
  data: any
  lang: Lang
  onLangChange: (lang: Lang) => void
}

const Editor = ({ data, lang, onLangChange }: EditorProps) => {
  const loading = !useElapsed(2000)
  return (
    <div className='editor'>
      <div className='editor__title-bar'>
        <div
          className={classNames('editor__tab', {
            'editor__tab--active': lang === 'hu',
          })}
          onClick={() => onLangChange('hu')}
        >
          <div className='editor__icon'>{'{}'} </div>
          resume.json
        </div>
        <div
          className={classNames('editor__tab', {
            'editor__tab--active': lang === 'en',
          })}
          onClick={() => onLangChange('en')}
        >
          <div className='editor__icon'>{'{}'} </div>
          resume-english.json
        </div>
      </div>
      <div
        className={classNames('editor__body--wrapper', {
          hidden: lang === 'hu',
        })}
      >
        {loading ? <LoadingTextArea /> : <TextArea dataToDisplay={data} />}
      </div>
      <div
        className={classNames('editor__body--wrapper', {
          hidden: lang === 'en',
        })}
      >
        {loading ? <LoadingTextArea /> : <TextArea dataToDisplay={data} />}
      </div>
    </div>
  )
}
export default Editor
