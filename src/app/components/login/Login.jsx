'use client'
import React, { useState } from 'react'
import style from './login.module.scss'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import { userLoginApi } from '@/app/redux/slices/userLoginSlice'

const Login = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const loginApi = useSelector(state => state.currentUser)
    const { error, status } = loginApi

    const [input, setInput] = useState({ email: "", password: "" });

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
        dispatch(userLoginApi(input))
            .then((res) => {
                if (res.payload.message === "login successful") {
                    router.push('/')
                }
                return
            })

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
                    {error && <span className='text-red-500'>incorrect login details</span>}
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
                        {status === "success" ?
                            <button type="submit" value="Submit" className={style.signUp}>
                                <div className={style.lds}><div></div><div></div><div></div><div></div></div>
                            </button>
                            :
                            <button type="submit" value="Submit" className={style.signUp}>LOGIN</button>
                        }
                    </form>
                    {/* <div className="signup-btn-container">
                        <span>Already have an account ?</span>
                        <Link href="/signup" className={style.signUp}> Register</Link>
                    </div> */}
                </div>

            </div>

        </div>
    )
}

export default Login
