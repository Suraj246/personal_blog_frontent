import axios from "axios"
import { ADD_COMMENT_FAILED, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, STORE_COMMENT_TO_CURRENT_BLOG_FAILED, STORE_COMMENT_TO_CURRENT_BLOG_REQUEST, STORE_COMMENT_TO_CURRENT_BLOG_SUCCESS, STORE_COMMENT_TO_EACH_BLOG_FAILED, STORE_COMMENT_TO_EACH_BLOG_REQUEST, STORE_COMMENT_TO_EACH_BLOG_SUCCESS } from "../constants/commentConstants"
import { api } from "@/app/apiEndpoint"
console.log(`${api}/user/login`)

export const addCommentApi = (title) => async (dispatch) => {
    dispatch({ type: ADD_COMMENT_REQUEST, payload: title })
    try {
        const { data } = await axios.post(`${api}/create-comment`, { title })
        dispatch({ type: ADD_COMMENT_SUCCESS, payload: data })
        // console.log(data)
        // localStorage.setItem("commentId", data?.newPost?._id)
        // setTimeout(() => {
        //     localStorage.removeItem('commentId')
        // }, 2000)

    } catch (error) {
        dispatch({
            type: ADD_COMMENT_FAILED, payload:
                error?.response && error?.response?.data?.message ?
                    error.response.data.message : error.message
        })
    }

}

export const addCommentToCurrentApi = (id, commentId) => async (dispatch) => {
    dispatch({ type: STORE_COMMENT_TO_CURRENT_BLOG_REQUEST, payload: id, commentId })
    try {
        const { data } = await axios.post(`${api}/store-comment-to-each-blog`, { blogId: id, commentId: commentId })
        dispatch({ type: STORE_COMMENT_TO_CURRENT_BLOG_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: STORE_COMMENT_TO_CURRENT_BLOG_FAILED, payload:
                error?.response && error?.response?.data?.message ?
                    error.response.data.message : error.message
        })
    }

}