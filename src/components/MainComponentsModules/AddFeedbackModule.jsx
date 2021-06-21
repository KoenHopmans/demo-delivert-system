import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { BiMessageEdit } from 'react-icons/bi';
import {
  BsExclamationCircle,
} from 'react-icons/bs';
import '../MainComponents/MainContent.css';
import axios from 'axios';
import { useParams } from 'react-router';
import { userContext } from '../contexts/UserProvider';

// import LoadingAnimation from '../ReusableComponents/Animations/LoadingAnimation';

const AddFeedbackModule = () => {
  const params = useParams();
  const { currentUser } = useContext(userContext);

  async function postData(payload) {
    console.log('hallo post data ');
    try {
      const resp = await axios.post(`http://localhost:8080/api/v1/${params.demo}/feedback`, payload);
      console.log(`payload${payload}`);
      console.log(resp.data);
      // if (!(resp.status === undefined)) { history.goBack(); }
    } catch (e) {
      console.error(e);
    }
  }

  const {
    register, handleSubmit, formState: { errors },
  } = useForm();

  const formSubmit = (data) => {
    console.log(data);
    if (!(data.feedback)) {
      // eslint-disable-next-line no-param-reassign
      data.feedback = data.prefix;
    }
    console.log('data', data);
    postData(data);
  };

  // const test = 'test';

  console.log(errors);
  return (
    <div className="content-box">
      <div className="text-box">
        <h2 style={{ border: '2px green solid' }}>
          {currentUser}
        </h2>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="text-box">
            <BiMessageEdit />
            <label htmlFor="feedback" className="inputLabel">
              Prefix Feedback
              <select
                id="prefix"
                type="prefix"
                placeholder="Enter your new prefix"
                {...register('prefix')}
              >
                <option>
                  Hallo
                  {' '}
                  {currentUser}
                  , thanks for upload, you have a unique sound.
                </option>
                <option>
                  well done
                  {' '}
                  {currentUser}
                  , nice beat. We want to hear more music from you.
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
                  , you make good quality music, We would like to invite you.
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
      </div>
    </div>

  );
};

export default AddFeedbackModule;
