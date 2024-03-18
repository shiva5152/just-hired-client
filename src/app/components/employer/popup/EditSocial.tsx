"use client";
import { updateCurrCandidate } from "@/redux/features/candidate/api";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { notifyError, notifyInfo, notifySuccess } from "@/utils/toast";
import { updateCurrEmployer } from "@/redux/features/employer/api";

const EditSocial = () => {
  const { currEmployer, loading } = useAppSelector((state) => state.employer);
  const dispatch = useAppDispatch();

  const [socialSites, setSocialSites] = useState({
    linkedIn: currEmployer?.socialSites.linkedIn || "",
    twitter: currEmployer?.socialSites.twitter || "",
    facebook: currEmployer?.socialSites.facebook || "",
    website: currEmployer?.socialSites.website || "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSocialSites({
      ...socialSites,
      [name]: value,
    });
  };

  const isValidUrl = (url: string) => {
    if (url === "") {
      return true;
    }
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

    return urlRegex.test(url);
  };

  const handleSave = async () => {
    // validation
    if (
      !isValidUrl(socialSites.linkedIn) ||
      !isValidUrl(socialSites.twitter) ||
      !isValidUrl(socialSites.facebook) ||
      !isValidUrl(socialSites.website)
    ) {
      notifyInfo("Please enter a valid url");
      return;
    }
    if (currEmployer) {
      const isUpdated = await updateCurrEmployer(dispatch, currEmployer._id, {
        socialSites,
      });

      if (isUpdated) {
        notifySuccess("Social sites updated successfully");
      } else notifyError("something went wrong try again");
    }
  };

  return (
    <>
      {
        <div
          className="modal fade"
          id="empSocialModal"
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
                  <div className="d-flex flex-wrap gap-3 justify-content-between     ">
                    <div className="dash-input-wrapper mb-30 w-100">
                      <label htmlFor="firstName">Linked In</label>
                      <div className="d-flex align-items-center position-relative">
                        <input
                          type="text"
                          name="linkedIn"
                          placeholder="https://www.LinkedIn.com"
                          value={socialSites.linkedIn}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="dash-input-wrapper mb-30 w-100">
                      <label htmlFor="lastName">Twitter</label>
                      <div className="d-flex  align-items-center position-relative">
                        <input
                          name="twitter"
                          type="text"
                          placeholder="https://www.twitter.com"
                          value={socialSites?.twitter}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="dash-input-wrapper mb-30 w-100">
                      <label htmlFor="">Facebook</label>
                      <div className="d-flex align-items-center position-relative">
                        <input
                          name="facebook"
                          type="text"
                          placeholder="https://www.github.com"
                          value={socialSites?.facebook}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="dash-input-wrapper mb-30 w-100">
                      <label htmlFor="">WebSite</label>
                      <input
                        type="text"
                        name="website"
                        placeholder="https://www.example.com"
                        value={socialSites?.website}
                        onChange={handleInputChange}
                      />
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
      }
    </>
  );
};

export default EditSocial;
