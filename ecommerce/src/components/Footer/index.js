import React from 'react';
import { Col, Container, Row } from  'react-bootstrap';

const Footer = (props) => {
    return (
        <>
            <Container fluid style={{backgroundColor:"rgb(25, 24, 24)",height:"40px"}}>
                <Row>
                    <Col><p style={{textAlign:"center", color: "aliceblue"}}>Copyright © SunStore | All Rights Reserved.</p></Col>
                </Row>
            </Container>
        </>
    )
}

export default Footer;