"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import edit from "@/assets/dashboard/images/icon/icon_20.svg";
import delete_icon from "@/assets/dashboard/images/icon/icon_21.svg";
import Link from "next/link";
import { removeSavedJob } from "@/redux/features/candidate/api";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setCompanyBeingEdited } from "@/redux/features/company/slice";
import { deleteCandidateByAdmin, deletedEmployerByAdmin, getAllCandidate, getAllCompany, getAllEmployer, updateCompany } from "@/redux/features/admin/api";
import { notifySuccess } from "@/utils/toast";

const ActionDropdown = ({ id,role }: { id: string,role:string }) => {
  const { currUser } = useAppSelector((state) => state.persistedReducer.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log(id)
  },[id])
  const {pageFC} =
    useAppSelector((state) => state.admin);
    const filterUser = useAppSelector((state) => state.userFilter)
    const { pageFE } =
    useAppSelector((state) => state.admin);
    const [showModelProperties, setShowModelProperties] = useState(false);
  const handleDelete = async () => {
    // removeSavedJob(dispatch, {
    //   companyId: id, // Change jobPostId to companyId
    //   candidateId: currUser,
    //   page: savedJobsPage,
    // });
    if(role==="candidate"){

        await deleteCandidateByAdmin(dispatch, id, { isDeleted: true });
        await getAllCandidate(dispatch, { page: pageFC, limit: 8 },filterUser);
    }
    else{
        await deletedEmployerByAdmin(dispatch,id,{isDeleted:true})
        await getAllEmployer(dispatch, { page: pageFE, limit: 8 },filterUser);
    }
    notifySuccess("User deleted successfully");
  
  };
//   const handleClick = () => {
//     dispatch(setCompanyBeingEdited(id));
//   };
const handleClose = () => {
  setShowModelProperties(false); // Toggle the visibility
};

  return (
    <>
    <ul className="dropdown-menu dropdown-menu-end">
      {/* <li>
        <button
          className="dropdown-item"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#editCompanyByEmployer"
          onClick={handleClick}
        >
          <Image src={edit} alt="icon" className="lazy-img" /> Edit
        </button>
      </li> */}
      <li>
        {/* <button className="dropdown-item" type="button" onClick={handleDelete}>
          <Image src={delete_icon} alt="icon" className="lazy-img" /> Delete
        </button> */}
         <button
                          className="dropdown-item" 
                          data-bs-toggle="modal"
                          data-bs-target="#deleteCompany"
                          type="button"
                        >
                          <Image src={delete_icon} alt="icon" className="lazy-img" /> Delete
                        </button>
                        
      </li>
    </ul>
    <div
    className="modal popUpModal fade"
    id="deleteCompany"
    tabIndex={-1}
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog modal-fullscreen modal-dialog-centered">
      <div className="user-data-form modal-content">
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={handleClose}
        ></button>
        <div className="container subscription-model">
          <h2 className="fs-2 text-center mb-4">
            Remove {role}
          </h2>
          <p className="mt-3 ms-4">
            Do you Want to delete the {role}...?
          </p>
          <div className="mt-3 justify-content-end d-flex float-end">
            <button
              className="btn btn-danger me-3 "
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  </>
  );
};
{
  /* <ul className="dropdown-menu dropdown-menu-end">
      <li>
        <Link className="dropdown-item" href={`/job-details-v1/${id}`}>
          <Image src={view} alt="icon" className="lazy-img" /> View
        </Link>
      </li>
      <Link className="dropdown-item" href="#">
        <Image src={share} alt="icon" className="lazy-img" /> Share
      </Link>
      <li>
        <button className="dropdown-item" type="button" data-bs-toggle="modal"
        data-bs-target="#editJobPostByEmployer" onClick={handleClick}>
          <Image src={edit} alt="icon" className="lazy-img" /> Edit
        </button>
      </li>
    </ul> */
}
export default ActionDropdown;
