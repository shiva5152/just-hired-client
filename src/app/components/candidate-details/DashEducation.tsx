import { IEducation } from "@/types/user-type";
import React, { useState } from "react";
import Image from "next/image";
import icon_3 from "@/assets/images/icon/icon_10.svg";
import EditEducation from "./popup/EditEducation";
import { useAppDispatch } from "@/redux/hook";
import { setCurrDashEducation } from "@/redux/features/candidate/dashboardSlice";
interface Props {
  education?: IEducation[] | undefined;
}

const Education = ({ education }: Props) => {
  const dispatch = useAppDispatch();
  const [id, setId] = useState("");
  const [style, setStyle] = useState("none");
  const handleClick = (id: string) => {
    dispatch(setCurrDashEducation(id));
    setStyle("block");
  };
  return (
    <>
      <div className="time-line-data position-relative pt-15">
        {education?.map((obj, index) => (
          <>
            <div className="info position-relative">
              <div className=" float-end ">
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#EducationModal"
                  type="button"
                  className="apply-btn text-center tran3s"
                  onClick={() => handleClick(obj._id)}
                >
                  <Image
                    src={icon_3}
                    height={24}
                    width={24}
                    alt="icon"
                    className="lazy-img position-absolute end-0 cursor-pointer"
                  />
                </button>
              </div>
              <div className="numb fw-500 rounded-circle d-flex align-items-center justify-content-center">
                {index + 1}
              </div>
              <div className="text_1 fw-500">
                {" "}
                {obj.institute} {` (${obj.startYear}-${obj.endYear})`}
              </div>
              <h4>{obj.degree}</h4>
              <p>
                {obj.description} + Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Proin a ipsum tellus. Interdum primis
              </p>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default Education;
