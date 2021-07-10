import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router';
import { BiPencil, BiMessageEdit } from 'react-icons/bi';
import { BsExclamationCircle } from 'react-icons/bs';
import { ImFileMusic, ImFilePicture } from 'react-icons/im';
import { Link } from 'react-router-dom';
import { userContext } from '../context/UserProvider';
import LoadingAnimation from '../ReusableComponents/Animations/LoadingAnimation';

const AddDemoMainContent = () => {
  // Hooks
  const history = useHistory();
  const params = useParams();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const {
    currentUser, setCurrentUser, adminUser, setAdminUser,
  } = useContext(userContext);
  const formData = new FormData();

  // Functions
  async function postData(payload) {
    try {
      await axios.post('http://localhost:8080/api/v1/demo', payload);
      if (adminUser) { history.push(`/admin/${adminUser}/my-demos/${currentUser}`); } else { history.push(`/my-demos/${currentUser}`); }
    } catch (e) {
      console.error(e);
    }
  }

  const formSubmit = (data) => {
    data.date = new Date().toLocaleString();
    formData.append('musicFile', data.musicFile[0]);
    formData.append('cover', data.cover[0]);
    formData.append('artist', data.artist);
    formData.append('username', currentUser);
    formData.append('date', data.date);
    if (data.comment) { formData.append('comment', data.comment); }
    formData.append('feedback', data.feedback);
    formData.append('trackName', data.trackName);
    postData(formData);
    setLoading(true);
  };

  // effects
  useEffect(() => {
    setCurrentUser(params.user);
    setAdminUser(params.role);
  }, []);

  return (
    <div className="mainContentContainer">
      <div className="mainContent">
        <div className="content-box">
          {!loading ? (
            <>
              <h1>
                Add demo
              </h1>
              <form onSubmit={handleSubmit(formSubmit)}>
                <div className="text-box">
                  <ImFileMusic />
                  <label htmlFor="musicFile" className="inputLabel">
                    Music
                    <input
                      id="musicFile"
                      type="file"
                      {...register('musicFile', { required: 'Please add your track' })}
                    />
                    {errors.musicFile && (
                    <div className="error">
                      <BsExclamationCircle />
                      {errors.musicFile.message}
                    </div>
                    )}
                  </label>
                </div>
                <div className="text-box">
                  <ImFilePicture />
                  <label htmlFor="musicFile" className="inputLabel">
                    Cover image
                    <input
                      id="cover"
                      type="file"
                      {...register('cover')}
                    />
                    {errors.cover && (
                    <div className="error">
                      <BsExclamationCircle />
                      {errors.cover.message}
                    </div>
                    )}
                  </label>
                </div>
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
                <input className="btn" type="submit" name="" value="Add" />
              </form>
              <div className="question">
                {adminUser
                  ? (
                    <Link to={{ pathname: `/admin/${adminUser}/my-demos/${currentUser}` }}> To all demo&#39;s </Link>
                  )
                  : (
                    <Link to={{ pathname: `/my-demos/${currentUser}` }}> To all demo&#39;s </Link>
                  )}
              </div>
            </>
          ) : (
            <div className="loading-animation-box">
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
