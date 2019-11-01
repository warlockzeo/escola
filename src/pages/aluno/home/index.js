import React, { Fragment, Component } from 'react';
import moment from 'moment';
import style from 'styled-components';

import urlBaseApi from '../../../components/config';

import './styles.css';

const H1 = style.h1`
  margin:10px 0 !important;
  font-size: 24px;
`;

const P = style.p`
  font-weight: bold;
`;

export default class Home extends Component {
  state = {
    aluno: {},
    avisos: [],
    avisoAtual: '',
    faltas: [],
    show: 'inicio'
  };

  carregaAluno = () => {
    fetch(`${urlBaseApi}api/listar/alunos/`)
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        console.group(localStorage.getItem('userId'));
        const aluno = responseJson.filter(
          alunoAtual => alunoAtual.id === localStorage.getItem('userId')
        )[0];
        console.log(aluno);
        this.setState({ aluno });
        this.carregaAvisos(aluno.id);
        this.carregaFaltas(aluno.id, aluno.idTurma);
      });
  };

  carregaAvisos = idUsuario => {
    fetch(`${urlBaseApi}api/listarAvisosAluno/${idUsuario}`)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          avisos: responseJson
        });
      });
  };

  carregaFaltas = (idUsuario, idTurma) => {
    fetch(`${urlBaseApi}api/listarFaltas/${idUsuario}/${idTurma}`)
      .then(response => response.json())
      .then(responseJson => {
        const faltas = responseJson.map(falta => {
          return {
            id: falta.id,
            nome: falta.disciplina,
            data: falta.data,
            justificativa: falta.justificativa
          };
        });

        const faltasJustificadas = faltas.filter(falta => falta.justificativa);

        this.setState({ faltas, faltasJustificadas });
      });
  };

  showAviso = idAviso => {
    this.setState({ show: 'aviso', avisoAtual: idAviso });
  };

  voltar = () => {
    this.setState({ show: 'inicio', avisoAtual: '' });
  };

  componentDidMount() {
    localStorage.getItem('userId') && this.carregaAluno();
  }

  render() {
    const mostraAvisos =
      this.state.avisos.length > 0 &&
      this.state.avisos.map(aviso => (
        <div
          key={aviso.id}
          data-id={aviso.id}
          style={{ textAlign: 'left', cursor: 'pointer' }}
          onClick={this.showAviso.bind(null, aviso.id)}
        >
          <span style={{ fontWeight: 'bold' }}>
            {moment(aviso.dataPostagem).format('DD/MM/YYYY')} - {aviso.titulo}
          </span>
          <br />
          {aviso.foto && <img src={aviso.foto} alt={aviso.titulo} />}
          <p>{aviso.texto.substr(0, 50)}</p>
        </div>
      ));

    if (this.state.show === 'aviso') {
      return this.state.avisos
        .filter(aviso => aviso.id === this.state.avisoAtual)
        .map(aviso => (
          <div className='aluno' key={aviso.id}>
            <H1>{aviso.titulo}</H1>
            <p>{aviso.texto}</p>

            <button className='btn btn-danger' onClick={this.voltar}>
              Voltar
            </button>
          </div>
        ));
    } else {
      return (
        <div className='aluno'>
          <P>Aluno: {this.state.aluno.nome}</P>
          <H1>Meus Avisos</H1>
          {mostraAvisos}
          <H1>Minhas Faltas</H1>
          {this.state.faltas.length > 0 ? (
            <div>
              <p>
                <span className='faltas__numFaltas'>
                  {this.state.faltas.length}
                </span>{' '}
                falta{this.state.faltas.length > 1 && 's'} até agora este ano.
              </p>
              <p>
                <span className='faltas__numFaltas'>
                  {this.state.faltasJustificadas.length}
                </span>{' '}
                falta{this.state.faltasJustificadas.length > 1 && 's'}{' '}
                justificada
                {this.state.faltasJustificadas.length > 1 && 's'} .
              </p>
            </div>
          ) : (
            <Fragment>
              <span className='faltas__numFaltas'>
                Nenhuma falta até agora este ano.
              </span>
            </Fragment>
          )}
        </div>
      );
    }
  }
}
