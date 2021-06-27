import React, {
  useContext, useEffect, useState,
} from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { IoMaleFemaleSharp, IoLocationOutline } from 'react-icons/io5';
import {
  BiUser, BiEnvelope, BiCalendar, BiLockAlt, BiInfoCircle, BiTrash,
} from 'react-icons/bi';
import { BsExclamationCircle } from 'react-icons/bs';
// import { useHistory } from 'react-router-dom';
import ChangePasswordModule from '../MainComponentsModules/ChangePasswordModule';
import { userContext } from '../contexts/UserProvider';
import profileImage from '../../images/dj-default-gray.png';
import adminIcon from '../../images/hexagon-admin.png';
import './ProfileMain.css';

const ProfileMainContent = () => {
  // Hooks
  // const history = useHistory();
  const [user, setUser] = useState({});
  const [userRole, setUserRole] = useState([]);
  const [update, toggleUpdate] = useState(false);
  const [url, setUrl] = useState(profileImage);
  const [photoName, setPhotoName] = useState('');
  const [newPassword, setNewPassword] = useState(false);
  // const inputFileRef = useRef(undefined);
  const params = useParams();
  const {
    currentUser, setCurrentUser, adminUser, setAdminUser,
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
      console.log('RESULT', result);
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
    try {
      await axios.put(`http://localhost:8080/api/v1/users/profile/${params.user}`, payload);
      console.log('PAYLOAD ', payload);
      toggleUpdate(!update);
    } catch (e) {
      console.error(e);
    }
  }

  // Nova voorbeeld
  // useEffect(() => {
  //   if (user) {
  //     setValue([{ email: user.email || '' },
  //       { about: user.about || '' },
  //       { gender: user.gender || '' },
  //       { firstName: user.firstName || '' },
  //       { lastName: user.lastName || '' },
  //       { location: user.location || '' },
  //       { birthDate: user.birthDate || '' }]);
  //   }
  // }, [user]);

  async function fetchData() {
    try {
      const result = await axios.get(`http://localhost:8080/api/v1/users/${params.user}`);
      // setEmail(result.data.email);
      console.log(`This is the get header ${result.request.header}`);
      const receivedData = result.data;

      console.log('User DATA !!', receivedData);
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
    console.log('hallo form submit 1 ');
    console.log(data);
    if (data.file[0]) {
      console.log('DATA', data.file[0].name);
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
    console.log('hallo post data ');
    try {
      await axios.delete(`http://localhost:8080/api/v1/users/${params.user}/authorities/ROLE_ADMIN`);
      console.log('DELETED');
    } catch (e) {
      console.error(e);
    }
  }

  // eslint-disable-next-line consistent-return
  // const redirect = () => {
  //   if (!(params.user === currentUser)) {
  //     history.push('/', { from: 'App' });
  //   }
  // };

  // Effects
  useEffect(() => {
    fetchPhoto(user.photo);
    fetchData();
    setCurrentUser(params.user);
    setAdminUser(params.role);
    // redirect();
    console.log('TEST');
  }, []);

  useEffect(() => {
    fetchPhoto(user.photo);
  }, [user]);

  useEffect(() => {
    fetchPhoto(photoName);
  }, [update]);

  // eslint-disable-next-line consistent-return
  const admin = (role) => {
    if (role === 'ROLE_ADMIN') {
      return (
        <div className="admin-icon-box">
          {/* <RiAdminLine /> */}
          <img className="admin-icon" src={adminIcon} alt="Admin icon" />
          {/* <p>Admin</p> */}
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button onClick={deleteAdmin} type="button" className="delete-role"><BiTrash /></button>
        </div>
      );
    }
  };

  return (
    <div className="mainContentContainer">
      <div className="mainContent">
        <div className="content-box">
          <h2 style={{ border: '2px green solid' }}>
            {currentUser}
          </h2>
          <h2 style={{ border: '2px blue solid' }}>
            {adminUser}
          </h2>
          <h1>Profile</h1>
          <h2>{user.username}</h2>
          <h2>{user.email}</h2>
          <h2>{user.photo}</h2>
          {/* <HexagonProfile photo="photo01" /> */}
          <div className="hexagon-shape">
            <img src={url} alt="profile" />
          </div>
          <div className="user-roles">
            {userRole.map((item) => (
              <div>{admin(item.authority)}</div>
            ))}
          </div>
          <div className="text-box">
            {/* <ImFileMusic /> */}
            <label htmlFor="file" className="inputLabel">
              Photo
              <input
                id="file"
                type="file"
                    // ref={inputFileRef}
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
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
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
      </div>
    </div>
  );
};

export default ProfileMainContent;
