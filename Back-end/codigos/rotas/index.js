const doacaoControle = require("../controle/doacao"); // ... Importa as funções de controle de doação e armazena na constante doacaoControle.

module.exports = (app) => { // ............................. Exporta as rotas configuradas e associadas com as funções de controle das doações.
    app.get    ('/doacoes', doacaoControle.get   ), // ..... Configura uma rota GET no caminho /doacoes para chamar a função responsável por trazer a lista de doações.

    app.post   ('/doacao' , doacaoControle.post  ), // ..... Configura uma rota POST no caminho /doacao para chamar a função responsável por salvar uma doação.

    app.put    ('/doacao' , doacaoControle.put   )  // ..... Configura uma rota PUT no caminho /doacao para chamar a função responsável por alterar o status de uma doação.
};