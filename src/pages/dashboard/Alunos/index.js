import React, { Component, Fragment } from 'react';
import Tabela from '../../../components/Tabela';

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
    alunos: []
  };

  handleEdit = () => {
    console.log('edit');
  };

  handleDelete = () => {
    console.log('delete');
  };

  loadAlunos = () => {
    fetch('http://api/listar/alunos')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ alunos: responseJson });
      });
  };

  componentWillMount() {
    this.loadAlunos();
  }

  render() {
    return (
      <div className='dashboard container'>
        <Tabela
          titulo='Alunos'
          campos={campos}
          dados={this.state.alunos}
          edit={this.handleEdit}
          delete={this.handleDelete}
        />
      </div>
    );
  }
}

export default Alunos;
