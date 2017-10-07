import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import Musician from '../client/Musician.jsx'
import Composer from '../client/Composer.jsx'
import Login from './Login.jsx'
import Forum from './Forum.jsx'
import Navigation from './Navigation.jsx'
const axios = require('axios');


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        user_id: undefined,
        username: undefined
      }
    }
  }
  componentDidMount() {
    axios.get('/deserialize')
    .then((results) => {
      console.log('ajax deserialize',results.data );
      let newState = Object.assign({}, this.state);
      newState.user.user_id = results.data.id;
      newState.user.username = results.data.username;
      this.setState(newState);
    })
  }

  render() {
    return (
      <BrowserRouter>
        <Navigation>
          <Route path="/" exact={true} render={(props) => (<Composer user={this.state.user} {...props}/>)} />
          <Route path="/forum" component={Forum} />
          <Route path="/login" component={Login} />
        </Navigation>
      </BrowserRouter>
    );
  }
}


ReactDOM.render(<App></App>, document.getElementById('app'));
