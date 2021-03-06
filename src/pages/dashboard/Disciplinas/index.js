import React, { Fragment, Component } from 'react';
import Tabela from '../../../components/Tabela';
import { Row, Col, Spinner } from 'reactstrap';
import { Form, Select } from '@rocketseat/unform';

import FormOneField from '../../../components/FormOneField';
import FormAddGradeCurricular from '../../../components/FormAddGradeCurricular';
import ConfirmDelete from '../../../components/ConfirmDelete';

import urlBaseApi from '../../../components/config';

const optionsSeries = [
  { id: '1', title: '1º Ano' },
  { id: '2', title: '2º Ano' },
  { id: '3', title: '3º Ano' },
  { id: '4', title: '4º Ano' },
  { id: '5', title: '5º Ano' },
  { id: '6', title: '6º Ano' },
  { id: '7', title: '7º Ano' },
  { id: '8', title: '8º Ano' },
  { id: '9', title: '9º Ano' }
];

const camposDisciplina = [
  {
    id: 'nome',
    numeric: false,
    disablePadding: true,
    label: 'Disciplina',
    component: 'th',
    scope: 'row',
    padding: 'none'
  }
];

const camposGrade = [
  {
    id: 'nome',
    numeric: false,
    disablePadding: true,
    label: 'Disciplina',
    component: 'th',
    scope: 'row',
    padding: 'none'
  },
  {
    id: 'professor',
    numeric: false,
    disablePadding: true,
    label: 'Professor',
    component: 'th',
    scope: 'row',
    padding: 'none'
  }
];

class Disciplina extends Component {
  state = {
    serieAtual: '',
    horarioAtual: 'Manhã',
    professores: [],
    disciplinas: [],
    disciplinaAtual: {},
    gradesCurriculares: [],
    gradesCurricularesAtuais: [],
    gradeCurricularAtual: {},
    show: 'tableDisciplina',
    showAnterior: '',
    errorMessage: ''
  };

