import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { BiEnvelope, BiLockAlt } from 'react-icons/bi';
import { BsExclamationCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { userContext } from '../context/UserProvider';
import LoadingAnimation from '../ReusableComponents/Animations/LoadingAnimation';

const LoginMainContent = () => {
  // Hooks
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { setCurrentUser, setAdminUser } = useContext(userContext);
  const history = useHistory();

  // Functions
  async function postData(payload) {
    try {
      const resp = await axios.post('http://localhost:8080/api/v1/authenticate', payload);
      const userRole = resp.data.dto.role;
      const AUTH_TOKEN = resp.data.dto.jwt;
      axios.defaults.headers.common.Authorization = `Bearer ${AUTH_TOKEN}`;
      localStorage.setItem('token', resp.data.dto.jwt);
      const token = localStorage.getItem('token');
      console.log(`local storage token: ${token}`);
      if (userRole === 'ADMIN') {
        setAdminUser(payload.username);
        history.push(`admin/${payload.username}/hexagon`);
      } else {
        history.push(`/my-demos/${payload.username}`);
      }
    } catch (e) {
      console.error(e);
      setLoading(false);
      setMessage(true);
    }
  }

  const formSubmit = (data) => {
    postData(data);
    setCurrentUser(data.username);
    setLoading(true);
  };

  return (
    <div className="mainContentContainer">
      <div className="mainContent">
        <div className="content-box">
          {!loading ? (
            <div className="login-box">
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
                      {...register('password', {
                        required: 'Please enter your password',
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
                <input className="btn" type="submit" name="" value="Log in" />
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
