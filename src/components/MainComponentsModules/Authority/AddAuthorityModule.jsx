import React, { useContext } from 'react';
import { BiKey, BiUser } from 'react-icons/bi';
import { BsExclamationCircle } from 'react-icons/bs';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { userContext } from '../../contexts/UserProvider';

const AddAuthorityModule = () => {
  console.log('demos');
  const { update, toggleUpdate } = useContext(userContext);
  async function postData(payload) {
    console.log('hallo post data ');
    try {
      await axios.post(`http://localhost:8080/api/v1/users/${payload.username}/authorities`, payload);
      toggleUpdate(!update);
    } catch (e) {
      console.error(e);
    }
  }
  const { register, handleSubmit, formState: { errors } } = useForm();
  const formSubmit = (data) => {
    postData(data);
  };

  return (
    <form onSubmit={handleSubmit(formSubmit)}>
      <div className="text-box">
        <BiUser />
        <label htmlFor="username" className="inputLabel">
          Username
          <input
            id="username"
            type="text"
            placeholder="Enter a username"
            {...register('username', {
              required: 'Please enter a username',
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
        <BiKey />
        <label htmlFor="authority" className="inputLabel">
          Authority
          <select
            id="authority"
            type="authority"
            placeholder="Enter your authority"
            {...register('authority')}
          >
            <option value="ROLE_USER">
              User
            </option>
            <option value="ROLE_ADMIN">
              Admin
            </option>
          </select>
          {errors.authority && (
          <div className="error">
            <BsExclamationCircle />
            {errors.authority.message}
          </div>
          )}
        </label>
      </div>
      <input className="btn" type="submit" name="" value="Add" />
    </form>
  );
};

export default AddAuthorityModule;
