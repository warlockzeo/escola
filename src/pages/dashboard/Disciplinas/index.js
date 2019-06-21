import React, { Component } from 'react';
import Tabela from '../../../components/Tabela';
import { Row, Col, Spinner } from 'reactstrap';
import { Form, Select } from '@rocketseat/unform';

import FormOneField from '../../../components/FormOneField';
import FormOneSelect from '../../../components/FormOneSelect';
import ConfirmDelete from '../../../components/ConfirmDelete';

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

const campos = [
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

class Disciplina extends Component {
  state = {
    serieAtual: '',
    disciplinas: [],
    disciplinaAtual: {},
    gradesCurriculares: [],
    gradeCurricularAtual: {},
    show: 'tableDisciplina',
    showAnterior: '',
    errorMessage: ''
  };

  loadDisciplinas = () => {
    fetch('http://api/listar/disciplinas')
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
    fetch(`http://api/apagar/disciplinas/${this.state.disciplinaAtual.id}`)
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
      ? 'http://api/atualizar/disciplinas'
      : 'http://api/gravar/disciplinas';

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
          this.setState({ show: this.state.showAnterior, showAnterior: '' });
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
    fetch('http://api/listar/gradesCurriculares')
      .then(response => response.json())
      .then(responseJson => {
        const gradesCurriculares = responseJson.map(disciplina => {
          return {
            id: disciplina.id,
            nome: disciplina.disciplina
          };
        });
        this.setState({ gradesCurriculares });
      });
  };

  loadGradeCurricularDaSerie = serie => {
    fetch(`http://api/gradeCurricular/`, {
      method: 'POST',
      body: JSON.stringify({
        serie
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        const gradesCurriculares = responseJson.map(disciplina => {
          return {
            id: disciplina.id,
            nome: disciplina.disciplina
          };
        });
        this.setState({
          gradesCurriculares,
          serieAtual: serie
        });
      });
  };

  onChangeSerie = e => {
    const serie = e.currentTarget.value;
    this.loadGradeCurricularDaSerie(serie);
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
      `http://api/apagar/gradesCurriculares/${
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
          this.loadGradesCurriculares();
        } else {
          console.log(responseJson.resp);
        }
      });
  };

  handleSubmitGradeCurricular = data => {
    const url = data.id
      ? 'http://api/atualizar/gradesCurriculares'
      : 'http://api/gravar/gradesCurriculares';

    const dados = data.id
      ? { id: data.id, idDisciplina: data.key, serie: this.state.serieAtual }
      : { idDisciplina: data.key, serie: this.state.serieAtual };

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
              campos={campos}
              dados={this.state.disciplinas}
              add={this.onAddDisciplinaClick}
              edit={this.onEditDisciplinaClick}
              delete={this.onDeleteDisciplinaClick}
            />
          </div>
        ) : this.state.show === 'deleteDisciplina' ? (
          <ConfirmDelete
            info={this.state.disciplinaAtual.disciplina}
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
          <Spinner />
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
              <span className='legenda__dados'>Série: </span>
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
            </div>
            {this.state.serieAtual > 0 && (
              <Tabela
                titulo='Grade Curricular'
                campos={campos}
                dados={this.state.gradesCurriculares}
                add={this.onAddGradeCurricularClick}
                edit={this.onEditGradeCurricularClick}
                delete={this.onDeleteGradeCurricularClick}
              />
            )}
          </div>
        ) : (
          this.state.show === 'editAddGradeCurricular' && (
            <FormOneSelect
              titulo='Grade Curricular'
              dados={this.state.gradeCurricularAtual}
              options={this.state.disciplinas}
              onSubmit={this.handleSubmitGradeCurricular}
              onCancel={this.handleCancelForm}
              errorMessage={this.state.errorMessage}
            />
          )
        )}
      </div>
    );
  }
}

export default Disciplina;
