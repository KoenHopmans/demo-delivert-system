// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './AllUserList.css';
//
// const AllUsersList = () => {
//   const [users, setUsers] = useState([]);
//
//   async function fetchData() {
//     try {
//       const result = await axios.get('http://localhost:8080/api/v1/users/');
//       setUsers(result.data);
//       console.log('result.data');
//       console.log(result.data);
//     } catch (e) {
//       console.error(e);
//     }
//   }
//
//   useEffect(() => {
//     fetchData();
//   }, []);
//
//   return (
//     <div className="user-roles-container">
//       <div>
//         <h1>User Roles</h1>
//         {
//         users.map((user) => (
//           <div>
//             <div>{user.username}</div>
//             <div className="user-roles">
//               {user.authorities.map((item) => (
//                 <div>{item.authority}</div>
//               ))}
//             </div>
//           </div>
//         ))
//       }
//       </div>
//     </div>
//   );
// };
//
// export default AllUsersList;
