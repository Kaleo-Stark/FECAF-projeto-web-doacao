const express = require('express'); // ... Importa a biblioteca Express responsavel pelos recursos WEB.
const  cors   =  require('cors')  ; // ... Importa a biblioteca Cors responsavel por controlar o acesso a API.

const app = express(); // ................ Instancia e atribui na variavel app uma instancia    

app.use    (     cors()     ); // ........ Configura a API para aceitar requisições de qualquer origem com o cors.
app.use    ( express.json() ); // ........ Configura a API para trabalhar com JSON.
app.listen (     3333       ); // ........ Faz a API escutar a porta '3333' do dispositivo servidor da API.

require('./codigos/rotas/index')(app); // ... Trás as rotas da aplicação e passa a variavel app com a instancia do express.