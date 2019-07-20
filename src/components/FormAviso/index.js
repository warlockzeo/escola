import React, { Component, Fragment } from 'react';
import { Button, Alert, Row, Col, Spinner } from 'reactstrap';
import { Form, Input, Select, Textarea } from '@rocketseat/unform';
import * as Yup from 'yup';
import styled from 'styled-components';

const schema = Yup.object().shape({
  id: Yup.number(),
  turma: Yup.number(),
  aluno: Yup.number(),
  todos: Yup.number(),
  dataPostagem: Yup.string(),
  titulo: Yup.string().required('Este campo é obrigatório'),
  texto: Yup.string().required('Este campo é obrigatório')
});

const optionsDestinatario = [
  { id: 'Aluno', title: 'Aluno' },
  { id: 'Turma', title: 'Turma' },
  { id: 'TodosAlunos', title: 'TodosAlunos' },
  { id: 'Site', title: 'Site' }
];

const Span = styled.span`
  background-color: #ffffff;
  text-align: left;
  font-weight: bold;
  color: black;
  margin: 0;
`;

class FormAviso extends Component {
  state = {
    formStatus: 'fill',
    formMessage: '',
    destinatario: ''
  };

  onSubmit = async data => {
    await this.props.onSubmit(data);
  };

  onCancel = e => {
    e.preventDefault();
    this.props.onCancel();
  };

  onChangeDestinatario = e => {
    this.setState({ destinatario: e.currentTarget.value });
    if (
      e.currentTarget.value === 'Turma' ||
      e.currentTarget.value === 'Aluno'
    ) {
      this.props.onClickTurma();
    }
  };

  onChangeTurma = e => {
    this.props.onSelectTurma(e.currentTarget.value);
  };

  componentWillMount() {
    this.props.errorMessage &&
      this.setState({
        formMessage: this.props.errorMessage,
        formStatus: 'erro'
      });
  }

  render() {
    if (this.state.formStatus === 'fill') {
      return (
        <Fragment>
          <div className='container'>
            <h2>Cadastro Aluno</h2>
            <Form
              schema={schema}
              onSubmit={this.props.onSubmit}
              initialData={{
                ...this.props.dados
              }}
            >
              <Row>
                <Col md={4}>
                  <Span>Destinatário: </Span>
                  <Select
                    name='destinatario'
                    options={optionsDestinatario}
                    className='form-control'
                    title='Destinatário'
                    onChange={this.onChangeDestinatario}
                  />
                  {this.state.destinatario === 'TodosAlunos' && (
                    <Input name='todos' className='d-none' />
                  )}
                </Col>

                {(this.state.destinatario === 'Turma' ||
                  this.state.destinatario === 'Aluno') && (
                  <Col md={4}>
                    <Span>Turma: </Span>
                    <Select
                      name='turma'
                      options={this.props.turmas}
                      className='form-control'
                      title='Turma'
                      onChange={this.onChangeTurma}
                    />
                  </Col>
                )}
                {this.state.destinatario === 'Aluno' && (
                  <Col md={4}>
                    <Span>Aluno: </Span>
                    <Select
                      name='aluno'
                      options={this.props.alunos}
                      className='form-control'
                      title='Aluno'
                    />
                  </Col>
                )}
              </Row>
              <Row>
                <Col md={12}>
                  <Span>Título: </Span>
                  <Input
                    name='titulo'
                    className='form-control'
                    placeholder='Título do aviso'
                    title='Título'
                    autoFocus
                  />
                  <Input name='id' className='d-none' />
                  <Input name='dataPostagem' className='d-none' />
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Span>Seu texto: </Span>
                  <Textarea
                    name='texto'
                    className='form-control'
                    placeholder='Seu texto aqui'
                    title='Texto'
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
      return (
        <div className='wrap100vh'>
          <Spinner color='primary' />
        </div>
      );
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

export default FormAviso;
