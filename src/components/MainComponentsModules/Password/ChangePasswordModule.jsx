import React, { useRef } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { BiLockAlt } from 'react-icons/bi';
import { BsExclamationCircle } from 'react-icons/bs';
import '../../MainComponents/MainContent.css';
import { useParams } from 'react-router';

const ChangePasswordModule = () => {
  // Hooks
  const params = useParams();
  const {
    register, watch, handleSubmit, formState: { errors },
  } = useForm();
  const password = useRef({});
  password.current = watch('password', '');

  // Functions
  async function postData(payload) {
    try {
      await axios.put(`http://localhost:8080/api/v1/users/${params.user}/password`, payload);
    } catch (e) {
      console.error(e);
    }
  }

  const formSubmit = (data) => {
    postData(data);
  };

  return (
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
      <input id="change-btn" type="submit" name="" value="change" />
    </form>
  );
};

export default ChangePasswordModule;
