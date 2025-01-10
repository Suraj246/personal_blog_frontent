import { api } from "@/app/apiEndpoint"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    status: "loading",
    error: null,
    blogDetails: [],
    commentsData: {}
}

export const singleBlogDetails = createAsyncThunk("blogDetails/singleBlogDetails", async (id) => {
    const { data } = await axios.get(`${api}/${id}`)
    return data
})

export const addCommentApi = createAsyncThunk("commentsData/addCommentApi", async (title) => {
    const { data } = await axios.post(`${api}/create-comment`, { title })
    localStorage.setItem('newCommentId', data?.newPost?._id)
    return data
})
export const addCommentToCurrentBlogApi = createAsyncThunk("blogDetails/ addCommentToCurrentBlogApi", async ({ blogId, commentId }) => {
    const { data } = await axios.post(`${api}/store-comment-to-each-blog`, { blogId, commentId })
    return data
})

export const singleBlogSlice = createSlice({
    name: "blogDetails",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(singleBlogDetails.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(singleBlogDetails.fulfilled, (state, action) => {
                state.status = 'success'
                state.blogDetails = action.payload
                state.error = ''
            })
            .addCase(singleBlogDetails.rejected, (state, action) => {
                state.status = 'failed'
                state.blogDetails = []
                state.error = action.error.message || 'something went wrong'
            })

            .addCase(addCommentApi.fulfilled, (state, action) => {
                state.status = 'success'
                state.commentsData = action.payload
                state.error = ''
            })
    }
})
export default singleBlogSlice.reducer
