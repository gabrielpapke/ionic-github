# Ionic Github

## Requisitos

- Node.js

    > Baixe e instale: https://nodejs.org/en/download/

- Ionic e cordova

    *Abra o terminal e rode o seguinte comando:*
    > ```$ npm install -g cordova ionic ```
    
    

## Como rodar o projeto
Assumindo que já tenha instalado em sua máquina o Node.js e Ionic, acesse a pasta do projeto e execute os seguintes comandos no terminal:

```bash
$ npm install
$ ionic serve
```

Em alguns instantes, o comando ``ionic serve`` irá abrir o navegador com o projeto rodando. Caso não abrir, insira a url que apareceu no terminal. (Provavelmente: [http://localhost:8100](http://localhost:8100)).


> **OBS:** *A API tem um limite de requisições por IP, e como a paginação dos repositórios faz uma requisição por página, pode ser que seu IP seja bloqueado após muitas requisições* 