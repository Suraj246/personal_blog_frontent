import axios from "axios"
import { ALL_BLOG_FAILED, ALL_BLOG_REQUEST, ALL_BLOG_SUCCESS, BLOG_DETAILS_FAILED, BLOG_DETAILS_REQUEST, BLOG_DETAILS_SUCCESS, CREATE_BLOG_FAILED, CREATE_BLOG_REQUEST, CREATE_BLOG_SUCCESS, CURRENT_USER_BLOGS_FAILED, CURRENT_USER_BLOGS_REQUEST, CURRENT_USER_BLOGS_SUCCESS, DELETE_USER_BLOG_FAILED, DELETE_USER_BLOG_REQUEST, DELETE_USER_BLOG_SUCCESS, UPDATE_USER_BLOG_DATA, UPDATE_USER_BLOG_FAILED, UPDATE_USER_BLOG_REQUEST, UPDATE_USER_BLOG_SUCCESS } from "../constants/blogConstants"
import { api } from "@/app/apiEndpoint"

export const allBlogApi = () => async (dispatch) => {
    dispatch({ type: ALL_BLOG_REQUEST })
    try {
        const { data } = await axios.get(`${api}`)
        dispatch({ type: ALL_BLOG_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: ALL_BLOG_FAILED, payload:
                error?.response && error?.response?.data?.message ?
                    error.response.data.message : error.message
        })
    }
}
export const singleBlogDetails = (id) => async (dispatch) => {
    dispatch({ type: BLOG_DETAILS_REQUEST, payload: id })
    try {
        const { data } = await axios.get(`${api}/${id}`)
        dispatch({ type: BLOG_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: BLOG_DETAILS_FAILED, payload:
                error?.response && error?.response?.data?.message ?
                    error.response.data.message : error.message
        })
    }
}

export const createBlogApi = (formData) => async (dispatch) => {
    console.log(formData)
    dispatch({ type: CREATE_BLOG_REQUEST, payload: formData })
    try {
        const { data } = await axios.post(`${api}/user/blog/create-post`, formData)
        dispatch({ type: CREATE_BLOG_SUCCESS, payload: data })
        localStorage.setItem('blogId', data?.newPost?._id)
        setTimeout(() => {
            localStorage.removeItem('blogId')
        }, 10000)
    } catch (error) {
        dispatch({
            type: CREATE_BLOG_FAILED, payload:
                error?.response && error?.response?.data?.message ?
                    error.response.data.message : error.message
        })
    }
}

export const currentUserBlogsApi = (userId) => async (dispatch) => {
    dispatch({ type: CURRENT_USER_BLOGS_REQUEST, payload: userId })
    try {
        const { data } = await axios.post(`${api}/user/get-data`, { userId: userId })
        dispatch({ type: CURRENT_USER_BLOGS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: CURRENT_USER_BLOGS_FAILED, payload:
                error?.response && error?.response?.data?.message ?
                    error.response.data.message : error.message
        })
    }
}

export const deleteBlogsApi = (userId, idx) => async (dispatch) => {
    dispatch({ type: DELETE_USER_BLOG_REQUEST, payload: userId, idx })
    try {
        const { data } = await axios.delete(`${api}/user/blog/${userId}/${idx}`)
        dispatch({ type: DELETE_USER_BLOG_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: DELETE_USER_BLOG_FAILED, payload:
                error?.response && error?.response?.data?.message ?
                    error.response.data.message : error.message
        })
    }
}

export const updateUserBlogsApi = (item) => async (dispatch) => {
    dispatch({ type: UPDATE_USER_BLOG_DATA, payload: item })
}


export const updateSingleBlogsApi = (id, title, value) => async (dispatch) => {
    dispatch({ type: UPDATE_USER_BLOG_REQUEST, payload: id, title, value })
    try {
        const { data } = await axios.put(`${api}/user/blog/update/${id}`, { title, value })
        dispatch({ type: UPDATE_USER_BLOG_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: UPDATE_USER_BLOG_FAILED, payload:
                error?.response && error?.response?.data?.message ?
                    error.response.data.message : error.message
        })
    }
}