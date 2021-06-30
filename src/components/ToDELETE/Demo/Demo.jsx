// /* eslint-disable react/prop-types */
// import React from 'react';
// import './Demo.css';
// import redHexagon from '../../../images/hexagon-red.jpeg';
// import greenHexagon from '../../../images/hexagon-green.jpeg';
// import goldHexagon from '../../../images/hexagon-gold.jpeg';
// import purpleHexagon from '../../../images/hexagon-purple.jpeg';
//
// const Demo = ({
//   artist, title, color, id, setSelectedMode,
// }) => {
//   // eslint-disable-next-line consistent-return
//   const chosenColor = () => {
//     switch (color) {
//       case 'green':
//         return greenHexagon;
//       case 'red':
//         return redHexagon;
//       case 'gold':
//         return goldHexagon;
//       case 'purple':
//         return purpleHexagon;
//       default:
//         return greenHexagon;
//     }
//   };
//   function handleClick(e) {
//     // e.preventDefault();
//     console.log('hier');
//     console.log(e.target.value);
//     const mode = e.target.value;
//     setSelectedMode(mode);
//   }
//   return (
//     <div className="demo-container">
//       <div
//         className="demo"
//         id="demo-one"
//         style={{
//           background: `url(${chosenColor()})`,
//           backgroundPosition: 'center',
//           backgroundRepeat: 'no-repeat',
//           backgroundSize: 'cover',
//           boxShadow: `-2px 2px 50px ${color}`,
//         }}
//       >
//         <div className="comment-icon"><i className="fas fa-comment-alt" /></div>
//         <div className="music-icon"><i className="fas fa-music" /></div>
//         <div className="options-icon"><i className="fas fa-ellipsis-h" /></div>
//       </div>
//
//       <div className="demo-info">
//         <div className="song-name">{title}</div>
//         <div className="song-artist">{artist}</div>
//         {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
//         <button
//           type="button"
//           value={id}
//           onClick={handleClick}
//           onKeyDown={handleClick}
//           className="play-btn"
//         >
//           play
//         </button>
//       </div>
//     </div>
//   );
// };
//
// export default Demo;
