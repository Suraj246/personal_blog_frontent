import { api } from "@/app/apiEndpoint"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import Cookies from "js-cookie"

const initialState = {
    status: "loading",
    error: null,
    user: []
}

export const userLoginApi = createAsyncThunk("user/userLoginApi", async (input) => {
    const { data } = await axios.post(`${api}/user/login`, { ...input })
    localStorage.setItem("blog_user", JSON.stringify(data));
    Cookies.set('user', JSON.stringify(data))
    return data
})

export const userLoginSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userLoginApi.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(userLoginApi.fulfilled, (state, action) => {
                state.status = 'success'
                state.user = action.payload
                state.error = ''
            })
            .addCase(userLoginApi.rejected, (state, action) => {
                state.status = 'failed'
                state.user = []
                state.error = action.error.message || 'something went wrong'
            })
    }
})
export default userLoginSlice.reducer
