import React, {
  useContext,
  useEffect, useRef, useState,
} from 'react';
import axios from 'axios';
import './AllUsersDemosList.css';
import { BiKey } from 'react-icons/bi';
import { useHistory } from 'react-router-dom';
import NewDemo from '../../ReusableComponents/NewDemo/NewDemo';

import ProfileImage from '../../ReusableComponents/ProfileImage';
import { userContext } from '../../contexts/UserProvider';

const AllUsersDemosList = () => {
  // Hooks
  const { adminUser, currentUser } = useContext(userContext);
  const [users, setUsers] = useState([]);
  const audioRef = useRef(null);
  const history = useHistory();

  // Functions
  async function fetchData() {
    try {
      const result = await axios.get('http://localhost:8080/api/v1/users/');
      setUsers(result.data);
    } catch (e) {
      console.error(e);
    }
  }

  const admin = (role) => {
    if (role === 'ROLE_ADMIN') {
      return (
        <div>
          <div className="admin-icon">
            <BiKey />
          </div>
        </div>
      );
    }
  };

  const profilePage = (selectedUser) => () => {
    const myAuthorities = selectedUser.authorities;
    const adminProfile = myAuthorities.some((person) => person.authority === 'ROLE_ADMIN');
    if (
      ((adminProfile && selectedUser.username !== adminUser)
            || (!adminProfile && selectedUser.username === currentUser))) {
      if (adminUser) {
        history.push(`/admin/${adminUser}/profile-admin/${selectedUser.username}`, { from: 'App' });
      } else {
        history.push(`/profile-admin/${selectedUser.username}`, { from: 'App' });
      }
    } else if (adminUser) {
      history.push(`/admin/${adminUser}/profile/${selectedUser.username}`, { from: 'App' });
    } else {
      history.push(`/profile/${selectedUser.username}`, { from: 'App' });
    }
  };

  // Effects
  useEffect(() => {
    fetchData();
    return () => {
      if (audioRef.current && audioRef.current.pause());
    };
  }, []);
  return (
    <div className="user-demos-container">
      <div>
        {
          users.map((user, index) => (
            <div className="user-container" key={index}>
              <button className="hexagon-photo" type="button" onClick={profilePage(user.username)}>
                <ProfileImage photo={user.photo} />
              </button>
              <div className="user-roles">
                <button className="name-btn" type="button" onClick={profilePage(user)}>
                  <div className="user-box">
                    <div>{user.username}</div>
                    <div>
                      {user.authorities.map((item, index) => (
                        <div key={index}>{admin(item.authority)}</div>
                      ))}
                    </div>
                  </div>
                </button>
              </div>
              <div className="demo-list">
                {user.demos.map((item, indexNr) => (
                  <NewDemo item={item} key={indexNr} />
                ))}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default AllUsersDemosList;
