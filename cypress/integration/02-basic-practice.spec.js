/// <reference types="cypress" />

describe('Basic Practice', () => {
  beforeEach(() => {
    cy.visit('/jetsetter');
  });

  describe('Adding a new item', () => {
    it('should put a new item on the page after clicking on "Add Item"', () => {
      cy.get('[data-test="new-item-input"]').type('Good attitude')
      cy.get('[data-test="add-item"]').click()
      cy.contains('Good attitude')
    });

    it('should put a new item in the "Unpacked Items" list', () => {
      cy.get('[data-test="new-item-input"]').type('Good attitude')
      cy.get('[data-test="add-item"]').click()
      cy.get('[data-test="items"]').contains('Good attitude')
    });

    it('should put a new item as the last item in the "Unpacked Items" list', () => {
      cy.get('[data-test="new-item-input"]').type('Good attitude')
      cy.get('[data-test="add-item"]').click()
      cy.get('[data-test="items-unpacked"] li' ).last().contains('Good attitude')
    });
  });

  describe('Filtering items', () => {
    it('should show items that match whatever is in the filter field', () => {
      cy.get('[data-test="filter-items"]').type('ip')
      cy.get('[data-test="items"]').contains('iPhone Charger')
    });

    it('should hide items that do not match whatever is in the filter field', () => {
      cy.get('[data-test="filter-items"]').type('ip')
      cy.get('[data-test="items"]').contains('Toothbrush').should('not.exist')
    });
  });

  describe('Removing items', () => {
    describe('Remove all', () => {
      it('should remove all of the items', () => {
        cy.get('[data-test="remove-all"]').click()
        cy.get('[data-test="items"] li').should('not.exist')
      });
    });

    describe('Remove individual items', () => {
      it('should have a remove button on an item', () => {
        cy.get('[data-test="items"] li').each((li) => {
          cy.wrap(li).get('[data-test="remove"]').should('exist')
        })
      });

      it('should remove an item from the page', () => {
        cy.get('[data-test="items"] li')
          .first()
          .within(() => cy.get('[data-test="remove"]').click())
          .should('not.exist')
      });
    });
  });

  describe('Mark all as unpacked', () => {
    it('should empty out the "Packed" list', () => {
      cy.get('[data-test="mark-all-as-unpacked"]').click()
      cy.get('[data-test="items-packed"] li').should('not.exist')
      cy.get('[data-test="items-packed"]').contains('No items to show.')
    });

    it('should empty have all of the items in the "Unpacked" list', () => {});
  });

  describe('Mark individual item as packed', () => {
    it('should move an individual item from "Unpacked" to "Packed"', () => {});
  });
});
