import React from 'react';
import './LodingAnimation.css';

const LoadingAnimation = () => (
  <div className="logo-loading-container">
    <span className="logo-loading" id="logo-loading">
      <svg className="logo-loading__svg" height="200" width="200">
        <polygon
          className="logo-loading__svg__loading"
          points="100,10 180,55 180,145 100,190 20,145 20,55"
          style={{ fill: 'none', stroke: 'white', strokeWidth: 4 }}
        />
        <circle
          className="logo-loading__svg__circle"
          cx="100"
          cy="100"
          r="45"
          stroke="white"
          strokeWidth="4"
          fill="none"
        />
        <line
          className="logo-loading__svg__top-horizontal-line"
          x1="40"
          y1="120"
          x2="160"
          y2="120"
          style={{ stroke: 'white', strokeWidth: 4 }}
        />
        <line
          className="logo-loading__svg__bottom-horizontal-line"
          x1="40"
          y1="80"
          x2="160"
          y2="80"
          style={{ stroke: 'white', strokeWidth: 4 }}
        />
        <polyline
          className="logo-loading__svg__triangle"
          points="49,147 100,40 141,147"
          style={{ fill: 'none', stroke: 'white', strokeWidth: 4 }}
        />
        <line
          className="logo-loading__svg__triangle__bottom-line"
          x1="49"
          y1="147"
          x2="141"
          y2="147"
          style={{ stroke: 'white', strokeWidth: 4 }}
        />
        <text className="loading-text" x="40" y="107" fill="black" style={{ fontFamily: 'Audiowide', fontSize: '27px' }}>Loading</text>

      </svg>
    </span>
  </div>
);

export default LoadingAnimation;
