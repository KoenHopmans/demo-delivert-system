import React from 'react';

import BackgroundVideo from '../ReusableComponents/BackgroundVideo/BackgroundVideo';
import NavigationBar from '../ReusableComponents/NavigationBar/NavigationBar';
import Header from '../ReusableComponents/Header/Header';
import FooterHexagon from '../ReusableComponents/Footer/FooterHexagon';
import NewAudioPlayer from '../ReusableComponents/AudioPlayer/NewAudioPlayer';
import tracks from '../TrackLists/TrackListHexagon';
import LoginMainContent from '../MainComponents/LoginMain';

function Login() {
  return (
    <div>
      <div id="content-wrap">
        <NavigationBar signUpBtn singOutBtn demosBtn hexagonBtn />
        <BackgroundVideo video="blueStar" />
        <Header />
        <NewAudioPlayer video="donDiablo" tracks={tracks} />
        <LoginMainContent />
      </div>
      <FooterHexagon />
    </div>
  );
}

export default Login;
