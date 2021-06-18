import React from 'react';
import { useForm } from 'react-hook-form';
import { BiMessageEdit } from 'react-icons/bi';
import {
  BsExclamationCircle,
} from 'react-icons/bs';
import '../MainComponents/MainContent.css';
import axios from 'axios';
import { useParams } from 'react-router';

// import LoadingAnimation from '../ReusableComponents/Animations/LoadingAnimation';

const AddCommentMudule = () => {
  const params = useParams();

  async function postData(payload) {
    console.log('hallo post data ');
    try {
      const resp = await axios.post(`http://localhost:8080/api/v1/${params.demo}/comment`, payload);
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
    postData(data);
  };

  console.log(errors);
  return (
    <div className="content-box">
      <div className="text-box">
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="text-box">
            <BiMessageEdit />
            <label htmlFor="comment" className="inputLabel">
              New Comment
              <input
                id="comment"
                type="comment"
                placeholder="Enter your new comment"
                {...register('comment')}
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
    </div>

  );
};

export default AddCommentMudule;
