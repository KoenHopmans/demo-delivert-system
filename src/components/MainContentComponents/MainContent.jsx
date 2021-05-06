import React from 'react';
import './DemosMain.css';
import Demo from '../ReusableComponents/Demo/Demo';
import Tracks from '../TrackLists/TrackListDemos';

const MainContent = () => {
  const items = [];
  for (let i = 0; i < Tracks.length; i += 1) {
    items.push(<Demo
      artist={Tracks[i].artist}
      title={Tracks[i].title}
      color={Tracks[i].color}
      id={Tracks[i].id}
    />);
  }
  return (
    <div className="demosMainContentContainer">
      <div className="demosMainContent">
        <div className="demo-positioner">
          {items}
        </div>
      </div>
    </div>
  );
};

export default MainContent;
