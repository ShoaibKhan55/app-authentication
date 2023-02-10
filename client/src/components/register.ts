import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [userData, setUserData] = useState();
  const [emailData, setEmailData] = useState();
  const [passData, setPassData] = useState();

  const USERS = (e :any) => {
    setUserData(e.target.value);
  };
  const EMAIL = (e :any) => {
    setEmailData(e.target.value);
  };
  const PASSWORD = (e :any) => {
    setPassData(e.target.value);
  };

  const submitForm = async (e :any) => {
    e.preventDefault();
    const obj = {
      first_name: userData,
      email: emailData,
      password: passData,
    };
    console.log(obj);

    try {
      await axios({
        method: "post",
        url: "http://localhost:8080/register",
        data: obj,
      });
    } catch (error) {
      console.log(error, "register");
    }
  };
  return (
    <>
      <h1>Register</h1>

      <form onSubmit={submitForm}>
        <fieldset>
          <label>USERS</label>
          <input type="text" name="name" required onChange={USERS} />
          <br />
          <br />
          <label>Email</label>
          <input type="email" name="email" required onChange={EMAIL} />
          <br />
          <br />

          <label>Password</label>
          <input type="password" name="password" required onChange={PASSWORD} />
          <br />
          <br />

          <button type="submit">Register</button>
        </fieldset>
      </form>
    </>
  );
}

export default Register;