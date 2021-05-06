/* eslint-disable react/prop-types */
import React from 'react';
import './NavigationBarBtn.css';
import {
  FiEdit, FiPlusSquare, FiLayers, FiHexagon,
} from 'react-icons/fi';
import {
  BiLogOutCircle, BiLogInCircle, BiUserPlus, BiUserCircle,
} from 'react-icons/bi';

const NavigationBarBtn = ({ myIcon, titleName }) => {
  const name = {
    login: <BiLogInCircle />,
    signUp: <BiUserPlus />,
    addDemo: <FiPlusSquare />,
    signOut: <BiLogOutCircle />,
    demos: <FiLayers />,
    profile: <BiUserCircle />,
    demoOptions: <FiEdit />,
    hexagon: <FiHexagon />,
  };
  return (
    <div className="navigation-bar__btn">
      <div>
        <div className="myIcon">{name[myIcon]}</div>
        <div>{titleName}</div>
      </div>
    </div>
  );
};

export default NavigationBarBtn;
