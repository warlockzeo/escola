import React, { Fragment } from 'react';

const BarraBusca = props => {
  return (
    <Fragment>
      <input
        type='text'
        placeholder='O que procura?'
        name='busca'
        onChange={e => props.change(e.currentTarget.value)}
        className='form-control'
        style={{ marginTop: 10 }}
      />
    </Fragment>
  );
};

export default BarraBusca;
