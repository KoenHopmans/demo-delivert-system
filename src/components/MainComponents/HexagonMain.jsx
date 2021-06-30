import React, { useContext, useEffect } from 'react';

// import AllUsersList from '../MainComponentsModules/UsersRolesList/AllUsersList';
import { useParams } from 'react-router';
import AllUsersDemosList from '../MainComponentsModules/UsersLists/AllUsersDemosList';
import { userContext } from '../contexts/UserProvider';

const HexagonMain = () => {
  const params = useParams();
  const {
    setAdminUser, setCurrentUser,
  } = useContext(userContext);

  useEffect(() => {
    setAdminUser(params.role);
    setCurrentUser(params.role);
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
          <h1>Hexagon</h1>
          {/* <AllUsersList /> */}
          <AllUsersDemosList />
        </div>
      </div>
    </div>
  );
};

export default HexagonMain;
