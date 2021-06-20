import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { BiUser, BiKey } from 'react-icons/bi';
import { BsExclamationCircle } from 'react-icons/bs';
import AllUsersList from '../MainComponentsModules/UsersRolesList/AllUsersList';
import AllUsersDemosList from '../MainComponentsModules/UsersDeomosList/AllUsersDemosList';

const HexagonMain = () => {
  // Functions
  async function postData(payload) {
    console.log('hallo post data ');
    try {
      await axios.post(`http://localhost:8080/api/v1/users/${payload.username}/authorities`, payload);
    } catch (e) {
      console.error(e);
    }
  }
  const { register, handleSubmit, formState: { errors } } = useForm();
  const formSubmit = (data) => {
    postData(data);
  };
  return (
    <div className="mainContentContainer">
      <div className="mainContent">
        <div className="content-box">
          <h1>Hexagon</h1>
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="text-box">
              <BiUser />
              <label htmlFor="username" className="inputLabel">
                Username
                <input
                  id="username"
                  type="text"
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
              <BiKey />
              <label htmlFor="authority" className="inputLabel">
                Authority
                <input
                  id="authority"
                  type="authority"
                  placeholder="Enter your authority"
                  {...register('authority', {
                    required: 'Please enter your authority',
                    minLength: { value: 4, message: 'At least 4 characters' },

                  })}
                />
                {errors.authority && (
                <div className="error">
                  <BsExclamationCircle />
                  {errors.authority.message}
                </div>
                )}
              </label>
            </div>
            <input className="btn" type="submit" name="" value="Save" />
          </form>
        </div>
        <AllUsersList />
        <AllUsersDemosList />
      </div>
    </div>
  );
};

export default HexagonMain;
