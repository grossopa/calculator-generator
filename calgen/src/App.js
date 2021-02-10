import { Container } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import HeaderView from 'calc/view/HeaderView';
import QuestionTitleView from 'calc/view/QuestionTitleView';
import QuestionView from 'calc/view/QuestionView';
import QuickBarView from 'calc/view/QuickBarView';
import LayoutHeaderView from 'layout/view/LayoutHeaderView';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import './App.css';
import reducer from './app/reducers';
import TreeGen from 'service/TreeGen'


const logger = createLogger({});

const store = createStore(reducer, applyMiddleware(logger))

function App() {
  let generator = new TreeGen();
  let tree = generator.generate(0, 20, 4)
  console.log(tree)
  console.log(tree.toDisplayString(true))

  return (
    <Router>
      <Provider store={store}>
        <div className="App">
          <CssBaseline />
          <LayoutHeaderView />
          <Container maxWidth="lg" className="main-cont">
            <HeaderView />
            <QuickBarView />
            <Paper className="question-pager">
              <QuestionTitleView />
              <QuestionView />
            </Paper>
          </Container>
        </div>
      </Provider>
    </Router >
  );
}

export default App;
