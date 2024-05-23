import "./Login.css";
import SignUp from "../SignUpComponent/SignUp";
import { useState } from "react";
import axios from "axios";
import Logo from "../Logo/Logo";
export default function Login({ verifyLogin }) {
  let [signUp, setSignUp] = useState(false);
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  function switchToLogin() {
    setSignUp(false);
  }
  function verifyUserPassword() {
    if (username == "" || password == "")
      alert("please enter values in both the fields");
    else {
      axios
        .post("http://127.0.0.1:8080/getUserPassword/", {
          username,
          password,
        })
        .then((res) => {
          // console.log(res);
          if (res.data.length == 0)
            alert(
              "no data found for this username. Kindly check your username and password"
            );
          else {
            axios
              .post("http://127.0.0.1:8080/updateCurrentUser/", { username })
              .then((res) => {
                // console.log("current user updated");
                verifyLogin();
              })
              .catch((err) => console.log("error: ", err));
          }
        })
        .catch((err) => console.log("some error occured"));
    }
  }
  return (
    <div>
      {signUp ? (
        <SignUp switchToLogin={switchToLogin}></SignUp>
      ) : (
        <div className="login-image-div">
          <div className="main-login-div">
            <div className="child-div">
            <i className="fa-solid fa-user"></i><span>{"  "}</span>
              <label htmlFor="user-id" className="login-label">
                User-Id
              </label>
              <input
                type="text"
                id="user-id"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              ></input>
            </div>
            <div className="child-div">
            <i className="fa-solid fa-lock"></i><span>{"  "}</span>
              <label htmlFor="password" className="login-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            {/* <div className="child-div" id="login-btn-div">
            <button id="login-btn" onClick={verifyUserPassword}>Click to login</button>
          </div> */}
            <button id="login-btn" onClick={verifyUserPassword}>
              Login
            </button>

            <p>
              New to this app?<br></br><br></br>
              <a onClick={() => setSignUp(true)} id="sign-up-link">
                Click here to sign up
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
