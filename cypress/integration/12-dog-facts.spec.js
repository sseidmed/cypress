/// <reference types="cypress" />

describe('Dog Facts', () => {
  beforeEach(() => {
    cy.visit('/dog-facts');

    cy.get('[data-test="fetch-button"]').as('fetchButton');
    cy.get('[data-test="clear-button"]').as('clearButton');
    cy.get('[data-test="amount-select"]').as('amountSelect');
    cy.get('[data-test="empty-state"]').as('emptyState');

    cy.intercept('/dog-facts/api?*').as('api');
  });

  it('should start out with an empty state', () => {
    cy.get('@emptyState').contains('Fetch some dog facts or something.');
  });

  it('should make a request when the button is called', () => {
    cy.get('@fetchButton').click();
    cy.wait('@api');
  });

  it('should adjust the amount when the select is changed', () => {});

  it('should show the correct number of facts on the page', () => {
    cy.get('@amountSelect').select('2');
    cy.get('@fetchButton').click();
    cy.get('[data-test="dog-fact"]').as('dogFacts');
    cy.get('@dogFacts').should('have.length', '2');
  });

  it('should clear the facts when the "Clear" button is pressed', () => {
    cy.get('@clearButton').click();
    cy.get('[data-test="dog-fact"]').should('not.exist');
    cy.get('@emptyState').contains('Fetch some dog facts or something.');
  });

  it("should reflect the number of facts we're looking for in the title", () => {});
});
