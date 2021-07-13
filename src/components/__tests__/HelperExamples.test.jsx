import {
  add,
  textExample,
  numberExample,
  concatenateNames,
  moreOrLessThanTen,
  testArray,
  // eslint-disable-next-line import/named
  farenheitToCelcius,
  // eslint-disable-next-line import/named
  calculatePercentage, centimeterToInches, inchesToCentimeter,

// eslint-disable-next-line import/named
} from '../HelperExamples/HunctionExamples';

test('truthy-example', () => {
  expect(textExample).toBeTruthy();
});

test('equal-example', () => {
  expect(numberExample).toEqual(120);
});

test('add-example', () => {
  const value = add(1, 2);
  expect(value).toBe(3);
});

test('concatenateNames', () => {
  const value = concatenateNames('Jan', 'Jansen');
  expect(value).toBe('Jan Jansen');
});

test('moreThenTen', () => {
  expect(moreOrLessThanTen(15)).toBe('More then ten');
});

test('lessThanTen', () => {
  expect(moreOrLessThanTen(5)).toBe('Less then or equal to ten');
});

test('teatArray', () => {
  expect(testArray).toEqual([]);
});

test('farenheitToCelcius', () => {
  expect(farenheitToCelcius([250, 120, 200, 250])).toEqual([1286.2, 519.2, 991.2, 1286.2]);
});

test('calculatePercentage', () => {
  expect(calculatePercentage(35, 400)).toEqual(8.75);
});

test('centimeterToInches', () => {
  expect(centimeterToInches(110)).toEqual(42.9);
});

test('inchesToCentimeter', () => {
  expect(inchesToCentimeter(21)).toEqual(53.84615384615385);
});
