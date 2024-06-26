import Link from "next/link";
import React from "react";

export function WidgetOne({
  cls,
  style_2,
}: {
  cls: string;
  style_2?: boolean;
}) {
  return (
    <div className={`${cls} mb-20`}>
      <h5 className={`footer-title ${style_2 ? "text-white" : ""}`}>
        Services​
      </h5>
      <ul className="footer-nav-link style-none">
        <li>
          <Link href="/job-list-v1">Browse Jobs</Link>
        </li>
        <li>
          <Link href="/company-v2">Companies</Link>
        </li>
        <li>
          <Link href="/candidates-v1">Candidates</Link>
        </li>
        <li>
          <Link href="/pricing">Pricing</Link>
        </li>
      </ul>
    </div>
  );
}

export function WidgetTwo({
  cls,
  style_2,
}: {
  cls: string;
  style_2?: boolean;
}) {
  return (
    <div className={`${cls} mb-20`}>
      <h5 className={`footer-title ${style_2 ? "text-white" : ""}`}>Company</h5>
      <ul className="footer-nav-link style-none">
        <li>
          <Link href="/about-us">About us</Link>
        </li>
        {/* <li><Link href="/blog-v2">Blogs</Link></li> */}
        <li>
          <Link href="/faq">FAQ’s</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </div>
  );
}

export function WidgetThree({
  cls,
  style_2,
}: {
  cls: string;
  style_2?: boolean;
}) {
  return (
    <div className={`${cls} mb-20`}>
      <h5 className={`footer-title ${style_2 ? "text-white" : ""}`}>Support</h5>
      <ul className="footer-nav-link style-none">
        {/* <li>
          <Link href="/privacy-policy">Terms of use</Link>
        </li> */}
        <li>
          <Link href="/terms-and-conditions">Terms & conditions</Link>
        </li>
        <li>
          <Link href="/privacy-policy">Privacy Policy</Link>
        </li>
        <li>
          <Link href="/refund-and-cancellations">
            Refund And Cancellations Policy
          </Link>
        </li>
      </ul>
    </div>
  );
}
