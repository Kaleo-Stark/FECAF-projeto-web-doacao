DROP DATABASE fecaf_doacoes; -- .......................... Apaga o banco de dados fecaf_doacoes.

CREATE DATABASE fecaf_doacoes; -- ........................ Cria o banco de dados fecaf_doacoes.

USE fecaf_doacoes; -- .................................... Seleciona o banco de dados fecaf_doacoes para utilizacao.

CREATE TABLE doacao_registro ( -- ........................ Cria a tabela doacao_registro com as seguintes colunas:
	codigo_unico    INT AUTO_INCREMENT PRIMARY KEY, -- ... - Identificador unico para os registros;
	nome            VARCHAR(200), -- ..................... - Nome do doador;
	telefone        VARCHAR(15), -- ...................... - Telefone do doador no formato (00) 00000-0000;
    ruaAvenida      VARCHAR(200), -- ..................... - Nome da rua/avenida do doador;
    cidade          VARCHAR(200), -- ..................... - Cidade do doador;
    bairro          VARCHAR(200), -- ..................... - Bairro do doador;
    cep             VARCHAR(9), -- ....................... - CEP do doador no formato 00000-000;
    numero          VARCHAR(10), -- ...................... - Numero do local do doador;
    perecivel       boolean, -- .......................... - Se a doacao é perecicel ou nao;
    descricao       text, -- ............................. - Descricao do tipo da doacao;
    disponibilidade text, -- ............................. - Texto sobre a disponibilidade de retirada da doacao;
    coletado        boolean -- ........................... - Se a doacao ja foi retirada ou nao.
);