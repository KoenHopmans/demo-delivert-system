import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import axios from 'axios';
import { BiPencil, BiMessageEdit, BiMessage } from 'react-icons/bi';
import { BsExclamationCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import LoadingAnimation from '../ReusableComponents/Animations/LoadingAnimation';

const DemoOptionsAdminMain = () => {
  // Hooks
  const [deleted, setDeleted] = useState(false);
  const [demo, setDemo] = useState([]);
  const params = useParams();
  const {
    register, handleSubmit, reset, formState: { errors },
  } = useForm();

  // Functions
  async function fetchData() {
    try {
      const result = await axios.get(`http://localhost:8080/api/v1/demo/${params.demo}`);
      setDemo(result.data);
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
      console.log(result);
      const blob = new Blob([result.data], { type: 'audio/mp3' });
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
    } catch (e) { console.error(e); }
  }

  const formSubmit = (data) => { postData(data, params.demo); };

  async function deleteDemo(fileName) {
    setDeleted(true);

    try {
      const result = await axios.delete(`http://localhost:8080/api/v1/demo/${fileName}`);
      console.log(result);
    } catch (e) {
      console.error(e);
    }
  }

  // Effects
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="mainContentContainer">
      <div className="mainContent">
        <div className="content-box">
          {!deleted ? (
            <div>
              <h1>Admin Options</h1>
              <div>{demo.username}</div>
              <div>{demo.artist}</div>
              <div>{demo.feedback}</div>
              <div>{demo.comment}</div>
              <h2>{params.demo}</h2>

              <form onSubmit={handleSubmit(formSubmit)}>
                <div className="text-box">
                  <BiMessage />
                  <label htmlFor="feedback" className="inputLabel">
                    Feedback
                    <input
                      id="feedback"
                      type="text"
                      placeholder="Enter your track name"
                      {...register('feedback')}
                    />
                    {errors.feedback && (
                    <div className="error">
                      <BsExclamationCircle />
                      {errors.feedback.message}
                    </div>
                    )}
                  </label>
                </div>
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
                  <BiMessageEdit />
                  <label htmlFor="comment" className="inputLabel">
                    Comment
                    <input
                      id="comment"
                      type="text"
                      placeholder="Enter your comment"
                      {...register('comment')}
                    />
                    {errors.comment && (
                    <div className="error">
                      <BsExclamationCircle />
                      {errors.comment.message}
                    </div>
                    )}
                  </label>
                </div>
                <input className="btn" type="submit" name="" value="Save" />
              </form>
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
    </div>
  );
};

export default DemoOptionsAdminMain;
