/* eslint-disable react/prop-types */
import React from 'react';
import './NavigationBar.css';
import {
  Link,
} from 'react-router-dom';

import image from '../../../images/navigation-bar-background.png';
import NavigationBarBtn from './NavigationBarBtn/NavigationBarBtn';

const NavigationBar = ({
  loginBtn = false, signUpBtn = false, addDemoBtn = false, profileBtn = false,
  singOutBtn = false, demosBtn = false, demoOptionBtn = false, hexagonBtn = false,
}) => (
  <nav id="navigation-bar" className="navigation-bar">
    <img className="navigation-bar__background-img" src={image} alt="navigation bar" />
    <div className="navigation-bar__content-container">
      {loginBtn ? <Link to="/login"><NavigationBarBtn myIcon="login" titleName="Login" /></Link> : ''}
      {signUpBtn ? <Link to="/sign-up"><NavigationBarBtn myIcon="signUp" titleName="Sign up" /></Link> : ''}
      {addDemoBtn ? <Link to="/add-demo"><NavigationBarBtn myIcon="addDemo" titleName="Add demo" /></Link> : ''}
      {profileBtn ? <Link to="/profile"><NavigationBarBtn myIcon="profile" titleName="Profile" /></Link> : ''}
      {singOutBtn ? <Link to="/log-out"><NavigationBarBtn myIcon="signOut" titleName="Sign out" /></Link> : ''}
      {demosBtn ? <Link to="/demos"><NavigationBarBtn myIcon="demos" titleName="Demos" /></Link> : ''}
      {demoOptionBtn ? <Link to="/demo-options"><NavigationBarBtn myIcon="demoOptions" titleName="Demo Options" /></Link> : ''}
      {hexagonBtn ? <Link to="/hexagon"><NavigationBarBtn myIcon="hexagon" titleName="Hexagon" /></Link> : ''}
    </div>
  </nav>
);
export default NavigationBar;
