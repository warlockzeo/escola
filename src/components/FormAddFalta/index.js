import React, { Fragment } from 'react';
import { Button, Row, Col } from 'reactstrap';
import { Form, Input, Select } from '@rocketseat/unform';

const FormAddFalta = props => {
  return (
    <Fragment>
      <div className='container'>
        <h2>Informando Falta</h2>
        <Form onSubmit={props.onSubmit} initialData={props.dados}>
          <Input name='idAluno' className='d-none' />
          <Input name='idTurma' className='d-none' />
          <Row className='justify-content-md-center'>
            <Col md={3} className='text-center'>
              Data:
              <Input
                name='data'
                type='date'
                className='form-control'
                title='Data da falta'
              />
            </Col>
            <Col md={3} className='text-center'>
              Disciplina:
              <Select
                name='disciplina'
                options={props.disciplinas}
                className='form-control'
                title='Disciplina em que faltou'
              />
            </Col>
            <Col md={3} className='text-center'>
              <Button color='success' type='submit'>
                Confirmar
              </Button>
            </Col>
            <Col md={3} className='text-center'>
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

export default FormAddFalta;
