import React from "react";

// Librares
import { useSelector, useDispatch } from "react-redux";

// Steps
import StepsHeader from "./StepsHeader";
import UploadPics from "./steps/UploadPics";
import Close from "components/buttons/Close";

// Actions
import { CreateProject } from "redux/actions";

// Design
import "./createproject.scss";

const CreateNewProject = () => {
  const dispatch = useDispatch();
  const step = useSelector(state => state.CreateProject.step);

  return (
    <div className="cp-wrapper">
      <div className="cp-header">
        <p className="cp-header-title">ثبت پروژه</p>
        <Close
          onClick={() => dispatch(CreateProject({ isModalOpen: false }))}
        />
      </div>
      <div className="cp-steps no-select">
        <StepsHeader />
      </div>
      <div className="cp-content">
        {step === "uploadpics" && <UploadPics />}
      </div>
      <div className="user-agreement">
        با ثبت پروژه خود در تایپ‌کافه، شما با
        <span className="add-project-rules"> قوانین ثبت پروژه </span>
        موافقت می‌نمایید.
      </div>
    </div>
  );
};

export default CreateNewProject;
