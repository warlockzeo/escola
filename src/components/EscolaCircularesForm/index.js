import React, { Component, Fragment } from 'react';
import { Button, Alert, Row, Col, Spinner } from 'reactstrap';
import Tabela from '../Tabela';
import ConfirmDelete from '../ConfirmDelete';
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
  nomeArquivo: Yup.string().required('Deve selecionar um documento'),
  destinatario: Yup.string().required('Deve escolher um destinatário')
});

const campos = [
  {
    id: 'nomeArquivo',
    numeric: false,
    disablePadding: true,
    label: 'Nome do Arquivo',
    component: 'th',
    scope: 'row',
    padding: 'none'
  },
  {
    id: 'destinatario',
    numeric: false,
    disablePadding: true,
    label: 'Destinatário',
    component: 'th',
    scope: 'row',
    padding: 'none'
  }
];

class EscolaCircularesForm extends Component {
  state = {
    nomeArquivo: '',
    destinatario: '',
    fileAtual: '',
    show: 'table',
    formMessage: ''
  };

  onSubmit = async event => {
    this.setState({ show: 'wait' });
    event.preventDefault();
    const dataToValid = {
      nomeArquivo: this.state.targetFile && this.state.targetFile.name,
      destinatario: this.state.destinatario || ''
    };
    if (await schema.isValid(dataToValid)) {
      await this.props.onSubmit({
        arquivo: this.state.targetFile,
        nomeArquivo: this.state.targetFile.name,
        destinatario: this.state.destinatario
      });
    } else {
      this.setState({
        nomeArquivo: '',
        destinatario: '',
        show: 'error',
        formMessage: 'Todos os campos precisam estar preenchidos!'
      });
    }
  };

  onCancel = event => {
    event.preventDefault();
    this.props.onCancel();
    this.setState({ show: 'table' });
  };

  onChange = event => {
    if (event.currentTarget.name === 'file') {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.setState({
        file: event.target.value,
        targetFile: event.target.files[0],
        reader: reader
      });
    } else {
      this.setState({ destinatario: event.currentTarget.value });
    }
    this.props.onChange();
  };

  onAddClick = () => {
    this.setState({
      show: 'form',
      fileAtual: {},
      destinatario: '',
      file: '',
      reader: {},
      targetFile: {}
    });
  };

  onDeleteClick = data => {
    this.setState({
      file: '',
      showAnterior: this.state.show,
      show: 'delete',
      fileAtual: data
    });
  };

  handleDelete = () => {
    this.setState({ show: 'wait' });
    this.props.onDelete(this.state.fileAtual.id);
  };

  cancelDelete = () => {
    this.setState({ show: 'table' });
  };

  componentWillMount() {
    this.props.errorMessage &&
      this.setState({
        formMessage: this.props.errorMessage,
        show: 'error'
      });
  }
  componentWillReceiveProps() {
    this.props.show && this.setState({ show: 'table' });
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
        {this.state.show === 'form' ? (
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
                    defaultValue=''
                  >
                    <option value=''>Selecione o destinatário</option>
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
        ) : this.state.show === 'table' ? (
          <Tabela
            titulo='Circulares e provas para download'
            campos={campos}
            dados={this.props.files}
            add={this.onAddClick}
            delete={this.onDeleteClick}
          />
        ) : this.state.show === 'wait' ? (
          <div className='wrap100vh'>
            {this.state.file && `Aguarde enquanto o arquivo é enviado!`}
            <Spinner color='primary' />
          </div>
        ) : this.state.show === 'delete' ? (
          <ConfirmDelete
            info={`do arquivo ${this.state.fileAtual.nomeArquivo}`}
            delete={this.handleDelete}
            cancel={this.cancelDelete}
          />
        ) : (
          (this.state.show === 'send' || this.state.show === 'error') && (
            <Alert color={this.state.show === 'send' ? 'success' : 'danger'}>
              <p>{this.state.formMessage}</p>
              <Button
                onClick={() =>
                  this.setState({
                    show: this.state.show === 'send' ? 'table' : 'form'
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

export default EscolaCircularesForm;
