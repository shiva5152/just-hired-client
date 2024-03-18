import { ICandidate } from "@/types/user-type";
import React from "react";

const CandidateBio = ({ candidate }: { candidate: ICandidate }) => {
  return (
    <ul className="style-none">
      <li>
        <span>Location: </span>
        <div>
          {candidate?.location?.city}, {candidate?.location?.country}{" "}
        </div>
      </li>
      <li>
        <span>Age: </span>
        <div>28</div>
      </li>
      <li>
        <span>Email: </span>
        <div>
          <a href="mailto:me@support.com">{candidate.email}</a>
        </div>
      </li>
      <li>
        <span>Qualification: </span>
        {candidate.education.length > 0 && (
          <div>{candidate.education[0].degree}</div>
        )}
      </li>
      <li>
        <span>Gender: </span>
        <div>Male</div>
      </li>
      <li>
        <span>Expected Salary: </span>
        <div>$3k-$4k</div>
      </li>
      <li>
        <span>Social:</span>
        <div>
          <a href="#" className="me-3">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="#" className="me-3">
            <i className="bi bi-instagram"></i>
          </a>
          <a href="#" className="me-3">
            <i className="bi bi-twitter"></i>
          </a>
          <a href="#">
            <i className="bi bi-linkedin"></i>
          </a>
        </div>
      </li>
    </ul>
  );
};

export default CandidateBio;
