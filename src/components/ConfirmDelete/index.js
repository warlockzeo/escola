import React, { Fragment } from 'react';
import { Card, Button } from 'reactstrap';

const ConfirmDelete = props => {
  return (
    <Fragment>
      <div className='wrap100vh'>
        <Card className='dashboard__card'>
          <p>Confirma exclusão da Disciplina {props.info}?</p>
          <Button color='success' onClick={props.delete}>
            Sim
          </Button>
          <Button color='danger' onClick={props.cancel}>
            Não
          </Button>
        </Card>
      </div>
    </Fragment>
  );
};

export default ConfirmDelete;
