const modeloDoacao = require('../modelos/doacao');

exports.get = (req, res, next) => {
	modeloDoacao.listar().then(async retorno => {
		await retorno.listaDeDoacoes.forEach(doacao => {
			doacao.perecivel = doacao.perecivel ? true : false;

			doacao.coletado = doacao.coletado ? true : false;
		});

		res.status(retorno.status).send(retorno.listaDeDoacoes);
	}).catch((erro) => {
		res.status(500).send({ mensagem: erro });
	});
};

exports.post = (req, res, next) => {
	const dadosDoacao = req.body;

	modeloDoacao.validarObjetoRecebido(dadosDoacao).then(objetoValido => {
		if(objetoValido){			
			modeloDoacao.salvar(dadosDoacao).then(statusDoacao => {
				res.status(201).send(statusDoacao);
			});
		} else res.sendStatus(400);
	});
};

exports.put = async (req, res, next) => {
	try{
		let doacaoCodigo = req.body.doacaoCodigo;
		
		try { doacaoCodigo = await Number(req.body.id) }
		catch (erro) { throw Error("O valor enviado deve ser númerico!") }

		/*doacao.mudarStatus(doacaoCodigo).then((retorno) => {

		});*/

		res.status(200).send("O id é : " + doacaoCodigo);
	}catch(erro) {
		res.status(500).send()
	};


	//console.log("Dados do body" + req.body);

	// Caso dê erro retronar status de erro.

	//res.status(200).send();
};