var React = require('react');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');
var Loader = require('react-loader');

var Search = React.createClass({
  mixins: [ReactFireMixin],
  getInitialState: function(){
    return {
      profiles: []
    }
  },
  componentDidMount: function(){
    this.ref = new Firebase('https://dateflow.firebaseio.com/');
    // Register the callback to be fired every time auth state changes
    this.ref.onAuth(authDataCallback.bind(this));
  },
  render: function(){
    var profile = this.state.profile
    if (this.state.profiles.length > 0) {
      return(
        <div class="row">
          
       </div>
      )
    }
    return <Loader loaded={false} options={options} class="spinner" />

  }
})

module.exports = Search;

// Loader Options
var options = {
    lines: 8,
    length: 0,
    width: 10,
    radius: 30,
    corners: 1,
    rotate: 0,
    direction: 1,
    color: '#000',
    speed: 1,
    trail: 60,
    shadow: false,
    hwaccel: false,
    zIndex: 2e9,
    top: '20%',
    left: '50%',
    scale: 1.00
};