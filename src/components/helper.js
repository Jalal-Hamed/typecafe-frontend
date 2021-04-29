export const emailOverFlow = props => {
  const email = props.email;

  if (email.length > 33) {
    return email.slice(0, 30) + "...";
  } else {
    return email;
  }
};

export const priceFormat = price => {
  return farsiNumber(Number(price).toLocaleString() + " تومان");
};

export const farsiNumber = n => {
  const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  return n.toString().replace(/\d/g, x => farsiDigits[x]);
};

export const addCommission = price => {
  return price + price * 0.01 * 5;
};
