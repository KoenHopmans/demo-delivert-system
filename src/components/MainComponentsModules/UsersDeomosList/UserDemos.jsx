import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
// disable eslint next line
import './AllUsersDemosList.css';
// import { useHistory } from 'react-router-dom';
import NewDemo from '../../ReusableComponents/NewDemo/NewDemo';

const UserDemos = () => {
  const params = useParams();
  // const history = useHistory();
  const initial = { demos: [] };

  const [myUser, setMyUser] = useState(initial);
  // const audioRef = useRef(null);
  async function fetchData() {
    try {
      const result = await axios.get(`http://localhost:8080/api/v1/users/${params.user}`);
      setMyUser(result.data);
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
    // return () => {
    //   if (audioRef.current && audioRef.current.pause());
    // };
  }, []);

  console.log('demos', myUser.demos);

  return (
    <div className="user-demos-container">
      <div>
        <h1>User Demos</h1>
        <div className="user-container">
          <div>{myUser.username}</div>
          <div className="user-demos">
            {myUser.demos.map((item) => (
              <div>
                <NewDemo item={item} />
                {/* <div className="music-file"> */}
                {/*  /!* <div>{item.demo}</div> *!/ */}
                {/*  <div>{item.trackName}</div> */}
                {/*  <button */}
                {/*    onClick={() => history.push(`/demo-options/${item.demo}`,
                { from: 'App' })} */}
                {/*    type="button" */}
                {/*  > */}
                {/*    options */}
                {/*  </button> */}
                {/*  <button */}
                {/*    onClick={() => { downloadFile(item.demo); }} */}
                {/*    type="submit" */}
                {/*  > */}
                {/*    download */}
                {/*  </button> */}
                {/*  <button */}
                {/*    onClick={() => { playFile(item.demo); }} */}
                {/*    type="submit" */}
                {/*  > */}
                {/*    play */}
                {/*  </button> */}
                {/* </div> */}
              </div>
            ))}
          </div>
        </div>
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

export default UserDemos;
