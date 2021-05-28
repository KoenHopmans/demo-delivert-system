import React from 'react';
import { useForm } from 'react-hook-form';
import {
  BiEnvelope,
  BiLockAlt,
} from 'react-icons/bi';
import {
  BsExclamationCircle,
} from 'react-icons/bs';
import { Link } from 'react-router-dom';
import axios from 'axios';

const LoginMainContent = () => {
  async function postData(payload) {
    console.log('hallo post data ');
    try {
      const resp = await axios.post('http://localhost:8080/authenticate', payload);
      console.log(`payload${payload}`);
      console.log(resp.data);
      console.log(resp.data.jwt);
      // LOCAL STORAGE HEADER JWT TOKEN
      localStorage.setItem('token', resp.data.jwt);
      axios.defaults.headers.common.Authorization = localStorage.getItem('token');
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
      </div>
    </div>
  );
};

export default LoginMainContent;
