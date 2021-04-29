import React from 'react';

import BackgroundVideo from './BackgroundVideo';
import NavigationBar from './NavigationBar';
import Header from './Header';
import FooterHexagon from './FooterHexagon';
import MainContent from './MainContent';

function Home() {
  return (
    <div>
      <NavigationBar loginBtn signUpBtn />
      <BackgroundVideo />
      <Header />
      <MainContent />
      <FooterHexagon />
    </div>
  );
}
export default Home;
