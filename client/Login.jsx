import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel, ButtonToolbar, Dropdown, MenuItem } from "react-bootstrap";
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import Axios from 'axios';

const modalStyles = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(204, 204, 204, 0.75)'
  },
  content : {
    position                   : 'absolute',
    top                        : '40px',
    left                       : '300px',
    right                      : '300px',
    bottom                     : '40',
    border                     : '1px solid #ccc',
    background                 : '#fff',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '4px',
    outline                    : 'none',
    padding                    : '20px'
  }
}

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
    this.profileSelect = this.profileSelect.bind(this);
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  validateNewForm() {
    return this.state.newemail.length > 0 && this.state.newpassword.length > 0
    && this.state.newusername.length > 0 && this.state.profile.length > 3;
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  profileSelect(event) {
    var selectedProfile = event.target.value;
    var newState = Object.assign({}, this.state);
    newState.profile = selectedProfile;
    this.setState(newState, ()=>{console.log(this.state)});
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
          <div  style={{textAlign: 'center'}}>
          <h1>Sound Connect</h1>
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
            onClick={() => this.props.handleLogin(this.state.username, this.state.password)}
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="button">
            Login
          </Button>
          <Button
            block
            bsSize="large"
            type="button"
            onClick={this.handleOpenModal}>
            Register
          </Button>
          <ReactModal
           isOpen={this.state.showModal}
           contentLabel="PopUp"
           style={modalStyles}
           >
           <div>
           <button
             style={{float: 'right'}}
             onClick={this.handleCloseModal}>
             X
           </button>
            <h1 style={{display: 'inline'}}>Registration</h1>
           </div>
            <br/>
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
              <FormGroup controlId="profileselect" bsSize="large" >
                <ControlLabel>Profile Type</ControlLabel>
                <FormControl componentClass="select" placeholder="select" bsSize="large" onChange={this.profileSelect}>
                  <option>---</option>
                  <option value="composer">Composer</option>
                  <option value="musician">Musician</option>
                </FormControl>
             </FormGroup>
              <br/>
             <button
               className="btn-group"
               type='button'
               disabled={!this.validateNewForm()}
               onClick={() => this.props.handleSignup(this.state.newusername, this.state.newpassword, this.state.profile)}>
               Submit
             </button>
           </form>
         </ReactModal>
        </form>
      </div>
    );
  }
}
