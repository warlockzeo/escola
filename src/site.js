import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as EscolaActions from './store/actions/escola';

import Header from './components/Header';
import Footer from './components/Footer';
import Routes from './routes';

class Site extends Component {
  state = {
    isLogged: localStorage.getItem('user') ? true : false,
    nomeUsuarioLogado: localStorage.getItem('user') || '',
    idUsuarioLogado: localStorage.getItem('userId') || '',
    nivelAcessoUsuarioLogado: localStorage.getItem('userAccessLevel') || ''
  };

  logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    localStorage.removeItem('userAccessLevel');
    window.location.href = '/';
  };

  loadEscolaDados = () => {
    this.props.requestEscolaDados();
  };

  componentWillMount() {
    this.loadEscolaDados();
  }

  render() {
    return (
      <BrowserRouter>
        <div className='App'>
          <Header logout={this.logout} />
          <Routes />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  escola: state.escola
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(EscolaActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Site);
