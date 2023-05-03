Cypress.Commands.add('fillMandatoryFieldsAndSubmit',function(){
    cy.get('#firstName').type('João')
    cy.get('#lastName').type('Blehm')
    cy.get('#email').type('joaoblehm@gmail.com')
    cy.get('#phone').type('51997405046')
    cy.get('#open-text-area').type('Curso de automação com Cypress Básico', {delay: 0}) 
    cy.contains('button','Enviar').click()
})