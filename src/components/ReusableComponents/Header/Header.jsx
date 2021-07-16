import React from 'react';
import './Header.css';
import HexagonWordImage from '../../../Images/hexagon-word-logo.png';

const Header = () => (
  <div className="header__content">
    <h1 data-testid="header" className="header__title">SoundPort</h1>
    <div className="navigation-bar__hexagon-logo">
      <img src={HexagonWordImage} alt="Hexagon" />
    </div>
  </div>
);

export default Header;
