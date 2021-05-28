import React from 'react';
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

const AddDemoMainContent = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const formSubmit = (data) => {
    console.log(data);
  };
  console.log(errors);
  return (
    <div className="mainContentContainer">
      <div className="mainContent">
        <div className="content-box">
          <h1>Add demo</h1>
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="text-box">
              <ImFileMusic />
              <label htmlFor="File" className="inputLabel">
                File
                <input
                  id="File"
                  type="file"
                  placeholder="Enter your track name"
                  {...register('File', {
                    required: 'Please enter your track name',
                    minLength: { value: 4, message: 'At least 4 characters' },

                  })}
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
                artist
                <input
                  id="artist"
                  type="text"
                  placeholder="Enter your artist"
                  {...register('artist', {
                    required: 'Please enter your artist',
                    minLength: { value: 4, message: 'At least 4 characters' },

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
                    required: 'Please enter your comment',
                    minLength: { value: 4, message: 'At least 4 characters' },

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
            <input className="btn" type="submit" name="" value="Sign in" />
          </form>
          <div className="question">
            <Link to="/demos"> To all demo&#39;s </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDemoMainContent;
