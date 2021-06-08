import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import sample04 from '../../audio/music-sample-04.mp3';

const DemoDownloadModule = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  console.log(errors);

  const formDownloadSubmit = (data) => {
    console.log(data);
    // eslint-disable-next-line no-use-before-define
    download(data);
  };

  async function download(data) {
    console.log('data!!! ');
    console.log(data.fileName);
    const filename = data.fileName;

    try {
      const result = await axios.get(`http://localhost:8080/api/v1/downloadFile/${filename}`, {
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'audio/mp3',
        },
      });
      console.log(result);
      const blob = new Blob([result.data], {
        type: 'audio/mp3',
      });
      const objectURL = URL.createObjectURL(blob);
      const downloadLink = document.createElement('a');
      document.body.appendChild(downloadLink);
      console.log(`downloadLink ${downloadLink}`);
      console.log(`objectURL ${objectURL}`);
      downloadLink.href = objectURL;
      downloadLink.download = filename;
      downloadLink.style.display = 'none';
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (e) {
      console.error(e);
    }
  }

  return (

    <div className="content-box">
      <form id="file-downloader" onSubmit={handleSubmit(formDownloadSubmit)}>
        <label htmlFor="fileName">
          File name
          <input
            type="text"
            id="fileName"
            name="fileName"
            {...register('fileName', {
              required: 'Please enter your file name',
            })}
          />
        </label>
        <input className="btn" type="submit" name="" value="Download" />
      </form>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio controls>
        <source src={sample04} />
      </audio>
    </div>
  );
};

export default DemoDownloadModule;
