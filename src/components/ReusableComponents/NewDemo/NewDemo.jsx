import React, {
  useContext, useEffect,
  useState,
} from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { FaDownload, FaPlay } from 'react-icons/fa';
import { TiThMenu } from 'react-icons/ti';
import { BiMessageDetail } from 'react-icons/bi';
import { useHistory } from 'react-router-dom';

import { userContext } from '../../contexts/UserProvider';
import redHexagon from '../../../images/hexagon-red.jpeg';
import './NewDemo.css';

const NewDemo = ({
  item,
}) => {
  const [url, setUrl] = useState(redHexagon);
  const history = useHistory();
  const {
    setCurrentDemo, setTrackName, adminUser, setPlayMusic, setClicked, clicked,
  } = useContext(userContext);
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

  const params = useParams();

  const demoOptions = () => {
    setCurrentDemo(item.demo);
    setTrackName(item.trackName);
    console.log('item !!!!!!$$$$$$$$$$$$$$', item.username);
    console.log('item.trackName', item.trackName);
    if (adminUser) { history.push(`/admin/${params.role}/demo-options/${item.username}/${item.demo}`, { from: 'App' }); } else { history.push(`/demo-options/${item.username}/${item.demo}`, { from: 'App' }); }
  };

  async function playFile(fileName) {
    setCurrentDemo(item.demo);
    setTrackName(item.trackName);
    setPlayMusic(true);
    setClicked(!clicked);
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

  // eslint-disable-next-line consistent-return
  const newFeedback = (read, message) => {
    if (read === false) {
      return (
        <div className="demo-feedback-box">
          <button
            className="demo-feedback-btn"
            type="button"
          >
            <BiMessageDetail />
            NEW Feedback
          </button>
          <button
            type="button"
            className="demo-feedback-message"
          >
            {message}
          </button>
        </div>
      );
    }
  };

  // eslint-disable-next-line consistent-return
  const newComment = (read, message) => {
    if (read === false) {
      return (
        <div className="demo-comment-box">
          <button
            className="demo-comment-btn"
            type="button"
          >
            <BiMessageDetail />
            NEW Comment
          </button>
          <button
            type="button"
            className="demo-comment-message"
          >
            {message}
          </button>
        </div>
      );
    }
  };

  useEffect(() => {
    fetchCover(item.cover);
  }, []);

  console.log('test');
  return (
    <div
      className="music-file"
    >
      <div className="demo-img-box">
        <img
          className="demo-img"
          src={url}
          alt="profile"
        />
      </div>
      {/* <div>{item.demo}</div> */}
      <div className="demo-trackName">{item.trackName}</div>
      <button type="button" onClick={demoOptions}>
        {item.feedbacks.map((feedbackItem) => (
          <div>{newFeedback(feedbackItem.read, feedbackItem.feedback)}</div>
        ))}
        {item.comments.map((commentItem) => (
          <div>{newComment(commentItem.read, commentItem.comment)}</div>
        ))}
      </button>
      <div className="demo-btn-box">
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
    </div>

  );
};

export default NewDemo;
