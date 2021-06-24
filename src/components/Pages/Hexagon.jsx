import React from 'react';

import { useParams } from 'react-router';
import BackgroundVideo from '../ReusableComponents/BackgroundVideo/BackgroundVideo';
import NavigationBar from '../ReusableComponents/NavigationBar/NavigationBar';
import Header from '../ReusableComponents/Header/Header';
import FooterHexagon from '../ReusableComponents/Footer/FooterHexagon';
import NewAudioPlayer from '../ReusableComponents/AudioPlayer/NewAudioPlayer';
import tracks from '../TrackLists/TrackListHexagon';
import HexagonMain from '../MainComponents/HexagonMain';

function Hexagon() {
  const params = useParams();
  let selectedVideo = 'colorHexagonVideo';
  // eslint-disable-next-line consistent-return
  const backgroundVideo = () => {
    if (params.role) {
      selectedVideo = 'blueStar';
    }
    return selectedVideo;
  };

  return (
    <div>
      <div id="content-wrap">
        <NavigationBar myDemosBtn singOutBtn demosBtn profileBtn />
        <BackgroundVideo video={backgroundVideo()} />
        <Header />
        <NewAudioPlayer video="donDiablo" tracks={tracks} />
        <HexagonMain />
      </div>
      <FooterHexagon />
    </div>
  );
}
export default Hexagon;
