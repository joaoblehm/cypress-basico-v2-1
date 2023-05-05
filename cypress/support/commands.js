const faker = require('faker-br')




Cypress.Commands.add('preenchimentodedados',function(){
    let nomeCompleto = faker.name.findName()
    let meuCpf = faker.br.cpf()
    let meuEmail = faker.internet.email(nomeCompleto)
    let meuTelefone = faker.phone.phoneNumber('(##) # ####-####');
    
   
    cy.get('input[name="fullName"]').type(nomeCompleto)
    cy.get('input[name="cpf"]').type(meuCpf)
    cy.get('input[name="email"]').type(meuEmail)
    cy.get('input[name="whatsapp"]').type(meuTelefone)
})

Cypress.Commands.add('preenchimentodeendereco',function(){
    //let meuEndereco = faker.address.zipCodeByState('RS')
    let meuNumero = faker.random.number({min: 1, max: 500})
    let meuComplemento = faker.address.secondaryAddress()

    cy.get('input[name="postalcode"]').type('90030-130')
    cy.get('input[name="address-number"]').type(meuNumero)
    cy.get('input[name="address-details"]').type(meuComplemento)
})