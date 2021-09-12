import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import {  useDispatch, useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
// import { logoutUser } from '../redux/store';

function Header(props) {

    const auth = useSelector(state=>state.auth);
    const dispatch = useDispatch();

    // const logout=()=>{
    //     dispatch(logoutUser());
    // }


    const renderLoggedInLinks = () => {
        return (
            <Nav>
                <li className="nav-item">
                    {/* <span  className="nav-link" onClick={logout} style={{cursor:"pointer"}}>SignOut</span> */}
                </li>
            </Nav>

        );
    }


    const renderLoggedOutLinks = () => {
        return (
            <Nav>
                <li className="nav-item">
                    <NavLink to="/login" className="nav-link">SignIn</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/signUp" className="nav-link">SignUp</NavLink>
                </li>
            </Nav>
        );
    }



    return (
        <>
            <Navbar  fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container fluid>
                    <Navbar.Brand href="/">Admin Dashboard</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">

                        </Nav>
                        <Nav>
                            {auth.authenticate ? renderLoggedInLinks() : renderLoggedOutLinks()}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}




export default Header;