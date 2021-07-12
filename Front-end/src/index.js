import React from 'react';
import ReactDOM from 'react-dom';


import './index.css';


import Router from './Router';
import MainPage from './MainPage';
import { Route } from 'react-router';

ReactDOM.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
  document.getElementById('root')
);

