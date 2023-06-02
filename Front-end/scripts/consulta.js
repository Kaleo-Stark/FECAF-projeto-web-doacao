const descricoes = {
    nome             : "Nome: "                        ,
    telefone         : "Telefone: "                    ,
    cep              : "CEP: "                         ,
    numero           : "N°: "                          ,
    ruaAvenida       : "Rua/Avenida: "                 ,
    cidade           : "Cidade: "                      ,
    bairro           : "Bairro: "                      ,
    perecivel        : "Tipo de doação: "              ,
    descricao        : "Descrição da doação: "         ,
    disponibilidade  : "Disponibilidade de retirada: " ,
    coletado         : "Marcar doação como retirada: " ,
    botaoColetado    : "Doação já retirada"            ,
    botaoNaoColetado : "Marcar doação como retirada"
} 

function criarColuna( tamanho ) { 
    let coluna = document.createElement("div");

    coluna.classList.add("coluna", tamanho);
    
    return coluna;
}

function criarLabel( texto ) {
    let label = document.createElement("label");

    label.innerText = texto;
    
    return label;
}

function criarLabelComSpan( textoLabel , textoSpan ) {
    let label = criarLabel(textoLabel);
    let span  = document.createElement("span");

    span.innerText = textoSpan;
    label.appendChild(span);
    
    return label;
}

function criarParagrafo(texto) {
    let paragrafo = document.createElement("p");

    paragrafo.innerText = texto;
    
    return paragrafo;
}

function criarBotao(texto) {
    let button = document.createElement("button");

    button.innerText = texto;
    
    return button;
}

function buscarListaDeDoacoes() {
    fetch("http://192.168.15.17:3333/doacoes", {method: 'GET'}).then(response => {
        if(response.status == 204){
            alert("Não há lista de doações para ser vista.");

            window.location.href = "..";
        } else return response.json();
    })
    .then( doacoes => popularListaDeDoacoes(doacoes) )
    .catch( err => alert( "Houve algum erro, tente novamente mais tarde." ) );
}

function popularListaDeDoacoes( doacoes ) {
    let listaDeDoacoes = document.querySelector("ul");

    doacoes.forEach(doacao => {
        let linhasDoacao = [];

        for (let linhaDado = 1; linhaDado <= 7; linhaDado++){
            let linha = document.createElement("div");
            
            linha.classList.add("linha");

            if ( linhaDado == 1 || linhaDado == 3 ) {
                let colunaEsquerda = criarColuna("tamanho-50");
                let colunaDireita  = criarColuna("tamanho-50");

                colunaEsquerda.appendChild(
                    criarLabelComSpan(
                        linhaDado == 1 ? descricoes.nome : descricoes.cidade ,
                        linhaDado == 1 ? doacao.nome     : doacao.cidade
                    )
                );

                colunaDireita.appendChild(
                    criarLabelComSpan(
                        linhaDado == 1 ? descricoes.telefone : descricoes.bairro ,
                        linhaDado == 1 ? doacao.telefone     : doacao.bairro
                    )
                );

                linha.appendChild(colunaEsquerda);
                linha.appendChild(colunaDireita);
            } else if ( linhaDado == 2 ) {
                let colunaEsquerda = criarColuna("tamanho-50");
                let colunaCentral  = criarColuna("tamanho-25");
                let colunaDireita  = criarColuna("tamanho-25");

                colunaEsquerda.appendChild( criarLabelComSpan( descricoes.ruaAvenida , doacao.ruaAvenida ) );
                colunaCentral .appendChild( criarLabelComSpan( descricoes.cep        , doacao.cep        ) );
                colunaDireita .appendChild( criarLabelComSpan( descricoes.numero     , doacao.numero     ) );

                linha.appendChild(colunaEsquerda);
                linha.appendChild(colunaCentral);
                linha.appendChild(colunaDireita);
            } else if ( linhaDado == 4 ) {
                let colunaUnica = criarColuna("tamanho-100");

                colunaUnica.appendChild( criarLabelComSpan( descricoes.perecivel , doacao.perecivel ? "Perecivel" : "Não perecivel" ) );

                linha.appendChild(colunaUnica);
            } else if ( linhaDado == 5 || linhaDado == 6 ) {
                let colunaUnica = criarColuna("tamanho-100");

                colunaUnica.appendChild( criarLabel( linhaDado == 5 ? descricoes.descricao : descricoes.disponibilidade ) );

                colunaUnica.appendChild( criarParagrafo( linhaDado == 5 ? doacao.descricao : doacao.disponibilidade ) );

                linha.appendChild(colunaUnica);
            } else if ( linhaDado == 7 ) {
                let colunaUnica   = criarColuna("tamanho-100");
                let botaoColetado = criarBotao( doacao.coletado ? descricoes.botaoColetado : descricoes.botaoNaoColetado );

                if ( doacao.coletado ) botaoColetado.disabled = true;
                else {
                    botaoColetado.id = `doacao-${doacao["codigo_unico"]}`;

                    botaoColetado.onclick = () => marcarDoacaoComoColetada( doacao["codigo_unico"] );
                }
                
                colunaUnica.appendChild( botaoColetado );

                linha.appendChild(colunaUnica);
            }
            
            linhasDoacao.push(linha);
        }

        let itemListaDoacao = document.createElement( "li" );
        let containerLinhasDoacao = document.createElement( "div" );

        containerLinhasDoacao.replaceChildren( ...linhasDoacao );
        itemListaDoacao.appendChild( containerLinhasDoacao );
        
        listaDeDoacoes.appendChild(itemListaDoacao);
    });
}

function marcarDoacaoComoColetada(codigoDoacao){
    const options = { method: 'PUT', headers: {'Content-Type': 'application/json'}, body: `{"doacaoCodigo":${codigoDoacao}}` };

    fetch("http://localhost:3333/doacao", options).then(response => {
        if(response.status == 200) alert("Status da doação modificado com sucesso!");
        else alert( "Houve algum erro, tente novamente mais tarde." )
    }).then( () => {
        let botaoDaDoacao = document.querySelector(`#doacao-${codigoDoacao}`);
        
        botaoDaDoacao.disabled = true;

        botaoDaDoacao.innerText = descricoes.botaoColetado;
    }).catch( err => alert( "Houve algum erro, tente novamente mais tarde." ) );
}

addEventListener( "load" , () => { buscarListaDeDoacoes() } );