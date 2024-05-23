import axios from "axios";
import "./Card.css";
import Test1 from "../Tests/Test1";
import Price from "../PriceComponent/Price";
import { useEffect, useState } from "react";
import AddToCart from "../AddToCartComponent/AddToCart";

export default function Card({
  productTitle,
  productImage,
  productDesc,
  productPrice,
  productId,
  currentUser
}) {
  // let [foundData, setFoundData] = useState([]);
  /*useEffect(() => {
    axios
      .post("http://127.0.0.1:8080/verifyProductInCart/", { productId })
      .then((res) => {
        // console.log(res);
        setFoundData(res.data);
      })
      .catch((err) =>
        console.log("error occured while verifing add to cart", err)
      );
  }, []);*/
  let [detail, setDetail] = useState(false);
  // let [verifyCart, setVerifyCart] = useState(false);
  function changeDetail() {
    if (detail) setDetail(false);
    else setDetail(true);
  }
  /*function changeVerifyCart() {
    setVerifyCart(true);
    return verifyCart;
  }*/
  function calculateDiscount() {
    // console.log("inside disocount function: ",currentUser);
    if (productPrice > 50000) return productPrice * 0.4;
    else if (productPrice > 30000) return productPrice * 0.3;
    else if (productPrice > 10000) return productPrice * 0.2;
    else return productPrice * 0.1;
  }
  return (
    <div>
      {detail ? (
        <Test1
          productImage={productImage}
          productTitle={productTitle}
          productDesc={productDesc}
          productPrice={productPrice}
          discountPrice={productPrice - calculateDiscount()}
          changeDetail={changeDetail}
        />
      ) : (
        <div>
          <div id="image-title">
            <img src={productImage} alt="image" className="product-image" />
            <p>{productTitle}</p>
          </div>
          <div>
            <Price
              productPrice={productPrice}
              discountPrice={productPrice - calculateDiscount()}
            />
          </div>
          <div>
            <a className="show-details-link" onClick={changeDetail}>
              Show more details...
            </a>
          </div>
          <div id="cart-div">
              <AddToCart
                productId={productId}
                discountPrice={productPrice - calculateDiscount()}
                currentUser={currentUser}
              />
            
          </div>
        </div>
      )}
    </div>
  );
}
