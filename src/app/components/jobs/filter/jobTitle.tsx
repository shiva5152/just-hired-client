"use client";
import { setJobCode } from "@/redux/features/filterJobPostSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

const SearchJobCode = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [localSearch, setLocalSearch] = useState("");
  const { jobTitle } = useAppSelector((state) => state.filter);

  return (
    <div>
      <a
        className="filter-title fw-500 text-dark"
        data-bs-toggle="collapse"
        href="#collapseSemploye"
        role="button"
        aria-expanded="false"
      >
        Job Code
      </a>
      <div className="collapse show" id="collapseSemploye">
        <div className="main-body">
          <form action="#" className="input-box position-relative">
            <input
              name="jobCode"
              value={localSearch}
              onChange={(e) => {
                // router.push(`job-list-v1?jobCode=${e.target.value}`);
                setLocalSearch(e.target.value);
              }}
              type="text"
              placeholder="type job code here"
            />
            <button>
              <i className="bi bi-search"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchJobCode;
