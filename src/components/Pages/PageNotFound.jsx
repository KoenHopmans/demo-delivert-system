import React from 'react';
import './PageNotFound.css';
import { Link } from 'react-router-dom';
import cartoon from '../../images/cartoon-page-not-found.png';
import BackgroundVideo from '../ReusableComponents/BackgroundVideo/BackgroundVideo';

function PageNotFound() {
  return (
    <div>
      <BackgroundVideo video="pageNotFound" />
      <div className="pnf-container">
        <h1 className="pnf-header">404</h1>
        <h2 className="pnf-text">
          OOPS, THE PAGE YOU ARE LOOKING FOR CAN&#39;T BE FOUND!
        </h2>
        <div className="pnf-home-btn">

          <Link to="/" className="pnf-home-button">
            BACK TO HONEPAGE
          </Link>

        </div>
        <div className="cartoon-container">
          <img className="cartoon" src={cartoon} alt="lp player" />
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
