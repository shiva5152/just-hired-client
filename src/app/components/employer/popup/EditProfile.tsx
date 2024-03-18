"use client";
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Value } from "sass";
import { notifyError, notifyInfo, notifySuccess } from "@/utils/toast";
import { updateCurrCandidate } from "@/redux/features/candidate/api";
import AutocompleteCompany from "@/ui/autoCompeteCompanyName";
import SelectGender from "@/ui/select-gender";
import { updateCurrEmployer } from "@/redux/features/employer/api";
const EditProfile = () => {
  const { currEmployer, loading } = useAppSelector((state) => state.employer);
  const dispatch = useAppDispatch();
  const user = currEmployer;

  const [value, setValue] = useState(user?.phoneNumber);

  const [form, setForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    bio: user?.bio || "",
    phoneNumber: user?.phoneNumber || "",
  });
  const [company, setCompany] = useState({
    name: user?.company?.name || "",
    companyId: user?.company?.companyId || "",
  });
  const [gender, setGender] = useState(user?.gender || "");

  const handleSave = async () => {
    // validation
    if (
      !form.firstName ||
      !form.lastName ||
      !form.bio ||
      !value ||
      !company.name ||
      !gender ||
      gender === "select gender"
    ) {
      notifyInfo("Felid with * can't be empty");
      return;
    }
    if (!isValidPhoneNumber(value)) {
      notifyInfo("Enter a valid phone number");
      return;
    }

    if (currEmployer) {
      const isUpdated = await updateCurrEmployer(dispatch, currEmployer._id, {
        ...form,
        company,
        gender,
        phoneNumber: value,
      });

      if (isUpdated) {
        notifySuccess("Profile updated successfully");
      } else notifyError("something went wrong, try again");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // console.log("selected", company);

  return (
    <>
      <div
        className="modal fade"
        id="empProfileModal"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-fullscreen modal-dialog-centered">
          <div className="container-fluid">
            <div className="user-data-form modal-content">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>

              <div className="form-wrapper dash-input-wrapper m-auto w-100 ">
                <div>
                  <div className="dash-input-wrapper mb-30">
                    <label htmlFor="firstName">First Name*</label>
                    <input
                      type="text"
                      name="firstName"
                      onChange={handleInputChange}
                      value={form.firstName}
                      placeholder="James"
                    />
                  </div>
                  <div className="dash-input-wrapper mb-30">
                    <label htmlFor="lastName">Last Name*</label>
                    <input
                      type="text"
                      name="lastName"
                      onChange={handleInputChange}
                      value={form.lastName}
                      placeholder="brown"
                    />
                  </div>

                  <div className="dash-input-wrapper mb-30">
                    <label htmlFor="">Phone Number*</label>
                    {/* <input
                      type="text"
                      name="phoneNumber"
                      onChange={handleInputChange}
                      value={form.phoneNumber}
                      placeholder="+880 01723801729"
                    /> */}
                    <PhoneInput
                      d
                      placeholder="Enter phone number"
                      value={value}
                      onChange={(value: any) => setValue(value)}
                    />
                    {/* <input type="text" placeholder="Brower" /> */}
                  </div>
                  <div className="dash-input-wrapper mb-30">
                    <label htmlFor="lastName">Company Name*</label>
                    <AutocompleteCompany
                      selected={company}
                      setSelected={setCompany}
                      endPoint="companyName"
                    />
                  </div>
                  <div className="dash-input-wrapper mb-30">
                    <label htmlFor="lastName">Gender*</label>
                    <SelectGender
                      default={{ value: gender, label: gender }}
                      firstInput={!user?.gender ? "select gender" : ""}
                      setMonth={setGender}
                    />
                  </div>
                  <div className="dash-input-wrapper">
                    <label htmlFor="bio">Bio*</label>
                    <textarea
                      className="size-lg"
                      placeholder="Write something interesting about you...."
                      value={form.bio}
                      name="bio"
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>
                <div className="button-group d-inline-flex align-items-center mt-30">
                  <button
                    onClick={handleSave}
                    className="dash-btn-two tran3s me-3"
                    type="button"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    Save
                  </button>
                  <button
                    className="dash-cancel-btn tran3s"
                    type="button"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
