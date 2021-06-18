import React from 'react';

import BackgroundVideo from '../ReusableComponents/BackgroundVideo/BackgroundVideo';
import NavigationBar from '../ReusableComponents/NavigationBar/NavigationBar';
import Header from '../ReusableComponents/Header/Header';
import FooterHexagon from '../ReusableComponents/Footer/FooterHexagon';
// import AudioPlayer from '../ReusableComponents/AudioPlayer/AudioPlayer';
import tracks from '../TrackLists/TrackListHexagon';
import AddDemoMainContent from '../MainComponents/AddDemoMain';
import NewAudioPlayer from '../ReusableComponents/AudioPlayer/NewAudioPlayer';

function AddDemo() {
  return (
    <div>
      <div id="content-wrap">
        <NavigationBar singOutBtn demosBtn myDemosBtn profileBtn />
        <BackgroundVideo video="blueStar" />
        <Header />
        {/* <AudioPlayer video="donDiablo" tracks={tracks} /> */}
        <NewAudioPlayer video="donDiablo" tracks={tracks} />
        <AddDemoMainContent />
      </div>
      <FooterHexagon />
    </div>
  );
}
export default AddDemo;
