import React from 'react';
import ReactDOM from 'react-dom';
import { Nav, Navbar, NavItem, NavDropdown,  MenuItem} from 'react-bootstrap'

export default class Navigation extends React.Component {
 constructor(props) {
    super(props);

    this.state = {
      view: ""
    };
  }

  // create more dropdown and functionality

  render() {
    return (
      <Navbar collapseOnSelect fluid>
             <Navbar.Header>
               <Navbar.Brand>
                 <a href="#">SoundConnect</a>
               </Navbar.Brand>
             <Navbar.Toggle/>
             </Navbar.Header>

            <Navbar.Collapse>
             <Nav>
               <NavItem eventKey={1} href="#">Home</NavItem>
               <NavItem eventKey={2} href="#">Forum</NavItem>
               <NavItem eventKey={3} href="#">Placeholder</NavItem>
               <NavItem eventKey={4} href="#">Placeholder</NavItem>
             </Nav>

             <Nav pullRight>
               <NavDropdown eventKey={5} title="Account" id="basic-nav-dropdown">
                 <MenuItem eventKey={5.1}>Placeholder</MenuItem>
                 <MenuItem eventKey={5.2}>Settings</MenuItem>
                 <MenuItem divider />
                 <MenuItem eventKey={5.3}>Log Out</MenuItem>
               </NavDropdown>
             </Nav>

           </Navbar.Collapse>
     </Navbar>
    );
  }
}
