import React, { Component, Fragment } from 'react';
import { Button, Alert, Row, Col, Spinner } from 'reactstrap';
import { Form, Input, Select, Textarea } from '@rocketseat/unform';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  id: Yup.number(),
  dataPostagem: Yup.string(),
  titulo: Yup.string().required('Este campo é obrigatório'),
  texto: Yup.string().required('Este campo é obrigatório')
});

const options = [
  { id: 'Aluno', title: 'Aluno' },
  { id: 'Turma', title: 'Turma' },
  { id: 'TodosAlunos', title: 'TodosAlunos' },
  { id: 'Site', title: 'Site' }
];

class FormAviso extends Component {
  state = {
    formStatus: 'fill',
    formMessage: ''
  };

  onSubmit = async data => {
    await this.props.onSubmit(data);
  };

  onCancel = e => {
    e.preventDefault();
    this.props.onCancel();
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
              initialData={this.props.dados}
            >
              <Row>
                <Col md={12}>
                  <Select
                    name='destinatario'
                    options={options}
                    className='form-control'
                    title='Destinatário'
                  />
                </Col>
              </Row>
              <Row>
                <Col md={12}>
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
