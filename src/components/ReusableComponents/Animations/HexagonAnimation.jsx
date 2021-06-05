/* eslint-disable react/prop-types */
import React from 'react';
import './HexagonAnimation.css';
import HexagonLogoSvg from './HexagonLogoSvg';

const HexagonAnimation = ({
  isPlaying,
  onPlayPauseClick,
}) => (
  <div>
    {isPlaying ? (
      <button
        type="button"
        className="pause"
        onClick={() => onPlayPauseClick(false)}
        aria-label="Pause"
      >
        <HexagonLogoSvg />
      </button>
    ) : (
      <button
        type="button"
        className="play"
        onClick={() => onPlayPauseClick(true)}
        aria-label="Play"
      >
        <HexagonLogoSvg />
      </button>
    )}

  </div>
);

export default HexagonAnimation;
