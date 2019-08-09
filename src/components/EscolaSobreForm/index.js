import React, { Component, Fragment } from 'react';
import { Button, Alert, Row, Col, Spinner } from 'reactstrap';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  sobre: Yup.string()
});

class EscolaSobreForm extends Component {
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
            <h2>Sobre a Escola</h2>
            <Form
              schema={schema}
              onSubmit={this.onSubmit}
              initialData={this.props.data}
            >
              <Row>
                <Col md={12}>
                  <Input
                    multiline
                    name='sobre'
                    className='form-control'
                    placeholder='Seu texto sobre a escola'
                    title='Sobre'
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

export default EscolaSobreForm;
