# Detalhe do desafio de cadastro de cliente John Doe
Neste desafio foi desenvolvido uma implementação de cadastro de cliente
contendo algumas informações com as tecnologias de typescript, javascript, express, typeorm, migrations, postgres.

**Comandos a serem executados para download da image e criação do container para postgresql e pgadmin**
# Primeiro ponto
- Inserir a senha do banco de dados no arquivo: ormconfig.json que fica na raiz do projeto e também sua database de criação
porque abaixo foi só um exemplo.

# Segundo ponto
- docker pull postgres
- docker run --name register_postgres -e POSTGRES_PASSWORD=suasenha -e POSTGRES_DB=register -p 15432:5432 -d postgres
- pull dpage/pgadmin4
- docker run -p 5050:80 -e PGADMIN_DEFAULT_EMAIL=seuemail -e PGADMIN_DEFAULT_PASSWORD=suasenha -d dpage/pgadmin4
- Depois realizar o acesso via web: localhost:5050, que irá acessar o pgadmin interface


## Buildar imagem para depois rodar um cointaner e testar via web
- docker image build -t backend-cadastro-cliente .
- docker run --name register-client2 -p 5000:5000
- Depois so acessar via api: localhost:5000


* Depois disso tudo só testar com os containers criados.

