import React from 'react';
import Modal from 'react-modal';
import { Grid, Row, Col } from 'react-bootstrap'
const axios = require('axios');

export default class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setting: true,
      profile: [],
      user: this.props.user
    }
    this.getUserProfile = this.getUserProfile.bind(this);
  }

  componentDidMount() {
    this.getUserProfile();
  }

  getUserProfile() {
    axios.get(`/userprofile/${this.props.user.id}`)
    .then((results) => {
      console.log(results)
      let newState = Object.assign({}, this.state);
      newState.profile = results.data.profile;
      this.setState(newState);
    }).catch(err => {throw err});
  }

  bio:
  null
  discography:
  null
  id:
  21
  instruments:
  null
  picture:
  null
  profiletype:
  "composer"
  user_id:
  21

  render() {
    return(
      <div>
        <Grid>
          <Row>
            <Col className="user"> <h1>Settings</h1> </Col>
          </Row>
          {this.state.profile.bio ? <Row><h3>{this.state.profile.bio}</h3></Row> : <h3>Bio Fill Me In</h3>}
          {this.state.profile.discography ? <Row><h3>{this.state.profile.discography}</h3></Row> : <h3>discography Fill Me In</h3>}
          {this.state.profile.instruments ? <Row><h3>{this.state.profile.instruments}</h3></Row> : <h3>instruments Fill Me In</h3>}
          {this.state.profile.profiletype ? <Row><h3>{this.state.profile.profiletype}</h3></Row> : <h3>profiletype Fill Me In</h3>}
        </Grid>
      </div>
    );
  }
}
