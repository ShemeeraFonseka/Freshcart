import { useCart } from "react-use-cart";
import React, { useState } from 'react';
import "./CartItemCard.css";

const ItemCard = (props) => {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    const productId = props.item.id; 
  
    
    addItem(props.item, quantity);
  
    
    const response = await fetch('http://localhost:8081/add-cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        productId,
        quantity
      })
    });
  
    const data = await response.json();
    const cartId = data.id;
    console.log(cartId)
    return { cartId };
  };

  return (
    <div className="cartdisplay">
    <div className="col-11 col-md-6 col-lg-3 mx-0 mb-4">
      <div className="card p=0 overflow-hidden h-100 shadow">
        <img src={props.img} className="card-img-top img-fluid" />
        <div className="card-body text-center">
          <h5 className="card-title">{props.title}</h5>
          <h5 className="card-text">Rs.{props.price} / 1 {props.unit} </h5>
          <div className="input-group mb-3">
            <span className="input-group-text">Quantity</span>
            <input type="number" min="0" max="100" className="form-control" value={quantity} onChange={(event) => setQuantity(event.target.value)} />
          </div>
          <button className="addbutton" onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default ItemCard;
