import { useEffect, useState } from "react";
import "./ShowCart.css";
import axios from "axios";
import React from "react";
import TableBody from "../TableBodyComponent/TableBody";
export default function ShowCart({ changeShowCart , currentUser}) {
  let [arrData, setArrData] = useState([]);
  let [purchaseData, setPurchaseData] = useState([]);
  let [verifyPurchaseData, setVerifyPurchaseData] = useState(false);
  let [verifyRow, setVerifyRow] = useState(false);
  let [totalPrice, setTotalPrice] = useState(0);
  // let totalPrice;
  let [currentUserProducts,setCurrentUserProducts] = useState([]);

  /*function calcTotalPrice() {
    axios
      .get("http://127.0.0.1:8080/getTotalPrice/")
      .then((res) => {
        // console.log(res.data[0].total_sum);
        setTotalPrice(res.data[0].total_sum);
      })
      .catch((err) => console.log("some error while geting total price", err));
  }*/

  /*function getAllRowsData() {
    setVerifyRow(false);
    axios
      .get("http://127.0.0.1:8080/")
      .then((res) => {
        setArrData(res.data);
        // console.log(res.data);
        setVerifyRow(true);
      })
      .catch((err) => console.log(err));
  }*/

  /*function getPurchaseData() {
    setVerifyPurchaseData(false);
    axios
      .get("http://127.0.0.1:8080/purchaseTable")
      .then((res) => {
        // console.log('getting purchase : ',res);
        setPurchaseData(res.data);
        setVerifyPurchaseData(true);
      })
      .catch((err) => console.log("error from getting purchase data: ", err));
  }
  // function getCurrentCustomerProducts(){
    
  }*/
  /*useEffect(() => {
    getAllRowsData();

    getPurchaseData();
    calcTotalPrice();
    getCurrentCustomerProducts();
  }, []);*/

  /*function filterData(d) {
    let oneProductData = purchaseData.filter(
      (data) => data.product_id === d.product_id
    );
    // console.log("one product data: ",oneProductData);
    return oneProductData;
  }*/

  /*async function removeProduct(p_id) {
    setVerifyRow(false);
    await axios
      .post("http://127.0.0.1:8080/removeRow/", { p_id })
      .then((res) => {
        // console.log(res.data);
        getAllRowsData();
        setVerifyRow(() => true);
      })
      .catch((err) => console.log("error: ", err));

    await axios
      .post("http://127.0.0.1:8080/removeFromPurchase/", { p_id })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));

    getPurchaseData();
    calcTotalPrice();
  }*/
  function triggerFunction(){
    setVerifyRow(true);
    getCurrentCustomerProducts();
  }
  function removeProduct(productId){
    // console.log("removing product with product Id: ",productId);
    axios.post('http://127.0.0.1:8080/removeProduct',{productId,currentUser})
    .then((result)=>{
        getCurrentCustomerProducts();
        calcTotalPrice();
    })
    .catch((err)=>console.log("follwing error occured while deleting the product",err));
  }
  function getCurrentCustomerProducts(){
    axios.post('http://127.0.0.1:8080/getCurrentCustomerProducts/',{currentUser})
    .then((result)=>{
      // console.log("All products of current customer are: ",result);
      setCurrentUserProducts(result.data);
      calcTotalPrice();
      setVerifyRow(true);
    })
    .catch((err)=>{
      console.log("following error occured while getting current customer products: ",err);
    })
  }
  function calcTotalPrice(){
    axios.post('http://127.0.0.1:8080/calcTotalPrice/',{currentUser})
    .then((result)=>{
      // console.log("overall total Price: ",result);
      setTotalPrice(result.data[0].totalFinalPrice);
    })
    .catch((err)=>console.log("following error occured while calculating final price",err));
  }

  useEffect(()=>{
    getCurrentCustomerProducts();
    calcTotalPrice();
  },[]);
function changeText(event){
  event.target.textContent="Order Placed Successfully";
}
  
  return (
    <div className="main-cart-div">
      <div className="heading-div">
        <p>My Cart</p>
        <a onClick={changeShowCart} id="go-back">&lt; Go Back</a>
      </div>
      <hr />
      <div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Amazon Price</th>
              <th>Discounted Price</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {verifyRow ? (
              
                currentUserProducts.map((d, i) => (
                  <TableBody
                    d={d}
                    removeProduct={removeProduct}
                    triggerFunction={triggerFunction}
                    currentUser={currentUser}
                    key={i}
                  />
                ))
             
            ) : (
              <tr>
                <td colSpan={5}>Loading data...</td>
              </tr>
            )}
          </tbody>
        </table>
        {currentUserProducts.length > 0 ? (
          <div id="buy-btn-div">
            <button onClick={changeText} id="buy-now-btn">Buy Now @ &#8377;{totalPrice}</button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
