import TextArea from '../TextArea/TextArea'
import Numbering from '../Numbering/Numbering'
import MotionBackground from '../MotionBackground/MotionBackground'
import './editor.css'
import { useState } from 'react'

export interface EditorProps {
  data: any
}

const Editor = ({ data }: EditorProps) => {
  const [lineNumber, setLineNumber] = useState(0)

  return (
    <div className='editor'>
      <MotionBackground />
      <div className='editor__title-bar'>
        <div className='editor__icon'>{'{}'} </div>
        resume.json
      </div>
      <div className='editor__body'>
        <Numbering {...{ lineNumber }} />
        <TextArea dataToDisplay={data} handleLineNumberChange={setLineNumber} />
      </div>
    </div>
  )
}
export default Editor
