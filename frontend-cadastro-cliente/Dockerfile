# Image ser usada de referencia la no DockerHub
FROM node:16-alpine

# diretorio do trabalho inicial que vai tar aplicação do container da image no docker
WORKDIR /usr/app

#copia tudo que tem package* e o que vem depois do * e clona no Workdir referencia do diretorio: ./
COPY package*.json ./

# Executa a instalação das dependencias , --force para ele forçar as instalação caso tenha versão mais recente
RUN npm install --force

# Copia tudo que tiver no mesmo nivel do Dockerfile para Workdir
COPY . .


# Exportando a porta 3000 do container para quem ta de fora
EXPOSE 3000

# Definição da image quando for buildar , vai executar o comando cmd para executar que está dentro
CMD [ "npm","start" ]


