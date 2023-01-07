import test from 'ava';
import { subtractYears } from '../client/src/utils/dates.js';

test('Should subtract years from date', t => {
  const date = new Date('Sat Jan 07 2023 22:43:41 GMT+0100 (Central European Standard Time)');
  const expectedDate = new Date('Sat Jan 07 2013 22:43:41 GMT+0100 (Central European Standard Time)');
  const subtractedDate = subtractYears(date, 10);
  t.deepEqual(subtractedDate, expectedDate);
});
