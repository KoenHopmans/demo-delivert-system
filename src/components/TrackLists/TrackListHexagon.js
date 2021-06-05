import redHexagon from '../../images/hexagon-red.jpeg';
import greenHexagon from '../../images/hexagon-green.jpeg';
import purpleHexagon from '../../images/hexagon-purple.jpeg';
import goldHexagon from '../../images/hexagon-gold.jpeg';
import keepingYourHeadUp from '../../audio/keeping-your-head-up.mp3';
import momentum from '../../audio/momentum.mp3';
import problems from '../../audio/problems.mp3';
import whatchuDo from '../../audio/whatchu-do.mp3';

export default [
  {
    id: 1,
    title: 'Problems',
    artist: 'Don Diablo',
    audioSrc: problems,
    image: purpleHexagon,
    color: 'purple',
  },
  {
    id: 2,
    title: 'Momentum',
    artist: 'Don Diablo',
    audioSrc: momentum,
    image: redHexagon,
    color: 'red',
  },
  {
    id: 3,
    title: 'Keeping Your Head Up',
    artist: 'Don Diablo',
    audioSrc: keepingYourHeadUp,
    image: greenHexagon,
    color: 'green',
  },
  {
    id: 4,
    title: 'Whatchu Do',
    artist: 'Don Diablo',
    audioSrc: whatchuDo,
    image: goldHexagon,
    color: 'gold',
  },
];