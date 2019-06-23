import React, { Component } from 'react';
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

class Avisos extends Component {
  state = {
    avisos: []
  };

  handleEdit = () => {
    console.log('edit');
  };

  handleDelete = () => {
    console.log('delete');
  };

  loadAvisos = () => {
    fetch('http://api/listar/avisos')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ avisos: responseJson });
      });
  };

  componentWillMount() {
    this.loadAvisos();
  }

  render() {
    return (
      <div className='dashboard container'>
        <Tabela
          titulo='Avisos'
          campos={campos}
          dados={this.state.avisos}
          edit={this.handleEdit}
          delete={this.handleDelete}
        />
      </div>
    );
  }
}

export default Avisos;
