import React, { Component } from 'react';
import { Card, Row, Col, Collapse } from 'reactstrap';
import moment from 'moment';
import Historico from '../Historico';
import Faltas from '../Faltas';

import './styles.css';

class AlunosDetalhes extends Component {
  state = {
    collapse: false
  };

  toggle = () => {
    this.setState(state => ({ collapse: !state.collapse }));
  };

  handleEdit = () => {
    this.props.editar(this.props.dados);
  };

  handlePassword = () => {
    this.props.password(this.props.dados.id);
  };

  render() {
    return (
      <Col md={12} className='alunosDetalhes' style={{ textAlign: 'left' }}>
        <span className='btnCancel' onClick={this.props.cancel} title='Voltar'>
          <i className='fa fa-times-circle' aria-hidden='true' />
        </span>
        <Row>
          <h1>Cadastro do Aluno</h1>
        </Row>
        <Card className='alunosDetalhes__dados'>
          <span className='btnPassword' onClick={this.handlePassword}>
            <i className='fas fa-key' title='Cadastrar/Editar password' />
          </span>
          <span className='btnEdit' onClick={this.handleEdit}>
            <i className='fas fa-user-edit' title='Editar dados' />
          </span>
          <div className='alunosDetalhes__dados--show'>
            <Row className='alunosDetalhes__linhaDados'>
              <Col md={12}>
                <span className='legenda__dados'>Nome</span>:
                {this.props.dados.nome}
              </Col>
            </Row>
            <Row className='alunosDetalhes__linhaDados'>
              <Col md={3}>
                <span className='legenda__dados'>Mãe:</span>
                {this.props.dados.mae}
              </Col>
              <Col md={3}>
                <span className='legenda__dados'>Fone Mãe:</span>
                {this.props.dados.foneMae}
              </Col>
              <Col md={3}>
                <span className='legenda__dados'>Pai:</span>
                {this.props.dados.pai}
              </Col>
              <Col md={3}>
                <span className='legenda__dados'>Fone Pai:</span>
                {this.props.dados.fonePai}
              </Col>
            </Row>
            <span className='btnToggle' onClick={this.toggle}>
              {this.state.collapse ? `Mostrar Menos` : `Mostrar tudo`}
            </span>
          </div>

          <Collapse isOpen={this.state.collapse}>
            <Row className='alunosDetalhes__linhaDados'>
              <Col md={4}>
                <span className='legenda__dados'>Responsável:</span>
                {this.props.dados.responsavel}
              </Col>
              <Col md={4}>
                <span className='legenda__dados'>Data de Nascimento:</span>
                {moment(this.props.dados.dataNasc).format('DD/MM/YYYY')}
              </Col>
              <Col md={4}>
                <span className='legenda__dados'>Sexo:</span>
                {this.props.dados.sexo}
              </Col>
            </Row>
            <Row className='alunosDetalhes__linhaDados'>
              <Col md={2}>
                <span className='legenda__dados'>E-mail:</span>
                {this.props.dados.email}
              </Col>
              <Col md={4}>
                <span className='legenda__dados'>Endereço:</span>
                {this.props.dados.endereco}
              </Col>
              <Col md={4}>
                <span className='legenda__dados'>Cidade:</span>
                {this.props.dados.cidade}
              </Col>
              <Col md={2}>
                <span className='legenda__dados'>UF:</span>
                {this.props.dados.uf}
              </Col>
            </Row>
            <Row className='alunosDetalhes__linhaDados'>
              <Col md={12}>
                <span className='legenda__dados'>Observação:</span>
                {this.props.dados.obs}
              </Col>
            </Row>
          </Collapse>
        </Card>

        <Row>
          <Faltas />
        </Row>
        <Row>
          <Historico
            aluno={this.props.dados.id}
            tuma={this.props.dados.turma}
          />
        </Row>
      </Col>
    );
  }
}

export default AlunosDetalhes;
