import React, { Fragment } from 'react';
import { Button, Row, Col } from 'reactstrap';
import { Form, Input, Select } from '@rocketseat/unform';
import moment from 'moment';

const FormAddJustificativa = props => {
  const faltas = props.faltas.map(falta => {
    return { id: falta.data, title: moment(falta.data).format('DD/MM/YYYY') };
  });

  return (
    <Fragment>
      <div className='container'>
        <h2>Justificando Falta</h2>
        <Form onSubmit={props.onSubmitJustificativa}>
          <Input name='id' className='d-none' />
          <Row className='justify-content-md-center'>
            <Col md={4} className='text-center'>
              Falta:
              <Select
                name='data'
                options={faltas}
                className='form-control'
                title='Lista de faltas existentes'
              />
            </Col>
            <Col md={8} className='text-center'>
              Justificativa:
              <Input
                name='justificativa'
                type='text'
                className='form-control'
                title='Justificativa da falta'
              />
            </Col>
            <Col md={6} className='text-center'>
              <Button color='success' type='submit'>
                Confirmar
              </Button>
            </Col>
            <Col md={6} className='text-center'>
              <Button color='danger' onClick={props.onCancel}>
                Cancelar
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </Fragment>
  );
};

export default FormAddJustificativa;
