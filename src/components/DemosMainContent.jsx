import React from 'react';
import './DemosMainContent.css';
import Demo from './Demo';
import Tracks from './tracks';

const DemosMainContent = () => {
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

export default DemosMainContent;
