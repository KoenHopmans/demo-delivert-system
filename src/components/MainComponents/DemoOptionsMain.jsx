import React, {
  useContext, useEffect, useState,
} from 'react';
import axios from 'axios';
import '../ReusableComponents/NewDemo/NewDemo.css';
import { useForm } from 'react-hook-form';
import './DemoOptionsMain.css';
import {
  BiPencil, BiMessageEdit,
  BiMessageDetail,
  BiCheck, BiTrash,
} from 'react-icons/bi';
import { useHistory, useParams } from 'react-router';
import { ImFilePicture } from 'react-icons/im';
import { BsExclamationCircle, BsArrowCounterclockwise } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { userContext } from '../context/UserProvider';
import LoadingAnimation from '../ReusableComponents/Animations/LoadingAnimation';
import AddCommentModule from '../MainComponentsModules/Comments/AddCommentModule';
import AddFeedbackModule from '../MainComponentsModules/Feedback/AddFeedbackModule';
import goldHexagon from '../../images/hexagon-gold.jpeg';

const DemoOptionsMainContent = () => {
  // Hooks
  const history = useHistory();
  const params = useParams();
  const [url, setUrl] = useState(goldHexagon);
  const [demo, setDemo] = useState([]);
  const [comments, setComments] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addComment, setAddComment] = useState(false);
  const [addFeedback, setAddFeedback] = useState(false);
  const {
    register, handleSubmit, reset, formState: { errors },
  } = useForm(
  );
  const {
    currentDemo, currentUser, update, toggleUpdate, clicked,
    setClicked, setCurrentDemo, setCurrentUser, adminUser, setAdminUser,
  } = useContext(userContext);
  const formData = new FormData();

  // Functions

  const playPauseMusic = () => {
    setClicked(!clicked);
  };

  const displayDate = (date) => {
    const dateParts = date.split(',');
    return dateParts[0];
  };

  const linkToMessenger = (messenger) => {
    if (adminUser) { history.push(`/admin/${params.role}/profile-admin/${messenger}`, { from: 'App' }); } else { history.push(`/profile-admin/${messenger}`, { from: 'App' }); }
  };

  async function fetchData() {
    try {
      const result = await axios.get(`http://localhost:8080/api/v1/demo/${params.demo}`);
      setDemo(result.data);
      setComments(result.data.comments);
      setFeedbacks(result.data.feedbacks);
      reset(result.data);
    } catch (e) {
      console.error(e);
    }
  }

  async function downloadFile(fileName) {
    setLoading(true);
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
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  }

  async function postData(payload, fileName) {
    setLoading(true);
    try {
      // await axios.put(`http://localhost:8080/api/v1/demo-update/${fileName}`, payload);
      await axios.put(`http://localhost:8080/api/v1/demo/${fileName}`, payload);
      toggleUpdate(!update);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  }

  const formSubmit = (data) => {
    if (data.file[0]) {
      formData.append('file', data.file[0]);
    }
    formData.append('trackName', data.trackName);
    formData.append('artist', data.artist);
    postData(formData, params.demo);
  };
  console.log(errors);

  async function deleteDemo(fileName) {
    setLoading(true);
    history.goBack();
    try {
      await axios.delete(`http://localhost:8080/api/v1/demo/${fileName}`);
      toggleUpdate(!update);
    } catch (e) {
      console.error(e);
    }
  }

  async function deleteFeedback(fileName, currentFeedback) {
    try {
      await axios.delete(`http://localhost:8080/api/v1/${fileName}/feedback`, {
        data: {
          feedback: currentFeedback,
        },
      });
      toggleUpdate(!update);
    } catch (e) {
      console.error(e);
    }
  }

  async function updateFeedback(fileName, currentFeedback) {
    try {
      await axios.put(`http://localhost:8080/api/v1/${fileName}/feedback`, {
        feedback: currentFeedback,
      });
      toggleUpdate(!update);
    } catch (e) {
      console.error(e);
    }
  }

  async function updateComment(fileName, currentComment) {
    try {
      await axios.put(`http://localhost:8080/api/v1/${fileName}/comment`, {
        comment: currentComment,
      });
      toggleUpdate(!update);
    } catch (e) {
      console.error(e);
    }
  }

  async function deleteComment(fileName, currentComment) {
    try {
      await axios.delete(`http://localhost:8080/api/v1/${fileName}/comment`, {
        data: {
          comment: currentComment,
        },
      });
      toggleUpdate(!update);
    } catch (e) {
      console.error(e);
    }
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

  const newFeedback = (feedbackItem) => {
    if (feedbackItem.read === false) {
      return (
        <div className="feedback-box">
          <button
            className="feedback-btn"
            type="button"
          >
            <span className="MessageDetail"><BiMessageDetail /></span>
            NEW Feedback
          </button>
          <div className="feedback-date">
            {displayDate(feedbackItem.date)}
          </div>
          <button className="messenger" onClick={() => linkToMessenger(feedbackItem.messenger)} type="button">{feedbackItem.messenger}</button>
          <button
            onClick={() => {
              deleteFeedback(currentDemo, feedbackItem.feedback);
            }}
            type="button"
            className="feedback-delete-btn"
          >
            <BiTrash />
          </button>
          <button
            onClick={() => {
              updateFeedback(currentDemo, feedbackItem.feedback);
            }}
            type="button"
            className="feedback-read-btn"
          >
            <BiCheck />
          </button>
          <button
            type="button"
            className="feedback-message"
          >
            {feedbackItem.feedback}
          </button>
        </div>
      );
    }
  };

  const oldFeedback = (feedbackItem) => {
    if (feedbackItem.read === true) {
      return (
        <div className="feedback-box">
          <button
            className="read-feedback-btn"
            type="button"
          >
            <span className="MessageDetail"><BiMessageDetail /></span>
            Feedback
          </button>
          <div className="feedback-date">
            {displayDate(feedbackItem.date)}
          </div>
          <button className="messenger" onClick={() => linkToMessenger(feedbackItem.messenger)} type="button">{feedbackItem.messenger}</button>
          <button
            onClick={() => { deleteFeedback(currentDemo, feedbackItem.feedback); }}
            type="button"
            className="feedback-delete-btn"
          >
            <BiTrash />
          </button>
          <button
            type="button"
            className="feedback-message"
          >
            {feedbackItem.feedback}
          </button>
        </div>
      );
    }
  };

  const newComment = (commentItem) => {
    if (commentItem.read === false) {
      return (
        <div className="comment-box">
          <button
            className="comment-btn"
            type="button"
          >
            <span className="MessageDetail"><BiMessageDetail /></span>
            NEW Comment
          </button>
          <div className="feedback-date">
            {displayDate(commentItem.date)}
          </div>
          <button className="messenger" onClick={() => linkToMessenger(commentItem.messenger)} type="button">{commentItem.messenger}</button>
          <button
            onClick={() => {
              deleteComment(currentDemo, commentItem.comment);
            }}
            type="button"
            className="feedback-delete-btn"
          >
            <BiTrash />
          </button>
          <button
            onClick={() => {
              updateComment(currentDemo, commentItem.comment);
            }}
            type="button"
            className="feedback-read-btn"
          >
            <BiCheck />
          </button>
          <button
            type="button"
            className="comment-message"
          >
            {commentItem.comment}
          </button>
        </div>
      );
    }
  };

  const oldComment = (commentItem) => {
    if (commentItem.read === true) {
      return (
        <div className="comment-box">
          <button
            className="read-comment-btn"
            type="button"
          >
            <span className="MessageDetail"><BiMessageDetail /></span>
            Comment
          </button>
          <div className="feedback-date">
            {displayDate(commentItem.date)}
          </div>
          <button onClick={() => linkToMessenger(commentItem.messenger)} type="button" className="messenger">
            {commentItem.messenger}
          </button>
          <button
            onClick={() => { deleteComment(currentDemo, commentItem.comment); }}
            type="button"
            className="comment-delete-btn"
          >
            <BiTrash />
          </button>
          <button
            type="button"
            className="comment-message"
          >
            {commentItem.comment}
          </button>
        </div>
      );
    }
  };

  // Effects
  useEffect(() => {
    setCurrentDemo(params.demo);
    setCurrentUser(params.user);
    setAdminUser(params.role);
    setClicked(!clicked);
  }, []);

  useEffect(() => {
    fetchData();
  }, [update]);

  useEffect(() => {
    fetchCover(demo.cover);
  }, [demo, update]);

  return (
    <div className="mainContentContainer">
      <div className="mainContent">
        {!loading ? (
          <div className="content-box">
            <h1>Options</h1>
            <button type="button" onClick={() => { playPauseMusic(); }}>
              <div className="options-demo-img-box">
                <div className="demo-trackName-title">
                  <div>{demo.trackName}</div>
                  <div className="ArrowCounterclockwise">
                    <BsArrowCounterclockwise />
                  </div>
                  <div>{demo.artist}</div>
                </div>
                <img
                  className="options-demo-img"
                  src={url}
                  alt="profile"
                />
              </div>
            </button>
            <div className="messages-positioner">
              <div className="messages-container">
                {feedbacks.map((feedbackItem) => (
                  <div>
                    {newFeedback(feedbackItem)}
                  </div>
                ))}
                {feedbacks
                  .map((feedbackItem) => (
                    <div>
                      {oldFeedback(feedbackItem)}
                    </div>
                  ))}
                {comments
                  .map((commentItem) => (
                    <div>
                      {newComment(commentItem)}
                    </div>
                  ))}
                {comments
                  .map((commentItem) => (
                    <div>
                      {oldComment(commentItem)}
                    </div>
                  ))}
              </div>
            </div>
            <form onSubmit={handleSubmit(formSubmit)}>
              <div className="text-box">
                <BiPencil />
                <label htmlFor="trackName" className="inputLabel">
                  Track name
                  <input
                    id="trackName"
                    type="text"
                    placeholder="Enter your track name"
                    {...register('trackName')}
                  />
                  {errors.trackName && (
                  <div className="error">
                    <BsExclamationCircle />
                    {errors.trackName.message}
                  </div>
                  )}
                </label>
              </div>
              <div className="text-box">
                <BiPencil />
                <label htmlFor="artist" className="inputLabel">
                  Artist Name
                  <input
                    id="artist"
                    type="text"
                    placeholder="Enter your artist"
                    {...register('artist')}
                  />
                  {errors.artist && (
                  <div className="error">
                    <BsExclamationCircle />
                    {errors.artist.message}
                  </div>
                  )}
                </label>
              </div>
              <div className="text-box">
                {/* <ImFileMusic /> */}
                <ImFilePicture />
                <label htmlFor="file" className="inputLabel">
                  Cover
                  <input
                    id="file"
                    type="file"
                          // ref={inputFileRef}
                    {...register('file')}
                  />
                  {errors.File && (
                  <div className="error">
                    <BsExclamationCircle />
                    {errors.File.message}
                  </div>
                  )}
                </label>
              </div>
              <input className="btn" type="submit" name="" value="Save" />
            </form>
            <div className="text-box">
              <BiMessageEdit />
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="add-comment" className="inputLabel">
                Add Comment
              </label>
              <button type="button" className="input-btn" id="add-comment" onClick={() => setAddComment(!addComment)}>
                +
              </button>
            </div>
            {addComment ? (
              <AddCommentModule />
            ) : ''}
            {params.role ? (
              <div className="text-box">
                <BiMessageEdit />
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor="add-feedback" className="inputLabel">
                  Add Feedback
                </label>
                <button type="button" className="input-btn" id="add-feedback" onClick={() => setAddFeedback(!addFeedback)}>
                  +
                </button>
              </div>
            ) : ''}
            {addFeedback ? (
              <AddFeedbackModule toggleUpdate update />
            ) : ''}
            <div>Do you want to download this demo?</div>
            <button
              className="btn"
              onClick={() => { downloadFile(params.demo); }}
              type="submit"
            >
              download
            </button>
            <div>Do you want to delete this demo?</div>
            <button
              className="btn"
              onClick={() => { deleteDemo(params.demo); }}
              type="submit"
            >
              delete
            </button>
            <div className="question">
              {adminUser
                ? (
                  <Link to={{ pathname: `/admin/${adminUser}/my-demos/${currentUser}` }}> To all demo&#39;s </Link>
                )
                : (
                  <Link to={{ pathname: `/my-demos/${currentUser}` }}> To all demo&#39;s </Link>
                )}
            </div>
            <div className="question" />
          </div>
        ) : (
          <div>
            <div className="question">Loading... Please wait </div>
            <LoadingAnimation />
          </div>
        )}
      </div>
    </div>
  );
};

export default DemoOptionsMainContent;
