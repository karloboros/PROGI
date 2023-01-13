const TABLE_NAME = 'dances';

const createDance = name => {
  return {
    name,
    description: `Plesat ćemo pino i smijati se. Ne trebate imati nikakva predznanja. Zato su tu naši treneri da vam pomognu i učine vaše treninge zabavnima i uspješnima!`,
    image: '/images/dances/thumbnail.png',
    videoUrl: `https://youtu.be/bDHD1ueL4a4}`,
  };
};

module.exports = {
  async up(queryInterface) {
    const dances = [];
    dances.push(createDance('Tango'));
    dances.push(createDance('Samba'));
    dances.push(createDance('Valcer'));
    dances.push(createDance('Cha cha cha'));
    dances.push(createDance('Suvremeni ples'));
    return queryInterface.bulkInsert(TABLE_NAME, dances);
  },

  down(queryInterface) {
    return queryInterface.bulkDelete(TABLE_NAME, null, {});
  },
};
