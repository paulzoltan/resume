import './LoadingTextArea.css'
import React from 'react'

function LoadingTextArea() {
  return (
    <div className='loading-text-area editor__text-area'>
      <div className='dot'>0</div>
      <div className='editor__scope--empty'>
        <span className='cursor blinking'>█</span>
      </div>
    </div>
  )
}
export default LoadingTextArea
