import React, { useContext } from 'react';
import { userContext } from '../contexts/UserProvider';
import UserDemos from '../MainComponentsModules/UsersDeomosList/UserDemos';

const MyDemosMain = () => {
  // Hooks
  const { currentDemo, currentUser } = useContext(userContext);
  return (
    <div className="mainContentContainer">
      <div className="mainContent">
        <div className="content-box">
          <h2 style={{ border: '2px green solid' }}>
            {currentUser}
          </h2>
          <h2 style={{ border: '2px red solid' }}>{currentDemo}</h2>
          <h1>My Demos</h1>
        </div>
        <UserDemos />
      </div>
    </div>
  );
};

export default MyDemosMain;
