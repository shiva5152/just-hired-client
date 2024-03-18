"use client";
import { useAppSelector } from "@/redux/hook";
import { IEducation } from "@/types/user-type";
import { notifyError } from "@/utils/toast";
import { useEffect, useState } from "react";
import SelectMonth from "../../dashboard/candidate/select-month";
import SelectYear from "../../dashboard/candidate/select-year";

const EditEducationBody = ({
  educationProp,
}: {
  educationProp: IEducation;
}) => {
  const { currCandidate } = useAppSelector(
    (store) => store.candidate.candidateDashboard
  );

  // useEffect(() => {
  //   // console.log(updatedEducationProp);
  // }, [educationProp]);

  // console.log(educationProp._id);

  const [education, setEducation] = useState({
    degree: "",
    institute: "",
    description: "",
  });
  // let start: string[] = [];
  // let end: string[] = [];
  const start = educationProp?.startYear.split(" ");
  const end = educationProp?.endYear.split(" ");
  const [startYear, setStartYear] = useState("");
  const [startMonth, setStartMonth] = useState("");
  const [endYear, setEndYear] = useState("");
  const [endMonth, setEndMonth] = useState("");

  useEffect(() => {
    setEducation({
      degree: educationProp.degree || "",
      institute: educationProp.institute || "",
      description: educationProp.description || "",
    });

    const start = educationProp.startYear?.split(" ");
    const end = educationProp.endYear?.split(" ");

    setStartYear(start[1] || "");
    setStartMonth(start[0] || "");
    setEndYear(end[1] || "");
    setEndMonth(end[0] || "");
    // console.log(startMonth, startYear, endYear, endMonth);
  }, [educationProp, startMonth, startYear, endYear, endMonth]);
  const handleEducationChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEducation({
      ...education,
      [name]: value,
    });
  };

  const handleAddEducation = async () => {
    if (!currCandidate) {
      notifyError("! unauthenticated user");
      return;
    }
    const bodyObj = {
      ...education,
      startYear: startMonth + " " + startYear,
      endYear: endMonth + " " + endYear,
    };
    console.log("bodyObj", bodyObj);
    //  await addEducation(dispatch, user._id, bodyObj);
    setEducation({
      degree: "",
      institute: "",
      description: "",
    });
    setStartYear("");
    setEndYear("");
  };
  console.log(startMonth, startYear, endYear, endMonth);

  return (
    <div className="accordion-body">
      <p>{educationProp._id}</p>
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
            <label htmlFor="">Start Date*</label>
          </div>
        </div>
        <div className="col-lg-10">
          <div className="row">
            <div className="col-sm-6">
              <SelectMonth
                default={{
                  value: start[0],
                  label: start[0],
                }}
                setMonth={setStartMonth}
                firstInput="Start Month"
              />
            </div>
            <div className="col-sm-6">
              <SelectYear
                default={{ value: startYear, label: startYear }}
                setYear={setStartYear}
                firstInput="Start Year"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-2">
          <div className="dash-input-wrapper mb-30 md-mb-10">
            <label htmlFor="">End Date*</label>
          </div>
        </div>
        <div className="col-lg-10">
          <div className="row">
            <div className="col-sm-6">
              <SelectMonth
                default={{ value: endMonth, label: endMonth }}
                setMonth={setEndMonth}
                firstInput="End Month"
              />
            </div>
            <div className="col-sm-6">
              <SelectYear
                default={{ value: endYear, label: endYear }}
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
      <button
        onClick={handleAddEducation}
        className="dash-btn-two tran3s me-3 mb-15"
      >
        Save
      </button>
    </div>
  );
};

export default EditEducationBody;
