import React from 'react';
import ReactDOM from 'react-dom';
import UserHeader from './UserHeader.jsx'
import AboutMe from './AboutMe.jsx'
import Tracks from './Tracks.jsx'
import Albums from './Albums.jsx'
import Collaboration from './Collaboration.jsx'
import Musician from './Musician.jsx'
import Composer from './Composer.jsx'
import { Grid, Row, Col } from 'react-bootstrap'
const axios = require('axios');
const _ = require('lodash');

export default class Profile extends React.Component {
 constructor(props) {
    super(props);
    this.state = {
      profile: {}
    };
    this.getProfile = this.getProfile.bind(this);
    this.getProfile();
  }
  getProfile() {
    axios.get(`/user/${this.props.user.username}`)
    .then((results) => {
      let newState = Object.assign({}, this.state);
      newState.profile = results.data.profile;
      this.setState(newState);
      console.log('got profile', newState.profile)
    })
  }
  // componentWillReceiveProps() {
  //   this.getProfile();
  // }

  render() {
    if(this.state.profile.profiletype === 'composer') {
      return <Composer user={this.props.user} profile={this.state.profile}></Composer>
    } else if (this.state.profile.profiletype === 'musician') {
      return <Musician user={this.props.user} profile={this.state.profile}></Musician>
    } else {
      return <p>Loadign profile...</p>
    }
  }
}
