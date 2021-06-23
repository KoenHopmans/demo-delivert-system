import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { BiUser, BiKey } from 'react-icons/bi';
import { BsExclamationCircle } from 'react-icons/bs';
// import AllUsersList from '../MainComponentsModules/UsersRolesList/AllUsersList';
import { useParams } from 'react-router';
import AllUsersDemosList from '../MainComponentsModules/UsersDeomosList/AllUsersDemosList';
import { userContext } from '../contexts/UserProvider';

const HexagonMain = () => {
  const params = useParams();
  const { setAdminUser, adminUser } = useContext(userContext);

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

  useEffect(() => {
    setAdminUser(params.role);
  }, []);

  return (
    <div className="mainContentContainer">
      <div className="mainContent">
        <div className="content-box">
          <h2 style={{ border: '2px blue solid' }}>
            {adminUser}
          </h2>
          <h1>Hexagon</h1>
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
          {/* <AllUsersList /> */}
          <AllUsersDemosList />
        </div>
      </div>
    </div>
  );
};

export default HexagonMain;
