const mysql = require('mysql2');
const dataHoraAtual = require('../ferramentas/dataHoraAtual');
const arquivoAtual = "./codigos/dados/configuracao.js";

const dadosDeConexao = {
    host: 'localhost',
    port: 3306,
    user: '<User do banco de dados aqui>',
    password: '<Senha do banco de dados aqui>',
    database: 'fecaf_doacoes'
};

const dadosBD = {
    doacaoTabela: "doacao_registro",
    doacaoCampos: "nome, telefone, ruaAvenida, cidade, bairro, cep, numero, perecivel, descricao, disponibilidade, coletado",
    doacaoValoresTeste: '"Kaleo Vieira Leite", "(11) 97796-1828", "Antonio Marcos Torres", "Taboão da Serra", "Scândia", "06785-300", "135", false, "Arroz e Feijão", "De segunda a Sexta, das 10 AM às 23 PM", false'
}

function mensagemDeLog (arquivoAtual, funcaoAtual, mensagemDeErro) { 
    return `${dataHoraAtual.dataHoraAtual()}:\n Arquivo: ${arquivoAtual} >>> Função: ${funcaoAtual} - Erro: ${mensagemDeErro} \n`;
}

async function criarConexao(){
    return new Promise(async (resolve, reject) => {
        try{ 
            let conexao = await mysql.createConnection(dadosDeConexao);

            resolve(conexao);
        }
    
        catch(erro){
            // !!! Colocar no Log
            
            reject(mensagemDeLog(arquivoAtual, "criarConexao()", erro)) 
        }
    });
}

exports.select = async () => {
    return new Promise((resolve, reject) => {
        criarConexao().then(conexao => {
            conexao.query(`SELECT * FROM ${dadosBD.doacaoTabela};`, (error, results, fields) => {
                if(error) {
                    // !!! Colocar no Log

                    reject(error);
                }else{
                    resolve(results);
                }

                conexao.end();
            });
        }).catch(erro => {
            // !!! Colocar no Log

            reject(erro);
        });
    });
}

exports.insert = (valoresASeremSalvos) => {
    return new Promise((resolve, reject) => {
        criarConexao().then(conexao => {
            conexao.query(`INSERT INTO ${dadosBD.doacaoTabela} (${dadosBD.doacaoCampos}) VALUES (${valoresASeremSalvos});`, (error, results, fields) => {
                if(error) {
                    // !!! Colocar no Log

                    reject(error);        
                }else resolve(results.insertId);

                conexao.end();
            });
        }).catch(erro => {
            // !!! Colocar no Log

            reject(erro);
        });
    });
}

exports.update = () => {
    /*return new Promise((resolve, reject) => {
        criarConexao().then(conexao => {
            conexao.query(`SELECT * FROM ${dadosBD.tabelaDocao};`, (error, results, fields) => {
                if(error) {
                    console.log("erro: " + error); // Colocar log

                    reject(error);        
                }else{
                    resolve(results);
                }

                conexao.end();
            });
        }).catch(erro => {
            console.log("erro: " + erro); // Colocar log

            reject(erro);
        });
    });*/
}

function execSQLQuery(sqlQry, res) { // ......................... Função que cria a conexão com o banco de ddados e recebe a query a ser executa.
    const connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'kaleostark',
        password: '',
        database: 'apiNode'
    }); // ...................................................... String para conexão com o banco de dados.

    connection.query(sqlQry, (error, results, fields) => { // ... Tenta fazer a conexão com o banco de dados, passando a string de conexão.
        if(error){ res.json(error); } // ........................ Se houve erro na conexão, ele retorna o erro.
        else{ res.json(results); } // ........................... Se houve sucesso ele retorna os dados referente ao sucesso.

        connection.end(); // .................................... Finaliza a conexão.
    });
}