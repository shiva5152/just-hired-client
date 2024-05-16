"use client";
import React, { useState } from "react";
import "react-phone-number-input/style.css";
import DashboardHeader from "../candidate/dashboard-header";
import TextEditor from "./blog/editor";
import AutocompleteCategory from "@/ui/autoCompleteBlogCategory";
import { createBlog } from "@/redux/features/admin/api";
import Loader from "@/ui/loader";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import AdminBlogArea from "./blog/AdminBlogArea";
import AdminBlogList from "./blog/AdminBlogList";
// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};
const BlogArea = ({ setIsOpenSidebar }: IProps) => {
  const [isCandidate, setIsCandidate] = useState(true);
  const handleToggle = () => {
    setIsCandidate((prev) => !prev);
  };
  return (
    <div className="dashboard-body">
      <div className="position-relative candidates-profile-details">
        {/* header start */}

        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        {/* header end */}

        {/* <h2>Create Blog</h2>
        <div>
          <TextEditor />
        </div> */}
        <div className="d-flex align-items-center justify-content-between mb-40 lg-mb-30">
          <div className="subscription-tab align-content-center py-2  d-flex gap-3 px-2">
            <p
              onClick={handleToggle}
              className={`p-1 px-2 ${isCandidate && "active"}`}
            >
              Create
            </p>
            <p
              onClick={handleToggle}
              className={`p-1 px-2 ${!isCandidate && "active"}`}
            >
              Blogs
            </p>
          </div>
        </div>

        <div className="wrapper">
          {isCandidate ? <AdminBlogArea /> : <AdminBlogList />}
        </div>


      </div>
    </div>
  );
};

export default BlogArea;
