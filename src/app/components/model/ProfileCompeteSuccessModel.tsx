import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setPlanExhaustedModel, setProfileCompleteModel, setProfileCompleteModelSuccess } from "@/redux/features/model/slice";
import Link from "next/link";

const ProfileCompleteModelSuccess = ({setShowCompleteModal}:{setShowCompleteModal:React.Dispatch<React.SetStateAction<boolean | undefined>>}) => {
  const dispatch = useAppDispatch();

  const {profileCompleteSuccessModel } = useAppSelector((state) => state.model);
  const {userRole} = useAppSelector((state) => state.persistedReducer.user);
  const handleClose = () => {
    dispatch(setProfileCompleteModelSuccess(false));
    setShowCompleteModal(false)
  };

  return (
    <div
      style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      className={`modal-backdrop  fade ${profileCompleteSuccessModel ? "show opacity-100" : ""}`}
      onClick={handleClose}
    >
      <div
        className={`modal fade ${profileCompleteSuccessModel ? "show d-block" : ""}`}
        id="profileCompleteSuccessModel"
        tabIndex={-1}
        aria-hidden={!profileCompleteSuccessModel}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-dialog modal-fullscreen modal-dialog-centered">
          <div className="container">
            <div className="user-data-form modal-content">
              <button
                type="button"
                className="btn-close"
                onClick={handleClose}
              ></button>
              <div className="form-wrapper m-auto px-5 ">
                <div className="text-center">
                  <h2 className=" mb-3 py-3">Get our paid Plans</h2>
                </div>
                <div className="d-flex row  mx-auto mb-3  ">
                  <div className="d-flex align-items-start   gap-3  ">
                    <h1>
                      <i className="bi  bi-person-check"></i>
                    </h1>
                    <span>
                    {`Explore our paid plans`}
                    </span>
                  </div>
                </div>
                <div className="d-flex justify-content-between  justify-content-center mt-3  ">
                  <button className="btn-two" onClick={handleClose}>
                    Cancel
                  </button>
                  <Link
                    href={`/dashboard/${userRole}-dashboard/membership`}
                    type="button"
                    className="btn-one"
                  >
                    Membership
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCompleteModelSuccess;
