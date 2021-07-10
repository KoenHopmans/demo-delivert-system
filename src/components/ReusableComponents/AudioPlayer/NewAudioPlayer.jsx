import React, {
  useState, useEffect, useRef, useContext,
} from 'react';
import axios from 'axios';
import AudioControls from './AudioControls';
import './NewAudioPlayer.css';
import MusicPlayerImg from '../../../images/music-player-tv__img.png';
import MusicPlayerVideo from '../../../videos/music-player-tv__video.mp4';
import DonDiabloVideo from '../../../videos/videoplayback.mp4';
import HexagonAnimation from '../Animations/HexagonAnimation';
import { userContext } from '../../context/UserProvider';

const NewAudioPlayer = ({ video = 'hexagon', tracks }) => {
  // Hooks
  const {
    trackName, artist, currentDemo, setPlayMusic, clicked,
  } = useContext(userContext);
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [goodTitle, setGoodTitle] = useState('');
  const [goodArtist, setGoodArtist] = useState('');
  const [started, setStarted] = useState(false);
  const { audioSrc } = tracks[trackIndex];
  const audioRef = useRef(new Audio(audioSrc));
  const videoRef = useRef();
  const intervalRef = useRef();
  const isReady = useRef(false);

  // Functions
  async function playFile() {
    console.log(currentDemo);
    try {
      const result = await axios.get(`http://localhost:8080/api/v1/downloadFile/${currentDemo}`, {
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'audio/mp3',
        },
      });
      console.log(result);
      const blob = new Blob([result.data], {
        type: 'audio/mp3',
      });
      console.log('blob', blob);
      const objectURL = URL.createObjectURL(blob);
      if (audioRef.current && audioRef.current.pause());
      audioRef.current = new Audio(objectURL);
      audioRef.current.play();
      console.log('PLAY CURRENT');
      videoRef.current.play();
    } catch (e) {
      console.error(e);
    }
  }

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
  const { duration } = audioRef.current;
  const currentPercentage = duration
    ? `${(trackProgress / duration) * 100}%`
    : '0%';
  const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
  `;

  const toNextTrack = () => {
    console.log('TRACK INDEX', [trackIndex]);
    console.log('TRACK INDEX TITLE', [trackIndex].title);
    setIsPlaying(true);
    if (trackIndex < tracks.length - 1) {
      setTrackIndex(trackIndex + 1);
    } else {
      setTrackIndex(0);
    }
  };

  const startTimer = () => {
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
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  const onScrubEnd = () => {
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  };

  const toPrevTrack = () => {
    setIsPlaying(true);
    if (trackIndex - 1 < 0) {
      setTrackIndex(tracks.length - 1);
    } else {
      setTrackIndex(trackIndex - 1);
    }
    setGoodTitle(tracks[trackIndex].title);
    setGoodArtist(tracks[trackIndex].artist);
  };

  // Effects
  useEffect(() => {
    if (started) { playFile(); }
    setIsPlaying(true);
    setGoodTitle(trackName);
    setGoodArtist(artist);
    setStarted(true);
  }, [trackName, clicked]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      videoRef.current.play();
      startTimer();
    } else {
      setPlayMusic(false);
      audioRef.current.pause();
      videoRef.current.pause();
    }
  }, [isPlaying, trackName]);

  useEffect(() => {
    setGoodTitle(tracks[trackIndex].title);
    setGoodArtist(tracks[trackIndex].artist);
    audioRef.current.pause();

    audioRef.current = new Audio(audioSrc);
    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      audioRef.current.play();
      videoRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      isReady.current = true;
    }
  }, [trackIndex]);

  useEffect(() =>
    () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
      setIsPlaying(false);
      setTrackIndex(0);
    },
  []);

  return (
    <div className="audio-player-container">
      <HexagonAnimation
        isPlaying={isPlaying}
        onPlayPauseClick={setIsPlaying}
      />
      <div className="audio-player">
        <div className="track-info">
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

export default NewAudioPlayer;
