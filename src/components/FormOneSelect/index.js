import React, { Component, Fragment } from 'react';
import { Button, Alert, Row, Col, Spinner } from 'reactstrap';
import { Form, Input, Select } from '@rocketseat/unform';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  id: Yup.string(),
  key: Yup.string().required('Este campo é obrigatório')
});

class FormOneSelect extends Component {
  state = {
    formStatus: 'fill',
    formMessage: '',
    options: []
  };

  onSubmit = async data => {
    console.log(data);
    await this.props.onSubmit(data);
  };

  componentWillMount() {
    this.props.errorMessage
      ? this.setState({
          formMessage: this.props.errorMessage,
          formStatus: 'erro'
        })
      : this.setState({
          options: this.props.options.map(option => {
            return {
              id: option.id,
              title: option.nome
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
                <Col md={12}>
                  <Input name='id' className='d-none' />
                  <Select
                    name='key'
                    options={this.state.options}
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

export default FormOneSelect;
