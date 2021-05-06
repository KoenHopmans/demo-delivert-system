import React from 'react';
import './MusicPlayer.css';
import MusicPlayerImg from '../../../images/music-player-tv__img.png';
import MusicPlayerVideo from '../../../videos/music-player-tv__video.mp4';
import AudioSample02 from '../../../audio/music-sample-02.mp3';

const MusicPlayer = () => {
  const audio2 = new Audio(AudioSample02);
  return (
    <div className="music-player-container">
      <div id="music-player-tv" onClick={() => audio2.play()}>{/* eslint-disable-line */}
        <img className="music-player-tv__img" id="music-player-tv__img" src={MusicPlayerImg} alt="Music Player" />
        <video className="music-player-tv__video" autoPlay loop muted>
          <source src={MusicPlayerVideo} type="video/mp4" />
          <track kind="captions" label="Music-player video" />
        </video>
      </div>
      <audio id="music-player__audio" controls loop>

        <track kind="captions" label="example01" />
      </audio>
      <div className="music-player">
        <div className="music-player__control" id="music-player__control">
          <button type="button" id="action-btn--prev" className="music-player__action-btn music-player__action-btn--prev">
            <span className="fas fa-backward md-20" />
          </button>
          <button type="button" id="action-btn--play" className="music-player__action-btn music-player__action-btn--play">
            <span className="fas fa-play md-20" />
          </button>
          <button type="button" id="action-btn--next" className="music-player__action-btn music-player__action-btn--next">
            <span className="fas fa-forward md-20" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
