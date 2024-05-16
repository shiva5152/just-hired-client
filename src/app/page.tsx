"use client";
import FooterOne from "@/layouts/footers/footer-one";
import Header from "@/layouts/headers/header";
import Wrapper from "@/layouts/wrapper";
import FeatureOne from "./components/features/feature-one";
import FeedbackTwo from "./components/feedBacks/feedback-one";
import HeroBanner from "./components/hero-banners/hero-banner-four";
import HowItWorks from "./components/how-it-works/how-it-works";
export default function Home() {
  console.log("from the dashboard");

  return (
    <Wrapper>
      {/* header start */}
      <Header />

      {/* header end */}
      {/* hero banner start */}
      <HeroBanner />
      {/* hero banner end */}

      {/* category section start */}
      {/* <CategorySection /> */}
      {/* category section end */}

      {/* <a
        target="_blank"
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
      >
        share on Ln
      </a>
      <a
        target="_blank"
        href={`https://twitter.com/intent/tweet?text=${text}&url=${url}`}
      >
        share on twitter
      </a> */}

      {/* feature one start */}
      {/* <FeatureFour /> */}
      {/* feature one end */}
      {/* how works start */}
      <HowItWorks />
      {/* how works end */}
      {/* expert one section start */}
      {/* expert one section end */}
      {/* feedback one start */}

      <FeedbackTwo />
      {/* feedback one end */}
      {/* text feature two start */}
      <FeatureOne />
      <div
        style={{ paddingTop: "0", marginBottom: "100px" }}
        className="footer-one d-flex justify-content-center"
      >
        <div className="col-lg-4 mb-20 footer-newsletter">
          <h2 className={`footer-title text-black`}>Join Our Newsletter</h2>
          <p className={`text-black`}>Join & get important new regularly</p>
          <form action="#" className={`d-flex border-style`}>
            <input type="email" placeholder="Enter your email*" />
            <button>Send</button>
          </form>
          <p className="note">We only send interesting and relevant emails.</p>
        </div>
      </div>
      {/* text feature two end */}
      {/* <ExpertsOne /> */}
      {/* blog section one start */}
      {/* <BlogOne /> */}
      {/* blog section one end */}
      {/* fancy banner start */}
      {/* <FancyBanner /> */}
      {/* fancy banner end */}
      {/* job portal intro start */}
      {/* <JobPortalIntro /> */}
      {/* job portal intro end */}
      {/* footer start */}
      <FooterOne />
      {/* footer end */}
    </Wrapper>
  );
}
