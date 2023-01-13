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
    gender = 0,
    dateOfBirth = new Date('2000'),
  } = data;

  return {
    username,
    firstName,
    lastName,
    password,
    gender,
    dateOfBirth,
    phone,
    email,
    role,
    experienceDescription: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum`,
    image: '/images/users/thumbnail.png',
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
    users.push(
      createUser(16, {
        username: 'laradjakovic',
        firstName: 'Lara',
        lastName: 'Đaković',
        role: 1,
        gender: 1,
        dateOfBirth: new Date(2001, 8, 5),
      }),
    );
    users.push(
      createUser(17, {
        username: 'luka.nola',
        firstName: 'Luka',
        lastName: 'Nola',
        role: 1,
        dateOfBirth: new Date(2001, 4, 12),
      }),
    );
    users.push(
      createUser(18, { username: 'mateja.golec', firstName: 'Mateja', lastName: 'Golec', role: 1, gender: 1 }),
    );
    users.push(createUser(19, { username: 'ana.vrabec', firstName: 'Ana', lastName: 'Vrabec', role: 2, gender: 1 }));
    users.push(
      createUser(20, { username: 'lucija.domic', firstName: 'Lucija', lastName: 'Domić', role: 2, gender: 1 }),
    );
    users.push(
      createUser(21, {
        username: 'ivanborovac',
        firstName: 'Ivan',
        lastName: 'Borovac',
        role: 3,
        dateOfBirth: new Date(2005, 8, 5),
      }),
    );
    users.push(
      createUser(22, {
        username: 'petar.petrovic',
        firstName: 'Petar',
        lastName: 'Petrović',
        role: 3,
        dateOfBirth: new Date(2005, 6, 2),
      }),
    );
    users.push(
      createUser(23, {
        username: 'karlo.boros',
        firstName: 'Karlo',
        lastName: 'Boros',
        role: 3,
        dateOfBirth: new Date(2001, 8, 5),
      }),
    );
    users.push(
      createUser(24, {
        username: 'nina.duric',
        firstName: 'Nina',
        lastName: 'Duric',
        role: 3,
        gender: 1,
        dateOfBirth: new Date(2001, 1, 1),
      }),
    );
    users.push(
      createUser(25, {
        username: 'ana.anic',
        firstName: 'Ana',
        lastName: 'Anic',
        role: 3,
        gender: 1,
        dateOfBirth: new Date(2001, 6, 7),
      }),
    );
    users.push(
      createUser(26, {
        username: 'iva.ivic',
        firstName: 'Iva',
        lastName: 'Ivić',
        role: 3,
        gender: 1,
        dateOfBirth: new Date(2001, 4, 5),
      }),
    );
    users.push(
      createUser(27, {
        username: 'ivica.kicmanvic',
        firstName: 'Ivica',
        lastName: 'Kicmanovic',
        role: 3,
        dateOfBirth: new Date(2007, 8, 5),
      }),
    );
    users.push(
      createUser(28, {
        username: 'lukanizetic',
        firstName: 'Luka',
        lastName: 'Nizetic',
        role: 1,
        dateOfBirth: new Date(1980, 4, 5),
      }),
    );
    users.push(
      createUser(29, {
        username: 'josko.gvardiol',
        firstName: 'Joško',
        lastName: 'Gvardiol',
        role: 1,
        dateOfBirth: new Date(2001, 7, 9),
      }),
    );
    return queryInterface.bulkInsert(TABLE_NAME, users);
  },
  down(queryInterface) {
    return queryInterface.bulkDelete(TABLE_NAME, null, {});
  },
};
