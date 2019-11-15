import React, { Component } from 'react';
import { Button, Alert, Row, Col, Spinner } from 'reactstrap';
import { Select } from '@rocketseat/unform';
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
  nomeArquivo: Yup.string().required('Deve selecionar um documento')
});

class FormUploadBanner extends Component {
  state = {
    nomeArquivo: '',
    posicao: '',
    fileAtual: '',
    show: 'form',
    formMessage: ''
  };

  onSubmit = async event => {
    this.setState({ show: 'wait' });
    event.preventDefault();
    const dataToValid = {
      nomeArquivo: this.state.targetFile && this.state.targetFile.name
    };
    if (await schema.isValid(dataToValid)) {
      await this.props.onSubmit({
        arquivo: this.state.targetFile,
        nomeArquivo: this.state.targetFile.name,
        posicao: this.state.posicao
      });
    } else {
      this.setState({
        posicao: '',
        nomeArquivo: '',
        show: 'error',
        formMessage: 'Todos os campos precisam estar preenchidos!'
      });
    }
  };

  onChange = event => {
    if (event.currentTarget.name === 'file') {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.setState({
        file: event.target.value,
        targetFile: event.target.files[0],
        nomeArquivo: event.target.files[0].name,
        reader: reader
      });
    } else {
      this.setState({
        [event.currentTarget.name]: event.currentTarget.value
      });
    }
  };

  componentWillMount() {
    this.props.errorMessage &&
      this.setState({
        formMessage: this.props.errorMessage,
        show: 'error'
      });
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {this.state.show === 'form' && (
          <div className='container'>
            <h2>Circulares / Provas</h2>
            <form schema={schema} onSubmit={this.onSubmit}>
              <Row>
                <Col md={6}>
                  <Label>Imagem para o banner</Label>
                  <input
                    name='file'
                    className='form-control inputFile'
                    title='Arquivos a gravar'
                    type='file'
                    accept='application/image'
                    onChange={this.onChange}
                  />
                </Col>
                <Col md={6}>
                  <Label>Posição para o banner</Label>
                  <Select
                    name='posicao'
                    options={
                      [
                        { id: 'carrossel', title: 'Carrossel Página inicial'}, 
                        { id: 'portalAluno', title: 'Banner Portal Aluno'},
                        { id: 'portalProfessor', title: 'Banner Portal Professor'}
                      ]
                    }
                    className='form-control'
                    title='Posição para mostrar o banner'
                    onChange={this.onChange}
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
            </form>
          </div>
        )} 
        
        {this.state.show === 'wait' && (
          <div className='wrap100vh'>
            {this.state.file && `Aguarde enquanto o arquivo é enviado!`}
            <Spinner color='primary' />
          </div>
        )}
        
        {(
          (this.state.show === 'send' || this.state.show === 'error') && (
            <Alert color={this.state.show === 'send' ? 'success' : 'danger'}>
              <p>{this.state.formMessage}</p>
              <Button
                onClick={() =>
                  this.setState({
                    show: this.state.show === 'send' ? 'form' : 'form'
                  })
                }
              >
                OK
              </Button>
            </Alert>
          )
        )}
      </div>
    );
  }
}

export default FormUploadBanner;
