const modeloDoacao = require('../modelos/doacao');

exports.get = (req, res, next) => {
	modeloDoacao.listar().then(async retorno => {
		await retorno.listaDeDoacoes.forEach( doacao => {
			doacao.perecivel = doacao.perecivel ? true : false;

			doacao.coletado  = doacao.coletado  ? true : false;
		});

		res.status(retorno.status).send(retorno.listaDeDoacoes);
	}).catch( erro => res.status(500).send({ mensagem: erro }) );
};

exports.post = (req, res, next) => {
	const dadosDoacao = req.body;

	modeloDoacao.validarObjetoRecebido(dadosDoacao).then(objetoValido => {
		if(objetoValido){			
			modeloDoacao.salvar(dadosDoacao)
			.then( statusDoacao => res.status(201).send(statusDoacao) )
			.catch( erro => res.sendStatus(500) );
		} else res.sendStatus(400);
	});
};

exports.put = async (req, res, next) => {
	let doacaoCodigo = Number(req.body.doacaoCodigo);

	if (!isNaN(doacaoCodigo)) {
		modeloDoacao.verificaExistencia(doacaoCodigo).then((existe) => {
			if (existe) {
				modeloDoacao.mudarStatus(doacaoCodigo).then(() => res.sendStatus(200))
				
				.catch(erro => res.sendStatus(500) );
			} else res.status(404).send({ mensagem: "Doação não encontrada" });
		}).catch( error => res.sendStatus(500));
	} else res.status(400).send({ mensagem: "O tipo de valor enviado deve ser numerico." });
};