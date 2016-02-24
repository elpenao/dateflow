var React = require('react');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');

var FlowList = React.createClass({
  mixins: [ReactFireMixin],
  getInitialState: function () {
    return {
      flows: null
    }
  },
  componentDidMount: function () {
    var user = this.props.user
    var self = this;
    this.ref = new Firebase('https://dateflow.firebaseio.com/');
    var flows = this.props.flows.map(function (flow) {
        var flowy = self.ref.child('flows').child(flow['.value'])
        // var flow = flow['.value']
        return flowy.once("value")
                .then(function(snapshot) {
                  // get the members of the flow
                  return snapshot.val().members;
                })
                .then(function (members) {
                  // get the other member
                  for (let key in members){
                    if (key !== user['.key']) return self.ref.child('profiles').child(key).once('value')
                  }
                })
                .then(function (user) {
                  // return the other person with key to the flow?
                  var flowObj = {}
                  flowObj.id = flow['.value']
                  flowObj.user = user.val()
                  return flowObj
                })
                .then(null, function (error) {
                  console.log(error)
                })
    })
    Promise.all(flows).then(function (results) {
      self.setState({flows: results});
    })
  },
  thisFlow: function (event) {
    this.props.switchFlow(event.target.value)
  },
  renderFlows: function () {
    return this.state.flows.map(this.renderRow)
  },
  renderRow: function(flow) {
    return (
      <li class="list-group-item" key={flow.id} >
        <h4>{flow.user.name}</h4>
        <div class="row">
          <div class="col-lg-6">
            <img src={flow.user.picture.data.url}/>
          </div>
          <div class="col-lg-6">
            <button class="btn btn-success" value={flow.id} onClick={this.thisFlow}> Start Chat </button>
          </div>
        </div>
      </li>
    )
  },
  render: function(){
    if (this.state.flows && this.state.flows.length > 0) {
      return <div>{this.renderFlows()}</div>
    }

    return <div>Loading...</div>;
  }
})

module.exports = FlowList;



