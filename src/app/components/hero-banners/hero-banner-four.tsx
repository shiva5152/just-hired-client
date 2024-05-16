"use client";
import useSearchFormSubmit from "@/hooks/use-search-form-submit";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import JobCategorySelect from "../select/job-category";
import JobLocationSelect from "../select/job-location";
import { ArrowRight } from "@phosphor-icons/react";
import AutocompleteCategory from "@/ui/autoCompleteCategory";
import SearchLocation from "../jobs/filter/bannerSearchLocation";
import JobCategory from "../jobs/filter/job-category";
import AutocompletePosition from "@/ui/autoCompletePosistion";

const HeroBannerFour = () => {
  const { handleSubmit, setLocationVal, setCategoryVal, setSearchText } =
    useSearchFormSubmit();
  // handleSearchInput
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  const [location, setLocation] = useState<string[]>([]);
  const [jobCategory, setJobCategory] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const router = useRouter();

  const handleClick = () => {
    // router.replace("/job-list-v1?jobCode=&location=Delhi&jobType=full-time");
    const bannerParams = { location, jobCategory, title };
    localStorage.setItem("bannerParams", JSON.stringify(bannerParams));
    localStorage.setItem("bannerParamsCount", JSON.stringify(2));

    router.push("/job-list-v1");
  };
  return (
    <>
      <div className="hero-banner-four position-relative pt-170 lg-pt-150 pb-300 lg-pb-150 md-pb-100">
        <div className="container">
          <div className="position-relative pb-70 sm-pb-20">
            <div className="row">
              <div className="col-xxl-7 col-lg-8 m-auto text-center">
                <h1 className="wow fadeInUp text-white" data-wow-delay="0.3s">
                  Find your job without any hassle.
                </h1>
                <p
                  className="text-md mt-25 text-white mb-45 md-mb-30 wow fadeInUp"
                  data-wow-delay="0.4s"
                >
                  Jobs & Job search. Find jobs in global. Executive jobs & work.
                </p>
              </div>
            </div>
            <div className="position-relative">
              <div className="row">
                <div
                  style={{ width: "80%" }}
                  className="col-xxl-8  col-xl-9 col-lg-10 m-auto"
                >
                  <div
                    className="job-search-one d-flex align-items-center justify-content-center style-two position-relative wow fadeInUp"
                    data-wow-delay="0.5s"
                  >
                    {/* <div className="col-md-3 sm-mb-10 sm-mt-10">
                      <div
                        onClick={handleClick}
                        style={{ cursor: "pointer" }}
                        className="text-uppercase  d-flex gap-4 btn-five border6 tran3s m-auto"
                      >
                        <span className="mt-1">Search</span>
                        <span>
                          <ArrowRight size={24} />
                        </span>
                      </div>
                    </div> */}
                    <form onSubmit={handleSubmit}>
                      <div className="row align-items-center">
                        <div className="col-md-3">
                          <div className="input-box input-border-none">
                            <div className="label">Job Categories</div>
                            <AutocompleteCategory
                              selected={jobCategory}
                              setSelected={setJobCategory}
                              endPoint="jobCategory"
                              isAddButton={false}
                              placeholder="Select Job Category"
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="input-box">
                            <div className="label">Location</div>
                            <SearchLocation
                              location={location}
                              setLocationFilter={setLocation}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="input-box border-left input-border-none">
                            <div className="label">Keywords or Title</div>
                            <AutocompletePosition
                              selected={title}
                              setSelected={setTitle}
                              endPoint="jobTitle"
                              showAdd={false}
                              placeholder="Enter Title"
                            />
                          </div>
                        </div>
                        <div
                          style={{ cursor: "pointer" }}
                          className="col-md-3 sm-mb-10 sm-mt-10"
                        >
                          <div
                            onClick={handleClick}
                            className="text-uppercase  mx-3 btn-five border6 tran3s m-auto"
                          >
                            Search
                          </div>
                        </div>
                      </div>
                    </form>
                    {/* <div className="upload-btn position-relative d-flex align-items-center justify-content-between">
                      <span className="fw-500 text-dark me-1">
                        Upload your CV
                      </span>{" "}
                      <i className="bi bi-file-earmark-arrow-up"></i>
                      <input
                        type="file"
                        id="uploadCV"
                        name="uploadCV"
                        accept=".doc,.docx,.pdf,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      />
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <Image src={screen_1} alt="screen" className="lazy-img shapes shape_01" />
        <Image src={screen_2} alt="screen" className="lazy-img shapes shape_02" />
        <Image src={screen_3} alt="screen" className="lazy-img shapes shape_03" />
        <Image src={screen_4} alt="screen" className="lazy-img shapes shape_04" /> */}
      </div>
    </>
  );
};

export default HeroBannerFour;
