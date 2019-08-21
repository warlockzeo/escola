import React, { Fragment } from 'react';

const Ensino = props => {
  const escola = props.escola;
  return (
    <Fragment>
      <h1>Educação Infantil</h1>
      {escola.infantil}
      <h1>Fundamental I</h1>
      {escola.fundamental1}
      <h1>Fundamental II</h1>
      {escola.fundamental2}
    </Fragment>
  );
};

export default Ensino;
