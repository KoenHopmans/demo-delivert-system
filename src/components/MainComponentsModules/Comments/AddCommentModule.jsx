import React, { useContext } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import '../../MainComponents/MainContent.css';
import { useParams } from 'react-router';
import { BiMessageEdit } from 'react-icons/bi';
import { BsExclamationCircle } from 'react-icons/bs';
import { userContext } from '../../contexts/UserProvider';

const AddCommentModule = () => {
  // Hooks
  const params = useParams();
  const {
    register, handleSubmit, formState: { errors },
  } = useForm();
  const {
    toggleUpdate, update, adminUser, currentUser,
  } = useContext(userContext);

  // Functions
  async function postData(payload) {
    try {
      await axios.post(`http://localhost:8080/api/v1/${params.demo}/comment`, payload);
      toggleUpdate(!update);
    } catch (e) {
      console.error(e);
    }
  }

  const formSubmit = (data) => {
    data.date = new Date().toLocaleString();
    if (adminUser) { data.messenger = adminUser; } else { data.messenger = currentUser; }
    postData(data);
  };

  return (
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
  );
};

export default AddCommentModule;
