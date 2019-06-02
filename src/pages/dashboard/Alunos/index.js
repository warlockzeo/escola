import React, { Component } from 'react';
import Tabela from '../../../components/Tabela';
import FormAlunos from '../../../components/FormAlunos';
import { Card, Button, Spinner } from 'reactstrap';

const campos = [
  {
    id: 'nome',
    numeric: false,
    disablePadding: true,
    label: 'Nome',
    component: 'th',
    scope: 'row',
    padding: 'none'
  },
  {
    id: 'mae',
    numeric: false,
    disablePadding: false,
    label: 'Mãe',
    align: 'left'
  },
  {
    id: 'turma',
    numeric: false,
    disablePadding: false,
    label: 'Turma',
    align: 'left'
  }
];

class Alunos extends Component {
  state = {
    alunos: [],
    alunoAtual: {},
    show: 'table',
    errorMessage: ''
  };

  loadAlunos = () => {
    fetch('http://api/listar/alunos')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ alunos: responseJson });
      });
  };

  onEditClick = data => {
    this.setState({ show: 'edit', alunoAtual: data });
  };

  onDeleteClick = data => {
    this.setState({ show: 'alert', alunoAtual: data });
  };

  handleDelete = () => {
    this.setState({ show: 'wait' });
    fetch(`http://api/apagar/alunos/${this.state.alunoAtual.id}`)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.resp === 'ok') {
          this.setState({ show: 'table', alunoAtual: {} });
          this.loadAlunos();
        } else {
          console.log(responseJson.resp);
        }
      });
  };

  cancelDelete = () => {
    this.setState({ show: 'table', alunoAtual: {} });
  };

  handleSubmit = data => {
    console.log(data);
    const url = data.id
      ? 'http://api/atualizar/alunos'
      : 'http://api/gravar/alunos';
    this.setState({ show: 'wait' });
    fetch(`${url}`, {
      method: 'POST',
      //mode: 'no-cors',
      body: JSON.stringify({
        ...data
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.resp !== 'erro') {
          this.setState({ show: 'table' });
          this.loadAlunos();
        } else {
          this.setState({ show: 'edit', errorMessage: responseJson.resp });
        }
      });
  };

  handleCancel = () => {
    this.setState({ show: 'table' });
  };

  componentWillMount() {
    this.loadAlunos();
  }

  render() {
    return (
      <div
        className='dashboard'
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100vh'
        }}
      >
        {this.state.show === 'table' ? (
          <div className='container'>
            <Tabela
              titulo='Alunos'
              campos={campos}
              dados={this.state.alunos}
              edit={this.onEditClick}
              delete={this.onDeleteClick}
            />
          </div>
        ) : this.state.show === 'alert' ? (
          <Card
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: '80%',
              maxWidth: 400
            }}
          >
            <p>Confirma exclusão do aluno {this.state.alunoAtual.nome}?</p>
            <Button color='success' onClick={this.handleDelete}>
              Sim
            </Button>
            <Button color='danger' onClick={this.cancelDelete}>
              Não
            </Button>
          </Card>
        ) : this.state.show === 'wait' ? (
          <Spinner />
        ) : (
          <FormAlunos
            dados={this.state.alunoAtual}
            onSubmit={this.handleSubmit}
            onCancel={this.handleCancel}
            errorMessage={this.state.errorMessage}
          />
        )}
      </div>
    );
  }
}

export default Alunos;
