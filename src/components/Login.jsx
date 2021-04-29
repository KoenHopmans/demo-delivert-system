import React from 'react';

import BackgroundVideo from './BackgroundVideo';
import NavigationBar from './NavigationBar';
import Header from './Header';
import FooterHexagon from './FooterHexagon';
import MainContent from './MainContent';

function Login() {
  return (
    <div>
      <NavigationBar signUpBtn singOutBtn demosBtn hexagonBtn />
      <BackgroundVideo />
      <Header />
      <MainContent />
      <FooterHexagon />
    </div>
  );
}

export default Login;
