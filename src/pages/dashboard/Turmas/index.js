import React, { Component, Fragment } from 'react';
import Tabela from '../../../components/Tabela';
import { Row, Col, Spinner } from 'reactstrap';
import { Select, Form } from '@rocketseat/unform';
import * as Yup from 'yup';

import FormTurma from '../../../components/FormTurma';
import TurmaDetalhes from '../../../components/TurmaDetalhes';
import ConfirmDelete from '../../../components/ConfirmDelete';

import './styles.css';

const schema = Yup.object().shape({
  ano: Yup.string()
});

const campos = [
  {
    id: 'descricao',
    numeric: false,
    disablePadding: true,
    label: 'Descrição',
    component: 'th',
    scope: 'row',
    padding: 'none'
  },
  {
    id: 'serie',
    numeric: false,
    disablePadding: false,
    label: 'Série',
    align: 'left'
  },
  {
    id: 'horario',
    numeric: false,
    disablePadding: false,
    label: 'Horário',
    align: 'left'
  }
];

class Turmas extends Component {
  state = {
    turmas: [],
    turmaAtual: {},
    show: 'table',
    showAnterior: '',
    errorMessage: '',
    anos: [],
    ano: ''
  };

  loadAnos = () => {
    fetch(`http://api/listarAnos`)
      .then(response => response.json())
      .then(responseJson => {
        const anos = responseJson.map(ano => {
          const retorno = {};

          retorno.id = ano.ano;
          retorno.title = ano.ano;

          return retorno;
        });
        this.setState({ anos });
      });
  };

  loadTurmas = ano => {
    fetch(`http://api/listar/turmas/${ano}`)
      .then(response => response.json())
      .then(responseJson => {
        const turmas = responseJson.map(turma => {
          const retorno = {};

          retorno.id = turma.id;
          retorno.ano = turma.ano;
          retorno.serie = `${turma.serie}º ano`;
          retorno.descricao = turma.descricao;
          retorno.horario = turma.horario;

          return retorno;
        });
        this.setState({ turmas });
      });
  };

  onEditClick = data => {
    this.setState({
      showAnterior: this.state.show,
      show: 'edit',
      turmaAtual: data
    });
  };

  onAddClick = () => {
    this.setState({
      showAnterior: this.state.show,
      show: 'add',
      turmaAtual: {}
    });
  };

  handleSubmit = data => {
    const url = data.id
      ? 'http://api/atualizar/turmas'
      : 'http://api/gravar/turmas';

    this.setState({ show: 'wait' });

    fetch(`${url}`, {
      method: 'POST',
      body: JSON.stringify({
        ...data
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.resp !== 'erro') {
          this.setState({
            turmaAtual: data,
            show: this.state.showAnterior,
            showAnterior: ''
          });
          this.loadTurmas(this.state.ano);
        } else {
          this.setState({ show: 'edit', errorMessage: responseJson.resp });
        }
      });
  };

  handleCancel = () => {
    this.setState({ show: this.state.showAnterior, showAnterior: '' });
  };

  onDeleteClick = data => {
    this.setState({ show: 'alert', turmaAtual: data });
  };

  handleDelete = () => {
    this.setState({ show: 'wait' });
    fetch(`http://api/apagar/turmas/${this.state.turmaAtual.id}`)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.resp === 'ok') {
          this.setState({ show: 'table', turmaAtual: {} });
          this.loadTurmas(this.state.ano);
        } else {
          console.log(responseJson.resp);
        }
      });
  };

  cancelDelete = () => {
    this.setState({ show: 'table', turmaAtual: {} });
  };

  onDetalhesClick = data => {
    this.setState({ show: 'detalhes', turmaAtual: data });
  };

  cancelDetalhes = () => {
    this.setState({ show: 'table' });
  };

  onChangeAno = e => {
    this.setState({ ano: e.currentTarget.value });
    this.loadTurmas(e.currentTarget.value);
  };

  componentWillMount() {
    this.loadAnos();
  }

  render() {
    return (
      <div className='dashboard turmas'>
        {this.state.show === 'table' ? (
          <Fragment>
            <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Col md={3}>
                <span className='legenda__dados'>Ano:</span>
              </Col>
              <Col md={9}>
                <Form schema={schema} initialData={{ ano: this.state.ano }}>
                  <Select
                    name='ano'
                    options={this.state.anos}
                    className='form-control'
                    title='Anos'
                    onChange={this.onChangeAno}
                  />
                </Form>
              </Col>
            </Row>
            {this.state.ano && (
              <Col md={12}>
                <Tabela
                  titulo='Turmas'
                  campos={campos}
                  dados={this.state.turmas}
                  add={this.onAddClick}
                  edit={this.onEditClick}
                  delete={this.onDeleteClick}
                  details={this.onDetalhesClick}
                />
              </Col>
            )}
          </Fragment>
        ) : this.state.show === 'alert' ? (
          <ConfirmDelete
            info={`da turma ${this.state.turmaAtual.descricao}`}
            delete={this.handleDelete}
            cancel={this.cancelDelete}
          />
        ) : this.state.show === 'wait' ? (
          <div className='wrap100vh'>
            <Spinner />
          </div>
        ) : this.state.show === 'detalhes' ? (
          <Col md={12}>
            <TurmaDetalhes
              turma={this.state.turmaAtual}
              cancel={this.cancelDetalhes}
            />
          </Col>
        ) : (
          <Col md={12}>
            <FormTurma
              dados={this.state.turmaAtual}
              onSubmit={this.handleSubmit}
              onCancel={this.handleCancel}
              errorMessage={this.state.errorMessage}
              ano={!this.state.turmaAtual.ano && this.state.ano}
            />
          </Col>
        )}
      </div>
    );
  }
}

export default Turmas;
