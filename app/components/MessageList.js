var React = require('react');

var MessageList = React.createClass({
  render: function(){
    var user = this.props.profile;
    var messages = this.props.messages.map(function (message, index) {
      /// need to fix message sender in send message function
      if (user.name === message.sender){
        return <li class="list-group-item text-right disabled" key={index}>{message.message}</li>
      } else {
        return <li class="list-group-item" key={index}>{message.message} from: {user.name}</li>
      }
    })
    return(
	    <ul class="list-group">
        {messages}
      </ul>
    )
  }
})

module.exports = MessageList;