const TABLE_NAME = 'trainer_applications';

const createTrainerApplication = (data = {}) => {
  const { id, status, trainerId, clubId } = data;

  return {
    id,
    motivationalLetter: '',
    certificate: '',
    status,
    trainerId,
    clubId,
  };
};

module.exports = {
  up(queryInterface) {
    const trainerApplications = [];
    trainerApplications.push(createTrainerApplication({ id: 1, status: 0, trainerId: 1, clubId: 5 }));
    trainerApplications.push(createTrainerApplication({ id: 2, status: 1, trainerId: 1, clubId: 4 }));
    trainerApplications.push(createTrainerApplication({ id: 3, status: 2, trainerId: 4, clubId: 3 }));
    trainerApplications.push(createTrainerApplication({ id: 4, status: 3, trainerId: 9, clubId: 2 }));
    trainerApplications.push(createTrainerApplication({ id: 5, status: 1, trainerId: 2, clubId: 1 }));
    return queryInterface.bulkInsert(TABLE_NAME, trainerApplications);
  },
  down(queryInterface) {
    return queryInterface.bulkDelete(TABLE_NAME, null, {});
  },
};
