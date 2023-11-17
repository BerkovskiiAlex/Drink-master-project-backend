/** @format */

const isUserAdult = (birthdateStr) => {
  const birthdate = new Date(birthdateStr);
  const currentDate = new Date();

  const years = currentDate.getFullYear() - birthdate.getFullYear();
  const isMonthPast = currentDate.getMonth() < birthdate.getMonth();
  const isBirthdayPast =
    currentDate.getMonth() === birthdate.getMonth() &&
    currentDate.getDate() < birthdate.getDate();

  if (years > 18 || (years === 18 && !isMonthPast && !isBirthdayPast)) {
    return true;
  }

  return false;
};

export default isUserAdult;
