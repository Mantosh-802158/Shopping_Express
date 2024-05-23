import { useState, useEffect } from "react";
import axios from "axios";
import './TableBody.css';
export default function TableBody({ d,removeProduct,triggerFunction, currentUser}) {
  /*let productId = d.product_id;
  if(!purchaseData) console.log("not loaded yet");
  let [quantity, setQuantity] = useState(purchaseData[0].product_quantity);
  let [totalPrice, setTotalPrice] = useState(purchaseData[0].total_price);
  */

  /*
  async function insertIntoPurchaseTable(quant, total_p) {
    
   await axios
      .post("http://127.0.0.1:8080/purchaseTable/", {
        productId,  
        quant,
        total_p,
      })
      .then((res) => console.log("added to purchase table"))
      .catch((err) => console.log("err is : ------", err));
      calcTotalPrice();
  }
  function increaseQuantity() {
    setQuantity((prev) => prev + 1);
    setTotalPrice((prev) => prev + d.discount_price);
    // console.log(totalPrice + d.discount_price);
    insertIntoPurchaseTable(quantity + 1, totalPrice + d.discount_price);
  }
  function decreaseQuantity() {
    setQuantity((prev) => {
      if (prev == 1) return 1;
      return prev - 1;
    });
    if (quantity == 1) {
      setTotalPrice(d.discount_price);
      // console.log(totalPrice);
      // console.log(quantity);
      insertIntoPurchaseTable(quantity, totalPrice);
    } else {
      setTotalPrice((prev) => prev - d.discount_price);
      // console.log("inside else part");
      // console.log(totalPrice);
      // console.log(quantity);
      insertIntoPurchaseTable(quantity - 1, totalPrice - d.discount_price);
    }
    
  }
  */
function increaseQuantity(){
  let productId = d.product_id;
  axios.post('http://127.0.0.1:8080/increaseProductQuantity',{productId, currentUser})
  .then((result)=>{
    triggerFunction();
  })
  .catch((err)=>{
    console.log(err);
  });
}
function decreaseQuantity(){
  let productId = d.product_id;
  axios.post('http://127.0.0.1:8080/decreaseProductQuantity',{productId, currentUser})
  .then((result)=>{
    triggerFunction();
  })
  .catch((err)=>{
    console.log(err);
  });
}
  return (
    <tr>
      <td>
        <img src={d.product_image} alt="p_image" className="cart-table-image" />
      </td>
      <td>{d.product_title}</td>
      <td>{d.product_price}</td>
      <td>{d.total_price}</td>
      <td>
        <i
          className="fa-solid fa-minus inc-dec-icon"
          onClick={decreaseQuantity}
        ></i>
        {d.product_quantity}
        <i
          className="fa-solid fa-plus inc-dec-icon"
          onClick={increaseQuantity}
        ></i>
      </td>
      <td>{d.final_price}</td>
      <td>
        <button className="remove-btn" onClick={()=>removeProduct(d.product_id)}>Remove</button>
      </td>
    </tr>
  );
}
