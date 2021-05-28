/* eslint-disable react/prop-types */
import React from 'react';
import './UserExample.css';
import photo01 from '../../../images/dj-profile-photo-01.jpg';
import photo02 from '../../../images/dj-profile-photo-02.jpg';
import photo03 from '../../../images/dj-profile-photo-03.jpg';

const UserExample = ({
  name, genre, comment, photo,
}) => {
  const chosenPhoto = () => {
    switch (photo) {
      case 'photo01':
        return photo01;
      case 'photo02':
        return photo02;
      case 'photo03':
        return photo03;
      default:
        return photo01;
    }
  };
  return (
    <div className="user-example">
      <div className="hexagon-shape-container">
        <div className="hexagon-shape">
          <img
            src={chosenPhoto()}
            alt="profile"
          />
        </div>
      </div>
      <h2>{name}</h2>
      <div>
        <p>{genre}</p>
      </div>
      <div>
        {comment}
      </div>
    </div>
  );
};

export default UserExample;
