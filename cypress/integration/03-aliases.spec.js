/// <reference types="cypress" />


// Make an alias for the filter input.
// Type a search term into that filter.
// Verify that only items match that filter are shown on the page.


describe('Aliases', () => {
  beforeEach(() => {
    cy.visit('/jetsetter');
    cy.get('[data-test="items"]').as('items')
    cy.get('[data-test="items-unpacked"]').as('unpackedItems');
    cy.get('[data-test="items-packed"]').as('packedItems');

    cy.get('[data-test="filter-items"]').as('inputFilter');
  });

  it('should only show items that match the filter search word', () => {
    cy.get('@inputFilter').type('Tooth')
    cy.get('@items').contains('Tooth Brush');

    // Different way
    cy.get('@items').should('include.text', 'Tooth Paste')
  })
});
