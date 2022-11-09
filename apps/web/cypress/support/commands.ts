/* eslint-disable @typescript-eslint/no-namespace */

/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>
      register(email: string, password: string, username: string): Chainable<void>
      closeSession(): Chainable<void>
      // drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      // dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      // visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
    }
  }
}

Cypress.Commands.add('login', (email, password) => {
  cy.get('input[type="email"]').type(email)
  cy.get('input[type="password"]').type(password)
  cy.get('button[type="submit"]').click()
})

Cypress.Commands.add('register', (email, password, username) => {
  cy.contains(' Crea una cuenta').click()
  cy.get('input[type="text"]').type('Usuario cypress 01')
  cy.get('input[type="email"]').type(email)
  cy.get('input[type="password"]').type(password)
  cy.contains('Continuar').click()

  cy.get('input[placeholder=\'Introduce tu nombre de usuario\']').type(username)
  cy.get('textarea').type('Soy un simple usuario de prueba que debo de ser eliminado automáticamente')
  cy.contains('Listo!').click()
  cy.wait(1000)
})

Cypress.Commands.add('closeSession', () => {
  cy.get('[data-test-id="menu-app"]').click()
  cy.contains('Cerrar sesión').click()
  cy.get('[data-test-id="confirm-logout"]').click()
})

export {}
