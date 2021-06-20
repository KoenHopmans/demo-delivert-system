import React, {
  useContext, useEffect,
  useState,
} from 'react';
import axios from 'axios';
import { FaDownload, FaPlay } from 'react-icons/fa';
import { TiThMenu } from 'react-icons/ti';
import { useHistory } from 'react-router-dom';
import { userContext } from '../../contexts/UserProvider';
import redHexagon from '../../../images/hexagon-red.jpeg';
import './NewDemo.css';

const NewDemo = ({
  item, authorisation = 'user',
}) => {
  const [url, setUrl] = useState(redHexagon);
  const history = useHistory();
  const { setCurrentDemo, setTrackName, setPlayMusic } = useContext(userContext);
  // const { setCurrentBlob } = useContext(userContext);
  // const audioRef = useRef(null);

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
    setCurrentDemo(item.demo);
    setTrackName(item.trackName);
    setPlayMusic(true);
    console.log('fileName!!! ');
    console.log(fileName);

    // try {
    //   const result = await axios.get(`http://localhost:8080/api/v1/downloadFile/${fileName}`, {
    //     responseType: 'arraybuffer',
    //     headers: {
    //       'Content-Type': 'audio/mp3',
    //     },
    //   });
    //   console.log(result);
    //   const blob = new Blob([result.data], {
    //     type: 'audio/mp3',
    //   });
    //   console.log('blob', blob);
    //   // setCurrentBlob(blob);
    //   const objectURL = URL.createObjectURL(blob);
    //   // const audio = new Audio(objectURL);
    //   if (audioRef.current && audioRef.current.pause());
    //   audioRef.current = new Audio(objectURL);
    //   audioRef.current.play();
    // } catch (e) {
    //   console.error(e);
    // }
  }

  async function fetchCover(fileName) {
    // console.log('fileName!!! ');
    // console.log(fileName);

    try {
      const result = await axios.get(`http://localhost:8080/api/v1/downloadFile/${fileName}`, {
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'image/jpg',
        },
      });
      console.log('RESULT', result);
      const blob = new Blob([result.data], {
        type: 'image/jpg',
      });
      const objectURL = URL.createObjectURL(blob);
      setUrl(objectURL);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchCover(item.cover);
  }, []);

  console.log('test');
  return (
    <div
      className="music-file"
      // style={{
      //   background: `url(${url})`,
      //   backgroundPosition: 'center',
      //   backgroundRepeat: 'no-repeat',
      //   backgroundSize: 'cover',
      //   // boxShadow: `-2px 2px 50px ${color}`,
      // }}
    >
      <div style={{
        position: 'fixed',
        zIndex: '-1',
      }}
      >
        <img
          style={{
            objectFit: 'cover',
            height: '200px',
            width: '200px',

            // minWidth: '200px',
            // minHeight: '200px',
            // maxWidth: '200px',
            // maxHeight: '200px',
          }}
          src={url}
          alt="profile"
        />
      </div>
      {/* <div>{item.demo}</div> */}
      <div className="demo-trackName">{item.trackName}</div>
      <button
        className="demo-btn"
        onClick={demoOptions}
        type="button"
      >
        <TiThMenu />
      </button>
      <button
        className="demo-btn"
        onClick={() => { downloadFile(item.demo); }}
        type="submit"
      >
        <FaDownload />
      </button>
      <button
        className="demo-btn"
        onClick={() => { playFile(item.demo); }}
        type="submit"
      >
        <FaPlay />
      </button>
    </div>

  );
};

export default NewDemo;
