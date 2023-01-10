Cypress.Commands.add('findByAriaLabel', ariaLabel => {
  cy.get(`[aria-label="${ariaLabel}"]`);
});

Cypress.Commands.add('login', role => {
  cy.findByAriaLabel('username').type(role);
  cy.findByAriaLabel('password').type('123');
  cy.contains('Login').click();
});
