import React, { Fragment, Component } from 'react';
import moment from 'moment';
import style from 'styled-components';

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
    usuarioLogado: localStorage.getItem('user') || '',
    idUsuarioLogado: localStorage.getItem('userId') || '',
    aluno: {},
    avisos: [],
    faltas: []
  };

  carregaAluno = () => {
    fetch(`http://escj/listar/alunos/`)
      .then(response => response.json())
      .then(responseJson => {
        const aluno = responseJson.filter(
          aluno => aluno.id === this.state.idUsuarioLogado
        )[0];
        this.setState({ aluno });
        this.carregaAvisos(aluno.id);
        this.carregaFaltas(aluno.id, aluno.idTurma);
      });
  };

  carregaAvisos = idUsuario => {
    fetch(`http://api/listarAvisosAluno/${idUsuario}`)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          avisos: responseJson
        });
      });
  };

  carregaFaltas = (idUsuario, idTurma) => {
    fetch(`http://api/listarFaltas/${idUsuario}/${idTurma}`)
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

  componentDidMount() {
    this.state.idUsuarioLogado && this.carregaAluno();
  }

  render() {
    const mostraAvisos =
      this.state.avisos.length > 0 &&
      this.state.avisos.map(aviso => (
        <div key={aviso.id} style={{ textAlign: 'left' }}>
          <span style={{ fontWeight: 'bold' }}>
            {moment(aviso.dataPostagem).format('DD/MM/YYYY')} - {aviso.titulo}
          </span>
          <br />
          {aviso.foto && <img src={aviso.foto} alt={aviso.titulo} />}
          <p>{aviso.texto}</p>
        </div>
      ));
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
              falta{this.state.faltasJustificadas.length > 1 && 's'} justificada
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
