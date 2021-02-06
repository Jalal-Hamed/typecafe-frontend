import React, { forwardRef } from "react";

// Libraries
import { useSelector } from "react-redux";

// Components
import RippleWrapper from "components/ripple/RippleWrapper";

// Functions
import { PriceFormat } from "components/helper";

const Profile = forwardRef((props, ref) => {
  const isSidebarOpen = useSelector(state => state.Sidebar.isSidebarOpen);
  const user = useSelector(state => state.User);

  return (
    <RippleWrapper
      className={`user-profile ${
        isSidebarOpen ? "sidebar-profile-wide" : "sidebar-profile-short"
      } no-select`}
      ref={ref}
    >
      <i
        className={`icon ${
          isSidebarOpen ? "icon-user-default-big" : "icon-user-default-regular"
        } icon-margin-18`}
      />
      <div
        className={
          isSidebarOpen ? "sidebar-profile-text" : "sidebar-profile-no-text"
        }
      >
        {user.displayname}
        <p className="sidebar-profile-credit">
          اعتبار: {PriceFormat(user.credit)}
        </p>
      </div>
    </RippleWrapper>
  );
});

export default Profile;
