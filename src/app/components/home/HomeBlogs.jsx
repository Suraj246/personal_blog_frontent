'use client'
import React, { useEffect, useState, useContext } from 'react'
import { useAppContext } from '@/app/context/Context'
import axios from 'axios'
import Pagination from './Pagination'
import style from './home.module.scss'
import Search from './Search';
import Loading from '@/app/Loading';
import Blogs from './Blogs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { api } from '@/app/apiEndpoint'

const HomeBlogs = () => {
    const [blogs, setBlogs] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(10)
    const [input, setInput] = useState('')

    const context = useAppContext()

    // const context = useContext(AppContext)
    const { theme } = context

    useEffect(() => {
        const fetchBlogs = async () => {
            await axios.get(`${api}`)
                .then((response) => setBlogs(response?.data))
                .catch((error) => { return error.message })
        }
        fetchBlogs()
    }, [])

    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = blogs[0]?.blogs.slice(indexOfFirstPost, indexOfLastPost)
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return (
        <div className={theme === 'light' ? `${style.blog_page}` : `${style.blog_page} ${style.light}`}>
            <div className={style.blog_page_container}>
                <Search input={input} setInput={setInput} />

                {blogs?.length === 0 ? <Loading /> :
                    currentPosts?.filter((elem) => {
                        if (input === elem) {
                            return elem;
                        } else if (elem.title.toLowerCase().includes(input)) {
                            return elem;
                        }
                        return false;
                    })
                        .map((item, id) => {
                            return (
                                <Blogs item={item} key={id} />
                            )
                        })}

                {/* <div className={style.pagination_container}>
                    <button
                        onClick={() => setCurrentPage((page) => page - 1)}
                        disabled={currentPage === 1}
                    >
                        <FontAwesomeIcon icon={icon({ name: 'chevron-left' })} />
                    </button>
                    <Pagination postsPerPage={postsPerPage} totalPosts={blogs[0]?.blogs.length} paginate={paginate} />
                    <button
                        onClick={() => setCurrentPage((page) => page + 1)}
                        disabled={currentPage === 1 ? 1 : null}
                    >
                        <FontAwesomeIcon icon={icon({ name: 'chevron-right' })} />
                    </button>
                </div> */}
            </div>
        </div>
    )
}

export default HomeBlogs
