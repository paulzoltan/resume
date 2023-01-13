import React from 'react'
import data from './randomJSON.json'

console.log(data)

function App() {
  return <div className='App'>{JSON.stringify(data)}</div>
}

export default App
