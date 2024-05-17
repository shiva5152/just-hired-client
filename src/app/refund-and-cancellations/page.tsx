import React from "react";
import { Metadata } from "next";
import Header from "@/layouts/headers/header";
import Wrapper from "@/layouts/wrapper";
import FooterOne from "@/layouts/footers/footer-one";
import RefundAndCancellation from "../components/privacy-policy/refund-and-cancellations";

export const metadata: Metadata = {
  title: "Refund And Cancellations",
};

const PrivacyPolicyPage = () => {
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <Header />
        {/* header end */}

        <RefundAndCancellation />

        {/* footer start */}
        <FooterOne />
        {/* footer end */}
      </div>
    </Wrapper>
  );
};

export default PrivacyPolicyPage;
