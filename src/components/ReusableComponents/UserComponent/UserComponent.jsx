import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserComponent = () => {
  const [users, setUsers] = useState([]);

  async function fetchData() {
    try {
      const result = await axios.get('http://localhost:8080/api/v1/producers/');
      setUsers(result.data);
      console.log(`this is the header send to backend: ${result.request.header}`);
    } catch (e) {
      console.error(e);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  function handleClick(e) {
    e.preventDefault(
      fetchData(),
    );
  }

  return (
    <div>
      <h1>test</h1>
      <button type="button" style={{ border: '2px red solid', background: 'white' }} onClick={handleClick}>Fetch Data</button>
      <table type="button" style={{ border: '2px black solid', background: 'white' }}>
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

export default UserComponent;
