import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { forgetPassword } from '../../redux/store';

const ForgetPassContainer = (props) => {

    const [email,setEmail] = useState('');
    const dispatch = useDispatch();

    const forget = (email) =>{
        dispatch(forgetPassword(email));
    }
    return (
        <>
            <Form.Group as={Row} controlId="formHorizontalEmail">
                <Form.Label column sm={2}>
                    Email
                    </Form.Label>
                <Col sm={10}>
                    <Form.Control type="email" value={email} placeholder="Email" onChange={e => setEmail(e.target.value)} style={{ width: "20rem" }} />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Col sm={{ span: 10, offset: 2 }} style={{ display: "flex" }}>
                    <Link to="/reset" onClick={() => forget(email)}>Submit</Link>

                </Col>
            </Form.Group>
        </>
    )
}

export default ForgetPassContainer;