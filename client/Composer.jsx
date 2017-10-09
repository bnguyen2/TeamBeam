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
  }


  render() {
    return (
      <Grid>
        <Row>
          <Col> <UserHeader user={this.props.user}/> </Col>
        </Row>
        <Row>
          <Col xs={6} md={6}> <AboutMe aboutme={this.props.profile}/> </Col>
          <Col xs={6} md={6}> <Tracks/> </Col>
        </Row>
        <Row>
          <Col xs={6} md={6}> <Collaboration/> </Col>
          <Col xs={6} md={6}> <UserPost posts={this.props.posts}/>  </Col>
        </Row>
      </Grid>
    );
  }
}
