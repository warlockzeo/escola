import React from 'react';
import './styles.css';

const Slideshow = props => {
  return (
    <div className="back-slider">
      <img src={`${props.images[0]}`} style={{width: '100%', height: 'auto'}} alt='' />
      <ul className="cb-slideshow">
        {props.images.map((each, index, arr) => {
          return(
          <li key={index} style={{
            animationDelay: `${index * (20 / arr.length)}s`
          }}>
            <a href="#">
              <img src={`${each}`} alt='Foto de banner' />
            </a>
          </li>)
        })}
      </ul>
    </div>
  );
};

export default Slideshow;
