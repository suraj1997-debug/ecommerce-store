import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { FaRegEye,FaRegEyeSlash} from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { resetPassword } from '../../redux/store';

const ResetContainer = (props) =>{

    const [seen,setSeen] = useState('password');
    const [confSeen,setConfSeen] = useState('password');
    const [newPassword,setNewPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch();

    const setPass = () =>{
        setSeen('password');
    }
    
    const setText = () =>{
        setSeen('text');
    }

    
    const setConfirmPass = () =>{
        setConfSeen('password');
    }
    
    const setConfirmText = () =>{
        setConfSeen('text');
    }

    const auth = useSelector(state=>state.auth);


    const reset = (newPassword,ConfirmPassword,props) =>{
        dispatch(resetPassword(newPassword,ConfirmPassword));
        setNewPassword('');
        setConfirmPassword(''); 
       props.history.push('/');
    }

    return(
        <>
        <Container style={{display:"flex",alignItems:"center",justifyContent:"center",width:"100vw",height:"100vh"}}>
            <Row>
                <Col>
                <h1 style={{textAlign:"center",padding:"40px"}}>Reset Password</h1>
                <Form>
                <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                          New  Password
                        </Form.Label>
                        <Col sm={10} style={{display:"flex",alignItems:"center"}}>
                            <Form.Control type={seen} value={newPassword} placeholder="Password" onChange={e=>setNewPassword(e.target.value)} style={{width:"20rem"}}/>
                          {
                               seen === 'password' ? 
                            <Link onClick={()=>setText()}><FaRegEye/></Link>
                            :
                            <Link onClick={()=>setPass()}><FaRegEyeSlash/></Link>
                            }
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                          Confirm  Password
                        </Form.Label>
                        <Col sm={10} style={{display:"flex",alignItems:"center"}}>
                            <Form.Control type={confSeen} value={ConfirmPassword} placeholder="Password" onChange={e=>setConfirmPassword(e.target.value)} style={{width:"20rem"}}/>
                          {
                               confSeen === 'password' ? 
                            <Link onClick={()=>setConfirmText()}><FaRegEye/></Link>
                            :
                            <Link onClick={()=>setConfirmPass()}><FaRegEyeSlash/></Link>
                            }
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Col sm={{ span: 10, offset: 2 }} style={{display:"flex"}}>
                            <Button type="submit" variant="primary" onClick={()=>reset(newPassword,ConfirmPassword,props)}>Submit</Button>
                        </Col>
                    </Form.Group>
                </Form>
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default ResetContainer;