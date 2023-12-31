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
    cy.contains('Login').click();
  });

  it('User should be able to log in', () => {
    cy.login(userUsername);
    cy.url().should('be.equal', Cypress.config('baseUrl'));
  });

  it('Trainer should be able to log in', () => {
    cy.login(trainerUsername);
    cy.url().should('be.equal', Cypress.config('baseUrl'));
  });

  it('Club Owner should be able to log in', () => {
    cy.login(clubOwnerUsername);
    cy.url().should('be.equal', Cypress.config('baseUrl'));
  });

  it('Admin should be able to log in', () => {
    cy.login(adminUsername);
    cy.url().should('be.equal', Cypress.config('baseUrl'));
  });

  it('User with username field missing should not be able to log in', () => {
    cy.findByAriaLabel('password').type('123');
    cy.contains('Login').click();
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

    cy.url().should('be.equal', 'http://localhost:3000/auth');
  });
});
