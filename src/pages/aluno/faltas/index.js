import React, { Component, Fragment } from 'react';

import urlBaseApi from '../../../components/config';

import './styles.css';

export default class Faltas extends Component {
  state = {
    usuarioLogado: localStorage.getItem('user') || '',
    idUsuarioLogado: localStorage.getItem('userId') || '',
    faltas: []
  };

  carregaFaltas() {
    this.state.idUsuarioLogado &&
      fetch(`${urlBaseApi}listar/faltas/${this.state.idUsuarioLogado}`)
        .then(response => response.json())
        .then(responseJson => {
          this.setState({
            faltas: responseJson
          });
        });
  }

  componentDidMount() {
    this.carregaFaltas();
  }

  render() {
    const mostra =
      this.state.faltas.length > 0 ? (
        <Fragment>
          <ul className='faltas-lista'>
            {this.state.faltas.map(falta => (
              <li key={falta.id} className='item'>
                {falta.data} -
                {falta.justificativa
                  ? falta.justificativa
                  : `Falta não justificada.`}
              </li>
            ))}
          </ul>
        </Fragment>
      ) : (
        <h2 className='sem-itens'>Não existem faltas até o momento.</h2>
      );
    return (
      <div>
        <h1 className='titulo'>Faltas</h1>
        {mostra}
      </div>
    );
  }
}
