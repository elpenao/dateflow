var React = require('react');

var MessageList = React.createClass({
  render: function(){
    var messages = this.props.messages.map(function (message, index) {
      return <li key={index}>{message.message}</li>
    })
    return(
	    <ul>
        {messages}
      </ul>
    )
  }
})

module.exports = MessageList;