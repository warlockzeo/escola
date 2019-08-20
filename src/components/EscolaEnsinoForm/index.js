import React, { Component, Fragment } from 'react';
import { Button, Alert, Row, Col, Spinner } from 'reactstrap';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import style from 'styled-components';

const Label = style.label`
  display: block;
  text-align: left;
  font-weight: bold;
  padding-left: 10px;
`;

const schema = Yup.object().shape({
  infantil: Yup.string().required('Este campo é obrigatório'),
  fundamental1: Yup.string().required('Este campo é obrigatório'),
  fundamental2: Yup.string().required('Este campo é obrigatório')
});

class EscolaEnsinoForm extends Component {
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
            <h2>Ensino</h2>
            <Form
              schema={schema}
              onSubmit={this.props.onSubmit}
              initialData={this.props.data}
            >
              <Row>
                <Col md={12}>
                  <Label>Educação Infantil</Label>
                  <Input
                    multiline
                    name='infantil'
                    className='form-control'
                    placeholder='Educação Infantil'
                    title='Educação Infantil'
                    onChange={this.onChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Label>Fundamental I</Label>
                  <Input
                    multiline
                    name='fundamental1'
                    className='form-control'
                    placeholder='Fundamental I'
                    title='Fundamental I'
                    onChange={this.onChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Label>Fundamental II</Label>
                  <Input
                    multiline
                    name='fundamental2'
                    className='form-control'
                    placeholder='Fundamental II'
                    title='Fundamental II'
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

export default EscolaEnsinoForm;
