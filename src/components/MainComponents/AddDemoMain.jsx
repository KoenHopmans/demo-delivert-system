import React, {
  useContext, useEffect, useState,
} from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { BiPencil, BiMessageEdit } from 'react-icons/bi';
import { BsExclamationCircle } from 'react-icons/bs';
import { ImFileMusic, ImFilePicture } from 'react-icons/im';
import { Link } from 'react-router-dom';
import { useHistory, useParams } from 'react-router';
import { userContext } from '../contexts/UserProvider';
import LoadingAnimation from '../ReusableComponents/Animations/LoadingAnimation';

const AddDemoMainContent = () => {
  const formData = new FormData();
  const { currentUser, setCurrentUser } = useContext(userContext);
  const history = useHistory();
  const [succes, setSucces] = useState(false);
  const params = useParams();
  // const [item, setItem] = useState({});

  async function postData(payload) {
    console.log('hallo post data ');
    try {
      await axios.post('http://localhost:8080/api/v1/demo-upload', payload);
      console.log(`payload${payload}`);
      history.push(`/my-demos/${currentUser}`);
    } catch (e) {
      console.error(e);
    }
  }
  const { register, handleSubmit, formState: { errors } } = useForm();
  const formSubmit = (data) => {
    formData.append('musicFile', data.musicFile[0]);
    console.log('data.musicFile[0].name', data.musicFile[0].name);
    formData.append('cover', data.cover[0]);
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

  // async function fetchData() {
  //   try {
  //     const result = await axios.get(`http://localhost:8080/api/v1/demo/${addedDemo}`);
  //     console.log('result.data!!!!!', result.data);
  //     setItem(result.data);
  //     console.log('item!!!', item);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  // useEffect(() => {
  //   fetchData();
  //   console.log('FETCH DATA');
  // }, []);

  useEffect(() => {
    setCurrentUser(params.user);
  }, []);

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
              <h1>
                Add demo item
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
                {/* <div className="text-box"> */}
                {/*  <BiMessageEdit /> */}
                {/*  <label htmlFor="feedback" className="inputLabel"> */}
                {/*    Feedback */}
                {/*    <input */}
                {/*      id="feedback" */}
                {/*      type="text" */}
                {/*      placeholder="Enter your feedback" */}
                {/*      {...register('feedback')} */}
                {/*    /> */}
                {/*    {errors.feedback && ( */}
                {/*    <div className="error"> */}
                {/*      <BsExclamationCircle /> */}
                {/*      {errors.feedback.message} */}
                {/*    </div> */}
                {/*    )} */}
                {/*  </label> */}
                {/* </div> */}
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
