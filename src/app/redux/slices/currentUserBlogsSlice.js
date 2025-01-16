import { api } from "@/app/apiEndpoint"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    status: "loading",
    error: null,
    userBlogs: [],
    updateBlogDetails: {}
}

export const currentUserBlogsApi = createAsyncThunk("userBlogs/currentUserBlogsApi", async (userId) => {
    const { data } = await axios.post(`${api}/user/get-data`, { userId: userId })
    return data
})

export const deleteBlogsApi = createAsyncThunk("userBlogs/deleteBlogsApi", async ({ userId, idx }) => {
    const { data } = await axios.delete(`${api}/user/blog/${userId}/${idx}`)
    console.log(data)
    return data
})

export const currentUserBlogSlice = createSlice({
    name: "userBlogs",
    initialState,
    reducers: {
        updateBlogDetails: (state, action) => {
            state.updateBlogDetails = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(currentUserBlogsApi.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(currentUserBlogsApi.fulfilled, (state, action) => {
                state.status = 'success'
                state.userBlogs = action.payload
                state.error = ''
            })
            .addCase(currentUserBlogsApi.rejected, (state, action) => {
                state.status = 'failed'
                state.userBlogs = []
                state.error = action.error.message || 'something went wrong'
            })
    }
})
export const { updateBlogDetails } = currentUserBlogSlice.actions
export default currentUserBlogSlice.reducer
