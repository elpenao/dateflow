var React = require('react');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');
var FlowList = require('./FlowList');
var Flow = require('./Flow');
var Loader = require('react-loader');


function authDataCallback(authData) {
    if (authData) {
      var userRef = this.ref.child("profiles").child(authData.uid);
      userRef.once("value", function(snapshot) {
        if (!snapshot.exists()) { userRef.set(authData.facebook.cachedUserProfile) };
      });
      this.bindAsObject(userRef, "profile");
      // todo check if flows exist then bind
      // // userRef.child("flows").set({0: "someOtherPerson"}) 
      var flows = userRef.child('flows')
      this.bindAsArray(flows, "flows")
    } else {
      console.log("User is logged out");
    }
}

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


var Profile = React.createClass({
  mixins: [ReactFireMixin],
  getInitialState: function(){
    return {
      profile: { picture: { data: {url: "" } } },
      flows: null,
      currentFlow: "blank"
    }
  },
  componentDidMount: function(){
    this.ref = new Firebase('https://dateflow.firebaseio.com/');
    // Register the callback to be fired every time auth state changes
    this.ref.onAuth(authDataCallback.bind(this));
  },
  handleCurrentFlow: function(flow){
    console.log('switching to ', flow)
    this.setState({
      profile: this.state.profile,
      flows: this.state.flows,
      currentFlow: flow
    })
    console.log('new state ', this.state)
  },
  render: function(){
    var profile = this.state.profile
    if (this.state.flows && this.state.flows.length > 0 && this.state.profile.name) {
      return(
        <div class="row">
          <div class="col-lg-4">
            <h2> 
              Welcome {profile.first_name}
            </h2>
            <img src={profile.picture.data.url} />
            <h5>No one ot flow with? Find more peeps here</h5>
            <button class="btn btn-warning">Search</button>
            <h3>Here are your flows</h3>
            <FlowList flows={this.state.flows} user={profile} switchFlow={this.handleCurrentFlow}/>
          </div>
          <div class="col-lg-8">
            <Flow flow={this.state.currentFlow} key={this.state.currentFlow} />
          </div>
       </div>
      )
    }

    return <Loader loaded={false} options={options} class="spinner" />

  }
})

module.exports = Profile;