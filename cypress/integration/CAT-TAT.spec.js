/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    const THREE_SECONDS_IN_MS = 3000 // VARIAVEL COM TEMPO DE 3 SEGUNDOS PARA TICK
    beforeEach(function () {
        cy.visit('./src/index.html')
    })

    it('Verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT') //verificação do titulo da aba

    })

    it('Preenche os campos obrigatórios e envia o formulário', function () {
        cy.clock()//congelar relogio do navegador
        cy.get('#firstName').type('João')
        cy.get('#lastName').type('Blehm')
        cy.get('#email').type('joaoblehm@gmail.com')
        cy.get('#phone').type('51997405046')
        cy.get('#open-text-area').type('Curso de automação com Cypress Básico', { delay: 0 }) //remoção de delay de digitação
        cy.contains('button', 'Enviar').click() // Utilização do Contains

        cy.get('.success').should('be.visible') //Verificação de alertas span
        cy.tick(THREE_SECONDS_IN_MS)//avançando no tempo 3 segundos
        cy.get('.success').should('not.be.visible') 
    })

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.clock()
        cy.contains('button', 'Enviar').click() //refirando a busca
        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)//avançando no tempo 3 segundos
        cy.get('.error').should('not.be.visible')
    })

    Cypress._.times(3, function(){ //Comando para repetir o teste varias vezes
        it('Campo telefone continua vazio quando preenchido com valor não numérico', function () {
            cy.get('#phone')
                .type('teste')
                .should('have.value', '') //validando valor vazio
        })
    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.clock()
        cy.get('#firstName').type('João')
        cy.get('#lastName').type('Blehm')
        cy.get('#email').type('joaoblehm@gmail.com')
        cy.get('#open-text-area').type('Curso de automação com Cypress Básico', { delay: 0 })
        cy.get('#phone-checkbox').click()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)//avançando no tempo 3 segundos
        cy.get('.error').should('not.be.visible')
        cy.clock()
        cy.get('#phone').type('51997405046')
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)//avançando no tempo 3 segundos
        cy.get('.success').should('not.be.visible')
    })

    it('Preenche e limpa os campos nome, sobrenome, email e telefone', function () {// Função para limpar campos e validar
        cy.get('#firstName').type('João').should('have.value', 'João').clear().should('have.value', '')
        cy.get('#lastName').type('Blehm').should('have.value', 'Blehm').clear().should('have.value', '')
        cy.get('#email').type('joaoblehm@gmail.com').should('have.value', 'joaoblehm@gmail.com').clear().should('have.value', '')
        cy.get('#phone').type('51997405046').should('have.value', '51997405046').clear().should('have.value', '')
    })

    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.clock()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)//avançando no tempo 3 segundos
        cy.get('.error').should('not.be.visible')
    })

    it('Envia o formuário com sucesso usando um comando customizado', function () {
        cy.clock()
        cy.fillMandatoryFieldsAndSubmit() //Mandatory - Comando customizado para preenchimento das info
        cy.get('.success').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)//avançando no tempo 3 segundos
        cy.get('.success').should('not.be.visible')
    })

    it('Seleciona um produto (YouTube) por seu texto', function () {

        cy.get('#product').select('YouTube').should('have.value', 'youtube')//Utilização do Select pelo texto
        cy.fillMandatoryFieldsAndSubmit()

    })

    it('Seleciona um produto (Mentoria) por seu valor (value)', function () {//Utilização do Select pelo valor

        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
        cy.fillMandatoryFieldsAndSubmit()
    })

    it('Seleciona um produto (Blog) por seu índice', function () {//Utilização do Select pelo indice

        cy.get('#product').select(1).should('have.value', 'blog')
        cy.fillMandatoryFieldsAndSubmit()
    })

    it('Marca o tipo de atendimento "Feedback"', function () {//Utilização do check  selecionando radio

        cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
        cy.fillMandatoryFieldsAndSubmit()
    })

    it('Marca cada tipo de atendimento', function () {//Utilização do check, wrap e each no array

        cy.get('input[type="radio"]').should('have.length', 3)
            .each(function ($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')

            })
    })

    it('Marca ambos checkboxes, depois desmarca o último', function () {//Utilização do check para checkbox e uncheck, last
        cy.get('input[type="checkbox"]').check().should('be.checked').last().uncheck().should('not.be.checked')

    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.clock()
        cy.get('#firstName').type('João')
        cy.get('#lastName').type('Blehm')
        cy.get('#email').type('joaoblehm@gmail.com')
        cy.get('#open-text-area').type('Curso de automação com Cypress Básico', { delay: 0 })
        cy.get('#phone-checkbox').check()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)//avançando no tempo 3 segundos
        cy.get('.error').should('not.be.visible')
        cy.clock()
        cy.get('#phone').type('51997405046')
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)//avançando no tempo 3 segundos
        cy.get('.success').should('not.be.visible')
    })


    it('Seleciona um arquivo da pasta fixtures', function () {//Adicionar arquivos por Upload
        cy.get('input[type="file"]#file-upload')
            .selectFile('cypress/fixtures/example.json')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json') // verificando se o arquivo certo está selecionado
            })

    })
    it('Seleciona um arquivo simulando um drag-and-drop', function () {
        cy.get('input[type="file"]')
            .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })

    })

    it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
        cy.fixture('example.json').as('sampleFile') //utilização da fixture
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () { // encontrar o target
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })


    it('Acessa a página da política de privacidade removendo o target e então clicando no link', function () { // encontrar o target e remover para carregar aba na mesma tela do cypress
        cy.get('#privacy a')
        .invoke('removeAttr', 'target')// utilização do invoke
        .click()

        cy.contains('Talking About Testing')
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => { //validando show e hide do display do span
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')
        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
      })
  
      it('preenche a area de texto usando o comando invoke',function(){ // utilizando o repeat e invoke para criar textos longos
        const longText= Cypress._.repeat('teste',50)

        cy.get('#open-text-area')
        .invoke('val', longText)
        .should('have.value', longText)
      })

      it('faz uma requisição HTTP',function(){ //fazendo uma requisição nivel de rede para aplicação web
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
        .should(function(response){
            const {status, statusText, body} = response
            expect(status).to.equal(200)
            expect(statusText).to.equal('OK')
            expect(body).to.include('CAC TAT')

        })
      })

      it('Desafio do gato', () => { //encontrando o gato
        cy.get('#cat')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          cy.get('#title')
          .invoke('text', 'CAT TAT') //Mudando texto
          cy.get('#subtitle')
          .invoke('text', 'Eu ❤ gatos!')//Mudando texto

      })
})
