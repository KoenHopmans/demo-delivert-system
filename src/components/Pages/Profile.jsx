import React from 'react';

import BackgroundVideo from '../ReusableComponents/BackgroundVideo/BackgroundVideo';
import NavigationBar from '../ReusableComponents/NavigationBar/NavigationBar';
import Header from '../ReusableComponents/Header/Header';
import FooterHexagon from '../ReusableComponents/Footer/FooterHexagon';
import ProfileMain from '../MainComponents/ProfileMain';
import tracks from '../TrackLists/TrackListHexagon';
import NewAudioPlayer from '../ReusableComponents/AudioPlayer/NewAudioPlayer';

function Profile() {
  return (
    <div>
      <div id="content-wrap">
        <NavigationBar addDemoBtn singOutBtn demosBtn myDemosBtn />
        <BackgroundVideo />
        <Header />
        <NewAudioPlayer video="donDiablo" tracks={tracks} />
        <ProfileMain />
        <FooterHexagon />
      </div>
    </div>
  );
}

export default Profile;
