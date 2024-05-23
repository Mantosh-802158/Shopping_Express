import './Footer.css';
export default function Footer() {
  return (
    <div id="main-div">
      <div className="flex-div">
        <div>
          <a href="https://www.linkedin.com/in/mantosh-kumar-820633233/" target='_blank'><i className="fa-brands fa-linkedin"></i> Linked-In</a>
          <a href="#"><i className="fa-brands fa-github"></i> Git-Hub</a>
          <a href="#"><i className="fa-brands fa-instagram"></i> Instagram</a>
          <a href="#"><i className="fa-brands fa-facebook"></i> Facebook</a>
        </div>
        <div>
          <a href="#"><i className="fa-brands fa-react"></i> React-docs</a>
          <a href="#"><i className="fa-solid fa-code"></i> Sel-docs</a>
          <a href="#"><i className="fa-brands fa-npm"></i> NPM-docs</a>
          <a href="#"><i className="fa-solid fa-database"></i> My-SQL-docs</a>
        </div>
        <div>
          <a href="#"><i className="fa-solid fa-cart-shopping"></i> My-Cart</a>
          <a href="#">sometext</a>
          <a href="#">sometext</a>
          <a href="#">sometext</a>
        </div>
      </div>
      <div>
        <p>&copy; All copyrights reserved @Shoping-Mart</p>
      </div>
    </div>
  );
}
