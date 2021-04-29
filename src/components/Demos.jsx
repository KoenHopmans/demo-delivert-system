import React from 'react';

import BackgroundVideo from './BackgroundVideo';
import NavigationBar from './NavigationBar';
import Header from './Header';
import FooterHexagon from './FooterHexagon';
import DemosMainContent from './DemosMainContent';
import AudioPlayer from './AudioPlayer';
import tracks from './tracks';

function Demos() {
  return (
    <div>
      <NavigationBar addDemoBtn profileBtn singOutBtn demoOptionBtn />
      <BackgroundVideo />
      <Header />
      <AudioPlayer tracks={tracks} />
      <DemosMainContent />
      <FooterHexagon />
    </div>
  );
}
export default Demos;
