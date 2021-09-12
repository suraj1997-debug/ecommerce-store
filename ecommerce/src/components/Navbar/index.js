import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, FormControl, Nav, Navbar, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {Link } from 'react-router-dom';
import { FaRegEye,FaRegEyeSlash} from "react-icons/fa";
import { Modal } from '../Material UI/index';
import { forgetPassword, loginUser, logoutUser, searchProduct, signupUser} from '../../redux/store';


const NavbarContainer = (props) => {

    const [seen,setSeen] = useState('password');
    const [loginModal, setLoginModal] = useState(false);
    const [SignUpModal, setSignUpModal] = useState(false);
    const [forgetModal,setForgetModal] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [phone,setPhone] = useState("");
    const [address,setAddress] = useState("");
    const [search,setSearch] = useState("");


    const dispatch = useDispatch();

    const setPass = () =>{
        setSeen('password');
    }
    
    const setText = () =>{
        setSeen('text');
    }
    
    const login = (email,password) =>{
        // console.log(email,password);
        dispatch(loginUser(email,password));
        setEmail('');
        setPassword('');
        setLoginModal(false);
    }


    
   
 const LoginModalContain = () =>{
        setLoginModal(true);
 }

 const signup = (firstName,lastName,phone,email,address) =>{
    // console.log(firstName,lastName,phone,email,address);
    dispatch(signupUser(firstName,lastName,phone,email,address));
    setFirstName('');
    setLastName('');
    setPhone('');
    setEmail('');
    setAddress('');
    setSignUpModal(false);
}


 const SignUpModalContain = () =>{
    setSignUpModal(true);
}
 const [searchpage,setSearchPage] = useState(1);

  
 const Searchfunction = (search,searchpage) =>{
     dispatch(searchProduct(search,searchpage)); 
     setSearch('');
     setSearchPage(1);
 }


       const result = useSelector(state=>state.product.Searchedresult);

   
    const renderLoggedInLinks = () =>{
        return (
            <>
               {
                props.bool === true ? 
                <>
                <Link style={{margin:"0 12px",marginLeft:"728px",color:"white",textDecoration:"none"}}>{auth.user.firstName}</Link>
                 <Link onClick={()=>logout()} style={{color:"white",textDecoration:"none"}}>Logout</Link>
               
                </>
                :<>
                <Link style={{margin:"0 12px",marginLeft:"1000px",color:"white",textDecoration:"none"}}>{auth.user.firstName}</Link>
                 <Link onClick={()=>logout()} style={{color:"white",textDecoration:"none"}}>Logout</Link>
              
                </>
                }
                
            </> 
        )
    }

    const renderLoggedOutLinks = () =>{
        return (
            <>
              {
                   props.bool === true ? <> 
                    <Link  onClick={() => LoginModalContain()} style={{margin:"0 12px",marginLeft:"728px",color:"white",textDecoration:"none"}}>Login</Link>
                    <Link  onClick={() => SignUpModalContain()} style={{color:"white",textDecoration:"none"}}>Signup</Link>
                    </>
                    :<>
                    <Link  onClick={() => LoginModalContain()} style={{margin:"0 12px",marginLeft:"1000px",color:"white",textDecoration:"none"}}>Login</Link>
                    <Link  onClick={() => SignUpModalContain()} style={{color:"white",textDecoration:"none"}}>Signup</Link>
                    </>

              }

            </>
        )
    }

    const logout = () =>{
        if(auth.authenticate){
        dispatch(logoutUser());
        }
    }
   
    const forget = (email) =>{
        setLoginModal(false);
        setForgetModal(true)

    }


    const forgetpass = (email)=>{
        dispatch(forgetPassword(email));
        setEmail('')
        setForgetModal(false);
    }
    
    
    const auth = useSelector(state => state.auth);

    return (
        <>
            <Navbar bg="dark" variant="dark" style={{ height: "60px" }}>
                <Navbar.Brand >SunStore</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link to="/" style={{padding:"0 10px",color:"white",textDecoration:"none"}}>Home</Link>
                        <Link to="/AboutUs" style={{padding:"0 10px",color:"white",textDecoration:"none"}}>About</Link>
                        <Link to="/cart" style={{padding:"0 10px",color:"white",textDecoration:"none"}}>Cart</Link>
                        <Link to="/ContactUs" style={{padding:"0 10px",color:"white",textDecoration:"none"}}>Contact</Link>
                        {
                            auth.authenticate ?  renderLoggedInLinks()  : renderLoggedOutLinks() 
                            
                        }
                    </Nav>
                   { props.bool === true &&
                   <Form inline>
                        <FormControl type="text" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search" className="mr-sm-2" />
                        <Link to ={`/search?search=${search}&page=${searchpage}`} ><Button variant="outline-success" onClick={()=>Searchfunction(search,searchpage)}>Search</Button></Link>
                    </Form>
                   }
                </Navbar.Collapse>
            </Navbar>

            {/* LOGIN */}
            <Modal visible={loginModal} onClose={() => setLoginModal(false)}>
            <Container className="justify-content-md-center" >
                <Form>
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

                            <Link onClick={()=>forget(email)}> ForgetPassword</Link>
                        </Col>
                    </Form.Group>
                </Form>
            </Container>
            </Modal>

            {/* SIGNUP */}
            <Modal visible={SignUpModal} onClose={() => setSignUpModal(false)}>
            <Container className="justify-content-md-center" >
                <Form>
                <h1 style={{textAlign:"left",marginBottom:"50px"}}>Sign Up</h1>
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>
                            First Name
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" value={firstName} placeholder="First Name" onChange={e=>setFirstName(e.target.value)} style={{width:"20rem"}} autoComplete="off" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>
                            Last Name
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" value={lastName} placeholder="Last Name" onChange={e=>setLastName(e.target.value)} style={{width:"20rem"}} autoComplete="off" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>
                            Phone
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" value={phone} placeholder="Phone" onChange={e=>setPhone(e.target.value)} style={{width:"20rem"}} autoComplete="off" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>
                            Email
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="email" value={email} placeholder="Email" onChange={e=>setEmail(e.target.value)} style={{width:"20rem"}} autoComplete="off" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>
                            Address
                        </Form.Label>
                        <Col sm={10}>
                            <textarea type="text" placeholder="Address" onChange={e=>setAddress(e.target.value)} rows={2} style={{width:"20rem",resize:"none"}} autoComplete="off" >{email}</textarea>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Col style={{display:"flex",justifyContent:"center"}}>
                            <Button type="submit" onClick={()=>signup(firstName,lastName,phone,email,address)}>Sign Up</Button>
                        </Col>
                    </Form.Group>
                </Form>
            </Container>
            </Modal>

            {/* FogetModal */}
            <Modal visible={forgetModal} onClose={() => setForgetModal(false)}>
            <Container className="justify-content-md-center" >
                { 
                   auth.forget && alert(`${auth.message}`)
                }
                <Form>
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>
                            Email
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="email" value={email} placeholder="Email" onChange={e=>setEmail(e.target.value)} style={{width:"20rem"}}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Col sm={{ span: 10, offset: 2 }} style={{display:"flex"}}>
                            <Button type="submit" onClick={()=>forgetpass(email)} variant="primary">Submit</Button>
                        </Col>
                    </Form.Group>
                </Form>
            </Container>
            </Modal>
        </>
    )
}

export default NavbarContainer;