"use client";
import logo from "@/assets/images/logo/media_37.png";
import { getCompanyDetails } from "@/redux/features/company/api";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import Image from "next/image";
import { useEffect } from "react";
import Funding from "./Funding";
import CompanyReviews from "./company-reviews";

const CompanyDetailsArea = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();
  const { company } = useAppSelector((state) => state.company.companyList);

  useEffect(() => {
    getCompanyDetails(dispatch, id);
  }, [id]);

  let date = new Date();
  if (company) {
    date = new Date(company?.foundedDate);
  }
  const foundedDate = date.toLocaleDateString();

  return (
    <>
      {company && (
        <section className="company-details candidates-profile-details pt-110 lg-pt-80 pb-160 xl-pb-150 lg-pb-80">
          <div className="container">
            <div className="row">
              <div className="col-xxl-3 col-xl-4 order-xl-last">
                <div className="job-company-info ms-xl-5 ms-xxl-0 lg-mb-50">
                  <Image
                    src={logo}
                    alt="logo"
                    className="lazy-img m-auto logo"
                  />
                  <div className="text-md text-dark text-center mt-15 mb-20 lg-mb-10">
                    {company.name}
                  </div>
                  <div className="text-center">
                    <a
                      href="#"
                      className="website-btn-two tran3s"
                      target="_blank"
                    >
                      Visit our website
                    </a>
                  </div>

                  <div className="border-top mt-35 lg-mt-20 pt-25">
                    <ul className="job-meta-data row style-none">
                      <li className="col-12">
                        <span>Location: </span>
                        <div>
                          {company.location[0].city},{" "}
                          {company.location[0].country}
                        </div>
                      </li>
                      <li className="col-12">
                        <span>Size:</span>
                        <div>{company.teamSize}, Worldwide</div>
                      </li>
                      <li className="col-12">
                        <span>Founder Name </span>
                        <div>{company.founderName}</div>
                      </li>
                      <li className="col-12">
                        <span>Founded: </span>
                        <div>{foundedDate}</div>
                      </li>

                      <li className="col-12">
                        <span>Category: </span>
                        <div>{company.category}</div>
                      </li>
                      <li className="col-12">
                        <span>Benefits:</span>
                        {company.benefits.map((val) => (
                          <div key={val}>{val}</div>
                        ))}
                      </li>
                      <li className="col-12">
                        <span>Social: </span>
                        <div>
                          <a href="#" className="me-3">
                            <i className="bi bi-facebook"></i>
                          </a>
                          <a href="#" className="me-3">
                            <i className="bi bi-instagram"></i>
                          </a>
                          <a href="#" className="me-3">
                            <i className="bi bi-twitter"></i>
                          </a>
                          <a href="#">
                            <i className="bi bi-linkedin"></i>
                          </a>
                        </div>
                      </li>
                    </ul>

                    <a
                      href="#"
                      className="btn-ten fw-500 text-white w-100 text-center tran3s mt-25"
                    >
                      Send Message
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-xxl-9 col-xl-8 order-xl-first">
                <div className="card-box details-post-data me-xxl-5 pe-xxl-4">
                  <h3>Overview</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Mauris vitae ultricies leo integer malesuada nunc
                    vel risus commodo. Vulputate odio ut enim blandit. Nibh
                    ipsum consequat nisl vel pretium lectus quam.
                  </p>
                  <p>
                    {" "}
                    Nulla at volutpat diam ut. Lobortis feugiat vivamus at augue
                    eget arcu. Urna condimentum mattis pellentesque id nibh
                    tortor id aliquet. Dignissim cras tincidunt lobortis
                    feugiat. Est sit amet facilisis magna etiam tempor. Eu augue
                    ut lectus arcu bibendum at varius vel pharetra. Vel
                    facilisis volutpat est velit egestas dui id. Ut pharetra sit
                    amet aliquam. Elit at imperdiet dui accumsan sit amet nulla
                    facilisi morbi. Tellus in metus vulputate eu scelerisque
                    felis imperdiet proin. Magna fringilla urna porttitor
                    rhoncus. Et odio pellentesque diam volutpat. Congue eu
                    consequat ac felis donec et odio pellentesque diam. Accumsan
                    in nisl nisi scelerisque eu ultrices vitae auctor eu.{" "}
                  </p>
                  <p>
                    Felis eget velit aliquet sagittis id. Massa placerat duis
                    ultricies lacus sed turpis tincidunt id. Vel eros donec ac
                    odio tempor orci dapibus ultrices. Ipsum consequat nisl vel
                    pretium lectus quam. Dignissim sodales ut eu sem.{" "}
                  </p>
                  {/* <h3>Intro</h3> */}
                  {/* <div className="video-post d-flex align-items-center justify-content-center mb-50">
                  <a
                    className="fancybox rounded-circle video-icon tran3s text-center"
                    onClick={() => setIsVideoOpen(true)}
                    style={{ cursor: "pointer" }}
                  >
                    <i className="bi bi-play-fill"></i>
                  </a>
                </div> */}
                  <h3>Funding && Finnance</h3>
                  <div>
                    <div className="inner-card border-style mb-25 lg-mb-20">
                      <Funding funding={company.funding} />
                    </div>
                  </div>

                  <h3>Benefits</h3>
                  <div>
                    <ul className="list-type-two style-none mb-15">
                      {company?.benefits?.map((val, index) => {
                        return <li key={index}>{val}</li>;
                      })}
                    </ul>
                  </div>

                  {/* <div className="position-relative">
                    <h3>Company Reviews</h3>
                    <CompanyReviews />                  
                  </div> */}

                  <div className="share-option mt-60">
                    <ul className="style-none d-flex align-items-center">
                      <li className="fw-500 me-2">Share: </li>
                      <li>
                        <a href="#">
                          <i className="bi bi-facebook"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="bi bi-instagram"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="bi bi-twitter"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {/* video modal start */}
      {/* <VideoPopup
        isVideoOpen={isVideoOpen}
        setIsVideoOpen={setIsVideoOpen}
        videoId={"-6ZbrfSRWKc"}
      /> */}
      {/* video modal end */}
    </>
  );
};

export default CompanyDetailsArea;
