import React from 'react';
import { useForm } from 'react-hook-form';
import {
  BiPencil, BiMessageEdit, BiTrash, BiMessage,
} from 'react-icons/bi';
import {
  BsExclamationCircle,
} from 'react-icons/bs';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DemoOptionsMainContent = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const formSubmit = (data) => {
    console.log(data);
  };
  console.log(errors);

  async function download() {
    try {
      console.log('download');
      const result = await axios.get('http://localhost:8080/api/v1/downloadFile/test3.mp3', {
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'audio/wav',
        },
      });
      console.log(result);
      const blob = new Blob([result.data], {
        type: 'audio/mp3',
      });
      const filename = 'test3.mp3';
      const objectURL = URL.createObjectURL(blob);
      const downloadLink = document.createElement('a');
      document.body.appendChild(downloadLink);
      downloadLink.href = objectURL;
      downloadLink.download = filename;
      downloadLink.style.display = 'none';
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="mainContentContainer">
      <div className="mainContent">
        <div className="content-box">
          <h1>Options</h1>
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="text-box">
              <BiMessage />
              <label htmlFor="feedback" className="inputLabel">
                Feedback
                <input
                  id="feedback"
                  type="text"
                  placeholder="Enter your track name"
                  {...register('feedback', {
                    required: 'Please enter your track name',
                    minLength: { value: 4, message: 'At least 4 characters' },

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
          <form id="file-downloader">
            <label htmlFor="file-url">
              URL
              <input type="text" id="file-url" name="file-url" required />
            </label>
            <button className="btn" onClick={download} type="submit">DOWNLOAD</button>
          </form>
          <div className="question">
            <Link to="/demos"> To all demo&#39;s </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoOptionsMainContent;
