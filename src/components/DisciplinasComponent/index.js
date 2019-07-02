import React, { Component } from 'react';
import Tabela from '../Tabela';
import { Card, Button, Spinner } from 'reactstrap';

import FormOneField from '../FormOneField';
import ConfirmDelete from '../ConfirmDelete';

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

class DisciplinasComponent extends Component {
  state = {
    disciplinas: [],
    disciplinaAtual: {},
    show: 'table',
    showAnterior: '',
    errorMessage: ''
  };

  onEditClick = data => {
    this.setState({
      showAnterior: this.state.show,
      show: 'edit',
      disciplinaAtual: data
    });
  };

  onAddClick = () => {
    this.setState({ showAnterior: this.state.show, show: 'edit' });
  };

  onDeleteClick = data => {
    this.setState({
      showAnterior: this.state.show,
      show: 'alert',
      disciplinaAtual: data
    });
  };

  onDelete = () => {
    this.props.delete(this.state.disciplinaAtual.id);
    this.setState({
      show: this.state.showAnterior,
      showAnterior: '',
      disciplinaAtual: {}
    });
  };

  cancelDelete = () => {
    this.setState({
      show: this.state.showAnterior,
      showAnterior: '',
      DisciplinaAtual: {}
    });
  };

  handleCancel = () => {
    this.setState({ show: this.state.showAnterior, showAnterior: '' });
  };

  componentWillMount() {}

  render() {
    return this.state.show === 'table' ? (
      <div className='container'>
        <Tabela
          titulo='Disciplinas'
          campos={campos}
          dados={this.props.dados}
          add={this.onAddClick}
          edit={this.onEditClick}
          delete={this.onDeleteClick}
        />
      </div>
    ) : this.state.show === 'alert' ? (
      <ConfirmDelete />
    ) : this.state.show === 'wait' ? (
      <div className='wrap100vh'>
        <Spinner />
      </div>
    ) : (
      <FormOneField
        titulo='Disciplina'
        dados={this.state.disciplinaAtual}
        onSubmit={this.props.submit}
        onCancel={this.handleCancel}
        errorMessage={this.state.errorMessage}
      />
    );
  }
}

export default DisciplinasComponent;
