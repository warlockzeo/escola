import React, { Component } from 'react';
import { Provider } from 'react-redux';

import Site from './Site';
import './App.css';

import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Site />
      </Provider>
    );
  }
}

export default App;
