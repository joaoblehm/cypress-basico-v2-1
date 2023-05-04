/// <reference types="Cypress" />

describe('Buger Eats Cadastro', function () {
    const THREE_SECONDS_IN_MS = 5000 
    beforeEach(function () {
        cy.visit('https://buger-eats-qa.vercel.app/deliver')
        
    })


it('Realizando preenchimento dos dados com comando personalizado', function(){
    cy.preenchimentodedados()
    cy.preenchimentodeendereco()
    
    cy.clock()
    cy.get('input[type="button"]').should('have.a.value', "Buscar CEP").click()
    cy.tick(THREE_SECONDS_IN_MS)
})



})