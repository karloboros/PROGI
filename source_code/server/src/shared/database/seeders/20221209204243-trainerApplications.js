const TABLE_NAME = 'trainerApplications';

const createTrainerApplication = index => {
  return {
    id: index,
    motivationalLetter: "I lift 200 pounds in bench. I'm a good coach!",
    certificate: "I didn't write this myself, but I can coach people. For real!",
    status: (index % 3) + 1,
    trainerId: index,
    clubId: 69,
  };
};

module.exports = {
  up(queryInterface) {
    const trainerApplications = [];
    for (let i = 1; i < 6; i++) trainerApplications.push(createTrainerApplication(i));
    return queryInterface.bulkInsert(TABLE_NAME, trainerApplications);
  },
  down(queryInterface) {
    return queryInterface.bulkDelete(TABLE_NAME, null, {});
  },
};
