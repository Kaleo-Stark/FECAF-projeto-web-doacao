const rotasDoacao = require('./doacao'); // ... Trás as rotas sobre doacoes.

module.exports = (app) => { // ................ Exporta as instancias de rotas.
    rotasDoacao(app); // ...................... Instancia as rotas de doacao.
}