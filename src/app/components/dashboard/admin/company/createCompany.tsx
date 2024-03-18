"use client";
import React, { useState } from "react";
import Image from "next/image";
import avatar from "@/assets/dashboard/images/avatar_04.jpg";
import DashboardHeader from "../../candidate/dashboard-header";
import TeamSizeSelect from "../team-size-select";
import LocationAutoComplete from "@/ui/locationAutoComplete";
import DropZone from "@/layouts/dropZone";
import AutocompletePosition from "@/ui/autoCompletePosistion";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { addCompany } from "@/redux/features/company/api";
import Loader from "@/ui/loader";
import SelectYear from "../../candidate/select-year";
import { IFunding } from "@/types/company";
import SelectRound from "../selectRound";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { useAppSelector } from "@/redux/hook";
import "react-phone-number-input/style.css";
import AutocompleteBenefits from "@/ui/autoCompletebenefits";
import Finance from "../show-finance";
import { notifyInfo } from "@/utils/toast";
import { setFile } from "@/redux/features/globalSlice";

const CreateCompany = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector(
    (state: RootState) => state.company.companyList
  );
  const [form, setForm] = useState({
    logo: "",
    name: "",
    email: "",
    foundedDate: "",
    founderName: "",
    about: "",
    category: "",
  });
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const { currEmployer } = useAppSelector((s) => s.employer);

  const [benefits, setBenefits] = useState<string[]>([]);
  const [funding, setFunding] = useState<IFunding[]>([]);
  const [fundingInput, setFundingInput] = useState({
    amount: "",
    fundedBy: "",
  });

  const [yearOfFunding, setYearOfFunding] = useState("");
  const [round, setRound] = useState("");
  const handleAddFunding = () => {
    const fund = {
      ...fundingInput,
      round: round,
      yearOfFunding: yearOfFunding,
    };
    setFunding((prev) => [...prev, fund]);
    setFundingInput({
      amount: "",
      fundedBy: "",
    });
    setYearOfFunding("");
    setRound("");
  };

  const handleFundingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFundingInput({
      ...fundingInput,
      [name]: value,
    });
  };

  const [location, setLocation] = useState({
    locality: "",
  });
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocation({
      ...location,
      [name]: value,
    });
  };
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [teamSize, setTeamSize] = useState("");
  // const [category, setCategory] = useState("");

  const [value, setValue] = useState("");
  const { file } = useAppSelector((s) => s.global);
  const handleCompanyLogo = () => {};
  const handleRemove = (skill: string) => {
    setBenefits((prev) => prev.filter((val) => val !== skill));
  };
  const [socialSites, setSocialSites] = useState({
    linkedIn: "",
    twitter: "",
    facebook: "",
    website: "",
  });

  const handleSocialSiteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSocialSites({
      ...socialSites,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (!file) {
      notifyInfo("please upload logo");
      return;
    }
    if (!currEmployer) {
      notifyInfo("please login to create a company");
      return;
    }
    const ILocation = {
      ...location,
      city: city,
      country: country,
    };

    const bodyObj = {
      ...form,
      contactNumber: value,
      location: [ILocation],
      teamSize,
      socialSites,
      createdBy: currEmployer._id,
      benefits,
      funding,
    };
    console.log(bodyObj);
    // return;

    addCompany(dispatch, bodyObj, file);

    // setForm({
    //   logo: "",
    //   name: "",
    //   email: "",
    //   founderName: "",
    //   foundedDate: "",
    //   about: "",
    //   category: "",
    // });
    // setCity("");
    // setCountry("");
    // setTeamSize("");
    // setLocation({
    //   locality: "",
    // });
    // // setSocialSites([]);
    // setBenefits([]);
    // setFunding([]);
  };
  const handleFile = (file: File | null) => {
    setFile(file);
  };
  return (
    <div>
      <div className="bg-white card-box border-20">
        <div className="user-avatar-setting d-flex align-items-center mb-30">
          {/* company logo url */}
          <Image
            width={50}
            height={50}
            src={avatar}
            // src={
            //   user?.avatar !== "none" || false
            //     ? (user?.avatar as string)
            //     : avatar
            // }
            alt="avatar"
            className="lazy-img user-img"
          />
          {!file && (
            <div className=" upload-btn position-relative tran3s ms-4 px-2  mx-3">
              <DropZone setFile={handleFile} text={"Upload logo"} />
            </div>
          )}
          {file && (
            <div className=" d-flex flex-column ms-4 ">
              <div className="d-flex justify-content-center   ">
                {/* <button
                    onClick={handleCompanyLogo}
                    className="upload-btn position-relative tran3s ms-4 me-3"
                  >
                    {"Save"}
                  </button> */}
                <div className=" mt-1 ">
                  <small>
                    Upload square image in .png, .jpeg, max 1mb sized
                  </small>
                </div>
              </div>
              <p className="dash-title-three">{file?.name}</p>
            </div>
          )}
        </div>
        <div className="dash-input-wrapper mb-30">
          <label htmlFor="name">Company Name*</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            placeholder="John Doe"
          />
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="dash-input-wrapper mb-30">
              <label htmlFor="email">Email*</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleInputChange}
                placeholder="companyinc@gmail.com"
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="dash-input-wrapper mb-30">
              <label htmlFor="foundedDate">Founded Date*</label>
              <input
                name="foundedDate"
                value={form.foundedDate}
                onChange={handleInputChange}
                type="date"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="dash-input-wrapper mb-30">
              <label htmlFor="founderName">Founder Name*</label>
              <input
                type="text"
                name="founderName"
                value={form.founderName}
                onChange={handleInputChange}
                placeholder="Shiva shah"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="dash-input-wrapper mb-30">
              <label htmlFor="">Company Size*</label>
              {/* <TeamSizeSelect teamSize={teamSize} setTeamSize={setTeamSize} /> */}
              <TeamSizeSelect setSelected={setTeamSize} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="dash-input-wrapper mb-30">
              <label htmlFor="">Phone Number*</label>
              <PhoneInput
                placeholder="Enter contact number"
                value={value}
                onChange={(value: any) => setValue(value)}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="dash-input-wrapper mb-30">
              <label htmlFor="category">Category*</label>
              <input
                name="category"
                value={form.category}
                onChange={handleInputChange}
                type="text"
                placeholder="Account, Finance, Marketing"
              />

              {/* <AutocompletePosition
                  selected={category}
                  setSelected={setCategory}
                  endPoint="companyCategory"
                /> */}
            </div>
          </div>
        </div>
        <div className="dash-input-wrapper">
          <label htmlFor="about">About Company*</label>
          <textarea
            name="about"
            value={form.about}
            onChange={handleInputChange}
            className="size-lg"
            placeholder="Write something interesting about you...."
          ></textarea>
          <div className="alert-text">Brief description for your company.</div>
        </div>
        {/* <button
            type="submit"
            onClick={handleSubmit}
            className="dash-btn-two tran3s me-3"
          >
            Save
          </button> */}
      </div>
      {/* from for social links */}
      <div className="bg-white card-box border-20 mt-40">
        <h4 className="dash-title-three">Social Media</h4>
        <div className="d-flex flex-wrap gap-3 justify-content-between     ">
          <div className="dash-input-wrapper mb-30 col-5">
            <label htmlFor="lastName">Website*</label>
            <div className="d-flex  align-items-center position-relative">
              <input
                name="website"
                type="text"
                placeholder="https://www.website.com"
                value={socialSites?.website}
                onChange={handleSocialSiteChange}
              />
            </div>
          </div>
          <div className="dash-input-wrapper mb-30 col-5">
            <label htmlFor="firstName">Linked In</label>
            <div className="d-flex align-items-center position-relative">
              <input
                type="text"
                name="linkedIn"
                placeholder="https://www.LinkedIn.com"
                value={socialSites.linkedIn}
                onChange={handleSocialSiteChange}
              />
            </div>
          </div>
          <div className="dash-input-wrapper mb-30 col-5">
            <label htmlFor="lastName">Twitter</label>
            <div className="d-flex  align-items-center position-relative">
              <input
                name="twitter"
                type="text"
                placeholder="https://www.twitter.com"
                value={socialSites?.twitter}
                onChange={handleSocialSiteChange}
              />
            </div>
          </div>

          <div className="dash-input-wrapper mb-30 col-5">
            <label htmlFor="lastName">Facebook</label>
            <div className="d-flex  align-items-center position-relative">
              <input
                name="facebook"
                type="text"
                placeholder="https://www.facebook.com"
                value={socialSites?.facebook}
                onChange={handleSocialSiteChange}
              />
            </div>
          </div>
        </div>
      </div>
      {/* form for finance */}
      <div className="bg-white card-box border-20 mt-40">
        <h4 className="dash-title-three">Funding && Finance</h4>

        {funding.length !== 0 && (
          <div className="inner-card border-style mb-25 lg-mb-20">
            <h3 className="title">Funding</h3>
            <Finance funding={funding} />
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
                Add Funding*
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
                      <label htmlFor="amount">Amount*</label>
                    </div>
                  </div>
                  <div className="col-lg-10">
                    <div className="dash-input-wrapper mb-30">
                      <input
                        name="amount"
                        value={fundingInput.amount}
                        onChange={handleFundingChange}
                        type="text"
                        placeholder="345M"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-2">
                    <div className="dash-input-wrapper mb-30 md-mb-10">
                      <label htmlFor="fundedBy">Funded By*</label>
                    </div>
                  </div>
                  <div className="col-lg-10">
                    <div className="dash-input-wrapper mb-30">
                      <input
                        name="fundedBy"
                        value={fundingInput.fundedBy}
                        onChange={handleFundingChange}
                        type="text"
                        placeholder="GGV capitals"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-2">
                    <div className="dash-input-wrapper mb-30 md-mb-10">
                      <label htmlFor="">Year of funding*</label>
                    </div>
                  </div>
                  <div className="col-lg-10">
                    <div className="row">
                      <div className="">
                        <SelectYear
                          setYear={setYearOfFunding}
                          firstInput="select"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-2">
                    <div className="dash-input-wrapper mb-30 md-mb-10">
                      <label htmlFor="">Round*</label>
                    </div>
                  </div>
                  <div className="col-lg-10">
                    <div className="row">
                      <div className="">
                        <SelectRound firstInput="select" setRound={setRound} />
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="false"
                  aria-controls="collapseOne"
                  onClick={handleAddFunding}
                  className="dash-btn-two tran3s me-3 mb-15"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* from for adding benefits of company */}
      <div className="bg-white card-box border-20 mt-40">
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
            />
          </div>
        </div>
      </div>

      {/* form for location */}
      <div className="bg-white card-box border-20 mt-40">
        <h4 className="dash-title-three">Address & Location</h4>
        <div className="row">
          <div className="col-12">
            <div className="dash-input-wrapper mb-25">
              <label htmlFor="locality">Local Address*</label>
              <input
                name="locality"
                value={location.locality}
                type="text"
                onChange={handleLocationChange}
                placeholder="Cowrasta, Chandana, Gazipur Sadar"
              />
            </div>
          </div>

          <div className="col-lg-3">
            <div className="dash-input-wrapper mb-25">
              <label htmlFor="city">City*</label>
              <LocationAutoComplete
                selected={city}
                setSelected={setCity}
                setCountry={setCountry}
                type="cities"
                label="city"
              />
            </div>
          </div>

          {/* <div className="col-lg-3">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="">State*</label>
                <LocationAutoComplete
                  selected={state}
                  setSelected={setState}
                  type="regions"
                  label="state"
                />
              </div>
            </div> */}
          {/* <div className="col-lg-3">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="zipcode">Zip Code*</label>
                <input
                  name="zipcode"
                  value={location.zipcode}
                  onChange={handleLocationChange}
                  type="text"
                  placeholder="1708"
                />
              </div>
            </div> */}
          <div className="col-lg-3">
            <div className="dash-input-wrapper mb-25">
              <label htmlFor="country">Country*</label>
              <input
                name="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                type="text"
                placeholder="country"
              />
            </div>
          </div>
          {/* <div className="col-12">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="maplocation">Map Location*</label>
                <div className="position-relative">
                  <input
                    name="maplocation"
                    value={location.maplocation}
                    onChange={handleLocationChange}
                    type="text"
                    placeholder="XC23+6XC, Moiran, N105"
                  />
                  <button className="location-pin tran3s">
                    <Image src={icon} alt="icon" className="lazy-img m-auto" />
                  </button>
                </div>
                <div className="map-frame mt-30">
                  <div className="gmap_canvas h-100 w-100">
                    <iframe
                      className="gmap_iframe h-100 w-100"
                      src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=bass hill plaza medical centre&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div> */}
          {/* <button
              type="submit"
              onClick={handleLocationSubmit}
              className="dash-btn-two tran3s me-3"
            >
              Save
            </button> */}
        </div>
      </div>

      <div className="button-group d-inline-flex align-items-center mt-30">
        <button
          disabled={loading}
          type="submit"
          onClick={handleSubmit}
          className=" d-flex dash-btn-two tran3s me-3 justify-content-center align-items-center"
        >
          {loading ? <Loader /> : <span>Save</span>}
        </button>
        <a href="#" className="dash-cancel-btn tran3s">
          Cancel
        </a>
      </div>
    </div>
  );
};

export default CreateCompany;
