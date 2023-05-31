const dados = require('../dados/configuracao'); // ... Importa as funções responsaveis por manipular os dados no banco de dados.

const dadosObjetoDoacao = { // ....................... Constante responsavel por armazenar dados para auxiliar na manipulação das doações.
    chaves: ['bairro', 'cep', 'cidade', 'coletado', 'descricao', 'disponibilidade', 'nome', 'numero', 'perecivel', 'ruaAvenida', 'telefone'],
    quantidade: 11,
    validacao: { // .................................. Objeto com funções de validação de tipo de valor que deve ter no objeto de doação.
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

exports.listar = () => { // .............................. Exporta a função responsavel por intermediar a solicitação de listagem de doações.
    return new Promise((resolve, reject) => { // ......... Devolve uma promessa de retorno.
        dados.select().then(retorno => { // .............. Chama a função responsavel por listar as doações e recebe o retorno.
            resolve({ // ................................. Prepara o retorno da promise com um objeto.
                status: retorno.length ? 200 : 204, // ... Aqtrubui o status mais adequado no objeto de retorno.
                listaDeDoacoes: retorno // ............... Atribui a lista de doações no objeto de retorno.
            });
        }).catch(erro => reject(erro) ); // .............. Recebe qualquer erro disparado pela função responsavel de buscar a lista no banco de dados e retorna um status.
    });
}

exports.salvar = (dadosDoacao) => { // .................... Exporta a função responsavel por intermediar a solicitação de salvamento de uma doação.
    return new Promise(async (resolve, reject) => { // .... Devolve uma promessa de retorno.
                let valores             =       `"${dadosDoacao.nome}", `      + `"${dadosDoacao.telefone}", ` +
        `"${dadosDoacao.ruaAvenida}", ` +      `"${dadosDoacao.cidade}", `     +  `"${dadosDoacao.bairro}", `  +
           `"${dadosDoacao.cep}", `     +      `"${dadosDoacao.numero}", `     + `${dadosDoacao.perecivel}, `  +
        `"${dadosDoacao.descricao}", `  + `"${dadosDoacao.disponibilidade}", ` +  `${dadosDoacao.coletado}`    ; // ... Prepara e atribui na varaivel "valores" os valores a serem salvos.

        dados.insert(valores).then(doacaoCodigo => { // ... Chama a função responsavel por salvar no banco de dados os dados da doação e recebe o retorno desse salvamento.
            resolve({ // .................................. Prepara o retorno da promise com um objeto.
                status: 201, // ........................... Atribui ao objeto o status do retorno.
                doacaoCodigo: doacaoCodigo // ............. Atribui ao objeto de retorno o código da doação que foi salva.
            });
        }).catch(erro => reject(erro) ); // ............... Recebe qualquer erro disparado pela função responsavel de salvar os dados da doação no banco de dados e retorna uma mensagem.
    });
}

exports.mudarStatus = (doacaoCodigo) => { // .................... Exporta a função responsavel por intermediar a solicitação de mudança de status da doação.
    return new Promise((resolve, reject) => { // ................ Devolve uma promessa de retorno.
        dados.update(doacaoCodigo).then( () => resolve() ) // ... Chama a função responsavel por mudar o status da doação e finaliza a solicitação.
        
        .catch( erro => reject(erro) ); // ...................... Recebe qualquer erro disparado pela função responsavel de mudar o status da doação no banco de dados e retorna uma mensagem.
    });
}

exports.verificaExistencia = (codigoDoacao) => { // ................... Exporta a função responsavel por intermediar a solicitação de verificação se uma doação existe com base em um codigo de doaçao.
    return new Promise((resolve, reject) => { // ...................... Devolve uma promessa de retorno.
        dados.selectPorCodigo(codigoDoacao).then(retorno => { // ...... Chama a função responsavel por buscar as doações com base no código passado e obtem esse resultado.
            retorno.length > 0 ? resolve(true) : resolve(false); // ... Da um retorno verdadeiro ou falso validando se exsite doação código o id passado.
        }).catch( erro => reject(erro) );// ........................... Recebe qualquer erro disparado pela função responsavel de validar se existe a doação no banco de dados e retorna uma mensagem.
    });
}

exports.validarObjetoRecebido = async (objetoDadosDoacao) => { // ....................... Exporta a função responsavel por validar os objetos de doação enviados pelas requisições.
    try{
        let chavesObjetoRececebido = Object.keys(objetoDadosDoacao).sort(); // .......... Obtem e atribui na variavel "chavesObjetoRececebido" as chaves do objeto de doação.

        if(     chavesObjetoRececebido.length      ===      dadosObjetoDoacao.quantidade        && 
            JSON.stringify(chavesObjetoRececebido) === JSON.stringify(dadosObjetoDoacao.chaves)
        ){ // ........................................................................... Faz uma verificação da quantidade de itens no objeto de doação e valida as chaves, caso a validação dê certo é executado o bloco de código abaixo.
            for await (let chave of dadosObjetoDoacao.chaves){ // ....................... Realiza um loop nas chaves do objeto de doação.
                if(!dadosObjetoDoacao.validacao[chave](objetoDadosDoacao[chave]))  // ... Realiza uma verificação do tipo de dados que está no objeto e caso o valor seja um valor não aceitavel, é executado o bloco de código abaixo.
                    throw `Valor do parametro ${chave}, invalido!`; // .................. Interrompe o que está sendo processado e devolve um erro.
            }

            return true; // ............................................................. Retorna um valor verdadeiro caso dê tudo certo dento da função.
        } else throw "Estrutura do objeto nao está correto"; // ......................... Se a quantidade e as chaves do objeto não forem validas é retonado um erro com uma mensagem.
    }catch(erro){ return false } // ..................................................... Caso de algum tipo de erro durante o processamento da função é retornado um false.
}