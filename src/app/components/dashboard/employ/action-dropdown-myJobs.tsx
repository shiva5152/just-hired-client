"use client";
import React from "react";
import Image from "next/image";
import { updateJobAppStatus } from "@/redux/features/jobApp/api";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setCurrJobApp } from "@/redux/features/jobApp/slice";
import view from "@/assets/dashboard/images/icon/icon_18.svg";
import share from "@/assets/dashboard/images/icon/icon_19.svg";
import edit from "@/assets/dashboard/images/icon/icon_20.svg";
import Link from "next/link";
// const  enum: ['Received', 'Under Review', 'Shortlisted', "Not Selected"]

const ActionDropdown = ({ id }: { id: string }) => {
  return (
    <ul className="dropdown-menu dropdown-menu-end">
      <li>
        <Link className="dropdown-item" href={`/job-details-v1/${id}`}>
          <Image src={view} alt="icon" className="lazy-img" /> View
        </Link>
      </li>
      <Link className="dropdown-item" href="#">
        <Image src={share} alt="icon" className="lazy-img" /> Share
      </Link>
      <li>
        <Link href={"#"} className="dropdown-item" type="button">
          <Image src={edit} alt="icon" className="lazy-img" /> Edit
        </Link>
      </li>
    </ul>
  );
};

export default ActionDropdown;
