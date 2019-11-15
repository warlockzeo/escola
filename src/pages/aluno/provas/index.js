import React, { Component } from 'react';

import urlBaseApi from '../../../components/config';

import './styles.css';

export default class Provas extends Component {
  state = {
    aluno: '',
    usuarioLogado: localStorage.getItem('user') || '',
    faltas: [],
    avisos: [],
    provas: [],
    notas: []
  };

  carregaProvas() {
    this.state.aluno.length &&
      fetch(`${urlBaseApi}listar/provas/${this.state.aluno.id}`)
        .then(response => response.json())
        .then(responseJson => {
          this.setState({
            provas: responseJson
          });
        });
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <h1 className='titulo'>Provas</h1>
        <ul className='provas-lista'>
          <li className='item'>
            <div className='negrito'>Dia - Matéria</div>
            Assunto
          </li>
        </ul>
      </div>
    );
  }
}
