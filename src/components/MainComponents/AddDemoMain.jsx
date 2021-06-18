import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  BiPencil, BiMessageEdit,
} from 'react-icons/bi';
import {
  BsExclamationCircle,
} from 'react-icons/bs';
import {
  ImFileMusic,
} from 'react-icons/im';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LoadingAnimation from '../ReusableComponents/Animations/LoadingAnimation';

import { userContext } from '../contexts/UserProvider';

const AddDemoMainContent = () => {
  const { currentUser } = useContext(userContext);
  const [succes, setSucces] = useState(false);
  const formData = new FormData();

  async function postData(payload) {
    console.log('hallo post data ');
    try {
      await axios.post('http://localhost:8080/api/v1/demo-upload', payload);
      console.log(`payload${payload}`);
    } catch (e) {
      console.error(e);
    }
  }
  const { register, handleSubmit, formState: { errors } } = useForm();
  const formSubmit = (data) => {
    formData.append('file', data.file[0]);
    formData.append('artist', data.artist);
    formData.append('username', currentUser);
    formData.append('comment', data.comment);
    formData.append('feedback', data.feedback);
    formData.append('trackName', data.trackName);
    console.log('This is the formData');
    console.log(formData);
    postData(formData);
    setSucces(true);
  };
  console.log(errors);
  return (
    <div className="mainContentContainer">
      <div className="mainContent">
        <div className="content-box">
          {!succes ? (
            <div>
              <h2 style={{ border: '2px green solid' }}>
                {currentUser}
              </h2>
              <h1>Add demo</h1>
              <form onSubmit={handleSubmit(formSubmit)}>
                <div className="text-box">
                  <ImFileMusic />
                  <label htmlFor="file" className="inputLabel">
                    File
                    <input
                      id="file"
                      // name="file"
                      type="file"
                      {...register('file', { required: 'Please add your track' })}
                    />
                    {errors.file && (
                    <div className="error">
                      <BsExclamationCircle />
                      {errors.file.message}
                    </div>
                    )}
                  </label>
                </div>
                {/* <div className="text-box"> */}
                {/*  <BiPencil /> */}
                {/*  <label htmlFor="username" className="inputLabel"> */}
                {/*    User Name */}
                {/*    <input */}
                {/*      id="username" */}
                {/*      type="text" */}
                {/*      placeholder="Enter your username" */}
                {/*      {...register('username', { */}
                {/*        required: 'Please enter your User Name', */}
                {/*        // minLength: { value: 4, message: 'At least 4 characters' }, */}

                {/*      })} */}
                {/*    /> */}
                {/*    {errors.username && ( */}
                {/*      <div className="error"> */}
                {/*        <BsExclamationCircle /> */}
                {/*        {errors.username.message} */}
                {/*      </div> */}
                {/*    )} */}
                {/*  </label> */}
                {/* </div> */}
                <div className="text-box">
                  <BiPencil />
                  <label htmlFor="trackName" className="inputLabel">
                    Track Name
                    <input
                      id="trackName"
                      type="text"
                      placeholder="Enter your track name"
                      {...register('trackName', {
                        required: 'Please enter your track name',
                        minLength: { value: 4, message: 'At least 4 characters' },

                      })}
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
                      {...register('artist', {
                        // required: 'Please enter your artist',
                        // minLength: { value: 4, message: 'At least 4 characters' },

                      })}
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
                      {...register('comment', {
                        // required: 'Please enter your comment',
                        // minLength: { value: 4, message: 'At least 4 characters' },

                      })}
                    />
                    {errors.comment && (
                      <div className="error">
                        <BsExclamationCircle />
                        {errors.comment.message}
                      </div>
                    )}
                  </label>
                </div>
                <div className="text-box">
                  <BiMessageEdit />
                  <label htmlFor="feedback" className="inputLabel">
                    Feedback
                    <input
                      id="feedback"
                      type="text"
                      placeholder="Enter your feedback"
                      {...register('feedback', {
                        // required: 'Please enter your feedback',
                        // minLength: { value: 4, message: 'At least 4 characters' },

                      })}
                    />
                    {errors.feedback && (
                    <div className="error">
                      <BsExclamationCircle />
                      {errors.feedback.message}
                    </div>
                    )}
                  </label>
                </div>
                <input className="btn" type="submit" name="" value="Add" />
              </form>
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

export default AddDemoMainContent;
