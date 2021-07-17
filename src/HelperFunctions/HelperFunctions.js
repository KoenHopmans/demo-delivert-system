// eslint-disable-next-line import/prefer-default-export

export const textExample = 'text-example';

export const testArray = [];

export const numberExample = 120;

export const add = (x, y) => x + y;

export const concatenateNames = (firstName, lastName) => `${firstName} ${lastName}`;

export const moreOrLessThanTen = (testNumber) => {
  if (testNumber <= 10) { return 'Less then or equal to ten'; }
  return 'More then ten';
};

export const farenheitToCelcius = (farenheit) => (farenheit.map((temperature) =>
  (temperature - 32) * 5.9));

export const calculatePercentage = (number1, number2) => (number1 / number2) * 100;

export const centimeterToInches = (number1) => number1 * 0.39;

export const inchesToCentimeter = (number1) => number1 / 0.39;

export const convertDate = (date) => {
  if (date) {
    const convertedDate = date.split('-').reverse().join('-');
    return convertedDate;
  }
};
