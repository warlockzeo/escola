import React, { Component } from 'react';
import { Card, Button, Spinner, Col } from 'reactstrap';

import Tabela from '../Tabela';
import FormAddNotas from '../FormAddNotas';
import urlBaseApi from '../config';

const campos = [
  {
    id: 'disciplina',
    numeric: false,
    disablePadding: true,
    label: 'Disciplina',
    component: 'th',
    scope: 'row',
    padding: 'none'
  },
  {
    id: 'media1',
    numeric: false,
    disablePadding: true,
    label: '1º Bim',
    component: 'th',
    scope: 'row',
    padding: 'none',
    align: 'center'
  },
  {
    id: 'media2',
    numeric: false,
    disablePadding: true,
    label: '2º Bim',
    component: 'th',
    scope: 'row',
    padding: 'none',
    align: 'center'
  },
  {
    id: 'media3',
    numeric: false,
    disablePadding: true,
    label: '3º Bim',
    component: 'th',
    scope: 'row',
    padding: 'none',
    align: 'center'
  },
  {
    id: 'media4',
    numeric: false,
    disablePadding: true,
    label: '4º Bim',
    component: 'th',
    scope: 'row',
    padding: 'none',
    align: 'center'
  },
  {
    id: 'mediaAnual',
    numeric: false,
    disablePadding: true,
    label: 'Média Anual',
    component: 'th',
    scope: 'row',
    padding: 'none',
    align: 'center'
  },
  {
    id: 'recup',
    numeric: false,
    disablePadding: true,
    label: 'Recup',
    component: 'th',
    scope: 'row',
    padding: 'none',
    align: 'center'
  },
  {
    id: 'mediaFinal',
    numeric: false,
    disablePadding: true,
    label: 'Média Final',
    component: 'th',
    scope: 'row',
    padding: 'none',
    align: 'center'
  }
];

class Historico extends Component {
  state = {
    historico: [],
    historicoAtual: {},
    show: 'table',
    errorMessage: ''
  };

  loadHistorico = aluno => {
    fetch(`${urlBaseApi}listar/historicos/${aluno}`)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ historico: responseJson });
      });
  };

  onEditClick = data => {
    this.setState({ show: 'edit', historicoAtual: data });
  };

  handleSubmit = data => {
    const url = data.id
      ? `${urlBaseApi}atualizar/historicos`
      : `${urlBaseApi}gravar/historicos`;

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
          this.setState({ show: 'table' });
          this.loadHistorico(this.props.aluno);
        } else {
          this.setState({ show: 'edit', errorMessage: responseJson.resp });
        }
      });
  };

  handleCancel = () => {
    this.setState({ show: 'table' });
  };

  componentDidMount() {
    this.loadHistorico(this.props.aluno);
  }

  render() {
    return (
      <>
        {this.state.show === 'table' ? (
          <Col md={12}>
            <Tabela
              titulo='Histórico'
              campos={campos}
              dados={this.state.historico}
              edit={this.onEditClick}
              delete={this.onDeleteClick}
            />
          </Col>
        ) : this.state.show === 'alert' ? (
          <Card className='dashboard__card'>
            <p>
              Confirma exclusão do histórico {this.state.historicoAtual.nome}?
            </p>
            <Button color='success' onClick={this.handleDelete}>
              Sim
            </Button>
            <Button color='danger' onClick={this.cancelDelete}>
              Não
            </Button>
          </Card>
        ) : this.state.show === 'wait' ? (
          <div className='wrap100vh'>
            <Spinner />
          </div>
        ) : (
          <FormAddNotas
            dados={this.state.historicoAtual}
            onSubmit={this.handleSubmit}
            onCancel={this.handleCancel}
            errorMessage={this.state.errorMessage}
          />
        )}
      </>
    );
  }
}

export default Historico;
