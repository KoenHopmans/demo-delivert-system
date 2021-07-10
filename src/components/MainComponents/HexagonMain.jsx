import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import AllUsersDemosList from '../MainComponentsModules/UsersLists/AllUsersDemosList';
import { userContext } from '../context/UserProvider';

const HexagonMain = () => {
  // Hooks
  const params = useParams();
  const { setAdminUser, setCurrentUser } = useContext(userContext);
  useEffect(() => {
    setAdminUser(params.role);
    setCurrentUser(params.role);
  }, []);

  return (
    <div className="mainContentContainer">
      <div className="mainContent">
        <div className="content-box">
          <h1>Hexagon</h1>
          <AllUsersDemosList />
        </div>
      </div>
    </div>
  );
};

export default HexagonMain;
