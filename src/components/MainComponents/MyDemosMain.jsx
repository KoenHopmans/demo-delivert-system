import React from 'react';

import UserDemos from '../MainComponentsModules/UsersDeomosList/UserDemos';

const MyDemosMain = () => (
  <div className="mainContentContainer">
    <div className="mainContent">
      <div className="content-box">
        <h1>My Demos</h1>
      </div>
      <UserDemos />
    </div>
  </div>
);

export default MyDemosMain;
