import React from "react";
import Link from "next/link";
import Image from "next/image";
// import { IBlogDataType } from "@/types/blog-type";
import { IBlogPost } from "@/types/for-admin-type";
import { getDate } from "@/utils/helper";
const BlogItem = ({
  blog,
  style_2 = false,
}: {
  blog: IBlogPost;
  style_2?: boolean;
}) => {
  const { _id, category, title, createdAt } = blog || {};
  const featured = false;
  const data = new Date(createdAt);
  const strDate = data.toDateString();
  return (
    <article
      className={`blog-meta-two ${style_2 ? "mb-60" : "mb-75"} lg-mb-40`}
    >
      <figure className="post-img m0">
        {/* <Link href={`/blog-details/${_id}`} className="w-100 d-block">
          <Image
            src={style_2 ? grid_img! : img}
            alt="blog-img"
            className="lazy-img w-100 tran4s"
          />
        </Link> */}
        <Link href={`/blog-details/${_id}`} className="tags color-two fw-500">
          {category?.[0] || "Uncategorized"}
        </Link>
      </figure>
      <div className="post-data mt-35 lg-mt-20">
        <div className="date">
          {featured && <span className="fw-500 text-dark">Featured -</span>}
          <Link href={`/blog-details/${_id}`}>{getDate(strDate)}</Link>
        </div>
        <Link href={`/blog-details/${_id}`}>
          <h4 className="tran3s blog-title">
            {style_2 ? `${title.slice(0, 20)}..` : title}
          </h4>
        </Link>
        <Link
          href={`/blog-details/${_id}`}
          className="continue-btn tran3s d-flex align-items-center"
        >
          <span className="fw-500 me-2">Continue Reading</span>
          <i className="bi bi-arrow-right"></i>
        </Link>
      </div>
    </article>
  );
};

export default BlogItem;
