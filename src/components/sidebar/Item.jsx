import React, { forwardRef } from "react";

// Libraries
import { useSelector, useDispatch } from "react-redux";

// Components
import RippleWrapper from "components/ripple/RippleWrapper";
import { farsiNumber } from "components/helper";

// Actions
import { Sidebar } from "redux/actions";

const Item = forwardRef(({ status, title }, ref) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (state.Sidebar.page !== status) {
      dispatch(Sidebar({ page: status }));
    }
  };

  return (
    <RippleWrapper
      className={`sidebar-items_item${
        state.Sidebar.page === status ? "_selected" : ""
      }`}
      onClick={handleClick}
      ref={ref}
    >
      <i
        className={`icon icon-margin-24 ${
          state.Sidebar.page === status
            ? `icon-${status}-dark`
            : `icon-${status}-white`
        }`}
      />
      <p
        className={
          state.Sidebar.isOpen ? "sidebar-item-title" : "sidebar-item-no-title"
        }
      >
        {title}
      </p>
      {status === "my-projects" && !!state.Projects.myprojects.length && (
        <div className="sidebar-counter">
          {farsiNumber(state.Projects.myprojects.length)}
        </div>
      )}
      {status === "messages" && !!state.Messages.totalUnread && (
        <div className="sidebar-counter red">
          {farsiNumber(state.Messages.totalUnread)}
        </div>
      )}
    </RippleWrapper>
  );
});

export default Item;
