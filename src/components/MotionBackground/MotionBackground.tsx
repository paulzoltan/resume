import video0 from '../../assets/videos/particles.mp4'
import video1 from '../../assets/videos/circuit.mp4'
import video2 from '../../assets/videos/strings.mp4'
import video3 from '../../assets/videos/cyber-punk.mp4'
import classNames from 'classnames'
import './motionBackground.css'

const videos = [video0, video1, video2, video3]
const randomNum = Math.floor(Math.random() * videos.length)
const randomVideo = videos[randomNum]

const MotionBackground = () => {
  return (
    <video
      className={classNames('backgroundVideo', randomVideo)}
      autoPlay
      loop
      muted
    >
      <source src={randomVideo} type='video/mp4' />
      Sorry, your browser doesn't support embedded videos.
    </video>
  )
}
export default MotionBackground
