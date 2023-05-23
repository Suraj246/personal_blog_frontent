'use client'
import React, { useState, useRef, useContext } from 'react'
import { useAppContext } from '@/app/context/Context'
import style from "./header.module.scss"
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

const Header = () => {
    // const context = useContext(Store)
    const context = useAppContext()

    const { theme, setTheme } = context

    const router = useRouter()
    const [dropdown, setDropdown] = useState(false)
    const [refresh, setRefresh] = useState(false)

    const menuRef = useRef()
    const imgRef = useRef()

    if (typeof window !== "undefined") {
        window.addEventListener("click", (e) => {
            if (e.target !== menuRef.current && e.target !== imgRef.current) {
                setDropdown(false)
            }
        })
    }

    if (typeof window !== "undefined") {
        if (localStorage.getItem("blog userData")) {
            var userData = JSON.parse(localStorage.getItem("blog userData"))
        }
    }


    return (
        <header className={theme === 'light' ? `${style.header}` : `${style.light} ${style.header}`}>
            <Link href='/' className={style.h1}>
                <h1 className={style.h1}>my Blog</h1>
            </Link>

            <div className={style.user_container}>
                <span>Suraj Surwase</span>
                <Image
                    src="/profile.jpg"
                    alt="user image"
                    width={50}
                    height={50}
                    ref={imgRef}
                    onClick={() => setDropdown(!dropdown)}
                    style={{ borderRadius: '30px', objectFit: "cover" }}
                />
                {!userData?.username ?
                    <>
                        {dropdown &&
                            <div className={style.dropdown_container}>
                                <Link href='/login' className={style.a}>LogIn</Link>
                            </div>
                        }
                    </>
                    :
                    <>
                        {dropdown &&
                            <div className={style.dropdown_container}>
                                <Link href='/create-post' className={style.a}>Create Blog</Link>
                                <Link href='/yourblogs' className={style.a}>Your Blogs</Link>
                                <span className={style.logout}
                                    onClick={() => {
                                        localStorage.clear();
                                        router.push('/')
                                        setRefresh(true)
                                    }}
                                >logout</span>
                            </div>
                        }
                    </>
                }
                <div className={style.theme_color}>
                    {theme === 'light' ?
                        <button onClick={() => {
                            setTheme("dark")
                            // localStorage.setItem("theme", JSON.stringify(theme))
                        }

                        }

                        >
                            <FontAwesomeIcon icon={icon({ name: 'circle-half-stroke' })} />
                        </button>
                        :
                        <button onClick={() => setTheme("light")}>
                            <FontAwesomeIcon icon={icon({ name: 'circle-half-stroke' })} />
                        </button>

                    }
                </div>
            </div>
        </header>
    )
}

export default Header
