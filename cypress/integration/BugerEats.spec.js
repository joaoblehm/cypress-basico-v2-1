/// <reference types="Cypress" />

    describe('Buger Eats', function () {
       
        beforeEach(function () {
            cy.visit('https://buger-eats-qa.vercel.app')
            
        })

        it('Verifica o título da aplicação', function () {
            cy.title().should('be.equal', 'Buger Eats') 
    
        })
        
     
  
        it('Verifica conteudo de texto da pagina', function () {
            cy.get('h1').should('have.text', 'Seja um parceiro entregador pela Buger Eats')

            cy.get('p').should('have.text', 'Em vez de oportunidades tradicionais de entrega de refeições em horários pouco flexíveis, seja seu próprio chefe.')
    
        })

       

    })