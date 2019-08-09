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
    this.props.editar(this.props.data);
  };

  handlePassword = () => {
    this.props.password(this.props.data.id);
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
                <span className='legenda__dados'>Nome:</span>
                {this.props.data.nome}
              </Col>
            </Row>
            <Row className='alunosDetalhes__linhaDados'>
              <Col md={3}>
                <span className='legenda__dados'>Mãe:</span>
                {this.props.data.mae}
              </Col>
              <Col md={3}>
                <span className='legenda__dados'>Fone Mãe:</span>
                {this.props.data.foneMae}
              </Col>
              <Col md={3}>
                <span className='legenda__dados'>Pai:</span>
                {this.props.data.pai}
              </Col>
              <Col md={3}>
                <span className='legenda__dados'>Fone Pai:</span>
                {this.props.data.fonePai}
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
                {this.props.data.responsavel}
              </Col>
              <Col md={4}>
                <span className='legenda__dados'>Data de Nascimento:</span>
                {moment(this.props.data.dataNasc).format('DD/MM/YYYY')}
              </Col>
              <Col md={4}>
                <span className='legenda__dados'>Sexo:</span>
                {this.props.data.sexo}
              </Col>
            </Row>
            <Row className='alunosDetalhes__linhaDados'>
              <Col md={2}>
                <span className='legenda__dados'>E-mail:</span>
                {this.props.data.email}
              </Col>
              <Col md={4}>
                <span className='legenda__dados'>Endereço:</span>
                {this.props.data.endereco}
              </Col>
              <Col md={4}>
                <span className='legenda__dados'>Cidade:</span>
                {this.props.data.cidade}
              </Col>
              <Col md={2}>
                <span className='legenda__dados'>UF:</span>
                {this.props.data.uf}
              </Col>
            </Row>
            <Row className='alunosDetalhes__linhaDados'>
              <Col md={12}>
                <span className='legenda__dados'>Observação:</span>
                {this.props.data.obs}
              </Col>
            </Row>
          </Collapse>
        </Card>

        <Row>
          <Faltas aluno={this.props.data.id} turma={this.props.data.idTurma} />
        </Row>
        <Row>
          <Historico aluno={this.props.data.id} tuma={this.props.data.turma} />
        </Row>
      </Col>
    );
  }
}

export default AlunosDetalhes;
