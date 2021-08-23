import { Container } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import reducer from 'calgen/app/reducers';
import LayoutContentView from 'calgen/layout/view/LayoutContentView';
import LayoutHeaderView from 'calgen/layout/view/LayoutHeaderView';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import './App.css';


const logger = createLogger({});

const store = createStore(reducer, applyMiddleware(logger))

function App() {

  return (
    <Router>
      <Provider store={store}>
        <div className="App">
          <CssBaseline />
          <LayoutHeaderView />
          <Container maxWidth="lg" className="main-cont">
            <Typography variant="h4" component="h1" align="center">小学数学计算题生成器</Typography>
            <LayoutContentView />
          </Container>
        </div>
      </Provider>
    </Router >
  );
}

export default App;
