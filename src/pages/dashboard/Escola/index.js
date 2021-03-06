import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import getEscolaDados from '../../../store/actions/escola';
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

import urlBaseApi from '../../../components/config';

import './styles.css';

const Abas = style.div`
        width: 95%;
    `;

class Escola extends Component {
  state = {
    activeTab: '',
    show: '',
    showButtons: false,
    files: []
  };

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
        showButtons: false,
        show: ''
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
          show: ''
        });
      })
      .catch(error => console.error(`Caught error:  ${error}`));
  };

  saveFileDb = data => {
    fetch(`${urlBaseApi}files`, {
      method: 'POST',
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.resp !== 'error') {
          console.log(responseJson.resp);
        }
      })
      .then(() => {
        this.loadFiles();
      })
      .catch(error => console.error(`Caught error:  ${error}`));
  };

  uploadFile = data => {
    const { arquivo, nomeArquivo, destinatario } = data;

    const formData = new FormData();
    formData.append('file', arquivo);

    fetch(`${urlBaseApi}files`, {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.resp !== 'error') {
          console.log(responseJson.resp);
        }
      })
      .then(() => {
        this.saveFileDb({
          nomeArquivo: nomeArquivo,
          destinatario: destinatario
        });
      })
      .catch(error => console.error(`Caught error:  ${error}`));
  };

  handleSubmit = data => {
    this.setState({ show: 'wait' });

    fetch(`${urlBaseApi}escola/${this.props.escola.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        ...data,
        id: this.props.escola.id
      })
    })
      .then(response => response)
      .then(responseJson => {
        if (responseJson.resp !== 'error') {
          this.setState({
            escola: data,
            show: this.state.showAnterior
          });
          this.props.getEscolaDados();
        }
      })
      .catch(error => console.error(`Caught error:  ${error}`));
  };

  handleSubmitUploadFiles = data => {
    this.setState({ show: 'wait' });

    this.uploadFile(data);
  };

  handleCancel = () => {
    this.setState({ show: this.state.showAnterior });
//    this.loadEscola();
  };

  onChangeFieldsShowButtons = () => {
    this.setState({ showButtons: true, show: '' });
  };

  handleDeleteFiles = data => {
    const id = data;
    this.setState({ show: 'wait' });
    fetch(`${urlBaseApi}files/${ id }`, {
      method: 'DELETE',
      body: JSON.stringify({ id })
    })
      .then(response => response)
      .then(() => {
        this.loadFiles();
      })
      .catch(error => console.error(`Caught error:  ${ error }`));
  };

  componentDidMount() {
    this.loadFiles();
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
                    {this.state.activeTab === '1' && (
                      <EscolaContatoForm
                        data={this.props.escola}
                        onSubmit={this.handleSubmit}
                        onCancel={this.handleCancel}
                        onChange={this.onChangeFieldsShowButtons}
                        showButtons={this.state.showButtons}
                        errorMessage={this.state.errorMessage}
                      />
                    )}
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId='2'>
                <Row>
                  <Col sm='12'>
                    {this.state.activeTab === '2' && (
                      <EscolaSobreForm
                        data={this.props.escola}
                        onSubmit={this.handleSubmit}
                        onCancel={this.handleCancel}
                        onChange={this.onChangeFieldsShowButtons}
                        showButtons={this.state.showButtons}
                        errorMessage={this.state.errorMessage}
                      />
                    )}
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId='3'>
                <Row>
                  <Col sm='12'>
                    {this.state.activeTab === '3' && (
                      <EscolaEnsinoForm
                        data={this.props.escola}
                        onSubmit={this.handleSubmit}
                        onCancel={this.handleCancel}
                        onChange={this.onChangeFieldsShowButtons}
                        showButtons={this.state.showButtons}
                        errorMessage={this.state.errorMessage}
                      />
                    )}
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId='4'>
                <Row>
                  <Col sm='12'>
                    {this.state.activeTab === '4' && (
                      <EscolaCircularesForm
                        onSubmit={this.handleSubmitUploadFiles}
                        onDelete={this.handleDeleteFiles}
                        onCancel={this.handleCancel}
                        onChange={this.onChangeFieldsShowButtons}
                        showButtons={this.state.showButtons}
                        errorMessage={this.state.errorMessage}
                        files={this.state.files}
                        show={this.state.show}
                      />
                    )}
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

const mapStateToProps = state => ({
  escola: {...state.escola.data}
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({getEscolaDados}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Escola);