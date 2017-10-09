import React from 'react';
import Modal from 'react-modal';
import { Grid, Row, Col, Image, FieldGroup, Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'
import Dropzone from 'react-dropzone';
const axios = require('axios');

//TODO add functionality to discography, instruments, and profiletype

export default class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setting: true,
      profile: [],
      user: this.props.user,
      bio: "",
      discography: null,
      instruments: null,
      profiletype: ""
    }
    this.getUserProfile = this.getUserProfile.bind(this);
    this.setNewProfile = this.setNewProfile.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.onDrop = this.onDrop.bind(this);
    //this.addDiscography = this.addDiscography.bind(this);
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
      newState.profile.discography.split('');
      newState.profile.instruments.split('');
      this.setState(newState);
    }).catch(err => {throw err});
  }

  setNewProfile() {
    var data = {
      bio: this.state.bio ? this.state.bio : this.state.profile.bio,
      discography: this.state.discography ? this.state.discography : this.state.profile.discography,
      instruments: this.state.instruments ? this.state.instruments : this.state.profile.instruments,
      profiletype: this.state.profiletype ? this.state.profiletype : this.state.profile.profiletype
    }
    axios.patch(`/profile/${this.props.user.id}`, data).then((results)=>{
      this.getUserProfile();
    }).catch(err => {throw err});
  }

  onDrop(accepted, rejected){
    console.log(accepted[0].preview)
    this.setState({musicsheet: accepted[0].preview}, () => {
      console.log('accepted: ', this.state.musicsheet);
    });
  }

  handleInput(event){
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  addDiscography(input) {
    // let newState = Object.assign({}, this.state);
    // newState.discography = newState.profile.discography;
    // newState.discography.push(input);
  }

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
              <div>
                <Image src={this.state.profile.picture ? this.state.profile.picture : "https://react-bootstrap.github.io/assets/thumbnail.png"} thumbnail />
                <Dropzone
                  onDrop={this.onDrop}
                  action="/file-upload"
                  class="dropzone"
                  id="my-awesome-dropzone"/>
              </div> :

            <div>
              <Image src="https://react-bootstrap.github.io/assets/thumbnail.png" thumbnail />
              <Dropzone
                onDrop={this.onDrop}
                action="/file-upload"
                className="dropzone"
                id="my-awesome-dropzone"/>
            </div>}
              </FormGroup>
            <br/>
              <FormGroup controlId="bio">
                  <ControlLabel>
                    <h4>Biography</h4>
                  </ControlLabel>
                  {this.state.profile.bio ?
                  <p>{this.state.profile.bio}</p> :
                  <p>Edit your biography</p>}
                <FormControl componentClass="textarea" type="text"
                  placeholder='edit your biography'
                  onChange={this.handleInput}/>
                </FormGroup>

                <FormGroup controlId="discography">
                  <ControlLabel>
                    <h4>Discography</h4>
                  </ControlLabel>
                  <br/>
                  {this.state.profile.discography ?
                    this.state.profile.discography :
                    <li>Add Discography</li>}
                  <br/>
                  <FormControl className="text" type="text"
                    placeholder='add discography'
                    >
                  </FormControl>
                  <Button onClick={this.addDiscography}>Add</Button>
                </FormGroup>

                <FormGroup controlId="instruments">
                  <ControlLabel>
                    <h4>Instruments</h4>
                  </ControlLabel>
                  <br/>
                  {this.state.profile.instruments ?
                  this.state.profile.instruments :
                    <li>Add Instruments</li>}
                  <br/>
                  <FormControl className="text" type="text"
                    placeholder='add instruments'
                    >
                  </FormControl>
                  <Button>Add</Button>
                </FormGroup>

                <FormGroup controlId="profiletype">
                  <ControlLabel>
                    <h4>Profile Type: {this.state.profile.profiletype ?
                    this.state.profile.profiletype.split('') :
                    <li>Change Profile Type</li>}
                    </h4>
                  </ControlLabel>
                  <br/>

                  <FormControl componentClass="select">
                    <option>---</option>
                    <option value="composer">Composer</option>
                    <option value="musician">Musician</option>
                  </FormControl>
               </FormGroup>

            <Button onClick={this.setNewProfile}>Save</Button>
        </Grid>
      </div>
    );
  }
}
