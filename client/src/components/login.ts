import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [emailData, setEmailData] = useState();
  const [passData, setPassData] = useState();

  const EMAIL = (e : any) => {
    setEmailData(e.target.value);
  };
  const PASSWORD = (e : any) => {
    setPassData(e.target.value);
  };

  const submitForm = async (e : any) => {
    e.preventDefault();
    const obj = {
      email: emailData,
      password: passData,
    };
    console.log(obj);

    try {
      await axios({
        method: "post",
        url: "http://localhost:8080/login",
        data: obj,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>login</h1>
      <form onSubmit={submitForm}>
        <fieldset>
          <label>Email</label>
          <input type="email" name="email" required onChange={EMAIL} />
          <br />
          <br />

          <label>Password</label>
          <input type="password" name="password" required onChange={PASSWORD} />
          <br />
          <br />

          <button type="submit">Login</button>
        </fieldset>
      </form>
    </>
  );
}

export default Login;