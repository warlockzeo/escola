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

class FormTurmaAddAluno extends Component {
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
            <h2>Inclusão de Aluno na Turma</h2>
            <Form schema={schema} onSubmit={this.props.onSubmit}>
              <Row>
                <Col md={12}>
                  <Select
                    name='horario'
                    options={this.props.dados}
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

export default FormTurmaAddAluno;
