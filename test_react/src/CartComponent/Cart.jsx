import "./Cart.css";
import ShowCart from "../ShowCartComponent/ShowCart";
import { useState } from "react";
export default function Cart({currentUser}) {
  let [showCart, setShowCart] = useState(false);
  function changeShowCart() {
    if (showCart) setShowCart(false);
    else setShowCart(true);
  }
  
  return (
    <>
      {showCart ? (
        <div className="show-cart-div">
            <ShowCart changeShowCart={changeShowCart} currentUser={currentUser}/>
        </div>
        
      ) : (
        <div className="cart-div" onClick={changeShowCart}>
          <img
            src="https://st4.depositphotos.com/14009552/38450/v/450/depositphotos_384500344-stock-illustration-shopping-cart-logo-design-letter.jpg"
            alt="cart-logo"
            id="cart-logo"
          />
          <p id="my-cart-para">My Cart</p>
        </div>
      )}
    </>
  );
}
