import {} from 'cypress'

describe('tests on home page', () => {

  beforeEach(() => {
    cy.viewport(1280, 720)
    cy.visit('http://localhost:5173')
    cy.login('test01@test.com', '12345678')
  })

  it('should to visit home page without errors', () => {
    cy.wait(2000)
    cy.contains('Perfil').click()
    cy.contains('A quien seguir').should('exist')
  })
  
  it.only('should can click over all toolbar options', () => {
    cy.wait(2000)

    cy.contains('Notificaciones').click()
    cy.contains('No tienes notificaciones').should('exist')

    cy.contains('Explorar').click()
    cy.contains('Usuarios que puedes seguir').should('exist')
    cy.contains('Publicaciones que te pueden interesar').should('exist')

    cy.contains('Perfil').click()
    cy.contains('@test01').should('exist')
    cy.contains('Twitt Duck').click()
  })

  after(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  })
})
