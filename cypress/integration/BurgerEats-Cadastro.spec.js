/// <reference types="Cypress" />

describe('Buger Eats Cadastro', function () {
    const THREE_SECONDS_IN_MS = 5000
    beforeEach(function () {
        cy.visit('https://buger-eats-qa.vercel.app/deliver')

    })


    it('Realizando preenchimento dos dados com comando personalizado', function () {
        cy.preenchimentodedados()
        cy.preenchimentodeendereco()

        cy.clock()
        cy.get('input[type="button"]').should('have.a.value', "Buscar CEP").click()
        cy.tick(THREE_SECONDS_IN_MS)
    })

    it('Seleção de metodo de entrega randomica', function () {

        const options = [
            'Moto',
            'Bike Elétrica',
            'Van/Carro'
        ];

        const randomIndex = Math.floor(Math.random() * options.length);
        const selectedOption = options[randomIndex];

        switch (selectedOption) {
            case 'Moto':
                cy.get('img[alt="Moto"]').click();
                break;
            case 'Bike Elétrica':
                cy.get('img[alt="Bike Elétrica"]').click();
                break;
            case 'Van/Carro':
                cy.get('img[alt="Van/Carro"]').click();
                break;

        }


    })

    it.only('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
        cy.contains('Foto da sua CNH').attachFile({
            fileContent: this.imageData,
            fileName: 'cnh.jpg',
            mimeType: 'image/jpg'
        })



    })



})