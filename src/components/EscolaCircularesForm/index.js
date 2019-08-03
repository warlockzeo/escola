import React, { Component, Fragment } from 'react';
import { Button, Alert, Row, Col, Spinner } from 'reactstrap';
import { Form, Input, Select } from '@rocketseat/unform';
import * as Yup from 'yup';
import style from 'styled-components';

import './styles.css';

const Label = style.label`
  display: block;
  text-align: left;
  font-weight: bold;
  padding-left: 10px;
`;

const schema = Yup.object().shape({
  telefones: Yup.string().required('Este campo é obrigatório'),
  email: Yup.string('Este não é um email válido'),
  endereco: Yup.string().required('Este campo é obrigatório'),
  cidade: Yup.string().required('Este campo é obrigatório'),
  uf: Yup.string().required('Este campo é obrigatório')
});

const optionDestinatario = [
  { id: 'Educação Infantil', title: 'Educação Infantil' },
  { id: 'Fundamental I', title: 'Fundamental I' },
  { id: 'Fundamental II', title: 'Fundamental II' }
];

class EscolaCircularesForm extends Component {
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

  onChange = () => {
    this.props.onChange();
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
            <h2>Circulares / Provas</h2>
            <Form
              schema={schema}
              onSubmit={this.props.onSubmit}
              initialData={this.props.dados}
              enctype='multipart/form-data'
            >
              <Row>
                <Col md={8}>
                  <Label>Arquivo PDF</Label>
                  <Input
                    name='file'
                    className='form-control inputFile'
                    title='Arquivos a gravar'
                    type='file'
                    accept='application/pdf'
                    onChange={this.onChange}
                  />
                </Col>
                <Col md={4}>
                  <Label>Destinatário</Label>
                  <Select
                    name='destinatario'
                    options={optionDestinatario}
                    className='form-control'
                    title='Destinatário'
                    onChange={this.onChange}
                  />
                </Col>
              </Row>
              {this.props.showButtons && (
                <Fragment>
                  <Row>
                    <Col md={6}>
                      <button type='submit' className='btn btn-success'>
                        Gravar
                      </button>
                    </Col>
                    <Col md={6}>
                      <button
                        className='btn btn-danger'
                        onClick={this.onCancel}
                      >
                        Cancelar
                      </button>
                    </Col>
                  </Row>
                </Fragment>
              )}
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

export default EscolaCircularesForm;
