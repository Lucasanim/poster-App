import React from 'react';

import Container from './src/navigation/Container'

import {Store} from './src/redux/Store'

import { Provider } from 'react-redux'

const App = () => {
  return <Container />
};

export default () =>{ 
  return <Provider store={Store} >
    <App />
  </Provider>
}