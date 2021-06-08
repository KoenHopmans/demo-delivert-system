import React from 'react';

import BackgroundVideo from '../ReusableComponents/BackgroundVideo/BackgroundVideo';
import NavigationBar from '../ReusableComponents/NavigationBar/NavigationBar';
import Header from '../ReusableComponents/Header/Header';
import FooterHexagon from '../ReusableComponents/Footer/FooterHexagon';
import LogoutMain from '../MainComponents/LogoutMain';
import tracks from '../TrackLists/TrackListHexagon';
import AudioPlayer from '../ReusableComponents/AudioPlayer/AudioPlayer';

function LogOut() {
  return (
    <div>
      <div id="content-wrap">
        <NavigationBar loginBtn />
        <BackgroundVideo />
        <Header />
        <AudioPlayer video="donDiablo" tracks={tracks} />
        <LogoutMain />
        <FooterHexagon />
      </div>
    </div>
  );
}

export default LogOut;
