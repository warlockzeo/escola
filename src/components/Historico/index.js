import React, { Fragment, Component } from 'react';
import Tabela from '../Tabela';
import { Card, Button, Spinner, Col } from 'reactstrap';

import FormAddNotas from '../FormAddNotas';

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
    id: 'teste1',
    numeric: false,
    disablePadding: true,
    label: '1º Bim Teste',
    component: 'th',
    scope: 'row',
    padding: 'none',
    align: 'center'
  },
  {
    id: 'prova1',
    numeric: false,
    disablePadding: true,
    label: '1º Bim Prova',
    component: 'th',
    scope: 'row',
    padding: 'none',
    align: 'center'
  },
  {
    id: 'media1',
    numeric: false,
    disablePadding: true,
    label: '1º Bim Média',
    component: 'th',
    scope: 'row',
    padding: 'none',
    align: 'center'
  },
  {
    id: 'teste2',
    numeric: false,
    disablePadding: true,
    label: '2º Bim Teste',
    component: 'th',
    scope: 'row',
    padding: 'none',
    align: 'center'
  },
  {
    id: 'prova2',
    numeric: false,
    disablePadding: true,
    label: '2º Bim Prova',
    component: 'th',
    scope: 'row',
    padding: 'none',
    align: 'center'
  },
  {
    id: 'media2',
    numeric: false,
    disablePadding: true,
    label: '2º Bim Média',
    component: 'th',
    scope: 'row',
    padding: 'none',
    align: 'center'
  },
  {
    id: 'teste3',
    numeric: false,
    disablePadding: true,
    label: '3º Bim Teste',
    component: 'th',
    scope: 'row',
    padding: 'none',
    align: 'center'
  },
  {
    id: 'prova3',
    numeric: false,
    disablePadding: true,
    label: '3º Bim Prova',
    component: 'th',
    scope: 'row',
    padding: 'none',
    align: 'center'
  },
  {
    id: 'media3',
    numeric: false,
    disablePadding: true,
    label: '3º Bim Média',
    component: 'th',
    scope: 'row',
    padding: 'none',
    align: 'center'
  },
  {
    id: 'teste4',
    numeric: false,
    disablePadding: true,
    label: '4º Bim Teste',
    component: 'th',
    scope: 'row',
    padding: 'none',
    align: 'center'
  },
  {
    id: 'prova4',
    numeric: false,
    disablePadding: true,
    label: '4º Bim Prova',
    component: 'th',
    scope: 'row',
    padding: 'none',
    align: 'center'
  },
  {
    id: 'media4',
    numeric: false,
    disablePadding: true,
    label: '4º Bim Média',
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

  loadHistorico = (turma, aluno) => {
    fetch(`http://api/listar/historicos/${aluno}`)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ historico: responseJson });
      });
  };

  onEditClick = data => {
    this.setState({ show: 'edit', historicoAtual: data });
  };

  handleSubmit = data => {
    console.log(data);
    const url = data.id
      ? 'http://api/atualizar/historicos'
      : 'http://api/gravar/historicos';

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
          this.loadHistorico(this.props.ano, this.props.aluno);
        } else {
          this.setState({ show: 'edit', errorMessage: responseJson.resp });
        }
      });
  };

  handleCancel = () => {
    this.setState({ show: 'table' });
  };

  componentWillMount() {
    this.loadHistorico(this.props.ano, this.props.aluno);
  }

  render() {
    return (
      <Fragment>
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
          <Spinner />
        ) : (
          <FormAddNotas
            dados={this.state.historicoAtual}
            onSubmit={this.handleSubmit}
            onCancel={this.handleCancel}
            errorMessage={this.state.errorMessage}
          />
        )}
      </Fragment>
    );
  }
}

export default Historico;
