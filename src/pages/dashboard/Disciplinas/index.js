import React, { Component } from 'react';
import Tabela from '../../../components/Tabela';
import { Card, Button, Spinner } from 'reactstrap';
import FormOneField from '../../../components/FormOneField';
const campos = [
  {
    id: 'nome',
    numeric: false,
    disablePadding: true,
    label: 'Disciplina',
    component: 'th',
    scope: 'row',
    padding: 'none'
  }
];

class Disciplina extends Component {
  state = {
    disciplinas: [],
    disciplinaAtual: {},
    show: 'table',
    errorMessage: ''
  };

  loadDisciplinas = () => {
    fetch('http://api/listar/disciplinas')
      .then(response => response.json())
      .then(responseJson => {
        const disciplinas = responseJson.map(disciplina => {
          return {
            id: disciplina.id,
            nome: disciplina.disciplina
          };
        });
        this.setState({ disciplinas });
      });
  };

  onEditClick = data => {
    this.setState({ show: 'edit', disciplinaAtual: data });
  };

  onAddClick = () => {
    this.setState({ show: 'edit' });
  };

  onDeleteClick = data => {
    this.setState({ show: 'alert', disciplinaAtual: data });
  };

  handleDelete = () => {
    this.setState({ show: 'wait' });
    fetch(`http://api/apagar/disciplinas/${this.state.disciplinaAtual.id}`)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.resp === 'ok') {
          this.setState({ show: 'table', disciplinaAtual: {} });
          this.loadDisciplinas();
        } else {
          console.log(responseJson.resp);
        }
      });
  };

  cancelDelete = () => {
    this.setState({ show: 'table', DisciplinaAtual: {} });
  };

  handleSubmit = data => {
    console.log(data);
    const url = data.id
      ? 'http://api/atualizar/disciplinas'
      : 'http://api/gravar/disciplinas';

    const dados = data.id
      ? { id: data.id, disciplina: data.nome }
      : { disciplina: data.nome };

    this.setState({ show: 'wait' });

    fetch(`${url}`, {
      method: 'POST',
      //mode: 'no-cors',
      body: JSON.stringify({
        ...dados
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.resp !== 'erro') {
          this.setState({ show: 'table' });
          this.loadDisciplinas();
        } else {
          this.setState({ show: 'edit', errorMessage: responseJson.resp });
        }
      });
  };

  handleCancel = () => {
    this.setState({ show: 'table' });
  };

  componentWillMount() {
    this.loadDisciplinas();
  }

  render() {
    return (
      <div className='dashboard'>
        {this.state.show === 'table' ? (
          <div className='container'>
            <Tabela
              titulo='Disciplinas'
              campos={campos}
              dados={this.state.disciplinas}
              add={this.onAddClick}
              edit={this.onEditClick}
              delete={this.onDeleteClick}
            />
          </div>
        ) : this.state.show === 'alert' ? (
          <Card className='dashboard__card'>
            <p>
              Confirma exclusão da Disciplina{' '}
              {this.state.disciplinaAtual.disciplina}?
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
          <FormOneField
            titulo='Disciplina'
            dados={this.state.disciplinaAtual}
            onSubmit={this.handleSubmit}
            onCancel={this.handleCancel}
            errorMessage={this.state.errorMessage}
          />
        )}
      </div>
    );
  }
}

export default Disciplina;
