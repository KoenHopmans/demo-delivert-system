import peru from '../../audio/peru.mp3';
import opener from '../../audio/opener.mp3';
import skydance from '../../audio/skydance.mp3';
import redHexagon from '../../images/hexagon-red.jpeg';
import greenHexagon from '../../images/hexagon-green.jpeg';
import purpleHexagon from '../../images/hexagon-purple.jpeg';

export default [
  {
    id: 1,
    title: 'Sun  Intro',
    artist: 'Marco Taylor',
    audioSrc: opener,
    image: redHexagon,
    color: 'red',

  },
  {
    id: 2,
    title: 'Skydance',
    artist: 'Robin Montoro',
    audioSrc: skydance,
    image: purpleHexagon,
    color: 'purple',

  },
  {
    id: 3,
    title: 'Keeping Your Head Up',
    artist: 'Sophie Lombardo',
    audioSrc: peru,
    image: greenHexagon,
    color: 'green',
  },
];
