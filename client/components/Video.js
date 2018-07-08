import React, { Component } from 'react'
import video from '../assets/videos/bar-background.mp4'

import '../styles/components/Video.scss'

class Video extends Component {
  render() {
    return(
      <video data-testid="video" playsInline autoPlay muted loop className='video' >
        <source src={video} type='video/mp4' />
      </video>
    )
  }
} 
  


export default Video
