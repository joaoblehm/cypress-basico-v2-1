#language: pt
 
Funcionalidade: Cadastro
    Como usuário não cadastrado
    Quero realizaro cadastro na aplicação
    Para realizar login
    
Contexto: Estar na pagina de cadastro da buger-eats
    Dado que esteja na pagina de cadastro
    E que possua informações válidas de cadastro
 
Cenário 001:  Cadastrar usuario valido
    Quando preencher os dados com informações validas
    E enviar a solicitação de cadastro
    Então deverá ser mostrado a imagem de confirmação de cadastro

Cenário 002:  Cadastrar usuario invalido
    Quando preencher os dados com informações nulas/invalidas
    E enviar a solicitação de cadastro
    Então deverá ser mostrado uma mensagem de erro nos campos preenchido de forma invalida     