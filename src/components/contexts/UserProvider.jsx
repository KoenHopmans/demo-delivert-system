import React, { createContext, useState } from 'react';

export const userContext = createContext();

export default function UserProvider(props) {
  const [currentUser, setCurrentUser] = useState('');
  const [currentDemo, setCurrentDemo] = useState('');
  const [currentBlob, setCurrentBlob] = useState({});
  const [trackName, setTrackName] = useState('');
  const [admin, setAdmin] = useState(false);
  const [playMusic, setPlayMusic] = useState('');
  const [clicked, setClicked] = useState('');
  console.log(setCurrentUser);
  return (
    <userContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        currentDemo,
        setCurrentDemo,
        currentBlob,
        setCurrentBlob,
        setTrackName,
        trackName,
        setPlayMusic,
        playMusic,
        admin,
        setAdmin,
        clicked,
        setClicked,
      }}
    >
      {/* eslint-disable-next-line react/destructuring-assignment */}
      {props.children}
    </userContext.Provider>
  );
}
