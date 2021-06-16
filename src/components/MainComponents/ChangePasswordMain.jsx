import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BiLockAlt } from 'react-icons/bi';
import {
  BsExclamationCircle,
} from 'react-icons/bs';

import axios from 'axios';
import { useHistory, useParams } from 'react-router';

// import LoadingAnimation from '../ReusableComponents/Animations/LoadingAnimation';

const ChangePasswordMain = () => {
  const params = useParams();
  const [succes, setSucces] = useState(false);
  const history = useHistory();

  async function postData(payload) {
    console.log('hallo post data ');
    try {
      const resp = await axios.put(`http://localhost:8080/api/v1/users/${params.user}/password`, payload);
      console.log(`payload${payload}`);
      console.log(resp.data);
      // if (!(resp.status === undefined)) { history.goBack(); }
    } catch (e) {
      console.error(e);
    }
  }

  const {
    register, watch, handleSubmit, formState: { errors },
  } = useForm();
  const password = useRef({});
  password.current = watch('password', '');

  const formSubmit = (data) => {
    console.log(data);
    postData(data);
    setSucces(true);
  };

  console.log(errors);
  return (
    <div className="mainContentContainer">
      <div className="mainContent">
        <div className="content-box">
          {!succes ? (
            <div>
              <h1>Change Password</h1>
              <form onSubmit={handleSubmit(formSubmit)}>
                <div className="text-box">
                  <BiLockAlt />
                  <label htmlFor="password" className="inputLabel">
                    New Password
                    <input
                      id="password"
                      type="password"
                      placeholder="Enter your new password"
                      {...register('password', {
                        required: 'You must specify a password',
                        minLength: {
                          value: 8,
                          message: 'Password must have at least 8 characters',
                        },
                      })}
                    />
                    {errors.password && (
                    <div className="error">
                      <BsExclamationCircle />
                      {errors.password.message}
                    </div>
                    )}
                  </label>
                </div>
                <div className="text-box">
                  <BiLockAlt />
                  <label htmlFor="confirmPassword" className="inputLabel">
                    Confirm Password
                    <input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your new password"
                      {...register('confirmPassword', {
                        validate: (value) => value === password.current || 'The passwords do not match',
                      })}
                    />
                    {errors.confirmPassword && (
                    <div className="error">
                      <BsExclamationCircle />
                      {errors.confirmPassword.message}
                    </div>
                    )}
                  </label>
                </div>
                <input className="btn" type="submit" name="" value="save" />
              </form>
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
              </div>
            </div>
          ) : (
            <div>
              {history.goBack()}
            </div>
          // <div>
          //   <div className="question">Loading... Please wait </div>
          //   <LoadingAnimation />
          // </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordMain;
