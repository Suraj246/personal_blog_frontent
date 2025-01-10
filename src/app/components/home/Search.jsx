'use client'
import React from 'react'
import style from "./home.module.scss"

const Search = ({ input, setInput }) => {
    return (
        <input type="text"
            className={style.search}
            placeholder='Search Post'
            value={input}
            onChange={(e) => setInput(e.target.value)}
        />
    )
}

export default Search
