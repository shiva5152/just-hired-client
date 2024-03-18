"use client";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import ShowEducation from "../../../candidate-details/DashEducation";
import SelectYear from "../select-year";
import { addEducation } from "@/redux/features/candidate/api";
import { notifyError, notifyInfo } from "@/utils/toast";
import SelectMonth from "../select-month";
import EditEducation from "@/app/components/candidate-details/popup/EditEducation";

const Education = () => {
  const { currCandidate, loading, currDashEducation } = useAppSelector(
    (store) => store.candidate.candidateDashboard
  );
  const dispatch = useAppDispatch();
  const user = currCandidate;
  const [education, setEducation] = useState({
    degree: "",
    institute: "",
    description: "",
  });

  const [startYear, setStartYear] = useState("");
  const [startMonth, setStartMonth] = useState("");
  const [endYear, setEndYear] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [allFieldsCheck,setAllFieldsCheck] = useState(false);
  const handleEducationChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEducation({
      ...education,
      [name]: value,
    });
    if(!education.degree || !education.description || !education.institute || !startYear || startYear ==="Start Year" || !startMonth || startMonth ==="Start Month" || !endYear || endYear ==="End Year" || !endMonth || endMonth ==="End Month"){
      
      return;
    }
    setAllFieldsCheck(true);
    console.log(allFieldsCheck,"Validator");
  };
  const handleAddEducation = async () => {
    if(!education.degree || !education.description || !education.institute || !startYear || startYear ==="Start Year" || !startMonth || startMonth ==="Start Month" || !endYear || endYear ==="End Year" || !endMonth || endMonth ==="End Month"){
      notifyInfo("Please complete fields marked with *");
      return;
    }

    if (!user) {
      notifyError("! unauthenticated user");
      return;
    }
    const bodyObj = {
      ...education,
      startYear: startMonth + " " + startYear,
      endYear: endMonth + " " + endYear,
    };
    console.log(bodyObj);
    await addEducation(dispatch, user._id, bodyObj);
    setEducation({
      degree: "",
      institute: "",
      description: "",
    });
    setStartYear("");
    setEndYear("");
    setAllFieldsCheck(false);
  };

  return (
    <>
      <div className="bg-white card-box border-20 mt-40">
        <div>
          {user?.education.length !== 0 && (
            <div className="inner-card border-style mb-25 lg-mb-20">
              <h3 className="title">Education</h3>
              <ShowEducation education={user?.education} />
            </div>
          )}
          <div className="accordion dash-accordion-one" id="accordionOne">
            <div className="accordion-item">
              <div className="accordion-header" id="headingOne">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="false"
                  aria-controls="collapseOne"
                >
                  Add Education
                  <span className="fw-bold fs-5 mt-1  ">
                    <i className="bi bi-plus"></i>
                  </span>
                </button>
              </div>
              <div
                id="collapseOne"
                className="accordion-collapse collapse"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionOne"
              >
                <div className="accordion-body">
                  <div className="row">
                    <div className="col-lg-2">
                      <div className="dash-input-wrapper mb-30 md-mb-10">
                        <label htmlFor="degree">Degree*</label>
                      </div>
                    </div>
                    <div className="col-lg-10">
                      <div className="dash-input-wrapper mb-30">
                        <input
                          name="degree"
                          value={education.degree}
                          onChange={handleEducationChange}
                          type="text"
                          placeholder="Bachelor's"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-2">
                      <div className="dash-input-wrapper mb-30 md-mb-10">
                        <label htmlFor="institute">Institute*</label>
                      </div>
                    </div>
                    <div className="col-lg-10">
                      <div className="dash-input-wrapper mb-30">
                        <input
                          name="institute"
                          value={education.institute}
                          onChange={handleEducationChange}
                          type="text"
                          placeholder="Oxford"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-2">
                      <div className="dash-input-wrapper mb-30 md-mb-10">
                        <label htmlFor="">Duration*</label>
                      </div>
                    </div>
                    <div className="col-lg-10">
                      <div className="row">
                        <div className="col-sm-3">
                          <SelectMonth
                            setMonth={setStartMonth}
                            firstInput="Start Month"
                          />
                        </div>
                        <div className="col-sm-3">
                          <SelectYear
                            setYear={setStartYear}
                            firstInput="Start Year"
                          />
                        </div>

                        <div className="col-sm-3">
                          <SelectMonth
                            setMonth={setEndMonth}
                            firstInput="End Month"
                          />
                        </div>
                        <div className="col-sm-3">
                          <SelectYear
                            setYear={setEndYear}
                            firstInput="End Year"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-2">
                      <div className="dash-input-wrapper mb-15 md-mb-7">
                        <label htmlFor="description">Description*</label>
                      </div>
                    </div>
                    <div className="col-lg-10">
                      <div className="dash-input-wrapper mb-30">
                        <textarea
                          value={education.description}
                          name="description"
                          onChange={handleEducationChange}
                          className="size-lg"
                          placeholder="Morbi ornare ipsum sed sem condimentum, et pulvinar tortor luctus. Suspendisse condimentum lorem ut elementum aliquam et pulvinar tortor luctus."
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  {allFieldsCheck === true ? 
                  <button
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="false"
                    aria-controls="collapseOne"
                    onClick={handleAddEducation}
                    className="dash-btn-two tran3s me-3 mb-15"
                  >
                    Save
                  </button>
                  :
                  <button
                    type="button"
                    // data-bs-toggle="collapse"
                    // data-bs-target="#collapseOne"
                    // aria-expanded="false"
                    // aria-controls="collapseOne"
                    onClick={handleAddEducation}
                    className="dash-btn-two tran3s me-3 mb-15"
                  >
                    Save
                  </button>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {<EditEducation />}
    </>
  );
};

export default Education;
