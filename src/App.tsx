import Editor from './components/Editor/Editor'
import Photo from './components/Photo/Photo'
import image from './assets/images/pz.png'
import MotionBackground from './components/MotionBackground/MotionBackground'
import { encodeNumerics } from './utils/helpers'
/* eslint import/no-webpack-loader-syntax: off */
import rawJsonData from '!!raw-loader!./data/resume'

const data = JSON.parse(encodeNumerics(rawJsonData))

function App() {
  return (
    <>
      <MotionBackground />
      <Photo image={image} title='pz.png' />
      <Editor data={data} />
    </>
  )
}

export default App
