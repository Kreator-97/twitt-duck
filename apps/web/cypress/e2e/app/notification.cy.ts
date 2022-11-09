describe('tests on notifications feature', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5173')
    cy.login('test01@test.com', '12345678')
  })

  it('users should to receive a notification when other user likes a post', () => {
    // first search for the user test02 profile
    cy.contains('@test02').first().click()
    
    // click on any post and give a like click 
    cy.get('[data-test-id="post-header"]').first().click()
    cy.get('[name="Me gusta"]').click()
    
    // logout and login as user test02
    cy.closeSession()
    cy.login('test02@test.com', '12345678')

    // expect 1 notification for this user
    cy.contains('Notificaciones').click()
    cy.contains('Tienes 1 notificación no leída').should('exist')
    cy.contains('Al usuario @test01 le ha gustado tu publicación').should('exist')

    // notifications should mark as read after 4 seconds
    cy.wait(4000)
    cy.contains('No tienes notificaciones nuevas')
    cy.contains('Twitt Duck').click()
  })

  it('users should to receive a notification when other user comment a post', () => {
    // first search for the user test02 profile
    cy.contains('@test02').first().click()

    // click on any post and comment
    cy.get('[data-test-id="post-header"]').first().click()
    cy.get('[data-test-id="create-subcomment"]').type('Este es un comentario')
    cy.contains('Agregar comentario').click()

    // logout and login as user test02
    cy.closeSession()
    cy.login('test02@test.com', '12345678')

    // expect 1 notification for this user
    cy.contains('Notificaciones').click()
    cy.contains('Tienes 1 notificación no leída').should('exist')
    cy.contains('El usuario @test01 comentó tu publicación').should('exist')
    
    // notifications should mark as read after 4 seconds
    cy.wait(4000)
    cy.contains('No tienes notificaciones nuevas')
    cy.contains('Twitt Duck').click()
  })

  it('users should to receive a notification when other user repost a post', () => {
    // first search for the user test02 profile
    cy.contains('@test02').first().click()

    // click on any post and comment
    cy.get('[data-test-id="post-header"]').first().click()
    cy.get('[name="Difundir"]').click()

    // logout and login as user test02
    cy.closeSession()
    cy.login('test02@test.com', '12345678')

    // expect 1 notification for this user
    cy.contains('Notificaciones').click()
    cy.contains('Tienes 1 notificación no leída').should('exist')
    cy.contains('El usuario @test01 difundió tu publicación').should('exist')
    
    // notifications should mark as read after 4 seconds
    cy.wait(4000)
    cy.contains('No tienes notificaciones nuevas')
    cy.contains('Twitt Duck').click()
  })

  afterEach(() => {
    cy.closeSession()
    cy.request('DELETE', 'http://localhost:5000/api/db/reset')
  })
})

export {}
