import React from 'react';
import './HomeMain.css';
import { useHistory } from 'react-router-dom';
import InfiniteText from '../ReusableComponents/InfiniteTextAnnimation/InfiniteText';
import UserExample from '../ReusableComponents/UserExample/UserExample';

const HomeMainContent = () => {
  const history = useHistory();
  return (
    <div className="home-main-content-container">
      <div className="home-main-content">
        <div className="home-box">

          <div className="btn-container">
            <button
              onClick={() => history.push('/login', { from: 'App' })}
              type="button"
              className="btn homePageBtn"
            >
              Login
            </button>
            <button
              onClick={() => history.push('/sign-up', { from: 'App' })}
              type="button"
              className="btn homePageBtn"
            >
              Sign up
            </button>
          </div>

          <div className="question">
            What is
            <a href="#about-soundport"> soundport?</a>
          </div>
        </div>
        <InfiniteText />
        <UserExample
          name="Sophie Lombardo"
          genre="Bass house"
          comment="I make happy bass house music. The collaboration with Hexagon is fantastic."
          photo="photo01"
        />
        <UserExample
          name="Marco Taylor"
          genre="Techno house"
          comment="My specialty is intros. Don Diablo helped me to a higher level."
          photo="photo02"
        />
        <UserExample
          name="Robin Montoro"
          genre="Electronic Dance"
          comment="The feedback has made my music even better. Thanks Don Diablo!"
          photo="photo03"
        />

        <section className="about-soundport" id="about-soundport">
          <h1>Soundport</h1>
          <p>
            With soundport you can share your own music demo&#39;s with
            us.
            <br />
            It is the next step for rising producers.
            <br />
            Upload your music and we will listen to it.
            <br />
            You get personal feedback from don diablo.
            <br />
            Maybe we even want to use your music and work with you.
            <br />
            We will support you with your music and hopefully we can help you to the next
            level.
          </p>
        </section>
      </div>
    </div>
  );
};

export default HomeMainContent;
