import Editor from './components/Editor/Editor'
import Photo from './components/Photo/Photo'
import data from './data/resume.json'
import image from './assets/images/pz.png'

function App() {
  return (
    <>
      <Photo image={image} title='pz.png' />
      <Editor data={data} />
    </>
  )
}

export default App
