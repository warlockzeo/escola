import React, { Component, Fragment } from 'react';
import Tabela from '../../../components/Tabela';

const campos = [
  {
    id: 'disciplina',
    numeric: false,
    disablePadding: true,
    label: 'Disciplina',
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

class Disciplinas extends Component {
  state = {
    disciplinas: []
  };

  handleEdit = () => {
    console.log('edit');
  };

  handleDelete = () => {
    console.log('delete');
  };

  loadDisciplinas = () => {
    fetch('http://api/listar/disciplinas')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ disciplinas: responseJson });
      });
  };

  componentWillMount() {
    this.loadDisciplinas();
  }

  render() {
    return (
      <div className='dashboard container'>
        <Tabela
          titulo='Disciplinas'
          campos={campos}
          dados={this.state.disciplinas}
          edit={this.handleEdit}
          delete={this.handleDelete}
        />
      </div>
    );
  }
}

export default Disciplinas;
