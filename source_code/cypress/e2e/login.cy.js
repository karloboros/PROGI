const userUsername = 'user';
const trainerUsername = 'trainer';
const clubOwnerUsername = 'owner';
const adminUsername = 'admin';

describe('Login Test', () => {
  it('User should be able to log in', () => {
    cy.visit('/');
    cy.login(userUsername);
    cy.url().should('be.equal', Cypress.config('baseUrl'));
  });

  it('Trainer should be able to log in', () => {
    cy.visit('/');
    cy.login(trainerUsername);
    cy.url().should('be.equal', Cypress.config('baseUrl'));
  });

  it('Club Owner should be able to log in', () => {
    cy.visit('/');
    cy.login(clubOwnerUsername);
    cy.url().should('be.equal', Cypress.config('baseUrl'));
  });

  it('Admin should be able to log in', () => {
    cy.visit('/');
    cy.login(adminUsername);
    cy.url().should('be.equal', Cypress.config('baseUrl'));
  });
});
