Cypress.Commands.add('findByAriaLabel', ariaLabel => {
  cy.get(`[aria-label="${ariaLabel}"]`);
});
