"use client";
import { addJobPost } from "@/redux/features/jobPost/api";
import { RootState } from "@/redux/store";
import AutocompletePosition from "@/ui/autoCompletePosistion";
import AutocompleteSkill from "@/ui/autoCompleteSkill";
import NiceSelect from "@/ui/nice-select";
import { MagicWand } from "@phosphor-icons/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import DashboardHeader from "../candidate/dashboard-header";
import { useAppDispatch } from "@/redux/hook";
import Loader from "@/ui/loader";
import LocationAutoComplete from "@/ui/locationAutoComplete";
import MultipleChoiceQuestion from "@/ui/question";
import TinyMCEEditor from "@/ui/textEditor";
import { askToGpt } from "@/redux/features/jobPost/api";

type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const SubmitJobArea = ({ setIsOpenSidebar }: IProps) => {
  const dispatch = useAppDispatch();
  const { loading, gptLoading } = useSelector(
    (state: RootState) => state.jobPost
  );

  const [title, setTitle] = useState("");
  const [jobCategory, setJobCategory] = useState("");
  const [jobType, setJobType] = useState<string[]>([]);
  const [workMode, setWorkMode] = useState("");
  const [experience, setExperience] = useState<string[]>([]);
  const [language, setLanguage] = useState("");

  const [location, setLocation] = useState<string[]>([]);
  const [salary, setSalary] = useState({
    minimum: "",
    maximum: "",
    isDisclosed: true,
  });

  const [primarySkills, setPrimarySkills] = useState<string[]>([]);
  const [secondarySkills, setSecondarySkills] = useState<string[]>([]);
  const [benefits, setBenefits] = useState<string[]>([]);
  const [benefitsInput, setBenefitsInput] = useState("");
  const [isAddingBenefits, setAddingBenefits] = useState(false);
  const [descriptionWithAI, setDescriptionWithAI] = useState<string>("");
  const [questionWithAI, setQuestionWithAI] = useState<any>("");
  const [description, setDescription] = useState("");
  console.log(questionWithAI);

  const handleSalary = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSalary({
      ...salary,
      [name]: value,
    });
  };
  const addToBenefits = () => {
    setBenefits((prev) => [...prev, benefitsInput]);
    setAddingBenefits(false);
    setBenefitsInput("");
  };
  const handleJobType = (item: { value: string; label: string }) => {
    setJobType((prev) => [...prev, item.value]);
    console.log(item.value);
    // setJobType("");
  };
  const handleWorkMode = (item: { value: string; label: string }) => {
    setWorkMode(item.value);
    console.log(item.value);
    // setJobType("");
  };
  const handleExperience = (item: { value: string; label: string }) => {
    setExperience((prev) => [...prev, item.value]);
    // console.log(selected, item.value);
  };
  const handleLanguage = (item: { value: string; label: string }) => {
    setLanguage(item.value);
  };

  const bodyObj = {
    title: title,
    location: location,
    jobType: jobType,
    jobCategory: jobCategory,
    primarySkills,
    secondarySkills,
    salary: salary,
    preferredExperience: experience,
    workMode: workMode,
    testQuestions: questionWithAI ? questionWithAI : "",
    description,
    benefits: benefits,
  };

  const handleSubmit = async () => {
    console.log(bodyObj);
    // return;
    await addJobPost(dispatch, bodyObj);
    // setTitle("");
    // setJobCategory("");
    // setJobType([]);
    // setLocation([]);
    // setExperience([]);
    // setSalary({
    //   minimum: "",
    //   maximum: "",
    //   isDisclosed: true,
    // });
    // setPrimarySkills([]);
    // setSecondarySkills([]);
    // setDescriptionWithAI("");
    // setQuestionWithAI("");
  };

  const draftDescription = async () => {
    const query = `give me job description for job post ${
      bodyObj.title
    }  in job category of ${bodyObj.jobCategory} with ${bodyObj.jobType.join(
      ", "
    )} job type,primary skills  are  ${bodyObj.primarySkills.join(
      ", "
    )}and secondary skills are ${bodyObj.secondarySkills.join(
      ", "
    )}, with work mode ${
      bodyObj.workMode
    } and experience of ${bodyObj.preferredExperience.join(
      ", "
    )} at location of ${bodyObj.location.join(
      ", "
    )}, make it an intreating paragraph of 50 to 75 words with necessary bullet points`;

    try {
      const data = await askToGpt(dispatch, query);
      setDescriptionWithAI(data.choices[0].message.content);
    } catch (error) {
      console.log(error);
    }
  };
  const draftQuestion = async () => {
    const query = `generate 4 easy to medium  question with answer in multiple choice of exact four option on the topic ${bodyObj.primarySkills.join(
      ","
    )}. do not give any extra information or text just question and corresponding answer`;

    try {
      const data = await askToGpt(dispatch, query);
      setQuestionWithAI(data.choices[0].message.content);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard-body job-details">
      <div className="position-relative">
        {/* header start */}
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        {/* header end */}

        <h2 className="main-title">Post a New Job</h2>
        <div className="bg-white card-box border-20">
          <h4 className="dash-title-three">Job Details</h4>
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="">Job Title*</label>
            {/* <input type="text" placeholder="Ex: Product Designer" /> */}
            <AutocompletePosition
              selected={title}
              setSelected={setTitle}
              endPoint="jobTitle"
            />
          </div>

          <div className="row align-items-end">
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Job Category</label>
                <AutocompletePosition
                  selected={jobCategory}
                  setSelected={setJobCategory}
                  endPoint="jobCategory"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Job Type</label>
                <NiceSelect
                  options={[
                    { value: "Full time", label: "Full time" },
                    { value: "Part time", label: "Part time" },
                    { value: "Hourly-Contract", label: "Hourly-Contract" },
                    { value: "Fixed-Price", label: "Fixed-Price" },
                  ]}
                  defaultCurrent={0}
                  onChange={(item) => handleJobType(item)}
                  name="Job Type"
                />
                <div className="skill-input-data d-flex align-items-center flex-wrap">
                  {jobType.map((value) => (
                    <button key={value}>{value}</button>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Work Mode</label>
                <NiceSelect
                  options={[
                    { value: "Hybrid", label: "Hybrid" },
                    { value: "Remote", label: "Remote" },
                    { value: "On-Site", label: "On-Site" },
                    { value: "Flexible", label: "Flexible" },
                  ]}
                  defaultCurrent={0}
                  onChange={(item) => handleWorkMode(item)}
                  name="work mode"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Preferred Language</label>
                <NiceSelect
                  options={[
                    { value: "English", label: "English" },
                    { value: "Spanish", label: "Spanish" },
                    { value: "French", label: "French" },
                    { value: "Others", label: "Others" },
                  ]}
                  defaultCurrent={0}
                  onChange={(item) => handleLanguage(item)}
                  name="Job Type"
                />
              </div>
            </div>

            <div className="col-md-3">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="salary">Salary*</label>
                <input
                  type="text"
                  name="minimum"
                  value={salary.minimum}
                  onChange={handleSalary}
                  placeholder="Min (LPA)"
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="dash-input-wrapper mb-30">
                <input
                  type="text"
                  name="maximum"
                  value={salary.maximum}
                  onChange={handleSalary}
                  placeholder="Max (LPA)"
                />
              </div>
            </div>
          </div>

          <h4 className="dash-title-three pt-50 lg-pt-30">
            Skills & Experience
          </h4>
          {/* primary skills */}
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="">Primary Skills*</label>
            <AutocompleteSkill
              skills={primarySkills}
              setSkills={setPrimarySkills}
            />
            {/* <input type="text" placeholder="Add Skills" /> */}
            <div className="skill-input-data d-flex align-items-center flex-wrap">
              {primarySkills.map((value) => (
                <button key={value}>{value}</button>
              ))}
            </div>
          </div>
          {/* secondary skills */}
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="">Secondary Skills*</label>
            <AutocompleteSkill
              skills={secondarySkills}
              setSkills={setSecondarySkills}
            />
            {/* <input type="text" placeholder="Add Skills" /> */}
            <div className="skill-input-data d-flex align-items-center flex-wrap">
              {secondarySkills.map((value) => (
                <button key={value}>{value}</button>
              ))}
            </div>
          </div>

          {/* employ experience start */}
          <div className="row align-items-end">
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Experience*</label>
                <NiceSelect
                  options={[
                    { value: "Intermediate", label: "Intermediate" },
                    { value: "No-Experience", label: "No-Experience" },
                    { value: "Expert", label: "Expert" },
                  ]}
                  defaultCurrent={0}
                  onChange={(item) => handleExperience(item)}
                  name="Experience"
                />
                <div className="skill-input-data d-flex align-items-center flex-wrap">
                  {experience.map((value) => (
                    <button key={value}>{value}</button>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Location*</label>
                <LocationAutoComplete
                  setSelected={setLocation}
                  type="cities"
                  label="location"
                  isMultiple={true}
                />
                <div
                  style={{ marginTop: "10px" }}
                  className="skill-input-data d-flex align-items-center flex-wrap "
                >
                  {location.map((value) => (
                    <button key={value}>{value}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* <div className="bg-white card-box border-20 mt-40">
            
          </div> */}
          <h4 className="dash-title-three">Benefits && Offerings</h4>
          {[...benefits].map((val, index) => (
            <div key={val} className="dash-input-wrapper mb-20">
              <label htmlFor="">Benefit {index + 1}</label>
              <input type="text" readOnly value={val} />
            </div>
          ))}
          {isAddingBenefits && (
            <div className="dash-input-wrapper mb-20">
              <label htmlFor="benefitsInput">
                Benefit {benefits.length + 1}
              </label>
              <input
                type="text"
                name="benefitsInput"
                onChange={(e) => setBenefitsInput(e.target.value)}
                onBlur={addToBenefits}
                value={benefitsInput}
                placeholder="Gym"
              />
            </div>
          )}
          <button
            onClick={() => setAddingBenefits(true)}
            className="dash-btn-one"
          >
            <i className="bi bi-plus"></i>{" "}
            {benefits.length == 0 ? "Add Benefit" : "Add More Benefit"}
          </button>
          {/* <EmployExperience
            selected={expLocation}
            setSelected={setExpLocation}
          /> */}
          {/* from for adding benefits of company */}

          {/* employ experience end */}

          <h4 className="dash-title-three pt-50 lg-pt-30">Add Description</h4>
          <div className="dash-input-wrapper mb-30 ">
            <label htmlFor="">Job Description*</label>
            <button
              // disabled={gptLoading}
              type={"button"}
              onClick={draftDescription}
              className="dash-btn-ai mb-3  tran3s me-3 d-flex align-content-center gap-2  justify-content-center   "
            >
              <span>{true ? "Write a description With Ai" : <Loader />}</span>
              <span className="">
                <MagicWand size={32} color="#244034" weight="light" />
              </span>
            </button>
            {/* {descriptionWithAI ? (
              <TinyMCEEditor
                text={descriptionWithAI.choices[0].message.content}
              />
            ) : (
              <TinyMCEEditor text={""} />
            )} */}
            <TinyMCEEditor
              text={descriptionWithAI ? descriptionWithAI : ""}
              setText={setDescription}
            />
          </div>
          <h4 className="dash-title-three pt-50 lg-pt-30">
            Add Test for Candidate{" "}
          </h4>
          <div className="dash-input-wrapper mb-30 ">
            {/* <label htmlFor="">*</label> */}
            <button
              // disabled={gptLoading}
              type={"button"}
              onClick={draftQuestion}
              className="dash-btn-ai mb-3  tran3s me-3 d-flex align-content-center gap-2  justify-content-center "
            >
              <span>{true ? "Generate Test" : <Loader />}</span>
              <span className="">
                <MagicWand size={32} color="#244034" weight="light" />
              </span>
            </button>
            {questionWithAI && (
              <MultipleChoiceQuestion
                text={questionWithAI.choices[0].message.content}
              />
            )}
          </div>
        </div>

        <div className="button-group d-inline-flex align-items-center mt-30">
          <button
            disabled={loading}
            type={"submit"}
            onClick={handleSubmit}
            className="dash-btn-two tran3s me-3"
          >
            {loading ? <Loader /> : "Save"}
          </button>
          <a href="#" className="dash-cancel-btn tran3s">
            Cancel
          </a>
        </div>
      </div>
    </div>
  );
};

export default SubmitJobArea;
