import React from 'react';
import HexagonVideo from '../videos/background-video-hexagon.mp4';
import './BackgroundVideo.css';

const BackgroundVideo = () => (
  <div>
    <video className="background-video" autoPlay loop muted>
      <source src={HexagonVideo} type="video/mp4" />
      <track kind="captions" label="Hexagon background" />
    </video>
  </div>
);

export default BackgroundVideo;
