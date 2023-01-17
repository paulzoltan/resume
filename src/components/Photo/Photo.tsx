import './photo.css'
import { AiOutlinePlus } from 'react-icons/ai'
import { BsImages } from 'react-icons/bs'
import { useState } from 'react'

export interface PhotoProps {
  image: string
  title?: string
}
const Photo = ({ image, title }: PhotoProps) => {
  const [open, setOpen] = useState(true)
  if (!open) return <></>
  return (
    <div className='photo'>
      <div className='photo__title-bar'>
        <div className='photo__icon'>
          <BsImages />
        </div>
        {title}
        <button
          className='photo__close-button'
          onClick={() => {
            setOpen(false)
          }}
        >
          <AiOutlinePlus />
        </button>
      </div>
      <div className='photo__vignetting'>
        <img className='photo__image' src={image} alt='pz' />
      </div>
    </div>
  )
}
export default Photo
