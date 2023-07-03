import TextArea from '../TextArea/TextArea'
import './editor.css'

export interface EditorProps {
  data: any
}

const Editor = ({ data }: EditorProps) => {
  return (
    <div className='editor'>
      <div className='editor__title-bar'>
        <div className='editor__icon'>{'{}'} </div>
        resume.json
      </div>
      <div className='editor__body--wrapper'>
        <TextArea dataToDisplay={data} />
      </div>
    </div>
  )
}
export default Editor
