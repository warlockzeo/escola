import React, { Component } from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col
} from 'reactstrap';
import classnames from 'classnames';
import style from 'styled-components';

import EscolaContatoForm from '../../../components/EscolaContatoForm';
import EscolaSobreForm from '../../../components/EscolaSobreForm';
import EscolaEnsinoForm from '../../../components/EscolaEnsinoForm';
import EscolaCircularesForm from '../../../components/EscolaCircularesForm';

import './styles.css';

const Abas = style.div`
        width: 95%;
    `;

class Escola extends Component {
  state = {
    activeTab: '1',
    showButtons: false,
    escola: {}
  };

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
        showButtons: false
      });
    }
  }

  loadEscola = () => {
    fetch('http://api/listar/escola')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ escola: responseJson, showButtons: false });
      });
  };

  handleSubmit = data => {
    const url = this.state.escola.id
      ? 'http://api/atualizar/escola'
      : 'http://api/gravar/escola';

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
            escola: data,
            show: this.state.showAnterior
          });
          this.loadEscola();
        } else {
          this.setState({
            show: 'edit',
            errorMessage: responseJson.resp
          });
        }
      });
  };

  handleCancel = () => {
    this.setState({ show: this.state.showAnterior });
    this.loadEscola();
  };

  onChangeFields = () => {
    this.setState({ showButtons: true });
  };

  componentDidMount() {
    this.loadEscola();
  }

  render() {
    return (
      <div className='dashboard'>
        <div className='container'>
          <Abas>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === '1'
                  })}
                  onClick={() => {
                    this.toggle('1');
                  }}
                >
                  Contatos
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === '2'
                  })}
                  onClick={() => {
                    this.toggle('2');
                  }}
                >
                  Sobre
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === '3'
                  })}
                  onClick={() => {
                    this.toggle('3');
                  }}
                >
                  Ensino
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === '4'
                  })}
                  onClick={() => {
                    this.toggle('4');
                  }}
                >
                  Circulares / Provas
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent
              activeTab={this.state.activeTab}
              style={{
                border: 'solid 1px #dee2e6',
                padding: 10
              }}
            >
              <TabPane tabId='1'>
                <Row>
                  <Col sm='12'>
                    <EscolaContatoForm
                      onSubmit={this.handleSubmit}
                      onCancel={this.handleCancel}
                      onChange={this.onChangeFields}
                      showButtons={this.state.showButtons}
                      errorMessage={this.state.errorMessage}
                    />
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId='2'>
                <Row>
                  <Col sm='12'>
                    <EscolaSobreForm
                      onSubmit={this.handleSubmit}
                      onCancel={this.handleCancel}
                      onChange={this.onChangeFields}
                      showButtons={this.state.showButtons}
                      errorMessage={this.state.errorMessage}
                    />
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId='3'>
                <Row>
                  <Col sm='12'>
                    <EscolaEnsinoForm
                      onSubmit={this.handleSubmit}
                      onCancel={this.handleCancel}
                      onChange={this.onChangeFields}
                      showButtons={this.state.showButtons}
                      errorMessage={this.state.errorMessage}
                    />
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId='4'>
                <Row>
                  <Col sm='12'>
                    <EscolaCircularesForm
                      onSubmit={this.handleSubmit}
                      onCancel={this.handleCancel}
                      onChange={this.onChangeFields}
                      showButtons={this.state.showButtons}
                      errorMessage={this.state.errorMessage}
                    />
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </Abas>
        </div>
      </div>
    );
  }
}

export default Escola;
