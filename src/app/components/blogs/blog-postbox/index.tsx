"use client";
import React, { useEffect } from "react";
import BlogSidebar from "./sidebar";
import blog_data from "@/data/blog-data";
import BlogItem from "./blog-item";
import BlogPagination from "./blog-pagination";
import { getAllBlog } from "@/redux/features/admin/api";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

const BlogPostboxArea = () => {
  const dispatch = useAppDispatch();
  const { blogs } = useAppSelector((state) => state.blog);
  // const blog_items = blog_data
  //   .filter((b) => b.blog === "blog-postbox")
  //   .slice(0, 4);
  useEffect(() => {
    getAllBlog(dispatch, {});
  }, []);
  return (
    <section className="blog-section pt-100 lg-pt-80 pb-120 lg-pb-80">
      <div className="container">
        <div className="row">
          <div className="col-xxl-11 m-auto">
            <div className="row">
              <div className="col-lg-8">
                {blogs.map((b) => (
                  <BlogItem key={b._id} blog={b} />
                ))}

                {/* <BlogPagination /> */}
              </div>

              <div className="col-lg-4">
                {/* sidebar start */}
                <BlogSidebar keywords={[]} />
                {/* sidebar  end */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPostboxArea;
