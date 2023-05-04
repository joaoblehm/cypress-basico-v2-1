const faker = require('faker-br')




Cypress.Commands.add('preenchimentodedados',function(){
    let fullNameFaker = faker.br.name.findName()
    let geradorCpf = faker.br.cpf()
   
    cy.get('input[name="fullName"]').type(fullNameFaker)
    cy.get('input[name="cpf"]').type(geradorCpf)
    cy.get('input[name="email"]').type('joao.blehm@compasso.com.br')
    cy.get('input[name="whatsapp"]').type('51997405079')
})

Cypress.Commands.add('preenchimentodeendereco',function(){
    cy.get('input[name="postalcode"]').type('94075000')
    cy.get('input[name="address-number"]').type('940')
    cy.get('input[name="address-details"]').type('Casa')
})