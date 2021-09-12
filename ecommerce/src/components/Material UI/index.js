import React from 'react';
import './style.css';
import {Button, Card} from 'react-bootstrap';

const Modal = (props) => {
    if (!props.visible) {
      return null;
    }
    return (
      <>
        <div className="modalFixedBg">
          <div style={{ position: "relative" }}>
            <div className="modalClose" onClick={props.onClose}>
              X
            </div>
            <div className="modalContainer">{props.children}</div>
          </div>
        </div>
      </>
    );
  };

  const ProductCard = (props) =>{
    return(
      <>
        <Card style={{ width: '400px',margin:"10px" }} key={props.index}>
                            {/* <Card.Img variant="top" src="" /> */}
                            <Card.Body>
                                <Card.Title>{props.title}</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
         </Card.Body>
      </Card>
      </>
    )
  } 

export {Modal,ProductCard};