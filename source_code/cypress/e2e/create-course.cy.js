const username = 'mateja.golec';
const name = 'Test course';
const description = 'Test course description';
const capacity = 24;
const applicationDeadline = '2023-12-12';
const locationName = 'NSB';
const coordinates = '45.815399, 15.966568';
const dance = 'Tango';
const trainer = 'Lucija Domić';
const invalidDate = '12-12';

describe('Create Course Test', () => {
  before(() => {
    cy.task('seed');
  });

  beforeEach(() => {
    cy.visit('/auth');
    cy.login(username);
    cy.contains('Courses').click();
    cy.contains('Create course').click();
  });

  it('Club owner should create a course', () => {
    cy.createCourse({
      name,
      description,
      capacity,
      applicationDeadline,
      locationName,
      coordinates,
      dance,
      trainer,
    });
  });

  it('Club owner should fail creating a course', () => {
    cy.createCourse({
      name,
      description,
      capacity,
      applicationDeadline: invalidDate,
      locationName,
      coordinates,
      dance,
      trainer,
    });

    const caught = {
      message: null,
    };

    Cypress.on('uncaught:exception', (err, runnable, promise) => {
      caught.message = err.message;
      if (promise) return false;
    });

    cy.wrap(caught).should(c => {
      expect(c.message).to.include('unhandled promise rejection');
    });
  });
});
