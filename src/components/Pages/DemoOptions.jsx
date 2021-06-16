import React from 'react';

import BackgroundVideo from '../ReusableComponents/BackgroundVideo/BackgroundVideo';
import NavigationBar from '../ReusableComponents/NavigationBar/NavigationBar';
import Header from '../ReusableComponents/Header/Header';
import FooterHexagon from '../ReusableComponents/Footer/FooterHexagon';
// import AudioPlayer from '../ReusableComponents/AudioPlayer/AudioPlayer';
// import tracks from '../TrackLists/TrackListHexagon';
import DemoOptionsMainContent from '../MainComponents/DemoOptionsMain';

function DemoOptions() {
  return (
    <div>
      <div id="content-wrap">
        <NavigationBar singOutBtn demosBtn />
        <BackgroundVideo video="blueStar" />
        <Header />
        {/* <AudioPlayer video="donDiablo" tracks={tracks} /> */}
        <DemoOptionsMainContent />
      </div>
      <FooterHexagon />
    </div>
  );
}
export default DemoOptions;
