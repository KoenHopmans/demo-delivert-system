import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { BiMessageEdit } from 'react-icons/bi';
import {
  BsExclamationCircle,
} from 'react-icons/bs';
import '../../MainComponents/MainContent.css';
import axios from 'axios';
import { useParams } from 'react-router';
import { userContext } from '../../contexts/UserProvider';

// import LoadingAnimation from '../ReusableComponents/Animations/LoadingAnimation';

const AddCommentModule = () => {
  const params = useParams();
  const {
    toggleUpdate, update, adminUser, currentUser,
  } = useContext(userContext);

  async function postData(payload) {
    console.log('hallo post data ');
    try {
      const resp = await axios.post(`http://localhost:8080/api/v1/${params.demo}/comment`, payload);
      console.log(`payload${payload}`);
      console.log(resp.data);
      toggleUpdate(!update);
    } catch (e) {
      console.error(e);
    }
  }

  const {
    register, handleSubmit, formState: { errors },
  } = useForm();

  const formSubmit = (data) => {
    console.log(data);
    // eslint-disable-next-line no-param-reassign
    data.date = new Date().toLocaleString();
    // eslint-disable-next-line no-param-reassign
    if (adminUser) { data.messenger = adminUser; } else { data.messenger = currentUser; }
    postData(data);
  };

  console.log(errors);
  return (
    <div className="text-box">
      <form onSubmit={handleSubmit(formSubmit)}>
        <div className="text-box">
          <BiMessageEdit />
          <label htmlFor="comment" className="inputLabel">
            New Comment
            <input
              id="comment"
              type="text"
              placeholder="Enter your new comment"
              {...register('comment', {
                required: 'Please enter your comment',
              })}
            />
            {errors.comment && (
            <div className="error">
              <BsExclamationCircle />
              {errors.comment.message}
            </div>
            )}
          </label>
        </div>
        <input id="change-btn" type="submit" name="" value="Add" />
      </form>
    </div>

  );
};

export default AddCommentModule;
