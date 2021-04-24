import React, { useEffect } from "react";

// Libraries
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";

// Pages
import Projects from "./pages/projects/Projects";
import Rules from "./pages/rules/Rules";
import MyProjects from "./pages/myprojects/MyProjects";
import Support from "./pages/support/Support";
import Donate from "./pages/donate/Donate";
import Faq from "./pages/faq/Faq";

// Components
import TopBar from "./topbar/TopBar";
import SideBar from "./sidebar/SideBar";
import UserDropDown from "components/dropdowns/UserDropDown";

// Modals & Clicks
import Modals from "./Modals";

// Actions
import { User } from "redux/actions";

// Requests
import Socket from "requests/Socket";
import { UserData } from "requests";

// Design
import "./app.scss";

const App = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state);

  useEffect(() => {
    if (localStorage.getItem("ac_t")) {
      UserData()
        .then(res => {
          dispatch(
            User({
              isLoggedIn: true,
              displayname: res.displayname,
              email: res.email,
              credit: res.credit,
              image: res.image,
            })
          );
        })
        .catch(err => {
          if (err.response?.data?.detail === "User not found") {
            localStorage.removeItem("ac_t");
          }
        });
    }

    Socket.onopen = () => {
      console.log("websocket client has connected");
    };

    Socket.onmessage = message => {
      console.log("received message", message);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="wrapper">
      <Modals />

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
          {state.User.isDropdownOpen && <UserDropDown />}

          {state.Sidebar.page === "projects" && <Projects />}
          {state.Sidebar.page === "my-projects" && <MyProjects />}
          {state.Sidebar.page === "rules" && <Rules />}
          {state.Sidebar.page === "support" && <Support />}
          {state.Sidebar.page === "donate" && <Donate />}
          {state.Sidebar.page === "faq" && <Faq />}
        </div>
      </div>

      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl
        pauseOnHover
      />
    </div>
  );
};

export default App;
