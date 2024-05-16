import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ICandidate, IEmployer } from '@/types/user-type'

interface User {
    user: string,
    userRole: string
}

export interface userState {
    currUser: string | null;
    loading: boolean,
    isAuthenticated: boolean,
    error: string | null,
    userRole: string,
    whoIsTryingToLoginWithLn: string,
    whoIsTryingToLoginWithGoogle: string,
}
const initialState: userState = {
    currUser: null,
    loading: false,
    isAuthenticated: false,
    error: null,
    userRole: "",
    whoIsTryingToLoginWithLn: "",
    whoIsTryingToLoginWithGoogle: "",
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUserStart: (state) => {
            state.loading = true;
        },
        getUserFail: (state, action: PayloadAction<string>) => {
            state.loading = false,
                state.error = action.payload
            state.isAuthenticated = false;
        },
        getUserSuccess: (state, action: PayloadAction<User>) => {
            state.loading = false,
                state.isAuthenticated = true;
            state.userRole = action.payload.userRole,
                state.currUser = action.payload.user
        },

        logoutUserSuccess: (state, action: PayloadAction<null>) => {
            state.loading = false;
            state.currUser = action.payload;
            state.isAuthenticated = false;
            state.userRole = ""
            state.error = null,
                state.whoIsTryingToLoginWithLn = ""
                state.whoIsTryingToLoginWithGoogle = ""
        },
        logoutUserFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload
        },
        setLoggerWithLn: (state, action: PayloadAction<string>) => {
            state.whoIsTryingToLoginWithLn = action.payload
            state.whoIsTryingToLoginWithGoogle = ""
        },
        setLoggerWithGoogle: (state,action:PayloadAction<string>) => {
            state.whoIsTryingToLoginWithGoogle = action.payload
            state.whoIsTryingToLoginWithLn = ""
        }
        // updateUserSuccess: (state, action: PayloadAction<myUser>) => {
        //     state.user = action.payload;
        //     state.loading = false;
        // },
        // updateEduSuccess: (state, action: PayloadAction<any>) => {
        //     if (state.user && 'education' in state.user) {
        //         state.user.education = [...state.user.education, action.payload]
        //     }

        //     state.loading = false;
        // },
        // updateExpSuccess: (state, action: PayloadAction<any>) => {
        //     if (state.user && 'experience' in state.user)
        //         state.user.experience = [...state.user.experience, action.payload]
        //     state.loading = false;
        // }
    },
})

export const { getUserFail, getUserStart, setLoggerWithLn, getUserSuccess, logoutUserFail, logoutUserSuccess, setLoggerWithGoogle } = userSlice.actions



export default userSlice.reducer
