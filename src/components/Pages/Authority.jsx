import React from 'react';

import { useParams } from 'react-router';
import BackgroundVideo from '../ReusableComponents/BackgroundVideo/BackgroundVideo';
import NavigationBar from '../ReusableComponents/NavigationBar/NavigationBar';
import Header from '../ReusableComponents/Header/Header';
import FooterHexagon from '../ReusableComponents/Footer/FooterHexagon';
import NewAudioPlayer from '../ReusableComponents/AudioPlayer/NewAudioPlayer';
import tracks from '../TrackLists/TrackListHexagon';
import AuthorityMain from '../MainComponents/AuthorityMain';

function Authority() {
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
        <NavigationBar myDemosBtn singOutBtn profileBtn hexagonBtn />
        <BackgroundVideo video={backgroundVideo()} />
        <Header />
        <NewAudioPlayer video="donDiablo" tracks={tracks} />
        <AuthorityMain />
      </div>
      <FooterHexagon />
    </div>
  );
}
export default Authority;