  loadProfessores = () => {
    fetch(`${urlBaseApi}listar/professores`)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.resp === 'ok') {
          const professores = responseJson.data.map(professor => {
            return {
              id: professor.id,
              nome: professor.nome
            };
          });
          this.setState({ professores });
        }
      });
  };

  loadDisciplinas = () => {
    fetch(`${urlBaseApi}listar/disciplinas`)
      .then(response => response.json())
      .then(responseJson => {
        const disciplinas = responseJson.map(disciplina => {
          return {
            id: disciplina.id,
            nome: disciplina.disciplina
          };
        });
        this.setState({ disciplinas });
      });
  };

  onEditDisciplinaClick = data => {
    this.setState({
      showAnterior: this.state.show,
      show: 'editAddDisciplina',
      disciplinaAtual: data
    });
  };

  onAddDisciplinaClick = () => {
    this.setState({
      showAnterior: this.state.show,
      show: 'editAddDisciplina',
      disciplinaAtual: {}
    });
  };

  onDeleteDisciplinaClick = data => {
    this.setState({
      showAnterior: this.state.show,
      show: 'deleteDisciplina',
      disciplinaAtual: data
    });
  };

  handleDeleteDisciplina = () => {
    this.setState({ show: 'wait' });
    fetch(`${urlBaseApi}apagar/disciplinas/${this.state.disciplinaAtual.id}`)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.resp === 'ok') {
          this.setState({
            show: this.state.showAnterior,
            showAnterior: '',
            disciplinaAtual: {}
          });
          this.loadDisciplinas();
        } else {
          console.log(responseJson.resp);
        }
      });
  };

  handleSubmitDisciplina = data => {
    const url = data.id
      ? `${urlBaseApi}atualizar/disciplinas`
      : `${urlBaseApi}gravar/disciplinas`;

    const dados = data.id
      ? { id: data.id, disciplina: data.nome }
      : { disciplina: data.nome };

    this.setState({ show: 'wait' });

    fetch(`${url}`, {
      method: 'POST',
      //mode: 'no-cors',
      body: JSON.stringify({
        ...dados
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.resp !== 'erro') {
          //this.setState({ show: this.state.showAnterior, showAnterior: '' });
          this.loadDisciplinas();
        } else {
          this.setState({ show: 'edit', errorMessage: responseJson.resp });
        }
      });
  };

  handleCancelForm = () => {
    this.setState({
      show: this.state.showAnterior,
      showAnterior: '',
      disciplinaAtual: {},
      gradeCurricularAtual: {}
    });
  };

  onClickDisciplina = () => {
    this.setState({ show: 'tableDisciplina' });
  };

  onClickGradeCurricular = () => {
    this.setState({ show: 'tableGradeCurricular' });
  };

  cancelDelete = () => {
    this.setState({
      show: this.state.showAnterior,
      showAnterior: '',
      DisciplinaAtual: {}
    });
  };

  loadGradesCurriculares = () => {
    fetch(`${urlBaseApi}listar/gradesCurriculares`)
      .then(response => response.json())
      .then(responseJson => {
        const gradesCurriculares = responseJson.map(disciplina => {
          return {
            id: disciplina.id,
            nome: disciplina.disciplina,
            professor: disciplina.professor
          };
        });
        this.setState({
          gradesCurriculares,
          gradesCurricularesAtuais: gradesCurriculares
        });
      });
  };

  loadGradeCurricularDaSerie = serie => {
    fetch(`${urlBaseApi}gradeCurricular/`, {
      method: 'POST',
      body: JSON.stringify({
        serie
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        if (responseJson.resp !== 'erro') {
          const gradesCurriculares = responseJson.data.map(disciplina => {
            return {
              id: disciplina.id,
              nome: disciplina.disciplina,
              professor: disciplina.professor,
              horario: disciplina.horario
            };
          });
          this.setState({
            gradesCurriculares,
            gradesCurricularesAtuais: gradesCurriculares,
            serieAtual: serie
          });
        } else {
          this.setState({
            gradesCurriculares: [],
            serieAtual: serie
          });
        }
      });
  };

  onChangeSerie = e => {
    this.loadGradeCurricularDaSerie(e.currentTarget.value);
  };

  onChangeHorario = e => {
    this.setState({ horarioAtual: e.currentTarget.value });
  };

  onEditGradeCurricularClick = data => {
    this.setState({
      showAnterior: this.state.show,
      show: 'editAddGradeCurricular',
      gradeCurricularAtual: data
    });
  };

  onAddGradeCurricularClick = () => {
    this.setState({
      showAnterior: this.state.show,
      show: 'editAddGradeCurricular',
      gradeCurricularAtual: {}
    });
  };

  onDeleteGradeCurricularClick = data => {
    this.setState({
      showAnterior: this.state.show,
      show: 'deleteGradeCurricular',
      gradeCurricularAtual: data
    });
  };

  handleDeleteGradeCurricular = () => {
    this.setState({ show: 'wait' });
    fetch(
      `${urlBaseApi}apagar/gradesCurriculares/${
        this.state.gradeCurricularAtual.id
      }`
    )
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.resp === 'ok') {
          this.setState({
            show: this.state.showAnterior,
            showAnterior: '',
            gradeCurricularAtual: {}
          });
          this.loadGradeCurricularDaSerie(this.state.serieAtual);
        } else {
          console.log(responseJson.resp);
        }
      });
  };

  handleSubmitGradeCurricular = data => {
    const url = data.id
      ? `${urlBaseApi}atualizar/gradesCurriculares`
      : `${urlBaseApi}gravar/gradesCurriculares`;

    const dados =
      data.id !== ''
        ? {
            id: data.id,
            idDisciplina: data.disciplina,
            idProfessor: data.professor,
            serie: this.state.serieAtual,
            horario: this.state.horarioAtual
          }
        : {
            idDisciplina: data.disciplina,
            idProfessor: data.professor,
            serie: this.state.serieAtual,
            horario: this.state.horarioAtual
          };

    this.setState({ show: 'wait' });

    fetch(`${url}`, {
      method: 'POST',
      body: JSON.stringify({
        ...dados
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.resp !== 'erro') {
          this.setState({ show: this.state.showAnterior, showAnterior: '' });
          this.loadGradeCurricularDaSerie(this.state.serieAtual);
        } else {
          this.setState({ show: 'edit', errorMessage: responseJson.resp });
        }
      });
  };

  componentWillMount() {
    this.loadDisciplinas();
    this.loadProfessores();
  }

  render() {
    return (
      <div className='dashboard'>
        {(this.state.show === 'tableDisciplina' ||
          this.state.show === 'tableGradeCurricular') && (
          <div className='container' style={{ marginTop: 20 }}>
            <Row>
              <Col md={6}>
                <button
                  className='btn btn-success'
                  onClick={this.onClickDisciplina}
                >
                  Disciplinas
                </button>
              </Col>
              <Col md={6}>
                <button
                  className='btn btn-success'
                  onClick={this.onClickGradeCurricular}
                >
                  Grade Curricular
                </button>
              </Col>
            </Row>
          </div>
        )}
        {this.state.show === 'tableDisciplina' ? (
          <div className='container'>
            <Tabela
              titulo='Disciplinas'
              campos={camposDisciplina}
              dados={this.state.disciplinas}
              add={this.onAddDisciplinaClick}
              edit={this.onEditDisciplinaClick}
              delete={this.onDeleteDisciplinaClick}
            />
          </div>
        ) : this.state.show === 'deleteDisciplina' ? (
          <ConfirmDelete
            info={`da disciplina ${this.state.disciplinaAtual.nome}`}
            delete={this.handleDeleteDisciplina}
            cancel={this.cancelDelete}
          />
        ) : this.state.show === 'editAddDisciplina' ? (
          <FormOneField
            titulo='Disciplina'
            dados={this.state.disciplinaAtual}
            onSubmit={this.handleSubmitDisciplina}
            onCancel={this.handleCancelForm}
            errorMessage={this.state.errorMessage}
          />
        ) : this.state.show === 'wait' ? (
          <div className='wrap100vh'>
            <Spinner />
          </div>
        ) : this.state.show === 'tableGradeCurricular' ? (
          <div className='container'>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start'
              }}
            >
              <Col md={2}>
                <span className='legenda__dados'>Série: </span>
              </Col>
              <Col md={4}>
                <Form
                  initialData={{
                    serie: this.state.serieAtual
                  }}
                >
                  <Select
                    name='serie'
                    options={optionsSeries}
                    className='form-control'
                    title='Série'
                    onChange={this.onChangeSerie}
                  />
                </Form>
              </Col>

              {this.state.serieAtual > 0 && (
                <Fragment>
                  <Col md={2}>
                    <span className='legenda__dados'>Horário: </span>
                  </Col>
                  <Col md={4}>
                    <Form
                      initialData={{
                        horario: this.state.horarioAtual
                      }}
                    >
                      <Select
                        name='horario'
                        options={[
                          { id: 'Manhã', title: 'Manhã' },
                          { id: 'Tarde', title: 'Tarde' }
                        ]}
                        className='form-control'
                        title='Horário'
                        onChange={this.onChangeHorario}
                      />
                    </Form>
                  </Col>
                </Fragment>
              )}
            </div>
            {this.state.serieAtual > 0 && (
              <Tabela
                titulo='Grade Curricular'
                campos={camposGrade}
                dados={this.state.gradesCurriculares.filter(
                  grade => grade.horario === this.state.horarioAtual && grade
                )}
                add={this.onAddGradeCurricularClick}
                edit={this.onEditGradeCurricularClick}
                delete={this.onDeleteGradeCurricularClick}
              />
            )}
          </div>
        ) : this.state.show === 'editAddGradeCurricular' ? (
          <FormAddGradeCurricular
            titulo='Grade Curricular'
            dados={this.state.gradeCurricularAtual}
            optionsDisciplina={this.state.disciplinas}
            optionsProfessor={this.state.professores}
            onSubmit={this.handleSubmitGradeCurricular}
            onCancel={this.handleCancelForm}
            errorMessage={this.state.errorMessage}
          />
        ) : (
          this.state.show === 'deleteGradeCurricular' && (
            <ConfirmDelete
              info={`da disciplina ${
                this.state.gradeCurricularAtual.nome
              } desta grade curricular`}
              delete={this.handleDeleteGradeCurricular}
              cancel={this.cancelDelete}
            />
          )
        )}
      </div>
    );
  }
}

export default Disciplina;
