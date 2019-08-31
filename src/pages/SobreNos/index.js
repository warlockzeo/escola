import React from 'react';
import { connect } from 'react-redux';

const SobreNos = props => {
  return <div style={{ width: '40%', textAlign: 'left' }}>{props.sobre}</div>;
};

const mapStateToProps = state => ({
  ...state.escola.data
});

export default connect(mapStateToProps)(SobreNos);
