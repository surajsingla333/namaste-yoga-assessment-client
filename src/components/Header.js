import React, { Component } from 'react';
import { Navbar, Button, NavDropdown, Nav } from 'react-bootstrap';

export default class Header extends Component {
    render() {
        const { toggleLoginModal, loggedInUser } = this.props;
        console.log("isUSER", loggedInUser, Object.keys(loggedInUser).length)
        return (
            <Navbar className={"bg_pink_100"} expand="lg">
                <Navbar.Brand href="#home">Namaste Yoga</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {/* <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                        {!Object.keys(loggedInUser).length ? 
                        <Button className="header_login_button" onClick={() => {toggleLoginModal(true)}}>Login</Button> : <h3 className="text_capitalize">{loggedInUser.name}</h3>}
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
