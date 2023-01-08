import test from 'ava';
import { subtractYears, toDatePicker } from '../client/src/utils/dates.js';
import suggestions from '../client/src/utils/emailSuggestions.js';
import { emailValidator, dateOfBirthValidator, phoneNumberValidator, urlValidator } from '../client/src/utils/rules.js';

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
  t.deepEqual(toDatePicker(date2) - toDatePicker(date1), expectedDiff);
});

test('Should return email suggestions', t => {
  const inputMail = 'some_username@';
  const expectedSuggestions = [ 
    { label: 'some_username@gmail.com', value: 'some_username@gmail.com', },
    { label: 'some_username@fer.hr', value: 'some_username@fer.hr', },
    { label: 'some_username@outlook.com', value: 'some_username@outlook.com', }, ];
  const suggestedEmails = suggestions(inputMail);
  t.deepEqual(suggestedEmails, expectedSuggestions);
});

test('Should validate email address', t => {
  const inputMailValid = 'some_username@gmail.com';
  const inputMailInvalid = 'mailInvalid';

  let result = emailValidator(null, inputMailValid);
  t.deepEqual(result, true);

  result = emailValidator(null, inputMailInvalid);
  t.deepEqual(result, Error('Wrong email format'));
});

test('Should check if user is old enough to register', t => {
  const date = new Date('Mon Jul 16 2003 22:43:41 GMT+0100 (Central European Standard Time)');
  let result = dateOfBirthValidator(null, date);
  t.deepEqual(result, true);

  const dateUnderage = new Date('Sat Jun 07 2023 22:43:41 GMT+0100 (Central European Standard Time)');
  result = dateOfBirthValidator(null, dateUnderage);
  t.deepEqual(result, Error('You need to be at least 12 years old to register'));
});

test('Should validate phone number', t => {
  const phoneNum = '0953333333';
  let result = phoneNumberValidator(null, phoneNum);
  t.deepEqual(result, true);

  const invalidNum = '0911111111111';
  result = phoneNumberValidator(null, invalidNum)
  t.deepEqual(result, Error('Wrong number format'));
});

test('Should validate url', t => {
  const url = 'https://gitlab.com/programtvogkompjutera1/ples/';
  let result = urlValidator(null, url);
  t.deepEqual(result, true);

  const wrongUrl = 'videoUrl#2';
  result = urlValidator(null, wrongUrl);
  t.deepEqual(result, Error('Wrong url format'));
});
