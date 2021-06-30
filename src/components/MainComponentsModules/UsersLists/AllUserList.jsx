import React, {
  useContext,
  useEffect, useState,
} from 'react';
import axios from 'axios';
import './AllUsersDemosList.css';
import { BiKey, BiTrash } from 'react-icons/bi';
import { useHistory } from 'react-router-dom';
import './AllUserList.css';
// import NewDemo from '../../ReusableComponents/NewDemo/NewDemo';

import ProfileImage from '../../ReusableComponents/ProfileImage';
import { userContext } from '../../contexts/UserProvider';

const AllUsersList = () => {
  const { adminUser, update, toggleUpdate } = useContext(userContext);
  const [users, setUsers] = useState([]);
  // const audioRef = useRef(null);
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

  async function deleteAdmin(username) {
    console.log('hallo post data ');
    try {
      await axios.delete(`http://localhost:8080/api/v1/users/${username}/authorities/ROLE_ADMIN`);
      console.log('DELETED');
      toggleUpdate(!update);
    } catch (e) {
      console.error(e);
    }
  }
  // eslint-disable-next-line consistent-return
  const admin = (role, username) => {
    if (role === 'ROLE_ADMIN') {
      return (
        <div className="admin-container">
          <div className="admin-icon">
            <BiKey />
          </div>
          <p>Admin</p>
          {username === 'Don Diablo' ? ''
            : (
              <button
                onClick={() => {
                  deleteAdmin(username);
                }}
                type="button"
                className="delete-role"
              >
                <div className="trash-icon"><BiTrash /></div>
              </button>
            )}
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
    // return () => {
    //   if (audioRef.current && audioRef.current.pause());
    //   // setAdmin(true);
    // };
  }, [update]);
  console.log('USER PHOTO', { users });
  return (
    <div className="user-demos-container">
      <div>
        {/* <h1>User Demos</h1> */}
        {
                    users.map((user) => (
                      <div className="user-container">
                        {/* <div>{user.username}</div> */}
                        <button className="hexagon-photo" type="button" onClick={profilePage(user.username)}>
                          <ProfileImage photo={user.photo} />
                        </button>
                        <div className="user-roles">
                          <button className="name-btn" type="button" onClick={profilePage(user.username)}>
                            {/* <div className="user-box"> */}
                            <div className="username-box">{user.username}</div>
                          </button>
                          {user.authorities.map((item) => (
                            <div>{admin(item.authority, user.username)}</div>
                          ))}
                          {/* </div> */}
                        </div>
                        {/* <div className="demo-list"> */}
                        {/*  {user.demos.map((item) => ( */}
                        {/*    <NewDemo item={item} /> */}
                        {/*  ))} */}
                        {/* </div> */}
                      </div>
                    ))
                }
      </div>
    </div>
  );
};

export default AllUsersList;
