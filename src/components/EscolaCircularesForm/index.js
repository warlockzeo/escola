import React, { Component, Fragment } from 'react';
import { Button, Alert, Row, Col, Spinner } from 'reactstrap';
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
  destinatario: Yup.string().required('Este campo é obrigatório')
});

class EscolaCircularesForm extends Component {
  state = {
    formStatus: 'fill',
    formMessage: ''
  };

  uploadFile = file => {
    const formData = new FormData();
    formData.append('file', file);

    fetch('http://api/files', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.resp !== 'erro') {
          console.log(responseJson.resp);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  onSubmit = e => {
    e.preventDefault();
    this.uploadFile(this.state.targetFile);
  };

  //  onSubmit = async data => {
  // await this.props.onSubmit(data);
  //};

  onCancel = e => {
    e.preventDefault();
    this.props.onCancel();
  };

  onChange = event => {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    this.setState({
      file: event.target.value,
      targetFile: event.target.files[0],
      reader: reader
    });
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
            <form schema={schema} onSubmit={this.onSubmit}>
              <Row>
                <Col md={8}>
                  <Label>Arquivo PDF</Label>
                  <input
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
                  <select
                    name='destinatario'
                    className='form-control'
                    title='Destinatário'
                    onChange={this.onChange}
                  >
                    <option value='Educação Infantil'>Educação Infantil</option>
                    <option value='Fundamental I'>Fundamental I</option>
                    <option value='Fundamental II'>Fundamental II</option>
                  </select>
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
            </form>
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
