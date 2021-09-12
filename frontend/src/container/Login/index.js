import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import {FaRegEye,FaRegEyeSlash} from "react-icons/fa";
import {Link, Redirect} from 'react-router-dom';
import './style.css';
import { loginUser } from '../../redux/store';

const LoginContainer = (props) => {
    const [seen,setSeen] =  useState('password'); 
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const dispatch = useDispatch();
    const auth = useSelector(state=>state.auth);

    if(auth.authenticate){
        return <Redirect to={`/`}/>
    }

const setPass = () =>{
    setSeen('password');
}

const setText = () =>{
    setSeen('text');
}



const login = (email,password) =>{
    console.log(email,password);
    dispatch(loginUser(email,password));
    setEmail('');
    setPassword('');
}



    return (
        <>
            <Container className="justify-content-md-center" >
                {
                    auth.authenticate && <h1>Login SuccessFull</h1>
                }
                <Form className="formData">
                <h1 style={{textAlign:"left",marginBottom:"50px"}}>Login</h1>
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>
                            Email
                    </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="email" value={email} placeholder="Email" onChange={e=>setEmail(e.target.value)} style={{width:"20rem"}}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalPassword">
                        <Form.Label column sm={2}>
                            Password
                    </Form.Label>
                        <Col sm={10} style={{display:"flex",alignItems:"center"}}>
                            <Form.Control type={seen} value={password} placeholder="Password" onChange={e=>setPassword(e.target.value)} style={{width:"20rem"}}/>
                          {
                               seen === 'password' ? 
                            <Link onClick={()=>setText()}><FaRegEye/></Link>
                            :
                            <Link onClick={()=>setPass()}><FaRegEyeSlash/></Link>
                            }
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Col sm={{ span: 10, offset: 2 }} style={{display:"flex"}}>
                            <Button type="submit" onClick={()=>login(email,password)}>Sign in</Button>

                            <Link to="/forget"> ForgetPassword</Link>
                        </Col>
                    </Form.Group>
                </Form>
            </Container>
        </>
    )
}

export default LoginContainer;