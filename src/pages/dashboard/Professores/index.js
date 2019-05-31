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
  }
];

class Professores extends Component {
  state = {
    professores: []
  };

  handleEdit = () => {
    console.log('edit');
  };

  handleDelete = () => {
    console.log('delete');
  };

  loadProfessores = () => {
    fetch('http://api/listar/professores')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ professores: responseJson });
      });
  };

  componentWillMount() {
    this.loadProfessores();
  }

  render() {
    return (
      <div className='dashboard container'>
        <Tabela
          titulo='Professores'
          campos={campos}
          dados={this.state.professores}
          edit={this.handleEdit}
          delete={this.handleDelete}
        />
      </div>
    );
  }
}

export default Professores;
