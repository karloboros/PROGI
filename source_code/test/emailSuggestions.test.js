import test from 'ava';
import suggestions from '../client/src/utils/emailSuggestions.js';

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
