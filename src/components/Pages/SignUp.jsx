import React from 'react';

import BackgroundVideo from '../ReusableComponents/BackgroundVideo/BackgroundVideo';
import NavigationBar from '../ReusableComponents/NavigationBar/NavigationBar';
import Header from '../ReusableComponents/Header/Header';
import FooterHexagon from '../ReusableComponents/Footer/FooterHexagon';
import MainContent from '../MainContentComponents/MainContent';

function SignUp() {
  return (
    <div>
      <NavigationBar loginBtn signUpBtn addDemoBtn profileBtn singOutBtn demosBtn />
      <BackgroundVideo />
      <Header />
      <MainContent />
      <FooterHexagon />
    </div>
  );
}

export default SignUp;
