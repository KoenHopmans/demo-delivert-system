import React, { useContext, useRef } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { userContext } from '../../contexts/UserProvider';

const NewDemo = ({

  item, authorisation,
}) => {
  const history = useHistory();
  const { setCurrentDemo, setTrackName } = useContext(userContext);
  // const { setCurrentBlob } = useContext(userContext);
  const audioRef = useRef(null);

  async function downloadFile(fileName) {
    setCurrentDemo(fileName);
    console.log('fileName!!! ');
    console.log(fileName);

    try {
      const result = await axios.get(`http://localhost:8080/api/v1/downloadFile/${fileName}`, {
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'audio/mp3',
        },
      });
      console.log(result);
      const blob = new Blob([result.data], {
        type: 'audio/mp3',
      });
      const objectURL = URL.createObjectURL(blob);
      const downloadLink = document.createElement('a');
      document.body.appendChild(downloadLink);
      console.log(`downloadLink ${downloadLink}`);
      console.log(`objectURL ${objectURL}`);
      downloadLink.href = objectURL;
      downloadLink.download = fileName;
      downloadLink.style.display = 'none';
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (e) {
      console.error(e);
    }
  }

  const demoOptions = () => {
    setCurrentDemo(item.demo);
    setTrackName(item.trackName);
    console.log('item.trackName', item.trackName);
    if (authorisation === 'admin') history.push(`/demo-options-admin/${item.demo}`, { from: 'App' });
    else { history.push(`/demo-options/${item.demo}`, { from: 'App' }); }
  };

  async function playFile(fileName) {
    setCurrentDemo(fileName);
    console.log('fileName!!! ');
    console.log(fileName);

    try {
      const result = await axios.get(`http://localhost:8080/api/v1/downloadFile/${fileName}`, {
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'audio/mp3',
        },
      });
      console.log(result);
      const blob = new Blob([result.data], {
        type: 'audio/mp3',
      });
      console.log('blob', blob);
      // setCurrentBlob(blob);
      const objectURL = URL.createObjectURL(blob);
      // const audio = new Audio(objectURL);
      if (audioRef.current && audioRef.current.pause());
      audioRef.current = new Audio(objectURL);
      audioRef.current.play();
    } catch (e) {
      console.error(e);
    }
  }

  console.log('test');
  return (
    <div className="music-file">
      {/* <div>{item.demo}</div> */}
      <div>{item.trackName}</div>
      <button
        onClick={demoOptions}
        type="button"
      >
        options
      </button>
      <button
        onClick={() => { downloadFile(item.demo); }}
        type="submit"
      >
        download
      </button>
      <button
        onClick={() => { playFile(item.demo); }}
        type="submit"
      >
        play
      </button>
    </div>
  );
};

export default NewDemo;
