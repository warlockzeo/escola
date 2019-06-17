import React, { Fragment, Component } from 'react';
import Tabela from '../Tabela';
import { Row, Col, Spinner } from 'reactstrap';
import FormTurmaAddAluno from '../FormTurmaAddAluno';

const gradeAlunos = [
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

class TurmaDetalhes extends Component {
  state = {
    turma: '',
    alunos: [],
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
        const alunos = responseJson.map(aluno => {
          const retorno = {};

          retorno.id = aluno.id;
          retorno.title = aluno.nome;

          return retorno;
        });
        this.setState({ alunos });
      });
  };

  onAddAlunos = () => {
    this.loadAlunos();
    this.setState({ showAnterior: this.state.show, show: 'formAlunos' });
  };

  onDeleteAlunos = () => {};

  onCancel = () => {
    this.setState({ show: this.state.showAnterior, showAnterior: '' });
  };

  componentWillMount() {
    this.setState({ turma: this.props.turma });
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
                {this.state.turma.serie}

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
              dados={this.state.alunos}
              onCancel={this.onCancel}
            />
          </Col>
        ) : (
          this.state.show === 'wait' && <Spinner />
        )}
      </Fragment>
    );
  }
}

export default TurmaDetalhes;
