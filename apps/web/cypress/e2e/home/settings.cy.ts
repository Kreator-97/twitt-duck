import {} from 'cypress'

describe('tests on settings page', () => {
  const email = 'test-settings@test.com'

  before(() => {
    cy.visit('http://localhost:5173/')
    cy.register( email, '12345678', 'test-settings')
  })

  it('users should to update their profile', () => {
    cy.get('[data-test-id="menu-app"]').click()
    cy.contains('Configuración').click()

    cy.get('input[name="fullname"]').clear().type('Nombre actualizado')
    cy.get('input[name="username"]').clear().type('username-actualizado')
    cy.get('input[name="description"]').clear().type('Descripción actualizada')
    cy.contains('Guardar cambios').click()
    cy.contains('Información actualizada correctamente').should('exist')
  })

  it.only('users should to change password correctly, logout and login with new password', () => {
    cy.get('[data-test-id="menu-app"]').click()
    cy.contains('Configuración').click()
    cy.contains('Contraseña').click()

    cy.get('input[name="currentPassword"]').type('12345678')
    cy.get('input[name="newPassword"]').type('newpassword')

    cy.contains('Cambiar contraseña').click()
    cy.get('[data-test-id="menu-app"]').click()
    cy.contains('Cerrar sesión').click()
    
    cy.get('[data-test-id="confirm-logout"]').click()
    cy.wait(2000)
    cy.login(email, 'newpassword')
    cy.contains('Has iniciado sesión exitosamente').should('exist')
  })

  after(() => {
    cy.request('DELETE', `http://localhost:5000/api/user/test/${email}`)
  })
})

