"use client";
import { ICandidateSub } from "@/types/template";
import React, { useState } from "react";

const CandidateSub = ({
  subscriptionArr,
}: {
  subscriptionArr: ICandidateSub[];
}) => {
  const [isMonthly, setIsMonthly] = useState<boolean>(true);

  const handleToggle = () => {
    setIsMonthly((prev) => !prev);
  };

  return (
    <>
      <div style={{ width: "fit-content" }} className=" mt-3 mx-auto">
        <div className="subscription-tab align-content-center py-2  d-flex gap-3 px-2">
          <p
            onClick={handleToggle}
            className={`p-1 px-2 ${isMonthly && "active"}`}
          >
            monthly
          </p>
          <p
            onClick={handleToggle}
            className={`p-1 px-2 ${!isMonthly && "active"}`}
          >
            yearly
          </p>
        </div>
      </div>
      <section className="pricing-section">
        <div className="row justify-content-center">
          {subscriptionArr.length > 0
            ? subscriptionArr.map((item) => (
                <div className="col-lg-4 col-md-6">
                  <div className="pricing-card-one popular-two mt-25">
                    <div className="pack-name">{item.subscriptionType}</div>
                    {item.price.length && item.price.length > 1 ? (
                      <div className="price fw-500">
                        {isMonthly ? (
                          <>
                            <sub>{item.price[0].currency.symbol}</sub>{" "}
                            {item.price[0].amount}
                          </>
                        ) : (
                          <>
                            {" "}
                            <sub>{item.price[1].currency.symbol}</sub>
                            {item.price[1].amount}
                          </>
                        )}
                      </div>
                    ) : (
                      <div className="price fw-500">
                        <sub>{item.price[0].currency.symbol}</sub>{" "}
                        {item.price[0].amount}
                      </div>
                    )}
                    <ul className="style-none">
                      <li>
                        {item.offering.jobApplicationLimit !== -1
                          ? item.offering.jobApplicationLimit
                          : "unlimited"}{" "}
                        jobs can be Applied per month
                      </li>
                      <li>{item.offering.aiTokenLimit} Ai tokens</li>
                      <li>Full job search</li>
                      <li>Job Suggestions based on skills</li>
                      <li>blogs: Updates on News in Cybersecurity Trends</li>
                      <li>Job list newsletter </li>
                      <li>Applied job tracking</li>
                      {item.subscriptionType === "foundational" ? (
                        <>
                          <li>Limited Companies details</li>
                        </>
                      ) : (
                        <>
                          <li>Saved Jobs and Favorite Companies</li>
                          <li>Detailed Companies details</li>
                          <li>Feedback feature for each applied job</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              ))
            : null}
        </div>
      </section>
    </>
  );
};

export default CandidateSub;
