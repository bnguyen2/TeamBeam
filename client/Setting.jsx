import React from 'react';
import Modal from 'react-modal';
import { Grid, Row, Col, Image, FieldGroup, Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'
const axios = require('axios');

export default class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setting: true,
      profile: [],
      user: this.props.user,
      newProfile: []
    }
    this.getUserProfile = this.getUserProfile.bind(this);
    this.setNewProfile = this.setNewProfile.bind(this);
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

  setNewProfile() {
    // let options = {
    //   method: 'patch',
    //   url: `/profile/${this.props.user.id}`,
    //   data: this.state.profile
    // }

    axios.patch(`/profile/${this.props.user.id}`, this.state.profile).then((results)=>{
      console.log(results)
      //let newProfile = Object.assign({}, this.state);
    }).catch(err => {throw err});
  }

  // <FormGroup>
  //   <ControlLabel>
  //     title
  //   </ControlLabel>
  //   <FormControl type="text" placeholder="your title..." onKeyUp={(e)=> this.setInput(e, 'title')}>
  //
  //   </FormControl>
  //     <ControlLabel>
  //       message
  //     </ControlLabel>
  //     <FormControl componentClass="textarea" placeholder='your message...' onKeyUp={(e)=>this.setInput(e, 'description')}>
  //     </FormControl>
  // </FormGroup>

  // <h3>Discography</h3>
  //   {this.state.profile.discography ?
  //   <Row><h3>{this.state.profile.discography}</h3></Row> :
  //   <h3>discography Fill Me In</h3>}
  //
  // <h3>Instruments</h3>
  //   {this.state.profile.instruments ?
  //   <Row><h3>{this.state.profile.instruments}</h3></Row> :
  //   <h3>instruments Fill Me In</h3>}
  //
  // <h3>Profile Type</h3>
  //   {this.state.profile.profiletype ?
  //   <Row><h3>{this.state.profile.profiletype}</h3></Row> :
  //   <h3>profiletype Fill Me In</h3>}

  // {this.state.profile.picture ?
  // <Image src={this.state.profile.picture} thumbnail /> :
  // <Image src="https://react-bootstrap.github.io/assets/thumbnail.png" thumbnail />

  render() {
    return(
      <div>
        <Grid>
          <Row>
          <h1>Settings</h1>
          </Row>
          <FormGroup>
            <ControlLabel>
            <h4>Profile Picture</h4>
            </ControlLabel>
            <br/>
            {this.state.profile.picture ?
            <Image src="https://react-bootstrap.github.io/assets/thumbnail.png" thumbnail /> :
            <Image src="https://react-bootstrap.github.io/assets/thumbnail.png" thumbnail />}
            <br/>

                  <ControlLabel>
                    <h4>Biography</h4>
                  </ControlLabel>
                  {this.state.profile.bio ?
                  <p>{this.state.profile.bio}</p> :
                  <p>Edit your biography</p>}
                <FormControl componentClass="textarea" type="text" placeholder='edit your biography'>

                  </FormControl>
                    <ControlLabel>
                      message
                    </ControlLabel>
                    <FormControl componentClass="textarea" placeholder='your message...'>
                    </FormControl>
                </FormGroup>

            <Button onClick={this.setNewProfile}>Save</Button>
        </Grid>
      </div>
    );
  }
}
