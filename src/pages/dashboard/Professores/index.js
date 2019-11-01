import React, { Component } from 'react';
import Tabela from '../../../components/Tabela';
import { Spinner } from 'reactstrap';

import ConfirmDelete from '../../../components/ConfirmDelete';
import FormOneField from '../../../components/FormOneField';

import urlBaseApi from '../../../components/config';

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
    fetch(`${urlBaseApi}api/listar/professores`)
      .then(response => response.json())
      .then(responseJson => {
        responseJson.resp === 'ok' &&
          this.setState({ professores: responseJson.data });
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
    fetch(`${urlBaseApi}api/apagar/professores/${this.state.professorAtual.id}`)
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
    this.setState({ show: 'table', professorAtual: {} });
  };

  handleSubmit = data => {
    console.log(data);
    const url = data.id
      ? `${urlBaseApi}api/atualizar/professores`
      : `${urlBaseApi}api/gravar/professores`;

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
          <ConfirmDelete
            info={`do professor ${this.state.professorAtual.nome}`}
            delete={this.handleDelete}
            cancel={this.cancelDelete}
          />
        ) : this.state.show === 'wait' ? (
          <div className='wrap100vh'>
            <Spinner />
          </div>
        ) : (
          <FormOneField
            titulo='Professor'
            dados={this.state.professorAtual}
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
