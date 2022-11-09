import {} from 'cypress'

describe('tests integration on /auth/', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/auth/login')
  })
  const emailToDelete = 'testcypress01@test.com'

  it('users should to login correctly and visit their profile page', () => {
    cy.get('input[type="email"]').type('test01@test.com')
    cy.get('input[type="password"]').type('12345678')
    cy.get('button[type="submit"]').click()

    cy.contains('Perfil').click()
    cy.contains('test01').should('contain.text', 'test01')
  })

  it('users should to create a new account', () => {
    cy.contains(' Crea una cuenta').click()
    cy.get('input[type="text"]').type('Usuario cypress 01')
    cy.get('input[type="email"]').type(emailToDelete)
    cy.get('input[type="password"]').type('12345678')
    cy.contains('Continuar').click()

    cy.get('input[placeholder=\'Introduce tu nombre de usuario\']').type('testcypress01')
    cy.get('textarea').type('Soy un simple usuario de prueba que debo de ser eliminado automáticamente')
    cy.contains('Listo!').click()
    cy.wait(1000)
  })

  it('should to show an error when email is not availible on register', () => {
    cy.contains(' Crea una cuenta').click()
    cy.get('input[type="text"]').type('test cypress 01')
    cy.get('input[type="email"]').type('test01@test.com')
    cy.get('input[type="password"]').type('12345678')
    cy.contains('Continuar').click()
    cy.contains('Este correo ya existe').should('exist')
  })

  it('should to show an error when username is not availible on register', () => {
    cy.contains(' Crea una cuenta').click()
    cy.get('input[type="text"]').type('test cypress 01')
    cy.get('input[type="email"]').type(emailToDelete)
    cy.get('input[type="password"]').type('12345678')
    cy.contains('Continuar').click()

    // customize page
    cy.wait(1000)
    cy.get('input[placeholder=\'Introduce tu nombre de usuario\']').type('test01')
    cy.get('textarea').type('soy un usuario de prueba')
    cy.contains('Listo!').click()
    cy.contains('Este nombre de usuario no se encuentra disponible').should('exist')
  })

  after(() => {
    cy.request('DELETE', `http://localhost:5000/api/user/test/${emailToDelete}`)
  })
})


