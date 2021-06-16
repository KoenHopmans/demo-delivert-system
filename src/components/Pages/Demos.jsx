/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import BackgroundVideo from '../ReusableComponents/BackgroundVideo/BackgroundVideo';
import NavigationBar from '../ReusableComponents/NavigationBar/NavigationBar';
import Header from '../ReusableComponents/Header/Header';
import FooterHexagon from '../ReusableComponents/Footer/FooterHexagon';
import DemosMain from '../MainComponents/DemosMain';
// import AudioPlayer from '../ReusableComponents/AudioPlayer/AudioPlayer';
// import tracks from '../TrackLists/TrackListDemos';

function Demos() {
  const [selectedMode1, setMode1] = useState(1);
  console.log(selectedMode1);
  return (
    <div>
      <div id="content-wrap">
        <NavigationBar addDemoBtn profileBtn singOutBtn demoOptionBtn />
        <BackgroundVideo video="blueHexagon" />
        <Header />
        {/* <AudioPlayer tracks={tracks} selectedMode1={selectedMode1} /> */}
        <DemosMain setMode1={setMode1} />
        <FooterHexagon />
      </div>
    </div>
  );
}
export default Demos;
