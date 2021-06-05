import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UsersList.css';

const UsersList = () => {
  const [users, setUsers] = useState([]);

  async function fetchData() {
    try {
      const result = await axios.get('http://localhost:8080/api/v1/producers/');
      setUsers(result.data);
      console.log(`This is the get header ${result.request.header}`);
    } catch (e) {
      console.error(e);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <table className="users-table" type="button">
        <thead>
          <tr>
            <td>Id</td>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Email</td>
            <td>Password</td>
          </tr>
        </thead>
        <tbody>
          {
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
