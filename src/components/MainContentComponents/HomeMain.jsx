import React from 'react';
import './HomeMain.css';
import { useHistory } from 'react-router-dom';
import { BsQuestionCircle } from 'react-icons/bs';
import InfiniteText from '../ReusableComponents/InfiniteTextAnnimation/InfiniteText';
import HexagonProfile from '../ReusableComponents/HexagonProfile/HexagonProfile';

const HomeMainContent = () => {
  const history = useHistory();
  return (
    <div className="home-main-content-container">
      <div className="home-main-content">
        <div className="home-box">

          <div className="btn-container">
            <button
              onClick={() => {
                history.goBack();
              }}
              type="button"
              className="btn"
            >
              Cancel
            </button>
            <button
              onClick={() => history.push('/', { from: 'App' })}
              type="button"
              className="btn"
            >
              Log Out
            </button>
          </div>
        </div>
        <div className="question">
          <BsQuestionCircle />
          <div>What is soundport?</div>
        </div>
        <InfiniteText />
        <HexagonProfile photo="photo01" />
        <HexagonProfile photo="photo02" />
        <section className="section section-a">
          <div className="container">
            <h1 id="about-soundport">Soundport</h1>
            <p>
              soundport is the way how you can share your own music demo&#39;s with
              us.
              <br />
              Upload your music and we&#39; ll listen to it.
              <br />
              You get personal feedback from don diablo.
              <br />
              Maybe we even want to use your music and work with you.
              <br />
              We will support you with your music and hopefully we can help you to the next
              level.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomeMainContent;
