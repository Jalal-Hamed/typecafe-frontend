import React, { useRef } from "react";

// Libraries
import { useSelector } from "react-redux";

// Components
import SideBarItem from "components/sidebar/Item";
import SideBarLogin from "components/sidebar/Login";
import SideBarProfile from "components/sidebar/Profile";

// Designs
import "./sidebar.scss";

const SideBar = () => {
  const loginRippleRef = useRef();
  const profileRippleRef = useRef();
  const projectsRippleRef = useRef();
  const financialRippleRef = useRef();
  const rulesRippleRef = useRef();
  const isLoggedIn = useSelector(state => state.User.isLoggedIn);

  return (
    <div className="sidebar-wrapper">
      {isLoggedIn ? (
        <SideBarProfile ref={profileRippleRef} />
      ) : (
        <SideBarLogin ref={loginRippleRef} />
      )}
      <div className="sidebar-items">
        <SideBarItem
          status="projects"
          title="پروژه ها"
          ref={projectsRippleRef}
        />
        {isLoggedIn && (
          <SideBarItem
            status="financial"
            title="مدیریت مالی"
            ref={financialRippleRef}
          />
        )}
        <SideBarItem status="rules" title="قوانین" ref={rulesRippleRef} />
        {/* to be added... */}
        {/* <SideBarItem status="my-projects" title="پروژه های من" ref={rulesRippleRef} /> */}
        {/* <SideBarItem status="support" title="پشتیبانی" ref={rulesRippleRef} /> */}
        {/* <SideBarItem status="learn" title="آموزش" ref={rulesRippleRef} /> */}
        {/* <SideBarItem status="sponsor" title="حمایت" ref={rulesRippleRef} /> */}
        {/* <SideBarItem status="about" title="درباره تایپ کافه" ref={rulesRippleRef} /> */}
      </div>
    </div>
  );
};

export default SideBar;
