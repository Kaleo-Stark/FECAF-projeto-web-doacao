const elementosDeDados = {
         nome       : null,
       telefone     : null,
         cep        : null,
        numero      : null,
      ruaAvenida    : null,
        cidade      : null,
        bairro      : null,
          uf        : null,
       perecivel    : null,
       descricao    : null,
    disponibilidade : null
};

const elementosDeControle = {
    spanAlertaCep: null
}

const urlViaCEP = CEP => `https://viacep.com.br/ws/${CEP}/json/`;

function consultarCEP(){
    ativarDesativarCarregamento(true);

    let cepSemFormatacao = elementosDeDados.cep.value.trim().replace("-", "");

    if(cepSemFormatacao.length == 8 && !isNaN(Number(cepSemFormatacao))){
        fetch(urlViaCEP(cepSemFormatacao), {method: 'GET'}).then(response => response.json()).then(endereco => {
                if (endereco.erro) {
                    alertaCepInvalido(true);

                    ativarDesativarCarregamento(false);
                } else {
                    preencherDados(endereco);

                    ativarDesativarCarregamento(false);
                }
        }).catch(err => {
            console.error(err);

            ativarDesativarCarregamento(false);

            alertaCepInvalido(true);
        });
    }else{
        ativarDesativarCarregamento(false);

        alertaCepInvalido(true);
    }
}

function preencherDados(endereco){
    elementosDeDados.cep.value        = endereco.cep        ;
    elementosDeDados.ruaAvenida.value = endereco.logradouro ;
    elementosDeDados.cidade.value     = endereco.localidade ;
    elementosDeDados.bairro.value     = endereco.bairro     ;
    elementosDeDados.uf.value         = endereco.uf         ;
}

function alertaCepInvalido(alertar){ 
    elementosDeControle.spanAlertaCep.style.display = alertar ? "initial" : "none";
}

function salvarDoacao(){
    let doacaoASerSalva = {
            nome       : elementosDeDados.nome.value            ,
          telefone     : elementosDeDados.telefone.value        ,
            cep        : elementosDeDados.cep.value             ,
           numero      : elementosDeDados.numero.value          ,
         ruaAvenida    : elementosDeDados.ruaAvenida.value      ,
           cidade      : elementosDeDados.cidade.value          ,
           bairro      : elementosDeDados.bairro.value          ,
          perecivel    : elementosDeDados.perecivel.value === "true",
          descricao    : elementosDeDados.descricao.value       ,
       disponibilidade : elementosDeDados.disponibilidade.value ,
          coletado     : false
    };

    let options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(doacaoASerSalva)
    };
    
    let dadosValidosParaSerSalvos = true;

    for (let nomeDoDado in doacaoASerSalva){
        if(doacaoASerSalva[nomeDoDado] === "" || doacaoASerSalva[nomeDoDado] == null || doacaoASerSalva[nomeDoDado] == undefined){
            dadosValidosParaSerSalvos = false; break
        }
    }

    if(dadosValidosParaSerSalvos){
        fetch('http://localhost:3333/doacao', options).then(response => response.json()).then(retorno => {
            if(retorno.status == 201){
                alert("Doação salva com sucesso");

                window.location.href = ".."
            } else alert("Houve algum erro, tente novamente.");
        }).catch(err => alert("Houve algum erro, tente novamente."));
    } else alert("Preencha todos os campos");
}

function carregarElementosDeDados(){
    elementosDeDados.nome            = document.querySelector(      "#nome"     );
    elementosDeDados.telefone        = document.querySelector(    "#telefone"   );
    elementosDeDados.cep             = document.querySelector(      "#cep"      );
    elementosDeDados.numero          = document.querySelector(     "#numero"    );
    elementosDeDados.ruaAvenida      = document.querySelector(   "#ruaAvenida"  );
    elementosDeDados.cidade          = document.querySelector(     "#cidade"    );
    elementosDeDados.bairro          = document.querySelector(     "#bairro"    );
    elementosDeDados.uf              = document.querySelector(       "#uf"      );
    elementosDeDados.perecivel       = document.querySelector(   "#perecivel"   );
    elementosDeDados.descricao       = document.querySelector(   "#descricao"   );
    elementosDeDados.disponibilidade = document.querySelector("#disponibilidade");
}

function carregarElementosDeControle(){
    elementosDeControle.spanAlertaCep = document.querySelector("label > span");
}

addEventListener("load", () => {
    carregarElementosDeDados();

    carregarElementosDeControle();
});