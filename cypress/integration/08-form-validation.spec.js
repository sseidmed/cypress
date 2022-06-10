/// <reference types="cypress" />

describe('Sign Up', () => {
  beforeEach(() => {
    cy.visit('/echo-chamber/sign-up');
    cy.get('[data-test="sign-up-submit"]').as('submit');
  });

  it('should require an email', () => {
    cy.get('@submit').click();
    
    cy.get('[data-test="sign-up-email"]:invalid')
      .invoke('prop', 'validationMessage')
      .should('contain', 'Please fill out this field');

      cy.get('[data-test="sign-up-email"]:invalid')
        .invoke('prop', 'validity')
        .its('valueMissing')
        .should('be.true');
  });

  it('should require that the email actually be an email address', () => {
    cy.get('[data-test="sign-up-email"]').type('test');
    cy.get('@submit').click()

    cy.get('[data-test="sign-up-email"]:invalid')
      .invoke('prop', 'validationMessage')
      .should('contain', "Please include an '@' in the email address.");
  });

  it('should require a password when the email is present', () => {
    cy.get('[data-test="sign-up-email"]').type('proper@email.com{enter}');
    cy.get('@submit').click()

    cy.get('[data-test="sign-up-password"]:invalid')
      .invoke('prop', 'validity')
      .its('valueMissing')
      .should('be.true');
  });
});
