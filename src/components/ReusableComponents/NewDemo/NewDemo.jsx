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
import { userContext } from '../../context/UserProvider';
import goldHexagon from '../../../images/hexagon-gold.jpeg';
import './NewDemo.css';

const NewDemo = ({
  item,
}) => {
  // hooks
  const params = useParams();
  const [url, setUrl] = useState(goldHexagon);
  const history = useHistory();
  const {
    setCurrentDemo, setTrackName, setArtist, adminUser,
    setPlayMusic, setClicked, clicked, demoOptionsBtn,
  } = useContext(userContext);

  // functions
  async function downloadFile(fileName) {
    setCurrentDemo(fileName);
    try {
      const result = await axios.get(`http://localhost:8080/api/v1/downloadFile/${fileName}`, {
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'audio/mp3',
        },
      });
      const blob = new Blob([result.data], {
        type: 'audio/mp3',
      });
      const objectURL = URL.createObjectURL(blob);
      const downloadLink = document.createElement('a');
      document.body.appendChild(downloadLink);
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
    setArtist(item.artist);
    if (adminUser) { history.push(`/admin/${params.role}/demo-options/${item.username}/${item.demo}`, { from: 'App' }); } else { history.push(`/demo-options/${item.username}/${item.demo}`, { from: 'App' }); }
  };

  async function playFile() {
    setCurrentDemo(item.demo);
    setTrackName(item.trackName);
    setArtist(item.artist);
    setPlayMusic(true);
    setClicked(!clicked);
  }

  async function fetchCover(fileName) {
    try {
      const result = await axios.get(`http://localhost:8080/api/v1/downloadFile/${fileName}`, {
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'image/jpg',
        },
      });
      const blob = new Blob([result.data], {
        type: 'image/jpg',
      });
      const objectURL = URL.createObjectURL(blob);
      setUrl(objectURL);
    } catch (e) {
      console.error(e);
    }
  }

  const newFeedback = (read, message) => {
    if (read === false) {
      return (
        <div className="demo-feedback-box">
          <button
            className="demo-feedback-btn"
            type="button"
          >
            <span className="MessageDetail"><BiMessageDetail /></span>
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

  const newComment = (read, message) => {
    if (read === false) {
      return (
        <div className="demo-comment-box">
          <button
            className="demo-comment-btn"
            type="button"
          >
            <span className="MessageDetail"><BiMessageDetail /></span>
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

  // effects
  useEffect(() => {
    fetchCover(item.cover);
  }, []);

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
      <div className="demo-trackName">{item.trackName}</div>
      <button type="button" onClick={demoOptions}>
        {item.feedbacks.map((feedbackItem, index) => (
          <div key={index}>{newFeedback(feedbackItem.read, feedbackItem.feedback)}</div>
        ))}
        {item.comments.map((commentItem, index) => (
          <div key={index}>{newComment(commentItem.read, commentItem.comment)}</div>
        ))}
      </button>
      <div className="demo-btn-box">
        {demoOptionsBtn ? (
          <button
            className="demo-btn"
            onClick={demoOptions}
            type="button"
          >
            <TiThMenu />
          </button>
        ) : (''
        )}
        <button
          className="demo-btn"
          onClick={() => { downloadFile(item.demo); }}
          type="submit"
        >
          <FaDownload />
        </button>
        <button
          className="demo-btn"
          onClick={() => { playFile(); }}
          type="submit"
        >
          <FaPlay />
        </button>
      </div>
    </div>
  );
};

export default NewDemo;
