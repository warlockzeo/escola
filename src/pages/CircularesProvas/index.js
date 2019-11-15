import React, { Fragment, Component } from 'react';
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

import urlBaseApi from '../../components/config';

const Abas = style.div`
    width: 95%;
`;

class CircularesProvas extends Component {
  state = {
    activeTab: '1',
    files: []
  };

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  loadFiles = () => {
    fetch(`${urlBaseApi}files`)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          files: responseJson,
          showButtons: false,
          show: 'table'
        });
      })
      .catch(error => console.error(`Caught error:  ${error}`));
  };

  componentWillMount() {
    this.loadFiles();
  }

  render() {
    return (
      <Fragment>
        <h1>Nossos Circulares Abaixo</h1>
        <Abas>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '1' })}
                onClick={() => {
                  this.toggle('1');
                }}
              >
                Educação Infantil
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '2' })}
                onClick={() => {
                  this.toggle('2');
                }}
              >
                Fundamental I
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '3' })}
                onClick={() => {
                  this.toggle('3');
                }}
              >
                Fundamental II
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
                  <h4>Conteúdo Educação Infantil</h4>
                  {this.state.files
                    .filter(file => file.destinatario === 'Educação Infantil')
                    .map(file => (
                      <a
                        key={file.id}
                        href={`/circulares/${file.nomeArquivo}`}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <br />
                        {file.nomeArquivo}
                      </a>
                    ))}
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId='2'>
              <Row>
                <Col sm='12'>
                  <h4>Conteúdo Fundamental I</h4>
                  {this.state.files
                    .filter(file => file.destinatario === 'Fundamental I')
                    .map(file => (
                      <a
                        key={file.id}
                        href={`/circulares/${file.nomeArquivo}`}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <br />
                        {file.nomeArquivo}
                      </a>
                    ))}
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId='3'>
              <Row>
                <Col sm='12'>
                  <h4>Conteúdo Fundamental II</h4>
                  {this.state.files
                    .filter(file => file.destinatario === 'Fundamental II')
                    .map(file => (
                      <a
                        key={file.id}
                        href={`/circulares/${file.nomeArquivo}`}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <br />
                        {file.nomeArquivo}
                      </a>
                    ))}
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </Abas>
      </Fragment>
    );
  }
}

export default CircularesProvas;
