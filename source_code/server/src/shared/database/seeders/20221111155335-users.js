/* eslint-disable @typescript-eslint/no-var-requires */
const bcrypt = require('bcrypt');

const TABLE_NAME = 'users';

const createUser = (index, role = 3) => {
  const password = bcrypt.hashSync('123', process.env.SALT_ROUNDS || 12);
  return {
    username: `example${index}`,
    firstName: `test`,
    lastName: `user${index}`,
    password,
    gender: 0,
    dateOfBirth: new Date('2001'),
    phone: '0987654321',
    email: `example${index}@gmail.com`,
    role,
    experienceDescription: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum`,
  };
};

module.exports = {
  up(queryInterface) {
    const users = [createUser('', 0)];
    for (let i = 1; i < 5; i++) users.push(createUser(i));
    return queryInterface.bulkInsert(TABLE_NAME, users);
  },
  down(queryInterface) {
    return queryInterface.bulkDelete(TABLE_NAME, null, {});
  },
};
