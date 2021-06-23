import React, {
  useEffect, useState,

} from 'react';
import axios from 'axios';
import profileImage from '../../images/dj-default-gray.png';
import './ProfileImage.css';

const ProfileImage = (
  photo,
) => {
  // eslint-disable-next-line react/destructuring-assignment
  console.log('PHOTO!!!!', photo.photo);
  const [url, setUrl] = useState(profileImage);
  async function fetchPhoto() {
    try {
      const result = await axios.get(`http://localhost:8080/api/v1/downloadFile/${photo.photo}`, {
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'image/jpg',
        },
      });
      console.log('RESULT', result);
      const blob = new Blob([result.data], {
        type: 'image/jpg',
      });
      const objectURL = URL.createObjectURL(blob);
      setUrl(objectURL);
    } catch (e) {
      console.error(e);
    }
  }
  useEffect(() => {
    console.log('ITEM!!!', photo.photo);
    fetchPhoto();
  }, []);

  return (
    <div>
      <button type="button" id="my-button">
        <div className="small-hexagon-shape">
          <img src={url} alt="profile" />
        </div>
      </button>
    </div>
  );
};

export default ProfileImage;
