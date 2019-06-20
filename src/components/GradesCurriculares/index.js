import React, { Component } from 'react';
import Tabela from '../Tabela';
import { Row, Col, Card, Button, Spinner } from 'reactstrap';
import { Select } from '@rocketseat/unform';
import FormOneField from '../FormOneField';

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

class GradesCurriculares extends Component {
  state = {
    disciplinas: [],
    disciplinaAtual: {},
    gradesCurriculares: [],
    show: 'table',
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
      show: 'edit',
      disciplinaAtual: data
    });
  };

  onAddDisciplinaClick = () => {
    this.setState({ showAnterior: this.state.show, show: 'edit' });
  };

  onDeleteDisciplinaClick = data => {
    this.setState({
      showAnterior: this.state.show,
      show: 'alert',
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

  cancelDelete = () => {
    this.setState({
      show: this.state.showAnterior,
      showAnterior: '',
      DisciplinaAtual: {}
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
    this.setState({ show: this.state.showAnterior, showAnterior: '' });
  };

  onClickDisciplina = () => {
    this.setState({ show: 'Disciplina' });
  };

  onClickGradeCurricular = () => {
    this.setState({ show: 'GradeCurricular' });
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

  componentWillMount() {
    this.loadDisciplinas();
  }

  render() {
    return (
      this.state.show === 'table' && (
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
            add={this.onAddDisciplinaClick}
            edit={this.onEditDisciplinaClick}
            delete={this.onDeleteClick}
          />
        </div>
      )
    );
  }
}

export default GradesCurriculares;
