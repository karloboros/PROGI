const TABLE_NAME = 'trainer_applications';

const createTrainerApplication = ({ status, clubId, trainerId }) => {
  return {
    motivationalLetter: 'Trust me, I am a good trainer!',
    certificate: '/pdf/trainerApplications/thumbnail.pdf',
    status,
    trainerId,
    clubId,
  };
};

module.exports = {
  up(queryInterface) {
    const trainerApplications = [];
    trainerApplications.push(createTrainerApplication({ status: 1, clubId: 1, trainerId: 8 }));
    trainerApplications.push(createTrainerApplication({ status: 1, clubId: 1, trainerId: 13 }));
    trainerApplications.push(createTrainerApplication({ status: 1, clubId: 1, trainerId: 14 }));
    trainerApplications.push(createTrainerApplication({ status: 1, clubId: 2, trainerId: 8 }));
    trainerApplications.push(createTrainerApplication({ status: 1, clubId: 2, trainerId: 13 }));
    trainerApplications.push(createTrainerApplication({ status: 1, clubId: 3, trainerId: 14 }));
    trainerApplications.push(createTrainerApplication({ status: 1, clubId: 4, trainerId: 13 }));
    trainerApplications.push(createTrainerApplication({ status: 1, clubId: 5, trainerId: 13 }));
    trainerApplications.push(createTrainerApplication({ status: 1, clubId: 6, trainerId: 14 }));
    trainerApplications.push(createTrainerApplication({ status: 0, clubId: 1, trainerId: 1 }));
    trainerApplications.push(createTrainerApplication({ status: 0, clubId: 1, trainerId: 2 }));
    trainerApplications.push(createTrainerApplication({ status: 0, clubId: 1, trainerId: 3 }));
    trainerApplications.push(createTrainerApplication({ status: 0, clubId: 1, trainerId: 4 }));
    trainerApplications.push(createTrainerApplication({ status: 0, clubId: 1, trainerId: 5 }));
    return queryInterface.bulkInsert(TABLE_NAME, trainerApplications);
  },
  down(queryInterface) {
    return queryInterface.bulkDelete(TABLE_NAME, null, {});
  },
};
