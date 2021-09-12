import React, { useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import Layout from '../../components/Layout';
import { MdArrowDropDownCircle } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { FaRupeeSign } from 'react-icons/fa';
import logo from '../../uploads/cart.jpg';
import { updateCart } from '../../redux/store';
// import env from 'dotenv';

// env.config();


const loadScript = (src) => {
    return new Promise(resolve => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
            resolve(true);
        }
        script.onerror = () => {
            resolve(false);
        }

        document.body.appendChild(script);
    })
}


const CheckoutContainer = (props) => {

    // console.log('Razorpay',process.env.RAZORPAY_ID);
    const dispatch = useDispatch();

    const user = useSelector(state => state.auth.user);
    const cart = useSelector(state => state.cart)

    let totalItem = Object.keys(cart.cartItems).reduce(function (qty, key) {
        return qty + cart.cartItems[key].qty;
    }, 0)
    let totalPrice = Object.keys(cart.cartItems).reduce((totalPrice, key) => {
        const { price, qty } = cart.cartItems[key];
        return totalPrice + price * qty;
    }, 0)
    console.log('totalItem', totalItem);
    console.log('totalPrice', totalPrice);



    const displayRazorPay = async () => {

        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

        if (!res) {
            alert('Razorpay SDK failed to load.PLease Check your Internet Connection in case if you are offline!');
            return;
        }

        let AMOUNT =  totalPrice * 100;


     const data = await fetch('http://localhost:5000/api/razorpay',{
            method:'POST',
            body: JSON.stringify({amount:AMOUNT,user:user._id}),
            headers:{
                'Content-Type':'application/json'
            }
        }).then((t) =>
            t.json()
        )

        console.log('data', data);

        // const __DEV__ = document.domain === 'localhost';

        var options = {
            key:'rzp_test_lrjvuhWedXPNLe',
            currency:data.currency,
            amount:data.amount.toString(),
            order_id: data.id,
            name: "SunStore",
            description: "Thank You",
            image: `${logo}`,
            handler: function (response) {
                // alert(response.razorpay_payment_id);
                // alert(response.razorpay_order_id);
                // alert(response.razorpay_signature); 
                alert('Payment Successful !! Your Order Will be delivered shortly within 2-3 weeks.')
                dispatch(updateCart());
            },
            prefill: {
                name: `${user.firstName} ${user.lastName}`,
                email: `${user.email}`,
                contact: `${user.phone}`
            }
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }


    return (
        <>
            <Layout bool={true}>
                <div style={{ borderBottom: "2px solid black", padding: "5px 0", backgroundColor: "whitesmoke" }}>
                    <h1 style={{ fontSize: "23px", padding: "0 20px", display: "flex", alignItems: "center" }}> < MdArrowDropDownCircle />Payment Details</h1>
                </div>
                <Container
                    style={{
                        minHeight: "calc(100vh - 149px)",
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                    <div>
                        <div style={{
                            display: "flex",
                            flexDirection: "column", padding: "20px 30px", border: "2px solid #544b4b",
                            width: "500px", borderRadius: "5px"
                        }}>
                            <div style={{ textAlign: "center" }}>
                                <h1>Payment Details</h1>
                            </div>
                            <div style={{ margin: "30px 0" }}>
                                <div style={{ display: "flex" }}>
                                    <p style={{ width: "80px" }}>Name:</p>
                                    <p>{user.firstName} {user.lastName}</p>
                                </div>
                                <div style={{ display: "flex" }}>
                                    <p style={{ width: "80px" }}>Email:</p>
                                    <p>{user.email}</p>
                                </div>
                                <div style={{ display: "flex" }}>
                                    <p style={{ width: "80px" }}>Address:</p>
                                    <p>{user.address}</p>
                                </div>
                                <div>
                                    <p> Items:</p>
                                    {
                                        Object.keys(cart.cartItems).map((key, index) => {
                                            return (
                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <p>{cart.cartItems[key].name} ({cart.cartItems[key].qty}) </p>
                                                    <p>{cart.cartItems[key].price} * {cart.cartItems[key].qty} = {cart.cartItems[key].price * cart.cartItems[key].qty}</p>
                                                </div>
                                            )
                                        })
                                    }
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <p>Total({totalItem} items): </p>
                                        <p style={{ display: "flex", alignItems: "initial" }}><span style={{ fontSize: "13px" }}>< FaRupeeSign /></span>{totalPrice}</p>
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <Button variant="primary" type="submit" style={{ padding: "10px 20px", display: "flex", alignItems: "initial" }} onClick={displayRazorPay}>Pay Now <span style={{ fontSize: "13px", paddingLeft: "10px" }}>< FaRupeeSign /></span>{totalPrice}</Button>
                            </div>
                        </div>
                    </div>
                </Container>
            </Layout>
        </>
    )
}

export default CheckoutContainer;