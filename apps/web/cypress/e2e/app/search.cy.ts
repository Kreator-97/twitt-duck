
describe('tests on search feature', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173')
    cy.login('test01@test.com', '12345678')
  })

  it('should to find a user by his username', () => {
    cy.get('input[type="search"]').first().type('test02').type('{enter}')
    cy.contains('Resultados de búsqueda para "test02"').should('exist')
    cy.contains('Usuarios encontrados').should('exist')
  })
  
  it('should to find any post by searching', () => {
    const query = 'prueba'
    cy.get('input[type="search"]').first().type(query).type('{enter}')
    cy.contains(`Resultados de búsqueda para "${query}"`).should('exist')
    cy.contains('Publicaciones encontradas').should('exist')
  })
})

export {}
