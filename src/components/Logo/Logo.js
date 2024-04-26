import React from "react";
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import brain from './brain.png';

const Logo = () => {
  return (
    <div className="ma4 mt0 mw4">
      <Tilt  className='br2 shadow-2 Tilt' tiltMaxAngleX={35} tiltMaxAngleY={35} >
        <div>
          <div><img src={brain}  alt='brain'/></div>
        </div>
      </Tilt>
    </div>
  );
}

export default Logo;
