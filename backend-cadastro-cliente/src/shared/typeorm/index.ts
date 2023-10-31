import { createConnection } from 'typeorm';

/**
 * createConnection:
 * Esse método procura automaticamente em toda parte do projeto
 * um arquivo chamado ormconfig.json, quando ele encontra, basicamente
 * ele realiza uma conexão para as configurações contidas do arquivo
 * ormconfig.json para conectar no banco de dados.
 */
createConnection();
