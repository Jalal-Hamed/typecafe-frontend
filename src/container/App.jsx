import React from "react";

// Libraries
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

// Pages
import Projects from "./pages/projects/Projects";
import Rules from "./pages/rules/Rules";

// Components
import TopBar from "./topbar/TopBar";
import SideBar from "./sidebar/SideBar";
import Image from "components/images/Image";

// Modals
import ModalWrapper from "modals/ModalWrapper";
import LoginRegister from "modals/loginregister/LoginRegister";
import CreateProject from "modals/createproject/CreateProject";

// Design
import "./app.scss";

const App = () => {
  const state = useSelector(state => state);

  return (
    <div className="wrapper">
      {/* MODALS */}
      {state.LR.isModalOpen && (
        <ModalWrapper>
          <LoginRegister />
        </ModalWrapper>
      )}
      {state.CreateProject.isModalOpen && (
        <ModalWrapper>
          <CreateProject />
        </ModalWrapper>
      )}
      {state.CreateProject.isImageModalOpen && (
        <ModalWrapper>
          <Image />
        </ModalWrapper>
      )}
      {/* END OF MODALS */}

      <TopBar />
      <div className="main">
        <div
          className={
            state.Sidebar.isSidebarOpen ? "sidebar-open" : "sidebar-close"
          }
        >
          <SideBar />
        </div>
        <div className="content">
          {state.Sidebar.page === "projects" && <Projects />}
          {state.Sidebar.page === "rules" && <Rules />}
        </div>
      </div>

      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default App;
