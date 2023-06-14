import { ADD_COMMENT_FAILED, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, STORE_COMMENT_TO_CURRENT_BLOG_FAILED, STORE_COMMENT_TO_CURRENT_BLOG_REQUEST, STORE_COMMENT_TO_CURRENT_BLOG_SUCCESS } from "../constants/commentConstants";

export const addCommentReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_COMMENT_REQUEST:
            return { loading: true }
        case ADD_COMMENT_SUCCESS:
            return { loading: false, comment: action.payload }
        case ADD_COMMENT_FAILED:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}
export const addCommentToCurrentBlogReducer = (state = {}, action) => {
    switch (action.type) {
        case STORE_COMMENT_TO_CURRENT_BLOG_REQUEST:
            return { loading: true }
        case STORE_COMMENT_TO_CURRENT_BLOG_SUCCESS:
            return { loading: false, comment: action.payload }
        case STORE_COMMENT_TO_CURRENT_BLOG_FAILED:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}