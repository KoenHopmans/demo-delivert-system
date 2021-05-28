/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useForm } from 'react-hook-form';
import {
  BiEnvelope,
  BiLockAlt, BiUser,
} from 'react-icons/bi';
import {
  BsExclamationCircle,
} from 'react-icons/bs';
import { Link } from 'react-router-dom';
import axios from 'axios';
import UserComponent from '../ReusableComponents/UserComponent/UserComponent';

const SignUpMainContent = () => {
  async function postData(payload) {
    console.log('hallo post data ');
    try {
      await axios.post('http://localhost:8080/api/v1/producers/', payload);
      console.log(`payload${payload}`);
    } catch (e) {
      console.error(e);
    }
  }
  const { register, handleSubmit, formState: { errors } } = useForm();
  const formSubmit = (data) => {
    console.log(data);
    postData(data);
  };

  console.log(errors);
  return (
    <div className="mainContentContainer">
      <div className="mainContent">
        <div className="content-box">
          <h1>Sign up</h1>
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="text-box">
              <BiUser />
              <label htmlFor="firstName" className="inputLabel">
                First name
                <input
                  id="firstName"
                  type="text"
                  placeholder="Enter your firstName"
                  {...register('firstName', {
                    required: 'Please enter your firstName',
                    minLength: { value: 4, message: 'At least 4 characters' },

                  })}
                />
                {errors.firstName && (
                  <div className="error">
                    <BsExclamationCircle />
                    {errors.firstName.message}
                  </div>
                )}
              </label>
            </div>
            <div className="text-box">
              <BiUser />
              <label htmlFor="lastName" className="inputLabel">
                Last name
                <input
                  id="lastName"
                  type="text"
                  placeholder="Enter your lastName"
                  {...register('lastName', {
                    required: 'Please enter your lastName',
                    minLength: { value: 4, message: 'At least 4 characters' },

                  })}
                />
                {errors.lastName && (
                  <div className="error">
                    <BsExclamationCircle />
                    {errors.lastName.message}
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
                  placeholder="Enter your password"
                                    // name="password"
                  {...register('password')}
                />
              </label>
            </div>
            <input className="btn" type="submit" name="" value="Sign in" />
          </form>
          <div className="question">
            Already have an account?
            <Link to="/login"> Login here</Link>
          </div>
        </div>
        <UserComponent />
      </div>
    </div>
  );
};

export default SignUpMainContent;
