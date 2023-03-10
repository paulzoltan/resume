import TextArea from '../TextArea/TextArea'
import Numbering from '../Numbering/Numbering'
import MotionBackground from '../MotionBackground/MotionBackground'
import './editor.css'

export interface EditorProps {
  data: any
}

const Editor = ({ data }: EditorProps) => {
  return (
    <div className='editor'>
      <MotionBackground />
      <div className='editor__title-bar'>
        <div className='editor__icon'>{'{}'} </div>
        resume.json
      </div>
      <div className='editor__body'>
        <Numbering data={data} />
        <TextArea data={data} />
      </div>
    </div>
  )
}
export default Editor
