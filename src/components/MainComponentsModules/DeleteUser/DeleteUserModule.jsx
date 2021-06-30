import React, { useContext } from 'react';
import { BiUser } from 'react-icons/bi';
import { BsExclamationCircle } from 'react-icons/bs';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { userContext } from '../../contexts/UserProvider';

const DeleteUserModule = () => {
  console.log('demos');
  const { update, toggleUpdate } = useContext(userContext);
  async function postData(payload) {
    console.log('hallo post data ');
    try {
      await axios.delete(`http://localhost:8080/api/v1/users/${payload.username}`, payload);
      toggleUpdate(!update);
    } catch (e) {
      console.error(e);
    }
  }
  const { register, handleSubmit, formState: { errors } } = useForm();
  const formSubmit = (data) => {
    const checkedData = data;
    if (data.username === 'Don Diablo') {
      checkedData.username = '';
    }
    postData(checkedData);
  };

  return (
    <form onSubmit={handleSubmit(formSubmit)}>
      <div className="text-box">
        <BiUser />
        <label htmlFor="username" className="inputLabel">
          Username to delete
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
      <input className="btn" type="submit" name="" value="Delete" />
    </form>
  );
};

export default DeleteUserModule;
