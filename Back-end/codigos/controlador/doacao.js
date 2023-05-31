const modeloDoacao = require('../modelos/doacao'); // ... Importa as funções responsavel pelo modelo da doação.

exports.get = (req, res, next) => { // ................................. Exporta a função controladora da rota GET responsavel por listar as doações.
	modeloDoacao.listar().then(async retorno => { // ................... Chama e recebe o retorno em caso de sucesso da função responsavel por listar as doações que está codificado dentro das funções de modelo.
		await retorno.listaDeDoacoes.forEach( doacao => { // ........... Faz o código aguardar e inica um loop na lista de doações recebidas.
			doacao.perecivel = doacao.perecivel ? true : false; // ..... Faz a validação do dado "perecivel" que veio do banco como 1 ou 0 e converte para true ou false.

			doacao.coletado  = doacao.coletado  ? true : false; // ..... Faz a validação do dado "coletado" que veio do banco como 1 ou 0 e converte para true ou false.
		});

		res.status(retorno.status).send(retorno.listaDeDoacoes); // .... Retorna a requisição passando o status adequado para o resultado e a lista de doações.
	}).catch( erro => res.status(500).send({ mensagem: erro }) ); // ... Captura qualquer tipo de erro retornado pela função de listagem de doação das funções modelo e retona um status e mensagem adequada. 
};

exports.post = (req, res, next) => { // ......................................... Exporta a função controladora da rota POST responsavel por salvar uma doação.
	const dadosDoacao = req.body; // ............................................ Atribui a variavel "dadosDoacao" o objeto de doação enviado para ser salvo.

	modeloDoacao.validarObjetoRecebido(dadosDoacao).then(objetoValido => { // ... Chama a função responsavel por validar o objeto enviado para ser salvo e retorna se esse objeto e seus valores são validos.
		if(objetoValido){ // .................................................... Valida o retorno sobre o objeto ser valido, em caso positivo executa o código abaixo.
			modeloDoacao.salvar(dadosDoacao) // ................................. Chama a função responsavel por salvar uma nova doação passando o objeto com os dados da doação e recebe o retorno.
			.then( statusDoacao => res.status(201).send(statusDoacao) ) // ...... Em caso de sucesso no salvamento recebe o retorno do salvamento e retorna o status mais adequado.
			.catch( erro => res.sendStatus(500) ); // ........................... Captura qualquer tipo de erro retornado durante a tentativa de salvamento da doação e retorna o status mais adequado.
		} else res.status(400).send({ mensagem: "Objeto enviado não está de acordo com a API." }); // ... Caso o objeto enviado para ser salvo não esteja de acordo com a API retona o status mais adequado.
	});
};

exports.put = async (req, res, next) => { // ................................................ Exporta a função controladora da rota PUT responsavel por alterar o status de uma doação.
	let doacaoCodigo = Number(req.body.doacaoCodigo); // .................................... Tenta fazer a conversão do codigo da doação para númerico.

	if (!isNaN(doacaoCodigo)) { // .......................................................... Valida se o codigo da doação enviado é numerico, caso seja executa o bloco de código abaixo.
		modeloDoacao.verificaExistencia(doacaoCodigo).then((existe) => { // ................. Chama a função do modelo responsavel por validar se existe uma doação com o id enviado na requisição.
			if (existe) { // ................................................................ Valida o retorno para verificar se a dooação reaçlemnte exsite, caso exista, executa o bloco de código abaixo.
				modeloDoacao.mudarStatus(doacaoCodigo).then(() => res.sendStatus(200)) // ... Chama a função do modelo responsavel por fazer a atualização no status da doação, recebe o retorno e caso de certo, retona o status mais adequado.
				
				.catch(erro => res.sendStatus(500) ); // .................................... Captura qualquer erro retornado no processo de atualização de status da doação e retona o status mais adequado.
			} else res.status(404).send({ mensagem: "Doação não encontrada" }); // .......... Caso o id passado na requição não exista é retonado o status mais adequado.
		}).catch( error => res.sendStatus(500)); // ......................................... Captura qualquer erro retonado pela validação de se o codigo da doação existe e retorna o status mais adequado.
	} else res.status(400).send({ mensagem: "O tipo de valor enviado deve ser numerico." }); // ... Caso o codigo enviado na requisição não seja numerico, é retornado o status mais adequado.
};