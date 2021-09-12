import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { MdArrowDropDownCircle } from 'react-icons/md';
import Layout from '../../components/Layout';
import logo from '../../uploads/cart.jpg';

const AboutContainer = (props) =>{
    return (
        <>
         <Layout bool={false}>
                <div style={{borderBottom:"2px solid black" ,padding:"5px 0",backgroundColor:"whitesmoke"}}>
                <h1 style={{fontSize:"23px",padding:"0 20px",display:"flex",alignItems:"center"}}> < MdArrowDropDownCircle />&nbsp; About Us</h1>
                 </div>
                 <Container style={{ minHeight: "calc(100vh - 149px)", position:"relative", display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                 <Container>
                    <Row style={{display:"flex",alignItems:"center"}}>
                        <Col>
                        <div style={{height:"360px", width:"600px"}}>
                        <img src={logo} alt="abc" style={{height:"100%", width:"100%"}} />
                        </div>
                        </Col>
                        <Col>
                        <p style={{fontSize: "12px", textAlign: "justify", marginLeft: "18px"}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        <p style={{fontSize: "12px", textAlign: "justify", marginLeft: "18px"}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        </Col>
                    </Row>
            </Container>
            </Container>
            </Layout>
        </>
    )
}

export default AboutContainer;