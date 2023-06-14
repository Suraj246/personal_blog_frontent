import axios from "axios"
import { USER_LOGIN_FAILED, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS } from "../constants/userConstants"
import { api } from "@/app/apiEndpoint"
import Cookies from "js-cookie"

export const userLoginApi = (input) => async (dispatch) => {
    dispatch({ type: USER_LOGIN_REQUEST, payload: input })
    try {
        const { data } = await axios.post(`${api}/user/login`, { ...input })
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
        localStorage.setItem("blog_user", JSON.stringify(data));
        Cookies.set('user', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAILED, payload:
                error?.response && error?.response?.data?.message ?
                    error.response.data.message : error.message
        })
    }
}