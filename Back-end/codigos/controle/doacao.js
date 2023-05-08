const modeloDoacao = require('../modelos/doacao');

exports.get = (req, res, next) => {
	modeloDoacao.listar().then(retorno => {
		res.status(retorno.status).send(retorno.listaDeDoacoes);
	}).catch((erro) => {
		res.status(500).send({
			mensagem: erro.message
		});
	});
};

exports.post = (req, res, next) => {
	//console.log(req.body);

	//let doacao = new Doacao("Teste","Teste","Teste","Teste","Teste","Teste","Teste","Teste","Teste","Teste","Teste");

	modeloDoacao.salvar();

	// Validar dados e caso dê erro retorna status de erro.

	res.sendStatus(201); // ... Retorna o sucesso do salvamento;
};

exports.put = async (req, res, next) => {
	try{
		let doacaoCodigo = null;
		
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