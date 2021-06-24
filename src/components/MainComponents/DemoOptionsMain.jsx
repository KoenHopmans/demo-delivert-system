import React, {
  useContext, useEffect, useState,
} from 'react';
import axios from 'axios';
import '../ReusableComponents/NewDemo/NewDemo.css';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { BiPencil, BiMessageEdit } from 'react-icons/bi';
import { ImFilePicture } from 'react-icons/im';
import { BsExclamationCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { userContext } from '../contexts/UserProvider';
import LoadingAnimation from '../ReusableComponents/Animations/LoadingAnimation';
import AddCommentModule from '../MainComponentsModules/AddCommentModule';
import AddFeedbackModule from '../MainComponentsModules/AddFeedbackModule';
import redHexagon from '../../images/hexagon-red.jpeg';

const DemoOptionsMainContent = () => {
  // Hooks
  const { currentDemo, currentUser } = useContext(userContext);
  const [url, setUrl] = useState(redHexagon);
  const [comments, setComments] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const [addComment, setAddComment] = useState(false);
  const [addFeedback, setAddFeedback] = useState(false);
  const [demo, setDemo] = useState([]);
  const formData = new FormData();
  const params = useParams();
  const {
    register, handleSubmit, reset, formState: { errors },
  } = useForm(
  );

  // Functions
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

  async function postData(payload, fileName) {
    try {
      await axios.put(`http://localhost:8080/api/v1/demo-update/${fileName}`, payload);
    } catch (e) {
      console.error(e);
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
    setDeleted(true);
    try {
      await axios.delete(`http://localhost:8080/api/v1/demo/${fileName}`);
    } catch (e) {
      console.error(e);
    }
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

  // Effects
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchCover(demo.cover);
  }, [demo]);

  return (
    <div className="mainContentContainer">
      <div className="mainContent">
        <h2 style={{ border: '2px green solid' }}>
          {currentUser}
        </h2>
        <h2 style={{ border: '2px red solid' }}>{currentDemo}</h2>
        {!deleted ? (
          <div className="content-box">
            <h1>Options</h1>
            <button type="button">
              <div className="options-demo-img-box">
                <img
                  className="options-demo-img"
                  src={url}
                  alt="profile"
                />
              </div>
            </button>
            <div>{demo.username}</div>
            <div>{demo.artist}</div>
            {comments.map((comment) => (<div>{comment.comment}</div>))}
            {feedbacks.map((feedbackItem) => (
              <div>
                <div>{feedbackItem.feedback}</div>
                <div>{!(feedbackItem.read) ? <div>NEW Feedback</div> : ''}</div>
                <button style={{ color: 'white', border: '1px blue solid' }} type="button">read V</button>
              </div>
            ))}
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
              <div className="feedback-box">
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
                {addFeedback ? (
                  <AddFeedbackModule />
                ) : ''}
              </div>
            ) : ''}
            <button
              className="btn"
              onClick={() => { downloadFile(params.demo); }}
              type="submit"
            >
              download
            </button>
            <button
              className="btn"
              onClick={() => { deleteDemo(params.demo); }}
              type="submit"
            >
              delete
            </button>
            <div className="question">
              <Link to="/demos"> To all demo&#39;s </Link>
            </div>
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
