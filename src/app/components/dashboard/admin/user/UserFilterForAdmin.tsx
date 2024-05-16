"use client";
import React from "react";
// import { resetFilter } from "@/redux/features/filterJobPostSlice";
import { useAppDispatch } from "@/redux/hook";
import SearchCandidateNameFilter from "./filterUser/SearchCandidateNameFilter";
import { resetFilter } from "@/redux/features/user/filterSlice/userFilterSlice";
import FilterType from "./filterUser/FilterTypeArea";
import SearchDate from "./filterUser/createdAtFilter";


// prop type
// type IProps = {
//   priceValue: number[];
//   setPriceValue: React.Dispatch<React.SetStateAction<number[]>>;
//   maxPrice: number;
// };

const UserFilterForAdmin = () => {
  const dispatch = useAppDispatch();
  // handleReset
  const handleReset = () => {
    dispatch(resetFilter());
    // setPriceValue([0, maxPrice]);
  };
  return (
    <div
      className="modal popUpModal fade"
      id="adminUserFilter"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-fullscreen modal-dialog-centered">
        <div className="container">
          <div className="filter-area-tab modal-content">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
            <div className="position-relative">
              <div className="main-title fw-500 text-dark ps-4 pe-4 pt-15 pb-15 border-bottom">
                Filter By
              </div>
              <div className="pt-25 pb-30 ps-4 pe-4">
                <div className="row">
                <div className="col-lg-3 col-sm-6">
                    <SearchCandidateNameFilter />
                  </div>
                  <div className="col-lg-3 col-sm-6">
                    <FilterType />
                  </div>
                  <div className="col-lg-3 col-sm-6">
                    <SearchDate />
                  </div>
                  <div className="col-lg-3 col-sm-6">
                    {/* <JobAppFilterStatus /> */}
                  </div>
                  
                </div>

                {/* <div className="row">
                  <div className="col-lg-4 col-sm-6">
                    <FilterJobType />
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <FilterExperience />
                  </div>
                  <div className="col-lg-4">
                    <div className="filter-block d-xl-flex pb-25">
                      <div className="filter-title fw-500 text-dark mt-1">
                        Salary Range :
                      </div>
                      <div className="main-body ps-xl-4 flex-fill">
                        <SalaryRangeSlider
                          maxPrice={maxPrice}
                          priceValue={priceValue}
                          setPriceValue={setPriceValue}
                        />
                      </div>
                    </div>
                  </div>
                </div> */}

                <div className="row justify-content-center">
                <div className="col-xl-2 d-flex  justify-content-end">
                    <button
                      type="button"
                      // className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      className="btn-ten fw-500 text-white w-100 text-center tran3s mt-30 md-mt-10"
                    >
                      Apply
                    </button>
                  </div>
                  <div className="col-xl-2 d-flex justify-content-start">
                    <button
                      onClick={handleReset}
                      className="btn-ten fw-500 text-white w-100 text-center tran3s mt-30 md-mt-10"
                    >
                      Reset Filter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserFilterForAdmin;
