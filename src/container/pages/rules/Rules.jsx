import React, { useEffect, useState, useRef } from "react";

// Libraries
import { useSelector, useDispatch } from "react-redux";

// Actions
import { RulesScrollToHTWW } from "redux/actions";

// Designs
import "./rules.scss";

const Rules = () => {
  const dispatch = useDispatch();
  const DistributionOfContent = useRef();
  const HowTheWebsiteWorks = useRef();
  const ResponsibilityOfTakingCareOfPassword = useRef();
  const scrollTo = useSelector(state => state.Rules);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
    return () => {
      window.removeEventListener("resize", () => setWidth(window.innerWidth));
    };

    // eslint-disable-next-line
  }, [width]);

  useEffect(() => {
    if (scrollTo) {
      HowTheWebsiteWorks.current.scrollIntoView();
      dispatch(RulesScrollToHTWW(false));
    }

    // eslint-disable-next-line
  }, [scrollTo]);

  return (
    <div className={`rules-wrapper ${width < 1050 ? "w-100" : "w-78"}`}>
      {width > 1050 && (
        <div className="quick-access">
          <p className="title">انتقال سریع</p>
          <p
            className="item"
            onClick={() => DistributionOfContent.current.scrollIntoView()}
          >
            توزیع و انتشار محتوا
          </p>
          <p
            className="item"
            onClick={() => HowTheWebsiteWorks.current.scrollIntoView()}
          >
            نحوه عملکرد وب‌سایت
          </p>
          <p
            className="item"
            onClick={() =>
              ResponsibilityOfTakingCareOfPassword.current.scrollIntoView()
            }
          >
            مسئولیت محافظت از رمز عبور
          </p>
        </div>
      )}
      <p className="rules-initiate-note">
        شما با مشاهده و یا استفاده از هر یک از خدمات تایپ‌کافه، در جایگاه یک
        کاربر عادی یا یک کاربر عضو شده، قوانین تایپ‌کافه را به رسمیت می‌شناسید.
        همچنین متعهد می‌شوید که از آخرین به‌روزرسانی این قوانین آگاهی داشته
        باشید. منظور از اسامی تایپ‌کافه و TypeCafe، وب‌سایت{" "}
        <span className="typecafe-url">https://typecafe.ir</span> می‌باشد و
        تمامی حقوق برای تایپ‌کافه محفوظ است.
      </p>
      <p className="rules-title" ref={DistributionOfContent}>
        توزیع و انتشار محتوا
      </p>
      <p className="rules-value">
        تایپ‌کافه تحت قوانین جمهوری اسلامی ایران فعالیت می‌کند و هدف آن تسهیل
        خدمات تایپ به صورت آنلاین و دورکاری می‌باشد. در نتیجه انتشار و توزیع
        هرگونه محتوای مجرمانه از نظر قوانین جمهوری اسلامی ایران و یا مغایر با
        اهداف اساسی سایت، خلاف قوانین است و به‌محض آگاهی یافتن از انتشار چنین
        محتوایی، حساب کاربری مجرم برای همیشه بسته خواهد شد و وجوه دریافتی نیز به
        وی بازگردانده نخواهد شد. از نمونه های اینگونه محتوا می‌توان به موارد زیر
        اشاره کرد:
      </p>
      <ul className="rules-value less-mt" style={{ margin: "10px 40px" }}>
        <li>نام نمایشی نامناسب</li>
        <li>توهین، تهدید و یا بی‌احترامی به هر شکل</li>
        <li>انتشار هرگونه فایل ویروسی و مخرب</li>
        <li>انتشار محتوا و تصاویر غیراخلاقی و جنسی</li>
        <li>تبادل هرگونه راه ارتباطی خارج از سایت</li>
        <li>هرگونه تبلیغ و یا ترویج</li>
        <li>...</li>
      </ul>
      <p className="rules-title" ref={HowTheWebsiteWorks}>
        نحوه عملکرد وب‌سایت
      </p>
      <p className="rules-value">
        هر کاربر عضو شده در وب‌سایت تایپ‌کافه، ضمن رعایت قوانین، می‌تواند همزمان
        هم به عنوان تایپیست و هم به عنوان کارفرما در وب‌سایت فعالیت کند.
      </p>
      <p className="rules-value less-mt">
        روند کلی ایجاد و انجام پروژه: کارفرما پروژه خود را ثبت و تایپیست برای
        انجام پروژه‌ پیشنهاد ارسال می‌کند. پیرو سیاست های کنونی وب‌سایت، تایپیست
        باید حتما قبل از ثبت پیشنهاد، فایل پروژه را دانلود و با بررسی محتوای
        پروژه از توانایی انجام آن تا قبل از موعد تعیین شده اطمینان حاصل کند. در
        حال حاضر حداقل قیمت پیشنهادی برای هر صفحه ۱,۵۵۵ تومان و کارمزد تایپ‌کافه
        ۱۰٪ می‌باشد. که با توجه به درصد ذکر شده، تایپیست به ازای هر صفحه ۱,۴۰۰
        تومان دریافتی، و کارفرما ۱,۷۱۱ تومان پرداختی خواهد داشت. بعد از تایید
        پیشنهاد تایپیست توسط کارفرما، مجموع مبلغ پروژه (قیمت پیشنهادی به ازای هر
        صفحه x تعداد صفحات ± کارمزد تایپ‌کافه) از اعتبار هر دو طرف کسر و نزد
        تایپ‌کافه گروگذاری خواهد شد. این مبلغ جهت حسن انجام کار توسط تایپیست و
        حصول اطمینان از پرداخت دستمزد توسط کارفرما از اعتبار طرفین اخذ می‌گردد و
        درصورت بروز هرگونه مورد عدم انطباق به شرح ذیل، وجه دریافتی به اعتبار طرف
        دیگر منتقل خواهد شد.
      </p>
      <ul className="rules-value less-mt" style={{ margin: "10px 40px" }}>
        <li>
          در صورت عدم تحویل موفق پروژه توسط تایپیست در موعد مقرر، بلافاصله و سپس
          به ازای هر ۱۵ دقیقه تاخیر، ۱۰٪ از کل مبلغ گروگذاری شده از اعتبار وی
          کسر و به اعتبار کارفرما منتقل خواهد شد. در نتیجه در صورت عدم تحویل
          موفق پروژه پس از ۱۵۰ دقیقه از موعد مقرر شده، کل مبلغ گروگذاری شده توسط
          تایپیست به حساب کارفرما منتقل، و یک پروژه ناموفق در پروفایل تایپیست
          ثبت خواهد شد.
        </li>
        <li>
          در صورت عدم پرداخت دستمزد تایپیست تا ۲۴ ساعت پس از تحویل نهایی پروژه
          توسط کارفرما، کل مبلغ گروگذاری شده توسط کارفرما به اعتبار تایپیست
          منتقل، و یک پروژه ناموفق در پروفایل کارفرما ثبت خواهد شد.
        </li>
      </ul>
      <p className="rules-value less-mt">
        در هر دو مورد ذکر شده، مطابق با میزان دیرکرد، درصد "تحویل به موقع پروژه"
        در پروفایل تایپیست و یا درصد "پرداخت به موقع" در پروفایل کارفرما کاهش
        خواهد یافت. البته شایان ذکر است که این درصد قابل جبران بوده و با تحویل و
        پرداخت به موقع، مجددا افزایش خواهد یافت.
      </p>
      <p className="rules-value less-mt">
        لطفا توجه داشته باشید که به علت تاثیری که تعداد صفحات بر محاسبه مبلغ
        گروگذاری دارد، کارفرما به هیچ عنوان نمی‌بایست تعداد صفحات را کمتر یا
        بیشتر از تعداد حقیقی آن‌ها وارد کند. در صورت گزارش و یا مشاهده چنین
        موردی، پروژه معلق خواهد شد. همچنین تایپیست به هیچ عنوان نمی‌بایست پروژه
        را ناقص تحویل دهد. در صورت گزارش و یا مشاهده چنین موردی تمام مبلغ
        گروگذاری شده توسط تایپیست بی چون و چرا به اعتبار کارفرما منتقل، و یک
        پروژه ناموفق در پروفایل تایپیست ثبت خواهد شد.
      </p>
      <p className="rules-value less-mt"></p>
      <p className="rules-title" ref={ResponsibilityOfTakingCareOfPassword}>
        مسئولیت محافظت از رمز عبور
      </p>
    </div>
  );
};

export default Rules;
