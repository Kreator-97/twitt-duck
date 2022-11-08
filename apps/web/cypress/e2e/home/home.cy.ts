import {} from 'cypress'

describe('tests on home page', () => {
  it('should to visit home page without errors', () => {
    cy.visit('http://localhost:5173')
  })
})
