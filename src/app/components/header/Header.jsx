'use client'
import React, { useState, useRef } from 'react'
import style from "./header.module.scss"
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Cookies from "js-cookie"

const Header = () => {


    const router = useRouter()
    const [dropdown, setDropdown] = useState(false)

    const menuRef = useRef()
    const imgRef = useRef()

    if (typeof window !== "undefined") {
        window.addEventListener("click", (e) => {
            if (e.target !== menuRef.current && e.target !== imgRef.current) {
                setDropdown(false)
            }
        })
    }

    const userData = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : []
    return (
        <header className={style.header}>
            <ul>
                <li>
                    <Link href='/' className="text-4xl font-bold uppercase">
                        my Blog
                    </Link>
                </li>

                <div className={style.user_container}>
                    {!userData?.username ?
                        <span className={style.login}>
                            <Link href='/login'>LogIn</Link>
                        </span>
                        :
                        <>
                            <div className={style.profile_container}>
                                <button className="text-1xl font-semibold capitalize pt-1 pb-1 pr-6 pl-6 border" ref={imgRef} onClick={() => setDropdown(!dropdown)}>{userData?.username}</button>
                            </div>
                            {dropdown &&
                                <div className={style.dropdown_container}>
                                    <Link href='/create-post' className={style.a}>Create Blog</Link>
                                    <Link href='/yourblogs' className={style.a}>Your Blogs</Link>
                                    <span className={style.logout}
                                        onClick={() => {
                                            localStorage.clear();
                                            router.push('/')
                                            Cookies.remove('user')
                                        }}
                                    >logout</span>
                                </div>
                            }
                        </>
                    }

                </div>
            </ul>
        </header>
    )
}

export default Header
