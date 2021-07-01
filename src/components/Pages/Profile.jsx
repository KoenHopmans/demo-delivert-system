import React from 'react';

import { useParams } from 'react-router';
import BackgroundVideo from '../ReusableComponents/BackgroundVideo/BackgroundVideo';
import NavigationBar from '../ReusableComponents/NavigationBar/NavigationBar';
import Header from '../ReusableComponents/Header/Header';
import FooterHexagon from '../ReusableComponents/Footer/FooterHexagon';
import ProfileMain from '../MainComponents/ProfileMain';
import tracks from '../TrackLists/TrackListHexagon';
import NewAudioPlayer from '../ReusableComponents/AudioPlayer/NewAudioPlayer';

function Profile() {
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
        <NavigationBar hexagonBtn={params.role} addDemoBtn singOutBtn myDemosBtn />
        <BackgroundVideo video={backgroundVideo()} />
        <Header />
        <NewAudioPlayer video="donDiablo" tracks={tracks} />
        <ProfileMain />
        <FooterHexagon />
      </div>
    </div>
  );
}

export default Profile;
