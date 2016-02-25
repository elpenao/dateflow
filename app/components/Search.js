var React = require('react');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');
var Loader = require('react-loader');
var Router = require('react-router');

function authDataCallback(authData) {
    if (authData) {
      var userRef = this.ref.child("profiles").child(authData.uid);
      userRef.once("value", function(snapshot) {
        if (!snapshot.exists()) { userRef.set(authData.facebook.cachedUserProfile) };
      });
      this.bindAsObject(userRef, "profile");
      // todo check if flows exist then bind
      var flows = userRef.child('flows')
      this.bindAsArray(flows, "flows")
    } else {
      console.log("User is logged out");
    }
}

var Search = React.createClass({
  mixins: [ReactFireMixin],
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function(){
    return {
      profiles: [],
      profile: {}
    }
  },
  componentDidMount: function(){
    this.ref = new Firebase('https://dateflow.firebaseio.com/');
    this.ref.onAuth(authDataCallback.bind(this));
    var profileRef = this.ref.child("profiles");
    this.bindAsArray(profileRef, 'profiles');
  },
  startFlow: function (event) {
    // push to flows
    var self = this;
    var mems = {};
    var dateId = event.target.value
    mems[this.state.profile['.key']] = true;
    mems[dateId] = true
    this.ref.child('flows').push({members:mems})
    .then(function (newFlow) {
      newFlow.once('value')
      .then(function (data) {
        self.ref.child('profiles/'+ self.state.profile['.key']).child("flows").push(data.key())
        self.ref.child('profiles/'+ dateId).child("flows").push(data.key())
        self.context.router.push("/profile/" + self.state.profile['.key'])
      })
    })
  },
  render: function(){
    var self = this
    var profiles = this.state.profiles.map(function (profile, index) {
      if (profile.id === self.state.profile.id) return 
      return (
        <div class="col-md-3" key={index}>
          <h3>{profile.name}</h3>
          <img src={profile.picture.data.url} />
          <h6>Gender: {profile.gender}</h6>
          <button class="btn btn-info" value={profile['.key']} onClick={self.startFlow}>Start Flow</button>
        </div>
      )
    })
    if (this.state.profiles.length > 0) {
      return (
        <div class="row">
          <h3>Browse Profiles</h3>
          {profiles}
        </div>
      )
    }
    return <Loader loaded={false} class="spinner" />

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