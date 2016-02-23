var React = require('react');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');

var Main = React.createClass({
  mixins: [ReactFireMixin],
  componentDidMount: function(){
    this.ref = new Firebase('https://dateflow.firebaseio.com/');
    // this.ref.unauth();
    // Create a callback which logs the current auth state
    function authDataCallback(authData) {
      if (authData) {
        console.log("User " + authData.uid + " is logged in with ", authData);
      } else {
        console.log("User is logged out");
      }
    }
    // Register the callback to be fired every time auth state changes
    this.ref.onAuth(authDataCallback.bind(this));
  },
  render: function(){
    return (
      <div class="main-container">
        <nav class="navbar navbar-default" role="navigation">
          <div class="col-sm-7 col-sm-offset-2" style={{marginTop: 15}}>
            <p>DateFlow</p>
          </div>
        </nav>
        <div class="container">
          {this.props.children}
        </div>
      </div>
    )
  }
});

module.exports = Main;