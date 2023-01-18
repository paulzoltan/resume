import './photo.css'
import { AiOutlinePlus } from 'react-icons/ai'
import { BsImages } from 'react-icons/bs'
import { useState } from 'react'
import { motion, useDragControls } from 'framer-motion'

export interface PhotoProps {
  image: string
  title?: string
}
const Photo = ({ image, title }: PhotoProps) => {
  const [open, setOpen] = useState(true)
  const controls = useDragControls()
  if (!open) return <></>
  return (
    <motion.div
      className='photo'
      drag
      dragControls={controls}
      dragMomentum={false}
    >
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
    </motion.div>
  )
}
export default Photo
