import React from "react";
import { Metadata } from "next";
import Header from "@/layouts/headers/header";
import Wrapper from "@/layouts/wrapper";
import FooterOne from "@/layouts/footers/footer-one";
import TermsAndConditionsArea from "../components/privacy-policy/terms-and-conditions";

export const metadata: Metadata = {
  title: "Terms ans Conditions",
};

const PrivacyPolicyPage = () => {
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <Header />
        {/* header end */}

        <TermsAndConditionsArea />

        {/* footer start */}
        <FooterOne />
        {/* footer end */}
      </div>
    </Wrapper>
  );
};

export default PrivacyPolicyPage;
