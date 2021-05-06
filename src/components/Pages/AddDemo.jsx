import React from 'react';

import BackgroundVideo from '../ReusableComponents/BackgroundVideo/BackgroundVideo';
import NavigationBar from '../ReusableComponents/NavigationBar/NavigationBar';
import Header from '../ReusableComponents/Header/Header';
import FooterHexagon from '../ReusableComponents/Footer/FooterHexagon';
import MusicPlayer from '../ReusableComponents/AudioPlayer/MusicPlayer';
import DemosMain from '../MainContentComponents/DemosMain';

function AddDemo() {
  return (
    <div>
      <NavigationBar profileBtn singOutBtn demosBtn />
      <BackgroundVideo />
      <Header />
      <DemosMain />
      <MusicPlayer />
      <FooterHexagon />
    </div>
  );
}
export default AddDemo;
