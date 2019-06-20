import React, { Component } from 'react';
import Tabela from '../../../components/Tabela';
import { Row, Col, Spinner } from 'reactstrap';
import { Select } from '@rocketseat/unform';

import FormOneField from '../../../components/FormOneField';
import ConfirmDelete from '../../../components/ConfirmDelete';

const optionsSeries = [
  { id: '1º Ano', title: '1º Ano' },
  { id: '2º Ano', title: '2º Ano' },
  { id: '3º Ano', title: '3º Ano' },
  { id: '4º Ano', title: '4º Ano' },
  { id: '5º Ano', title: '5º Ano' },
  { id: '6º Ano', title: '6º Ano' },
  { id: '7º Ano', title: '7º Ano' },
  { id: '8º Ano', title: '8º Ano' },
  { id: '9º Ano', title: '9º Ano' }
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
    console.log(data);
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

  handleCancelFormDisciplina = () => {
    this.setState({
      show: this.state.showAnterior,
      showAnterior: '',
      disciplinaAtual: ''
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

  onChangeSerie = e => {
    fetch(`http://api/gradeCurricular/`, {
      method: 'POST',
      body: JSON.stringify({
        serie: e.currentTarget.value
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
        this.setState({ gradesCurriculares });
      });
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
            onCancel={this.handleCancelFormDisciplina}
            errorMessage={this.state.errorMessage}
          />
        ) : this.state.show === 'wait' ? (
          <Spinner />
        ) : this.state.show === 'tableGradeCurricular' ? (
          <div className='container'>
            <Col md={6}>Série: </Col>
            <Col md={6}>
              <Select
                name='serie'
                options={optionsSeries}
                className='form-control'
                title='Série'
                onChange={this.onChangeSerie}
              />
            </Col>
            <Tabela
              titulo='Grade Curricular'
              campos={campos}
              dados={this.state.gradesCurriculares}
              add={this.onAddGradeCurricularClick}
              edit={this.onEditGradeCurricularClick}
              delete={this.onDeleteGradeCurricularClick}
            />
          </div>
        ) : (
          this.state.show === 'editAddGradeCurricular' && (
            <FormOneField
              titulo='Grade Curricular'
              dados={this.state.gradeCurricularAtual}
              onSubmit={this.handleSubmitDisciplina}
              onCancel={this.handleCancelFormDisciplina}
              errorMessage={this.state.errorMessage}
            />
          )
        )}
      </div>
    );
  }
}

export default Disciplina;
