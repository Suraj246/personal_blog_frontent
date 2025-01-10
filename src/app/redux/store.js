
import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "./slices/postsSlice";
import singleBlogSlice from "./slices/singleBlogSlice";
import userLoginSlice from "./slices/userLoginSlice";
import blogFormSlice from "./slices/blogFormSlice";
import currentUserBlogSlice from "./slices/currentUserBlogsSlice";

const store = configureStore({
    reducer: {
        allBlogs: postsSlice,
        singleBlog: singleBlogSlice,
        currentUser: userLoginSlice,
        newCreateBlog: blogFormSlice,
        currentUserBlogs: currentUserBlogSlice
    }
})

export default store;