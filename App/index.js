import React, {PropTypes} from 'react';
import {
  View,
  StyleSheet,Text
} from 'react-native';
import App from './App';
import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import session from './store/reducer.js';

const middleware = [thunk];
const store=createStore(session,applyMiddleware(...middleware))

export default class Index extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
      );
  }
}
