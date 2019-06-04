import React, { Component } from 'react';
import Tabela from '../../../components/Tabela';
import { Card, Button, Spinner } from 'reactstrap';
import FormProfessores from '../../../components/FormProfessores';
const campos = [
  {
    id: 'nome',
    numeric: false,
    disablePadding: true,
    label: 'Nome',
    component: 'th',
    scope: 'row',
    padding: 'none'
  }
];

class Professores extends Component {
  state = {
    professores: [],
    professorAtual: {},
    show: 'table',
    errorMessage: ''
  };

  loadProfessores = () => {
    fetch('http://api/listar/professores')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ professores: responseJson });
      });
  };

  onEditClick = data => {
    this.setState({ show: 'edit', professorAtual: data });
  };

  onAddClick = () => {
    this.setState({ show: 'edit' });
  };

  onDeleteClick = data => {
    this.setState({ show: 'alert', professorAtual: data });
  };

  handleDelete = () => {
    this.setState({ show: 'wait' });
    fetch(`http://api/apagar/professores/${this.state.professorAtual.id}`)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.resp === 'ok') {
          this.setState({ show: 'table', professorAtual: {} });
          this.loadProfessores();
        } else {
          console.log(responseJson.resp);
        }
      });
  };

  cancelDelete = () => {
    this.setState({ show: 'table', ProfessorAtual: {} });
  };

  handleSubmit = data => {
    console.log(data);
    const url = data.id
      ? 'http://api/atualizar/professores'
      : 'http://api/gravar/professores';

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
          this.loadProfessores();
        } else {
          this.setState({ show: 'edit', errorMessage: responseJson.resp });
        }
      });
  };

  handleCancel = () => {
    this.setState({ show: 'table' });
  };

  componentWillMount() {
    this.loadProfessores();
  }

  render() {
    return (
      <div className='dashboard'>
        {this.state.show === 'table' ? (
          <div className='container'>
            <Tabela
              titulo='Professores'
              campos={campos}
              dados={this.state.professores}
              add={this.onAddClick}
              edit={this.onEditClick}
              delete={this.onDeleteClick}
            />
          </div>
        ) : this.state.show === 'alert' ? (
          <Card className='dashboard__card'>
            <p>
              Confirma exclusão do professor {this.state.professorAtual.nome}?
            </p>
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
          <FormProfessores
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

export default Professores;
