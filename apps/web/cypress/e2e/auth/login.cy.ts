import {} from 'cypress'

describe('tests integration on /auth/', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/auth/login')
  })
  const email = 'testcypres01@test.com'

  it('users should to login correctly and visit their profile page', () => {
    cy.get('input[type="email"]').type('test01@test.com')
    cy.get('input[type="password"]').type('12345678')
    cy.get('button[type="submit"]').click()

    cy.contains('Perfil').click()
    cy.contains('test01')
  })

  it.only('users should to create a new account', () => {
    cy.contains(' Crea una cuenta').click()
    cy.get('input[type="text"]').type('Usuario cypress 01')
    cy.get('input[type="email"]').type(email)
    cy.get('input[type="password"]').type('12345678')
    cy.contains('Continuar').click()

    cy.get('input[placeholder=\'Introduce tu nombre de usuario\']').type('testcypress01')
    cy.get('textarea').type('Soy un simple usuario de prueba que debo de ser eliminado automáticamente')
    cy.contains('Listo!').click()
    cy.wait(1000)
  })

  after(() => {
    cy.request('DELETE', `http://localhost:5000/api/user/test/${email}`)
  })
})


