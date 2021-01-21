import HeaderView from 'calc/view/HeaderView';
import QuestionTitleView from 'calc/view/QuestionTitleView';
import QuestionView from 'calc/view/QuestionView';
import QuickBarView from 'calc/view/QuickBarView';
import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router
} from "react-router-dom";
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import './App.css';
import reducer from './app/reducers';

const logger = createLogger({});

const store = createStore(reducer, applyMiddleware(logger))

function App() {
  return (
    <Router>
      <Provider store={store}>
        <div className="App">
          <HeaderView />
          <QuickBarView />
          <QuestionTitleView />
          <QuestionView />
        </div>
      </Provider>
    </Router>
  );
}

export default App;
