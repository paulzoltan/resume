import Editor from './components/Editor/Editor'
import Photo from './components/Photo/Photo'
import image from './assets/images/pz.png'
import MotionBackground from './components/MotionBackground/MotionBackground'
import { encodeNumerics } from './utils/helpers'
/* eslint import/no-webpack-loader-syntax: off */
import rawJsonDataHu from '!!raw-loader!./data/resume'
import rawJsonDataEn from '!!raw-loader!./data/resume-english'
import { useState } from 'react'

const data = {
  hu: JSON.parse(encodeNumerics(rawJsonDataHu)),
  en: JSON.parse(encodeNumerics(rawJsonDataEn)),
}
function App() {
  const [lang, setLang] = useState<Lang>('hu')
  return (
    <>
      <MotionBackground />
      <Photo image={image} title='pz.png' />
      <Editor data={data[lang]} lang={lang} onLangChange={setLang} />
    </>
  )
}

export default App
