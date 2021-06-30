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
// import { useHistory } from 'react-router-dom';
// import {
//   GrUserAdmin,
// } from 'react-icons/gr';
import { IoLocationOutline, IoMaleFemaleSharp } from 'react-icons/io5';
import { userContext } from '../contexts/UserProvider';
import profileImage from '../../images/dj-default-gray.png';

import './ProfileMain.css';
import UserDemos from '../MainComponentsModules/UsersLists/UserDemos';

const ProfileAdminMain = () => {
  // Hooks
  // const history = useHistory();
  const [user, setUser] = useState({});
  // const [update, toggleUpdate] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState(profileImage);
  // const [photoName, setPhotoName] = useState('');
  // const inputFileRef = useRef(undefined);
  const params = useParams();
  const { setCurrentUser, setAdminUser } = useContext(userContext);
  // const formData = new FormData();

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

  // async function postData(payload) {
  //   setLoading(true);
  //   try {
  //     await axios.put(`http://localhost:8080/api/v1/users/profile/${params.user}`, payload);
  //     console.log('PAYLOAD ', payload);
  //     toggleUpdate(!update);
  //     setLoading(false);
  //   } catch (e) {
  //     console.error(e);
  //     setLoading(false);
  //   }
  // }

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
    // redirect();
    console.log('TEST');
  }, []);

  useEffect(() => {
    fetchPhoto(user.photo);
  }, [user]);

  // // eslint-disable-next-line consistent-return
  // const admin = (role) => {
  //   if (role === 'ROLE_ADMIN') {
  //     return (
  //       <div className="admin-box">
  //         {/* <RiAdminLine /> */}
  //         <div className="admin-icon">
  //           <BiKey />
  //         </div>
  //         <p>Admin</p>
  //       </div>
  //     );
  //   }
  // };

  return (
    <div className="mainContentContainer">
      <div className="mainContent">
        {/* <h2 style={{ border: '2px green solid' }}> */}
        {/*  {currentUser} */}
        {/* </h2> */}
        {/* <h2 style={{ border: '2px blue solid' }}> */}
        {/*  {adminUser} */}
        {/* </h2> */}
        <div className="content-box">
          <h1>Profile</h1>
          <h2>{user.username}</h2>
          {/* <h2>{user.email}</h2> */}
          {/* <h2>{user.photo}</h2> */}
          {/* <HexagonProfile photo="photo01" /> */}

          <div className="hexagon-positioner">
            <div className="hexagon-shape">
              <img src={url} alt="profile" />
            </div>
            {/* {userRole.map((item) => ( */}
            {/*  <div>{admin(item.authority)}</div> */}
            {/* ))} */}
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
                <td>{user.birthDate}</td>
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
