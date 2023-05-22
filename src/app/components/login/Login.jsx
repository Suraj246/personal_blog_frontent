'use client'
import React, { useState } from 'react'
import style from './login.module.scss'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { api } from '@/app/apiEndpoint'

const Login = () => {
    const router = useRouter()
    const [input, setInput] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false)

    const inputHandler = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setInput({ ...input, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = input

        if (!email || !password) {
            alert("Please enter a valid email or password")
            return
        }
        try {
            const { data } = await axios.post(`${api}/login`, {
                ...input,
            },
            );
            if (data) {
                setLoading(true)
                localStorage.setItem("blog userData", JSON.stringify(data));
                router.push("/")
            }
            else {
                return false;
            }
            // setLoading(false)
        } catch (ex) {
            if (ex?.response?.status === 404) {
                alert("user does not exit")
            }
            // console.log(ex);
        }
    };
    return (
        <div className={style.sing_up_page}>
            <div className={style.signUp_right}>
                <div className={style.signUp_form_container}>
                    <div className={style.signUp_msg_right}>
                        <span className={style.signUp_title_right}>
                            Authorized User Login
                        </span>
                    </div>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <input
                            type="email"
                            className={style.input}
                            name="email"
                            placeholder="Email"
                            autoComplete="off"
                            value={input.email}
                            onChange={inputHandler}
                        />
                        <input
                            type="password"
                            className={style.input}
                            name="password"
                            placeholder="Password"
                            autoComplete="off"
                            value={input.password}
                            onChange={inputHandler}
                        />
                        {loading === true ?
                            <button type="submit" value="Submit" className={style.signUp}>
                                <div className={style.lds}><div></div><div></div><div></div><div></div></div>
                            </button>
                            :
                            <button type="submit" value="Submit" className={style.signUp}>LOGIN</button>
                        }
                    </form>
                </div>

            </div>

        </div>
    )
}

export default Login
