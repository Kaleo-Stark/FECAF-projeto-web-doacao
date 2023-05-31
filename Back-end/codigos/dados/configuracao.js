const mysql = require('mysql2'); // ................................. Importa a biblioteca com os códigos relacionados ao banco de dados.
const dataHoraAtual = require('../ferramentas/dataHoraAtual'); // ... Importa as funções de feramenta para pegar a data e hora atual.
const arquivoAtual = "./codigos/dados/configuracao.js"; // .......... Configura uma variavel com o caminho do arquivo atual para ser utilizado em logs.

const dadosDeConexao = { // .......................... Atribui na variavel dadosDeConexao os dados necessarios para realizar a conexão com o banco de dados.
    host: 'localhost', // ............................ Host de onde o banco de dados está disponivel.
    port: 3306, // ................................... Porta de acesso para o banco de dados.
    user: '<User do banco de dados aqui>', // ........ Usuário a ser utilizado no acesso ao banco de dados.
    password: '<Senha do banco de dados aqui>', // ... Senha do usuário utilizado para acessar o banco de dados.
    database: 'fecaf_doacoes' // ..................... Nome do banco de dados que será utilizada pelo serviço.
};

const dadosBD = { // ...................... Atribui na variavel dadosBD informações para facilitar a manipulação dos dados no banco de dados.
    doacaoTabela: "doacao_registro", // ... Nome da tabela que será utilizada.
    doacaoCampos: "nome, telefone, ruaAvenida, cidade, bairro, cep, numero, perecivel, descricao, disponibilidade, coletado", // ... Campos da tabela a serem preenchidos.
}

function mensagemDeLog (arquivoAtual, funcaoAtual, mensagemDeErro) { // ... Função responsavel por criar a mensagem de log em caso de erro.
    return `${dataHoraAtual.dataHoraAtual()}:\n Arquivo: ${arquivoAtual} >>> Função: ${funcaoAtual} - Erro: ${mensagemDeErro} \n`; // ... Retorna a mensagem utilizando as informações passadas para a função.
}

async function criarConexao(){ // ................................................ Função responsavel por criar a conexão com o banco de dados.
    return new Promise(async (resolve, reject) => { // ........................... Devolve uma promessa de retorno.
        try{ 
            let conexao = await mysql.createConnection(dadosDeConexao); // ....... Solicita e atribui na variavel "conexao" uma conexão com o banco de dados fornecida pela biblioteca mysql2.

            resolve(conexao); // ................................................. Devolve a conexão criada.
        }
    
        catch(erro){ // .......................................................... Caso de algum erro durante a solicitação de criação de conexão com o banco de dados, executa o bloco de código abaixo.
            console.log(mensagemDeLog(arquivoAtual, "criarConexao", erro)); // ... Printa no console uma mensagem para descrever o erro.
            
            reject(erro) // ...................................................... Retorna o erro.
        }
    });
}

exports.select = async () => {
    return new Promise((resolve, reject) => {
        criarConexao().then(conexao => {
            conexao.query(`SELECT * FROM ${dadosBD.doacaoTabela};`, (error, results, fields) => {
                if(error) {
                    console.log(mensagemDeLog(arquivoAtual, "select", erro));

                    reject(error);
                }else resolve(results);

                conexao.end();
            });
        }).catch(erro => {
            console.log(mensagemDeLog(arquivoAtual, "select", erro));

            reject(erro);
        });
    });
}

exports.selectPorCodigo = async (doacaoCodigo) => {
    return new Promise((resolve, reject) => {
        criarConexao().then(conexao => {
            conexao.query(`SELECT * FROM ${dadosBD.doacaoTabela} WHERE codigo_unico = ${doacaoCodigo};`, (error, results, fields) => {
                if(error) {
                    console.log(mensagemDeLog(arquivoAtual, "selectPorCodigo", erro));

                    reject(error);
                }else resolve(results);

                conexao.end();
            });
        }).catch(erro => {
            console.log(mensagemDeLog(arquivoAtual, "selectPorCodigo", erro));

            reject(erro);
        });
    });
}

exports.insert = (valoresASeremSalvos) => {
    return new Promise((resolve, reject) => {
        criarConexao().then(conexao => {
            conexao.query(`INSERT INTO ${dadosBD.doacaoTabela} (${dadosBD.doacaoCampos}) VALUES (${valoresASeremSalvos});`, (error, results, fields) => {
                if(error) {
                    console.log(mensagemDeLog(arquivoAtual, "insert", erro));

                    reject(error);        
                }else resolve(results.insertId);

                conexao.end();
            });
        }).catch(erro => {
            console.log(mensagemDeLog(arquivoAtual, "insert", erro));

            reject(erro);
        });
    });
}

exports.update = (doacaoCodigo) => {
    return new Promise((resolve, reject) => {
        criarConexao().then(conexao => {
            conexao.query(`UPDATE ${dadosBD.doacaoTabela} SET coletado = 1 WHERE codigo_unico = ${doacaoCodigo};`, (error, results, fields) => {
                if(error) {
                    console.log(mensagemDeLog(arquivoAtual, "update", error));

                    reject(error);    
                }else resolve();

                conexao.end();
            });
        }).catch(erro => {
            console.log(mensagemDeLog(arquivoAtual, "update", erro));

            reject(erro);
        });
    });
}