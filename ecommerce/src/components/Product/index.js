import React, { useEffect, useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { FaRupeeSign, FaStar } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProduct, getProductDetail} from '../../redux/store';

const ProductContainer = (props) => {

    const dispatch = useDispatch();

    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(getProduct(page));
    }, [])

  

    const result = useSelector(state => state.product.result);
    const products = useSelector(state => state.product.products);

    const ProductDetails = (name,id) =>{
        dispatch(getProductDetail(name,id));
     }

  


    return (
        <>
            <Container style={{  display: "flex", width: "100%", border: "2px solid black"}}>
                {
                    products.map((product, index) => {
                        return (
                            <>
                                <Card style={{ width: '217px', height: "341px", margin: "20px", boxShadow: "2px 2px 8px black", borderRadius: "5px"}} key={index} >
                                    <div style={{ width: "100%", height: "200px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <Card.Img variant="top" style={{ width: "90%", height: "90%", border: "2px solid grey", padding: "10px 10px" }} src={`http://localhost:5000/public/${product.ProductPicture.filename}`} />
                                    </div>
                                    <Card.Body style={{  height: "116px" }}>
                                        <Card.Title style={{ fontSize: "16px", textAlign: "center", height: "40px" }}>
                                            {product.ProductName}
                                        </Card.Title>

                                        <div style={{ display: "flex",flexDirection:"column", alignItems: "center", justifyContent: "center" }}>
                                           <div style={{width:"80%",display:"flex",justifyContent:"space-between"}}>
                                            <h1 style={{fontSize:"12px"}}>Price: < FaRupeeSign />{product.Price}</h1>
                                            <h1 style={{fontSize:"12px",display:"flex",alignItems:"center"}}>Rating: {product.Rating} < FaStar /></h1>
                                           </div>
                                           <Link to={`/${product.ProductName}/${product._id}`}>
                                           <Button variant="primary"  style={{ padding: "5px 61px", textAlign: "center" }} onClick={()=>ProductDetails(product.ProductName,product._id)} >BUY</Button>
                                           </Link> 
                                        </div>
                                    </Card.Body>
                                </Card>
                            </>
                        )
                    })
                }
            </Container>
        </>
    );
}

export default ProductContainer;