import React, { Component } from 'react';
import { Spinner } from 'reactstrap';

import ConfirmDelete from '../../../components/ConfirmDelete';
import Tabela from '../../../components/Tabela';
import FormAlunos from '../../../components/FormAlunos';
import AlunosDetalhes from '../../../components/AlunosDetalhes';
import FormPassword from '../../../components/FormPassword';
import BarraBusca from '../../../components/BarraBusca';

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
    filtro: '',
    mostraFiltro: false,
    alunosAtuais: [],
    alunoAtual: {},
    idSenha: '',
    show: 'table',
    showAnterior: '',
    errorMessage: ''
  };

  loadAlunos = () => {
    fetch(`${urlBaseApi}api/listar/alunos`)
      .then(response => response.json())
      .then(responseJson => {
        this.state.filtro
          ? this.setState({
              alunosAtuais: responseJson.filter(
                aluno =>
                  aluno.nome
                    .toLowerCase()
                    .indexOf(this.state.filtro.toLowerCase()) > -1
              ),
              mostraFiltro: true
            })
          : this.setState({ alunosAtuais: responseJson });
      });
  };

  onEditClick = data => {
    this.setState({
      showAnterior: this.state.show,
      show: 'edit',
      alunoAtual: data
    });
  };

  onPasswordClick = data => {
    fetch(`${urlBaseApi}api/verificaUser/${data}`)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.resp === 'erro') {
          this.setState({ show: 'password', showAnterior: this.state.show });
        } else {
          this.setState({
            show: 'password',
            showAnterior: this.state.show,
            idSenha: responseJson.id
          });
        }
      });
  };

  handlePassword = data => {
    const url = this.state.idSenha
      ? `${urlBaseApi}api/atualizar/users/`
      : `${urlBaseApi}api/gravar/users/`;
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        ...data,
        idAluno: this.state.alunoAtual.id,
        id: this.state.idSenha
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ show: this.state.showAnterior, showAnterior: '' });
      });
  };

  cancelPassword = () => {
    this.setState({ show: this.state.showAnterior, showAnterior: '' });
  };

  onAddClick = () => {
    this.setState({ showAnterior: this.state.show, show: 'edit' });
  };

  handleSubmit = data => {
    const url = data.id
      ? `${urlBaseApi}api/atualizar/alunos`
      : `${urlBaseApi}api/gravar/alunos`;

    this.setState({ show: 'wait' });

    fetch(`${url}`, {
      method: 'POST',
      body: JSON.stringify({
        ...data
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.resp !== 'erro') {
          this.setState({ alunoAtual: data, show: this.state.showAnterior });
          this.loadAlunos();
        } else {
          this.setState({ show: 'edit', errorMessage: responseJson.resp });
        }
      });
  };

  handleCancel = () => {
    this.setState({ show: this.state.showAnterior });
  };

  onDeleteClick = data => {
    this.setState({ show: 'alert', alunoAtual: data });
  };

  handleDelete = () => {
    this.setState({ show: 'wait' });
    fetch(`${urlBaseApi}api/apagar/alunos/${this.state.alunoAtual.id}`)
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

  onDetalhesClick = data => {
    this.setState({ show: 'detalhes', alunoAtual: data });
  };

  cancelDetalhes = () => {
    this.setState({ show: 'table', alunoAtual: {} });
  };

  onChangeBusca = data => {
    const retorno = this.filtroAlunos(data);
    this.setState({ filtro: data, alunos: retorno });
  };

  filtroAlunos = data => {
    this.setState({ filtro: data });
    this.loadAlunos();
  };

  toggleFiltro = () => {
    this.setState({ mostraFiltro: !this.state.mostraFiltro });
  };

  componentWillMount() {
    this.loadAlunos();
  }

  render() {
    return (
      <div className='dashboard'>
        {this.state.show === 'table' ? (
          <div className='container'>
            {this.state.mostraFiltro && (
              <BarraBusca change={this.onChangeBusca} />
            )}
            <Tabela
              titulo='Alunos'
              campos={campos}
              dados={this.state.alunosAtuais}
              add={this.onAddClick}
              edit={this.onEditClick}
              delete={this.onDeleteClick}
              details={this.onDetalhesClick}
              filter={this.toggleFiltro}
            />
          </div>
        ) : this.state.show === 'alert' ? (
          <ConfirmDelete
            info={`do aluno(a) ${this.state.alunoAtual.nome}`}
            delete={this.handleDelete}
            cancel={this.cancelDelete}
          />
        ) : this.state.show === 'wait' ? (
          <div className='wrap100vh'>
            <Spinner />
          </div>
        ) : this.state.show === 'detalhes' ? (
          <AlunosDetalhes
            data={this.state.alunoAtual}
            cancel={this.cancelDetalhes}
            editar={this.onEditClick}
            password={this.onPasswordClick}
          />
        ) : this.state.show === 'password' ? (
          <FormPassword
            cancel={this.cancelPassword}
            dados={this.state.alunoAtual}
            password={this.handlePassword}
          />
        ) : (
          <FormAlunos
            data={this.state.alunoAtual}
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
