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

  render() {
    return (
      <BrowserRouter>
        <div className='App'>
          <Header {...this.state} />
          <Routes />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
