import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import { userContext } from '../contexts/UserProvider';
import UserDemos from '../MainComponentsModules/UsersLists/UserDemos';

const MyDemosMain = () => {
  // Hooks
  const {
    setAdminUser, setCurrentUser,
  } = useContext(userContext);
  const params = useParams();

  // Effects
  useEffect(() => {
    console.log('params.user!!!!!!!!!!!!!!', params.user);
    setCurrentUser(params.user);
    setAdminUser(params.role);
    console.log('params.admin', params.admin);
  }, []);

  return (
    <div className="mainContentContainer">
      <div className="mainContent">
        <div className="content-box">
          {/* <h2 style={{ border: '2px green solid' }}> */}
          {/*  {currentUser} */}
          {/* </h2> */}
          {/* <h2 style={{ border: '2px blue solid' }}> */}
          {/*  {adminUser} */}
          {/* </h2> */}
          {/* <h2 style={{ border: '2px red solid' }}>{currentDemo}</h2> */}
          <h1>Demos</h1>
          <UserDemos />
        </div>
      </div>
    </div>
  );
};

export default MyDemosMain;
