"use client"

import React, { useState } from "react";
import axios from "axios";
import style from '../login/login.module.scss'
import Link from "next/link";

const SingUp = () => {

  const [input, setInput] = useState({ username: "", email: "", password: "" });


  const inputHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setInput({ ...input, [name]: value })
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username, email, password } = input

    if (!username || !email || !password) {
      alert("Please enter a valid email or password")
      return
    }
    try {
      const { data } = await axios.post("http://localhost:4000/user/signup",
        {
          ...input,
        },
      );

    } catch (ex) {
      console.log(ex);
    }
  };
  return (
    <div className={style.sing_up_page}>
      <div className={style.signUp_right}>
        <div className={style.signUp_form_container}>
          <div className={style.signUp_msg_right}>
            <span className={style.signUp_title_right}>Begin your journey!</span>
          </div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              type="text"
              className={style.input}
              name="username"
              placeholder="Username"
              autoComplete="off"
              value={input.username}
              onChange={inputHandler}
            />
            <input
              type="email"
              className={style.input}
              name="email"
              placeholder="email"
              autoComplete="off"
              value={input.email}
              onChange={inputHandler}
            />

            <input
              type="password"
              className={style.input}
              name="password"
              placeholder="password"
              autoComplete="off"
              value={input.password}
              onChange={inputHandler}
            />
            {/* {loading === true ?
              <button type="submit" value="Submit" className={style.signUp}>
                <div className={style.lds}><div></div><div></div><div></div><div></div></div>
              </button> :
              } */}
            <button type="submit" className={style.signUp}>Sign Up</button>
            <div className="signup-btn-container">
              <span>Already have an account ?</span>
              <Link href="/login" className="a"> Log In</Link>
            </div>
          </form>
        </div>

      </div>

    </div>
  );
}

export default SingUp
