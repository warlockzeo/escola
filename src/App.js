import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Routes from './routes';

class App extends Component {
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

  render() {
    return (
      <BrowserRouter>
        <div className='App'>
          <Header {...this.state} logout={this.logout} />
          <Routes />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
