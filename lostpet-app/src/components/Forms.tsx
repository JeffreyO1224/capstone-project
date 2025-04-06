import React from "react";
import "./Forms.css";

function Forms() {
  return (
    <div className="form-wrapper">
      <form>
        <h1>Sign Up</h1>
        <div className="form-group">
          <label htmlFor="exampleInputUserName1">User Name</label>
          <input type="text" id="exampleInputUserName1" placeholder="Enter a User Name" />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputFirstName1">First Name</label>
          <input type="text" id="exampleInputFirstName1" placeholder="Enter Your First Name" />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputLastName1">Last Name</label>
          <input type="text" id="exampleInputLastName1" placeholder="Enter a Last Name" />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email Address</label>
          <input type="email" id="exampleInputEmail1" placeholder="Enter email" />
          <small>We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" id="exampleInputPassword1" placeholder="Password" />
        </div>
        <button type="submit" className="btn">Submit</button>
      </form>
    </div>
  );
}

export default Forms;

