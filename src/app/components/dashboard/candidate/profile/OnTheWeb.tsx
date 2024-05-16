import React from "react";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import EditProfile from "@/app/components/candidate-details/popup/EditProfile";
import EditSocial from "@/app/components/candidate-details/popup/Social";

const Social = () => {
  const { currCandidate, loading } = useAppSelector(
    (state) => state.candidate.candidateDashboard
  );
  const social = currCandidate?.socialSites;
  return (
    <>
      <div className="d-flex flex-wrap gap-3 justify-content-between     ">
        <div className="dash-input-wrapper mb-30 col-5">
          <label htmlFor="firstName">Linked In</label>
          <div className="d-flex align-items-center position-relative">
            <input
              type="text"
              placeholder="https://www.LinkedIn.com"
              value={social?.linkedIn}
              readOnly
            />
          </div>
        </div>
        <div className="dash-input-wrapper mb-30 col-5">
          <label htmlFor="lastName">Twitter</label>
          <div className="d-flex  align-items-center position-relative">
            <input
              type="text"
              placeholder="https://www.twitter.com"
              value={social?.twitter}
              readOnly
            />
          </div>
        </div>
        <div className="dash-input-wrapper mb-30 col-5">
          <label htmlFor="">Github</label>
          <div className="d-flex align-items-center position-relative">
            <input
              type="text"
              placeholder="https://www.github.com"
              value={social?.github}
              readOnly
            />
          </div>
        </div>
        <div className="dash-input-wrapper mb-30 col-5">
          <label htmlFor="">WebSite</label>
          <input
            type="text"
            placeholder="https://www.example.com"
            value={social?.website}
            readOnly
          />
        </div>
      </div>
      <EditSocial />
    </>
  );
};

export default Social;
