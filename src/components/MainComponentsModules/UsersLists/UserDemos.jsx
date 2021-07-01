import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import './AllUsersDemosList.css';
import NewDemo from '../../ReusableComponents/NewDemo/NewDemo';
import { userContext } from '../../contexts/UserProvider';

const UserDemos = () => {
  // Hooks
  const params = useParams();
  const { setCurrentUser } = useContext(userContext);
  const initial = { demos: [] };
  const [myUser, setMyUser] = useState(initial);
  async function fetchData() {
    try {
      const result = await axios.get(`http://localhost:8080/api/v1/users/${params.user}`);
      setMyUser(result.data);
    } catch (e) {
      console.error(e);
    }
  }

  // Effects
  useEffect(() => {
    fetchData();
    setCurrentUser(params.user);
  }, []);

  return (
    <div className="user-demos-container">
      <div>
        <div className="demo-list">
          {myUser.demos.map((item) => (
            <div className="user-demos">
              <NewDemo item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDemos;
