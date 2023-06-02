# FECAF-projeto-web-doacao

Projeto de extenção do primeiro semestre de 2023 da universidade UniFECAF.

Separações dos arquivos:

    Pasta /Banco de dados -> Possui um arquivo de script para o banco de dados, ele cria o banco, a tabela e insere 3 massa de dados para uma visualização inicial da aplicação.

    Pasta /Back-end -> Possui todo os códigos relacionada a API que deve receber as requisições e salvar no banco de dados.
    OBS: Para fazer a comunicação da API com o banco de dados é necessario preencher os campos usuario e senha que se encontram no arquivo de configuração de acesso com o banco de dados. PATH: Back-end/codigos/dados/configuracao.js.

    Pasta /Front-end -> Possui todos os arquivos relacionados ao layout e funcionamento das telas da aplicação.

    Para acessar a página inicial basta acessar pelo index, de lá você poderá ir para a página de cadastro.
    A página de consulta e controle do que foi cadastrado é preciso acessar pelo link direto, essa página se encontra no caminho Fron-end/paginas/consulta.html.