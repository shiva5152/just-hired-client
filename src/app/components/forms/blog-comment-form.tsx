import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { addComment } from "@/redux/features/admin/api";
import { notifyError, notifyInfo } from "@/utils/toast";
import Loader from "@/ui/loader";

const BlogCommentForm = ({ blogId }: { blogId: string }) => {
  const dispatch = useAppDispatch();
  const { blog, loading } = useAppSelector((state) => state.blog);
  const { currAdmin } = useAppSelector((state) => state.admin);
  const [text, setText] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!currAdmin) {
      notifyInfo("Please login to comment");
      return;
    }
    if (!blog) {
      notifyError("blog not found");
    }
    const bodyObj = {
      userId: currAdmin._id,
      userAvatar: currAdmin.avatar,
      userName: currAdmin.name,
      text: text,
    };
    await addComment(dispatch, blogId, bodyObj);
    setText("");
  };
  return (
    <form onSubmit={handleSubmit} className="mt-30">
      <div className="input-wrapper mb-30">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Your Comment"
        ></textarea>
      </div>
      <button
        type="submit"
        className="btn-ten fw-500 text-white text-center pe-5 ps-5 tran3s"
      >
        {loading ? <Loader /> : "Post Comment"}
      </button>
    </form>
  );
};

export default BlogCommentForm;
