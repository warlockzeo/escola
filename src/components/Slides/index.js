import React from 'react';
import { Zoom } from 'react-slideshow-image';
import './styles.css';

const zoomOutProperties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: false,
  scale: 0.4,
  arrows: false
};

const Slideshow = props => {
  return (
    <Zoom {...zoomOutProperties}>
      {props.images.map((each, index) => (
        <div
          className='each-image'
          key={index}
          style={{
            backgroundImage: `url(${each})`
          }}
        />
      ))}
    </Zoom>
  );
};

export default Slideshow;
