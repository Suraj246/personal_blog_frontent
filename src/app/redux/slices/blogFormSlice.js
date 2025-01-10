import { api } from "@/app/apiEndpoint"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    status: "loading",
    error: null,
    createdBlog: []
}

export const createBlogApi = createAsyncThunk("createdBlog/createBlogApi", async ({ formData }) => {
    const { data } = await axios.post(`${api}/user/blog/create-post`, formData)
    localStorage.setItem('blogId', data?.newPost?._id)
    setTimeout(() => {
        localStorage.removeItem('blogId')
    }, 10000)
    return data
})

export const updateSingleBlogsApi = createAsyncThunk("createdBlog/updateSingleBlogsApi", async ({ id, title, value }) => {
    const { data } = await axios.put(`${api}/user/blog/update/${id}`, { title, value })
    return data
})

export const blogFormSlice = createSlice({
    name: "createdBlog",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createBlogApi.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(createBlogApi.fulfilled, (state, action) => {
                state.status = 'success'
                state.createdBlog = action.payload
                state.error = ''
            })
            .addCase(createBlogApi.rejected, (state, action) => {
                state.status = 'failed'
                state.createdBlog = []
                state.error = action.error.message || 'something went wrong'
            })
    }
})
export default blogFormSlice.reducer
