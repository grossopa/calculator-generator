import { Container } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import reducer from 'calgen/app/reducers';
import LayoutContentView from 'calgen/layout/view/LayoutContentView';
import LayoutHeaderView from 'calgen/layout/view/LayoutHeaderView';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import './App.css';


const logger = createLogger({
  // Options for redux-logger
});

const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

function App() {

  return (
    <Router>
      <Provider store={store}>
        <div className="App">
          <CssBaseline />
          <LayoutHeaderView />
          <Container maxWidth="lg" className="main-cont">
            <Typography variant="h4" component="h1" align="center">小学数学计算题生成器</Typography>
            <Routes>
              <Route path="*" element={<LayoutContentView />} />
            </Routes>
          </Container>
        </div>
      </Provider>
    </Router >
  );
}

export default App;