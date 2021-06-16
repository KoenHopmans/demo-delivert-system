import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  BiEnvelope,
  BiLockAlt,
} from 'react-icons/bi';
import {
  BsExclamationCircle,
} from 'react-icons/bs';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import LoadingAnimation from '../ReusableComponents/Animations/LoadingAnimation';

const LoginMainContent = () => {
  const [succes, setSucces] = useState(false);

  const history = useHistory();

  async function postData(payload) {
    console.log('hallo post data ');
    try {
      const resp = await axios.post('http://localhost:8080/api/v1/authenticate', payload);
      console.log(`payload${payload}`);
      console.log(resp.data);
      console.log(resp.data.jwt);
      const AUTH_TOKEN = resp.data.jwt;
      // LOCAL STORAGE HEADER JWT TOKEN

      // eslint-disable-next-line
      axios.defaults.headers.common.Authorization = `Bearer ${AUTH_TOKEN}`;
      console.log(axios.defaults.headers, 'login main axios header');

      localStorage.setItem('token', resp.data.jwt);
      const token = localStorage.getItem('token');
      console.log(`local storage token: ${token}`);
    } catch (e) {
      console.error(e);
    }
  }

  const { register, handleSubmit, formState: { errors } } = useForm();
  const formSubmit = (data) => {
    console.log(data);
    postData(data);
    setSucces(true);
    history.push(`/profile/${data.username}`);
  };

  console.log(errors);
  return (
    <div className="mainContentContainer">
      <div className="mainContent">
        <div className="content-box">
          {!succes ? (
            <div>
              <h1>Login</h1>
              <form onSubmit={handleSubmit(formSubmit)}>
                <div className="text-box">
                  <BiEnvelope />
                  <label htmlFor="username" className="inputLabel">
                    Username
                    <input
                      id="username"
                      type="username"
                      placeholder="Enter your username"
                      {...register('username', {
                        required: 'Please enter your username',

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
                Don&#39;t have an account?
                <Link to="/sign-up"> Please register here</Link>
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

export default LoginMainContent;
