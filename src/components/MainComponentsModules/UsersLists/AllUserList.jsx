import React, {
  useContext,
  useEffect, useState,
} from 'react';
import axios from 'axios';
import './AllUsersDemosList.css';
import { BiKey, BiTrash } from 'react-icons/bi';
import { useHistory } from 'react-router-dom';
import './AllUserList.css';
import ProfileImage from '../../ReusableComponents/ProfileImage';
import { userContext } from '../../context/UserProvider';

const AllUsersList = () => {
  // Hooks
  const { adminUser, update, toggleUpdate } = useContext(userContext);
  const [users, setUsers] = useState([]);
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

  async function deleteAdmin(username) {
    try {
      await axios.delete(`http://localhost:8080/api/v1/users/${username}/authorities/ROLE_ADMIN`);
      toggleUpdate(!update);
    } catch (e) {
      console.error(e);
    }
  }

  const admin = (role, username) => {
    if (role === 'ROLE_ADMIN') {
      return (
        <div className="admin-container">
          <div className="admin-icon">
            <BiKey />
          </div>
          <p>Admin</p>
          {/* Disable deleting admin role form Don Dibalo */}
          {username === 'don_diablo' ? ''
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
  }, [update]);
  return (
    <div className="user-demos-container">
      <div>
        {
          users.map((user, index) => (
            <div key={index} className="user-container">
              <button className="hexagon-photo" type="button" onClick={profilePage(user.username)}>
                <ProfileImage photo={user.photo} />
              </button>
              <div className="user-roles">
                <button className="name-btn" type="button" onClick={profilePage(user.username)}>
                  <div className="username-box">{user.username}</div>
                </button>
                {user.authorities.map((item, indexNr) => (
                  <div key={indexNr}>{admin(item.authority, user.username)}</div>
                ))}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default AllUsersList;
