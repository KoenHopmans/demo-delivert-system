import React, { useContext } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import '../../MainComponents/MainContent.css';
import { useParams } from 'react-router';
import { BiMessageEdit } from 'react-icons/bi';
import { BsExclamationCircle } from 'react-icons/bs';
import { userContext } from '../../context/UserProvider';

// Hooks
const AddFeedbackModule = () => {
  const {
    currentUser, adminUser,
    toggleUpdate, update,
  } = useContext(userContext);
  const {
    register, handleSubmit, formState: { errors },
  } = useForm();
  const params = useParams();

  // functions
  async function postData(payload) {
    console.log('hallo post data ');
    try {
      const resp = await axios.post(`http://localhost:8080/api/v1/${params.demo}/feedback`, payload);
      console.log(`payload${payload}`);
      console.log(resp.data);
      toggleUpdate(!update);
    } catch (e) {
      console.error(e);
    }
  }

  const formSubmit = (data) => {
    console.log(data);
    if (!(data.feedback)) {
      data.feedback = data.presetFeedback;
    }
    data.date = new Date().toLocaleString();
    data.messenger = adminUser;
    console.log('data', data);
    postData(data);
  };

  return (
    <form onSubmit={handleSubmit(formSubmit)}>
      <div className="text-box">
        <BiMessageEdit />
        <label htmlFor="feedback" className="inputLabel">
          Preset Feedback
          <select
            id="presetFeedback"
            type="presetFeedback"
            placeholder="Enter your new presetFeedback"
            {...register('presetFeedback')}
          >
            <option>
              Hi
              {' '}
              {currentUser}
              , Your music sounds very nice.
            </option>
            <option>
              Hi
              {' '}
              {currentUser}
              , well done!
            </option>

            <option>
              Hallo
              {' '}
              {currentUser}
              , thanks for upload, you have a unique sound.
            </option>
            <option>
              Well done
              {' '}
              {currentUser}
              , nice beat. We want to hear more music from you.
            </option>
            <option>
              Hi
              {' '}
              {currentUser}
              , you make good quality music, We would like to invite you.
            </option>
            <option>
              Hi
              {' '}
              {currentUser}
              , sorry this is not quite right yet. please try again. we believe you can do it.
            </option>
            <option>
              Thanks
              {' '}
              {currentUser}
              , keep it simple, try not to mix too many sounds together
            </option>
            <option>
              Hi
              {' '}
              {currentUser}
              , Try to make your music more special. Don&#39;t be afraid to try new things.
            </option>
            <option>
              Hi
              {' '}
              {currentUser}
              , This video from Malarkey might help you: https://www.youtube.com/watch?v=GQfSLh26IuA
            </option>
          </select>
        </label>
      </div>
      <div className="text-box">
        <BiMessageEdit />
        <label htmlFor="feedback" className="inputLabel">
          Custom Feedback
          <input
            id="feedback"
            type="feedback"
            placeholder="Enter your new feedback"
            {...register('feedback')}
          />
          {errors.feedback && (
            <div className="error">
              <BsExclamationCircle />
              {errors.feedback.message}
            </div>
          )}
        </label>
      </div>
      <input id="change-btn" type="submit" name="" value="Add" />
    </form>
  );
};

export default AddFeedbackModule;
