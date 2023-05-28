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
            console.log(mensagemDeLog(arquivoAtual, "criarConexao", erro));
            
            reject(erro) 
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