import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel, ButtonToolbar, Dropdown, MenuItem } from "react-bootstrap";
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import Axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      showModal: false,
      newusername: "",
      newpassword: "",
      newemail: "",
      profile: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.validateNewForm = this.validateNewForm.bind(this);
    this.logIn = this.logIn.bind(this);
    this.profileSelect = this.profileSelect.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  validateNewForm() {
    return this.state.newemail.length > 0 && this.state.newpassword.length > 0 && this.state.newusername.length > 0 && this.state.profile.length > 0;
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  logIn(){
    const loginInfo = {
      username: this.state.username,
      password: this.state.password
    };
    Axios.post('/login', loginInfo).then((response) => {
      console.log('login successfully');
    }).catch((failed)=>{console.log('failed login')});
  }

  signUp(){
    const signUpInfo = {
      username: this.state.newusername,
      password: this.state.newpassword,
      email: this.state.newemail,
      profile: this.state.profile
    };

    Axios.post('/signup', signUpInfo).then((response) => {
      // TODO Redirect users to the next page
      console.log('signup successfully');
    }).catch((failed)=>{ console.log('failed signup', failed)});
  }

  profileSelect(evtKey, event) {
    var selectedProfile = evtKey;
    var newState = Object.assign({}, this.state);
    newState.profile = selectedProfile;
    this.setState(newState, ()=>{console.log(this.state)})
  }

  handleOpenModal (e) {
    e.preventDefault();
    this.setState({ showModal: true });
  }

  handleCloseModal (e) {
    e.preventDefault();
    this.setState({ showModal: false });
  }

  render() {
    return (
      <div className="Login">
        <div className='row'>
          <div className='col-md-2 col-md-offset-5'>
          <h1>SoundConnect</h1>
          </div>
        </div>
        <hr/>
        <form>
          <FormGroup controlId="username" bsSize="large">
            <ControlLabel>Username</ControlLabel>
            <FormControl
              autoFocus
              type="username"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            onClick={this.logIn}
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="button"
          >
            Login
          </Button>
          <Button
            block
            bsSize="large"
            type="button"
            onClick={this.handleOpenModal}
          >
            Register
          </Button>
          <ReactModal
           isOpen={this.state.showModal}
           contentLabel="Minimal Modal Example"
           >

           <form onSubmit={this.handleSubmit}>
             <FormGroup controlId="newemail" bsSize="large" >
               <ControlLabel>Email</ControlLabel>
               <FormControl
                 autoFocus
                 type="newemail"
                 value={this.state.newemail}
                 onChange={this.handleChange}
               />
             </FormGroup>
             <FormGroup controlId="newusername" bsSize="large" >
               <ControlLabel>User Name</ControlLabel>
               <FormControl
                 type="newusername"
                 value={this.state.newusername}
                 onChange={this.handleChange}
               />
             </FormGroup>
             <FormGroup controlId="newpassword" bsSize="large" >
               <ControlLabel>Password</ControlLabel>
               <FormControl
                 type="newpassword"
                 value={this.state.newpassword}
                 onChange={this.handleChange}
               />
             </FormGroup>

               <ButtonToolbar bsSize="large">

                <Dropdown id="dropDown" className="dropdown" bsSize="large" onSelect={ (evtKey, event)=>{this.profileSelect(evtKey, event)} } >
                  <Button bsSize="large">
                    Profile Type
                  </Button>
                  <Dropdown.Toggle />
                  <Dropdown.Menu>
                    <MenuItem id={1} eventKey={"composer"} value="composer">Composer</MenuItem>
                    <MenuItem id={2} eventKey={'musician'} value="musician">Musician</MenuItem>
                  </Dropdown.Menu>
                </Dropdown>
              </ButtonToolbar>

              <br/>
             <button className="btn-group" type='button' disabled={!this.validateNewForm()} onClick={this.signUp} >Submit</button>
           <button className="btn-group" onClick={this.handleCloseModal}>Close Page</button>
           </form>
         </ReactModal>
        </form>
      </div>
    );
  }
}
