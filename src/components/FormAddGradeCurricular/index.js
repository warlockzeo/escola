import React, { Component, Fragment } from 'react';
import { Button, Alert, Row, Col, Spinner } from 'reactstrap';
import { Form, Input, Select } from '@rocketseat/unform';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  id: Yup.string(),
  disciplina: Yup.string().required('Este campo é obrigatório'),
  professor: Yup.string().required('Este campo é obrigatório')
});

class FormAddGradeCurricular extends Component {
  state = {
    formStatus: 'fill',
    formMessage: '',
    optionsDisciplina: [],
    optionsProfessor: []
  };

  onSubmit = async data => {
    await this.props.onSubmit(data);
  };

  componentWillMount() {
    this.props.errorMessage
      ? this.setState({
          formMessage: this.props.errorMessage,
          formStatus: 'erro'
        })
      : this.setState({
          optionsDisciplina: this.props.optionsDisciplina.map(disciplina => {
            return {
              id: disciplina.id,
              title: disciplina.nome
            };
          }),
          optionsProfessor: this.props.optionsProfessor.map(professor => {
            return {
              id: professor.id,
              title: professor.nome
            };
          })
        });
  }

  render() {
    const tituloLowerCase = this.props.titulo.toLowerCase();
    if (this.state.formStatus === 'fill') {
      return (
        <Fragment>
          <div className='container'>
            <h2>Cadastro {tituloLowerCase}</h2>
            <Form
              schema={schema}
              onSubmit={this.props.onSubmit}
              initialData={this.props.dados}
            >
              <Row>
                <Input name='id' className='d-none' />
                <Col md={1} className='legenda__dados'>
                  Disciplina:
                </Col>
                <Col md={11}>
                  <Select
                    name='disciplina'
                    options={this.state.optionsDisciplina}
                    className='form-control'
                  />
                </Col>
                <Col md={1} className='legenda__dados'>
                  Professor:
                </Col>
                <Col md={11}>
                  <Select
                    name='professor'
                    options={this.state.optionsProfessor}
                    className='form-control'
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
                  <button
                    className='btn btn-danger'
                    onClick={this.props.onCancel}
                  >
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

export default FormAddGradeCurricular;
