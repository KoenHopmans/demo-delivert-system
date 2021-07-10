import React, {
  useContext, useEffect, useState,
} from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { IoMaleFemaleSharp, IoLocationOutline } from 'react-icons/io5';
import {
  BiUser, BiEnvelope, BiCalendar, BiLockAlt, BiInfoCircle, BiTrash, BiKey,
} from 'react-icons/bi';
import { BsExclamationCircle } from 'react-icons/bs';
import { ImFilePicture } from 'react-icons/im';
import ChangePasswordModule from '../MainComponentsModules/Password/ChangePasswordModule';
import { userContext } from '../context/UserProvider';
import profileImage from '../../images/dj-default-gray.png';
import './ProfileMain.css';
import LoadingAnimation from '../ReusableComponents/Animations/LoadingAnimation';

const ProfileMainContent = () => {
  // Hooks
  const [user, setUser] = useState({});
  const [userRole, setUserRole] = useState([]);
  const [update, toggleUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState(profileImage);
  const [photoName, setPhotoName] = useState('');
  const [newPassword, setNewPassword] = useState(false);
  const params = useParams();
  const {
    currentUser, setCurrentUser, setAdminUser,
  } = useContext(userContext);
  const formData = new FormData();
  const {
    register, handleSubmit, reset, formState: { errors },
  } = useForm();

  // Functions
  async function fetchPhoto(fileName) {
    try {
      const result = await axios.get(`http://localhost:8080/api/v1/downloadFile/${fileName}`, {
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'image/jpg',
        },
      });
      const blob = new Blob([result.data], {
        type: 'image/jpg',
      });
      const objectURL = URL.createObjectURL(blob);
      setUrl(objectURL);
    } catch (e) {
      console.error(e);
    }
  }

  async function postData(payload) {
    setLoading(true);
    try {
      await axios.put(`http://localhost:8080/api/v1/users/${params.user}`, payload);
      toggleUpdate(!update);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  }

  async function fetchData() {
    try {
      const result = await axios.get(`http://localhost:8080/api/v1/users/${params.user}`);
      const receivedData = result.data;
      setUser(receivedData);
      setUserRole(receivedData.authorities);
      const cleanData = receivedData;
      if (cleanData.email === 'undefined' || cleanData.email === 'null') { cleanData.email = ''; }
      if (cleanData.firstName === 'undefined' || cleanData.firstName === 'null') { cleanData.firstName = ''; }
      if (cleanData.lastName === 'undefined' || cleanData.lastName === 'null') { cleanData.lastName = ''; }
      if (cleanData.about === 'undefined' || cleanData.about === 'null') { cleanData.about = ''; }
      if (cleanData.location === 'undefined' || cleanData.location === 'null') { cleanData.location = ''; }
      reset(cleanData);
    } catch (e) {
      console.error(e);
    }
  }

  const formSubmit = (data) => {
    if (data.file[0]) {
      setPhotoName(data.file[0].name);
      formData.append('file', data.file[0]);
    }
    formData.append('email', data.email);
    formData.append('about', data.about);
    formData.append('gender', data.gender);
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('location', data.location);
    formData.append('birthDate', data.birthDate);
    postData(formData);
  };
  async function deleteAdmin() {
    try {
      await axios.delete(`http://localhost:8080/api/v1/users/${params.user}/authorities/ROLE_ADMIN`);
      toggleUpdate(!update);
    } catch (e) {
      console.error(e);
    }
  }

  // Effects
  useEffect(() => {
    fetchData();
    fetchPhoto(photoName);
  }, [update]);

  useEffect(() => {
    fetchPhoto(user.photo);
    fetchData();
    setCurrentUser(params.user);
    setAdminUser(params.role);
  }, []);

  useEffect(() => {
    fetchPhoto(user.photo);
  }, [user]);

  const admin = (role) => {
    if (role === 'ROLE_ADMIN') {
      return (
        <div className="admin-box">
          <div className="admin-icon">
            <BiKey />
          </div>
          <p>Admin</p>
          {currentUser === 'Don Diablo' ? ''
            : (
              <div className="delete-icon">
                <button onClick={deleteAdmin} type="button" className="delete-role">
                  <div className="trash-icon"><BiTrash /></div>
                </button>
              </div>
            )}

        </div>
      );
    }
  };

  return (
    <div className="mainContentContainer">
      <div className="mainContent">
        {!loading ? (
          <div className="content-box">
            <h1>Profile</h1>
            <h2>{user.username}</h2>
            <div className="hexagon-positioner">
              <div className="hexagon-shape">
                <img src={url} alt="profile" />
              </div>
              {userRole.map((item, index) => (
                <div key={index}>{admin(item.authority)}</div>
              ))}
            </div>
            <div className="text-box">
              <ImFilePicture />
              <label htmlFor="file" className="inputLabel">
                Photo
                <input
                  id="file"
                  type="file"
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
              <BiLockAlt />
              <label htmlFor="password" className="inputLabel">
                password
              </label>
              <button type="button" className="input-btn" id="password" onClick={() => setNewPassword(!newPassword)}>
                Change
              </button>
            </div>
            {newPassword ? (
              <ChangePasswordModule />
            ) : ''}
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
          </div>
        ) : (
          <div>
            <div className="question">Loading... Please wait </div>
            <LoadingAnimation />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileMainContent;
