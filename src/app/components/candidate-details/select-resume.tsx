import { IResume } from "@/types/user-type";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import DropZone from "@/layouts/dropZone";
// import Link from 'next/link';
import { notifyError } from "@/utils/toast";
import { deleteResume, uploadResume } from "@/redux/features/candidate/api";
import { setFile, setUploadProgress } from "@/redux/features/globalSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

const SelectResume = ({
  resumes,
  setStep,
  setForm,
}: {
  resumes: IResume[];
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setForm: React.Dispatch<
    React.SetStateAction<{
      testScore: number;
      appliedWithResume: string;
      jobLetter: string;
    }>
  >;
}) => {
  const [isSaved, setSaved] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const handleClick = (resumeId: string) => {
    setForm((form) => ({
      ...form,
      appliedWithResume: resumeId,
    }));
    setSelectedId(resumeId);
    setSaved(true);
  };

  const router = useRouter();
  const upload = () => {
    router.push("/dashboard/candidate-dashboard/resume");
  };

  const { file, uploadProgress } = useAppSelector((s) => s.global);
  const { currCandidate, loading } = useAppSelector(
    (store) => store.candidate.candidateDashboard
  );
  const dispatch = useAppDispatch();
  const handleSubmit = async () => {
    if (!currCandidate) {
      notifyError("please Login to upload your resume.");
      return;
    }
    if (!file || file?.type !== "application/pdf") {
      notifyError("Please upload Your resume as pdf.");
      return;
    }
    const metaData = {
      name: file.name,
      type: file.type,
      candidateId: currCandidate._id,
      candidateName: currCandidate.firstName + " " + currCandidate.lastName,
    };
    await uploadResume(dispatch, file, metaData);
    dispatch(setFile(null));
    dispatch(setUploadProgress(0));
  };

  const handleFile = (file: File | null) => {
    setFile(file);
  };

  return (
    <div>
      <p className="mt-3 fw-medium mb-3 text-center ">
        Select your resume for this job post.
      </p>
      {resumes.length >= 1 ? (
        <div>
          {resumes.slice(-3).map((resume) => (
            <button
              onClick={() => handleClick(resume._id)}
              type="button"
              className={`${
                String(resume._id) === selectedId && "request-btn-active"
              } request-btn d-flex w-100  flex-column  rounded gap-1 mb-3 border border-black p-3 `}
            >
              <div className="job-name fw-500">{resume.name}</div>
            </button>
          ))}

          {!file && (
            <>
              <div
                style={{ cursor: "pointer" }}
                className="btn-one  w-100 mt-25"
              >
                <DropZone
                  setFile={handleFile}
                  showIcon={false}
                  style=""
                  text={"Upload CV"}
                />
              </div>
              <div className=" mt-3 ">
                <small>Upload file .pdf</small>
              </div>
            </>
          )}

          {file && file.type === "application/pdf" && (
            <>
              <p className="my-2">{file.name}</p>
              <button
                className="btn-one  w-100 mt-25"
                type="button"
                onClick={handleSubmit}
              >
                {uploadProgress !== 0 ? `${uploadProgress}% ` : "Save"}
              </button>
            </>
          )}

          {/* <button className="btn-one  w-100 mt-25 ">
              <Link href={'../dashboard/candidate-dashboard/resume'}>  
              <div>Upload New Resume </div>
              </Link>
          </button> */}
        </div>
      ) : (
        // : resumes.length >=3 ?
        // (
        // <div>
        //   {resumes.slice(-3).map((resume) => (
        //       <button
        //         onClick={() => handleClick(resume._id)}
        //         type="button"
        //         className={`${
        //           String(resume._id) === selectedId && "request-btn-active"
        //         } request-btn d-flex w-100  flex-column  rounded gap-1 mb-3 border border-black p-3 `}
        //       >
        //         <div className="job-name fw-500">{resume.name}</div>
        //       </button>
        //     ))}

        //   <button
        //   onClick={upload}
        //   className="btn-one  w-100 mt-25 ">
        //     <div>Upload New Resume </div>
        //   </button>
        //   </div>)

        <div>
          <p>Please upload your resume First....</p>
          <button
            className="btn-two tran3s"
            type="button"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            close
          </button>
        </div>
      )}
      <div className="button-group d-inline-flex align-items-center mt-30">
        {isSaved && (
          <button
            onClick={() => setStep((p) => p + 1)}
            className="btn-two tran3s"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default SelectResume;
