exports.listar = async () => {
    console.log("Ira listar as doações");

    /* 
        {
            status: 200 || 204,
            listaDeDoacoes: [
                "<Doacoes>"
            ]
        } 
    */

    //throw Error("Errouuuu");

    // 204 para quando não houver dados
    // 200 para resultado 

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                listaDeDoacoes: [
                    "<Dentro dessa lista virá as doações>"
                ]
            })
        }, 5000);
    });
}

exports.salvar = (doacao) => {
    console.log("salvou o objeto:");

    console.log(doacao);
}

exports.mudarStatus = (doacaoCodigo) => {
    console.log("Alterar doacao com o codigo:");

    console.log(doacaoCodigo);
}