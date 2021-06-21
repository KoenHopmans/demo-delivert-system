import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import axios from 'axios';
// disable eslint next line
import './AllUsersDemosList.css';
// import { useHistory } from 'react-router-dom';
import NewDemo from '../../ReusableComponents/NewDemo/NewDemo';
import { userContext } from '../../contexts/UserProvider';

const AllUsersDemosList = () => {
  // const history = useHistory();

  const [users, setUsers] = useState([]);
  const audioRef = useRef(null);
  const { setAdmin } = useContext(userContext);
  async function fetchData() {
    try {
      const result = await axios.get('http://localhost:8080/api/v1/users/');
      setUsers(result.data);
      console.log('result.data');
      console.log(result.data);
    } catch (e) {
      console.error(e);
    }
  }

  // const stopPlay = () => {
  //   if (audioRef.current && audioRef.current.pause());
  // };

  // async function downloadFile(fileName) {
  //   console.log('fileName!!! ');
  //   console.log(fileName);
  //
  //   try {
  //     const result = await axios.get(`http://localhost:8080/api/v1/downloadFile/${fileName}`, {
  //       responseType: 'arraybuffer',
  //       headers: {
  //         'Content-Type': 'audio/mp3',
  //       },
  //     });
  //     console.log(result);
  //     const blob = new Blob([result.data], {
  //       type: 'audio/mp3',
  //     });
  //     const objectURL = URL.createObjectURL(blob);
  //     const downloadLink = document.createElement('a');
  //     document.body.appendChild(downloadLink);
  //     console.log(`downloadLink ${downloadLink}`);
  //     console.log(`objectURL ${objectURL}`);
  //     downloadLink.href = objectURL;
  //     downloadLink.download = fileName;
  //     downloadLink.style.display = 'none';
  //     downloadLink.click();
  //     document.body.removeChild(downloadLink);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  // async function playFile(fileName) {
  //   console.log('fileName!!! ');
  //   console.log(fileName);
  //
  //   try {
  //     const result = await axios.get(`http://localhost:8080/api/v1/downloadFile/${fileName}`, {
  //       responseType: 'arraybuffer',
  //       headers: {
  //         'Content-Type': 'audio/mp3',
  //       },
  //     });
  //     console.log(result);
  //     const blob = new Blob([result.data], {
  //       type: 'audio/mp3',
  //     });
  //     const objectURL = URL.createObjectURL(blob);
  //     // const audio = new Audio(objectURL);
  //     if (audioRef.current && audioRef.current.pause());
  //     audioRef.current = new Audio(objectURL);
  //     // audio.load();
  //     // await audio.play();
  //     audioRef.current.play();
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  useEffect(() => {
    fetchData();
    return () => {
      if (audioRef.current && audioRef.current.pause());
      setAdmin(true);
    };
  }, []);

  return (
    <div className="user-demos-container">
      <div>
        <h1>User Demos</h1>
        {
                    users.map((user) => (
                      <div className="user-container">
                        <div>{user.username}</div>
                        <div className="user-demos">
                          {user.demos.map((item) => (
                            <NewDemo item={item} />
                            // <div className="music-file">
                            //   <div>{item.demo}</div>
                            //   <button
                            //     onClick={() => history.push(`/demo-options/${item.demo}`,
                            //     { from: 'App' })}
                            //     type="button"
                            //   >
                            //     options
                            //   </button>
                            //   <button
                            //     onClick={() => { downloadFile(item.demo); }}
                            //     type="submit"
                            //   >
                            //     download
                            //   </button>
                            //   <button
                            //     onClick={() => { playFile(item.demo); }}
                            //     type="submit"
                            //   >
                            //     play
                            //   </button>
                            // </div>
                          ))}
                        </div>
                      </div>
                    ))
                }
      </div>
      {/* <button */}
      {/*  className="btn sample-player" */}
      {/*  onClick={() => { stopPlay(); }} */}
      {/*  type="submit" */}
      {/* > */}
      {/*  pause */}
      {/* </button> */}
    </div>
  );
};

export default AllUsersDemosList;
