import React, { useRef } from "react";

// Libraries
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

// Components
import Close from "components/buttons/Close";
import Button from "components/buttons/Button";
import Previous from "components/buttons/Previous";
import { PriceFormat, toFarsiNumber } from "components/helper";

// Actions
import { Project, Sidebar } from "redux/actions";

// Request
import { CreateOffer } from "requests";

// Design
import "./sendrequest.scss";

const SendRequest = () => {
  const dispatch = useDispatch();
  const increaseButtonRippleRef = useRef();
  const submitButtonRippleRef = useRef();
  const previousButtonRippleRef = useRef();
  const state = useSelector(state => state);
  const pageCount = Number(state.Project.selectedPageCount);
  const pricePerPage = Number(state.Project.selectedPricePerPage);
  const wholePrice = pageCount * pricePerPage;
  const credit = Number(state.User.credit);
  const deadline = Number(state.Project.selectedDeadline);

  const handleIncreaseCredit = () => {
    dispatch(Project({ isModalOpen: false }));
    dispatch(Sidebar({ page: "financials" }));
  };

  const handleMoreAboutThis = () => {
    dispatch(Project({ isModalOpen: false }));
    dispatch(Sidebar({ page: "rules" }));
  };

  const handleSubmitRequest = () => {
    let body = {
      offered_price: pricePerPage,
      project: state.selectedId,
    };

    CreateOffer(body)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  return (
    <motion.div
      initial={{ scale: 0.5 }}
      animate={{ scale: 1 }}
      className={`sendrequest-wrapper ${credit >= wholePrice ? "" : "h-200"}`}
    >
      <Close
        className="close-modal"
        onClick={() => dispatch(Project({ isModalOpen: false }))}
      />
      <div className="sendrequest-content">
        {credit >= wholePrice ? (
          <>
            <p className="sendrequest-note">
              در صورت تایید پیشنهاد شما توسط کارفرما، مجموع مبلغ پروژه{" "}
              <span className="highlight">{PriceFormat(wholePrice)}</span> به
              عنوان مبلغ ضمانت انجام پروژه از اعتبار شما کسر خواهد شد و در صورت
              عدم تحویل پروژه تا قبل از مهلت تعیین شده{" "}
              <span className="highlight">{toFarsiNumber(deadline)} ساعت</span>{" "}
              به حساب کارفرما انتقال داده خواهد شد.
            </p>
            <p className="go-to-rules" onClick={handleMoreAboutThis}>
              اطلاعات بیشتر در این باره
            </p>
            <div className="button-wrapper">
              <Button
                ref={submitButtonRippleRef}
                title="تایید و ثبت پیشنهاد"
                className="w-68"
                onClick={handleSubmitRequest}
              />
              <Previous
                ref={previousButtonRippleRef}
                title="انصراف"
                className="w-30"
                onClick={() => dispatch(Project({ isModalOpen: false }))}
              />
            </div>
          </>
        ) : (
          <>
            <p className="not-enough-credit">اعتبار کافی نیست.</p>
            <Button
              ref={increaseButtonRippleRef}
              title="افزایش اعتبار"
              className="increase-credit-button w-68"
              onClick={handleIncreaseCredit}
            />
          </>
        )}
      </div>
    </motion.div>
  );
};

export default SendRequest;
