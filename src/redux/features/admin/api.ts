import instance from "@/lib/axios";
import { requestStart, requestFail, getCandidateSuccess, getEmployerSuccess, getCurrAdminSuccess, getCompanySuccess } from "./slice";
import { blogRequestFail, blogRequestStart, blogRequestSuccess, getBlogsSuccess, getBlogByIdSuccess, addCommentSuccess } from "./blogSlice";
import { AxiosError } from "axios";
import { AppDispatch } from "@/redux/store";

export const getCurrAdmin = async (dispatch: AppDispatch, id: string) => {

    dispatch(requestStart());
    try {

        const { data } = await instance.get(`/admin/getCurrUser?id=${id}`);
        dispatch(getCurrAdminSuccess(data.user));

    } catch (error) {
        const e = error as AxiosError;
        dispatch(requestFail(e.message));
    }
}

export const getAllCandidate = async (dispatch: AppDispatch, bodyObj: any) => {

    dispatch(requestStart());
    try {

        const { data } = await instance.get("/admin/candidate", { params: bodyObj });
        dispatch(getCandidateSuccess({ candidatesFA: data.result, totalCandidate: data.totalCandidate, totalNumOfPageFC: data.totalNumOfPage }));

    } catch (error) {
        const e = error as AxiosError;
        dispatch(requestFail(e.message));
    }
}

export const getAllEmployer = async (dispatch: AppDispatch, bodyObj: any) => {

    dispatch(requestStart());
    try {

        const { data } = await instance.get("/admin/employer", { params: bodyObj });
        dispatch(getEmployerSuccess({ employerFA: data.result, totalEmployer: data.totalEmployer, totalNumOfPageFE: data.totalNumOfPage }))

    } catch (error) {
        const e = error as AxiosError;
        dispatch(requestFail(e.message));
    }
}

export const getAllCompany = async (dispatch: AppDispatch, bodyObj: any) => {

    dispatch(requestStart());
    try {

        const { data } = await instance.get("/admin/company", { params: bodyObj });
        dispatch(getCompanySuccess({ companyFA: data.result, totalCompany: data.totalCompany, totalNumOfPageFCom: data.totalNumOfPage }));

    } catch (error) {
        const e = error as AxiosError;
        dispatch(requestFail(e.message));
    }
}

// blog

export const createBlog = async (dispatch: AppDispatch, bodyObj: any) => {

    dispatch(blogRequestStart());
    try {

        const { data } = await instance.post("/blog", bodyObj);
        dispatch(blogRequestSuccess());

    } catch (error) {
        const e = error as AxiosError;
        dispatch(blogRequestFail(e.message));
    }
}

export const getAllBlog = async (dispatch: AppDispatch, bodyObj: any) => {

    dispatch(blogRequestStart());
    try {

        const { data } = await instance.get("/blog", { params: bodyObj });
        dispatch(getBlogsSuccess(data.blogs));

    } catch (error) {
        const e = error as AxiosError;
        dispatch(blogRequestFail(e.message));
    }
}

export const getBlogById = async (dispatch: AppDispatch, id: string) => {

    dispatch(blogRequestStart());
    try {

        const { data } = await instance.get(`/blog/${id}`);
        dispatch(getBlogByIdSuccess(data.blog));

    } catch (error) {
        const e = error as AxiosError;
        dispatch(blogRequestFail(e.message));
    }
}

export const addComment = async (dispatch: AppDispatch, commentId: string, bodyObj: any) => {

    dispatch(blogRequestStart());
    try {

        const { data } = await instance.put(`/blog/comment?id=${commentId}`, bodyObj);
        dispatch(addCommentSuccess(data.comment));

    } catch (error) {
        const e = error as AxiosError;
        dispatch(blogRequestFail(e.message));
    }
}





