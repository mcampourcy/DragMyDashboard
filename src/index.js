import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './containers/Dashboard';

import 'bootstrap';
import './style.scss'

const mountPoint = document.getElementById('app');
if (mountPoint) {
  ReactDOM.render(<Dashboard/>, mountPoint);
}
