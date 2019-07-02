import React, { Fragment } from 'react';
import { Card, Button } from 'reactstrap';

import './styles.css';

const ConfirmDelete = props => {
  return (
    <Fragment>
      <div className='wrap100vh confirmDelete'>
        <Card className='dashboard__card'>
          <p>Confirma exclusão {props.info}?</p>
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
