import React, {
  useContext, useEffect, useState,
} from 'react';
import axios from 'axios';
import './ProfileAdminMain.css';
import {
  BiCalendar,
  BiEnvelope, BiInfoCircle, BiUser,
} from 'react-icons/bi';
import { useParams } from 'react-router';
import { IoLocationOutline, IoMaleFemaleSharp } from 'react-icons/io5';
import { userContext } from '../context/UserProvider';
import profileImage from '../../Images/dj-default-gray.png';
import './ProfileMain.css';
// eslint-disable-next-line import/named
import { convertDate } from '../../HelperFunctions/HelperFunctions';
import UserDemos from '../MainComponentsModules/UsersLists/UserDemos';

const ProfileAdminMain = () => {
  // Hooks
  const [user, setUser] = useState({});
  const [url, setUrl] = useState(profileImage);
  const params = useParams();
  const { setCurrentUser, setAdminUser, setDemoOptionsBtn } = useContext(userContext);

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

  async function fetchData() {
    try {
      const result = await axios.get(`http://localhost:8080/api/v1/users/${params.user}`);
      const receivedData = result.data;
      const cleanData = receivedData;
      if (cleanData.email === 'undefined' || cleanData.email === 'null') { cleanData.email = ''; }
      if (cleanData.firstName === 'undefined' || cleanData.firstName === 'null') { cleanData.firstName = ''; }
      if (cleanData.lastName === 'undefined' || cleanData.lastName === 'null') { cleanData.lastName = ''; }
      if (cleanData.gender === 'undefined' || cleanData.gender === 'null') { cleanData.gender = ''; }
      if (cleanData.birthDate === 'undefined' || cleanData.birthDate === 'null') { cleanData.birthDate = ''; }
      if (cleanData.about === 'undefined' || cleanData.about === 'null') { cleanData.about = ''; }
      if (cleanData.location === 'undefined' || cleanData.location === 'null') { cleanData.location = ''; }
      setUser(cleanData);
    } catch (e) {
      console.error(e);
    }
  }

  // Effects
  useEffect(() => {
    fetchPhoto(user.photo);
    fetchData();
    setCurrentUser(params.user);
    setAdminUser(params.role);
    setDemoOptionsBtn(false);
  }, []);

  useEffect(() => {
    fetchPhoto(user.photo);
  }, [user]);

  useEffect(() =>
    () => {
      setDemoOptionsBtn(true);
    },
  []);

  // const convertDate = (date) => {
  //   if (date) {
  //     const newDate = date.split('-').reverse().join('-');
  //     console.log('DATE ', date);
  //     return newDate;
  //   }
  // };

  return (
    <div className="mainContentContainer">
      <div className="mainContent">
        <div className="content-box">
          <h1>Profile</h1>
          <h2>{user.username}</h2>
          <div className="hexagon-positioner">
            <div className="hexagon-shape">
              <img src={url} alt="profile" />
            </div>
          </div>
          <table className="profile-table">
            <tbody>
              <tr key={user.username}>
                <td><BiUser /></td>
                <td><p>Username</p></td>
                <td>{user.username}</td>
              </tr>
              <tr key={user.firstName}>
                <td><BiUser /></td>
                <td><p>First Name</p></td>
                <td>{user.firstName}</td>
              </tr>
              <tr key={user.lastName}>
                <td><BiUser /></td>
                <td><p>Last Name</p></td>
                <td>{user.lastName}</td>
              </tr>
              <tr key={user.email}>
                <td><BiEnvelope /></td>
                <td><p>Email</p></td>
                <td>{user.email}</td>
              </tr>
              <tr key={user.gender}>
                <td><IoMaleFemaleSharp /></td>
                <td><p>Gender</p></td>
                <td>{user.gender}</td>
              </tr>
              <tr key={user.birthDate}>
                <td><BiCalendar /></td>
                <td><p>Birth Date</p></td>
                <td>{convertDate(user.birthDate)}</td>
              </tr>
              <tr key={user.about}>
                <td><BiInfoCircle /></td>
                <td><p>About</p></td>
                <td>{user.about}</td>
              </tr>
              <tr key={user.location}>
                <td><IoLocationOutline /></td>
                <td><p>Location</p></td>
                <td>{user.location}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <UserDemos />
      </div>
    </div>
  );
};

export default ProfileAdminMain;
