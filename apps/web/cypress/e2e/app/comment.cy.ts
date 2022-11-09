describe('tests integrations on comment feature', () => {
  before(() => {
    cy.viewport(1280, 720)
    cy.visit('http://localhost:5173/')
    cy.login('test01@test.com', '12345678')
  })

  it('should to create a new comment', () => {
    cy.get('[data-test-id="post-header"]').first().click()
    cy.get('[data-test-id="create-subcomment"]').type('Nuevo commentario')
    cy.contains('Agregar comentario').click()
    cy.contains('Comentario agregado').should('exist')
  })
})

export {}
