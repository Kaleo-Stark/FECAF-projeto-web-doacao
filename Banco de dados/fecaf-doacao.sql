DROP DATABASE fecaf_doacoes; -- ............................... Apaga o banco de dados fecaf_doacoes.

CREATE DATABASE fecaf_doacoes; -- ............................. Cria o banco de dados fecaf_doacoes.

USE fecaf_doacoes; -- ......................................... Seleciona o banco de dados fecaf_doacoes para utilizacao.

CREATE TABLE doacao_registro ( -- ............................. Cria a tabela doacao_registro com as seguintes colunas:
	codigo_unico    INT AUTO_INCREMENT PRIMARY KEY, -- ........ - Identificador unico para os registros;
    data_hora       TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- ... - Data e hora da inserção; 
	nome            VARCHAR(200), -- .......................... - Nome do doador;
	telefone        VARCHAR(15), -- ........................... - Telefone do doador no formato (00) 00000-0000;
    ruaAvenida      VARCHAR(200), -- .......................... - Nome da rua/avenida do doador;
    cidade          VARCHAR(200), -- .......................... - Cidade do doador;
    bairro          VARCHAR(200), -- .......................... - Bairro do doador;
    cep             VARCHAR(9), -- ............................ - CEP do doador no formato 00000-000;
    numero          VARCHAR(10), -- ........................... - Numero do local do doador;
    perecivel       boolean, -- ............................... - Se a doacao é perecicel ou nao;
    descricao       text, -- .................................. - Descricao do tipo da doacao;
    disponibilidade text, -- .................................. - Texto sobre a disponibilidade de retirada da doacao;
    coletado        boolean -- ................................ - Se a doacao ja foi retirada ou nao.
);

INSERT INTO doacao_registro 
    (nome, telefone, ruaAvenida, cidade, bairro, cep, numero, perecivel, descricao, disponibilidade, coletado) 
VALUES 
    ("Kaleo Vieira", "11977961828", "Avenida Ibirama", "Taboão da Serra", "Parque Industrial Daci", "06785-300", "1200", 0, "Eu quero doar uma armário antigo de madeira, tem 3 meros de largura, 2 de altura e 50 centímetro de profundidade, pode ser utilizado como guarda-roupas ou armário para guardar panelas etc.", "Toda quinta-feira das 15 às 18.\nProcurar por Kaleo ou Stark.", 1),
    ("Josue Tertuliano De Marte", "(11) 98466-7874", "Rua Antônio Marcos Torres", "Taboão da Serra", "Jardim Scândia", "06785-050", "335", 1, "Quero doar 200 Kg de arroz, temos muitos fardos, é necessário utilizar uma carreta bem forte.", "De segunda à sexta das 08:00 às 12:00 e das 13:30 às 18:00.", 0),
    ("Danilo Rodrigues", "(11) 99876-1234", "Rua campo limpo sujo", "São Paulo", "Campo Limpo", "09865-200", "357", 0, "Gostaria de doar uma coleção de livros tecnicos que não utilizo mais, no total tenho 500 livros de tecnologia disponiveis para serem doados", "Sabado e domingo das 10 am às 18 pm", 0);

SELECT * FROM doacao_registro;