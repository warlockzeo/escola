import React, { Component, Fragment } from 'react';
import { Spinner, Card, Button, Row, Col } from 'reactstrap';
import moment from 'moment';

import './styles.css';
import FormAddFalta from '../FormAddFalta';
import FormJustificativa from '../FormJustificativa';

import urlBaseApi from '../config';
class Faltas extends Component {
  state = {
    show: 'faltas',
    showAnterior: '',
    disciplinas: [],
    faltas: [],
    faltasJustificadas: []
  };

  loadTurmaParaGradeCurricular = turma => {
    fetch(`${urlBaseApi}exibeTurma/${turma}`)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ turma: responseJson[0] });
        this.loadGradeCurricularDaSerie(responseJson[0].serie);
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
        let disciplinas = [];
        if (responseJson.resp !== 'erro') {
          disciplinas = responseJson.data
            .filter(grade => grade.horario === this.state.turma.horario)
            .map(disciplina => {
              return {
                id: disciplina.id,
                title: disciplina.disciplina
              };
            });
        }

        this.setState({ disciplinas });
      });
  };

  loadFaltas = (aluno, turma) => {
    fetch(`${urlBaseApi}listarFaltas/${aluno}/${turma}`)
      .then(response => response.json())
      .then(responseJson => {
        const faltas = responseJson.map(falta => {
          return {
            id: falta.id,
            nome: falta.disciplina,
            data: falta.data,
            justificativa: falta.justificativa
          };
        });

        const faltasJustificadas = faltas.filter(falta => falta.justificativa);

        this.setState({ faltas, faltasJustificadas });
      });
  };

  onAddFaltasClick = () => {
    this.setState({ showAnterior: this.state.show, show: 'form' });
  };

  onJustificaFaltaClick = () => {
    this.setState({ showAnterior: this.state.show, show: 'formJustifica' });
  };

  handleCancel = () => {
    this.setState({ show: this.state.showAnterior, showAnterior: '' });
  };

  handleSubmit = data => {
    this.setState({ show: 'wait' });

    fetch(`${urlBaseApi}gravar/faltas`, {
      method: 'POST',
      body: JSON.stringify({
        ...data,
        justificativa: ''
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.resp !== 'erro') {
          this.setState({ show: this.state.showAnterior });
          this.loadFaltas(this.props.aluno, this.props.turma);
        } else {
          this.setState({ show: 'edit', errorMessage: responseJson.resp });
        }
      });
  };

  handleSubmitJustificativa = data => {
    this.setState({ show: 'wait' });

    fetch(`${urlBaseApi}justificarFalta`, {
      method: 'POST',
      body: JSON.stringify({
        ...data
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.resp !== 'erro') {
          this.setState({ show: this.state.showAnterior, showAnterior: '' });
          this.loadFaltas(this.props.aluno, this.props.turma);
        }
      });
  };

  componentWillMount() {
    this.loadFaltas(this.props.aluno, this.props.turma);
    this.loadTurmaParaGradeCurricular(this.props.turma);
  }

  render() {
    return (
      <Col md={12}>
        <Card className='faltas__box'>
          {this.state.show === 'faltas' ? (
            <Row>
              <Col
                md={4}
                lg={2}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <h2>Faltas: </h2>
              </Col>
              <Col
                md={8}
                lg={4}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                {this.state.faltas.length > 0 ? (
                  <div>
                    <p>
                      <span className='faltas__numFaltas'>
                        {this.state.faltas.length}
                      </span>{' '}
                      falta(s) até agora no ano de {moment().format('YYYY')}.
                    </p>
                    <p>
                      <span className='faltas__numFaltas'>
                        {this.state.faltasJustificadas.length}
                      </span>{' '}
                      falta(s) justificada(s).
                    </p>
                  </div>
                ) : (
                  <Fragment>
                    <span className='faltas__numFaltas'>
                      Nenhuma falta até agora no ano de{' '}
                      {moment().format('YYYY')}.
                    </span>
                  </Fragment>
                )}
              </Col>
              <Col
                md={6}
                lg={3}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <Button
                  className='btn-success btn-addFalta'
                  color='primary'
                  onClick={this.onAddFaltasClick}
                >
                  Registrar falta
                </Button>
              </Col>
              <Col
                md={6}
                lg={3}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <Button
                  className='btn-success btn-addFalta'
                  color='primary'
                  onClick={this.onJustificaFaltaClick}
                >
                  Justificar falta
                </Button>
              </Col>
            </Row>
          ) : this.state.show === 'wait' ? (
            <div className='wrap100vh'>
              <Spinner color='primary' />
            </div>
          ) : this.state.show === 'form' ? (
            <FormAddFalta
              disciplinas={this.state.disciplinas}
              dados={{ idAluno: this.props.aluno, idTurma: this.props.turma }}
              onSubmit={this.handleSubmit}
              onCancel={this.handleCancel}
            />
          ) : (
            <FormJustificativa
              faltas={this.state.faltas}
              onSubmitJustificativa={this.handleSubmitJustificativa}
              onCancel={this.handleCancel}
            />
          )}
        </Card>
      </Col>
    );
  }
}

export default Faltas;
