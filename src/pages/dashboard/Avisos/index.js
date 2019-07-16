import React, { Component } from 'react';
import moment from 'moment';

import BarraBusca from '../../../components/BarraBusca';
import Tabela from '../../../components/Tabela';
import FormAviso from '../../../components/FormAviso';
import ConfirmDelete from '../../../components/ConfirmDelete';

const campos = [
  {
    id: 'dataPostagem',
    numeric: false,
    disablePadding: true,
    label: 'Data da Postagem',
    component: 'th',
    scope: 'row',
    padding: 'none'
  },
  {
    id: 'titulo',
    numeric: false,
    disablePadding: false,
    label: 'Título',
    align: 'left'
  }
];

class Avisos extends Component {
  state = {
    show: 'table',
    showAnterior: '',
    avisos: [],
    avisosAtuais: [],
    avisoAtual: {},
    filtro: '',
    mostraFiltro: false
  };

  loadAvisos = () => {
    fetch('http://api/listar/avisos')
      .then(response => response.json())
      .then(responseJson => {
        const avisos = responseJson.map(aviso => {
          const retorno = {};

          retorno.id = aviso.id;
          retorno.idAluno = aviso.idAluno;
          retorno.idTurma = aviso.idTurma;
          retorno.titulo = aviso.titulo;
          retorno.texto = aviso.texto;
          retorno.dataPostagem = moment(aviso.dataPostagem).format(
            'DD/MM/YYYY'
          );

          return retorno;
        });

        this.state.filtro
          ? this.setState({
              avisos,
              avisosAtuais: avisos.filter(
                aviso =>
                  aviso.titulo
                    .toLowerCase()
                    .indexOf(this.state.filtro.toLowerCase()) > -1
              ),
              mostraFiltro: true
            })
          : this.setState({ avisos, avisosAtuais: avisos });
      });
  };

  onAddClick = () => {
    this.setState({ showAnterior: this.state.show, show: 'form' });
  };

  onEditClick = data => {
    this.setState({
      showAnterior: this.state.show,
      show: 'edit',
      avisoAtual: data
    });
  };

  onDeleteClick = data => {
    this.setState({
      showAnterior: this.state.show,
      show: 'alert',
      avisoAtual: data
    });
  };

  handleSubmit = data => {
    this.setState({ show: 'wait' });
    fetch(`http://api/gravar/avisos/`, {
      method: 'POST',
      body: JSON.stringify({ ...data })
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ show: this.state.showAnterior, showAnterior: '' });
        this.loadAvisos();
      });
  };

  handleCancel = () => {
    this.setState({ show: this.state.showAnterior, showAnterior: '' });
  };

  handleDelete = () => {
    this.setState({ show: 'wait' });
    fetch(`http://api/apagar/avisos/${this.state.avisoAtual.id}`)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.resp === 'ok') {
          this.setState({
            show: this.state.showAnterior,
            showAnterior: '',
            avisoAtual: {}
          });
          this.loadAvisos();
        } else {
          console.log(responseJson.resp);
        }
      });
  };

  onChangeBusca = data => {
    if (this.state.avisos.length > 0) {
      const retorno = this.filtroAvisos(data);
      console.log(retorno);
      this.setState({ filtro: data, avisos: retorno });
    }
  };

  filtroAvisos = data => {
    this.setState({ filtro: data });
    this.loadAvisos();
  };

  toggleFiltro = () => {
    this.setState({ mostraFiltro: !this.state.mostraFiltro });
  };

  componentWillMount() {
    this.loadAvisos();
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
              titulo='Avisos'
              campos={campos}
              dados={this.state.avisosAtuais}
              add={this.onAddClick}
              edit={this.onEditClick}
              delete={this.onDeleteClick}
              details={this.onDetalhesClick}
              filter={this.toggleFiltro}
            />
          </div>
        ) : this.state.show === 'alert' ? (
          <ConfirmDelete
            info={`do aviso ${this.state.avisoAtual.titulo}`}
            delete={this.handleDelete}
            cancel={this.handleCancel}
          />
        ) : this.state.show === 'edit' ? (
          <FormAviso
            dados={{
              ...this.state.avisoAtual,
              dataPostagem: moment().format('YYYY-MM-DD')
            }}
            onSubmit={this.handleSubmit}
            onCancel={this.handleCancel}
            errorMessage={this.state.errorMessage}
          />
        ) : (
          <FormAviso
            dados={{ dataPostagem: moment().format('YYYY-MM-DD') }}
            onSubmit={this.handleSubmit}
            onCancel={this.handleCancel}
            errorMessage={this.state.errorMessage}
          />
        )}
      </div>
    );
  }
}

export default Avisos;
