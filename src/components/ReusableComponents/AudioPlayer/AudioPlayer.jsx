import React, { useState, useEffect, useRef } from 'react';
import AudioControls from './AudioControls';
import './AudioPlayer.css';
import MusicPlayerImg from '../../../images/music-player-tv__img.png';
import MusicPlayerVideo from '../../../videos/music-player-tv__video.mp4';
import DonDiabloVideo from '../../../videos/videoplayback.mp4';
import HexagonLogo from '../HexagonLogo/HexagonLogo';

/*
 * Read the blog post here:
 * https://letsbuildui.dev/articles/building-an-audio-player-with-react-hooks
 */
const AudioPlayer = ({ video = 'hexagon', tracks, selectedMode1 = 1 }) => {
  const chosenVideo = () => {
    switch (video) {
      case 'hexagon':
        return MusicPlayerVideo;
      case 'donDiablo':
        return DonDiabloVideo;
      default:
        return MusicPlayerVideo;
    }
  };
  // State
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Destructure for conciseness
  const { audioSrc } = tracks[trackIndex];

  let {
    // eslint-disable-next-line prefer-const
    title, artist, image,
  } = tracks[trackIndex];

  // eslint-disable-next-line prefer-const,no-unused-vars
  const [goodTitle, setGoodTitle] = useState(title);
  const [goodImage, setGoodImage] = useState(image);
  const [goodArtist, setGoodArtist] = useState(artist);

  function findTrack(track) {
    // eslint-disable-next-line
    return track.id == selectedMode1;
  }

  const goodTrack = tracks.find(findTrack);
  const audioRef = useRef(new Audio(audioSrc));
  const videoRef = useRef();
  const intervalRef = useRef();
  const isReady = useRef(false);

  // Destructure for conciseness
  const { duration } = audioRef.current;

  const currentPercentage = duration
    ? `${(trackProgress / duration) * 100}%`
    : '0%';
  const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
  `;

  const toNextTrack = () => {
    if (trackIndex < tracks.length - 1) {
      setTrackIndex(trackIndex + 1);
    } else {
      setTrackIndex(0);
    }
    setGoodTitle('');
    setGoodArtist('');
  };

  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        toNextTrack();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };

  const onScrub = (value) => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  const onScrubEnd = () => {
    // If not already playing, start
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  };

  const toPrevTrack = () => {
    if (trackIndex - 1 < 0) {
      setTrackIndex(tracks.length - 1);
    } else {
      setTrackIndex(trackIndex - 1);
    }
    setGoodTitle('');
    setGoodArtist('');
  };
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      videoRef.current.play();
      startTimer();
    } else {
      audioRef.current.pause();
      videoRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.pause();

    audioRef.current = new Audio(goodTrack.audioSrc);
    // eslint-disable-next-line no-const-assign
    setGoodTitle(goodTrack.title);
    setGoodArtist(goodTrack.artist);
    setGoodImage(goodTrack.image);

    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      // eslint-disable-next-line no-use-before-define
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
  }, [selectedMode1]);

  // Handles cleanup and setup when changing tracks
  useEffect(() => {
    audioRef.current.pause();

    audioRef.current = new Audio(audioSrc);
    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
  }, [trackIndex]);

  useEffect(() =>
    // Pause and clean up on unmount
  // eslint-disable-next-line implicit-arrow-linebreak
    () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    },
  []);

  return (
    <div className="audio-player-container">
      <HexagonLogo
        isPlaying={isPlaying}
        onPlayPauseClick={setIsPlaying}
      />
      <div className="audio-player">
        <div className="track-info">
          <img
            className="artwork"
            src={goodImage}
            alt={`track artwork for ${goodTitle} by ${goodArtist}`}
          />
          <AudioControls
            isPlaying={isPlaying}
            onPrevClick={toPrevTrack}
            onNextClick={toNextTrack}
            onPlayPauseClick={setIsPlaying}
          />
          <h2 className="title">{goodTitle}</h2>
          <h3 className="artist">{goodArtist}</h3>
          <input
            type="range"
            value={trackProgress}
            step="1"
            min="0"
            max={duration || `${duration}`}
            className="progress"
            onChange={(e) => onScrub(e.target.value)}
            onMouseUp={onScrubEnd}
            onKeyUp={onScrubEnd}
            style={{ background: trackStyling }}
          />
        </div>
        <div id="music-player-tv">
          <img className="music-player-tv__img" id="music-player-tv__img" src={MusicPlayerImg} alt="Music Player" />
          <video ref={videoRef} className="music-player-tv__video" autoPlay loop muted>
            <source src={chosenVideo()} type="video/mp4" />
            <track kind="captions" label="Music-player video" />
          </video>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
