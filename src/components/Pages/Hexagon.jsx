import React from 'react';

import BackgroundVideo from '../ReusableComponents/BackgroundVideo/BackgroundVideo';
import NavigationBar from '../ReusableComponents/NavigationBar/NavigationBar';
import Header from '../ReusableComponents/Header/Header';
import FooterHexagon from '../ReusableComponents/Footer/FooterHexagon';
import NewAudioPlayer from '../ReusableComponents/AudioPlayer/NewAudioPlayer';
import tracks from '../TrackLists/TrackListHexagon';
import HexagonMain from '../MainComponents/HexagonMain';

function Hexagon() {
  return (
    <div>
      <div id="content-wrap">
        <NavigationBar singOutBtn demosBtn profileBtn />
        <BackgroundVideo video="blueStar" />
        <Header />
        <NewAudioPlayer video="donDiablo" tracks={tracks} />
        <HexagonMain />
      </div>
      <FooterHexagon />
    </div>
  );
}
export default Hexagon;
