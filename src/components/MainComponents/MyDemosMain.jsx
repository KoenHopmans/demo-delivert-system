import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import { userContext } from '../context/UserProvider';
import UserDemos from '../MainComponentsModules/UsersLists/UserDemos';

const MyDemosMain = () => {
  // Hooks
  const {
    setAdminUser, setCurrentUser,
  } = useContext(userContext);
  const params = useParams();

  // Effects
  useEffect(() => {
    setCurrentUser(params.user);
    setAdminUser(params.role);
  }, []);

  return (
    <div className="mainContentContainer">
      <div className="mainContent">
        <div className="content-box">
          <h1>Demos</h1>
          <UserDemos />
        </div>
      </div>
    </div>
  );
};

export default MyDemosMain;
