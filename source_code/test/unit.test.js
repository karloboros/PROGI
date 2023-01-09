import test from 'ava';
import { subtractYears, toDatePicker } from '../client/src/utils/dates.js';
import suggestions from '../client/src/utils/emailSuggestions.js';
import {
  emailValidator,
  dateOfBirthValidator,
  phoneNumberValidator,
  urlValidator,
  WRONG_EMAIL_FORMAT_MESSAGE,
  UNDER_AGE_MINIMUM_MESSAGE,
  WRONG_PHONE_FORMAT_MESSAGE,
} from '../client/src/utils/rules.js';

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

test('Should return email suggestions', t => {
  const inputMail = 'some_username@';
  const expectedSuggestions = [
    { label: 'some_username@gmail.com', value: 'some_username@gmail.com' },
    { label: 'some_username@fer.hr', value: 'some_username@fer.hr' },
    { label: 'some_username@outlook.com', value: 'some_username@outlook.com' },
  ];
  const suggestedEmails = suggestions(inputMail);
  t.deepEqual(suggestedEmails, expectedSuggestions);
});

test('Should validate email address', t => {
  const validInput = 'some_username@gmail.com';
  const onlyName = 'some_username';
  const missingName = '@gmail.com';
  const missingAt = 'some_usernamegmail.com';
  const missingDot = 'some_username@gmailcom';
  const missingEnd = 'some_username@gmail.';
  const longEnd = 'some_username@gmail.comercial';

  const error = Error(WRONG_EMAIL_FORMAT_MESSAGE);

  t.true(emailValidator(null, validInput));
  t.deepEqual(emailValidator(null, onlyName), error);
  t.deepEqual(emailValidator(null, missingName), error);
  t.deepEqual(emailValidator(null, missingAt), error);
  t.deepEqual(emailValidator(null, missingDot), error);
  t.deepEqual(emailValidator(null, missingEnd), error);
  t.deepEqual(emailValidator(null, longEnd), error);
});

test('Should check if user is old enough to register', t => {
  const now = new Date().getTime();
  const validDate = subtractYears(new Date(), 15).getTime();
  const edgeCase = subtractYears(new Date(), 12).getTime();

  const error = Error(UNDER_AGE_MINIMUM_MESSAGE);

  t.deepEqual(dateOfBirthValidator(null, now), error);
  t.true(dateOfBirthValidator(null, validDate));
  t.true(dateOfBirthValidator(null, edgeCase));
});

test('Should validate phone number', t => {
  const nineLength = '123456789';
  const tenLength = '1234567890';
  const spaces = '123 123 123';
  const dashes = '123-123-1234';
  const tooLong = '12345678910';
  const tooShort = '1234';
  const alpha = '1234b1234';
  const nonAlphaNumeric = '123#123#12';

  const error = Error(WRONG_PHONE_FORMAT_MESSAGE);

  t.true(phoneNumberValidator(null, nineLength));
  t.true(phoneNumberValidator(null, tenLength));
  t.true(phoneNumberValidator(null, spaces));
  t.true(phoneNumberValidator(null, dashes));
  t.deepEqual(phoneNumberValidator(null, tooLong), error);
  t.deepEqual(phoneNumberValidator(null, tooShort), error);
  t.deepEqual(phoneNumberValidator(null, alpha), error);
  t.deepEqual(phoneNumberValidator(null, nonAlphaNumeric), error);
});

test('Should validate url', t => {
  const url = 'https://gitlab.com/programtvogkompjutera1/ples/';
  let result = urlValidator(null, url);
  t.deepEqual(result, true);

  const wrongUrl = 'videoUrl#2';
  result = urlValidator(null, wrongUrl);
  t.deepEqual(result, Error('Wrong url format'));
});
