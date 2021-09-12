import React from 'react';
import { FaRupeeSign } from 'react-icons/fa';

const PriceDetails = (props) =>{

    const {totalItem , totalPrice } = props;
    return (
        <>
        <div className="flexRow sb" style={{ margin: "10px 0" }}>
                    <div>Delivery Charges</div>
                    <div>FREE</div>
       </div>
       <div className="flexRow sb" style={{ margin: "10px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>Total ({totalItem} items)</div>
                    <div style={{display:"flex",alignItems:"initial"}}><p style={{ fontSize: "13px",fontWeight:"200",paddingTop:"2px" }}>< FaRupeeSign /></p>{totalPrice}</div>
         </div>
        </>
    )
}

export default PriceDetails;