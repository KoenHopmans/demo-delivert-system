import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoMaleFemaleSharp, IoLocationOutline } from 'react-icons/io5';
import {
  BiUser, BiEnvelope, BiCalendar, BiLockAlt, BiInfoCircle,
} from 'react-icons/bi';
import {
  BsExclamationCircle,
} from 'react-icons/bs';
import axios from 'axios';
import { useParams } from 'react-router';
// import { ImFileMusic } from 'react-icons/im';
// import HexagonProfile from '../ReusableComponents/HexagonProfile/HexagonProfile';
import { useHistory } from 'react-router-dom';
import profileImage from '../../images/empty-profile-picture.jpg';

const ProfileMainContent = () => {
  const history = useHistory();
  const formData = new FormData();
  const {
    register, handleSubmit, reset, formState: { errors },
  } = useForm(
  );

  const [url, setUrl] = useState(profileImage);

  const params = useParams();
  const [user, setUser] = useState([]);
  async function postData(payload) {
    console.log('hallo post data ');
    try {
      await axios.put(`http://localhost:8080/api/v1/users/profile/${params.user}`, payload);
      console.log(`payload${payload}`);
    } catch (e) {
      console.error(e);
    }
  }

  async function fetchPhoto(fileName) {
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
        type: 'audio/mp3',
      });
      const objectURL = URL.createObjectURL(blob);
      setUrl(objectURL);
      // const downloadLink = document.createElement('a');
      // document.body.appendChild(downloadLink);
      // console.log(`downloadLink ${downloadLink}`);
      // console.log(`objectURL ${objectURL}`);
      // downloadLink.href = objectURL;
      // downloadLink.download = fileName;
      // downloadLink.style.display = 'none';
      // downloadLink.click();
      // document.body.removeChild(downloadLink);
    } catch (e) {
      console.error(e);
    }
  }

  const [save, setSave] = useState(true);

  useEffect(() => {
    fetchPhoto(user.photo);
    console.log('TEST');
  }, []);

  async function fetchData() {
    try {
      const result = await axios.get(`http://localhost:8080/api/v1/users/${params.user}`);
      // setEmail(result.data.email);
      console.log(`This is the get header ${result.request.header}`);
      const receivedData = result.data;

      console.log(receivedData);
      setUser(receivedData);
      reset(receivedData);
    } catch (e) {
      console.error(e);
    }
  }
  useEffect(() => {
    fetchData();
    console.log('user', user);
    // eslint-disable-next-line no-use-before-define
  }, [reset]);

  useEffect(() => {
    fetchPhoto(user.photo);
  }, [user, save]);

  const formSubmit = (data) => {
    console.log('hallo form submit 1 ');
    console.log(data);
    if (data.file[0]) {
      console.log('DATA');
      console.log('DATA');
      console.log('DATA');
      formData.append('file', data.file[0]);
      console.log('DATA');
      console.log('DATA');
      console.log('DATA');
      console.log('DATA');
      console.log(data.file);
      console.log(data.file[0]);
    }

    formData.append('email', data.email);
    formData.append('about', data.about);
    formData.append('gender', data.gender);
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('location', data.location);
    formData.append('birthDate', data.birthDate);
    postData(formData);
    setSave(!save);
    console.log(save);
    console.log('hallo form submit 2');
  };
  return (
    <div className="mainContentContainer">
      <div className="mainContent">
        <div className="content-box">
          <h1>Profile</h1>
          <h2>{user.username}</h2>
          <h2>{user.email}</h2>
          <h2>{user.photo}</h2>
          {/* <HexagonProfile photo="photo01" /> */}
          <div className="hexagon-shape">
            <img src={url} alt="profile" />
          </div>
          <div className="text-box">
            <BiLockAlt />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="password" className="inputLabel">
              password
            </label>
            <button type="button" className="input-btn" id="password" onClick={() => history.push(`/change-password/${params.user}`, { from: 'App' })}>
              Change
            </button>
          </div>
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="text-box">
              <BiUser />
              <label htmlFor="firstName" className="inputLabel">
                First name
                <input
                  id="firstName"
                  type="text"
                  placeholder="Enter your firstName"
                  {...register('firstName')}
                />
                {errors.firstName && (
                <div className="error">
                  <BsExclamationCircle />
                  {errors.firstName.message}
                </div>
                )}
              </label>
            </div>
            <div className="text-box">
              <BiUser />
              <label htmlFor="lastName" className="inputLabel">
                Last name
                <input
                  id="lastName"
                  type="text"
                  placeholder="Enter your lastName"
                  {...register('lastName')}
                />
                {errors.lastName && (
                <div className="error">
                  <BsExclamationCircle />
                  {errors.lastName.message}
                </div>
                )}
              </label>
            </div>
            <div className="text-box">
              {/* <ImFileMusic /> */}
              <label htmlFor="file" className="inputLabel">
                Photo
                <input
                  id="file"
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
              <BiEnvelope />
              <label htmlFor="email" className="inputLabel">
                Email
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...register('email', {
                    required: 'Please enter your email',
                    minLength: { value: 4, message: 'At least 4 characters' },

                  })}
                />
                {errors.email && (
                <div className="error">
                  <BsExclamationCircle />
                  {errors.email.message}
                </div>
                )}
              </label>
            </div>
            {/* <div className="text-box"> */}
            {/*  <BiLockAlt /> */}
            {/*  <label htmlFor="password" className="inputLabel"> */}
            {/*    Password */}
            {/*    <input */}
            {/*      id="password" */}
            {/*      type="password" */}
            {/*      placeholder="Enter your password" */}
            {/*                        // name="password" */}
            {/*      {...register('password')} */}
            {/*    /> */}
            {/*  </label> */}
            {/* </div> */}
            <div className="text-box">
              <IoMaleFemaleSharp />
              <label htmlFor="gender" className="inputLabel">
                Gender
                <select id="gender" {...register('gender')}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </label>
            </div>
            <div className="text-box">
              <BiCalendar />
              <label htmlFor="birthDate" className="inputLabel">
                Birthdate
                <input
                  id="birthDate"
                  type="date"
                  placeholder="Enter your birthDate"
                  {...register('birthDate')}
                />
                {errors.birthDate && (
                <div className="error">
                  <BsExclamationCircle />
                  {errors.birthDate.message}
                </div>
                )}
              </label>
            </div>
            <div className="text-box">
              <BiInfoCircle />
              <label htmlFor="about" className="inputLabel">
                About
                <textarea
                  id="about"
                  type="text"
                  placeholder="Enter your about"
                  {...register('about')}
                />
                {errors.about && (
                <div className="error">
                  <BsExclamationCircle />
                  {errors.about.message}
                </div>
                )}
              </label>
            </div>
            <div className="text-box">
              <IoLocationOutline />
              <label htmlFor="location" className="inputLabel">
                Location
                <input
                  id="location"
                  type="tel"
                  placeholder="Enter your location"
                  {...register('location')}
                />
                {errors.location && (
                <div className="error">
                  <BsExclamationCircle />
                  {errors.location.message}
                </div>
                )}
              </label>

            </div>
            <input className="btn" type="submit" name="" value="Save" />
          </form>
          <button type="button" className="btn" onClick={() => history.push(`/my-demos/${params.user}`, { from: 'App' })}>My Demos</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileMainContent;
