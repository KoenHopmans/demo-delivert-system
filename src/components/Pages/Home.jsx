import React from 'react';

import BackgroundVideo from '../ReusableComponents/BackgroundVideo/BackgroundVideo';
import NavigationBar from '../ReusableComponents/NavigationBar/NavigationBar';
import Header from '../ReusableComponents/Header/Header';
import FooterHexagon from '../ReusableComponents/Footer/FooterHexagon';
import HomeMainContent from '../MainContentComponents/HomeMain';
import tracks from '../TrackLists/TrackListHome';
import AudioPlayer from '../ReusableComponents/AudioPlayer/AudioPlayer';

function Home() {
  return (
    <div>
      <div id="content-wrap">
        <NavigationBar loginBtn signUpBtn />
        <BackgroundVideo video="blueHexagon" />
        <Header />
        <AudioPlayer video="MusicPlayerVideo" tracks={tracks} />
        <HomeMainContent />
        <FooterHexagon />
      </div>
    </div>
  );
}
export default Home;
