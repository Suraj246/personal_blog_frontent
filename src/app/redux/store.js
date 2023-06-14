
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { BlogDetailsReducer, allBlogReducer, createBlogReducer, currentUserBlogsReducer, updateBlogsDataReducer, updateUserBlogsReducer } from './reducers/blogReducers'
import { addCommentReducer, addCommentToCurrentBlogReducer } from './reducers/commentReducers'
import { userLoginReducer } from './reducers/userReducers'

const initialState = {
}

const reducer = combineReducers({
    allBlogs: allBlogReducer,
    singleBlog: BlogDetailsReducer,
    comments: addCommentReducer,
    currentComment: addCommentToCurrentBlogReducer,
    newCreateBlog: createBlogReducer,
    currentUser: userLoginReducer,
    currentUserBlogs: currentUserBlogsReducer,
    updateBlogData: updateBlogsDataReducer,
    updatedBlog: updateUserBlogsReducer,


})

const store = configureStore({ reducer, initialState })

export default store