import React from "react";
import Link from "next/link";
import Image from "next/image";
import man_1 from "@/assets/images/assets/people-4.jpg";
import girl from "@/assets/images/assets/people-5.jpg";
import man_2 from "@/assets/images/assets/people-6.jpg";
import screen_1 from "@/assets/images/assets/screen_01.png";
import screen_2 from "@/assets/images/assets/screen_02.png";
import screen_3 from "@/assets/images/assets/screen_03.png";
// import shape from "@/assets/images/shape/shape_06.svg";
import main_img from "@/assets/images/assets/ils_01.svg";
import shape from "@/assets/images/assets/ils_01_02.svg";
import tree_img from "@/assets/images/assets/ils_01_01.svg";

// FeatureImgData
export function FeatureImgData() {
  return (
    <div className="img-data position-relative pe-xl-5 me-xl-5 md-mt-50">
      <div className="row">
        <div className="col-md-6 col-sm-8 col-10">
          <Image
            src={man_1}
            width={321}
            height={197}
            alt="man img"
            className="lazy-img img01"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 col-5">
          <Image
            src={girl}
            width={195}
            height={175}
            alt="girl img"
            className="lazy-img img02 mt-35"
          />
        </div>
        <div className="col-md-6 col-7">
          <Image
            src={man_2}
            width={296}
            height={323}
            alt="man-img-2"
            className="lazy-img img01 mt-35"
          />
        </div>
      </div>
      {/* <Image
        src={screen_1}
        alt="screen_1-img"
        className="lazy-img shapes screen01 wow fadeInRight"
      />
      <Image
        src={screen_2}
        alt="screen_2-img"
        className="lazy-img shapes screen02 wow fadeInUp"
      />
      <Image
        src={screen_3}
        alt="screen_3-img"
        className="lazy-img shapes screen03 wow fadeInUp"
      /> */}
      <Image src={shape} alt="shape" className="lazy-img shapes shape_01" />
    </div>
  );
}

const FeatureOne = () => {
  return (
    <section className="text-feature-one position-relative pt-180 xl-pt-150 lg-pt-100 md-pt-80 pb-180 xl-pb-150">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 order-lg-last">
            <div className="ps-xxl-4 wow fadeInRight">
              <div className="title-one">
                <h3>Unrivaled recruiting technology</h3>
              </div>
              <p className="mt-20 md-mt-20 mb-40 md-mb-20">
                Find relevant jobs within seconds using our proprietary
                IntelliSearch.
              </p>
              {/* <ul className="list-style-one style-none">
                <li>Seamless searching</li>
                <li>Get top 3% experts for your project</li>
                <li>Protected payments system</li>
              </ul> */}
              <div className="title-one">
                <h3>A true match</h3>
              </div>
              <p className="mt-20 md-mt-20 mb-40 md-mb-20">
                Our recruiters will find you exciting job opportunities with the
                compensation, benefits, career growth and company culture you
                always wanted.
              </p>
              <div className="title-one">
                <h2>Faster. Smarter. Better.</h2>
              </div>
              <div className=" btn-group display-flex gap-4 ">
                <Link href="/register" className="btn-one  lg mt-50 md-mt-30">
                  Find me a job
                </Link>
                <Link href="/register" className="btn-one lg mt-50 md-mt-30">
                  Find me a candidate
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-7 col-md-11 m-auto order-lg-first">
            {/* <FeatureImgData /> */}
            <div className="img-box">
              <Image
                src={"/discover.png"}
                width={600}
                height={387}
                alt="main-img"
                className="lazy-img main-img"
              />
              {/* <Image
                src={shape}
                alt="shape"
                className="lazy-img shapes screen_01"
              /> */}
              {/* <Image
                src={tree_img}
                alt="tree_img"
                className="lazy-img shapes screen_02 wow fadeInLeft"
              /> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureOne;
