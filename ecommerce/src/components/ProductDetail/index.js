import React, { useState } from 'react';
import { Col, Container, Row ,Button } from 'react-bootstrap';
import { FaRupeeSign, FaStar } from 'react-icons/fa';
import { MdArrowDropDownCircle } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../../redux/store';
import Layout from '../Layout';

const ProductDetail = (props) => {

    const dispatch = useDispatch();
    const product = useSelector(state => state.product.product);



    const link = props.history.location.pathname;

    const replaceLINK = link.replace('/', '');
    var resLink = replaceLINK.split('/');

    console.log('link', resLink);
    console.log(props);

    if (Object.keys(product).length === 0) {
        return null;
    }

    const CountStar = (rating) => {
        if (rating === 1) {
            return <p>< FaStar /></p>
        }
        else if (rating === 2) {
            return <p>< FaStar /> < FaStar /></p>
        }
        else if (rating === 3) {
            return <p>< FaStar /> < FaStar /> < FaStar /></p>
        }
        else if (rating === 4) {
            return <p>< FaStar /> < FaStar /> < FaStar /> < FaStar /></p>
        }
        else if (rating === 5) {
            return <p>< FaStar /> < FaStar />  < FaStar /> < FaStar /> < FaStar /></p>
        }
    }

    const MfgDate = (mfgDate) => {
        let mfg = [];
        let count = mfgDate.split('-');
        let sec = count[2];
        mfg.push(count[0]);
        mfg.push(count[1]);
        let secdata = sec.split('T');
        mfg.push(secdata[0]);
        //  let thirdData = third.split('T');
        //  mfg.push(thirdData[0]);
        //  console.log(mfg);
        return <p>{`${mfg[2]}/${mfg[1]}/${mfg[0]}`}</p>

    }

    const ExpiryDate = (expiryDate) => {
        let expiry = [];
        let count = expiryDate.split('-');
        let sec = count[2];
        expiry.push(count[0]);
        expiry.push(count[1]);
        let secdata = sec.split('T');
        expiry.push(secdata[0]);
        //  let thirdData = third.split('T');
        //  mfg.push(thirdData[0]);
        //  console.log(mfg);
        return <p>{`${expiry[2]}/${expiry[1]}/${expiry[0]}`}</p>

    }

    return (
        <> <Layout>
            <div style={{ borderBottom: "2px solid black", padding: "5px 0", backgroundColor: "whitesmoke" }}>
                <h1 style={{ fontSize: "23px", padding: "0 20px", display: "flex", alignItems: "center" }}> < MdArrowDropDownCircle />&nbsp; {product.ProductName}</h1>
            </div>

            <Container style={{ minHeight: "calc(100vh - 149px)", position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <Container>
                    <Row>
                        <Col>
                            <div style={{ width: "243px", height: "359px" }}>
                                <img src={`http://localhost:5000/public/${product.ProductPicture.filename}`} style={{ width: "100%", height: "100%" }} />
                                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                                    <Button variant="primary"
                                     onClick={()=>{
                                        const {_id,ProductName,Price} = product;
                                        const pic = product.ProductPicture;
                                        const  name = ProductName;
                                        const price = Price;
                                        dispatch(addToCart({_id,name,price,pic}));
                                        props.history.push('/cart');
                                    }}
                                    >ADD TO CART</Button>
                                    <Button variant="danger"
                                    onClick={()=>{
                                        const {_id,ProductName,Price} = product;
                                        const pic = product.ProductPicture;
                                        const  name = ProductName;
                                        const price = Price;
                                        dispatch(addToCart({_id,name,price,pic}));
                                        props.history.push('/Checkout');
                                    }}
                                    >BUY NOW</Button>
                            </div>
                            </div>
                        </Col>
                        <Col>
                            <div style={{ display: "flex", alignItems: "baseline" }}>
                                <label style={{ fontSize: "18px" }}>Product Name:</label>
                                <h1 style={{ fontSize: "18px", marginLeft: "8px" }}>{product.ProductName}</h1>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "baseline" }}>
                                <label style={{ fontSize: "18px" }}>Description: </label>
                                <p style={{ fontSize: "12px", textAlign: "justify", marginLeft: "18px" }}>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </p>
                            </div>
                            <div style={{ display: "flex", alignItems: "baseline" }}>
                                <label style={{ fontSize: "18px" }}>Product Price: </label>
                                <h1 style={{ display: "flex", alignItems: "initial", marginLeft: "8px" }}>
                                    <p style={{ fontSize: "18px" }}>< FaRupeeSign /></p>
                                    <p style={{ fontSize: "18px" }}>{product.Price}</p>
                                </h1>
                            </div>
                            <div style={{ marginTop: "-18px", display: "flex", alignItems: "initial" }}>
                                <label style={{ fontSize: "18px" }}>Rating:</label>
                                <h1 style={{ fontSize: "18px", marginLeft: "8px" }}>
                                    {
                                        product.Rating &&
                                        CountStar(product.Rating)
                                    }
                                </h1>
                            </div>
                            <div style={{ marginTop: "-10px", display: "flex", alignItems: "baseline" }}>
                                <label style={{ fontSize: "18px" }}>Manufactured Date:</label>
                                <h1 style={{ fontSize: "16px", marginLeft: "8px" }}>
                                    {
                                        product.DateOfManufactured &&
                                        MfgDate(product.DateOfManufactured)
                                    }
                                </h1>
                            </div>
                            <div style={{ marginTop: "-10px", display: "flex", alignItems: "baseline" }}>
                                <label style={{ fontSize: "18px" }}>Expiry Date:</label>
                                <h1 style={{ fontSize: "16px", marginLeft: "8px" }}>
                                    {
                                        product.ExpiryDate &&
                                        ExpiryDate(product.ExpiryDate)
                                    }
                                </h1>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </Layout>
        </>
    )
}

export default ProductDetail;