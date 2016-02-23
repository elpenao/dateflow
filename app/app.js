var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var routes = require('./config/routes');
import { hashHistory } from 'react-router';

// https://auth.firebase.com/v2/dateflow/auth/facebook/callback


ReactDOM.render(
  <Router history={hashHistory}>{routes}</Router>,
  document.getElementById('app')
)
