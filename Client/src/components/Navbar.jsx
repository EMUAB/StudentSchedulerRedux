import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const DashNavbar = ({ logout, userName }) => {

    return (
        <Navbar expand="lg" style={{ backgroundColor: "#1e6b52" }} variant="dark">
            <Navbar.Brand href="#">
                <img src="/uab-white-logo.png" alt="UAB" width="290" height="24" style={{ paddingLeft: '1rem' }} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <Nav.Link href="#profile" style={{ color: "#fff" }}>{userName}</Nav.Link>
                    <Nav.Link href="https://idm.uab.edu/sso/blazernet?inst=prod" style={{ color: "#fff" }}>BlazerNet</Nav.Link>
                    <Nav.Link onClick={logout} style={{ color: "#fff" }}>Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default DashNavbar;