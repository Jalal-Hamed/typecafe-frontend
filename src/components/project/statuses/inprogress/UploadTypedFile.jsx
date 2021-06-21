import React, { useRef, useState, useEffect } from "react";

// Libraries
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

// Components
import Button from "components/buttons/Button";
import Close from "components/buttons/Close";
import Input from "components/inputs/Input";
import { fileNameFilter, farsiNumber, remainingTime } from "components/helper";

// Actions
import { Sidebar, RulesScrollTo } from "redux/actions";

// Designs
import "./inprogress.scss";

const UploadTypedFile = ({ offer, deliveryDeadline }) => {
  const dispatch = useDispatch();
  const uploadRef = useRef();
  const uploadInputRef = useRef();
  const submitRef = useRef();
  const [file, setFile] = useState(null);
  const [badFormat, setBadFormat] = useState(false);
  const [numberOfPages, setNumberOfPages] = useState("");
  const [err, setErr] = useState("");
  const [deadline, setDeadline] = useState(
    remainingTime(offer?.typist_ready, deliveryDeadline * 60 * 60)
  );
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const openFileInput = () => {
    uploadInputRef.current.click();
  };

  const handleFileChange = e => {
    if (e.target.files[0].type === "application/zip") {
      setFile(e.target.files[0]);
    } else {
      setBadFormat(true);
      toast.error("فرمت فایل انتخاب شده صحیح نمی‌باشد.");
    }
  };

  useEffect(() => {
    if (numberOfPages) {
      if (Number(numberOfPages) < 1) {
        setErr("تعداد صفحات نمی‌تواند کوچکتر از 1 باشد.");
      } else if (!Number.isInteger(Number(numberOfPages))) {
        setErr("تعداد صفحات نمی‌تواند یک عدد اعشاری باشد.");
      } else {
        setErr("");
      }
    } else {
      setErr(
        <>
          تعداد صفحات تایپ شده را وارد کنید.
          <br />
          <span style={{ fontSize: "12px" }}>
            محاسبه بر اساس{" "}
            <span
              className="standard-format"
              onClick={() => {
                dispatch(Sidebar({ page: "rules" }));
                dispatch(RulesScrollTo("StandardFormat"));
              }}
            >
              فرمت استاندارد سایت
            </span>
          </span>
        </>
      );
    }

    // eslint-disable-next-line
  }, [numberOfPages]);

  useEffect(() => {
    let interval = setInterval(() => {
      if (deadline > 0) {
        setDeadline(
          remainingTime(offer.typist_ready, deliveryDeadline * 60 * 60)
        );
        setHours(parseInt(deadline / 3600));
        setMinutes(
          parseInt((deadline - parseInt(deadline / 3600) * 3600) / 60)
        );
        setSeconds(
          deadline -
            parseInt((deadline - parseInt(deadline / 3600) * 3600) / 60) * 60 -
            parseInt(deadline / 3600) * 3600
        );
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);

    // eslint-disable-next-line
  }, [deadline]);

  return (
    <div className="upload-typed-file-wrapper">
      <div className="time-left-wrapper">
        {!!hours && (
          <>
            <p className="time-digit">{farsiNumber(hours)}</p>
            <p className="time-title">ساعت</p>
          </>
        )}
        {!!minutes && (
          <>
            <p className="time-digit">{farsiNumber(minutes)}</p>
            <p className="time-title">دقیقه</p>
          </>
        )}
        <p className="time-digit">{farsiNumber(seconds)}</p>
        <p className="time-title">ثانیه</p>
      </div>
      <div className="upload-wrapper">
        <input
          type="file"
          name="typedfile"
          ref={uploadInputRef}
          onChange={e => handleFileChange(e)}
          onClick={e => {
            e.target.value = null; // allows uploading the same file over and over
          }}
          accept=".zip"
          hidden
        />
        {!file ? (
          <>
            <div className="upload-icon-circle" onClick={openFileInput}>
              <i className="icon icon-upload-typed-file" />
            </div>
            <p className="upload-typed-file-note">
              فایل تایپ شده را آپلود کنید.
            </p>
            <p
              className={`upload-typed-file-valid-format ${
                badFormat ? "red" : ""
              }`}
            >
              فرمت مجاز فقط zip. می‌باشد.
            </p>
            <Button
              ref={uploadRef}
              title="انتخاب فایل"
              className="fit-width no-break upload-button"
              onClick={openFileInput}
            />
          </>
        ) : (
          <>
            <div className="file-details-wrapper">
              <Close
                className="cancel-file"
                onClick={() => setFile(null)}
                red
              />
              <i className="icon icon-zip-smaller" />
              <div>
                <p className="title">نام فایل</p>
                <p
                  className="value"
                  style={{ direction: "ltr", width: "max-content" }}
                >
                  {fileNameFilter(file.name)}&nbsp;&nbsp;
                </p>
                <p className="title">حجم فایل</p>
                <p className="value">
                  &nbsp;&nbsp;
                  {farsiNumber((file.size / 1000).toFixed(1))} کیلوبایت
                </p>
              </div>
            </div>
            <div className="number-of-pages-and-submit-wrapper">
              <Input
                label="تعداد صفحات"
                type="number"
                wrapperStyle={{ width: "50%" }}
                min="1"
                value={numberOfPages}
                onChange={e => setNumberOfPages(e.target.value)}
                autoFocus
                noBreak
              />
              <Button
                ref={submitRef}
                title="ارسال"
                className="fit-width green no-break submit"
                disabled={err}
              />
            </div>
            {err && (
              <p
                className={`err ${
                  typeof err === "object" ? "less-bottom" : ""
                }`}
              >
                {err}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UploadTypedFile;
