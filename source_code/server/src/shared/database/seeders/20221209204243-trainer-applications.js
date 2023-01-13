const TABLE_NAME = 'trainer_applications';

const createTrainerApplication = ({ status, clubId }) => {
  return {
    motivationalLetter: 'Trust me, I am a good trainer!',
    certificate: '',
    status,
    trainerId: 8,
    clubId,
  };
};

module.exports = {
  up(queryInterface) {
    const trainerApplications = [];
    trainerApplications.push(createTrainerApplication({ status: 0, clubId: 1 }));
    trainerApplications.push(createTrainerApplication({ status: 1, clubId: 1 }));
    trainerApplications.push(createTrainerApplication({ status: 2, clubId: 1 }));
    trainerApplications.push(createTrainerApplication({ status: 0, clubId: 2 }));
    trainerApplications.push(createTrainerApplication({ status: 1, clubId: 2 }));
    trainerApplications.push(createTrainerApplication({ status: 2, clubId: 2 }));
    trainerApplications.push(createTrainerApplication({ status: 0, clubId: 3 }));
    trainerApplications.push(createTrainerApplication({ status: 1, clubId: 3 }));
    trainerApplications.push(createTrainerApplication({ status: 2, clubId: 3 }));
    return queryInterface.bulkInsert(TABLE_NAME, trainerApplications);
  },
  down(queryInterface) {
    return queryInterface.bulkDelete(TABLE_NAME, null, {});
  },
};
