import "./Test1.css";
import Price from "../PriceComponent/Price";
import AddToCart from "../AddToCartComponent/AddToCart";
export default function Test1({
  productImage,
  productTitle,
  productDesc,
  productPrice,
  discountPrice,
  changeDetail,
}) {
  return (
    <div className="Test1Div d-flex" onClick={changeDetail}>
      <div>
        <img src={productImage} alt="product image" id="detail-image"/>
      </div>
      <div className="d-flex desc-div">
        <h2>{productTitle}</h2>
        <p>{productDesc}</p>
      </div>
      <div>
        <Price productPrice={productPrice} discountPrice={discountPrice}/>
      </div>
      
    </div>
  );
}
