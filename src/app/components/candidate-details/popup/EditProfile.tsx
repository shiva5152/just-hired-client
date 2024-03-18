"use client";
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { notifyError, notifyInfo, notifySuccess } from "@/utils/toast";
import { updateCurrCandidate } from "@/redux/features/candidate/api";

const EditProfile = () => {
  const { currCandidate, loading } = useAppSelector(
    (state) => state.candidate.candidateDashboard
  );
  const dispatch = useAppDispatch();
  const user = currCandidate;

  const [value, setValue] = useState(user?.phoneNumber);

  const [form, setForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    bio: user?.bio || "",
    phoneNumber: user?.phoneNumber || "",
    experienceInYears: user?.experienceInYears || 0,
  });

  const handleSave = async () => {
    // validation
    if (!form.firstName || !form.lastName || !form.bio || !value || !form.experienceInYears) {
      notifyInfo("Felid with * can't be empty");
      return;
    }
    if (!isValidPhoneNumber(value)) {
      notifyInfo("Enter a valid phone number");
      return;
    }

    if (currCandidate) {
      const isUpdated = await updateCurrCandidate(dispatch, currCandidate._id, {
        ...form,
        phoneNumber: value,
      });

      if (isUpdated) {
        notifySuccess("Profile updated successfully");
      } else notifyError("something went wrong try again");
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

  return (
    <>
      <div
        className="modal fade"
        id="profileModal"
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
                      placeholder="Enter phone number"
                      value={value}
                      onChange={(value: any) => setValue(value)}
                    />
                    {/* <input type="text" placeholder="Brower" /> */}
                  </div>
                  <div className="dash-input-wrapper mb-30">
                    <label htmlFor="lastName">Years of experience*</label>
                    <input
                      type="number"
                      name="experienceInYears"
                      onChange={handleInputChange}
                      value={form.experienceInYears}
                      placeholder="Enter your experience in years"
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
