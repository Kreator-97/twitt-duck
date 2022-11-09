import {} from 'cypress'

describe('tests on post actions', () => {
  before(() => {
    cy.viewport(1280, 720)
    cy.visit('http://localhost:5173/')
    cy.login('test01@test.com', '12345678')
  })

  it('users should to create new posts', () => {
    cy.get('#create-post').type('Esta es una publicación nueva')
    cy.contains('Publicar').click()
    cy.contains('Publicación creada').should('exist')
  })

  it('should to create a new post including images', () => {
    cy.get('#create-post').type('Esta es una prueba con imagenes')
    cy.get('[data-test-id="select-img"]').selectFile('/home/kreator/Escritorio/proyectos/twitt-duck/apps/web/cypress/fixtures/img-post.jpeg', { force: true})
    cy.contains('Publicar').click()
  })

  it('users should be able to like a post', () => {
    cy.get('[data-test-id="post-header"]').first().click()
    cy.get('[name="Me gusta"]').first().as('like').click()
    cy.wait(2000)
    cy.scrollTo('100px', 0)
    cy.get('@like').should('have.css', 'color','rgb(245, 101, 101)')
    cy.get('@like').click()
  })

  it.only('users should be able to repost a post' , () => {
    cy.get('[data-test-id="post-header"]').first().click()
    cy.get('[name="Difundir"]').as('repost').click()
    cy.wait(2000)
    cy.get('@repost').should('have.css', 'color','rgb(245, 101, 101)')
    cy.get('@repost').click()
    cy.wait(1000)
    cy.contains('Quitar difusión').click()
    cy.contains('Has dejado de difundir esta publicación')
  })
})
