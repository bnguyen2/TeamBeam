import React from 'react';
import ReactDOM from 'react-dom';
import UserHeader from './UserHeader.jsx'
import AboutMe from './AboutMe.jsx'
import Tracks from './Tracks.jsx'
import UserPost from './UserPost.jsx'
import Collaboration from './Collaboration.jsx'
import { Grid, Row, Col } from 'react-bootstrap'
import $ from 'jquery';
const axios = require('axios');

export default class Composer extends React.Component {
 constructor(props) {
    super(props);

    this.state = {
      user: {},
      profile: {},
      songs: [],
      userposts: []
    };

    this.getUserData = this.getUserData.bind(this);
  }

  getUserData(username) {
    axios.get('/user/' + username)
      .then(response => {
        this.setState({
          user: response.data.user,
          profile: response.data.profile
        });
      })
      .catch(err => {
        console.log(err)
      });
  }

  componentDidMount() {
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col className="user"> <UserHeader user={this.props.user}/> </Col>
        </Row>
        <Row>
          <Col xs={6} md={6} className="about-me"> <AboutMe aboutme={this.state.profile}/> </Col>
          <Col xs={6} md={6} className="recent-track"> <Tracks/> </Col>
        </Row>
        <Row>
          <Col xs={6} md={6} className="collaboration"> <Collaboration/> </Col>
          <Col xs={6} md={6} className="user-post"> <UserPost/>  </Col>
        </Row>
      </Grid>
    );
  }
}
