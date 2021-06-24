import React, {
  useContext,
  useEffect, useRef, useState,
} from 'react';
import axios from 'axios';
// disable eslint next line
import './AllUsersDemosList.css';
// import { RiAdminLine } from 'react-icons/ri';
// import { useHistory } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import NewDemo from '../../ReusableComponents/NewDemo/NewDemo';
// import { userContext } from '../../contexts/UserProvider';
import ProfileImage from '../../ReusableComponents/ProfileImage';
import adminIcon from '../../../images/hexagon-admin.png';
import { userContext } from '../../contexts/UserProvider';

const AllUsersDemosList = () => {
  // const history = useHistory();
  const { adminUser } = useContext(userContext);
  const [users, setUsers] = useState([]);
  const audioRef = useRef(null);
  // const { setAdmin } = useContext(userContext);
  const history = useHistory();
  async function fetchData() {
    try {
      const result = await axios.get('http://localhost:8080/api/v1/users/');
      setUsers(result.data);
      console.log('result.data');
      console.log(result.data);
    } catch (e) {
      console.error(e);
    }
  }
  // eslint-disable-next-line consistent-return
  const admin = (role) => {
    if (role === 'ROLE_ADMIN') {
      return (
        <div style={{ fontSize: '30px', color: 'white' }}>
          {/* <RiAdminLine /> */}
          <img style={{ width: '30px' }} src={adminIcon} alt="Admin icon" />
        </div>
      );
    }
  };

  const profilePage = (selectedUser) => () => {
    if (adminUser) {
      history.push(`/admin/${adminUser}/profile/${selectedUser}`, { from: 'App' });
    } else {
      history.push(`/profile/${selectedUser}`, { from: 'App' });
    }
  };

  useEffect(() => {
    fetchData();
    return () => {
      if (audioRef.current && audioRef.current.pause());
      // setAdmin(true);
    };
  }, []);
  console.log('USER PHOTO', { users });
  return (
    <div className="user-demos-container">
      <div>
        <h1>User Demos</h1>
        {
                    users.map((user) => (
                      <div className="user-container">
                        {/* <div>{user.username}</div> */}
                        <button className="hexagon-photo" type="button" onClick={profilePage(user.username)}>
                          <ProfileImage photo={user.photo} />
                        </button>
                        <div className="user-roles">
                          <button className="name-btn" type="button" onClick={profilePage(user.username)}>
                            <div>{user.username}</div>
                            <div>
                              {user.authorities.map((item) => (
                                <div>{admin(item.authority)}</div>
                              ))}
                            </div>
                          </button>
                        </div>
                        <div className="demo-list">
                          {user.demos.map((item) => (
                            <NewDemo item={item} />
                          ))}
                        </div>
                      </div>
                    ))
                }
      </div>
      {/* <button */}
      {/*  className="btn sample-player" */}
      {/*  onClick={() => { stopPlay(); }} */}
      {/*  type="submit" */}
      {/* > */}
      {/*  pause */}
      {/* </button> */}
    </div>
  );
};

export default AllUsersDemosList;
