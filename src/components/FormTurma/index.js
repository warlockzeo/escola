import React, { Component, Fragment } from 'react';
import { Button, Alert, Row, Col, Spinner } from 'reactstrap';
import { Form, Input, Select } from '@rocketseat/unform';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  id: Yup.string(),
  ano: Yup.string(),
  serie: Yup.string().required('Este campo é obrigatório'),
  horario: Yup.string().required('Este campo é obrigatório'),
  descricao: Yup.string().required('Este campo é obrigatório')
});

const optionsSeries = [
  { id: '1º Ano', title: '1º Ano' },
  { id: '2º Ano', title: '2º Ano' },
  { id: '3º Ano', title: '3º Ano' },
  { id: '4º Ano', title: '4º Ano' },
  { id: '5º Ano', title: '5º Ano' },
  { id: '6º Ano', title: '6º Ano' },
  { id: '7º Ano', title: '7º Ano' },
  { id: '8º Ano', title: '8º Ano' },
  { id: '9º Ano', title: '9º Ano' }
];

const optionsHorario = [
  { id: 'Manhã', title: 'Manhã' },
  { id: 'Tarde', title: 'Tarde' }
];

class FormTurma extends Component {
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
          dados: this.props.ano ? { ano: this.props.ano } : this.props.dados
        });
  }

  render() {
    if (this.state.formStatus === 'fill') {
      return (
        <Fragment>
          <div className='container'>
            <h2>Cadastro Turma</h2>
            <Form
              schema={schema}
              onSubmit={this.props.onSubmit}
              initialData={this.state.dados}
            >
              <Input name='id' className='d-none' />
              <Input name='ano' className='d-none' />
              <Row>
                <Col md={4}>
                  <Input
                    name='descricao'
                    className='form-control'
                    placeholder='Nome da turma. Ex: 9ºA, 901 ...'
                    title='Nome da Turma'
                  />
                </Col>
                <Col md={4}>
                  <Select
                    name='serie'
                    options={optionsSeries}
                    className='form-control'
                    title='Série'
                  />
                </Col>
                <Col md={4}>
                  <Select
                    name='horario'
                    options={optionsHorario}
                    className='form-control'
                    title='Horário'
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

export default FormTurma;
