import { useElapsed } from '../../hooks'
import LoadingTextArea from '../LoadingTextArea'
import TextArea from '../TextArea/TextArea'
import './editor.css'

export interface EditorProps {
  data: any
}

const Editor = ({ data }: EditorProps) => {
  const loading = !useElapsed(2000)
  return (
    <div className='editor'>
      <div className='editor__title-bar'>
        <div className='editor__icon'>{'{}'} </div>
        resume.json
      </div>
      <div className='editor__body--wrapper'>
        {loading ? <LoadingTextArea /> : <TextArea dataToDisplay={data} />}
      </div>
    </div>
  )
}
export default Editor
