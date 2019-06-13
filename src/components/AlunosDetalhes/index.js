import React, { Component } from 'react';
import { Row, Col, Collapse, Button } from 'reactstrap';

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

  render() {
    return (
      <Col md={12} className='alunosDetalhes' style={{ textAlign: 'left' }}>
        <span
          className='btnCancel'
          onClick={this.props.cancel}
          title='Cancelar'
        >
          <i className='fa fa-times-circle' aria-hidden='true' />
        </span>
        <Row>
          <h1>Cadastro do Aluno</h1>
        </Row>
        <Row>
          <Button className='btnEdit' onClick={this.handleEdit}>
            Editar
          </Button>
          <Col md={12}>Nome: {this.props.dados.nome}</Col>

          <Button
            color='primary'
            onClick={this.toggle}
            style={{ marginBottom: '1rem' }}
          >
            Mostrar tudo
          </Button>
          <Collapse isOpen={this.state.collapse}>
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
            terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
            labore wes anderson cred nesciunt sapiente ea proident.
          </Collapse>
        </Row>
        <Row>Faltas</Row>
        <Row>Notas</Row>
      </Col>
    );
  }
}

export default AlunosDetalhes;
