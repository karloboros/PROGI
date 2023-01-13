const TABLE_NAME = 'clubs';

const createClub = (index, name, email, approvalStatus, ownerId, locationId) => {
  return {
    name,
    phone: `09578652${index}`,
    email,
    description:
      'Naš Klub bavi se svim mogućim plesovima na koje možete pomisliti i osigurava vam da dozivite svijet plesa bili vi početnik ili iskusan plesač. Svi su slobodni pridružiti se ako su spremni na druženje sa opuštenom ekipom.',
    approvalStatus,
    ownerId,
    locationId,
  };
};

module.exports = {
  up(queryInterface) {
    const clubs = [];
    clubs.push(createClub(1, 'Plesni studio bonita', 'bonita@gmail.com', 1, 7, 1));
    clubs.push(createClub(2, 'Plesni studio Hola', 'hola@gmail.com', 1, 10, 2));
    clubs.push(createClub(3, 'Plesni studio Lalala', 'lalala@gmail.com', 1, 12, 3));
    clubs.push(createClub(4, 'Plesni studio Nola', 'nola1@gmail.com', 1, 11, 4));
    clubs.push(createClub(5, 'Plesni studio 2', 'nola2@gmail.com', 1, 22, 5));
    clubs.push(createClub(6, 'Plesni studio 3', 'nola3@gmail.com', 1, 23, 6));
    return queryInterface.bulkInsert(TABLE_NAME, clubs);
  },
  down(queryInterface) {
    return queryInterface.bulkDelete(TABLE_NAME, null, {});
  },
};
