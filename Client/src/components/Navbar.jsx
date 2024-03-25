import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const DashNavbar = ({ isLoggedIn, setIsLoggedIn }) => {

    return (
        <Navbar expand="lg" style={{ backgroundColor: "#1e6b52" }} variant="dark">
            <Navbar.Brand href="#">
                <img src="/assets/uab-white-logo.png" alt="UAB" width="290" height="24" style={{ paddingLeft: '1rem' }} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    {isLoggedIn ? (
                        <>
                            <Nav.Link href="#profile" style={{ color: "#fff" }}>Profile</Nav.Link>
                            <Nav.Link href="https://ssb.it.uab.edu/pls/sctprod/zweb_stu_crm.main_page" style={{ color: "#fff" }}>BlazerNet</Nav.Link>
                            <Nav.Link href="#" onClick={() => setIsLoggedIn(false)} style={{ color: "#fff" }}>Logout</Nav.Link>
                        </>
                    ) : (
                        <>
                            <Nav.Link href="#" onClick={() => setIsLoggedIn(true)} style={{ color: "#fff" }}>Login</Nav.Link>
                            <Nav.Link href="#about" style={{ color: "#fff" }}>Settings</Nav.Link>
                            <Nav.Link href="https://ssb.it.uab.edu/pls/sctprod/zweb_stu_crm.main_page" style={{ color: "#fff" }}>BlazerNet</Nav.Link>
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default DashNavbar;