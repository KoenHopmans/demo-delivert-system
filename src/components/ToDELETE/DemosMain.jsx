// /* eslint-disable react/prop-types */
// import React, { useState } from 'react';
// import './DemosMain.css';
// import Demo from '../ToDELETE/Demo/Demo';
// import Tracks from '../TrackLists/TrackListDemos';
//
// const DemosMain = ({ setMode1 }) => {
//   const [selectedMode, setSelectedMode] = useState(1);
//   console.log(selectedMode);
//   setMode1(selectedMode);
//   const items = [];
//   for (let i = 0; i < Tracks.length; i += 1) {
//     items.push(<Demo
//       setSelectedMode={setSelectedMode}
//       artist={Tracks[i].artist}
//       title={Tracks[i].title}
//       color={Tracks[i].color}
//       id={Tracks[i].id}
//     />);
//   }
//
//   return (
//     <div className="demosMainContentContainer">
//       <div className="demosMainContent">
//         <div className="demo-positioner">
//           {items}
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default DemosMain;
