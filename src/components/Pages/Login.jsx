import React from 'react';

import BackgroundVideo from '../ReusableComponents/BackgroundVideo/BackgroundVideo';
import NavigationBar from '../ReusableComponents/NavigationBar/NavigationBar';
import Header from '../ReusableComponents/Header/Header';
import FooterHexagon from '../ReusableComponents/Footer/FooterHexagon';
import AudioPlayer from '../ReusableComponents/AudioPlayer/AudioPlayer';
import tracks from '../TrackLists/TrackListHexagon';
import LoginMainContent from '../MainContentComponents/LoginMain';

function Login() {
  return (
    <div>
      <div id="content-wrap">
        <NavigationBar signUpBtn singOutBtn demosBtn hexagonBtn />
        <BackgroundVideo video="blueStar" />
        <Header />
        <AudioPlayer video="donDiablo" tracks={tracks} />
        <LoginMainContent />
      </div>
      <FooterHexagon />
    </div>
  );
}

export default Login;
