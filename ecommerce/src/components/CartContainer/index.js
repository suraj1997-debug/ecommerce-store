import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { MdArrowDropDownCircle } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, getCartItems,removeCartItems } from '../../redux/store';
import Layout from '../Layout';
import PriceDetails from '../PriceDetails';
import SummaryContainer from '../SummaryContainer';
import CartItems from './CartItems';

const CartContainer = (props) => {
  const auth = useSelector(state => state.auth);
  const cart = useSelector(state => state.cart);

  const [cartItems, setCartItems] = useState(cart.cartItems);
  const dispatch = useDispatch();

  useEffect(()=>{
     setCartItems(cart.cartItems);
  },[cart.cartItems]);

  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getCartItems());
    }
  }, [auth.authenticate]);

  

  const onQuantityIncrement = (_id, qty) => {
    const { name, price, pic } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, pic }, 1));
  };

  const onQuantityDecrement = (_id, qty) => {
    const { name, price, pic } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, pic }, -1));
  };

  const onRemoveCartItem = (_id) => {
    dispatch(removeCartItems({ productId: _id }));
  };

 

  return (
    <>
      <Layout>
        <div style={{ borderBottom: "2px solid black", padding: "5px 0", backgroundColor: "whitesmoke" }}>
          <h1 style={{ fontSize: "23px", padding: "0 20px", display: "flex", alignItems: "center" }}> < MdArrowDropDownCircle />&nbsp; Cart</h1>
        </div>
        <Container style={{ minHeight: "calc(100vh - 149px)", position: "relative", display: "flex", justifyContent: "center", margin: "50px 40px", width: "100vw" }}>
          {/* <Container style={{display:"flex",justifyContents:"center",maxWidth:"100%"}}> */}
          <Row style={{ marginRight: "-270px" }}>
            <Col style={{ display: "flex", flexDirection: "column", justifyContent: "space", width: "1200px", border: "2px solid black", padding: "20px 20px" }}>
              {
                Object.keys(cartItems).map((key, index) => {
                  return (
                    <>
                      < CartItems
                        key={index}
                        cartItem={cartItems[key]}
                        QuantityInc = {onQuantityIncrement} 
                        QuantityDec = {onQuantityDecrement}
                        onRemoveCartItem = {onRemoveCartItem}
                      />
                    </>
                  )
                })
              }
              <div style={{ display: "flex", border: "2px solid black", padding: "10px 10px", borderRadius: "5px", justifyContent: "flex-end" }}>
               { 
                  auth.authenticate ? <Link to="/Checkout"><Button variant="primary" >CHECKOUT</Button></Link>
                  : <Button variant="primary" onClick={()=>{ alert("You need to login first")}} >CHECKOUT</Button>
               }
              </div>
            </Col>
            <Col style={{ display: "flex", flexDirection: "column", border: "2px solid black", borderLeft: "unset", padding: "20px 20px" }}>
            <div style={{ border: "2px solid black", display: "flex", flexDirection: "column", padding: "20px 20px", margin: "10px 0", borderRadius: "5px" }}>
                  <SummaryContainer 
                   cartitems = {cart.cartItems}
                  /> 
                    <PriceDetails
                totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
                  return qty + cart.cartItems[key].qty;
                }, 0)}
                totalPrice={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
                  const { price, qty } = cart.cartItems[key];
                  return totalPrice + price * qty;
                }, 0)}
         />

            </div>
            </Col>
          </Row>
          {/* </Container> */}
        </Container>
      </Layout>
    </>
  )
}

export default CartContainer;