import React, { Fragment, Component } from 'react';
import Tabela from '../Tabela';
import { Row, Col, Spinner } from 'reactstrap';

import FormTurmaAddAluno from '../FormTurmaAddAluno';
import ConfirmDelete from '../ConfirmDelete';

const gradeAlunos = [
  {
    id: 'nome',
    numeric: false,
    disablePadding: true,
    label: 'Nome do Aluno',
    component: 'th',
    scope: 'row',
    padding: 'none'
  }
];

class TurmaDetalhes extends Component {
  state = {
    turma: {},
    alunosSemMatricula: [],
    gradeAlunos: [],
    alunoAtual: {},
    show: 'tableAlunos',
    showAnterior: '',
    errorMessage: ''
  };

  loadAlunos = () => {
    fetch(`http://api/listarAlunosSemMatricula/${this.state.turma.ano}`)
      .then(response => response.json())
      .then(responseJson => {
        const alunosSemMatricula = responseJson.map(aluno => {
          const retorno = {};

          retorno.id = aluno.id;
          retorno.title = aluno.nome;

          return retorno;
        });
        this.setState({ alunosSemMatricula });
      });
  };

  loadGradeAlunos = () => {
    fetch(`http://api/gradeAlunos/${this.state.turma.id}`)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ gradeAlunos: responseJson });
      });
  };

  handleSubmit = data => {
    this.setState({ show: 'wait' });
    fetch('http://api/gravar/gradesAlunos', {
      method: 'POST',
      body: JSON.stringify({
        idAluno: data.aluno,
        idTurma: this.state.turma.id
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.resp === 'ok') {
          this.setState({ show: this.state.showAnterior, showAnterior: '' });
          this.loadGradeAlunos(this.state.turma.id);
        } else {
          this.setState({ show: 'formAlunos' });
        }
      });
  };

  onAddAlunos = () => {
    this.loadAlunos();
    this.setState({ showAnterior: this.state.show, show: 'formAlunos' });
  };

  handleDeleteAlunos = () => {
    this.setState({ show: 'wait' });
    fetch(`http://api/apagar/gradesAlunos/${this.state.alunoAtual.id}`)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.resp === 'ok') {
          this.setState({ show: this.state.showAnterior, showAnterior: '' });
          this.loadGradeAlunos(this.state.turma.id);
        }
      });
  };

  onDeleteAlunos = data => {
    this.setState({
      showAnterior: this.state.show,
      show: 'alert',
      alunoAtual: data
    });
  };

  onCancel = () => {
    this.setState({ show: this.state.showAnterior, showAnterior: '' });
  };

  componentWillMount() {
    this.setState({ turma: this.props.turma });
  }

  componentDidMount() {
    this.loadGradeAlunos(this.state.turma.id);
  }

  render() {
    return (
      <Fragment>
        {this.state.show === 'tableAlunos' && (
          <Fragment>
            <span
              className='btnCancel'
              onClick={this.props.cancel}
              title='Voltar'
            >
              <i className='fa fa-times-circle' aria-hidden='true' />
            </span>
            <Row>
              <Col md={12} className='turma__dados'>
                <span className='legenda__dados'>Turma: </span>
                {this.state.turma.descricao}
                <span className='legenda__dados'>Série: </span>
                {this.state.turma.serie}º Ano
                <span className='legenda__dados'>Horário: </span>
                {this.state.turma.horario}
              </Col>
            </Row>
          </Fragment>
        )}

        {this.state.show === 'tableAlunos' ? (
          <Col md={12}>
            <Tabela
              titulo='Grade de Alunos'
              campos={gradeAlunos}
              dados={this.state.gradeAlunos}
              add={this.onAddAlunos}
              delete={this.onDeleteAlunos}
            />
          </Col>
        ) : this.state.show === 'formAlunos' ? (
          <Col md={12}>
            <FormTurmaAddAluno
              dados={this.state.alunosSemMatricula}
              onCancel={this.onCancel}
              onSubmit={this.handleSubmit}
            />
          </Col>
        ) : this.state.show === 'alert' ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ConfirmDelete
              info={`do aluno(a) ${this.state.alunoAtual.nome} desta turma`}
              delete={this.handleDeleteAlunos}
              cancel={this.onCancel}
            />
          </div>
        ) : (
          this.state.show === 'wait' && (
            <div className='wrap100vh'>
              <Spinner />
            </div>
          )
        )}
      </Fragment>
    );
  }
}

export default TurmaDetalhes;
