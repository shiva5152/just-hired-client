import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IBlogPost, IBlogComment } from '@/types/for-admin-type'

export interface InitialState {
    loading: boolean,
    error?: string | null,
    blogs: IBlogPost[],
    blog: IBlogPost | null,
}


const initialState: InitialState = {
    loading: false,
    error: null,
    blogs: [],
    blog: null,
}

export const blogSlice = createSlice({
    name: 'blogSlice',
    initialState,
    reducers: {
        blogRequestStart: (state) => {
            state.loading = true;
        },
        blogRequestFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        blogRequestSuccess: (state) => {
            state.loading = false;
        },
        getBlogsSuccess: (state, action: PayloadAction<IBlogPost[]>) => {
            state.loading = false;
            state.blogs = action.payload;
        },
        getBlogByIdSuccess: (state, action: PayloadAction<IBlogPost>) => {
            state.loading = false;
            state.blog = action.payload;
        },
        addCommentSuccess: (state, action: PayloadAction<IBlogComment>) => {
            state.loading = false;
            state.blog?.comments.push(action.payload);
        }
    },
})

export const {
    blogRequestFail,
    blogRequestStart,
    blogRequestSuccess,
    getBlogsSuccess,
    getBlogByIdSuccess,
    addCommentSuccess

} = blogSlice.actions

export default blogSlice.reducer;
