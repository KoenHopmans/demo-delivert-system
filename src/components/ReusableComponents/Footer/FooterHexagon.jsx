import React from 'react';
import './FooterHexagon.css';
import FooterHexagonLogo from '../../../Images/footer-hexagon.png';
import FooterHexagonImg from '../../../Images/footer__background-img.jpg';

const FooterHexagon = () => (
  <footer className="footer" id="footer">
    <div className="footer__content">
      <p>
        <a className="logo-facebook" href="https://www.facebook.com/HexagonHQ/" target="_blank" rel="noreferrer">
          <i
            className="fab fa-facebook"
          />
        </a>
      </p>
      <p>
        <a
          className="logo-youtube"
          href="https://www.youtube.com/channel/UCWp8Rc0qh08RZKlWxNfQ6PQ"
          target="_blank"
          rel="noreferrer"
        >
          <i
            className="fab fa-youtube"
          />
        </a>
      </p>
      <p>
        <a className="logo-instagram" href="https://www.instagram.com/hexagonhq/" target="_blank" rel="noreferrer">
          <i
            className="fab fa-instagram md-40"
          />
        </a>
      </p>
      <p>
        <a className="logo-twitter" href="https://twitter.com/hexagonhq" target="_blank" rel="noreferrer">
          <i
            className="fab fa-twitter"
          />
        </a>
      </p>
      <p>
        <a
          className="footer__hexagon-logo"
          href="https://www.hexagonhq.com/#homepage-section"
          target="_blank"
          rel="noreferrer"
        >
          <img className="footer-hexagon-logo-img" src={FooterHexagonLogo} alt="" />
        </a>
      </p>
      <p>
        <a className="logo-soundcloud" href="https://soundcloud.com/hexagon" target="_blank" rel="noreferrer">
          <i
            className="fab fa-soundcloud md-40"
          />
        </a>
      </p>
      <p>
        <a
          className="logo-apple"
          href="https://music.apple.com/us/artist/don-diablo/76849154"
          target="_blank"
          rel="noreferrer"
        >
          <i
            className="fab fa-apple"
          />
        </a>
      </p>
      <p>
        <a className="logo-snapchat" href="https://www.snapchat.com/add/dondiablo" target="_blank" rel="noreferrer">
          <i
            className="fab fa-snapchat-ghost"
          />
        </a>
      </p>
      <p>
        <a
          className="logo-spotify"
          href="https://open.spotify.com/artist/1l2ekx5skC4gJH8djERwh1"
          target="_blank"
          rel="noreferrer"
        >
          <i
            className="fab fa-spotify"
          />
        </a>
      </p>
    </div>
    <img className="footer__background-img" src={FooterHexagonImg} alt="Footer Hexagon" />
  </footer>
);

export default FooterHexagon;
