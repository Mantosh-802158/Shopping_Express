import axios from "axios";
import { useEffect, useState } from "react";
import './AddToCart.css'
export default function AddToCart({ productId,discountPrice,currentUser}) {
  // let currentUser;
  let [verifyCart,setVerifyCart] = useState(false); 
  let allProducts;
  
  // getCurrentUser();


  function getCurrentUserProducts(){
    axios.get('http://127.0.0.1:8080/currentUserProducts/')
    .then((result)=>{
      
      // console.log("third line: ",result);
      
      allProducts=result.data;
      // console.log("all products of the user are: ", allProducts);
    })
    .then(()=>{
      // console.log("fifth line...");
      verifyProductId();
    })
    .catch((err)=>console.log("error: ",err));
    
  }
  getCurrentUserProducts();

  function verifyProductId(){
    for(let i=0;i<allProducts.length;i++){
      if(allProducts[i].product_id===productId){
        // console.log(allProducts[i].product_id);
        setVerifyCart(true);
        break;
      }
    }
  }
  
  function addItem() {
    
    axios
      .post("http://127.0.0.1:8080/", { currentUser,productId,discountPrice })
      .then((res) => {
        console.log("added to cart");
      })
      .catch((err) => {
        console.log("error");
      });

     
      getCurrentUserProducts();
      
  }
  return (
    <div id="cart-btn-div">
      {verifyCart ? (
        <p>Product added to cart</p>
      ) : (
        <button onClick={addItem} id="add-to-cart-btn">Add to Cart</button>
      )}
    </div>
  );
}
