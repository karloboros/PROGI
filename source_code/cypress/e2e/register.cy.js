const newUser = {
  username: 'username',
  firstName: 'Username',
  lastName: 'LastName',
  email: 'username@gmail.com',
  password: '12345',
  dateOfBirth: '2003-01-06',
  phoneNumber: '0911111111',
  experienceDescription: 'Some experience',
};

const invalidMail = {
  username: 'invalidMail',
  firstName: 'Username',
  lastName: 'LastName',
  email: 'usernamegmail.com',
  password: '12345',
  dateOfBirth: '2003-01-06',
  phoneNumber: '0911111111',
  experienceDescription: 'Some experience',
};

describe('Register Test', () => {
  before(() => {
    cy.task('seed');
  });

  beforeEach(() => {
    cy.visit('/auth');
    cy.contains('Click here to register').click();
  });

  it('Unregistered user should be able to register', () => {
    cy.register(newUser);
    cy.url().should('be.equal', Cypress.config('baseUrl'));
  });

  it('Unregistered user with invalid email should not be able to register', () => {
    cy.register(invalidMail);

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
