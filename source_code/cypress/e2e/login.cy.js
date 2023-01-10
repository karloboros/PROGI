const userUsername = 'user';
const trainerUsername = 'trainer';
const clubOwnerUsername = 'owner';
const adminUsername = 'admin';

describe('Login Test', () => {
  before(() => {
    cy.task('seed');
  });

  beforeEach(() => {
    cy.visit('/');
  });

  afterEach(() => {
    cy.url().should('be.equal', Cypress.config('baseUrl'));
  });

  it('User should be able to log in', () => {
    cy.login(userUsername);
  });

  it('Trainer should be able to log in', () => {
    cy.login(trainerUsername);
  });

  it('Club Owner should be able to log in', () => {
    cy.login(clubOwnerUsername);
  });

  it('Admin should be able to log in', () => {
    cy.login(adminUsername);
  });
});
