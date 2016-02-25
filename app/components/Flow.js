var React = require('react');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');
var Router = require('react-router');
var MessageList = require('./MessageList');
var Loader = require('react-loader');

function authDataCallback(authData) {
    if (authData) {
      console.log('logged in', authData)
      var userRef = this.ref.child("profiles").child(authData.uid);
      this.bindAsObject(userRef, "user");
    } else {
      console.log("User is logged out");
    }
}

var Flow = React.createClass({
  mixins: [ReactFireMixin],
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function () {
    return {
      messages: null,
      message: null,
      user: { name: "Oscar" }
    }
  },
  componentWillMount: function () {
  	this.ref = new Firebase('https://dateflow.firebaseio.com/');
    this.ref.onAuth(authDataCallback.bind(this))
  },
  componentDidMount: function () {
    var self = this;
    var messageRef = this.ref.child("messages").child(this.props.flow).orderByChild("date");
    messageRef.once('value')
    .then(function (snapshot) {
      if (!snapshot.val()) self.ref.child("messages").child(self.props.flow).push({message: "start chatting", sender: "me"})
      self.bindAsArray(messageRef, 'messages');
    })
  },
  sendMessage: function () {
    if (!this.state.message) return
    // more detailed messages 
    this.ref.child("messages/" + this.props.flow).push().set({
      message: this.state.message,
      sender: this.state.user.name,
      date: Firebase.ServerValue.TIMESTAMP
    });
    this.setState({message: null});
  },
  handleMessage: function(event){
    this.setState({message: event.target.value});
  },
  render: function(){
    // if statement to wait for messages
    if (this.state.messages && this.state.messages.length > 0) {
      return(
        <div class="row">
          <div class="col-lg-12">
            <div class="panel panel-info">
              <div class="panel-heading">Start flowing...</div>
              <div class="panel-body">
                <MessageList messages={this.state.messages} profile={this.state.user}/>
              </div>
              <div class="panel-footer">
                  <div class="input-group">
                      <input type="text" class="form-control" placeholder="Hey you..." value={this.state.message} id="message-content" onChange={this.handleMessage} />
                      <span class="input-group-btn">
                        <button class="btn btn-info" type="button" onClick={this.sendMessage}>Send!</button>
                      </span>
                  </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return <Loader loaded={false} class="spinner" />
  }
})

module.exports = Flow;