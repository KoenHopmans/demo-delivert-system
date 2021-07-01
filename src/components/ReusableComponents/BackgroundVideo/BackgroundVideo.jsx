import React from 'react';
import ColorHexagonVideo from '../../../videos/background-video-hexagon.mp4';
import './BackgroundVideo.css';
import MusicPlayerVideo from '../../../videos/music-player-tv__video.mp4';
import DonDiabloVideo from '../../../videos/videoplayback.mp4';
import BlueStar from '../../../videos/blue-star-background.mp4';
import BlueHexagon from '../../../videos/blue-hexagon-stars.mp4';
import PageNotFound from '../../../videos/background-page-not-found.mp4';

const BackgroundVideo = ({ video = 'blueStar' }) => {
  const chosenVideo = () => {
    switch (video) {
      case 'colorHexagonVideo':
        return ColorHexagonVideo;
      case 'donDiablo':
        return DonDiabloVideo;
      case 'blueStar':
        return BlueStar;
      case 'blueHexagon':
        return BlueHexagon;
      case 'pageNotFound':
        return PageNotFound;
      default:
        return MusicPlayerVideo;
    }
  };
  return (

    <div>
      <video className="background-video" autoPlay loop muted>
        <source src={chosenVideo()} type="video/mp4" />
        <track kind="captions" label="Hexagon background" />
      </video>
    </div>
  );
};

export default BackgroundVideo;
