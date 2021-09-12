import React, { useState } from 'react';
import { Col, Form, Row ,Button } from 'react-bootstrap';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { resetPassword } from '../../redux/store';

const ResetPasswordContainer = (props) =>{

    const [seen,setSeen] =  useState('password'); 
    const [confSeen,setConfSeen] = useState('password');
    const [newPassword,setNewPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');

    const dispatch = useDispatch();

    const auth =useSelector(state=>state.auth);

    const resetToken = useSelector(state=>state.auth.resetToken);

    const setPass = () =>{
        setSeen('password');
    }

    const setText = () =>{
        setSeen('text');
    }

    const setConfPass = () =>{
        setConfSeen('password')
    }
    
   
    const setConfText = () =>{
        setConfSeen('text');
    }
    

const reset = (resetToken,newPassword,confirmPassword) =>{
    dispatch(resetPassword(resetToken,newPassword,confirmPassword));
}

    
    return(
        <>
           <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                           New Password
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
                            <Form.Control type={confSeen} value={confirmPassword} placeholder="Confirm Password" onChange={e=>setConfirmPassword(e.target.value)} style={{width:"20rem"}}/>
                            {
                               confSeen === 'password' ? 
                            <Link onClick={()=>setConfText()}><FaRegEye/></Link>
                            :
                            <Link onClick={()=>setConfPass()}><FaRegEyeSlash/></Link>
                            }
                        </Col>
        </Form.Group>
        <Form.Group as={Row}>
                <Col sm={{ span: 10, offset: 2 }} style={{ display: "flex" }}>
                    <Button onClick={() => reset(resetToken,newPassword,confirmPassword)}>Submit</Button>

                </Col>
            </Form.Group>
            <br/>
            {
                auth.message ? <p>{auth.message}</p> : auth.error !== "User Needs to login" ? <p>Something Went Wrong!!</p> : ''
            }
        </>
    )
}

export default ResetPasswordContainer;