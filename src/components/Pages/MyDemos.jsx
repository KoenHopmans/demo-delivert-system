import React from 'react';

import { useParams } from 'react-router';
import BackgroundVideo from '../ReusableComponents/BackgroundVideo/BackgroundVideo';
import NavigationBar from '../ReusableComponents/NavigationBar/NavigationBar';
import Header from '../ReusableComponents/Header/Header';
import FooterHexagon from '../ReusableComponents/Footer/FooterHexagon';
import NewAudioPlayer from '../ReusableComponents/AudioPlayer/NewAudioPlayer';
import tracks from '../TrackLists/TrackListHexagon';
import MyDemosMain from '../MainComponents/MyDemosMain';

function MyDemos() {
  let selectedVideo = 'colorHexagonVideo';

  // Hooks
  const params = useParams();

  // Functions
  const backgroundVideo = () => {
    if (params.role) {
      selectedVideo = 'blueStar';
    }
    return selectedVideo;
  };
  return (
    <div>
      <div id="content-wrap">
        <NavigationBar hexagonBtn={params.role} singOutBtn profileBtn addDemoBtn />
        <BackgroundVideo video={backgroundVideo()} />
        <Header />
        <NewAudioPlayer video="donDiablo" tracks={tracks} />
        <MyDemosMain />
      </div>
      <FooterHexagon />
    </div>
  );
}
export default MyDemos;
