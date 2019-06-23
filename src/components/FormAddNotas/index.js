import React, { Component, Fragment } from 'react';
import { Button, Alert, Row, Col, Spinner } from 'reactstrap';
import { Form, Input } from '@rocketseat/unform';

import './styles.css';

class FormAddNotas extends Component {
  state = {
    formStatus: 'fill',
    formMessage: '',
    dados: {}
  };

  onSubmit = async data => {
    await this.props.onSubmit(data);
  };

  onCancel = e => {
    e.preventDefault();
    this.props.onCancel();
  };

  componentWillMount() {
    this.props.errorMessage
      ? this.setState({
          formMessage: this.props.errorMessage,
          formStatus: 'erro'
        })
      : this.setState({
          dados: this.props.dados
        });
  }

  render() {
    if (this.state.formStatus === 'fill') {
      return (
        <Fragment>
          <div className='container'>
            <h2>Informando Notas{this.props.dados.disciplina}</h2>
            <Form onSubmit={this.props.onSubmit} initialData={this.state.dados}>
              <Input name='id' className='d-none' />
              <Row className='justify-content-md-center'>
                <Col md={1} className='text-center'>
                  Teste
                  <br />
                  1º Bim
                  <Input
                    name='teste1'
                    className='form-control historico__notas__input'
                    title='Teste 1º Bim'
                  />
                </Col>
                <Col md={1} className='text-center'>
                  Prova
                  <br />
                  1º Bim
                  <Input
                    name='prova1'
                    className='form-control historico__notas__input'
                    title='Prova 1º Bim'
                  />
                </Col>
                <Col md={1} className='text-center'>
                  Teste
                  <br />
                  2º Bim
                  <Input
                    name='teste2'
                    className='form-control historico__notas__input'
                    title='Teste 2º Bim'
                  />
                </Col>
                <Col md={1} className='text-center'>
                  Prova
                  <br />
                  2º Bim
                  <Input
                    name='prova2'
                    className='form-control historico__notas__input'
                    title='Prova 2º Bim'
                  />
                </Col>
                <Col md={1} className='text-center'>
                  Teste
                  <br />
                  3º Bim
                  <Input
                    name='teste3'
                    className='form-control historico__notas__input'
                    title='Teste 3º Bim'
                  />
                </Col>
                <Col md={1} className='text-center'>
                  Prova
                  <br />
                  3º Bim
                  <Input
                    name='prova3'
                    className='form-control historico__notas__input'
                    title='Prova 3º Bim'
                  />
                </Col>
                <Col md={1} className='text-center'>
                  Teste
                  <br />
                  4º Bim
                  <Input
                    name='teste4'
                    className='form-control historico__notas__input'
                    title='Teste 4º Bim'
                  />
                </Col>
                <Col md={1} className='text-center'>
                  Prova
                  <br />
                  4º Bim
                  <Input
                    name='prova4'
                    className='form-control historico__notas__input'
                    title='Prova 4º Bim'
                  />
                </Col>
                <Col md={1} className='text-center'>
                  <br />
                  Recup
                  <Input
                    name='recup'
                    className='form-control historico__notas__input'
                    title='Recuperação'
                  />
                </Col>
                <Col md={1} className='text-center'>
                  Média Final
                  <Input
                    name='mediaFinal'
                    className='form-control historico__notas__input'
                    title='Média Final'
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <button type='submit' className='btn btn-success'>
                    Gravar
                  </button>
                </Col>
                <Col md={6}>
                  <button className='btn btn-danger' onClick={this.onCancel}>
                    Cancelar
                  </button>
                </Col>
              </Row>
            </Form>
          </div>
        </Fragment>
      );
    } else if (this.state.formStatus === 'wait') {
      return <Spinner color='primary' />;
    } else if (
      this.state.formStatus === 'send' ||
      this.state.formStatus === 'erro'
    ) {
      return (
        <Alert color={this.state.formStatus === 'send' ? 'success' : 'danger'}>
          <p>{this.state.formMessage}</p>
          <Button onClick={() => this.setState({ formStatus: 'fill' })}>
            OK
          </Button>
        </Alert>
      );
    }
  }
}

export default FormAddNotas;
