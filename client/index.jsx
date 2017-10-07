import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import Profile from './Profile.jsx'

import Login from './Login.jsx'
import Forum from './Forum.jsx'
import Navigation from './Navigation.jsx'
const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  componentDidMount() {
    axios.get('/deserialize')
    .then((results) => {
      console.log('ajax deserialize',results.data);
      let newState = Object.assign({}, this.state);
      newState.user.id = results.data.id;
      newState.user.username = results.data.username;
      this.setState(newState);
    })
  }

  handleLogin(username, password) {
    axios.post('/login', {
      username: username,
      password: password
    }).then((response) => {
      let newState = Object.assign({}, this.state);
      newState.user = response.data;
      this.setState(newState);
    });
  }

  handleLogout() {
    axios.post('/logout')
    .then(() => {
      let newState = Object.assign({}, this.state);
      newState.user = {};
      this.setState(newState);
    });
  }

  render() {
    return (
      <BrowserRouter>
        <Navigation handleLogout={this.handleLogout}>
          <Route path="/" exact={true} render={(props) => (
            this.state.user.id ?
            (<Profile user={this.state.user} {...props}/>) :
            (<Login handleLogin={this.handleLogin} {...props}/>)
          )} />
          <Route path="/forum" render={(props) => (
            this.state.user.id ?
            (<Forum user={this.state.user} {...props}/>) :
            (<Login handleLogin={this.handleLogin} {...props}/>)
          )} />
          <Route path="/login" render={(props) => (
            this.state.user.id ?
            (<Profile user={this.state.user} {...props}/>) :
            (<Login handleLogin={this.handleLogin} {...props}/>)
          )} />
        </Navigation>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
