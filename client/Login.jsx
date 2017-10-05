import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import Axios from 'axios';
//import "./Login.css"; //need to create login css

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      showModal: false,
      newusername: "",
      newpassword: "",
      newemail: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.validateNewForm = this.validateNewForm.bind(this);
    this.logIn = this.logIn.bind(this);
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  validateNewForm() {
    return this.state.newemail.length > 0 && this.state.newpassword.length > 0;
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
             <FormGroup controlId="newemail" bsSize="large">
               <ControlLabel>Email</ControlLabel>
               <FormControl
                 autoFocus
                 type="newemail"
                 value={this.state.newemail}
                 onChange={this.handleChange}
               />
             </FormGroup>
             <FormGroup controlId="newusername" bsSize="large">
               <ControlLabel>User Name</ControlLabel>
               <FormControl
                 type="newusername"
                 value={this.state.newusername}
                 onChange={this.handleChange}
               />
             </FormGroup>
             <FormGroup controlId="newpassword" bsSize="large">
               <ControlLabel>Password</ControlLabel>
               <FormControl
                 type="newpassword"
                 value={this.state.newpassword}
                 onChange={this.handleChange}
               />
             </FormGroup>
             <FormGroup controlId="profile" bsSize="large">
               <ControlLabel>Profile Type</ControlLabel>
               <FormControl
                 type="profiletype"


               />
             </FormGroup>
             <button type='button' disabled={!this.validateNewForm()} >Submit</button>
           <button onClick={this.handleCloseModal}>Close Page</button>
           </form>
         </ReactModal>
        </form>
      </div>
    );
  }
}
//
// ReactDOM.render(
//   <Login/>, document.getElementById('app')
//   );
