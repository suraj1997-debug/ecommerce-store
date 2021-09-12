import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";
import { FaRupeeSign } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CartItems = (props) => {

    const cartItems = useSelector(state => state.cart.cartItems);

    const [qty, setQty] = useState(props.cartItem.qty);


    const { _id, name, price, pic } = props.cartItem;

    const {QuantityDec,QuantityInc} = props;

    const QuantityDecrement = () => {
        if (qty <= 1) return;
        setQty(qty - 1);
        QuantityDec(_id, qty - 1);
    }

    const QuantityIncrement = () => {
        setQty(qty + 1);
        QuantityInc(_id, qty + 1);
    }

    return (
        <>
            <Card style={{ width: '100%', display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", margin: "10px 0", border: "2px solid black" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ position: "relative", display: "grid", placeItems: "center", width: "150px", height: "150px",  margin: "20px",marginBottom:"unset" }}>
                        <Card.Img variant="top" style={{ position: "absolute", height: "90%", width: "90%", textAlign: "center" }} src={`http://localhost:5000/public/${pic.filename}`} />
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <p onClick={() => QuantityDecrement()} style={{ fontSize: "23px", cursor: "pointer" }}>< IoIosRemoveCircle /></p>
                        <p style={{ padding: "0 23px", margin: "0 3px", fontSize: "16px", marginTop: "-9px", border: "1px solid black" }}>{qty}</p>
                        <p onClick={() => QuantityIncrement()} style={{ fontSize: "23px", cursor: "pointer" }}>< IoIosAddCircle /></p>
                    </div>
                </div>
                <Card.Body style={{paddingLeft:"21px"}}>
                    <div style={{ display: "flex",justifyContent:"center", flexDirection: "column",height: "150px",paddingTop:"31px"}}>
                    <Card.Title style={{ fontSize: "22px" }}>{name}</Card.Title>
                    <Card.Text style={{ display: "flex",justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                            <h1 style={{ fontSize: "25px", display: "flex" }}>
                              <p style={{ fontSize: "23px",fontWeight:"200" }}>< FaRupeeSign /></p>{price}
                            </h1>
                        </div>
                    </Card.Text>
                    </div>
                    <div style={{marginTop:"22px"}}>
                            <Link style={{ fontWeight: "bold",cursor:"pointer",color:"#ef1818",textDecoration:"none" }}
                                onClick={() => props.onRemoveCartItem(_id)}
                            >REMOVE
                            </Link>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}

export default CartItems;