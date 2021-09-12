import React,{useState} from 'react';
import { Button, Container } from 'react-bootstrap';
import emailjs from 'emailjs-com';

const Contact = (props) => {

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [msg,setMsg] = useState('');
    const [success,setSuccess] = useState(false);

    function sendEmail(e){
        e.preventDefault();
        if (
            name === "" ||
            email === ""|| 
            msg === "" 
          ) {
            return;
          }
    emailjs.sendForm('gmail','template_sxjmxsx', e.target,'user_wmorGRqttTWpHno0eLUTd',{
        to_name: "suraj"
    })
    .then((response) => {
       console.log('SUCCESS!', response.status, response.text);
       setSuccess(true);
       setTimeout(()=>{
        setSuccess(false);
       },3000)

    }, (err) => {
       console.log('FAILED...', err);
       setSuccess(false);
    });
 setName('');
 setEmail('');
 setMsg('');
    }

    if(success){
        alert("Message has been sent Successfully");
        setSuccess(false); 
    }


    return (
        <>
            <Container style={{border:"2px solid black",padding:" 60px 94px 94px 60px"}}>
            <h1 style={{fontSize:"25px",textAlign:"center",paddingBottom:"30px"}}>Message Here..</h1>
            <form onSubmit={sendEmail}>
                <div style={{display:"flex",justifyContent:"space-between"}}> 
                    <input type="text" value={name}  onChange={e=>setName(e.target.value)} placeholder="Enter Name" />
                    <input type="text" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Enter Email" />
                </div>
                <div style={{marginTop:"45px"}}>
                    <textarea type="text" placeholder="Write your Queries Here" rows={2} 
                    value={msg} onChange={e=>setMsg(e.target.value)}
                    style={{height:"86px",width:"100%",resize:"none"}}
                    ></textarea>
                </div>
                <div style={{display:"flex",justifyContent:"center",paddingTop:"30px"}}>
                <Button type="submit" variant="primary" 
                style={{display:"inline-block",fontSize:"20px",textAlign:"center"}}>
                    Send Message
                </Button>
                </div>
            </form>
            </Container>
        </>
    );
}

export default Contact;