import React from 'react';

import BackgroundVideo from './BackgroundVideo';
import NavigationBar from './NavigationBar';
import Header from './Header';
import FooterHexagon from './FooterHexagon';
import MusicPlayer from './MusicPlayer';
import DemosMainContent from './DemosMainContent';

function AddDemo() {
  return (
    <div>
      <NavigationBar profileBtn singOutBtn demosBtn />
      <BackgroundVideo />
      <Header />
      <DemosMainContent />
      <MusicPlayer />
      <FooterHexagon />
    </div>
  );
}
export default AddDemo;
