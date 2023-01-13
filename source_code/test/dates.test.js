import test from 'ava';
import { subtractYears, toDatePicker } from '../client/src/utils/dates.js';

test('Should subtract years from date', t => {
  const date = new Date('Sat Jan 07 2023 22:43:41 GMT+0100 (Central European Standard Time)');
  const expectedDate = new Date('Sat Jan 07 2013 22:43:41 GMT+0100 (Central European Standard Time)');
  const subtractedDate = subtractYears(date, 10);
  t.deepEqual(subtractedDate, expectedDate);
});

test('Should get time value in milliseconds', t => {
  const date1 = 'Sun Jan 01 2023 00:00:01 GMT+0100 (Central European Standard Time)';
  const date2 = 'Sun Jan 01 2023 00:00:02 GMT+0100 (Central European Standard Time)';
  const expectedDiff = 1000;
  t.is(toDatePicker(date2) - toDatePicker(date1), expectedDiff);
});
