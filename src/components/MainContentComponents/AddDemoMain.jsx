import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  BiPencil, BiMessageEdit, BiTrash,
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

const AddDemoMainContent = () => {
  const [succes, setSucces] = useState(false);
  const formData = new FormData();

  async function postData(payload) {
    console.log('hallo post data ');
    try {
      await axios.post('http://localhost:8080/api/v1/file-upload', payload);
      console.log(`payload${payload}`);
    } catch (e) {
      console.error(e);
    }
  }
  const { register, handleSubmit, formState: { errors } } = useForm();
  const formSubmit = (data) => {
    console.log('this is the old data');
    console.log(data);
    const newData = data;
    console.log('this is the newData before');
    console.log({ newData });
    // const music = data.file[0];
    // console.log(`this is the music${music}`);
    // console.log({ music });
    // // eslint-disable-next-line prefer-destructuring
    // newData.file = music;
    // console.log(`this is the newData${newData}`);
    // console.log({ newData });
    formData.append('file', data.file[0]);
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
                      placeholder="Enter your track name"
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
                <div className="text-box">
                  <BiPencil />
                  <label htmlFor="trackName" className="inputLabel">
                    Track name
                    <input
                      id="trackName"
                      type="text"
                      placeholder="Enter your track name"
                      {...register('trackName', {
                        // required: 'Please enter your track name',
                        // minLength: { value: 4, message: 'At least 4 characters' },

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
                    artist
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
                  <BiTrash />
                  <label htmlFor="delete" className="inputLabel">
                    delete
                    <input
                      id="delete"
                      type="text"
                      placeholder="Enter your delete"
                      {...register('delete')}
                    />
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
