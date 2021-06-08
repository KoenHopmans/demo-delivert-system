import React, { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import {
//   BiPencil, BiMessageEdit, BiTrash, BiMessage,
// } from 'react-icons/bi';
// import {
//   BsExclamationCircle,
// } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import { useParams } from 'react-router';
import axios from 'axios';
import LoadingAnimation from '../ReusableComponents/Animations/LoadingAnimation';

const DemoOptionsMainContent = () => {
  const params = useParams();
  console.log('wat is params', params);
  // const { register, handleSubmit, formState: { errors } } = useForm();

  const [deleted, setDeleted] = useState(false);

  const [demo, setDemo] = useState([]);

  async function fetchData() {
    try {
      const result = await axios.get(`http://localhost:8080/api/v1/demo/${params.demo}`);
      setDemo(result.data);
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

  // const formSubmit = (data) => {
  //   console.log(data);
  // };
  // console.log(errors);

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

  return (
    <div className="mainContentContainer">
      <div className="mainContent">
        <div className="content-box">
          {!deleted ? (
            <div>
              <h1>Options</h1>
              <div>{demo.username}</div>
              <div>{demo.artist}</div>
              <div>{demo.feedback}</div>
              <div>{demo.comment}</div>
              <h2>{params.demo}</h2>
              {/* <form onSubmit={handleSubmit(formSubmit)}> */}
              {/*  <div className="text-box"> */}
              {/*    <BiMessage /> */}
              {/*    <label htmlFor="feedback" className="inputLabel"> */}
              {/*      Feedback */}
              {/*      <input */}
              {/*        id="feedback" */}
              {/*        type="text" */}
              {/*        placeholder="Enter your track name" */}
              {/*        {...register('feedback', { */}
              {/*          required: 'Please enter your track name', */}
              {/*          minLength: { value: 4, message: 'At least 4 characters' }, */}

              {/*        })} */}
              {/*      /> */}
              {/*      {errors.feedback && ( */}
              {/*      <div className="error"> */}
              {/*        <BsExclamationCircle /> */}
              {/*        {errors.feedback.message} */}
              {/*      </div> */}
              {/*      )} */}
              {/*    </label> */}
              {/*  </div> */}
              {/*  <div className="text-box"> */}
              {/*    <BiPencil /> */}
              {/*    <label htmlFor="trackName" className="inputLabel"> */}
              {/*      Track name */}
              {/*      <input */}
              {/*        id="trackName" */}
              {/*        type="text" */}
              {/*        placeholder="Enter your track name" */}
              {/*        {...register('trackName', { */}
              {/*          required: 'Please enter your track name', */}
              {/*          minLength: { value: 4, message: 'At least 4 characters' }, */}

              {/*        })} */}
              {/*      /> */}
              {/*      {errors.trackName && ( */}
              {/*      <div className="error"> */}
              {/*        <BsExclamationCircle /> */}
              {/*        {errors.trackName.message} */}
              {/*      </div> */}
              {/*      )} */}
              {/*    </label> */}
              {/*  </div> */}
              {/*  <div className="text-box"> */}
              {/*    <BiPencil /> */}
              {/*    <label htmlFor="artist" className="inputLabel"> */}
              {/*      artist */}
              {/*      <input */}
              {/*        id="artist" */}
              {/*        type="text" */}
              {/*        placeholder="Enter your artist" */}
              {/*        {...register('artist', { */}
              {/*          required: 'Please enter your artist', */}
              {/*          minLength: { value: 4, message: 'At least 4 characters' }, */}

              {/*        })} */}
              {/*      /> */}
              {/*      {errors.artist && ( */}
              {/*      <div className="error"> */}
              {/*        <BsExclamationCircle /> */}
              {/*        {errors.artist.message} */}
              {/*      </div> */}
              {/*      )} */}
              {/*    </label> */}
              {/*  </div> */}
              {/*  <div className="text-box"> */}
              {/*    <BiMessageEdit /> */}
              {/*    <label htmlFor="comment" className="inputLabel"> */}
              {/*      Comment */}
              {/*      <input */}
              {/*        id="comment" */}
              {/*        type="text" */}
              {/*        placeholder="Enter your comment" */}
              {/*        {...register('comment', { */}
              {/*          required: 'Please enter your comment', */}
              {/*          minLength: { value: 4, message: 'At least 4 characters' }, */}

              {/*        })} */}
              {/*      /> */}
              {/*      {errors.comment && ( */}
              {/*      <div className="error"> */}
              {/*        <BsExclamationCircle /> */}
              {/*        {errors.comment.message} */}
              {/*      </div> */}
              {/*      )} */}
              {/*    </label> */}
              {/*  </div> */}
              {/*  <div className="text-box"> */}
              {/*    <BiTrash /> */}
              {/*    <label htmlFor="delete" className="inputLabel"> */}
              {/*      delete */}
              {/*      <input */}
              {/*        id="delete" */}
              {/*        type="text" */}
              {/*        placeholder="Enter your delete" */}
              {/*        {...register('delete')} */}
              {/*      /> */}
              {/*    </label> */}
              {/*  </div> */}
              {/*  <input className="btn" type="submit" name="" value="Sign in" /> */}
              {/* </form> */}
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

export default DemoOptionsMainContent;
