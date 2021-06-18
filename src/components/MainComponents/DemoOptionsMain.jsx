import React, {
  useContext, useEffect, useState,
} from 'react';
import { useForm } from 'react-hook-form';
import {
  // BiMessageEdit,
  BiPencil, BiMessage, BiMessageEdit,
} from 'react-icons/bi';
import {
  BsExclamationCircle,
} from 'react-icons/bs';
import { Link } from 'react-router-dom';

import { useParams } from 'react-router';
import axios from 'axios';
import LoadingAnimation from '../ReusableComponents/Animations/LoadingAnimation';
import { userContext } from '../contexts/UserProvider';

import AddCommentModule from '../MainComponentsModules/AddCommentModule';

const DemoOptionsMainContent = () => {
  const { currentDemo, currentUser } = useContext(userContext);
  // const { CurrentBlob } = useContext(userContext);
  const [comments, setComments] = useState([]);
  // const audioRef = useRef(null);

  const params = useParams();
  console.log('wat is params', params);
  const {

    register, handleSubmit, reset, formState: { errors },
  } = useForm(
  );

  const [deleted, setDeleted] = useState(false);
  const [addComment, setAddComment] = useState(false);
  const [demo, setDemo] = useState([]);

  async function fetchData() {
    try {
      const result = await axios.get(`http://localhost:8080/api/v1/demo/${params.demo}`);
      setDemo(result.data);
      setComments(result.data.comments);
      console.log('RESULT', result.data);
      reset(result.data);
      console.log(`This is the get header ${result.request.header}`);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function downloadFile(fileName) {
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

  async function postData(payload, fileName) {
    console.log('hallo post data ');
    try {
      await axios.put(`http://localhost:8080/api/v1/demo-update/${fileName}`, payload);
    } catch (e) {
      console.error(e);
    }
  }

  const formSubmit = (data) => {
    console.log(data);
    postData(data, params.demo);
  };
  console.log(errors);

  async function deleteDemo(fileName) {
    console.log('fileName!!! ');
    console.log(fileName);
    setDeleted(true);

    try {
      const result = await axios.delete(`http://localhost:8080/api/v1/demo/${fileName}`);
      console.log(result);
    } catch (e) {
      console.error(e);
    }
  }
  // const musicPlay = () => {
  //   audioRef.current = new Audio(CurrentBlob);
  //   console.log('CurrentBlob', CurrentBlob);
  //   audioRef.current.play();
  // };

  return (
    <div className="mainContentContainer">
      <div className="mainContent">
        <div className="content-box">
          <h2 style={{ border: '2px green solid' }}>
            {currentUser}
          </h2>
          <h2 style={{ border: '2px red solid' }}>{currentDemo}</h2>
          {!deleted ? (
            <div>
              <h1>Options</h1>
              <div>{demo.username}</div>
              <div>{demo.artist}</div>
              <div>
                <BiMessage />
                {demo.feedback}
              </div>
              {comments.map((comment) => (<div>{comment.comment}</div>))}
              {/* <div>{demo.comment}</div> */}
              {/* <div>{demo.comments}</div> */}
              {/* <h2>{params.demo}</h2> */}
              {/* { */}
              {/*  comments.map((comment) => ( */}
              {/*    <div> */}
              {/*      <div>{comment}</div> */}
              {/*    </div> */}
              {/*  )) */}
              {/* } */}

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
                {/* <div className="text-box"> */}
                {/*  <BiMessageEdit /> */}
                {/*  <label htmlFor="comment" className="inputLabel"> */}
                {/*    Comment */}
                {/*    <input */}
                {/*      id="comment" */}
                {/*      type="text" */}
                {/*      placeholder="Enter your comment" */}
                {/*      {...register('comment')} */}
                {/*    /> */}
                {/*    {errors.comment && ( */}
                {/*    <div className="error"> */}
                {/*      <BsExclamationCircle /> */}
                {/*      {errors.comment.message} */}
                {/*    </div> */}
                {/*    )} */}
                {/*  </label> */}
                {/* </div> */}
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
              {/* <button */}
              {/*  className="btn" */}
              {/*  onClick={() => { musicPlay(); }} */}
              {/*  type="button" */}
              {/* > */}
              {/*  play */}
              {/* </button> */}

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

export default DemoOptionsMainContent;
