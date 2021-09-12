import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/Layout';
import ProductContainer from '../../components/Product';
import SearchedProductContainer  from '../../components/SearchProduct';
import { MdArrowDropDownCircle } from "react-icons/md";

const HomeContainer = (props) => {

    const search = useSelector(state=>state.product.search);
    const product = useSelector(state=>state.product.product);

    
    return (
        <>
            <Layout bool={true}>
                <div style={{borderBottom:"2px solid black" ,padding:"5px 0",backgroundColor:"whitesmoke"}}>
                <h1 style={{fontSize:"23px",padding:"0 20px",display:"flex",alignItems:"center"}}> < MdArrowDropDownCircle />&nbsp; Ayurveda</h1>
                 </div>
                 <Container style={{ minHeight: "calc(100vh - 149px)", position:"relative", display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                 <h1 style={{width:"100%",textAlign:"left"}} >Products..</h1>
                   <ProductContainer  />
            </Container>
            </Layout>
        </> 
    )
}

export default HomeContainer;