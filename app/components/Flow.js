var React = require('react');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');
var Router = require('react-router');
var MessageList = require('./MessageList')

function fbAuth (error, authData) {
    if (error) {
      console.log("Login Failed!", error);
    } else {
	    console.log("Authenticated successfully with payload:", authData);
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
  componentDidMount: function () {
  	this.ref = new Firebase('https://dateflow.firebaseio.com/');
    var messageRef = this.ref.child("messages").child(this.props.flow).orderByChild("date")
    this.bindAsArray(messageRef, 'messages');
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
            <MessageList messages={this.state.messages}/>
          </div>
          <div class="col-lg-12">
            <div class="input-group">
              <input type="text" class="form-control" placeholder="Hey you..." value={this.state.message} id="message-content" onChange={this.handleMessage} />
              <span class="input-group-btn">
                <button class="btn btn-info" type="button" onClick={this.sendMessage}>Send!</button>
              </span>
            </div>
          </div>
        </div>
      )
    }

    return <h4>This is akward... why dont you finds some new flows</h4>
  }
})

module.exports = Flow;