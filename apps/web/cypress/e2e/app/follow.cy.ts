describe('tests over follow feature', () => {
  beforeEach(() => {
    cy.viewport(1280, 720)
    cy.visit('http://localhost:5173')
    cy.login('test01@test.com', '12345678')
  })

  it('should to follow a user correctly', () => {
    cy.contains('Seguir').first().click()
    cy.contains('Siguiendo').should('exist').click().should('have.text', 'Seguir')
  })
})

export {}
