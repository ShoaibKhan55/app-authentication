import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../stateManage";

function Login() {
  const dispatch = useDispatch();
  const [emailData, setEmailData] = useState("");
  const [passData, setPassData] = useState("");

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const obj = {
      email: emailData,
      password: passData,
    };
    console.log(obj);

    try {
      const res = await axios({
        method: "post",
        url: "http://localhost:8080/api/login",
        data: obj,
      });
      console.log(res);
      dispatch(setUser(res.data.token));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h1>login</h1>
      <form onSubmit={submitForm}>
        <input
          value={emailData}
          onChange={(e) => setEmailData(e.target.value)}
          type="email"
          placeholder="Enter a Email"
          className="input"
        />
        <input
          value={passData}
          onChange={(e) => setPassData(e.target.value)}
          type="password"
          placeholder="Enter a Password"
          className="input"
        />
        <button type="submit" className="btn">
          Login
        </button>
      </form>
    </>
  );
}

export default Login;
