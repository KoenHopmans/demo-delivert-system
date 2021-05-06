import React from 'react';
import './HexagonProfile.css';
import photo01 from '../../../images/dj-profile-photo-01.jpg';
import photo02 from '../../../images/dj-profile-photo-02.jpg';

// eslint-disable-next-line react/prop-types
const HexagonProfile = ({ photo = 'photo01' }) => {
  const chosenPhoto = () => {
    switch (photo) {
      case 'photo01':
        return photo01;
      case 'photo02':
        return photo02;
      default:
        return photo01;
    }
  };
  return (
    <article className="producer-example">
      <div className="hexagon-box">
        <img
          src={chosenPhoto()}
          alt="profile"
        />
      </div>
      <p> Name 1</p>
    </article>
  );
};

export default HexagonProfile;
