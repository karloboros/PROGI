import test from 'ava';
import { subtractYears } from '../client/src/utils/dates.js';
import {
  emailValidator,
  dateOfBirthValidator,
  phoneNumberValidator,
  urlValidator,
  WRONG_EMAIL_FORMAT_MESSAGE,
  UNDER_AGE_MINIMUM_MESSAGE,
  WRONG_PHONE_FORMAT_MESSAGE,
  WRONG_URL_FORMAT_MESSAGE,
} from '../client/src/utils/rules.js';

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
  const https = 'https://gitlab.com/programtvogkompjutera1/ples/';
  const http = 'http://gitlab.com/programtvogkompjutera1/ples/';
  const noProtocol = '://gitlab.com/programtvogkompjutera1/ples/';
  const missingDot = 'https//gitlab.com/programtvogkompjutera1/ples/';
  const missingSlash = 'https:/gitlab.com/programtvogkompjutera1/ples/';
  const missingSlashes = 'https:gitlab.com/programtvogkompjutera1/ples/';
  const missingTopLevelDomain = 'https://gitlab/programtvogkompjutera1/ples/';

  const error = Error(WRONG_URL_FORMAT_MESSAGE);

  t.true(urlValidator(null, https));
  t.true(urlValidator(null, http));
  t.deepEqual(urlValidator(null, noProtocol), error);
  t.deepEqual(urlValidator(null, missingDot), error);
  t.deepEqual(urlValidator(null, missingSlash), error);
  t.deepEqual(urlValidator(null, missingSlashes), error);
  t.deepEqual(urlValidator(null, missingTopLevelDomain), error);
});
