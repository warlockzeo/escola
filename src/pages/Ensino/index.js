import React, { Fragment } from 'react';
import { connect } from 'react-redux';

const Ensino = props => {
  return (
    <Fragment>
      <h1>Educação Infantil</h1>
      {props.infantil}
      <h1>Fundamental I</h1>
      {props.fundamental1}
      <h1>Fundamental II</h1>
      {props.fundamental2}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  ...state.escola.data
});

export default connect(mapStateToProps)(Ensino);
