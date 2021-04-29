/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import AudioControls from './AudioControls';
import './audio-player-styles.css';
import MusicPlayerImg from '../images/music-player-tv__img.png';
import MusicPlayerVideo from '../videos/music-player-tv__video.mp4';
import HexagonLogo from './HexagonLogo';

/*
 * Read the blog post here:
 * https://letsbuildui.dev/articles/building-an-audio-player-with-react-hooks
 */
const AudioPlayer = ({ tracks }) => {
  // State
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Destructure for conciseness
  let { audioSrc } = tracks[trackIndex];

  const {
    title, artist, image,
  } = tracks[trackIndex];

  console.log(tracks);
  function findTrack(track) {
    return track.id === 2;
  }

  const goodTrack = tracks.find(findTrack);
  console.log(goodTrack.audioSrc);

  const setAudioSrc = () => goodTrack.audioSrc;

  audioSrc = setAudioSrc();

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
            src={image}
            alt={`track artwork for ${title} by ${artist}`}
          />
          <h2 className="title">{title}</h2>
          <h3 className="artist">{artist}</h3>
          <AudioControls
            isPlaying={isPlaying}
            onPrevClick={toPrevTrack}
            onNextClick={toNextTrack}
            onPlayPauseClick={setIsPlaying}
          />
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
            <source src={MusicPlayerVideo} type="video/mp4" />
            <track kind="captions" label="Music-player video" />
          </video>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
