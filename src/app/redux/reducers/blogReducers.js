import { ALL_BLOG_FAILED, ALL_BLOG_REQUEST, ALL_BLOG_SUCCESS, BLOG_DETAILS_REQUEST, BLOG_DETAILS_FAILED, BLOG_DETAILS_SUCCESS, CREATE_BLOG_REQUEST, CREATE_BLOG_SUCCESS, CREATE_BLOG_FAILED, CURRENT_USER_BLOGS_REQUEST, CURRENT_USER_BLOGS_SUCCESS, CURRENT_USER_BLOGS_FAILED, UPDATE_USER_BLOG_DATA, UPDATE_USER_BLOG_REQUEST, UPDATE_USER_BLOG_SUCCESS, UPDATE_USER_BLOG_FAILED } from "../constants/blogConstants"

export const allBlogReducer = (state = {}, action) => {
    switch (action.type) {
        case ALL_BLOG_REQUEST:
            return { loading: true }
        case ALL_BLOG_SUCCESS:
            return { loading: false, allPosts: action.payload }
        case ALL_BLOG_FAILED:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}
export const BlogDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case BLOG_DETAILS_REQUEST:
            return { loading: true }
        case BLOG_DETAILS_SUCCESS:
            return { loading: false, blogDetails: action.payload }
        case BLOG_DETAILS_FAILED:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const createBlogReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_BLOG_REQUEST:
            return { loading: true }
        case CREATE_BLOG_SUCCESS:
            return { loading: false, createdBlog: action.payload }
        case CREATE_BLOG_FAILED:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const currentUserBlogsReducer = (state = {}, action) => {
    switch (action.type) {
        case CURRENT_USER_BLOGS_REQUEST:
            return { loading: true }
        case CURRENT_USER_BLOGS_SUCCESS:
            return { loading: false, userBlogs: action.payload }
        case CURRENT_USER_BLOGS_FAILED:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const updateBlogsDataReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_USER_BLOG_DATA:
            return { userBlogData: action.payload }
        default:
            return state
    }
}

export const updateUserBlogsReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_USER_BLOG_REQUEST:
            return { loading: true }
        case UPDATE_USER_BLOG_SUCCESS:
            return { loading: false, updatedBlog: action.payload }
        case UPDATE_USER_BLOG_FAILED:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}
