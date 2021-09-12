import React from 'react';

const SummaryContainer = (props) => {

  const { cartitems } = props;


  return (
        <>
        <h1 style={{fontSize:"20px"}}>Summary</h1>
        {
          Object.keys(cartitems).map((key, index) => {
            return (
              <>
                <div className="flexRow sb" style={{ margin: "10px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }} key={index}>
                  <div > {cartitems[key].name} ({cartitems[key].qty})</div>
                  <div>{cartitems[key].price} * {cartitems[key].qty} = {cartitems[key].price * cartitems[key].qty} </div>
                </div>
              </>
              )
        })
        }
        </>
            )
          }

export default SummaryContainer;