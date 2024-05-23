import { useState, useEffect } from "react";
import Card from "./Cards/Card";
import Logo from "./Logo/Logo";
import Cart from "./CartComponent/Cart";
import Footer from "./FooterCompoenent/Footer";
import Login from "./LoginComponent/Login";
import "./App.css";
import Category from "./CategoryComponent/Category";
import axios from "axios";
import AddToCart from "./AddToCartComponent/AddToCart";
function App() {
  let [inpValue, setInpValue] = useState("");
  let [card, setCard] = useState(false);
  let [reRenderCard, setReRenderCard] = useState(false);
  let [login, setLogin] = useState(false);
  let [productArray, setProductArray] = useState([]);

  let [currentUser, setCurrentUser] = useState("");

  function setInputValue(event) {
    // console.log(event.target.value);
    setCard(false);
    setInpValue(event.target.value);
  }
  function getInputValue() {
    axios
      .post("http://127.0.0.1:8080/getSpecificProduct/", { inpValue })
      .then((result) => {
        console.log(result);
        setProductArray(result.data);
      })
      .catch((err) => console.log("error: ", err));
    console.log("product array: ", productArray);
    setCard(true);
  }

  function verifyLogin() {
    setLogin(true);
    axios
      .get("http://127.0.0.1:8080/getAllProducts/")
      .then((result) => setProductArray(result.data))
      .catch((err) => console.log("error: ", err));

    axios
      .get("http://127.0.0.1:8080/currentUser/")
      .then((result) => {
        setCurrentUser(result.data[0].present_user);
        // console.log("first line to be executed: ",result);
        // console.log("second line : ",currentUser);
        /*allProducts=result.data;
      console.log("all products of the user are: ", allProducts);*/
      })
      .catch((err) => console.log("error: ", err));
  }

  return (
    <div className="main-app-div">
      {!login ? (
        <Login verifyLogin={verifyLogin} />
      ) : (
        <div className="app-body-div">
          <div className="header-div">
            <div id="logo-div">
              <Logo />
            </div>

            <div className="input-div">
              <input
                type="text"
                className="input-bar input-field"
                value={inpValue}
                onChange={setInputValue}
              />
              <button className="input-bar search-btn" onClick={getInputValue}>
                Search
              </button>
            </div>
            <Cart currentUser={currentUser} />
          </div>

          <div className="product-list">
            {productArray.map((t, i) => (
              <div className="Card" key={i}>
                <Card
                  productTitle={t.product_title}
                  productImage={t.product_image}
                  productDesc={t.product_details}
                  productPrice={t.product_price}
                  productId={t.product_id}
                  currentUser={currentUser}
                />
              </div>
            ))}
          </div>

          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
