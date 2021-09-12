import React from 'react';
import Footer from '../Footer';
import NavbarContainer from '../Navbar';

const Layout = (props) =>{
    return(
        <>
        <NavbarContainer bool={props.bool} />
        {
            props.children
        }
        <Footer/>
        </>
    )
}

export default Layout;