import React from "react";
import ActionDropdown from "./action-dropdown-myJobs";
import Link from "next/link";

const EmployJobItem = ({
  title,
  info,
  date,
  application,
  status,
  updatedAt,
  id,
}: {
  title: string;
  info: string;
  date: string;
  application: string;
  status: string | number;
  updatedAt?: string;
  id: string;
}) => {
  return (
    <tr className={`${status}`}>
      <td>
        <div className="job-name fw-500">
          <Link href={`/dashboard/employer-dashboard/jobs/${id}`}>{title}</Link>
        </div>
        <div className="info1">{info}</div>
      </td>
      <td>{date}</td>
      <td>{application}</td>
      <td>
        <div className="job-status text-capitalize">{status}</div>
      </td>
      {updatedAt && <td className="float-end">{updatedAt}</td>}
      <td>
        <div className="action-dots float-end">
          <button
            className="action-btn dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span></span>
          </button>

          <ActionDropdown id={id} />
        </div>
      </td>
    </tr>
  );
};

export default EmployJobItem;
