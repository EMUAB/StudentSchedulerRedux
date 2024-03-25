import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const DashNavbar = ({ isLoggedIn, setIsLoggedIn }) => {

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#">
                <img src="/assets/uab-color-logo.png" alt="UAB" width="270" height="24" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    {isLoggedIn ? (
                        <>
                            <Nav.Link href="#profile">Profile</Nav.Link>
                            <Nav.Link href="https://ssb.it.uab.edu/pls/sctprod/zweb_stu_crm.main_page">BlazerNet</Nav.Link>
                            <Nav.Link href="#" onClick={() => setIsLoggedIn(false)}>Logout</Nav.Link>
                        </>
                    ) : (
                        <>
                            <Nav.Link href="#" onClick={() => setIsLoggedIn(true)}>Login</Nav.Link>
                            <Nav.Link href="#about">Settings</Nav.Link>
                            <Nav.Link href="https://ssb.it.uab.edu/pls/sctprod/zweb_stu_crm.main_page">BlazerNet</Nav.Link>
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default DashNavbar;