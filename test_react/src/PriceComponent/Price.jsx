import './Price.css';
export default function Price({productPrice, discountPrice}){
    
    return(
        <div id="main-price-div">
            <div >
                At amazon:  &#8377;{productPrice}
            </div>
            <div>
                Here at:  &#8377;{discountPrice}
            </div>
        </div>
    )
}