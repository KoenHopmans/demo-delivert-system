import React from 'react';

import BackgroundVideo from './BackgroundVideo';
import NavigationBar from './NavigationBar';
import Header from './Header';
import FooterHexagon from './FooterHexagon';
import MusicPlayer from './MusicPlayer';
import DemosMainContent from './DemosMainContent';

function Hexagon() {
  return (
    <div>
      <NavigationBar profileBtn singOutBtn demoOptionBtn />
      <BackgroundVideo />
      <Header />
      <DemosMainContent />
      <MusicPlayer />
      <FooterHexagon />
    </div>
  );
}
export default Hexagon;
