import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../stateManage";

function Register() {
  const [userData, setUserData] = useState("");
  const [emailData, setEmailData] = useState("");
  const [passData, setPassData] = useState("");
  const dispatch = useDispatch();

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const obj = {
      first_name: userData,
      email: emailData,
      password: passData,
    };
    console.log(obj);
    dispatch(setUser(obj));

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
      <div className="">
        <form onSubmit={submitForm}>
          <input
            value={userData}
            onChange={(e) => setUserData(e.target.value)}
            type="text"
            placeholder="Enter a term"
            className="input"
          />
          <input
            value={emailData}
            onChange={(e) => setEmailData(e.target.value)}
            type="email"
            placeholder="Email"
            className="input"
          />
          <input
            value={passData}
            onChange={(e) => setPassData(e.target.value)}
            type="password"
            placeholder="Password"
            className="input"
          />
          <button type="submit" className="btn">
            Register Now
          </button>
        </form>
      </div>
    </>
  );
}

export default Register;
