import React, { useEffect, useState } from 'react';
import axios from 'axios';
import profileImage from '../../images/dj-default-gray.png';
import './ProfileImage.css';

const ProfileImage = (photo) => {
  // Hooks
  const [url, setUrl] = useState(profileImage);

  // Functions
  async function fetchPhoto() {
    try {
      const result = await axios.get(`http://localhost:8080/api/v1/downloadFile/${photo.photo}`, {
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'image/jpg',
        },
      });
      const blob = new Blob([result.data], {
        type: 'image/jpg',
      });
      const objectURL = URL.createObjectURL(blob);
      setUrl(objectURL);
    } catch (e) {
      console.error(e);
    }
  }

  // Effects
  useEffect(() => {
    fetchPhoto();
  }, []);

  return (
    <div>
      <button type="button" className="image-btn">
        <div className="small-hexagon-shape">
          <img src={url} alt="profile" />
        </div>
      </button>
    </div>
  );
};

export default ProfileImage;
