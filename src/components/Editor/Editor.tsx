import TextArea from '../TextArea/TextArea'
import Numbering from '../Numbering/Numbering'
import './editor.css'
import video0 from '../../assets/videos/particles.mp4'
import video1 from '../../assets/videos/circuit.mp4'
import video2 from '../../assets/videos/strings.mp4'

export interface EditorProps {
  data: any
}

const videos = [video0, video1, video2]
const randomNum = Math.floor(Math.random() * 3)
const randomVideo = videos[randomNum]

const Editor = ({ data }: EditorProps) => {
  return (
    <div className='editor'>
      <video className='editor__backgroundVideo' autoPlay loop muted>
        <source src={randomVideo} type='video/mp4' />
        Sorry, your browser doesn't support embedded videos.
      </video>
      <div className='editor__title-bar'>
        <div className='editor__icon'>{'{}'} </div>resume.json
      </div>
      <div className='editor__body'>
        <Numbering data={data} />
        <TextArea data={data} />
      </div>
    </div>
  )
}
export default Editor
