var React = require('react');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');

var Home = React.createClass({
  mixins: [ReactFireMixin],
  handleSubmit: function(){
  	this.ref = new Firebase('https://dateflow.firebaseio.com/');
  	this.ref.authWithOAuthPopup("facebook", function(error, authData) {
          if (error) {
            console.log("Login Failed!", error);
          } else {
            console.log("Authenticated successfully with payload:", authData);
            // go somewhere
          }
        }, {
          remember: "sessionOnly",
          scope: "email,user_likes"
        });
  },
  render: function(){
    return(
      <div class="text-center">
	      <h2>
	        Welcome to DateFlow
	      </h2>
	      <h4>Login below:</h4>
	      <p>We post to facebook whenever we want...jk</p>
	      <a class="btn btn-primary" onClick={this.handleSubmit}><i class="glyphicon glyphicon-thumbs-up"></i>  Facebook</a>
	  </div>
    )
  }
})

module.exports = Home;