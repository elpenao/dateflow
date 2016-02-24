var React = require('react');

var Main = React.createClass({
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