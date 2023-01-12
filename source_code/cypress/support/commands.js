import 'cypress-file-upload';

Cypress.Commands.add('findByAriaLabel', ariaLabel => {
  cy.get(`[aria-label="${ariaLabel}"]`);
});

Cypress.Commands.add('login', role => {
  cy.findByAriaLabel('username').type(role);
  cy.findByAriaLabel('password').type('123');
  cy.contains('Login').click();
});

Cypress.Commands.add('register', newUser => {
  cy.findByAriaLabel('username').type(newUser.username);
  cy.findByAriaLabel('firstName').type(newUser.firstName);
  cy.findByAriaLabel('lastName').type(newUser.lastName);
  cy.findByAriaLabel('email').type(newUser.email);
  cy.findByAriaLabel('form').click();
  cy.findByAriaLabel('password').type(newUser.password);
  cy.findByAriaLabel('male').click();
  cy.findByAriaLabel('date').type(newUser.dateOfBirth);
  cy.findByAriaLabel('form').click();
  cy.findByAriaLabel('phone').type(newUser.phoneNumber);
  cy.findByAriaLabel('experience').type(newUser.experienceDescription);

  const picture = 'preuzmi.png';
  cy.get('input[type="file"]').attachFile(picture);
  
  cy.contains('Register').click();
});
