/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useForm } from 'react-hook-form';
import './LoginMain.css';
import {
  BiLockAlt, BiUser,
} from 'react-icons/bi';
import {
  BsExclamationCircle,
} from 'react-icons/bs';

const LoginMainContent = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const formSubmit = (data) => {
    console.log(data);
  };
  console.log(errors);
  return (
    <div className="loginMainContentContainer">
      <div className="loginMainContent">
        <div className="login-box">
          <h1>Login</h1>
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="text-box">
              <BiUser />
              <label htmlFor="username" className="username">
                Username
                <input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  // name="username"
                  {...register('username', {
                    required: 'Please enter your username',
                    minLength: { value: 4, message: 'At least 4 characters' },

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
              <BiLockAlt />
              <label htmlFor="password" className="password">
                Password
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  // name="password"
                  {...register('password')}
                />
              </label>
            </div>
            <input className="btn" type="submit" name="" value="Sign in" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginMainContent;
