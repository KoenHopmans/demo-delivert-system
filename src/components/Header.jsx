import React from 'react';
import './Header.css';
import HexagonWordImage from '../images/hexagon-word-logo.png';

const Header = () => (
  <div className="header__content">
    <h1 className="header__title">SoundPort</h1>
    <div className="navigation-bar__hexagon-logo">
      <img src={HexagonWordImage} alt="Hexagon" />
    </div>
  </div>

);

export default Header;
