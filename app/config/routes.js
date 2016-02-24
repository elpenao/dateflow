var React = require('react');
var Main = require('../components/Main');
var Home = require('../components/Home');
var Profile = require('../components/Profile');
var Flow = require('../components/Flow')
var Search = require('../components/Search')
var Router = require('react-router');
var Route = Router.Route;
var IndexRoute = Router.IndexRoute;


module.exports = (
  <Route path="/" component={Main}> 
  	<Route path="/profile/:userId" component={Profile}/>
  	<Route path="/flow/:id" component={Flow}/>
  	<Route path="/search" component={Search}/>
    <IndexRoute component={Home} />
  </Route>
);