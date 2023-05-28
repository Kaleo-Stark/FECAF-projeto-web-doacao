const dados = require('../dados/configuracao');

const dadosObjetoDoacao = {
    chaves: ['bairro', 'cep', 'cidade', 'coletado', 'descricao', 'disponibilidade', 'nome', 'numero', 'perecivel', 'ruaAvenida', 'telefone'],
    quantidade: 11,
    validacao: {
            bairro      : valor => typeof(valor) == "string" && valor.length <= 200,
            cidade      : valor => typeof(valor) == "string" && valor.length <= 200,
             nome       : valor => typeof(valor) == "string" && valor.length <= 200,
          ruaAvenida    : valor => typeof(valor) == "string" && valor.length <= 200,
           telefone     : valor => typeof(valor) == "string" && valor.length <= 15 ,
            numero      : valor => typeof(valor) == "string" && valor.length <= 10 ,
              cep       : valor => typeof(valor) == "string" && valor.length <= 9  , 
           descricao    : valor => typeof(valor) == "string"  ,
        disponibilidade : valor => typeof(valor) == "string"  ,
           perecivel    : valor => typeof(valor) == "boolean" ,
           coletado     : valor => typeof(valor) == "boolean" ,
    }
};

exports.listar = () => {
    return new Promise((resolve, reject) => {
        dados.select().then(retorno => {
            resolve({
                status: retorno.length ? 200 : 204,
                listaDeDoacoes: retorno
            });
        })
        
        .catch(erro => { reject(erro) })
    });
}

exports.salvar = (dadosDoacao) => {
    return new Promise(async (resolve, reject) => {
        let valores = `"${dadosDoacao.nome}", "${dadosDoacao.telefone}", "${dadosDoacao.ruaAvenida}", "${dadosDoacao.cidade}", "${dadosDoacao.bairro}", "${dadosDoacao.cep}", "${dadosDoacao.numero}", ${dadosDoacao.perecivel}, "${dadosDoacao.descricao}", "${dadosDoacao.disponibilidade}", ${dadosDoacao.coletado}`;

        dados.insert(valores).then(doacaoCodigo => {
            resolve({
                status: 201,
                doacaoCodigo: doacaoCodigo
            });
        }).catch(erro => { reject(erro) });
    });
}

exports.mudarStatus = (doacaoCodigo) => {
    console.log("Alterar doacao com o codigo:");

    console.log(doacaoCodigo);
}

exports.validarObjetoRecebido = async (objetoDadosDoacao) => {
    try{
        let chavesObjetoRececebido = Object.keys(objetoDadosDoacao).sort();

        if(     chavesObjetoRececebido.length      ===      dadosObjetoDoacao.quantidade        && 
            JSON.stringify(chavesObjetoRececebido) === JSON.stringify(dadosObjetoDoacao.chaves)
        ){
            for await (let chave of dadosObjetoDoacao.chaves){
                if(!dadosObjetoDoacao.validacao[chave](objetoDadosDoacao[chave])) throw `Valor do parametro ${chave}, invalido!`;
            }

            return true;
        } else throw "Estrutura do objeto nao está correto";
    }catch(erro){ 
        console.log(erro);

        return false;
    }
}