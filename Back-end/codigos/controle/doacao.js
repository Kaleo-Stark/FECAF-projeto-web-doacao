exports.get = (req, res, next) => {
	let doacoes = {
		listaDeDoacoes: [
			"<Dentro dessa lista virá as doações>"
		]
	};

	// Caso dê erro retronar status de erro.

    res.status(200).send(doacoes);
};

exports.post = (req, res, next) => {
	console.log(req.body);

	// Validar dados e caso dê erro retorna status de erro.

	res.status(201).send(); // ... Retorna o sucesso do salvamento;
};

exports.put = (req, res, next) => { 
	console.log("Dados do body" + req.body);

	// Caso dê erro retronar status de erro.

	res.status(200).send();
};