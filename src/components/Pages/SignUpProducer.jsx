import React from 'react';

import BackgroundVideo from '../ReusableComponents/BackgroundVideo/BackgroundVideo';
import NavigationBar from '../ReusableComponents/NavigationBar/NavigationBar';
import Header from '../ReusableComponents/Header/Header';
import tracks from '../TrackLists/TrackListHexagon';
import FooterHexagon from '../ReusableComponents/Footer/FooterHexagon';
import AudioPlayer from '../ReusableComponents/AudioPlayer/AudioPlayer';
import SignUpProducerMainContent from '../MainComponents/SignUpProducerMain';

function SignUpProducer() {
  return (
    <div>
      <div id="content-wrap">
        <NavigationBar loginBtn signUpBtn addDemoBtn profileBtn singOutBtn demosBtn />
        <BackgroundVideo />
        <Header />
        <AudioPlayer video="donDiablo" tracks={tracks} />
        <SignUpProducerMainContent />
        <FooterHexagon />
      </div>
    </div>
  );
}

export default SignUpProducer;
