import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BiEnvelope, BiLockAlt, BiUser } from 'react-icons/bi';
import { BsExclamationCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import LoadingAnimation from '../ReusableComponents/Animations/LoadingAnimation';

const SignUpMainContent = () => {
  // Hooks
  const [loading, setSucces] = useState(false);
  const {
    register, watch, handleSubmit, formState: { errors },
  } = useForm();
  const password = useRef({});
  password.current = watch('password', '');
  const history = useHistory();

  // Functions
  async function postData(payload) {
    console.log('hallo post data ');
    try {
      await axios.post('http://localhost:8080/api/v1/users/', payload);
      history.push('/login', { from: 'App' });
    } catch (e) {
      console.error(e);
    }
  }
  const formSubmit = (data) => {
    postData(data);
    setSucces(true);
  };

  console.log(errors);
  return (
    <div className="mainContentContainer">
      <div className="mainContent">
        <div className="content-box">
          {!loading ? (
            <div>
              <h1>Sign up</h1>
              <form onSubmit={handleSubmit(formSubmit)}>
                <div className="text-box">
                  <BiUser />
                  <label htmlFor="username" className="inputLabel">
                    User name
                    <input
                      id="username"
                      type="text"
                      placeholder="Enter your username"
                      {...register('username', {
                        required: 'Please enter your user name',
                        minLength: { value: 3, message: 'At least 3 characters' },

                      })}
                    />
                    {errors.username && (
                    <div className="error">
                      <BsExclamationCircle />
                      {errors.username.message}
                    </div>
                    )}
                  </label>
                </div>
                <div className="text-box">
                  <BiEnvelope />
                  <label htmlFor="email" className="inputLabel">
                    Email
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      {...register('email', {
                        required: 'Please enter your email',
                        minLength: { value: 4, message: 'At least 4 characters' },

                      })}
                    />
                    {errors.email && (
                    <div className="error">
                      <BsExclamationCircle />
                      {errors.email.message}
                    </div>
                    )}
                  </label>
                </div>
                <div className="text-box">
                  <BiLockAlt />
                  <label htmlFor="password" className="inputLabel">
                    Password
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
                        required: 'Please enter your password',
                        minLength: { value: 4, message: 'At least 4 characters' },
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
                <input className="btn" type="submit" name="" value="Sign in" />
              </form>
              <div className="question">
                Already have an account?
                <Link to="/login"> Login here</Link>
              </div>
            </div>
          ) : (
            <div>
              <div className="question">Loading... Please wait </div>
              <LoadingAnimation />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUpMainContent;
