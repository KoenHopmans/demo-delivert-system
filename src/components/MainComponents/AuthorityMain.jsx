import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { BiLockAlt, BiTrash } from 'react-icons/bi';
import { userContext } from '../contexts/UserProvider';
import AddAuthorityModule from '../MainComponentsModules/Authority/AddAuthorityModule';
import DeleteUserModule from '../MainComponentsModules/DeleteUser/DeleteUserModule';
import AllUsersList from '../MainComponentsModules/UsersLists/AllUserList';

const AuthorityMain = () => {
  // Hooks
  const params = useParams();
  const { setAdminUser, setCurrentUser } = useContext(userContext);
  const [newAuthority, setNewAuthority] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false);

  // Effects
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
          <h1>Authority</h1>
          <div className="text-box">
            <BiLockAlt />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="authority" className="inputLabel">
              Authority
            </label>
            <button type="button" className="input-btn" id="authority" onClick={() => setNewAuthority(!newAuthority)}>
              Change
            </button>
          </div>
          {newAuthority ? (
            <AddAuthorityModule />
          ) : ''}
          <div className="text-box">
            <BiTrash />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="authority" className="inputLabel">
              Delete user
            </label>
            <button type="button" className="input-btn" id="authority" onClick={() => setDeleteUser(!deleteUser)}>
              Select
            </button>
          </div>
          {deleteUser ? (
            <DeleteUserModule />
          ) : ''}
          <AllUsersList />
        </div>
      </div>
    </div>
  );
};

export default AuthorityMain;
