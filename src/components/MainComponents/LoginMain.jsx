import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { BiEnvelope, BiLockAlt } from 'react-icons/bi';
import { BsExclamationCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { userContext } from '../contexts/UserProvider';
import LoadingAnimation from '../ReusableComponents/Animations/LoadingAnimation';

const LoginMainContent = () => {
  // Hooks
  const [succes, setSucces] = useState(false);
  const [message, setMessage] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { setCurrentUser, setAdminUser } = useContext(userContext);
  const history = useHistory();

  // Functions
  async function postData(payload) {
    try {
      const resp = await axios.post('http://localhost:8080/api/v1/authenticate', payload);
      console.log('respons.data!!!!!!!!!!!NOW', resp.data.dto);
      const userRole = resp.data.dto.role;
      console.log('ROLE VAN DE USER IS:', resp.data.dto.role);
      console.log(resp.data.dto.jwt);
      const AUTH_TOKEN = resp.data.dto.jwt;
      axios.defaults.headers.common.Authorization = `Bearer ${AUTH_TOKEN}`;
      console.log(axios.defaults.headers, 'login main axios header');
      localStorage.setItem('token', resp.data.dto.jwt);
      const token = localStorage.getItem('token');
      console.log(`local storage token: ${token}`);
      console.log('MIJN ROL IS ', userRole);
      if (userRole === 'ADMIN') {
        setAdminUser(payload.username);
        history.push(`admin/${payload.username}/hexagon`);
      } else {
        history.push(`/my-demos/${payload.username}`);
      }
    } catch (e) {
      console.error(e);
      setSucces(false);
      setMessage(true);
    }
  }

  const formSubmit = (data) => {
    postData(data);
    setCurrentUser(data.username);
    setSucces(true);
  };

  console.log(errors);
  return (
    <div className="mainContentContainer">
      <div className="mainContent">
        <div className="content-box">
          {!succes ? (
            <div>
              <h1>Login</h1>
              {message ? (
                <div className="error">
                  <BsExclamationCircle />
                  Username and Password are not correct
                </div>
              ) : ''}
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
