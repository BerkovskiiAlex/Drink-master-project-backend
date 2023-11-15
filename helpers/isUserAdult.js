/** @format */

const isUserAdult = (birthdateStr) => {
  const birthdate = new Date(birthdateStr);
  const currentDate = new Date();
  const differenceInMilliseconds = currentDate - birthdate;
  const differenceInYears =
    differenceInMilliseconds / 1000 / 60 / 60 / 24 / 365;
  return differenceInYears >= 18;
};

export default isUserAdult;
