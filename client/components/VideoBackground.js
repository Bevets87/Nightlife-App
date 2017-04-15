import React from 'react'

import video from '../videos/bar-background.mp4'

import './VideoBackground.scss'

const VideoBackground = () => (
  <div className='video-background-container'>
    <video playsInline autoPlay muted loop id='bgvid'>
      <source src={video} type='video/mp4' />
    </video>
  </div>
)

export default VideoBackground
