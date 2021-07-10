import React, { useContext } from 'react';
import './NavigationBar.css';
import { Link } from 'react-router-dom';
import image from '../../../images/navigation-bar-background.png';
import NavigationBarBtn from './NavigationBarBtn/NavigationBarBtn';
import { userContext } from '../../context/UserProvider';

const NavigationBar = ({
  loginBtn = false, signUpBtn = false, addDemoBtn = false, profileBtn = false,
  singOutBtn = false, myDemosBtn = false, hexagonBtn = false, authorityBtn = false, homeBtn = false,
}) => {
  // Hooks
  const { currentUser, adminUser } = useContext(userContext);

  return (
    <nav id="navigation-bar" className="navigation-bar">
      <img className="navigation-bar__background-img" src={image} alt="navigation bar" />
      {adminUser
        ? (
          <div className="navigation-bar__content-container">
            {loginBtn ? <Link to="/login"><NavigationBarBtn myIcon="login" titleName="Login" /></Link> : ''}
            {signUpBtn ? <Link to="/sign-up"><NavigationBarBtn myIcon="signUp" titleName="Sign up" /></Link> : ''}
            {addDemoBtn ? <Link to={{ pathname: `/admin/${adminUser}/add-demo/${currentUser}` }}><NavigationBarBtn myIcon="addDemo" titleName="Add demo" /></Link> : ''}
            {profileBtn ? <Link to={{ pathname: `/admin/${adminUser}/profile/${currentUser}` }}><NavigationBarBtn myIcon="profile" titleName="Profile" /></Link> : ''}
            {singOutBtn ? <Link to="/log-out"><NavigationBarBtn myIcon="signOut" titleName="Sign out" /></Link> : ''}
            {homeBtn ? <Link to="/"><NavigationBarBtn myIcon="home" titleName="Home" /></Link> : ''}
            {myDemosBtn ? <Link to={{ pathname: `/admin/${adminUser}/my-demos/${currentUser}` }}><NavigationBarBtn myIcon="demos" titleName="Demos" /></Link> : ''}
            {hexagonBtn ? <Link to={{ pathname: `/admin/${adminUser}/hexagon` }}><NavigationBarBtn myIcon="hexagon" titleName="Hexagon" /></Link> : ''}
            {authorityBtn ? <Link to={{ pathname: `/admin/${adminUser}/authority` }}><NavigationBarBtn myIcon="authority" titleName="Authority" /></Link> : ''}
          </div>
        )
        : (
          <div className="navigation-bar__content-container">
            {loginBtn ? <Link to="/login"><NavigationBarBtn myIcon="login" titleName="Login" /></Link> : ''}
            {signUpBtn ? <Link to="/sign-up"><NavigationBarBtn myIcon="signUp" titleName="Sign up" /></Link> : ''}
            {addDemoBtn ? <Link to={{ pathname: `/add-demo/${currentUser}` }}><NavigationBarBtn myIcon="addDemo" titleName="Add demo" /></Link> : ''}
            {profileBtn ? <Link to={{ pathname: `/profile/${currentUser}` }}><NavigationBarBtn myIcon="profile" titleName="Profile" /></Link> : ''}
            {singOutBtn ? <Link to="/log-out"><NavigationBarBtn myIcon="signOut" titleName="Sign out" /></Link> : ''}
            {homeBtn ? <Link to="/"><NavigationBarBtn myIcon="home" titleName="Home" /></Link> : ''}
            {myDemosBtn ? <Link to={{ pathname: `/my-demos/${currentUser}` }}><NavigationBarBtn myIcon="demos" titleName="Demos" /></Link> : ''}
            {hexagonBtn ? <Link to="/hexagon"><NavigationBarBtn myIcon="hexagon" titleName="Hexagon" /></Link> : ''}
            {authorityBtn ? <Link to="/authority"><NavigationBarBtn myIcon="authority" titleName="Authority" /></Link> : ''}
          </div>
        )}
    </nav>
  );
};
export default NavigationBar;
