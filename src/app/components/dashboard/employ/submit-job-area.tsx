"use client";
import { addJobPost } from "@/redux/features/jobPost/api";
import { RootState } from "@/redux/store";
import AutocompletePosition from "@/ui/autoCompletePosistion";
import AutocompleteSkill from "@/ui/autoCompleteSkill";
import NiceSelect from "@/ui/nice-select";
import { MagicWand } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DashboardHeader from "../candidate/dashboard-header";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import Loader from "@/ui/loader";
import LocationAutoComplete from "@/ui/locationAutoComplete";
import MultipleChoiceQuestion from "@/ui/question";
import TinyMCEEditor from "@/ui/textEditor";
import { askToGpt } from "@/redux/features/jobPost/api";
import AutocompleteCompany from "@/ui/autoCompeteCompanyName";
import AutocompleteBenefits from "@/ui/autoCompletebenefits";
import { getAllLanguages } from "@/redux/features/languageProvider/api";
import { getAllCurrencies } from "@/redux/features/currencyProvider/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Currency } from "@/redux/features/currencyProvider/slice";
import AutocompleteCurrency from "@/ui/autoCompleteCurrency";

type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const SubmitJobArea = ({ setIsOpenSidebar }: IProps) => {
  const dispatch = useAppDispatch();
  const { loading, gptLoading } = useSelector(
    (state: RootState) => state.jobPost
  );

  const { currEmployer } = useAppSelector((state) => state.employer);

  const [title, setTitle] = useState("");
  const [jobCategory, setJobCategory] = useState("");
  const [jobType, setJobType] = useState<string[]>([]);
  const [workMode, setWorkMode] = useState<string[]>([]);
  const [experience, setExperience] = useState<string[]>([]);
  const [language, setLanguage] = useState("");
  const [currency, setCurrency] = useState<Currency | undefined>();
  const [location, setLocation] = useState<string[]>([]);
  const [salary, setSalary] = useState({
    minimum: "",
    maximum: "",
    isDisclosed: true,
    period: "",
    currency: {
      abbreviation:"",
      name:"",
      symbol:""
    },
  });

  const [company, setCompany] = useState({
    name: "",
    companyId: "",
  });

  const updateSalaryProperty = (
    property: string,
    item: { value: Currency|string; label: string }
  ) => {
    setSalary({
      ...salary,
      [property]: item.value,
    });
  };

  const [primarySkills, setPrimarySkills] = useState<string[]>([]);
  const [secondarySkills, setSecondarySkills] = useState<string[]>([]);
  const [benefits, setBenefits] = useState<string[]>([]);
  const [descriptionWithAI, setDescriptionWithAI] = useState<string>("");
  const [questionWithAI, setQuestionWithAI] = useState<any>("");
  const [workHours, setWorkHours] = useState("");
  const [education, setEducation] = useState("");
  const [joiningTime, setJoiningTime] = useState("");
  const [description, setDescription] = useState("");
  const [deadlineDate, setDeadlineDate] = useState<Date | null>(null);
  // const [fetchedLanguages, setFetchedLanguages] = useState<string[]>(languages);

  const { languages } = useAppSelector((state: RootState) => state.language);
  const { currencies } = useAppSelector((state: RootState) => state.currency);
  useEffect(() => {
    getAllLanguages(dispatch);
    getAllCurrencies(dispatch);
  }, []);
  useEffect(() => {
    const item:any = { value: currency, label: currency };
    updateSalaryProperty("currency", item);
  }, [currency]);

  const handleSalary = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSalary({
      ...salary,
      [name]: value,
    });
  };

  const handleJobType = (item: { value: string; label: string }) => {
    setJobType((prev) => [...prev, item.value]);
    console.log(item.value);
    // setJobType("");
  };
  const handleWorkMode = (item: { value: string; label: string }) => {
    setWorkMode((prev) => [...prev, item.value]);
    console.log(item.value);
    // setJobType("");
  };
  const handleJoining = (item: { value: string; label: string }) => {
    setJoiningTime(item.value);
  };
  const handleExperience = (item: { value: string; label: string }) => {
    setExperience((prev) => [...prev, item.value]);
    // console.log(selected, item.value);
  };
  const handleLanguage = (item: { value: string; label: string }) => {
    setLanguage(item.value);
  };
  const handleRemove = (skill: string) => {
    setBenefits((prev) => prev.filter((val) => val !== skill));
  };
  //onchange handle function for deadlineDate
  // const handleDate = (e:React.ChangeEvent<HTMLInputElement>)=>{
  //   const deadlineDate=e.target.value;
  //   setDeadlineDate(deadlineDate);
  // }

  const bodyObj = {
    title: title,
    location: location,
    jobType: jobType,
    jobCategory: jobCategory,
    primarySkills,
    secondarySkills,
    salary: salary,
    preferredLanguage: language,
    preferredExperience: experience,
    workMode: workMode,
    joiningTime: joiningTime,
    preferredQualification: education,
    workHours: workHours,
    companyId: company.companyId,
    employerId: currEmployer?._id,
    testQuestions: questionWithAI ? questionWithAI : "",
    description,
    benefits: benefits,
    deadlineDate,
  };

  const handleSubmit = async () => {
    // console.log(bodyObj);

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
    //   currency: "",
    //   period: "",
    // });
    // setPrimarySkills([]);
    // setSecondarySkills([]);
    // setDescriptionWithAI("");
    // setQuestionWithAI("");
  };

  const draftDescription = async () => {
    const query = `Help me in writing to the point job description for a job post with given information .
                    job title:${bodyObj.title} job type:${
      bodyObj.jobType
    } work mode:${bodyObj.workMode} primary skills:${bodyObj.primarySkills.join(
      " ,"
    )} 
                    secondary skill:${bodyObj.secondarySkills.join(
                      " ,"
                    )} preferred experience:${bodyObj.preferredExperience.join(
      " ,"
    )} 
                    location:${bodyObj.location.join(" ,")} 
                    job benefits: ${bodyObj.benefits.join(" ,")}`;
    console.log(query);
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
  console.log(descriptionWithAI);

  return (
    <div className="dashboard-body job-details">
      <div className="position-relative">
        {/* header start */}
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        {/* header end */}

        <h2 className="main-title">Post a New Job</h2>
        <div className="bg-white card-box border-20">
          <h4 className="dash-title-three">Job Details</h4>

          <div className="row align-items-end">
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="lastName">Company*</label>
                <AutocompleteCompany
                  selected={company}
                  setSelected={setCompany}
                  endPoint="companyName"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Job Title*</label>
                {/* <input type="text" placeholder="Ex: Product Designer" /> */}
                <AutocompletePosition
                  selected={title}
                  setSelected={setTitle}
                  endPoint="jobTitle"
                />
              </div>
            </div>

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
                <div className="skill-input-data d-flex align-items-center flex-wrap">
                  {workMode.map((value) => (
                    <button key={value}>{value}</button>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Preferred Language</label>
                <AutocompletePosition
                  selected={language}
                  setSelected={setLanguage}
                  endPoint=""
                  suggestionsProp={languages}
                  placeholder="Select Language"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Joining Time</label>
                <NiceSelect
                  options={[
                    { value: "select joining", label: "select joining" },
                    { value: "Immediate Joining", label: "Immediate Joining" },
                    { value: "Within 7 Days", label: "Within 7 Days" },
                    { value: "Within 15 Days", label: "Within 15 Days" },
                    { value: "Within 30 Days", label: "Within 30 Days" },
                    { value: "Within 1 Month", label: "Within 1 Month" },
                    {
                      value: "Flexible Joining Date",
                      label: "Flexible Joining Date",
                    },
                    { value: "To Be Discussed", label: "To Be Discussed" },
                  ]}
                  defaultCurrent={0}
                  onChange={(item) => handleJoining(item)}
                  name="Job Type"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Work Hour</label>
                <input
                  placeholder="Enter working hour"
                  name="workingHour"
                  value={workHours}
                  onChange={(e) => setWorkHours(e.target.value)}
                />
              </div>
            </div>

            <div className="col-md-3">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="salary">Salary*</label>
                <NiceSelect
                  options={[
                    { value: "select period", label: "select period" },
                    { value: "monthly", label: "monthly" },
                    { value: "yearly", label: "yearly" },
                    { value: "weekly", label: "weekly" },
                    { value: "By-weekly", label: "By-weekly" },
                    { value: "hourly", label: "hourly" },
                  ]}
                  defaultCurrent={0}
                  onChange={(item) => updateSalaryProperty("period", item)}
                  name="period"
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="dash-input-wrapper mb-30">
                {/* <NiceSelect
                  options={[
                    { value: "select currency", label: "select currency" },
                    { value: "Canadian dollars", label: "Canadian dollars" },
                    { value: "US dollars", label: "US dollars" },
                  ]}
                  defaultCurrent={0}
                  onChange={(item) => updateSalaryProperty("currency", item)}
                  name="currency"
                /> */}
                <AutocompleteCurrency
                  selected={currency}
                  setSelected={setCurrency}
                  endPoint=""
                  suggestionsProp={currencies}
                  placeholder="Select Currency"
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="dash-input-wrapper mb-30">
                <input
                  type="text"
                  name="minimum"
                  value={salary.minimum}
                  onChange={handleSalary}
                  placeholder="Min "
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
                  placeholder="Max"
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
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Required qualification</label>
                <input
                  placeholder="Enter preferred education"
                  name="education"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                />
              </div>
            </div>
            {/*Application Deadline */}
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Application deadline</label>
                <DatePicker
                  className="w-full block"
                  placeholderText="DD/MM/YYYY"
                  name="deadlineDate"
                  selected={deadlineDate}
                  onChange={(date: Date | null) => setDeadlineDate(date)}
                  dateFormat="dd/MM/yyyy"
                />
              </div>
            </div>
          </div>

          <h4 className="dash-title-three ">Benefits && Offerings</h4>
          <div className="dash-input-wrapper">
            {benefits.length > 0 && (
              <div className="skills-wrapper mb-3 ">
                <ul className="style-none .skill-input-data d-flex flex-wrap align-items-center">
                  {benefits.map((val, index) => (
                    <li key={index} className="is_tag">
                      <button>
                        {val}
                        <i
                          onClick={() => handleRemove(val)}
                          className="bi bi-x"
                        ></i>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="col-6">
              <AutocompleteBenefits
                benefits={benefits}
                setBenefits={setBenefits}
                isJobBenefit={true}
              />
            </div>
          </div>

          <h4 className="dash-title-three pt-50 lg-pt-30">Add Description</h4>
          <div className="dash-input-wrapper mb-30 ">
            {/* <label htmlFor="">Job Description*</label> */}
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
            {questionWithAI && <MultipleChoiceQuestion text={questionWithAI} />}
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
          {/* <a href="#" className="dash-cancel-btn tran3s">
            Cancel
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default SubmitJobArea;
