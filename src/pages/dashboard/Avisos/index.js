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
  },
  {
    id: 'showDestinatario',
    numeric: false,
    disablePadding: false,
    label: 'Destinatário',
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
    turmas: [],
    alunos: [],
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
          retorno.titulo = aviso.titulo;
          retorno.texto = aviso.texto;
          retorno.showStatus = aviso.status && 'Sim';
          retorno.showDestinatario =
            aviso.todos === '1'
              ? 'Todos os Alunos'
              : aviso.idTurma & aviso.idAluno
              ? 'Aluno'
              : (aviso.idTurma === '0') & (aviso.idAluno === '0')
              ? 'Site'
              : 'Turma';
          retorno.validade = aviso.validade
            ? moment(aviso.validade).format('DD/MM/YYYY')
            : 'Indeterminado';
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

  loadTurmas = () => {
    fetch(`http://api/listar/turmas/${moment().format('YYYY')}`)
      .then(response => response.json())
      .then(responseJson => {
        const turmas = responseJson.map(turma => {
          const retorno = [];
          retorno.id = turma.id;
          retorno.title = turma.descricao;
          return retorno;
        });
        this.setState({ turmas });
      });
  };

  loadGradeAlunos = turma => {
    fetch(`http://api/gradeAlunos/${turma}`)
      .then(response => response.json())
      .then(responseJson => {
        const alunos = responseJson.map(aluno => {
          const retorno = [];
          retorno.id = aluno.idAluno;
          retorno.title = aluno.nome;
          return retorno;
        });
        this.setState({ alunos });
      });
  };

  onClickTurma = () => {
    this.loadTurmas();
  };

  onSelectTurma = data => {
    this.loadGradeAlunos(data);
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
        ) : (
          <FormAviso
            dados={{
              id: 0,
              todos: 1,
              dataPostagem: moment().format('YYYY-MM-DD')
            }}
            onSubmit={this.handleSubmit}
            onCancel={this.handleCancel}
            errorMessage={this.state.errorMessage}
            turmas={this.state.turmas}
            alunos={this.state.alunos}
            onClickTurma={this.onClickTurma}
            onSelectTurma={this.onSelectTurma}
          />
        )}
      </div>
    );
  }
}

export default Avisos;
