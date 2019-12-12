import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store';
import Site from './Site';

import '../App.css';

const store = configureStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Site />
      </Provider>
    );
  }
}