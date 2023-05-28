const express = require('express'); // ... Importa a biblioteca Express responsavel pelos recursos WEB.
const  cors   =  require('cors')  ; // ... Importa a biblioteca Cors responsavel por controlar o acesso a API.

const expressRecusosWeb = express(); // ................ Instancia e atribui na variavel expressRecusosWeb uma instancia    

expressRecusosWeb.use    (     cors()     ); // ........ Configura a API para aceitar requisições de qualquer origem com o cors.
expressRecusosWeb.use    ( express.json() ); // ........ Configura a API para trabalhar com JSON.
expressRecusosWeb.listen (     3333       ); // ........ Faz a API escutar a porta '3333' do dispositivo servidor da API.

require('./codigos/rotas/configuracao')(expressRecusosWeb); // ... Trás as rotas da aplicação e passa a variavel expressRecusosWeb com a instancia do express.