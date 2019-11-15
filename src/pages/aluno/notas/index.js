import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import style from 'styled-components';

import urlBaseApi from '../../../components/config';

import './styles.css';

const H1 = style.h1`
  margin:10px 0 !important;
  font-size: 24px;
`;

export default class Notas extends Component {
  state = {
    usuarioLogado: localStorage.getItem('user') || '',
    idUsuarioLogado: localStorage.getItem('userId') || '',
    historico: []
  };

  carregaNotas = () => {
    this.state.idUsuarioLogado &&
      fetch(`${urlBaseApi}listar/historicos/${this.state.idUsuarioLogado}`)
        .then(response => response.json())
        .then(responseJson => {
          this.setState({
            historico: responseJson
          });
        });
  };

  componentDidMount() {
    this.carregaNotas();
  }

  render() {
    return (
      <div className='container aluno'>
        <H1 className='titulo'>Notas</H1>
        <div className='notas-tabela'>
          <Row>
            <Col
              xs={12}
              className='negrito text-left'
              style={{
                backgroundColor: '#9c5035',
                borderBottom: 'solid 2px #ffffff',
                color: '#ffffff'
              }}
            >
              Disciplina
            </Col>
            <Col
              
              className='negrito'
              style={{ backgroundColor: '#9c5035', color: '#ffffff' }}
            >
              1º <br />
              Bim
            </Col>
            <Col
              
              className='negrito'
              style={{ backgroundColor: '#9c5035', color: '#ffffff' }}
            >
              2º <br />
              Bim
            </Col>
            <Col
              
              className='negrito'
              style={{ backgroundColor: '#9c5035', color: '#ffffff' }}
            >
              3º <br />
              Bim
            </Col>
            <Col 
              className='negrito'
              style={{ backgroundColor: '#9c5035', color: '#ffffff' }}
            >
              4º <br />
              Bim
            </Col>
            <Col
              className='negrito'
              style={{ backgroundColor: '#9c5035', color: '#ffffff' }}
            >
              Méd <br />
              Anual
            </Col>
            <Col
              className='negrito'
              style={{ backgroundColor: '#9c5035', color: '#ffffff' }}
            >
              <br />
              Rec
            </Col>
            <Col
              className='negrito'
              style={{ backgroundColor: '#9c5035', color: '#ffffff' }}
            >
              <br />
              Final
            </Col>
          </Row>
          {this.state.historico.map(nota => {
            return (
              <Row key={nota.id}>
                <Col
                  xs={12}
                  className='text-left'
                  style={{
                    borderTop: 'solid 2px #9c5035',
                    borderBottom: 'solid 2px #9c5035',
                    backgroundColor: '#e3b9aa'
                  }}
                >
                  {nota.disciplina}
                </Col>
                <Col>{nota.media1}</Col>
                <Col>{nota.media2}</Col>
                <Col>{nota.media3}</Col>
                <Col>{nota.media4}</Col>
                <Col>{nota.mediaAnual}</Col>
                <Col>{nota.recup}</Col>
                <Col>{nota.mediaFinal}</Col>
              </Row>
            );
          })}
        </div>
      </div>
    );
  }
}
