import React from 'react';
import { Container } from 'react-bootstrap';
import { MdArrowDropDownCircle } from 'react-icons/md';
import Contact from '../../components/Contact';
import Layout from '../../components/Layout';

const ContactContainer = (props) =>{
    return (
        <>
         <Layout>
                <div style={{borderBottom:"2px solid black" ,padding:"5px 0",backgroundColor:"whitesmoke"}}>
                <h1 style={{fontSize:"23px",padding:"0 20px",display:"flex",alignItems:"center"}}> < MdArrowDropDownCircle />&nbsp; Contact Us</h1>
                 </div>
                 <Container style={{ minHeight: "calc(100vh - 149px)", position:"relative", display:"flex",alignItems:"center",justifyContent:"center",padding:"49px 159px"}}> 
                     <Contact />
            </Container>
            </Layout>
        </>
    )
}

export default ContactContainer;