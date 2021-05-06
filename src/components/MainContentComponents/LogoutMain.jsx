import React from 'react';
import './LogoutMain.css';
import { useHistory } from 'react-router-dom';
import { BiLogOutCircle } from 'react-icons/bi';
import { BsQuestionCircle } from 'react-icons/bs';

const LogoutMainContent = () => {
  const history = useHistory();
  return (
    <div className="logoutMainContentContainer">
      <div className="logoutMainContent">
        <div className="logout-box">
          <div className="logout-header">
            <BiLogOutCircle />
            <div>Logout</div>
          </div>
          <div />
          <div className="question">
            <BsQuestionCircle />
            <div>Are you sure you want to log out?</div>
          </div>
          <div className="btn-container">
            <button
              onClick={() => {
                history.goBack();
              }}
              type="button"
              className="btn"
            >
              Cancel
            </button>
            <button
              onClick={() => history.push('/', { from: 'App' })}
              type="button"
              className="btn"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutMainContent;
