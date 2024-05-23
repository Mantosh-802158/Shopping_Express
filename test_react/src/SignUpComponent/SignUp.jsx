import "./SignUp.css";
import { useState } from "react";
import axios from "axios";
export default function SignUp({ switchToLogin }) {
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [phoneNumber, setPhoneNumber] = useState("");
  let [city, setCity] = useState("");
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [repass, setRepass] = useState("");
  let [status, setStatus] = useState("");
  function validateSignUpForm() {
    if (
      firstName == "" ||
      lastName == "" ||
      phoneNumber == "" ||
      city == "" ||
      username == "" ||
      password == "" ||
      repass == ""
    ) {
      alert("please fill all the fields!");
    } else {
      axios
        .post("http://127.0.0.1:8080/signUpCustomer/", {
          username,
          firstName,
          lastName,
          phoneNumber,
          city,
          password,
        })
        .then((res) => {
          console.log("details added to customer table");
        })
        .catch((err) => {
          console.log(
            "the following errror occurred while inserting into table: ",
            err
          );
        });
      switchToLogin();
    }
  }
  function confirmPassword(event) {
    // console.log("inside confirm password")
    setRepass(event.target.value);
    /*if(repass===password){
      ()=>setStatus("Password confirmed");
      console.log("inside if");
    }
    else{
      ()=>setStatus("wrong password");
    }*/
  }
  return (
    <div className="main-container-div">
      <div className="container-div">
        <div className="sign-up-child-div">
          <label htmlFor="first-name">First Name</label>  
          <input
            type="text"
            id="first-name"
            value={firstName}
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
          /><br></br>
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            value={lastName}
            onChange={(event) => {
              setLastName(event.target.value);
            }}
          /><br></br>
          <label htmlFor="phone">Phone Number</label>
          <input
            type="number"
            id="phone"
            value={phoneNumber}
            onChange={(event) => {
              setPhoneNumber(event.target.value);
            }}
          /><br></br>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(event) => {
              setCity(event.target.value);
            }}
          />
        </div>
        <div className="sign-up-child-div">
          <label htmlFor="user-id">Create User Name</label>
          <input
            type="text"
            id="user-id"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          /><br></br>
          <label htmlFor="password">Create Password</label>
          <input
            type="text"
            id="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          /><br></br>
          <label htmlFor="confirm-pass">Confirm Password</label>
          <input
            type="text"
            id="confirm-pass"
            value={repass}
            onChange={confirmPassword}
          /><br></br>
          <p>{status}</p>
        </div>
        
      </div>
      <button type="submit" onClick={validateSignUpForm}>
          Done
        </button>
    </div>
  );
}
