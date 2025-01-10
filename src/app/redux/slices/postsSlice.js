import { api } from "@/app/apiEndpoint"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    status: "loading",
    error: null,
    allPosts: []
}

export const allBlogApi = createAsyncThunk("allPosts/allBlogApi", async () => {
    const { data } = await axios.get(`${api}`)
    return data
})

export const postsSlice = createSlice({
    name: "allPosts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(allBlogApi.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(allBlogApi.fulfilled, (state, action) => {
                state.status = 'success'
                state.allPosts = action.payload
                state.error = ''
            })
            .addCase(allBlogApi.rejected, (state, action) => {
                state.status = 'failed'
                state.allPosts = []
                state.error = action.error.message || 'something went wrong'
            })
    }
})
export default postsSlice.reducer
