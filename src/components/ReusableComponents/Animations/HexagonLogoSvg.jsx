import React from 'react';

const HexagonLogoSvg = () => (
  <div className="logo-hexagon-container">
    <span className="logo-hexagon" id="logo-hexagon">
      <svg className="logo-hexagon__svg" height="200" width="200">
        <polygon
          className="logo-hexagon__svg__hexagon"
          points="100,10 180,55 180,145 100,190 20,145 20,55"
          style={{ fill: 'none', stroke: 'white', strokeWidth: 4 }}
        />
        <circle
          className="logo-hexagon__svg__circle"
          cx="100"
          cy="100"
          r="45"
          stroke="white"
          strokeWidth="4"
          fill="none"
        />
        <line
          className="logo-hexagon__svg__top-horizontal-line"
          x1="40"
          y1="105"
          x2="160"
          y2="105"
          style={{ stroke: 'white', strokeWidth: 4 }}
        />
        <line
          className="logo-hexagon__svg__bottom-horizontal-line"
          x1="40"
          y1="95"
          x2="160"
          y2="95"
          style={{ stroke: 'white', strokeWidth: 4 }}
        />
        <polyline
          className="logo-hexagon__svg__triangle"
          points="49,147 100,40 141,147"
          style={{ fill: 'none', stroke: 'white', strokeWidth: 4 }}
        />
        <line
          className="logo-hexagon__svg__triangle__bottom-line"
          x1="49"
          y1="147"
          x2="141"
          y2="147"
          style={{ stroke: 'white', strokeWidth: 4 }}
        />
      </svg>
    </span>
  </div>
);

export default HexagonLogoSvg;
