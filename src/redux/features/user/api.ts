import instance from "@/lib/axios";
import { getUserFail, getUserStart, getUserSuccess, logoutUserFail, logoutUserSuccess } from "./slice"
import { AxiosError } from "axios";
import { AppDispatch } from "@/redux/store";


export const loginWithGoogle = async(dispatch:AppDispatch, bodyObj:any) => {
    const formData = new URLSearchParams(bodyObj).toString();
    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
    };
    dispatch(getUserStart());
    try {
        const { data } = await instance.post(
            "/candidate/auth/getCandidateGoogle",
            formData,
            { headers: headers }
        );
        dispatch(getUserSuccess({ user: data.user._id, userRole: data.user.role, avatar: data.user.avatar, name: data.user.firstName }));
        // console.log(data);
        return true;
    } catch (error) {
        const e = error as AxiosError;
        dispatch(getUserFail(e.message));
        // console.log(error);
        return false;
    }
}



export const loginWithLn = async (dispatch: AppDispatch, bodyObj: any) => {

    const formData = new URLSearchParams(bodyObj).toString();
    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
    };
    dispatch(getUserStart());
    try {
        const { data } = await instance.post(
            "/candidate/auth/getCandidate",
            formData,
            { headers: headers }
        );
        dispatch(getUserSuccess({ user: data.user._id, userRole: data.user.role, avatar: data.user.avatar, name: data.user.firstName }));
        // console.log(data);
        return true;
    } catch (error) {
        const e = error as AxiosError;
        dispatch(getUserFail(e.message));
        // console.log(error);
        return false
    }
}
export const adminLogin = async (dispatch: AppDispatch, bodyObj: any) => {

    dispatch(getUserStart());
    try {
        const { data } = await instance.post(
            "/admin/login",
            bodyObj,
            // { withCredentials: true }
        );
        dispatch(getUserSuccess({ user: data.user._id, userRole: data.user.role, avatar: data.user.avatar, name: data.user.name }));
        // console.log(data);
        return true;
    } catch (error) {
        const e = error as AxiosError;
        dispatch(getUserFail(e.message));
        // console.log(error);
        return false
    }
}
export const logoutAdmin = async (dispatch: AppDispatch) => {

    dispatch(getUserStart());
    try {
        const { data } = await instance.get(
            "/admin/logout",
            // { withCredentials: true }
        );
        dispatch(logoutUserSuccess(null));
        return true;
    } catch (error) {
        const e = error as AxiosError;
        dispatch(logoutUserFail(e.message));
        // console.log(error);
        return false
    }
}



