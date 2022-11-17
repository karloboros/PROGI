/* eslint-disable @typescript-eslint/no-var-requires */
const bcrypt = require('bcrypt');

const TABLE_NAME = 'users';

const createUser = (index, data = {}) => {
  const password = bcrypt.hashSync('123', process.env.SALT_ROUNDS || 12);
  const {
    username = `example${index}`,
    firstName = `test`,
    lastName = `user${index}`,
    phone = `098765432${index}`,
    email = `example${index}@gmail.com`,
    role = 3,
  } = data;

  return {
    username,
    firstName,
    lastName,
    password,
    gender: 0,
    dateOfBirth: new Date('2001'),
    phone,
    email,
    role,
    experienceDescription: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum`,
  };
};

module.exports = {
  up(queryInterface) {
    const users = [createUser('')];
    for (let i = 1; i < 5; i++) users.push(createUser(i));
    users.push(createUser(10, { username: 'admin', firstName: 'Admin', lastName: 'Adminius', role: 0 }));
    users.push(createUser(11, { username: 'owner', firstName: 'Owner', lastName: 'Ownius', role: 1 }));
    users.push(createUser(12, { username: 'trainer', firstName: 'Trainer', lastName: 'Trainius', role: 2 }));
    users.push(createUser(13, { username: 'user', firstName: 'User', lastName: 'Usius', role: 3 }));
    return queryInterface.bulkInsert(TABLE_NAME, users);
  },
  down(queryInterface) {
    return queryInterface.bulkDelete(TABLE_NAME, null, {});
  },
};
