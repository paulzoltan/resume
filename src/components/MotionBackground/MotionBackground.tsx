import particles from '../../assets/videos/particles.mp4'
import cyberpunk from '../../assets/videos/cyberpunk.mp4'
import classNames from 'classnames'
import './motionBackground.css'

const videos = [particles, cyberpunk]
const randomNum = Math.floor(Math.random() * videos.length)
const randomVideo = videos[randomNum]
/**
 * Get the video name
 * exemple: /static/media/strings.cyberpunk.mp4 => cyberpunk
 */
const randomVideoName = randomVideo.split('/').pop()?.split('.')[0]

const MotionBackground = () => {
  return (
    <video
      className={classNames('backgroundVideo', randomVideoName)}
      autoPlay
      loop
      muted
    >
      <source src={randomVideo} type='video/mp4' />
    </video>
  )
}
export default MotionBackground
